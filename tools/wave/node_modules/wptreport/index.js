#!/usr/bin/env node

/* globals showdown */
/* jshint sub:true, laxcomma:true, strict:false, -W116 */

var fs = require("fs-extra")
,   pth = require("path")
,   nopt = require("nopt")
,   cwd = process.cwd()
,   jn = pth.join
,   dn = __dirname
,   resDir = jn(dn, "res")
,   rfs = function (path) { return fs.readFileSync(path, "utf8"); }
,   wfs = function (path, content) { fs.writeFileSync(path, content, { encoding: "utf8" }); }
,   fixr = function (report) { report.results = report.results.map(function(r) { if (r.test[0] !== '/') r.test = '/' + r.test; return r;  }); return report }
,   rjson = function (path) { return fixr(JSON.parse(rfs(path))); }
,   wjson = function (path, obj) { wfs(path, JSON.stringify(obj, null, 2)); }
,   tmpl = rfs(jn(resDir, "template.html"))
,   knownOpts = {
                    input:      String
                ,   output:     String
                ,   help:       Boolean
                ,   spec:       String
                ,   version:    Boolean
                ,   markdown:   Boolean
                ,   description:String
                ,   rollup:     Boolean
                ,   failures:   Boolean
                ,   sort:       Boolean
                ,   ref:        String
                ,   pass:       Number
                ,   ignoreFileName:  Boolean
                ,   tokenFileName:  Boolean
                }
,   shortHands = {
                    i:      ["--input"]
                ,   o:      ["--output"]
                ,   h:      ["--help"]
                ,   s:      ["--spec"]
                ,   v:      ["--version"]
                ,   m:      ["--markdown"]
                ,   d:      ["--description"]
                ,   r:      ["--rollup"]
                ,   f:      ["--failures"]
                }
,   out = {
        ua: []
    ,   results: {}
    }
,   refOut = {
        ua: []
    ,   results: {}
    }
,   refPass = 0
,   uaRegex = /^[a-zA-Z]{2}\d+.json$/
,   tokenUaRegex = /(.+)[-]([a-zA-Z]{2}\d+).json/
,   lessThanTwo = []
,   all = []
,   completeFail = []
,   err = function (str) {
        console.error("[ERROR] " + str);
        process.exit(1);
    }
,   esc = function (str) {
        if (str === undefined || str === "ManualCheckNeeded") return "-";
        if (!str) return str;
        return str.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace("_constructor", "constructor")
        ;
    }
,   interpolate = function (data) {
        return tmpl.replace(/\{\{(\w+)\}\}/g, function (m, p1) {
            return data[p1] !== undefined ? data[p1] : "@@@ERROR@@@";
        });
    }
,   cells = function (data) {
        var res = "";
        for (var i = 0, n = out.ua.length; i < n; i++) res += "<td class='" + data[out.ua[i]] + "'>" + esc(data[out.ua[i]]) + "</td>";
        return res;
    }
,   reports = []
,   subtestsPerTest = {}
,   consolidated = {}
,   refConsolidated = {}
,   refFilterList = []
,   totalSubtests = 0
,   uaPass = {}
,   copyFiles = "analysis.css jquery.min.js sticky-headers.js bootstrap.min.css".split(" ")
,   filter = {}
,   showdown = require("showdown")
,   messages = function (data) {
        var res = "";
        for (var i = 0, n = out.ua.length; i < n; i++) {
            if (data.hasOwnProperty(out.ua[i])) {
              var message = options.markdown ? markdown.makeHtml(data[out.ua[i]]) : esc(data[out.ua[i]]) ;
              res += "<tr class='message'><td class='ua'>"+out.ua[i]+":</td><td> "+message+"</td></tr>\n";
            }
        }
        if (res !== "") {
            res = "<tr class='messages'><td colspan='" + (n+1) + "'><table>"+res+"</table></td></tr>\n";
        }
        return res;
    }
,   sortNames = function (hashref) {
        // get the list of keys into an array
        var ret = Object.keys(hashref).map(function(name) { return name; });
        ret.sort(function(a,b) {
            // if they are the same, return 0
            if (a === b ) {
                return 0;
            }

            // if the names start with digits, then sort numerically

            if (a.match(/^[0-9]+/)) {
                var anum = a.replace(/ +.*$/,'');
                var bnum = b.replace(/ +.*$/,'');
                var alist = anum.split(':');
                var blist = bnum.split(':');
                var greater = Number(alist[0]) > Number(blist[0]) ;
                if (alist[0] === blist[0] ) {
                    greater = Number(alist[1]) > Number(blist[1]);
                }
                if (greater) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                }
            }
        });
        return ret;
    }
