const EventEmitter = require("events");

const Route = require("../../data/route");
const ApiHandler = require("./api-handler");
const ResultsManager = require("../../testing/results-manager");

const COMPARISON_GENERATION_FINISHED = "comparison_generation_finished";

class ResultsApiHandler extends ApiHandler {
  /**
   * @constructor
   * @param {ResultsManager} resultsManager
   */
  constructor(resultsManager) {
    super();
    this._routes = this._createRoutes();
    this._resultsManager = resultsManager;
    this._eventEmitter = new EventEmitter();
    this._generatingComparisons = [];
  }

  _createRoutes() {
    return [
      new Route("/results", this._handleRequest.bind(this)),
      new Route("/results/*", this._handleRequest.bind(this))
    ];
  }

  getRoutes() {
    return this._routes;
  }

  async _handleRequest(request, response, next) {
    const { method } = request;
    const url = this.parseUrl(request);
    const test = request.get("test");
    let { token, tokens, api, reftokens } = this.parseQueryParameters(request);
    if (!token) {
      token = request.get("token");
    }
    switch (method) {
      case "POST":
        response.send();
        if (!test) return;
        return this._createResult({ data: request.body, token, test });
      case "GET":
        switch (url.length) {
          case 1: {
            response.redirect(
              `/nodejs/next?token=${token}&timeout=null&hostname=${
                request.query.hostname
              }&redirect=1`
            );
            if (!test) return;
            let data = { status: 3 }; // NOTRUN
            try {
              data = JSON.parse(decodeURI(request.query.data));
            } catch (error) {
              console.log("json error, data was:", request.query.data);
              data = { status: 1 }; // ERROR
            }
            return this._createResult({
              data,
              token,
              test
            });
          }
          case 2: {
            switch (url[1]) {
              case "html":
                const reftoken = token;
                return this._serveHtmlReport({
                  tokens,
                  reftoken,
                  response,
                  api
                });
              default:
                token = url[1];
                const results = await this._resultsManager.getFlattenedResults(
                  token
                );
                this.sendJson(results, response);
                return;
            }
          }
          case 3:
            token = url[1];
            switch (url[2]) {
              case "html":
                return this._sendZip({
                  blob: await this._resultsManager.exportResults(token),
                  response,
                  token
                });
              case "compare":
                const tokens = url[1].split(",");
                const refTokens = reftokens ? reftokens.split(",") : [];
                const hashes = refTokens.filter(token => !token.includes("-"));
                try {
                  return this._sendComparison(
                    tokens,
                    refTokens,
                    hashes,
                    response
                  );
                } catch (error) {
                  console.error(error);
                  response.send(500);
                  return;
                }
            }
          case 4: {
            switch (url[3]) {
              case "json":
                return this._sendJsonReport({
                  response,
                  token: url[1],
                  api: url[2]
                });
              case "html":
                return this._serveHtmlReport({
                  response,
                  token: url[1],
                  api: url[2]
                });
            }
          }
        }
    }
    next();
  }

  async _sendJsonReport({ token, response, api }) {
    const filePath = await this._resultsManager.getJsonPath({ token, api });
    const fileName =
      token.split("-").shift() + "-" + api + "-" + filePath.split("/").pop();
    response.set(
      "Content-Disposition",
      'attachment;filename="' + fileName + '"'
    );
    response.sendFile(filePath);
  }

  async _serveHtmlReport({ token, tokens, reftoken, response, api }) {
    const uri = await this._resultsManager.getHtmlPath({
      tokens,
      reftoken,
      token,
      api
    });
    response.redirect("/results/" + uri);
  }

  async _createResult({ data, token, test }) {
    const result = this._resultsManager.prepareResult(data);
    if (test) {
      result.test = test;
    } else {
      test = result.test;
    }
    if (test.startsWith("/")) test = test.substr(1);
    await this._resultsManager.saveResult({ token, test, result });
  }

  async _sendComparison(tokens, refTokens, hashes, response) {
    await Promise.all(
      hashes.map(async hash => {
        refTokens.splice(refTokens.indexOf(hash), 1);
        const hashTokens = await this._resultsManager.getTokensFromHash(hash);
        refTokens = refTokens.concat(hashTokens);
      })
    );
    let comparisonResult = await this._resultsManager.loadComparison(
      tokens,
      refTokens
    );

    if (!comparisonResult) {
      const comparisonDirectory = this._resultsManager.getComparisonDirectoryName(
        tokens,
        refTokens
      );
      if (this._generatingComparisons.includes(comparisonDirectory)) {
        comparisonResult = await new Promise(resolve => {
          const onComparisonGenerationFinished = finishedDirectory => {
            if (finishedDirectory === comparisonDirectory) {
              this._eventEmitter.removeListener(
                COMPARISON_GENERATION_FINISHED,
                onComparisonGenerationFinished
              );
              resolve(this._resultsManager.loadComparison(tokens, refTokens));
            }
          };
          this._eventEmitter.on(
            COMPARISON_GENERATION_FINISHED,
            onComparisonGenerationFinished
          );
        });
      } else {
        this._generatingComparisons.push(comparisonDirectory);
        comparisonResult = await this._resultsManager.generateComparisonResults(
          tokens,
          refTokens
        );
        await this._resultsManager.saveComparison(
          comparisonResult,
          tokens,
          refTokens
        );
        this._eventEmitter.emit(
          COMPARISON_GENERATION_FINISHED,
          comparisonDirectory
        );
      }
    }
    this.sendJson(comparisonResult, response);
  }

  _flattenResults(results) {
    const flattenedResults = {};
    for (let api in results) {
      if (!flattenedResults[api]) {
        flattenedResults[api] = {
          pass: 0,
          fail: 0,
          timeout: 0,
          timeoutfiles: [],
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
          if (results.xstatus === "SERVERTIMEOUT") {
            flattenedResults[api].timeoutfiles.push(result.test);
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
          if (test.xstatus === "SERVERTIMEOUT") {
            flattenedResults[api].timeoutfiles.push(result.test);
          }
        }
      }
    }
    return flattenedResults;
  }

  async _sendZip({ blob, response, token }) {
    const fileName = token.split("-")[0] + "_results_html.zip";
    response.set(
      "Content-Disposition",
      'attachment;filename="' + fileName + '"'
    );
    response.set("Content-Type", "application/x-compressed");
    response.send(blob);
  }
}

module.exports = ResultsApiHandler;
