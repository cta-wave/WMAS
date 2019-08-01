const Session = require("../data/session");
const TestLoader = require("../testing/test-loader");

class TestManager {
  /**
   *
   * @param {Object} config
   * @param {TestLoader} config.testLoader
   */
  constructor({ testLoader }) {
    this._timeouts = [];
    this._testLoader = testLoader;
  }

  /**
   *
   * @param {Object} config
   * @param {Session} config.session
   */
  nextTest({ onTimeout, session }) {
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
      timeout: setTimeout(() => onTimeout(token, test), testTimeout)
    });

    session.setPendingTests(pendingTests);
    session.setRunningTests(runningTests);
    return test;
  }

  /**
   *
   * @param {Object} config
   * @param {Session} config.session
   */
  completeTest({ test, session }) {
    let runningTests = session.getRunningTests();
    let completedTests = session.getCompletedTests();
    let clients = session.getClients();

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
    clients.forEach(client => client.send("complete"));

    session.setRunningTests(runningTests);
    session.setCompletedTests(completedTests);
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

  getTestTimeout({ test, session }) {
    const timeouts = session.getTimeouts();
    let testTimeout =
      test.indexOf("manual") !== -1 ? timeouts.manual : timeouts.automatic;
    const timeoutPath = Object.keys(timeouts).find(path =>
      new RegExp("^" + path, "i").test(test)
    );
    if (timeoutPath) {
      testTimeout = timeouts[timeoutPath];
    }
    return testTimeout;
  }
}

module.exports = TestManager;