,   readDir = function (dir, _consolidated) {
        var m;
        fs.readdirSync(dir)
        .forEach(function (f) {
            if (f === 'wptreport.json') return;
            if (options.ignoreFileName === false && options.tokenFileName === false) {
                if (!uaRegex.test(f)) return;
            } else if (options.ignoreFileName === false && options.tokenFileName === true) {
                m = tokenUaRegex.exec(f);
                if (m === null && dir === options.ref && uaRegex.test(f)) {
                    m = 0;
                } else if (m === null) {
                    return;
                }
            }
            reports.push(f);
            if (options.rollup) {
                // we are combining all the files that start with \w\w
                var name = f.substr(0,2);
                if (_consolidated[name]) {
                    // we already read in one of these; merge
                    var handle = rjson(jn(dir, f)) ;
                    handle.results.forEach(function(newResult) {
                        // testRef is a reference to the consolidated results for this platform
                        var testRef = null;
                        var test = newResult.test;
                        // see if the test is in the collection
                        _consolidated[name].results.forEach(function(item) {
                            if (item.test == test) {
                                // found it!
                                testRef = item;
                            }
                        });

                        if (testRef) {
                            newResult.subtests.forEach(function(newSubtest) {
                                // find the subtest within the test
                                var foundIt = false;
                                testRef.subtests.forEach(function(item) {
                                    if (item.name == newSubtest.name) {
                                        // this subtest is in the consolidated already
                                        foundIt = true;
                                        // we already have this one...   is this result "better" ?
                                        if (item.status !== "PASS" && newSubtest.status == "PASS") {
                                            item.status = newSubtest.status;
                                            item.message = newSubtest.message;
                                        }
                                    }
                                });
                                if (!foundIt) {
                                    // it wasn't in there already... add it
                                    testRef.subtests.push(newSubtest);
                                }
                            });
                        } else {
                            // this entire test is not yet in consolidated
                            _consolidated[name].results.push(newResult);
                        }
                    });
                } else {
                    _consolidated[name] = rjson(jn(dir, f));
                }
            } else if (options.tokenFileName === true && m !== 0) {
                _consolidated[m[1].substr(0,5) + '<br>' + m[2]] = rjson(jn(dir, f));
            } else {
                _consolidated[f.replace(/\.json$/, "")] = rjson(jn(dir, f));
            }
        });
        return _consolidated;
    }
;

showdown.extension('strip', function() {
    return [
    { type: 'output',
        regex: /<p>/,
        replace: ''
    },
    { type: 'output',
        regex: /<\/p>$/,
        replace: ''
    }
    ];
});

var markdown = new showdown.Converter({ extensions: [ 'strip' ] });


// parse the command line options so we know the input directory if any
var parsed = nopt(knownOpts, shortHands)
,   defaults = {} ;

// Read in a defaults file if there is one
if (fs.existsSync(jn(parsed.input || cwd, "wptreport.json"))) defaults = require(jn( parsed.input || cwd, "wptreport.json"));

// now set the options, preferring command line, then options from file, then built-in defaults
var options = {
        input:      parsed.input || cwd
    ,   output:     parsed.output || defaults['output'] || cwd
    ,   help:       parsed.help || false
    ,   version:    parsed.version || false
    ,   spec:       parsed.spec || defaults['spec'] || ""
    ,   failures:   parsed.failures || defaults['failures'] || false
    ,   markdown:   parsed.markdown || defaults['markdown'] || false
    ,   description:parsed.description || defaults['description'] || ""
    ,   rollup:     parsed.rollup || defaults['rollup'] || ""
    ,   sort:       parsed.sort || defaults['sort'] || false
    ,   ref:        parsed.ref || defaults['ref'] || null
    ,   pass:       parsed.pass || defaults ['pass'] || 0
    ,   ignoreFileName: parsed.ignoreFileName || defaults['ignoreFileName'] || false
    ,   tokenFileName: parsed.tokenFileName || defaults['tokenFileName'] || false
    ,   overwrite: parsed.overwrite || defaults['overwrite'] || false
    }
,   prefix = options.spec ? options.spec + ": " : ""
;

