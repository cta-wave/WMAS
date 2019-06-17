const SessionsDatabase = require("./src/database/sessions-database");
const ConfigurationLoader = require("./src/core/configuration-loader");
const FileSystem = require("./src/utils/file-system");
const path = require("path");

class WaveStatistics {
  async initialize({
    sessionsDatabaseFilePath,
    applicationDirectoryPath,
    configurationFilePath
  } = {}) {
    if (!sessionsDatabaseFilePath) {
      const config = await ConfigurationLoader.load({
        applicationDirectoryPath,
        configurationFilePath
      });
      const { databaseDirectoryPath } = config;
      sessionsDatabaseFilePath = path.join(
        databaseDirectoryPath,
        "./sessions.db"
      );
    }
    if (!(await FileSystem.exists(sessionsDatabaseFilePath))) {
      console.error(new Error("File not found: " + sessionsDatabaseFilePath));
      process.exit(1);
    }
    this._db = new SessionsDatabase();
    await this._db.initialize({ filePath: sessionsDatabaseFilePath });
  }

  async exportSessionsToCsv() {
    const sessions = await this._db.readSessions();
    const sessionsInfo = sessions.map(session => ({
      token: session.getToken(),
      userAgent: session.getUserAgent(),
      dateStarted: session.getDateStarted(),
      dateFinished: session.getDateFinished(),
      status: session.getStatus(),
      isPublic: session.isPublic()
    }));

    const csvString =
      '"Token","User Agent","Date Started","Date Finished","Status","Is Public"\n' +
      sessionsInfo
        .map(
          ({ token, userAgent, dateStarted, dateFinished, status, isPublic }) =>
            `"${token}","${userAgent}","${this.getDateString(
              dateStarted,
              token
            )}","${this.getDateString(
              dateFinished,
              token
            )}","${status}","${isPublic}"`
        )
        .join("\n");
    const csvFilePath = path.resolve("./sessions_statistics.csv");
    await FileSystem.writeFile(csvFilePath, csvString);
    console.log("Sessions information exported to " + csvFilePath);
  }

  getDateString(millis, token) {
    if (!millis) {
      millis = this.get_int_millis(token);
    }
    const date = new Date(millis);
    return date
      .toISOString()
      .replace("T", " ")
      .replace("Z", "");
  }

  // two methods from https://stackoverflow.com/questions/17571100/how-to-extract-timestamp-from-uuid-v1-timeuuid-using-javascript
  get_time_int(uuid_str) {
    var uuid_arr = uuid_str.split("-"),
      time_str = [uuid_arr[2].substring(1), uuid_arr[1], uuid_arr[0]].join("");
    return parseInt(time_str, 16);
  }

  get_int_millis(uuid_str) {
    var int_time = this.get_time_int(uuid_str) - 122192928000000000,
      int_millisec = Math.floor(int_time / 10000);
    return int_millisec;
  }
}

module.exports = WaveStatistics;
