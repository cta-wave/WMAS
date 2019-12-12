const path = require("path");
const JSZip = require("jszip");

const FileSystem = require("../../utils/file-system");
const UserAgentParser = require("../../utils/user-agent-parser");
const WptReport = require("../../utils/wpt-report");
const Serializer = require("../../utils/serializer");
const Deserializer = require("../../utils/deserializer");
const SessionManager = require("../session-manager");
const ResultComparator = require("./result-comparator");
const Database = require("../../database");
const TestManager = require("../../testing/test-manager");
const Session = require("../../data/session");
const DuplicateError = require("../../data/errors/duplicate-error");
const InvalidDataError = require("../../data/errors/invalid-data-error");
const PermissionDeniedError = require("../../data/errors/permission-denied-error");

const print = text => process.stdout.write(text);
const println = text => console.log(text);

/**
 * @module ResultsManager
 */
class ResultsManager {
  /**
   * @param {Object} config
   * @param {SessionManager} config.sessionManager
   * @param {TestManager} config.testManager
   * @param {Database} config.database
   */
  initialize({
    resultsDirectoryPath = ".",
    database,
    sessionManager,
    testManager,
    exportTemplateDirectoryPath,
    importEnabled
  } = {}) {
    this._resultsDirectoryPath = path.resolve(resultsDirectoryPath);
    this._database = database;
    this._sessionManager = sessionManager;
    this._testManager = testManager;
    this._generatingComparisons = [];
    this._exportTemplateDirectoryPath = exportTemplateDirectoryPath;
    this._importEnabled = importEnabled;
    this._resultComparator = new ResultComparator({
      resultsDirectoryPath,
      resultsManager: this
    });
    this.readCommonPassedTests = this._resultComparator.readCommonPassedTests.bind(
      this._resultComparator
    );
    this.getComparisonIdentifier = this._resultComparator.getComparisonIdentifier.bind(
      this._resultComparator
    );
  }

  async createResult({ token, data }) {
    const result = this.prepareResult(data);
    let { test } = result;
    const session = await this._sessionManager.readSession(token);

    if (!session) return;
    if (!session.testExists(test)) return;
    if (session.isTestComplete(test)) return;
    await this._testManager.completeTest({ test, session });
    await this._database.createResult(token, result);

    const api = test.split("/").find(part => !!part);
    if (!session.isApiComplete(api)) return;
    await this.saveApiResults({ token, api });
    await this.generateReport({ token, api });

    const testFilesCount = session.getTestFilesCount();
    const apis = Object.keys(testFilesCount);
    if (apis.some(api => !session.isApiComplete(api))) return;
    await this._sessionManager.completeSession(token);
    await this.createInfoFile(session);
  }

  async readResults(token, filterPath) {
    const filterApi = filterPath
      ? filterPath.split("/").find(part => !!part)
      : null;
    const results = await this._database.readResults(token);
    const resultsPerApi = {};
    results.forEach(result => {
      const api = result.test.split("/").find(part => !!part);
      if (filterApi && api.toLowerCase() !== filterApi.toLowerCase()) return;
      if (filterPath && !new RegExp("^" + filterPath, "i").test(result.test))
        return;
      if (!resultsPerApi[api]) resultsPerApi[api] = [];
      delete result._id;
      resultsPerApi[api].push(result);
    });

    return resultsPerApi;
  }

  async readFlattenedResults(token) {
    const results = await this.readResults(token);
    const flattenedResults = {};
    for (let api in results) {
      if (!flattenedResults[api]) {
        flattenedResults[api] = {
          pass: 0,
          fail: 0,
          timeout: 0,
          not_run: 0
        };
      }
      for (let result of results[api]) {
        if (!result.subtests) {
          switch (result.status) {
            case "OK":
              flattenedResults[api].pass++;
              break;
            case "ERROR":
              flattenedResults[api].fail++;
              break;
            case "TIMEOUT":
              flattenedResults[api].timeout++;
              break;
            case "NOTRUN":
              flattenedResults[api].not_run++;
              break;
          }
          continue;
        }
        for (let test of result.subtests) {
          switch (test.status) {
            case "PASS":
              flattenedResults[api].pass++;
              break;
            case "FAIL":
              flattenedResults[api].fail++;
              break;
            case "TIMEOUT":
              flattenedResults[api].timeout++;
              break;
            case "NOTRUN":
              flattenedResults[api].not_run++;
              break;
          }
        }
      }
    }
    return flattenedResults;
  }

  async deleteResults(token) {
    const resultDirectory = path.join(this._resultsDirectoryPath, token);
    if (!(await FileSystem.exists(resultDirectory))) return;
    await FileSystem.removeDirectory(resultDirectory);
  }

