const path = require("path");
const DataStore = require("nedb");

const FileSystem = require("../utils/file-system");
const DatabaseUtils = require("../utils/database-utils");

const { promisifyNedbDataStore } = DatabaseUtils;
const DEFAULT_DIRECTORY_PATH = ".";
const DEFAULT_COMPACTION_INTERVAL = 600000;

class ResultsDatabase {
  constructor({ compactionInterval = DEFAULT_COMPACTION_INTERVAL } = {}) {
    this._compactionInterval = compactionInterval;
  }

  async initialize(directoryPath = DEFAULT_DIRECTORY_PATH) {
    if (!(await FileSystem.exists(directoryPath))) {
      await FileSystem.makeDirectory(directoryPath);
    }
    this._directoryPath = directoryPath;
    this._db = {};
  }

  async loadDatabase(token) {
    if (this._db[token]) return this._db[token];
    let resultsDataStore = new DataStore({
      filename: path.join(this._directoryPath, token + ".db")
    });
    resultsDataStore.persistence.compactDatafile();
    resultsDataStore.persistence.setAutocompactionInterval(
      this._compactionInterval
    );
    resultsDataStore = promisifyNedbDataStore(resultsDataStore);
    await resultsDataStore.loadDatabase();
    this._db[token] = resultsDataStore;
  }

  async createResult(token, result) {
    const resultsDataStore = this._db[token];
    await resultsDataStore.insert(result);
  }

  async readResults(token) {
    if (!this._db[token]) {
      const databaseFile = path.join(this._directoryPath, token + ".db");
      if (await FileSystem.exists(databaseFile)) await this.loadDatabase(token);
    }
    const resultsDataStore = this._db[token];
    return resultsDataStore.find({});
  }

  async deleteResults(token) {
    delete this._db[token];
    const databaseFile = path.join(this._directoryPath, token + ".db");
    if (!(await FileSystem.exists(databaseFile))) return;
    await FileSystem.removeFile(databaseFile);
  }
}

module.exports = ResultsDatabase;
