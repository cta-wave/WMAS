const FileSystem = require("../utils/file-system");
const UserAgentParser = require("../utils/user-agent-parser");

// test types
const TEST_HARNESS_TESTS = "testharness";
const REF_TESTS = "reftest";
const MANUAL_TESTS = "manual";
const AUTOMATIC_TESTS = "automatic";

class TestLoader {
  /**
   * @param {Object} config
   */
  initialize({ resultsManager, excludeListFilePath, includeListFilePath }) {
    this._resultsManager = resultsManager;
    this._includeListFilePath = includeListFilePath;
    this._excludeListFilePath = excludeListFilePath;
    this._tests = {};
    this._tests[AUTOMATIC_TESTS] = [];
    this._tests[REF_TESTS] = [];
    this._tests[MANUAL_TESTS] = [];
  }

  _getFileName(userAgent) {
    const {
      browser: { name, version }
    } = UserAgentParser.parse(userAgent);
    const abbreviation = UserAgentParser.abbreviateBrowserName(name);
    return abbreviation + version + ".json";
  }

  async loadTests(manifestPath) {
    const manifest = JSON.parse(await FileSystem.readFile(manifestPath));
    const tests = manifest.items;
    const includeList = await this._loadTestList(this._includeListFilePath);
    const excludeList = await this._loadTestList(this._excludeListFilePath);
    if (tests.hasOwnProperty(TEST_HARNESS_TESTS)) {
      this._tests[AUTOMATIC_TESTS] = this._loadTests({
        tests: tests[TEST_HARNESS_TESTS],
        excludeList
      });
    }
    // if (tests.hasOwnProperty(REF_TESTS)) {
    //   this._tests[REF_TESTS] = this._loadTests(tests[REF_TESTS]);
    // }
    if (tests.hasOwnProperty(MANUAL_TESTS)) {
      this._tests[MANUAL_TESTS] = this._loadTests({
        tests: tests[MANUAL_TESTS],
        includeList
      });
    }
  }

  _loadTests({ tests, includeList, excludeList }) {
    const loadedTests = {};
    for (let test in tests) {
      let testPath = tests[test][0][0];
      if (this._isValidTest({ testPath, includeList, excludeList })) {
        const apiName = this._getApiName(testPath);
        if (!loadedTests[apiName]) loadedTests[apiName] = [];
        loadedTests[apiName].push(testPath);
      }
    }
    return loadedTests;
  }

  _isValidTest({ testPath, includeList, excludeList }) {
    let isValid = true;
    if (includeList) {
      isValid =
        isValid &&
        includeList
          .map(path => new RegExp("^" + path, "i"))
          .some(regExp => regExp.test(testPath));
    }
    if (excludeList) {
      isValid =
        isValid &&
        !excludeList
          .map(path => new RegExp("^" + path, "i"))
          .some(regExp => regExp.test(testPath));
    }
    return isValid;
  }

  _getApiName(testPath) {
    return testPath.split("/").filter(part => !!part)[0];
  }

  async _loadTestList(listFilePath) {
    let testList = [];
    if (await FileSystem.exists(listFilePath)) {
      testList = (await FileSystem.readFile(listFilePath))
        .split(/\r\n|\n\r|\r|\n/)
        .map(line =>
          line.indexOf("#") === -1 ? line : line.substr(0, line.indexOf("#"))
        )
        .map(line => line.replace(/ /g, ""))
        .filter(line => !!line);
    }
    return testList;
  }

  async getTests({
    types = [AUTOMATIC_TESTS, MANUAL_TESTS],
    includeList,
    excludeList,
    referenceTokens
  } = {}) {
    let tests = {};

    const referenceResults = await this._resultsManager.readCommonPassedTests(
      referenceTokens
    );

    for (let type of types) {
      for (let api in this._tests[type]) {
        for (let testPath of this._tests[type][api]) {
          if (!this._isValidTest({ testPath, includeList, excludeList }))
            continue;
          if (referenceResults && !referenceResults[api].includes(testPath))
            continue;
          if (!tests[api]) tests[api] = [];
          tests[api].push(testPath);
        }
      }
    }

    for (let api in tests) {
      tests[api] = tests[api].sort((testA, testB) =>
        testA.toLowerCase() > testB.toLowerCase() ? 1 : -1
      );
    }

    return tests;
  }
}

TestLoader.TEST_HARNESS_TESTS = TEST_HARNESS_TESTS;
TestLoader.REF_TESTS = REF_TESTS;
TestLoader.MANUAL_TESTS = MANUAL_TESTS;
TestLoader.AUTOMATIC_TESTS = AUTOMATIC_TESTS;

module.exports = TestLoader;