  // async readResultComparison({ tokens, refTokens }) {
  //   // await Promise.all(
  //   //   refTokens
  //   //     .filter(token => !token.includes("-"))
  //   //     .map(async (token, index) => {
  //   //       refTokens.splice(index, 1);
  //   //       const hashTokens = await this._resultsManager.getTokensFromHash(
  //   //         token
  //   //       );
  //   //       refTokens = refTokens.concat(hashTokens);
  //   //     })
  //   // );
  //   let comparison = await this._resultComparator.readComparison({
  //     tokens,
  //     refTokens
  //   });
  //   if (!comparison) {
  //     comparison = await this._resultComparator.generateComparison({
  //       tokens,
  //       refTokens
  //     });
  //   }
  //   return comparison;
  // }

  // async getTokensFromHash(hash) {
  //   let tokens = [];
  //   const tempPath = path.join(this._resultsDirectoryPath, hash);
  //   if (await FileSystem.exists(tempPath)) {
  //     const tokenUaRegex = /(.+)[-]([a-zA-Z]{2}\d+).json/;
  //     const apiNames = await FileSystem.readDirectory(tempPath);
  //     const targetFolder = path.join(tempPath, apiNames[0]);
  //     tokens = await FileSystem.readDirectory(targetFolder);
  //     tokens = tokens.filter(name => {
  //       return tokenUaRegex.exec(name);
  //     });
  //     for (let i = 0; i < tokens.length; i++) {
  //       tokens[i] = tokens[i].replace(/(-[a-zA-Z]{2}\d+).json/, "");
  //     }
  //   }
  //   return tokens;
  // }

  async getJsonPath({ token, api }) {
    const session = await this._sessionManager.readSession(token);
    return this._getFilePath({
      userAgent: session.getUserAgent(),
      api,
      token
    });
  }

  async saveApiResults({ token, api }) {
    const apiResults = { results: (await this.readResults(token))[api] };
    const session = await this._sessionManager.readSession(token);

    await this._ensureResultsDirectoryExistence({ api, token, session });

    const filePath = await this.getJsonPath({ token, api });
    await FileSystem.writeFile(filePath, JSON.stringify(apiResults, null, 2));
  }

  async loadResults() {
    const sessionManager = this._sessionManager;
    const database = this._database;
    const resultsDirectoryPath = this._resultsDirectoryPath;
    if (!(await FileSystem.exists(resultsDirectoryPath))) return;

    const tokens = await FileSystem.readDirectory(resultsDirectoryPath);

    println("Looking for results to import ...");
    for (let token of tokens) {
      if (await sessionManager.readSession(token)) continue;

      const resultDirectoryPath = path.join(resultsDirectoryPath, token);
      const infoFilePath = path.join(resultDirectoryPath, "info.json");
      const session = await this._loadSessionFromInfoFile(infoFilePath);
      if (!session) continue;
      const browser = session.getBrowser();
      console.log(`Loading ${browser.name} ${browser.version} results ...`);

      const results = await this.loadResult(resultDirectoryPath);

      await sessionManager.addSession(session);
      for (let result of results) {
        await database.createResult(token, result);
      }
    }
  }

  async loadResult(resultDirectoryPath) {
    let allResults = [];
    const apis = await FileSystem.readDirectory(resultDirectoryPath);
    for (let api of apis) {
      const apiPath = path.join(resultDirectoryPath, api);
      if (!(await FileSystem.stats(apiPath)).isDirectory()) continue;
      const resultsFile = (await FileSystem.readDirectory(apiPath)).find(file =>
        /\w\w\d{1,3}\.json/.test(file)
      );
      const resultsFilePath = path.join(apiPath, resultsFile);
      const { results } = JSON.parse(
        await FileSystem.readFile(resultsFilePath)
      );
      allResults = allResults.concat(results);
    }
    return allResults;
  }

  async _loadSessionFromInfoFile(infoFilePath) {
    if (!(await FileSystem.exists(infoFilePath))) return null;

    const infoFile = await FileSystem.readFile(infoFilePath);
    const info = JSON.parse(infoFile);
    return Deserializer.deserializeSession(info);
  }

  async generateReport({ token, api }) {
    const filePath = await this.getJsonPath({ token, api });
    const dirPath = path.dirname(filePath);
    await WptReport.generateReport({
      inputJsonDirectoryPath: dirPath,
      outputHtmlDirectoryPath: dirPath,
      specName: api
    });
  }

