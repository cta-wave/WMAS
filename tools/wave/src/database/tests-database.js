const path = require("path");
const DataStore = require("nedb");

const FileSystem = require("../utils/file-system");
const DatabaseUtils = require("../utils/database-utils");
const JobQueue = require("../utils/job-queue");

const { promisifyNedbDataStore } = DatabaseUtils;
const DEFAULT_DIRECTORY_PATH = ".";
const DEFAULT_COMPACTION_INTERVAL = 60000;

const READ_JOB_GROUP = "read";
const MAX_ACCESS_JOBS = 1;
const MAX_GROUP_JOBS = 5;

class TestsDatabase {
  constructor({ compactionInterval = DEFAULT_COMPACTION_INTERVAL } = {}) {
    this._compactionInterval = compactionInterval;
    this._testsAccessQueue = new JobQueue(MAX_ACCESS_JOBS, {
      groupLimit: MAX_GROUP_JOBS
    });
    this._queueTestsAccess = this._testsAccessQueue.queueJob.bind(
      this._testsAccessQueue
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
    let testsDataStore = new DataStore({
      filename: path.join(this._directoryPath, token + ".db")
    });
    testsDataStore = promisifyNedbDataStore(testsDataStore);
    testsDataStore.compactDatafile();
    testsDataStore.setAutocompactionInterval(this._compactionInterval);
    await testsDataStore.loadDatabase();
    this._db[token] = testsDataStore;
  }

  async createTests(token, tests) {
    return this._queueTestsAccess(() => this._createTests(token, tests));
  }

  async _createTests(token, tests) {
    const sessionTests = this._db[token];
    tests.token = token;
    await sessionTests.insert(tests);
  }

  async readTests(token) {
    return this._queueTestsAccess(() => this._readTests(token), {
      group: READ_JOB_GROUP
    });
  }

  async _readTests(token) {
    const sessionTests = this._db[token];
    const tests = await sessionTests.find({});
    if (tests && tests[0]) {
      return tests[0];
    }
    return null;
  }

  async updateTests(token, tests, sessionLabel) {
    return this._queueTestsAccess(() => this._updateTests(token, tests));
  }

  async updateLabel(token, sessionLabel) {
    return this._queueTestsAccess(() => this._updateLabel(token, sessionLabel));
  }

  async _updateTests(token, tests, sessionLabel) {
    const sessionTests = this._db[token];
    tests.token = token;
    await sessionTests.update({ token }, tests);
  }

  async _updateLabel(token, sessionLabel) {
    const sessionTests = this._db[token];
    await sessionTests.update({ token },  sessionLabel );
  }

  async deleteTests(token) {
    return this._queueTestsAccess(() => this._deleteTests(token));
  }

  async _deleteTests(token) {
    if (this._db[token]) {
      this._db[token].stopAutocompaction();
      delete this._db[token];
    }
    const databaseFile = path.join(this._directoryPath, token + ".db");
    if (!(await FileSystem.exists(databaseFile))) return;
    await FileSystem.removeFile(databaseFile);
  }
}

module.exports = TestsDatabase;
