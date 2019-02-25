const path = require("path");

const FileSystem = require("../utils/file-system");
const ResultsDatabase = require("./results-database");
const SessionsDatabase = require("./sessions-database");
const TestsDatabase = require("./tests-database");

const DEFAULT_DATABASE_DIRECTORY_PATH = ".";

class Database {
  constructor({ dbCompactionInterval }) {
    this._db = {};
    this.dbCompactionInterval = dbCompactionInterval;
    this._sessionsDatabase = new SessionsDatabase({
      compactionInterval: dbCompactionInterval
    });
    this._resultsDatabase = new ResultsDatabase({
      compactionInterval: dbCompactionInterval
    });
    this._testsDatabase = new TestsDatabase();
  }

  async initialize(databaseDirectoryPath = DEFAULT_DATABASE_DIRECTORY_PATH) {
    if (!(await FileSystem.exists(databaseDirectoryPath))) {
      await FileSystem.makeDirectory(databaseDirectoryPath);
    }

    const resultsDirectoryPath = path.join(databaseDirectoryPath, "results");
    await this._resultsDatabase.initialize(resultsDirectoryPath);
    const testsDirectoryPath = path.join(databaseDirectoryPath, "tests");
    await this._testsDatabase.initialize(testsDirectoryPath);
    await this._sessionsDatabase.initialize({
      databaseDirectoryPath,
      resultsDatabase: this._resultsDatabase,
      testsDatabase: this._testsDatabase
    });
  }

  async createSession() {
    const sessionDatabase = this._sessionsDatabase;
    return sessionDatabase.createSession.apply(sessionDatabase, arguments);
  }

  async readSession() {
    const sessionDatabase = this._sessionsDatabase;
    return sessionDatabase.readSession.apply(sessionDatabase, arguments);
  }

  async readSessions() {
    const sessionDatabase = this._sessionsDatabase;
    return sessionDatabase.readSessions.apply(sessionDatabase, arguments);
  }

  async updateSession() {
    const sessionDatabase = this._sessionsDatabase;
    return sessionDatabase.updateSession.apply(sessionDatabase, arguments);
  }

  async deleteSession() {
    const sessionDatabase = this._sessionsDatabase;
    return sessionDatabase.deleteSession.apply(sessionDatabase, arguments);
  }

  async findTokens() {
    const sessionDatabase = this._sessionsDatabase;
    return sessionDatabase.findTokens.apply(sessionDatabase, arguments);
  }

  async createResult() {
    const resultsDatabase = this._resultsDatabase;
    return resultsDatabase.createResult.apply(resultsDatabase, arguments);
  }

  async readResults() {
    const resultsDatabase = this._resultsDatabase;
    return resultsDatabase.readResults.apply(resultsDatabase, arguments);
  }

  async _deleteResults() {
    const resultsDatabase = this._resultsDatabase;
    return resultsDatabase.deleteResults.apply(resultsDatabase, arguments);
  }
}

module.exports = Database;
