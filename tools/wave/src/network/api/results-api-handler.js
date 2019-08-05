const Route = require("../../data/route");
const ApiHandler = require("./api-handler");
const ResultsManager = require("../../testing/results-manager");

const { GET, POST } = Route;

/**
 * @module ResultsApiHandler
 */
class ResultsApiHandler extends ApiHandler {
  /**
   * @constructor
   * @param {ResultsManager} resultsManager
   */
  constructor(resultsManager) {
    super();
    this._resultsManager = resultsManager;
  }

  async _createResult({ request, response }) {
    try {
      const requestUrl = this.parseUrl(request);
      const token = requestUrl[1];
      let data = request.body;
      if (!data || Object.keys(data).length === 0) {
        try {
          data = JSON.parse(request.query.result);
        } catch (error) {
          console.error(
            new Error(
              `Failed to parse test result from uri:\n${request.query.data}`
            )
          );
          response.status(400).send();
        }
      }
      await this._resultsManager.createResult({ token, data });
      response.send();
    } catch (error) {
      console.error(new Error(`Failed to create result:\n${error.stack}`));
      response.status(500).send();
    }
  }

  async _readResult({ request, response }) {
    try {
      const url = this.parseUrl(request);
      const token = url[1];
      const { path } = request.query;
      const results = await this._resultsManager.readResults(token, path);
      this.sendJson(results, response);
    } catch (error) {
      console.error(new Error(`Failed to read result:\n${error.stack}`));
      response.status(500).send();
    }
  }

  async _readResultsCompact({ request, response }) {
    try {
      const url = this.parseUrl(request);
      const token = url[1];
      const results = await this._resultsManager.readFlattenedResults(token);
      this.sendJson(results, response);
    } catch (error) {
      console.error(new Error(`Failed to read result:\n${error.stack}`));
      response.status(500).send();
    }
  }

  async _readResultComparison({ request, response }) {
    try {
      const { reftokens } = this.parseQueryParameters(request);
      const refTokens = reftokens ? reftokens.split(",") : [];
      const url = this.parseUrl(request);
      const tokens = url[1].split(",");
      const comparison = await this._resultsManager.readResultComparison({
        tokens,
        refTokens
      });
      this.sendJson(comparison, response);
    } catch (error) {
      console.error(new Error(`Failed to read result comparison:\n${error}`));
      response.status(500).send();
    }
  }

  async _readResultApiHtmlReport({ request, response }) {
    try {
      const url = this.parseUrl(request);
      const tokens = url[1].split(",");
      const token = tokens.length === 1 ? tokens[0] : null;
      const api = url[2];
      const { reftokens } = this.parseQueryParameters(request);
      const refTokens = reftokens ? reftokens.split(",") : [];
      const uri = await this._resultsManager.readResultApiHtmlReportPath({
        tokens,
        refTokens,
        token,
        api
      });
      response.redirect(`/results/${uri}`);
    } catch (error) {
      console.error(new Error(`Failed to read html report:\n${error.stack}`));
      response.status(500).send();
    }
  }

  async _downloadResultApiJson({ request, response }) {
    try {
      const url = this.parseUrl(request);
      const token = url[1];
      const api = url[2];
      const filePath = await this._resultsManager.getJsonPath({ token, api });
      const fileName = `${token.split("-").shift()}-${api}-${filePath
        .split("/")
        .pop()}`;
      this.sendFile({ response, fileName, filePath });
    } catch (error) {
      console.error(
        new Error(`Failed to download api result json:\n${error.stack}`)
      );
      response.status(500).send();
    }
  }

  async _downloadResultHtml({ request, response }) {
    try {
      const url = this.parseUrl(request);
      const token = url[1];
      const blob = await this._resultsManager.exportResults(token);
      const fileName = token.split("-")[0] + "_results_html.zip";
      this.sendZip({ blob, response, fileName });
    } catch (error) {
      console.error(
        new Error(`Failed to download result html:\n${error.stack}`)
      );
      response.status(500).send();
    }
  }

  getRoutes() {
    const uri = "/api/results*";
    return [
      new Route({ method: GET, uri, handler: this._handleGet.bind(this) }),
      new Route({ method: POST, uri, handler: this._handlePost.bind(this) })
    ];
  }

  _handlePost(request, response) {
    console.log(`POST   ${request.url}`);
    const url = this.parseUrl(request);
    switch (url.length) {
      case 2:
        return this._createResult({ request, response });
    }
    response.status(404).send();
  }

  async _handleGet(request, response, next) {
    console.log(`GET    ${request.url}`);
    const url = this.parseUrl(request);
    switch (url.length) {
      case 1: {
        let { token, hostname } = this.parseQueryParameters(request);
        if (!token) {
          token = request.get("token");
        }
        response.redirect(
          `/nodejs/api/next?token=${token}&hostname=${hostname}&redirect=1`
        );
        return this._createResult({ request, response });
      }
      case 2:
        if (request.query.result) {
          return this._createResult({ request, response });
        }
        return this._readResult({ request, response });
      case 3:
        switch (url[2]) {
          case "html":
            return this._downloadResultHtml({ request, response });
          case "compare":
            return this._readResultComparison({ request, response });
          case "compact":
            return this._readResultsCompact({ request, response });
        }
      case 4: {
        switch (url[3]) {
          case "json":
            return this._downloadResultApiJson({ request, response });
          case "html":
            return this._readResultApiHtmlReport({ request, response });
        }
      }
    }
    next();
  }
}

module.exports = ResultsApiHandler;