if (options.help) {
    console.log([
        "wptreport [--input /path/to/dir] [--output /path/to/dir] [--spec SpecName]"
    ,   ""
    ,   "   Generate nice-looking reports of various types based on test run reports coming"
    ,   "   out of Web Platform Tests."
    ,   ""
    ,   "   --input, -i  <directory> that contains all the JSON. JSON files must match the pattern"
    ,   "                \\[a-zA-Z]{2}\\d+\\.json. Defaults to the current directory. This is also where"
    ,   "                the filter.js and wptreport.json are found, if any."
    ,   "   --output*, -o <directory> where the generated reports are stored. Defaults to the current"
    ,   "                directory."
    ,   "   --ref*   <directory> that contains JSON of reference tests. An additional"
    ,   "           all_filtered.html report will be generated in the output directory."
    ,   "   --pass*  percent of PASSed reference tests. e.g. 50 means that a test is considered"
    ,   "           (displayed in the HTML report) if the same test PASSed on at least 50% of"
    ,   "           the reference tests"
    ,   "   --overwrite*  bool, optionally used with --ref. Instead of creating a all_filtered.html report, the"
    ,   "           all.html will be overwritten with the filtered report results"
    ,   "   --failures*, -f to include any failure message text"
    ,   "   --markdown*, -m to interpret subtest name as Markdown"
    ,   "   --description*, -d description file to use to annotate the report."
    ,   "   --rollup**, -r to combine the multiple results from the same implementation into a single column."
    ,   "   --sort* to sort the test and subtests."
    ,   "   --spec*, -s SpecName to use in titling the report."
    ,   "   --ignoreFileName*    bool, ignore RegEx pattern for JSON filename."
    ,   "   --tokenFileName*     bool, use JSON files with name of type token-UA.json"
    ,   "   --help, -h to produce this message."
    ,   "   --version, -v to show the version number."
    ,   ""
    ,   "  Options marked with asterisks above can also be set by putting their settings in a"
    ,   "  wptreport.json file in the input directory."
    ,   ""
    ].join("\n"));
    process.exit(0);
}

if (options.version) {
    console.log("wptreport " + require("./package.json").version);

};

if (!fs.existsSync(options.input)) err("No input directory: " + options.input);
if (!fs.existsSync(options.output)) err("No output directory: " + options.output);


if (options.ref) {
    if (!fs.existsSync(options.ref)) {
        err("No ref directory: " + options.ref);
    } else {
        refConsolidated = readDir(options.ref, refConsolidated);
    }
};

if (options.ref && !options.pass) {
    console.log('No --pass value given, will default to 50 percent.');
    options.pass = 50;
}

if (options.pass && (options.pass < 0 || options.pass > 100)) {
    err('ref has to be a percentage value between 0 and 100');
} else if (options.pass) {
    refPass = Math.round((options.pass / 100) * Object.keys(refConsolidated).length);
};

consolidated = readDir(options.input, consolidated);

if (!reports.length) err("No JSON reports matching \\w\\w\\d\\d.json in input directory: " + options.input);

// filtering
// The way this works is simple: if there is a filter.js file in the input directory, it is loaded
// like a module. Its excludeFile(file) and excludeCase(file, name) are called. If true is returned
// for the first one, the whole test file is skipped; for the latter it's on a case by case basis.
// Both have default implementations that accept everything (i.e. always return false)
if (fs.existsSync(jn(options.input, "filter.js"))) filter = require(jn(options.input, "filter.js"));
if (!filter.excludeFile) filter.excludeFile = function () { return false; };
if (!filter.excludeCase) filter.excludeCase = function () { return false; };

