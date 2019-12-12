class ConfigurationLoader {
  async load({ configurationFilePath, applicationDirectoryPath }) {
    let defaultConfigurationLoaded = await this.loadDefault(
      applicationDirectoryPath
    );

    let configurationLoaded = await this._loadFile({
      configurationFilePath,
      applicationDirectoryPath
    });

    configurationLoaded = Object.assign(
      defaultConfigurationLoaded,
      configurationLoaded
    );

    let configuration = {};

    const port = configurationLoaded.ports.wave[0];
    if (port) {
      configuration.port = parseInt(port);
    }

    const resultsDirectoryPath = configurationLoaded.results;
    if (resultsDirectoryPath) {
      configuration.resultsDirectoryPath = path.resolve(resultsDirectoryPath);
    }

    const dbCompactionInterval = configurationLoaded.db_compaction_interval;
    if (dbCompactionInterval) {
      configuration.dbCompactionInterval = parseInt(dbCompactionInterval);
    }

    const testTimeout = configurationLoaded.timeout;
    if (testTimeout) {
      configuration.testTimeout = parseInt(testTimeout);
    }

    const wptPort = configurationLoaded.ports.http[0];
    if (wptPort) {
      configuration.wptPort = parseInt(wptPort);
    }

    const wptSslPort = configurationLoaded.ports.https[0];
    if (wptSslPort) {
      configuration.wptSslPort = wptSslPort;
    }

    const hostname = configurationLoaded.browser_host;
    if (hostname) {
      configuration.hostname = hostname;
    }

    const importEnabled = configurationLoaded["enable_results_import"];
    configuration.importEnabled = !!importEnabled;

    configuration.testsDirectoryPath = path.join(
      applicationDirectoryPath,
      "../.."
    );

    configuration.manifestFilePath = path.join(
      configuration.testsDirectoryPath,
      "./MANIFEST.json"
    );

    configuration.databaseDirectoryPath = path.join(
      applicationDirectoryPath,
      "data"
    );
    return configuration;
  }

  async _loadFile({ configurationFilePath, applicationDirectoryPath }) {
    if (!configurationFilePath) {
      configurationFilePath = path.join(
        applicationDirectoryPath,
        "../../config.json"
      );
    }
    configurationFilePath = path.resolve(configurationFilePath);
    if (!(await FileSystem.exists(configurationFilePath))) {
      return null;
    }
    const configurationFile = await FileSystem.readFile(configurationFilePath);
    return JSON.parse(configurationFile);
  }

  async loadDefault(applicationDirectoryPath) {
    return this._loadFile({
      configurationFilePath: path.join(
        applicationDirectoryPath,
        "./config.default.json"
      ),
      applicationDirectoryPath
    });
  }
}

const path = require("path");

const FileSystem = require("../utils/file-system");

const configurationLoader = new ConfigurationLoader();

module.exports = configurationLoader;
