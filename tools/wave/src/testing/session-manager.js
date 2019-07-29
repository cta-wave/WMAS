const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

const Session = require("../data/session");
const TestLoader = require("../testing/test-loader");
const Database = require("../database");

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
  initialize({ database, testTimeout, testLoader }) {
    this._database = database;
    this._sessions = [];
    this._testTimeout = testTimeout;
    this._testLoader = testLoader;
  }

  async findToken(fragment) {
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
  }) {
    if (!tests) tests = {};
    if (!tests.include) tests.include = [DEFAULT_TEST_PATH];
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

    const session = new Session(token, {
      userAgent,
      tests,
      types,
      timeouts,
      pendingTests,
      status: Session.PENDING,
      referenceTokens,
      dateStarted: Date.now(),
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
    let session = this._sessions.find(session => session.getToken() === token);
    if (!session) {
      session = await this._database.readSession(token);
      if (session) this._sessions.push(session);
    }
    return session;
  }

  async readSessions() {
    return await this._database.readSessions();
  }

  async readPublicSessions() {
    return await this._database.readPublicSessions();
  }

  async updateSession(session) {
    return await this._database.updateSession(session);
  }

  async deleteSession(token) {
    this._sessions.splice(
      this._sessions.findIndex(session => session.getToken() === token),
      1
    );
    this._database.deleteSession(token);
  }

  _generateUuid() {
    return uuidv1({
      node: new Uint8Array(crypto.randomBytes(6)),
      clockseq: (Math.random() * 0x3fff) | 0
    });
  }
}

module.exports = SessionManager;
