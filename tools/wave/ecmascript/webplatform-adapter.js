setup(function() {}, {
  allow_uncaught_exception: true
});

var evaluated = false;

function $TEST_COMPLETED() {
  evaluate();
}

function $ERROR(error) {
  evaluate(error);
}

function evaluate(error) {
  if (evaluated) {
    return;
  }
  evaluated = true;
  getSource(function(source) {
    var meta = parseMetadata(source);

    var negative = null;
    if (meta.hasOwnProperty("negative")) {
      negative = {};
      if (meta["negative"] !== "") {
        negative.regex = new RegExp(meta["negative"]);
      }
    }
    if (negative) {
      if (negative.regex) {
        assert_regexp_match(error, negative.regex, meta.description);
      } else {
        assert_not_equals(error, undefined, meta.description);
      }
    } else {
      assert_equals(error, undefined, meta.description);
    }
    done();
  });
}

function getSource(loadedCallback) {
  var path = testUrl;
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function(content) {
    loadedCallback(content.srcElement.response);
  });
  xhr.open("GET", path);
  xhr.send();
}

function parseMetadata(src) {
  var meta = {};
  var inMeta = false;
  var lines = src.split("\n");
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (inMeta) {
      if (/\*\//.test(line)) {
        break;
      }
      if (/@.+/.test(line)) {
        var key = "";
        var value = "";
        var parts = line.split(" ");
        for (var j = 0; j < parts.length; j++) {
          var part = parts[j];
          if (key === "") {
            if (/^@/.test(part)) key = part.replace("@", "");
          } else {
            value += part + " ";
          }
        }
        value = value.trim();
        meta[key] = value;
      }
    } else {
      inMeta = /\/\*\*/.test(line);
    }
  }
  return meta;
}

var errorEventListener = function(error) {
  evaluate(error.message);
  window.removeEventListener("error", errorEventListener);
};

window.addEventListener("error", errorEventListener);

// /ecmascript/tests/built-ins/RegExp/prototype/Symbol.match/builtin-coerce-global.html "Aw Snap"
// /ecmascript/tests/built-ins/RegExp/prototype/Symbol.match/coerce-global.html "Aw Snap"
// /ecmascript/tests/built-ins/RegExp/prototype/Symbol.replace/coerce-global.html "Aw Snap"
// /ecmascript/tests/language/statements/for-of/iterator-next-reference.html "Website unresponsive"