var consolidate = function (_consolidated, _out) {
    // prepare list of tests with subtests
    // (used during consolidation to tell whether a "fake" subtest needs to be created)
    Object.keys(_consolidated).forEach(function (agent) {
        _consolidated[agent].results.forEach(function (testData) {
            var id = testData.test;
            if (filter.excludeFile(id)) return;
            if (!testData.hasOwnProperty("subtests") || !testData.subtests.length) return;
            subtestsPerTest[id] = true;
        });
    });

    for (var agent in _consolidated) {
        _out.ua.push(agent);
        for (var i = 0, n = _consolidated[agent].results.length; i < n; i++) {
            var testData = _consolidated[agent].results[i]
            ,   id = testData.test
            ;
            if (filter.excludeFile(id)) continue;
            if (!testData.subtests.length && filter.excludeCase(id, id)) continue; // manual/reftests
            if (filter.excludeFailed && filter.excludeFailed(id)) continue; // exclude test in report if reference has failed subtests
            if (!_out.results[id]) {
                _out.results[id] = {
                    byUA:       {}
                ,   UAmessage:  {}
                ,   totals:     {}
                ,   subtests:   {}
                };
            }
            // if there is a message, then capture it so we can include it in the output
            if (testData.hasOwnProperty("message") && testData.message !== null) {
                _out.results[id].UAmessage[agent] = testData.message;
                if (testData.message.match(/NOTRUN:/)) {
                    testData.status = "NOTRUN";
                } else if (testData.message.match(/SKIPPED:/)) {
                    testData.status = "NOTRUN";
                }
            }
            _out.results[id].byUA[agent] = testData.status;
            if (!_out.results[id].totals[testData.status]) _out.results[id].totals[testData.status] = 1;
            else _out.results[id].totals[testData.status]++;
            // manual and reftests don't have subtests, the top level test *is* the subtest.
            // Now, subtests may be defined in another report. This can happen if the whole test timeouts
            // in an agent without reporting individual subtest results for instance. No need to create a
            // "fake" subtest from the top-level test in that case.
            if (!testData.subtests.length) {
                if (!subtestsPerTest[id]) {
                    var stName = id;
                    if (stName === "constructor") stName = "_constructor";
                    if (!_out.results[id].subtests[stName]) _out.results[id].subtests[stName] = { stNum: 0, byUA: {}, UAmessage: {}, totals: {} };
                    _out.results[id].subtests[stName].byUA[agent] = testData.status;
                    if (!_out.results[id].subtests[stName].totals[testData.status]) _out.results[id].subtests[stName].totals[testData.status] = 1;
                    else _out.results[id].subtests[stName].totals[testData.status]++;
                }
            }
            else {
                for (var j = 0, m = testData.subtests.length; j < m; j++) {
                    var st = testData.subtests[j]
                    ,   stName = st.name
                    ;
                    // do not include undefined subtest names in multi report
                    if (!stName && options.tokenFileName) continue;
                    if (filter.excludeCase(id, stName)) continue;
                    if (stName === "constructor") stName = "_constructor";
                    // if the message has a comment with a special result, use that to decide what to do
                    if (st.message && st.message.match(/NOTRUN:/)) {
                        continue;
                    } else if (st.message && st.message.match(/SKIPPED:/)) {
                        continue;
                    }

                    if (!_out.results[id].subtests[stName]) _out.results[id].subtests[stName] = { stNum: j, byUA: {}, UAmessage: {}, totals: {} };

                    _out.results[id].subtests[stName].byUA[agent] = st.status;
                    if (!_out.results[id].subtests[stName].totals[st.status]) _out.results[id].subtests[stName].totals[st.status] = 1;
                    else _out.results[id].subtests[stName].totals[st.status]++;
                    if (st.hasOwnProperty("message") && st.message !== null) {
                        _out.results[id].subtests[stName].UAmessage[agent] = st.message;
                    }
                }
            }
        }
    }
    return _out;
}

// consolidation
var testList, testCount;
var prepareResultCreation = function () {
    out = consolidate(consolidated, out);
    wjson(jn(options.output, "consolidated.json"), out);

    for (var i = 0, n = out.ua.length; i < n; i++) uaPass[out.ua[i]] = 0;

    testCount = 0;
    testList = [] ;

    if (options.sort) {
        // we are sorting the test names
        testList = Object.keys(out.results).sort();
    } else {
        testList = Object.keys(out.results).map(function(name) { return name; });
    }
};

prepareResultCreation();

var createResult = function (test) {
    var run = out.results[test]
    ,   result = {
        status:     run.byUA
    ,   name:       test
    ,   fails:      []
    ,   subtests:   []
    ,   boom:       []
    ,   total:      0
    ,   testNum:    testCount
    };
    testCount ++;
    sortNames(run.subtests).forEach(function(n) {
        result.total++;
        totalSubtests++;
        if (!run.subtests[n].totals.PASS || run.subtests[n].totals.PASS < 2) result.fails.push({ name: n, stNum: run.subtests[n].stNum, byUA: run.subtests[n].byUA, UAmessage: run.subtests[n].UAmessage });
        if (!run.subtests[n].totals.PASS) result.boom.push({ name: n, stNum: run.subtests[n].stNum, byUA: run.subtests[n].byUA, UAmessage: run.subtests[n].UAmessage });
        for (var i = 0, m = out.ua.length; i < m; i++) {
            var res = run.subtests[n].byUA[out.ua[i]];
            if (res === "PASS") uaPass[out.ua[i]]++;
        }
        result.subtests.push({ name: n, stNum: run.subtests[n].stNum, byUA: run.subtests[n].byUA, UAmessage: run.subtests[n].UAmessage });
    });
    if (result.fails.length) lessThanTwo.push(result);
    if (result.boom.length) completeFail.push(result);
    all.push(result);
}

