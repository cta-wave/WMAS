const path = require("path");
const EventEmitter = require("events");
const crypto = require("crypto");

const FileSystem = require("../../utils/file-system");

const COMPARISON_GENERATION_FINISHED = "comparison_generation_finished";

/**
 * @module ResultComparator
 */
class ResultComparator {
  constructor({ resultsDirectoryPath, resultsManager }) {
    this._resultsDirectoryPath = resultsDirectoryPath;
    this._eventEmitter = new EventEmitter();
    this._generatingComparisons = [];
    this._resultsManager = resultsManager;
  }

  async readComparison({ tokens, refTokens }) {
    const comparisonDirectory = this.getComparisonIdentifier({
      tokens,
      refTokens
    });
    const comparisonDirectoryPath = path.join(
      this._resultsDirectoryPath,
      comparisonDirectory
    );
    const comparisonResultPath = path.join(
      comparisonDirectoryPath,
      "manifest.json"
    );
    if (!(await FileSystem.exists(comparisonResultPath))) return null;
    const comparisonJson = await FileSystem.readFile(comparisonResultPath);
    return JSON.parse(comparisonJson);
  }

  async generateComparison({ tokens, refTokens }) {
    const comparisonDirectory = this.getComparisonIdentifier({
      tokens,
      refTokens
    });
    let comparisonResult;
    if (this._generatingComparisons.includes(comparisonDirectory)) {
      comparisonResult = await new Promise(resolve => {
        const onComparisonGenerationFinished = finishedDirectory => {
          if (finishedDirectory === comparisonDirectory) {
            this._eventEmitter.removeListener(
              COMPARISON_GENERATION_FINISHED,
              onComparisonGenerationFinished
            );
            resolve(this.readComparison({ tokens, refTokens }));
          }
        };
        this._eventEmitter.on(
          COMPARISON_GENERATION_FINISHED,
          onComparisonGenerationFinished
        );
      });
    } else {
      this._generatingComparisons.push(comparisonDirectory);
      comparisonResult = await this._generateComparisonResults({
        tokens,
        refTokens
      });
      await this._saveComparison({
        comparisonResult,
        tokens,
        refTokens
      });
      this._eventEmitter.emit(
        COMPARISON_GENERATION_FINISHED,
        comparisonDirectory
      );
    }
    return comparisonResult;
  }

  async _generateComparisonResults({ tokens, refTokens }) {
    const passedRefTests = await this.readCommonPassedTests(refTokens);
    let comparisonResults = {};
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      comparisonResults[token] = {};
      const result = await this._resultsManager.readResults(token);
      for (let api in result) {
        comparisonResults[token][api] = { passed: 0, total: 0 };

        result[api].forEach(apiResult => {
          const { test } = apiResult;
          if (passedRefTests && !passedRefTests[api].includes(test)) return;
          const passed = !apiResult.subtests.some(
            test => test.status !== "PASS"
          );
          if (passed) comparisonResults[token][api].passed++;
          if (passedRefTests) {
            comparisonResults[token][api].total = passedRefTests[api].length;
          } else {
            comparisonResults[token][api].total++;
          }
        });
      }
    }
    return comparisonResults;
  }

  async _saveComparison({ comparisonResult, tokens, refTokens }) {
    const comparisonDirectory = this.getComparisonIdentifier({
      tokens,
      refTokens
    });
    const comparisonDirectoryPath = path.join(
      this._resultsDirectoryPath,
      comparisonDirectory
    );
    if (!(await FileSystem.exists(comparisonDirectoryPath))) {
      await FileSystem.makeDirectory(comparisonDirectoryPath);
    }
    const comparisonResultPath = path.join(
      comparisonDirectoryPath,
      "manifest.json"
    );
    await FileSystem.writeFile(
      comparisonResultPath,
      JSON.stringify(comparisonResult, null, 2)
    );
  }

  async readCommonPassedTests(tokens) {
    if (!tokens || tokens.length === 0) return null;

    const refSessionsResults = await Promise.all(
      tokens.map(async token => await this._resultsManager.readResults(token))
    );

    const passedTests = {};
    const failedTests = {};
    refSessionsResults.forEach(result => {
      Object.keys(result).forEach(api => {
        if (!passedTests[api]) passedTests[api] = [];
        if (!failedTests[api]) failedTests[api] = [];
        result[api].forEach(apiResult => {
          const passed = !apiResult.subtests.some(
            test => test.status !== "PASS"
          );
          const { test } = apiResult;
          if (passed) {
            if (failedTests[api].includes(test)) return;
            if (passedTests[api].includes(test)) return;
            passedTests[api].push(test);
          } else {
            if (passedTests[api].includes(test)) {
              passedTests[api].splice(passedTests[api].indexOf(test), 1);
            }
            if (failedTests[api].includes(test)) return;
            failedTests[api].push(test);
          }
        });
      });
    });

    return passedTests;
  }

  getComparisonIdentifier({ tokens, refTokens = [] } = {}) {
    let comparisonDirectory = "comparison";
    comparisonDirectory += tokens
      .map(token => token.split("-")[0])
      .sort((tokenA, tokenB) => tokenA > tokenB)
      .reduce((string, token) => `${string}-${token}`, "");
    let hash = crypto.createHash("sha1");
    refTokens
      .sort((tokenA, tokenB) => tokenA > tokenB)
      .forEach(token => hash.update(token));
    tokens
      .sort((tokenA, tokenB) => tokenA > tokenB)
      .forEach(token => hash.update(token));
    hash = hash.digest("hex");
    comparisonDirectory += `-${hash.substr(0, 8)}`;
    return comparisonDirectory;
  }
}

module.exports = ResultComparator;
