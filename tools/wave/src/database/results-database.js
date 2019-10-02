const path = require("path");

const Database = require("./database");
const FileSystem = require("../utils/file-system");
const JobQueue = require("../utils/job-queue");

const DEFAULT_DIRECTORY_PATH = ".";
const DEFAULT_COMPACTION_INTERVAL = 600000;

const READ_JOB_GROUP = "read";
const MAX_ACCESS_JOBS = 1;
const MAX_GROUP_JOBS = 5;

class ResultsDatabase extends Database {
  constructor() {
    super();
    this._resultsAccessQueue = new JobQueue(MAX_ACCESS_JOBS, {
      groupLimit: MAX_GROUP_JOBS
    });
    this._queueResultsAccess = this._resultsAccessQueue.queueJob.bind(
      this._resultsAccessQueue
    );
  }

  async initialize({
    directoryPath = DEFAULT_DIRECTORY_PATH,
    compactionInterval = DEFAULT_COMPACTION_INTERVAL
  } = {}) {
    if (!(await FileSystem.exists(directoryPath))) {
      await FileSystem.makeDirectory(directoryPath);
    }
    this._directoryPath = directoryPath;
    this._db = {};
    this._compactionInterval = compactionInterval;
  }

  async loadDatabase(token) {
    if (this._db[token]) return;
    const resultsDataStore = this._createDataStore({
      filePath: path.join(this._directoryPath, token + ".db"),
      compactionInterval: this._compactionInterval
    });
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
