const path = require("path");
const DataStore = require("nedb");

const FileSystem = require("../utils/file-system");
const Serializer = require("../utils/serializer");
const Deserializer = require("../utils/deserializer");

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

    this._resultsDirectoryPath = resultsDirectoryPath;
  }

  async loadSessions(sessions) {
    const newSessionDataStores = [];
    sessions.forEach(session => {
      const token = session.getToken();
      let sessionDataStore = new DataStore({
        filename: path.join(this._resultsDirectoryPath, token + ".db")
      });
      sessionDataStore = this._wrapDataStore(sessionDataStore);
      newSessionDataStores.push(sessionDataStore);
      this._db.results[token] = sessionDataStore;
    });
    await Promise.all(
      newSessionDataStores.map(dataStore => dataStore.loadDatabase())
    );
  }

  async createSession(session) {
    const sessionObject = Serializer.serializeSession(session);
    const sessionsDataStore = this._db.sessions;
    await sessionsDataStore.insert(sessionObject);

    const token = session.getToken();
    let resultDataStore = new DataStore({
      filename: path.join(this._resultsDirectoryPath, token + ".db")
    });
    resultDataStore = this._wrapDataStore(resultDataStore);
    await resultDataStore.loadDatabase();
    this._db.results[token] = resultDataStore;
  }

  async updateSession(session) {
    const token = session.getToken();
    const sessionDataStore = this._db.sessions;
    const sessionObject = Serializer.serializeSession(session);
    await sessionDataStore.update({ token }, sessionObject);
  }

  async readSession(token) {
    const sessionDataStore = this._db.sessions;
    const result = await sessionDataStore.find({ token });
    if (!result || result.length === 0) {
      return null;
    }
    return Deserializer.deserializeSession(result[0]);
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
      }
    };
  }
}

module.exports = Database;
