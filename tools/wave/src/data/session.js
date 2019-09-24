const TestLoader = require("../testing/test-loader");

const PAUSED = "paused";
const RUNNING = "running";
const COMPLETED = "completed";
const ABORTED = "aborted";
const PENDING = "pending";
const UNKNOWN = "unknown";

/**
 * @module Session
 */
class Session {
  constructor(
    token,
    {
      types = [TestLoader.TEST_HARNESS_TESTS],
      userAgent = null,
      labels = [],
      tests,
      pendingTests = {},
      runningTests = {},
      completedTests = {},
      timeouts = null,
      status = UNKNOWN,
      testFilesCount,
      testFilesCompleted,
      dateStarted = null,
      dateFinished = null,
      isPublic = false,
      referenceTokens = [],
      browser = null,
      webhookUrls = [],
      expirationDate = null
    } = {}
  ) {
    this._token = token;
    this._tests = tests;
    this._types = types;
    this._userAgent = userAgent;
    this._labels = labels;
    this._pendingTests = pendingTests;
    this._runningTests = runningTests;
    this._completedTests = completedTests;
    this._testFilesCount = testFilesCount;
    this._testFilesCompleted = testFilesCompleted;
    this._timeouts = timeouts;
    this._status = status;
    this._dateStarted = dateStarted;
    this._dateFinished = dateFinished;
    this._public = isPublic;
    this._referenceTokens = referenceTokens;
    this._browser = browser;
    this._webhookUrls = webhookUrls;
    this._expirationDate = expirationDate;
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

  getLabels() {
    return this._labels;
  }

  setLabels(labels) {
    this._labels = labels;
    return this;
  }

  getTypes() {
    return this._types;
  }

  setTypes(types) {
    this._types = types;
    return this;
  }

  getTests() {
    return this._tests;
  }

  setTests(tests) {
    this._tests = tests;
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
    return this;
  }

  getTimeouts() {
    return this._timeouts;
  }

  setTimeouts(timeouts) {
    this._timeouts = timeouts;
    return this;
  }

  getTestFilesCount() {
    return this._testFilesCount;
  }

  setTestFilesCount(testFilesCount) {
    this._testFilesCount = testFilesCount;
    return this;
  }

  getTestFilesCompleted() {
    return this._testFilesCompleted;
  }

  setTestFilesCompleted(testFilesCompleted) {
    this._testFilesCompleted = testFilesCompleted;
    return this;
  }

  getStatus() {
    return this._status;
  }

  setStatus(status) {
    this._status = status;
    return this;
  }

  getDateStarted() {
    return this._dateStarted;
  }

  setDateStarted(dateStarted) {
    this._dateStarted = dateStarted;
    return this;
  }

  getDateFinished() {
    return this._dateFinished;
  }

  setDateFinished(dateFinished) {
    this._dateFinished = dateFinished;
    return this;
  }

  isPublic() {
    return this._public;
  }

  getReferenceTokens() {
    return this._referenceTokens;
  }

  setReferenceTokens(referenceTokens) {
    this._referenceTokens = referenceTokens;
    return this;
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

  getWebhookUrls() {
    return this._webhookUrls;
  }

  setWebhookUrls(webhookUrls) {
    this._webhookUrls = webhookUrls;
    return this;
  }

  getExpirationDate() {
    return this._expirationDate;
  }

  setExpirationDate(expirationDate) {
    this._expirationDate = expirationDate;
    return this;
  }
}

Session.RUNNING = RUNNING;
Session.PAUSED = PAUSED;
Session.COMPLETED = COMPLETED;
Session.ABORTED = ABORTED;
Session.PENDING = PENDING;
Session.UNKNOWN = UNKNOWN;

module.exports = Session;
