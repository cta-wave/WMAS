const path = require("path");
const DataStore = require("nedb");

const FileSystem = require("../utils/file-system");
const Serializer = require("../utils/serializer");
const Deserializer = require("../utils/deserializer");
const Session = require("../data/session");

class Database {
  constructor({ dbCompactionInterval }) {
    this._db = {};
    this.dbCompactionInterval = dbCompactionInterval;
  }

  async load(databaseDirectoryPath = ".") {
    if (!(await FileSystem.exists(databaseDirectoryPath))) {
      await FileSystem.makeDirectory(databaseDirectoryPath);
    }
    const resultsDirectoryPath = path.join(databaseDirectoryPath, "./results");
    if (!(await FileSystem.exists(resultsDirectoryPath))) {
      await FileSystem.makeDirectory(resultsDirectoryPath);
    }
    this._resultsDirectoryPath = resultsDirectoryPath;

    const testsDirectoryPath = path.join(databaseDirectoryPath, "./tests");
    if (!(await FileSystem.exists(testsDirectoryPath))) {
      await FileSystem.makeDirectory(testsDirectoryPath);
    }
    this._testsDirectoryPath = testsDirectoryPath;

    let sessionsDataStore = new DataStore({
      filename: path.join(databaseDirectoryPath, "./sessions.db")
    });

    sessionsDataStore.persistence.setAutocompactionInterval(
      this.dbCompactionInterval
    );
    sessionsDataStore = this._wrapDataStore(sessionsDataStore);
    await sessionsDataStore.loadDatabase();
    this._db.sessions = sessionsDataStore;
    this._db.results = {};
    this._db.tests = {};
  }

  async loadSessions(sessions) {
    await Promise.all(sessions.map(session => this._loadSubDatabases(session)));
  }

  async createSession(session) {
    const token = session.getToken();
    const sessionObject = Serializer.serializeSession(session);

    await this._loadSubDatabases(session);

    const { COMPLETED, ABORTED } = Session;
    if (session.getStatus() !== COMPLETED && session.getStatus() !== ABORTED) {
      const sessionTests = this._db.tests[token];
      const { pending_tests, running_tests, completed_tests } = sessionObject;
      await sessionTests.insert({
        token,
        pending_tests,
        running_tests,
        completed_tests
      });
    }

    const sessionsDataStore = this._db.sessions;
    delete sessionObject.completed_tests;
    delete sessionObject.running_tests;
    delete sessionObject.pending_tests;
    await sessionsDataStore.insert(sessionObject);
  }

  async updateSession(session) {
    const token = session.getToken();
    const sessionObject = Serializer.serializeSession(session);

    const { COMPLETED, ABORTED } = Session;
    if (session.getStatus() !== COMPLETED && session.getStatus() !== ABORTED) {
      const sessionTests = this._db.tests[token];
      const { pending_tests, running_tests, completed_tests } = sessionObject;
      await sessionTests.update(
        { token },
        {
          token,
          pending_tests,
          running_tests,
          completed_tests
        }
      );
    } else {
      await this._deleteTests(token);
    }

    const sessionDataStore = this._db.sessions;
    delete sessionObject.completed_tests;
    delete sessionObject.running_tests;
    delete sessionObject.pending_tests;
    await sessionDataStore.update({ token }, sessionObject);
  }

  async readSession(token) {
    const sessionDataStore = this._db.sessions;
    const result = await sessionDataStore.find({ token });
    if (!result || result.length === 0) {
      return null;
    }
    const session = Deserializer.deserializeSession(result[0]);

    const { COMPLETED, ABORTED } = Session;
    if (session.getStatus() !== COMPLETED && session.getStatus() !== ABORTED) {
      const sessionTests = this._db.tests[token];
      const tests = await sessionTests.find({ token });
      if (tests && tests[0]) {
        const { pending_tests, running_tests, completed_tests } = tests[0];
        if (pending_tests) session.setPendingTests(pending_tests);
        if (completed_tests) session.setCompletedTests(completed_tests);
        if (running_tests) session.setRunningTests(running_tests);
      }
    }

    return session;
  }

  async readSessions() {
    const sessionDataStore = this._db.sessions;
    const result = await sessionDataStore.find({});
    if (!result) {
      return [];
    }
    return Deserializer.deserializeSessions(result);
  }

  async findTokens(fragment) {
    const sessionDataStore = this._db.sessions;
    const results = await sessionDataStore.find({
      token: new RegExp("^" + fragment)
    });
    return results.map(result => result.token);
  }

  async createResult(token, result) {
    const resultsDataStore = this._db.results[token];
    await resultsDataStore.insert(result);
  }

  async getResults(token) {
    const resultsDataStore = this._db.results[token];
    return resultsDataStore.find({});
  }

  async deleteSession(token) {
    const sessionDataStore = this._db.sessions;
    await sessionDataStore.remove({ token });
    await this._deleteTests(token);
    await this._deleteResults(token);
  }

  async _loadSubDatabases(session) {
    const token = session.getToken();
    if (!this._db.results[token]) {
      let sessionResults = new DataStore({
        filename: path.join(this._resultsDirectoryPath, token + ".db")
      });
      sessionResults = this._wrapDataStore(sessionResults);
      sessionResults.loadDatabase();
      this._db.results[token] = sessionResults;
    }

    const { COMPLETED, ABORTED } = Session;
    if (
      session.getStatus() !== COMPLETED &&
      session.getStatus() !== ABORTED &&
      !this._db.tests[token]
    ) {
      let sessionTests = new DataStore({
        filename: path.join(this._testsDirectoryPath, token + ".db")
      });
      sessionTests = this._wrapDataStore(sessionTests);
      sessionTests.loadDatabase();
      this._db.tests[token] = sessionTests;
    }
  }

  async _deleteTests(token) {
    delete this._db.tests[token];
    const databaseFile = path.join(this._testsDirectoryPath, token + ".db");
    if (!(await FileSystem.exists(databaseFile))) return;
    await FileSystem.removeFile(databaseFile);
  }

  async _deleteResults(token) {
    delete this._db.results[token];
    const databaseFile = path.join(this._resultsDirectoryPath, token + ".db");
    if (!(await FileSystem.exists(databaseFile))) return;
    await FileSystem.removeFile(databaseFile);
  }

  // get rid of callbacks and use promises
  _wrapDataStore(database) {
    return {
      async loadDatabase() {
        return new Promise(resolve => database.loadDatabase(() => resolve()));
      },
      async insert(document) {
        return new Promise((resolve, reject) => {
          database.insert(document, (error, newDocument) => {
            if (error) reject(error);
            resolve(newDocument);
          });
        });
      },
      async find(needle) {
        return new Promise((resolve, reject) => {
          database.find(needle, (error, documents) => {
            if (error) reject(error);
            resolve(documents);
          });
        });
      },
      async update(needle, document) {
        return new Promise((resolve, reject) => {
          database.update(needle, document, (error, document) => {
            if (error) reject(error);
            resolve(document);
          });
        });
      },
      async remove(needle, removeAll = false) {
        return new Promise((resolve, reject) => {
          database.remove(needle, { multi: removeAll }, (error, numRemoved) => {
            if (error) reject(error);
            resolve(numRemoved);
          });
        });
      }
    };
  }
}

module.exports = Database;
