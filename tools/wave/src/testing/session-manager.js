const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

const Session = require("../data/session");
const TestLoader = require("../testing/test-loader");
const Database = require("../database");
const UserAgentParser = require("../utils/user-agent-parser");

const DEFAULT_TEST_PATH = "/";
const DEFAULT_TEST_TYPES = [
  TestLoader.AUTOMATIC_TESTS,
  TestLoader.MANUAL_TESTS
];
const DEFAULT_AUTOMATIC_TIMEOUT = 60000;
const DEFAULT_MANUAL_TIMEOUT = 5 * 60000;

/**
 * @module SessionManager
 */
class SessionManager {
  /**
   * @param {Object} config
   * @param {Database} config.database
   */
  initialize({ database, testTimeout, testLoader } = {}) {
    this._database = database;
    this._sessions = [];
    this._testTimeout = testTimeout;
    this._testLoader = testLoader;
    this._sessionClients = [];
  }

  async findToken(fragment) {
    if (fragment.length < 8) return null;
    const tokens = await this._database.findTokens(fragment);
    if (tokens.length === 1) {
      return tokens[0];
    }
    return null;
  }

  async createSession({
    tests,
    types,
    timeouts,
    referenceTokens,
    webhookUrls,
    userAgent
  } = {}) {
    if (!tests) tests = {};
    if (!tests.include) tests.include = [DEFAULT_TEST_PATH];
    if (!tests.exclude) tests.exclude = [];
    if (!types) types = DEFAULT_TEST_TYPES;
    if (!timeouts) timeouts = {};
    if (!timeouts.automatic) timeouts.automatic = DEFAULT_AUTOMATIC_TIMEOUT;
    if (!timeouts.manual) timeouts.manual = DEFAULT_MANUAL_TIMEOUT;

    const token = this._generateUuid();
    const pendingTests = await this._testLoader.getTests({
      includeList: tests.include,
      excludeList: tests.exclude,
      referenceTokens,
      types
    });
    const { browser } = UserAgentParser.parse(userAgent);

    const session = new Session(token, {
      userAgent,
      browser,
      tests,
      types,
      timeouts,
      pendingTests,
      testFilesCount: this._calculateTestFilesCount(pendingTests),
      testFilesCompleted: {},
      status: Session.PENDING,
      referenceTokens,
      webhookUrls
    });
    await this._database.createSession(session);
    this._sessions.push(session);
    return session;
  }

  async addSession(session) {
    await this._database.createSession(session);
    this._sessions.push(session);
  }

  /**
   * @param {String} token
   * @return {Session}
   */
  async readSession(token) {
    if (!token) return null;
    let session = this._readFromCache(token);
    if (!session) {
      session = await this._database.readSession(token);
      if (session) this._pushToCache(session);
    }
    return session;
  }

  async readSessions() {
    return this._database.readSessions();
  }

  async readPublicSessions() {
    return this._database.readPublicSessions();
  }

  async updateSession(session) {
    return this._database.updateSession(session);
  }

  async updateSessionConfiguration(
    token,
    { tests, types, timeouts, referenceTokens, webhookUrls }
  ) {
    const session = await this.readSession(token);
    if (session.getStatus() !== Session.PENDING) return;

    if (tests) {
      if (!tests.include) tests.include = session.getTests().include;
      if (!tests.exclude) tests.exclude = session.getTests().exclude;
      if (!referenceTokens) referenceTokens = session.getReferenceTokens();
      if (!types) types = session.getTypes();
      const pendingTests = await this._testLoader.getTests({
        includeList: tests.include,
        excludeList: tests.exclude,
        referenceTokens,
        types
      });
      session.setPendingTests(pendingTests);
      session.setTests(tests);
      session.setTestFilesCount(this._calculateTestFilesCount(pendingTests));
    }

    if (types) session.setTypes(types);
    if (timeouts) session.setTimeouts(timeouts);
    if (referenceTokens) session.setReferenceTokens(referenceTokens);
    if (webhookUrls) session.setWebhookUrls(webhookUrls);

    await this._database.updateSession(session);
    this._pushToCache(session);
    return session;
  }

  async deleteSession(token) {
    this._sessions.splice(
      this._sessions.findIndex(session => session.getToken() === token),
      1
    );
    this._database.deleteSession(token);
  }

  async startSession(token) {
    const session = await this.readSession(token);
    if (
      session.getStatus() !== Session.PENDING &&
      session.getStatus() !== Session.PAUSED
    )
      return;

    if (session.getStatus() === Session.PENDING) {
      session.setDateStarted(Date.now());
    }
    session.setStatus(Session.RUNNING);
    await this._database.updateSession(session);
    this.sendClientMessage({ token, message: "status" });
  }

  async pauseSession(token) {
    const session = await this.readSession(token);
    if (session.getStatus() !== Session.RUNNING) return;
    session.setStatus(Session.PAUSED);
    await this._database.updateSession(session);
    this.sendClientMessage({ token, message: "status" });
  }

  async stopSession(token) {
    const session = await this.readSession(token);
    if (
      session.getStatus() === Session.ABORTED ||
      session.getStatus() === Session.COMPLETED
    )
      return;
    session.setStatus(Session.ABORTED);
    session.setDateFinished(Date.now());
    await this._database.updateSession(session);
    this.sendClientMessage({ token, message: "status" });
  }

  async completeSession(token) {
    const session = await this.readSession(token);
    if (
      session.getStatus() === Session.COMPLETED ||
      session.getStatus() === Session.ABORTED
    )
      return;
    session.setStatus(Session.COMPLETED);
    session.setDateFinished(Date.now());
    await this._database.updateSession(session);
    this.sendClientMessage({ token, message: "status" });
  }

  async updateTests({ pendingTests, runningTests, completedTests, session }) {
    if (completedTests) {
      session.setTestFilesCompleted(
        this._calculateTestFilesCount(completedTests)
      );
      session.setCompletedTests(completedTests);
      this.sendClientMessage({
        token: session.getToken(),
        message: "complete"
      });
    }
    if (pendingTests) {
      session.setPendingTests(pendingTests);
    }
    if (runningTests) {
      session.setRunningTests(runningTests);
    }
    await this.updateSession(session);
  }

  addSessionClient({ socket, token }) {
    this._sessionClients.push({ socket, token });
  }

  removeSessionClient({ socket, token }) {
    this._sessionClients.splice(
      this._sessionClients.findIndex(
        client => client.socket === socket && client.token === token
      ),
      1
    );
  }

  getSessionClients(token) {
    return this._sessionClients
      .filter(client => client.token === token)
      .map(client => client.socket);
  }

  sendClientMessage({ token, message }) {
    this._sessionClients
      .filter(client => client.token === token)
      .forEach(client => client.socket.send(message));
  }

  _readFromCache(token) {
    return this._sessions.find(session => session.getToken() === token);
  }

  _pushToCache(session) {
    if (!this._readFromCache(session.getToken())) this._sessions.push(session);
  }

  _generateUuid() {
    return uuidv1({
      node: new Uint8Array(crypto.randomBytes(6)),
      clockseq: (Math.random() * 0x3fff) | 0
    });
  }

  _calculateTestFilesCount(tests) {
    let testFilesCount = {};
    for (let api in tests) {
      testFilesCount[api] = tests[api].length;
    }
    return testFilesCount;
  }
}

module.exports = SessionManager;
