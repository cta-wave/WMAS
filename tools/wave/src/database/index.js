const path = require("path");

const FileSystem = require("../utils/file-system");
const ResultsDatabase = require("./results-database");
const SessionsDatabase = require("./sessions-database");
const TestsDatabase = require("./tests-database");

const DEFAULT_DATABASE_DIRECTORY_PATH = ".";

class Database {
  constructor({ dbCompactionInterval }) {
    this._db = {};
    this._dbCompactionInterval = dbCompactionInterval;
    this._bindSessionsDatabase({
      compactionInterval: dbCompactionInterval
    });
    this._bindResultsDatabase({
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
      directoryPath: databaseDirectoryPath,
      resultsDatabase: this._resultsDatabase,
      testsDatabase: this._testsDatabase
    });
  }

  _bindSessionsDatabase(options) {
    const sessionsDatabase = new SessionsDatabase(options);
    this.createSession = sessionsDatabase.createSession.bind(sessionsDatabase);
    this.readSession = sessionsDatabase.readSession.bind(sessionsDatabase);
    this.readSessions = sessionsDatabase.readSessions.bind(sessionsDatabase);
    this.readPublicSessions = sessionsDatabase.readPublicSessions.bind(
      sessionsDatabase
    );
    this.updateSession = sessionsDatabase.updateSession.bind(sessionsDatabase);
    this.deleteSession = sessionsDatabase.deleteSession.bind(sessionsDatabase);
    this.findTokens = sessionsDatabase.findTokens.bind(sessionsDatabase);
    this._sessionsDatabase = sessionsDatabase;
  }

  _bindResultsDatabase(options) {
    const resultsDatabase = new ResultsDatabase(options);
    this.createResult = resultsDatabase.createResult.bind(resultsDatabase);
    this.readResults = resultsDatabase.readResults.bind(resultsDatabase);
    this.deleteResults = resultsDatabase.deleteResults.bind(resultsDatabase);
    this._resultsDatabase = resultsDatabase;
  }
}

module.exports = Database;
