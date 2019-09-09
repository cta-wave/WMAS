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
    this._bindSessionsDatabase();
    this._bindResultsDatabase();
    this._testsDatabase = new TestsDatabase();
  }

  async initialize(databaseDirectoryPath = DEFAULT_DATABASE_DIRECTORY_PATH) {
    if (!(await FileSystem.exists(databaseDirectoryPath))) {
      await FileSystem.makeDirectory(databaseDirectoryPath);
    }

    const resultsDirectoryPath = path.join(databaseDirectoryPath, "results");
    await this._resultsDatabase.initialize({
      resultsDirectoryPath,
      compactionInterval: this._dbCompactionInterval
    });
    const testsDirectoryPath = path.join(databaseDirectoryPath, "tests");
    await this._testsDatabase.initialize({
      testsDirectoryPath,
      compactionInterval: this._dbCompactionInterval
    });
    const sessionsDatabaseFilePath = path.join(
      databaseDirectoryPath,
      "./sessions.db"
    );
    await this._sessionsDatabase.initialize({
      filePath: sessionsDatabaseFilePath,
      resultsDatabase: this._resultsDatabase,
      testsDatabase: this._testsDatabase,
      compactionInterval: this._dbCompactionInterval
    });
  }

  _bindSessionsDatabase() {
    const sessionsDatabase = new SessionsDatabase();
    this.createSession = sessionsDatabase.createSession.bind(sessionsDatabase);
    this.readSession = sessionsDatabase.readSession.bind(sessionsDatabase);
    this.readSessions = sessionsDatabase.readSessions.bind(sessionsDatabase);
    this.readExpiringSessions = sessionsDatabase.readExpiringSessions.bind(sessionsDatabase);
    this.readPublicSessions = sessionsDatabase.readPublicSessions.bind(
      sessionsDatabase
    );
    this.updateSession = sessionsDatabase.updateSession.bind(sessionsDatabase);
    this.deleteSession = sessionsDatabase.deleteSession.bind(sessionsDatabase);
    this.findTokens = sessionsDatabase.findTokens.bind(sessionsDatabase);
    this._sessionsDatabase = sessionsDatabase;
  }

  _bindResultsDatabase() {
    const resultsDatabase = new ResultsDatabase();
    this.createResult = resultsDatabase.createResult.bind(resultsDatabase);
    this.readResults = resultsDatabase.readResults.bind(resultsDatabase);
    this.deleteResults = resultsDatabase.deleteResults.bind(resultsDatabase);
    this._resultsDatabase = resultsDatabase;
  }
}

module.exports = Database;