  async generateMultiReport({ tokens, api }) {
    const comparisonDirectoryName = this.getComparisonIdentifier({ tokens });

    const apiDirectoryPath = path.join(
      this._resultsDirectoryPath,
      comparisonDirectoryName,
      api
    );

    if (!(await FileSystem.exists(apiDirectoryPath))) {
      await FileSystem.makeDirectory(apiDirectoryPath);

      const resultJsonFiles = await Promise.all(
        tokens.map(async token => ({
          token,
          path: await this.getJsonPath({ token, api })
        }))
      );
      const pathExistens = await Promise.all(
        resultJsonFiles.map(async ({ path }) => FileSystem.exists(path))
      );
      if (pathExistens.some(exists => !exists)) return null;
      await WptReport.generateMultiReport({
        outputHtmlDirectoryPath: apiDirectoryPath,
        specName: api,
        resultJsonFiles
      });
    }
  }

  async _ensureResultsDirectoryExistence({ token, api, session }) {
    if (!(await FileSystem.exists(this._resultsDirectoryPath))) {
      await FileSystem.makeDirectory(this._resultsDirectoryPath);
    }

    let directory = path.join(this._resultsDirectoryPath, token);
    if (!(await FileSystem.exists(directory))) {
      await FileSystem.makeDirectory(directory);
    }

    directory = path.join(directory, api);
    if (!(await FileSystem.exists(directory))) {
      await FileSystem.makeDirectory(directory);
    }

    this.createInfoFile(session);
  }

  async createInfoFile(session) {
    const token = session.getToken();
    const infoFilePath = path.join(
      this._resultsDirectoryPath,
      token,
      "info.json"
    );
    let info = Serializer.serializeSession(session);
    delete info.running_tests;
    delete info.pending_tests;
    delete info.completed_tests;
    await FileSystem.writeFile(infoFilePath, JSON.stringify(info, null, "  "));
  }

  _getFilePath({ userAgent, api, token }) {
    const apiDirectory = path.join(this._resultsDirectoryPath, token, api);
    return path.join(apiDirectory, this._getFileName(userAgent));
  }

  _getFileName(userAgent) {
    const {
      browser: { name, version }
    } = UserAgentParser.parse(userAgent);
    const abbreviation = UserAgentParser.abbreviateBrowserName(name);
    return abbreviation + ("00" + version).slice(-2) + ".json";
  }

  prepareResult(result) {
    const harness_status_map = {
      0: "OK",
      1: "ERROR",
      2: "TIMEOUT",
      3: "NOTRUN",
      OK: "OK",
      ERROR: "ERROR",
      TIMEOUT: "TIMEOUT",
      NOTRUN: "NOTRUN"
    };
    const subtest_status_map = {
      0: "PASS",
      1: "FAIL",
      2: "TIMEOUT",
      3: "NOTRUN",
      PASS: "PASS",
      FAIL: "FAIL",
      TIMEOUT: "TIMEOUT",
      NOTRUN: "NOTRUN"
    };

    if (result.tests) {
      result.tests.forEach(test => {
        test.status = subtest_status_map[test.status];
        delete test.stack;
      });
      result.subtests = result.tests;
      delete result.tests;
    }

    delete result.stack;
    result.status = harness_status_map[result.status];

    return result;
  }

  async importResults(blob) {
    if (!this.isImportEnabled()) throw new PermissionDeniedError();
    const extractZip = async (blob, destinationPath) => {
      const zip = new JSZip();
      const content = await zip.loadAsync(blob);
      const keys = Object.keys(content.files);
      for (let i = 0; i < keys.length; i++) {
        const file = content.files[keys[i]];
        const filePath = path.join(destinationPath, file.name);
        if (file.dir) {
          await FileSystem.makeDirectory(filePath);
        } else {
          const data = await file.async("string");
          await FileSystem.writeFile(filePath, data);
        }
      }
    };
    const zip = await JSZip.loadAsync(blob);
    if (!zip.file("/info.json")) throw new InvalidDataError("Invalid session ZIP!");
    const info = JSON.parse(await zip.file("/info.json").async("string"));
    const { token } = info;
    if (!token) throw new InvalidDataError("Invalid session ZIP!");
    const session = await this._sessionManager.readSession(token);
    if (session) throw new DuplicateError("Session already exists!");
    const destinationPath = path.join(this._resultsDirectoryPath, token);
    await FileSystem.makeDirectory(destinationPath);
    await extractZip(blob, destinationPath);
    await this.loadResults();
    return info.token;
  }

  async exportResults(token) {
    if (!token) return;
    const session = await this._sessionManager.readSession(token);
    if (session.getStatus() !== Session.COMPLETED) return null;

    const readDirectoryFiles = async directoryPath => {
      const fileNames = await FileSystem.readDirectory(directoryPath);
      let files = [];
      for (let fileName of fileNames) {
        const filePath = path.join(directoryPath, fileName);
        const stats = await FileSystem.stats(filePath);
        if (stats.isDirectory()) {
          files = files.concat(await readDirectoryFiles(filePath));
        } else {
          files.push({
            path: filePath,
            data: await FileSystem.readFile(filePath)
          });
        }
      }
      return files;
    };

    const sessionResultsDirectory = path.join(
      this._resultsDirectoryPath,
      token
    );
    const files = await readDirectoryFiles(sessionResultsDirectory);

    const zip = new JSZip();
    files.forEach(file =>
      zip.file(file.path.replace(sessionResultsDirectory, ""), file.data)
    );
    return zip.generateAsync({ type: "nodebuffer" });
  }

