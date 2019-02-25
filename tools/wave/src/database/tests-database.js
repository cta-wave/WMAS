const path = require("path");
const DataStore = require("nedb");

const FileSystem = require("../utils/file-system");
const Session = require("../data/session");
const DatabaseUtils = require("../utils/database-utils");

const { promisifyNedbDataStore } = DatabaseUtils;
const DEFAULT_DIRECTORY_PATH = ".";
const DEFAULT_COMPACTION_INTERVAL = 60000;

class TestsDatabase {
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
    let testsDataStore = new DataStore({
      filename: path.join(this._directoryPath, token + ".db")
    });
    testsDataStore.persistence.compactDatafile();
    testsDataStore.persistence.setAutocompactionInterval(
      this._compactionInterval
    );
    testsDataStore = promisifyNedbDataStore(testsDataStore);
    await testsDataStore.loadDatabase();
    this._db[token] = testsDataStore;
  }

  async createTests(token, tests) {
    const sessionTests = this._db[token];
    tests.token = token;
    await sessionTests.insert(tests);
  }

  async readTests(token) {
    const sessionTests = this._db[token];
    const tests = await sessionTests.find({});
    if (tests && tests[0]) {
      return tests[0];
    }
    return null;
  }

  async updateTests(token, tests) {
    const sessionTests = this._db[token];
    tests.token = token;
    await sessionTests.update({ token }, tests);
  }

  async deleteTests(token) {
    delete this._db[token];
    const databaseFile = path.join(this._directoryPath, token + ".db");
    if (!(await FileSystem.exists(databaseFile))) return;
    await FileSystem.removeFile(databaseFile);
  }
}

module.exports = TestsDatabase;