testList.forEach(createResult);

var startTable = "<thead><tr class='persist-header'><th>Test <span class='message_toggle'>Show/Hide Messages</span></th><th>" + out.ua.join("</th><th>") + "</th></tr></thead>\n"
,   startToc = "<h3>Test Files</h3>\n<ol class='toc'>"
,   script = options.failures ? "window.setTimeout(function() { \n $('.message_toggle').show();\n $('.messages').toggle(); \n $('.message_toggle').on('click', function() {\n$('.messages').toggle();\n});\n}, 1000);" : ""
,   description = (options.description !== "") ? rfs(jn(options.input, options.description)) : ""
;


var createAllTable = function (tableName) {
    var table = startTable
    ,   toc = startToc
    ,   subtests = 0
    ;
    var numberOfTestFiles = 0;
    for (var i = 0, n = all.length; i < n; i++) {
        var test = all[i];
        if (test.subtests.length === 0) { // exclude tests with no subtests from report
            continue;
        };
        numberOfTestFiles++;
        table += "<tr class='test' id='test-file-" + test.testNum + "'><td><a href='https://github.com/cta-wave/WMAS2017/blob/wmas2017-tests" + esc(test.name) + "' target='_blank'>" +
                 esc(test.name) + "</a></td>" + cells(test.status) + "</tr>\n";
        toc += "<li><a href='#test-file-" + i + "'>" + esc(test.name) + "</a></li>\n";
        for (var j = 0, m = test.subtests.length; j < m; j++) {
            var st = test.subtests[j];
            subtests++;
            var name = options.markdown ? markdown.makeHtml(st.name) : esc(st.name) ;
            table += "<tr id='subtest-" + test.testNum + "-" + st.stNum +"' class='subtest'><td>" + name + "</td>" + cells(st.byUA) + "</tr>\n";
            if (st.hasOwnProperty("UAmessage") && options.failures) {
                 // include rows with messages
                 table += messages(st.UAmessage) ;
            }
        }
    }
    toc += "</ol>";

    var meta = "<p><strong>Test files</strong>: " + numberOfTestFiles +
               "; <strong>Total subtests</strong>: " + subtests + "</p>"
    ;

    wfs(jn(options.output, tableName)
    ,   interpolate({
            title: prefix + "All Results"
        ,   table: table
        ,   meta:  meta
        ,   toc:  toc
        ,   script: script
        ,   desc:   description
        })
    );
};

var createLessThanTwoTable = function () {
    var table = startTable
    ,   toc = startToc
    ,   fails = 0
    ;
    for (var i = 0, n = lessThanTwo.length; i < n; i++) {
        var test = lessThanTwo[i]
        ,   details = "<small>(" + test.fails.length + "/" + test.total + ", " +
                     (100 * test.fails.length / test.total).toFixed(2) + "%, " +
                     (100 * test.fails.length / totalSubtests).toFixed(2) + "% of total)</small>"
        ;
        table += "<tr class='test' id='test-file-" + test.testNum + "'><td><a href='https://github.com/cta-wave/WMAS2017/blob/wmas2017-tests" + esc(test.name) + "' target='_blank'>" +
                 esc(test.name) + "</a> " + details + "</td>" + cells(test.status) + "</tr>\n";
        toc += "<li><a href='#test-file-" + i + "'>" + esc(test.name) + "</a> " + details + "</li>\n";
        for (var j = 0, m = test.fails.length; j < m; j++) {
            var st = test.fails[j];
            fails++;
            var name = options.markdown ? markdown.makeHtml(st.name) : esc(st.name) ;
            table += "<tr id='subtest-" +test.testNum+"-"+st.stNum+"' class='subtest'><td>" + name + "</td>" + cells(st.byUA) + "</tr>\n";
            if (st.hasOwnProperty("UAmessage") && options.failures) {
                 // include rows with messages
                 table += messages(st.UAmessage) ;
            }
        }
    }
    toc += "</ol>";

    var meta = "<p><strong>Test files without 2 passes</strong>: " + lessThanTwo.length +
               "; <strong>Subtests without 2 passes: </strong>" + fails +
               "; <strong>Failure level</strong>: " + fails + "/" + totalSubtests + " (" +
               (100 * fails / totalSubtests).toFixed(2) + "%)</p>"
    ;

    wfs(jn(options.output, "less-than-2.html")
    ,   interpolate({
            title: prefix + "Less Than 2 Passes"
        ,   table: table
        ,   meta:  meta
        ,   toc:  toc
        ,   script: script
        ,   desc:   description
        })
    );
};