  async exportResultsApiJson({ token, api }) {
    const filePath = await this.getJsonPath({ token, api });
    try {
      const blob = await FileSystem.readFile(filePath);
      return blob;
    } catch (e) {
      return null;
    }
  }

  async exportResultsAllApiJsons(token) {
    const resultDirectory = path.join(this._resultsDirectoryPath, token);
    const apis = await FileSystem.readDirectory(resultDirectory);

    const zip = new JSZip();
    for (let api of apis) {
      const blob = await this.exportResultsApiJson({ token, api });
      if (!blob) continue;
      zip.file(`${api}.json`, blob);
    }

    return zip.generateAsync({ type: "nodebuffer" });
  }

  async exportResultsWptReport({ token, api }) {
    const apiDirectory = path.join(this._resultsDirectoryPath, token, api);
    const files = await FileSystem.readDirectory(apiDirectory);

    const zip = new JSZip();
    for (let file of files) {
      const blob = await FileSystem.readFile(path.join(apiDirectory, file));
      if (!blob) continue;
      if (new RegExp("wwdd.json").test(file)) continue;
      zip.file(file, blob);
    }

    return zip.generateAsync({ type: "nodebuffer" });
  }

  async readResultsWptReportUri({ token, api }) {
    const apiDirectory = path.join(this._resultsDirectoryPath, token, api);
    if (!(await FileSystem.exists(apiDirectory))) return null;
    return `/results/${token}/${api}/all.html`;
  }

  async exportResultsWptMultiReport({ tokens, api }) {
    await this.generateMultiReport({ tokens, api });

    const comparisonDirectoryName = this.getComparisonIdentifier({ tokens });

    const apiDirectoryPath = path.join(
      this._resultsDirectoryPath,
      comparisonDirectoryName,
      api
    );

    const files = await FileSystem.readDirectory(apiDirectoryPath);

    const zip = new JSZip();
    for (let file of files) {
      if (new RegExp(/.*\w\w\d\d\.json/).test(file)) continue;
      const blob = await FileSystem.readFile(path.join(apiDirectoryPath, file));
      if (!blob) continue;
      zip.file(file, blob);
    }

    return zip.generateAsync({ type: "nodebuffer" });
  }

  async readResultsWptMultiReportUri({ tokens, api }) {
    const comparisonDirectoryName = this.getComparisonIdentifier({ tokens });

    const relativeApiDirectoryPath = path.join(comparisonDirectoryName, api);

    const apiDirectoryPath = path.join(
      this._resultsDirectoryPath,
      relativeApiDirectoryPath
    );

    if (!(await FileSystem.exists(apiDirectoryPath))) {
      await this.generateMultiReport({ tokens, api });
    }

    return `/results/${relativeApiDirectoryPath}/all.html`;
  }

  async exportResultsOverview(token) {
    const zip = new JSZip();

    const flattenedResults = await this.readFlattenedResults(token);
    const resultsScript =
      "const results = " + JSON.stringify(flattenedResults, null, 2);
    zip.file("results.json.js", resultsScript);

    const session = await this._sessionManager.readSession(token);
    if (!session) return null;
    const sessionJson = Serializer.serializeSession(session);
    delete sessionJson.running_tests;
    delete sessionJson.completed_tests;
    delete sessionJson.pending_tests;
    const detailsScript =
      "const details = " + JSON.stringify(sessionJson, null, 2);
    zip.file("details.json.js", detailsScript);

    const readDirectoryFiles = async directoryPath => {
      const fileNames = await FileSystem.readDirectory(directoryPath);
      let files = [];
      for (let fileName of fileNames) {
        const filePath = path.join(directoryPath, fileName);
        const stats = await FileSystem.stats(filePath);
        if (stats.isDirectory()) {
          files = files.concat(await readDirectoryFiles(filePath));
        } else {
          files.push({
            filePath,
            data: await FileSystem.readFile(filePath)
          });
        }
      }
      return files;
    };

    const files = await readDirectoryFiles(this._exportTemplateDirectoryPath);
    files.forEach(file => {
      const filePath = file.filePath.replace(
        this._exportTemplateDirectoryPath,
        ""
      );
      zip.file(filePath, file.data);
    });

    return zip.generateAsync({ type: "nodebuffer" });
  }

  isImportEnabled() {
    return this._importEnabled;
  }
}

module.exports = ResultsManager;
