const path = require("path");

const FileSystem = require("../utils/file-system");
const UserAgentParser = require("../utils/user-agent-parser");

// test types
const TEST_HARNESS_TESTS = "testharness";
const REF_TESTS = "reftest";
const MANUAL_TESTS = "manual";

class TestLoader {
  constructor({
    resultsDirectoryPath,
    excludeListFilePath,
    includeListFilePath
  }) {
    this._resultsDirectoryPath = resultsDirectoryPath;
    this._includeListFilePath = includeListFilePath;
    this._excludeListFilePath = excludeListFilePath;
    this._tests = {};
    this._tests[TEST_HARNESS_TESTS] = [];
    this._tests[REF_TESTS] = [];
    this._tests[MANUAL_TESTS] = [];
  }

  _getFilePath({ userAgent, api, token }) {
    const apiDirectory = path.join(this._resultsDirectoryPath, token, api);
    return path.join(apiDirectory, this._getFileName(userAgent));
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
    let tests = manifest.items;
    let includeList = [];
    if (await FileSystem.exists(this._includeListFilePath)) {
      includeList = (await FileSystem.readFile(this._includeListFilePath))
        .split("\n")
        .map(line =>
          line.indexOf("#") === -1 ? line : line.substr(0, line.indexOf("#"))
        )
        .map(line => line.replace(/ /g, ""))
        .filter(line => !!line);
    }
    let excludeList = [];
    if (await FileSystem.exists(this._excludeListFilePath)) {
      excludeList = (await FileSystem.readFile(this._excludeListFilePath))
        .split("\n")
        .map(line => line.substr(0, line.indexOf("#")))
        .map(line => line.replace(/ /g, ""))
        .filter(line => !!line);
    }
    if (tests.hasOwnProperty(TEST_HARNESS_TESTS)) {
      this._tests[TEST_HARNESS_TESTS] = this._loadTests({
        testPaths: tests[TEST_HARNESS_TESTS],
        excludeList
      });
    }
    // if (tests.hasOwnProperty(REF_TESTS)) {
    //   this._tests[REF_TESTS] = this._loadTests(tests[REF_TESTS]);
    // }
    if (tests.hasOwnProperty(MANUAL_TESTS)) {
      this._tests[MANUAL_TESTS] = this._loadTests({
        testPaths: tests[MANUAL_TESTS],
        includeList
      });
    }
  }

  _loadTests({ testPaths, includeList, excludeList }) {
    const tests = {};
    for (let testPath in testPaths) {
      if (this._isValidTest({ testPath, includeList, excludeList })) {
        if (testPath.startsWith("/")) testPath = testPath.substr(1);
        const apiName = this._getApiName(testPath);
        if (!tests[apiName]) tests[apiName] = [];
        tests[apiName].push(testPath);
      }
    }
    return tests;
  }

  _isValidTest({ testPath, includeList, excludeList }) {
    let isValid = true;
    isValid = isValid && !testPath.endsWith(".js");
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
    return testPath.split("/")[0];
  }

  async _getRefResults({ token, userAgent, api }) {
    const readApiResults = async ({ userAgent, token, api }) => {
      try {
        const file = await FileSystem.readFile(
          this._getFilePath({ token, userAgent, api })
        );
        return JSON.parse(file).results;
      } catch (e) {
        console.error("warn: could not read json result file:", e);
        return [];
      }
    };

    if (!api || api === "/") {
      const apis = await FileSystem.readDirectory(
        path.join(this._resultsDirectoryPath, token)
      );
      const results = await Promise.all(
        apis.map(async api => readApiResults({ userAgent, token, api }))
      );
      return results.reduce(
        (accumulator, current) => accumulator.concat(current),
        []
      );
    }
    return await readApiResults({ userAgent, token, api });
  }

  async getTests({ types, path, refSessions }) {
    let tests = {};

    let paths = path.split(/, ?/);
    await Promise.all(
      paths.map(async path => {
        let regex = null;
        if (path.startsWith("/")) {
          path = path.substr(1);
          regex = new RegExp("^" + path, "i");
        } else {
          regex = new RegExp(path, "i");
        }

        for (let type of types) {
          let refResults = await Promise.all(
            refSessions.map(async session => {
              return await this._getRefResults({
                userAgent: session.getUserAgent(),
                token: session.getToken(),
                api: path
              });
            })
          );

          // console.log(refResults)
          // web-platform.test:8050/?path=/2dcontext,/css,/content-security-policy,/dom,/ecmascript,/encrypted-media,/fetch,/fullscreen,/html,/IndexedDB,/media-source,/notifications,/uievents,/WebCryptoAPI,/webaudio,/webmessaging,/websockets,/webstorage,/workers,/xhr&reftoken=01d11810-7938-11e8-8749-a6ac1d216fc7,a831a820-7855-11e8-9ce0-d6175576bb4b,c0cdb6c0-7b99-11e8-939a-90ffd3c0ec6f,ce4aec10-7855-11e8-b81b-6714c602f007
          for (let api in this._tests[type]) {
            for (let testPath of this._tests[type][api]) {
              if (!regex.test(testPath)) continue;
              if (!tests[api]) tests[api] = [];

              // filter out test files that didn't pass in the reference results
              if (
                refResults.some(refResult => {
                  let refTest = refResult.find(
                    result => result.test === "/" + testPath
                  );
                  if (!refTest) return false;
                  let hasSubFailed = true; // assuming sub test failed
                  if (refTest.subtests.length) {
                    hasSubFailed = refTest.subtests.some(
                      sub => !(sub.status === "PASS")
                    ); // until its proven wrong
                  }
                  return hasSubFailed;
                })
              )
                continue;

              tests[api].push(testPath);
            }
          }
        }
      })
    );

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

module.exports = TestLoader;
