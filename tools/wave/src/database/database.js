const DataStore = require("nedb");

class Database {
  _createDataStore({ filePath, compactionInterval }) {
    let dataStore = new DataStore({ filename: filePath });
    dataStore.persistence.setAutocompactionInterval(compactionInterval);
    dataStore = this._promisifyNedbDataStore(dataStore);
    return dataStore;
  }

  _promisifyNedbDataStore(dataStore) {
    return {
      async loadDatabase() {
        return new Promise(resolve => dataStore.loadDatabase(() => resolve()));
      },
      async insert(document) {
        return new Promise((resolve, reject) => {
          dataStore.insert(document, (error, newDocument) => {
            if (error) reject(error);
            resolve(newDocument);
          });
        });
      },
      async find(needle) {
        return new Promise((resolve, reject) => {
          dataStore.find(needle, (error, documents) => {
            if (error) reject(error);
            resolve(documents);
          });
        });
      },
      async update(needle, document) {
        return new Promise((resolve, reject) => {
          dataStore.update(needle, document, (error, document) => {
            if (error) reject(error);
            resolve(document);
          });
        });
      },
      async remove(needle, removeAll = false) {
        return new Promise((resolve, reject) => {
          dataStore.remove(
            needle,
            { multi: removeAll },
            (error, numRemoved) => {
              if (error) reject(error);
              resolve(numRemoved);
            }
          );
        });
      },
      compactDatafile() {
        return dataStore.persistence.compactDatafile();
      },
      setAutocompactionInterval(interval) {
        return dataStore.persistence.setAutocompactionInterval(interval);
      },
      stopAutocompaction() {
        return dataStore.persistence.stopAutocompaction();
      }
    };
  }
}

module.exports = Database;
