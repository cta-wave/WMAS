const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

const Session = require("../data/session");
const TestLoader = require("../testing/test-loader");

const DEFAULT_TEST_PATH = "/";
const DEFAULT_TEST_TYPES = [TestLoader.TEST_HARNESS_TESTS];

/**
 * @module SessionManager
 */
class SessionManager {
  constructor({ database, testTimeout, testLoader }) {
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
    userAgent,
    path,
    types,
    referenceTokens = [],
    testTimeout
  } = {}) {
    path = path || DEFAULT_TEST_PATH;
    types = types || DEFAULT_TEST_TYPES;
    testTimeout = testTimeout || this._testTimeout;

    const referenceSessions = await Promise.all(
      referenceTokens.map(async token => this.readSession(token.trim()))
    );

    const token = this._generateUuid();
    const tests = await this._testLoader.getTests({
      userAgent,
      path,
      refSessions: referenceSessions,
      types
    });

    const session = new Session(token, {
      userAgent,
      path,
      types,
      testTimeout,
      tests,
      status: Session.RUNNING,
      referenceTokens
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