var createCompleteFailTable = function () {
    var table = startTable
    ,   toc = startToc
    ,   fails = 0
    ;
    for (var i = 0, n = completeFail.length; i < n; i++) {
        var test = completeFail[i]
        ,   details = "<small>(" + test.boom.length + "/" + test.total + ", " +
                     (100 * test.boom.length / test.total).toFixed(2) + "%, " +
                     (100 * test.boom.length / totalSubtests).toFixed(2) + "% of total)</small>"
        ;
        table += "<tr class='test' id='test-file-" + test.testNum + "'><td><a href='https://github.com/cta-wave/WMAS2017/blob/wmas2017-tests" + esc(test.name) + "' target='_blank'>" +
                 esc(test.name) + "</a> " + details + "</td>" + cells(test.status) + "</tr>\n";
        toc += "<li><a href='#test-file-" + i + "'>" + esc(test.name) + "</a> " + details + "</li>\n";
        for (var j = 0, m = test.boom.length; j < m; j++) {
            var st = test.boom[j];
            fails++;
            var name = options.markdown ? markdown.makeHtml(st.name) : esc(st.name) ;
            table += "<tr id='subtest-" + test.testNum+"-"+st.stNum+"' class='subtest'><td>" + name + "</td>" + cells(st.byUA) + "</tr>\n";
            if (st.hasOwnProperty("UAmessage") && options.failures) {
                 // include rows with messages
                 table += messages(st.UAmessage) ;
            }
        }
    }
    toc += "</ol>";

    var meta = "<p><strong>Completely failed files</strong>: " + lessThanTwo.length +
               "; <strong>Completely failed subtests</strong>: " + fails +
               "; <strong>Failure level</strong>: " + fails + "/" + totalSubtests + " (" +
               (100 * fails / totalSubtests).toFixed(2) + "%)</p>"
    ;

    wfs(jn(options.output, "complete-fails.html")
    ,   interpolate({
            title: prefix + "Complete Failures"
        ,   table: table
        ,   meta:  meta
        ,   toc:  toc
        ,   script: script
        ,   desc:   description
        })
    );
};

createAllTable('all.html');
createLessThanTwoTable();
createCompleteFailTable();

// create ref-filtered report
if (Object.keys(refConsolidated).length) {

    refOut = consolidate(refConsolidated, refOut);

    // define filter excludeCase function
    filter.excludeCase = function (id, name) {
        var refOutResult = refOut.results[id];
        var refOutResultSubtest = refOutResult && refOutResult.subtests && refOutResult.subtests[name];
        var refOutResultSubtestPASS = refOutResultSubtest && refOutResultSubtest.totals && refOutResultSubtest.totals.PASS;
        if(!refOutResultSubtestPASS || refOutResultSubtestPASS < refPass){
            return true;
        }
        return false;
    };

    filter.excludeFailed = function (id) {
        var refOutResult = refOut.results[id];
        for (x in refOutResult.subtests) {
            if (refOutResult.subtests.hasOwnProperty(x)) {
                var totals  = refOutResult.subtests[x].totals;
                if (totals.FAIL > 0 || totals.TIMEOUT > 0 || totals.NOTRUN > 0) return true;
            }
        }
        return false;
    };

    // consolidate again with filter
    consolidated = {};
    consolidated = readDir(options.input, consolidated);
    out = {
        ua: []
    ,   results: {}
    };
    uaPass = {}
    all = [];

    prepareResultCreation();

    // create results
    testList.forEach(createResult);

    // create the html report
    if (options.overwrite) {
        createAllTable('all.html');
    } else {
        createAllTable('all_filtered.html');
    }
}

// copy resources over
copyFiles.forEach(function (f) {
    fs.copySync(jn(resDir, f), jn(options.output, f));
});
