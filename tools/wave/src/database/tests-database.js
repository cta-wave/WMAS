const path = require("path");

const Database = require("./database");
const FileSystem = require("../utils/file-system");
const JobQueue = require("../utils/job-queue");

const DEFAULT_DIRECTORY_PATH = ".";
const DEFAULT_COMPACTION_INTERVAL = 60000;

const READ_JOB_GROUP = "read";
const MAX_ACCESS_JOBS = 1;
const MAX_GROUP_JOBS = 5;

class TestsDatabase extends Database {
  constructor() {
    this._testsAccessQueue = new JobQueue(MAX_ACCESS_JOBS, {
      groupLimit: MAX_GROUP_JOBS
    });
    this._queueTestsAccess = this._testsAccessQueue.queueJob.bind(
      this._testsAccessQueue
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
    const testsDataStore = this._createDataStore({
      filePath: path.join(this._directoryPath, token + ".db"),
      compactionInterval: this._compactionInterval
    });
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

  async updateTests(token, tests) {
    return this._queueTestsAccess(() => this._updateTests(token, tests));
  }

  async _updateTests(token, tests) {
    const sessionTests = this._db[token];
    tests.token = token;
    await sessionTests.update({ token }, tests);
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
