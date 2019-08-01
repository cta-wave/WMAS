const path = require("path");
const DataStore = require("nedb");

const FileSystem = require("../utils/file-system");
const DatabaseUtils = require("../utils/database-utils");
const JobQueue = require("../utils/job-queue");

const { promisifyNedbDataStore } = DatabaseUtils;
const DEFAULT_DIRECTORY_PATH = ".";
const DEFAULT_COMPACTION_INTERVAL = 600000;

const READ_JOB_GROUP = "read";
const MAX_ACCESS_JOBS = 1;
const MAX_GROUP_JOBS = 5;

class ResultsDatabase {
  constructor({ compactionInterval = DEFAULT_COMPACTION_INTERVAL } = {}) {
    this._compactionInterval = compactionInterval;
    this._resultsAccessQueue = new JobQueue(MAX_ACCESS_JOBS, {
      groupLimit: MAX_GROUP_JOBS
    });
    this._queueResultsAccess = this._resultsAccessQueue.queueJob.bind(
      this._resultsAccessQueue
    );
  }

  async initialize(directoryPath = DEFAULT_DIRECTORY_PATH) {
    if (!(await FileSystem.exists(directoryPath))) {
      await FileSystem.makeDirectory(directoryPath);
    }
    this._directoryPath = directoryPath;
    this._db = {};
  }

  async loadDatabase(token) {
    if (this._db[token]) return;
    let resultsDataStore = new DataStore({
      filename: path.join(this._directoryPath, token + ".db")
    });
    resultsDataStore = promisifyNedbDataStore(resultsDataStore);
    resultsDataStore.compactDatafile();
    resultsDataStore.setAutocompactionInterval(this._compactionInterval);
    await resultsDataStore.loadDatabase();
    this._db[token] = resultsDataStore;
  }

  async createResult(token, result) {
    return this._queueResultsAccess(() => this._createResult(token, result));
  }

  async _createResult(token, result) {
    await this.loadDatabase(token);
    const resultsDataStore = this._db[token];
    await resultsDataStore.insert(result);
  }

  async readResults(token) {
    return this._queueResultsAccess(() => this._readResults(token), {
      group: READ_JOB_GROUP
    });
  }

  async _readResults(token) {
    await this.loadDatabase(token);
    const resultsDataStore = this._db[token];
    return resultsDataStore.find({});
  }

  async deleteResults(token) {
    return this._queueResultsAccess(() => this._deleteResults(token));
  }

  async _deleteResults(token) {
    if (this._db[token]) {
      this._db[token].stopAutocompaction();
      delete this._db[token];
    }
    const databaseFile = path.join(this._directoryPath, token + ".db");
    if (!(await FileSystem.exists(databaseFile))) return;
    await FileSystem.removeFile(databaseFile);
  }
}

module.exports = ResultsDatabase;
