const TestLoader = require("../testing/test-loader");
const UserAgentParser = require("../utils/user-agent-parser");

const PAUSED = "paused";
const RUNNING = "running";
const COMPLETED = "completed";
const ABORTED = "aborted";
const UNKNOWN = "unknown";

/**
 * @module Session
 */
class Session {
  constructor(
    token,
    {
      path = "",
      types = [TestLoader.TEST_HARNESS_TESTS],
      userAgent = null,
      tests,
      pendingTests = {},
      runningTests = {},
      completedTests = {},
      testTimeout = null,
      status = COMPLETED,
      testFilesCount = this._calculateTestFilesCount(tests),
      testFilesCompleted = this._calculateTestFilesCount(completedTests),
      dateStarted = null,
      dateFinished = null,
      isPublic = false,
      referenceTokens = [],
      browser = null
    } = {}
  ) {
    this._token = token;
    this._path = path;
    this._types = types;
    this._userAgent = userAgent;
    if (tests) {
      this._pendingTests = tests;
      this._runningTests = {};
      this._completedTests = {};
    } else {
      this._pendingTests = pendingTests;
      this._runningTests = runningTests;
      this._completedTests = completedTests;
    }
    this._testFilesCount = testFilesCount;
    this._testFilesCompleted = testFilesCompleted;
    this._testTimeout = testTimeout;
    this._status = status;
    this._clients = [];
    this._dateStarted = dateStarted;
    this._dateFinished = dateFinished;
    this._public = isPublic;
    this._referenceTokens = referenceTokens;
    this._browser = browser;
    if (!browser) {
      const { browser: parsedBrowser } = UserAgentParser.parse(this._userAgent);
      this._browser = parsedBrowser;
    }
  }

  _calculateTestFilesCount(tests) {
    let testFilesCount = {};
    for (let api in tests) {
      testFilesCount[api] = tests[api].length;
    }
    return testFilesCount;
  }

  isTestComplete(needleTest) {
    return this._testListContainsTest(needleTest, this._completedTests);
  }

  testExists(test) {
    return (
      this._testListContainsTest(test, this._pendingTests) ||
      this._testListContainsTest(test, this._runningTests) ||
      this._testListContainsTest(test, this._completedTests)
    );
  }

  _testListContainsTest(needleTest, testList) {
    return (
      Object.values(testList)
        .reduce((allTests, tests) => allTests.concat(tests), [])
        .findIndex(test => test === needleTest) >= 0
    );
  }

  isApiComplete(api) {
    return !this._pendingTests[api] && !this._runningTests[api];
  }

  addClient(client) {
    this._clients.push(client);
    return this;
  }

  removeClient(client) {
    this._clients.splice(this._clients.indexOf(client), 1);
    return this;
  }

  getToken() {
    return this._token;
  }

  setToken(token) {
    this._token = token;
    return this;
  }

  getUserAgent() {
    return this._userAgent;
  }

  setUserAgent(userAgent) {
    this._userAgent = userAgent;
    return this;
  }

  getPath() {
    if (this._path === "") {
      return "/";
    }
    return this._path;
  }

  setPath(path) {
    this._path = path;
    return this;
  }

  getTypes() {
    return this._types;
  }

  setTypes(types) {
    this._types = types;
    return this;
  }

  setTests(tests) {
    this._pendingTests = tests;
    this._runningTests = {};
    this._completedTests = {};
    this._testFilesCount = this._calculateTestFilesCount(tests);
    return this;
  }

  getPendingTests() {
    return this._pendingTests;
  }

  setPendingTests(pendingTests) {
    this._pendingTests = pendingTests;
    return this;
  }

  getRunningTests() {
    return this._runningTests;
  }

  setRunningTests(runningTests) {
    this._runningTests = runningTests;
    return this;
  }

  getCompletedTests() {
    return this._completedTests;
  }

  setCompletedTests(completedTests) {
    this._completedTests = completedTests;
    this._testFilesCompleted = this._calculateTestFilesCount(
      this._completedTests
    );
    return this;
  }

  getTestTimeout() {
    return this._testTimeout;
  }

  getTestFilesCount() {
    return this._testFilesCount;
  }

  getTestFilesCompleted() {
    return this._testFilesCompleted;
  }

  getStatus() {
    return this._status;
  }

  setStatus(status) {
    this._status = status;
    this._clients.forEach(client => client.send("status"));
    if (status === COMPLETED || status === ABORTED) {
      this._dateFinished = Date.now();
    }
    return this;
  }

  getDateStarted() {
    return this._dateStarted;
  }

  getDateFinished() {
    return this._dateFinished;
  }

  isPublic() {
    return this._public;
  }

  getReferenceTokens() {
    return this._referenceTokens;
  }

  getClients() {
    return this._clients;
  }

  setClients(clients) {
    this._clients = clients;
    return this;
  }

  getBrowser() {
    return this._browser;
  }

  setBrowser(browser) {
    this._browser = browser;
    return this;
  }
}

Session.RUNNING = RUNNING;
Session.PAUSED = PAUSED;
Session.COMPLETED = COMPLETED;
Session.ABORTED = ABORTED;
Session.UNKNOWN = UNKNOWN;

module.exports = Session;
