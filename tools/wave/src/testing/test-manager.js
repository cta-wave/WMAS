const Session = require("../data/session");
const TestLoader = require("../testing/test-loader");
const ResultsManager = require("../testing/results-manager");

class TestManager {
  /**
   * @param {Object} config
   * @param {TestLoader} config.testLoader
   * @param {ResultsManager} config.resultsManager
   */
  initialize({ testLoader, resultsManager, sessionManager }) {
    this._timeouts = [];
    this._testLoader = testLoader;
    this._resultsManager = resultsManager;
    this._sessionManager = sessionManager;
  }

  /**
   * @param {Object} config
   * @param {Session} config.session
   */
  async nextTest(session) {
    let pendingTests = session.getPendingTests();
    let runningTests = session.getRunningTests();
    const token = session.getToken();

    let test;
    let api;
    let hasHttp = true;
    let hasManual = true;
    let currentApi = 0;
    let currentTest = 0;
    const apis = Object.keys(pendingTests).sort((testA, testB) =>
      testA.toLowerCase() > testB.toLowerCase() ? 1 : -1
    );
    while (!test) {
      api = apis[currentApi];
      if (!api) return null;
      test = pendingTests[api][currentTest];

      if (!test) {
        currentApi++;
        currentTest = 0;

        if (currentApi === apis.length) {
          if (hasHttp) {
            hasHttp = false;
            currentApi = 0;
            test = null;
            continue;
          }

          if (hasManual) {
            hasManual = false;
            currentApi = 0;
            test = null;
            hasHttp = true;
            continue;
          }

          return null;
        }
        test = null;
        continue;
      }

      if (test.indexOf("manual") !== -1 && test.indexOf("https") === -1) {
        break;
      }

      if (test.indexOf("manual") !== -1 && test.indexOf("https") !== -1) {
        if (!hasHttp) {
          break;
        }
      }

      if (test.indexOf("manual") === -1 && test.indexOf("https") === -1) {
        if (!hasManual) {
          break;
        }
      }

      if (test.indexOf("manual") === -1 && test.indexOf("https") !== -1) {
        if (!hasManual && !hasHttp) {
          break;
        }
      }

      currentTest++;
      test = null;
    }

    this.removeTestFromList(pendingTests, test, api);
    this.addTestToList(runningTests, test, api);

    const testTimeout = this.getTestTimeout({ test, session });
    this._timeouts.push({
      test,
      timeout: setTimeout(() => this._onTestTimeout(token, test), testTimeout)
    });

    session.setPendingTests(pendingTests);
    session.setRunningTests(runningTests);
    await this._sessionManager.updateSession(session);
    return test;
  }

  _onTestTimeout(token, test) {
    // console.log("TIMEOUT", test);
    const data = {
      test,
      status: 2, // TIMEOUT
      message: null,
      subtests: [
        {
          status: 2, // TIMEOUT
          xstatus: "SERVERTIMEOUT"
        }
      ]
    };
    this._resultsManager
      .createResult({ token, data })
      .catch(error => console.error(error));
  }

  /**
   *
   * @param {Object} config
   * @param {Session} config.session
   */
  async completeTest({ test, session }) {
    let runningTests = session.getRunningTests();
    let completedTests = session.getCompletedTests();

    const api = test.split("/").find(part => !!part);
    this.removeTestFromList(runningTests, test, api);
    this.addTestToList(completedTests, test, api);
    for (let i = 0; i < this._timeouts.length; i++) {
      if (this._timeouts[i].test === test) {
        clearTimeout(this._timeouts[i].timeout);
        this._timeouts.splice(i, 1);
        break;
      }
    }

    await this._sessionManager.updateTests({runningTests, completedTests, session});
  }

  removeTestFromList(testList, test, api) {
    if (!testList[api]) return;
    const index = testList[api].indexOf(test);
    if (index === -1) return;
    testList[api].splice(index, 1);
    if (testList[api].length === 0) {
      delete testList[api];
    }
  }

  addTestToList(testList, test, api) {
    if (testList[api] && testList[api].indexOf(test) !== -1) return;
    if (!testList[api]) testList[api] = [];
    testList[api].push(test);
  }

  async readTests() {
    return this._testLoader.getTests();
  }

  async readLastCompletedTests({ token, count }) {
    const results = await this._resultsManager.readResults(token);
    const apis = Object.keys(results).sort((apiA, apiB) =>
      apiA.toLowerCase() > apiB.toLowerCase() ? -1 : 1
    );
    const tests = { pass: [], fail: [], timeout: [] };
    const isPassComplete = () => tests.pass.length === count;
    const isFailComplete = () => tests.fail.length === count;
    const isTimeoutComplete = () => tests.timeout.length === count;
    const isAllComplete = () =>
      isPassComplete() && isFailComplete() && isTimeoutComplete();
    for (let api of apis) {
      const apiResults = results[api].sort((resultA, resultB) =>
        resultA.test > resultB.test ? -1 : 1
      );
      for (let result of apiResults) {
        switch (result.status) {
          case "ERROR":
            if (!isFailComplete()) tests.fail.push(result.test);
            continue;
          case "TIMEOUT":
            if (!isTimeoutComplete()) tests.timeout.push(result.test);
            continue;
        }
        let pass = true;
        for (let test of result.subtests) {
          if (test.status !== "PASS") {
            pass = false;
            break;
          }
        }
        if (pass && !isPassComplete()) tests.pass.push(result.test);
        if (!pass && !isFailComplete()) tests.fail.push(result.test);
        if (isAllComplete()) return tests;
      }
    }
    return tests;
  }

  getTestTimeout({ test, session }) {
    const timeouts = session.getTimeouts();
    let testTimeout =
      test.indexOf("manual") !== -1 ? timeouts.manual : timeouts.automatic;
    const timeoutPath = Object.keys(timeouts).find(path =>
      new RegExp("^" + path, "i").test(test.replace(".", ""))
    );
    if (timeoutPath) {
      testTimeout = timeouts[timeoutPath];
    }
    return testTimeout;
  }
}

module.exports = TestManager;
