
# wptreport - Report generator for WPT test result sets

If you use the [WPT test runner](http://w3c-test.org/tools/runner/index.html) you are getting a 
bunch of JSON test results which you can't do much that's immediately, humanly useful with. There
are quite a few of those in the [test results repository](https://github.com/w3c/test-results/).

The purpose of `wptreport` is to generate human-oriented reports for such data.

## Installation

The typical installation is:

    npm install wptreport

If you're hacking on the code, or want to be on the bleeding edge (which shouldn't be needed: I ship
the code pretty much anytime I make a change), you can alternatively

    git clone https://github.com/darobin/wptreport.git
    cd wptreport
    npm link .

## Usage

This is a command-line tool, it takes some basic options.

`wptreport [--input /path/to/dir] [--output /path/to/dir] [--ref /path/to/dir] [--pass number] [--tokenFileName bool] [--spec SpecName] [-f] [-m] [-d description]`

* `--input <directory>`, `-i  <directory>`: Path to the directory that contains all the JSON data. 
  JSON files must match the pattern `[a-zA-Z]{2}\d+\.json` where the two first letters are an identifier 
  for the browser engine (use whatever makes sense to your audience) and the number is the version 
  number. Defaults to the current directory. This is also where the `filter.js` is found, if any 
  (see the section on filtering).
* `--output <directory>`, `-o <directory>`: The directory where the generated reports are stored.
  Defaults to the current directory.
* `--ref <directory>`: Path to directory that contains all JSON data of tests to be used as
  reference for filtering the report.
* `--pass`: percent of PASSed reference tests. e.g. 50 means that a test is considered 
  (displayed in the HTML report) if the same test PASSed on at least 50% of the reference tests
* `--ignoreFileName`: bool, ignore RegEx pattern for JSON filename
* `--tokenFileName`: bool, use JSON file names of type `token-UA.json`,
  e.g. `b8326300-746c-11e8-94ff-57eabbf3ff68-Wk604.json`, where UA has to match pattern `[a-zA-Z]{2}\d+`
* `--spec SpecName`, `-s SpecName`: The specification name to use in titling the report. Optional, 
  but certainly looks nicer.
* `--description DescFile`, `-d DescFile`: Include a description of report at the top.
* `--failures`, `-f`: Include messages about failures in report.
* `--markdown`, `-m`: Interpret subtest names as markdown.
* `--help`, `-h`: Get some help (about the tool, you're on your own for your other issues).
* `--version`, `-v`: Get the version number.

If there is a `wptreport.json` file in the input directory, options will be read from that file
(but command line options will override those settings).

The format of the JSON files is defined by the test runner.

## Filtering

If the input directory contains a `filter.js` file, it will be loaded as a Node module (and can 
therefore completely operate like one). Some test suites have experimental tests, tests that can
provide useful information in some cases that you don't want in others, etc. As such, it can be 
useful to filter out some results before reporting.

The module can optionally export two methods:

* `excludeFile(fileName)`. Receives the name of the test *file* being looked at (as listed in the 
  JSON data). Return `true` to skip it (and therefore all of its content), `false` to keep it.
* `excludeCase(fileName, caseName)`. Receives both the name of the test file and that of the test
  case being looked at. Skip with `true`, keep with `false`. This is the same as the previous one,
  only more granular.

