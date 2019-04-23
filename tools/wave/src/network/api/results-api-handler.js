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
      let { token } = this.parseQueryParameters(request);
      if (!token) {
        token = request.get("token");
      }
      let data = request.body;
      if (!data) {
        try {
          data = { status: 3 }; // NOTRUN
          data = JSON.parse(decodeURI(request.query.data));
        } catch (error) {
          console.error(
            "Failed to load test data from uri:",
            request.query.data
          );
          data = { status: 1 }; // ERROR
        }
      }
      await this._resultsManager.createResult({ token, data });
    } catch (error) {
      console.error("Failed to create result:", error);
      response.status(500).send();
    }
  }

  async _readResult({ request, response }) {
    try {
      const url = this.parseUrl(request);
      const token = url[1];
      const results = await this._resultsManager.readFlattenedResults(token);
      this.sendJson(results, response);
    } catch (error) {
      console.error("Failed to read result:", error);
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
      console.error("Failed to read result comparison:", error);
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
      console.error("Failed to read html report:", error);
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
    console.error("Failed to download api result json:", error);
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
    console.error("Failed to download result html:", error);
    response.status(500).send();
  }
  }

  getRoutes() {
    const uri = "/results*";
    return [
      new Route({ method: GET, uri, handler: this._handleGet.bind(this) }),
      new Route({ method: POST, uri, handler: this._handlePost.bind(this) })
    ];
  }

  _handlePost(request, response) {
    const url = this.parseUrl(request);
    switch (url.length) {
      case 1:
        response.send();
        return this._createResult({ request, response });
    }
  }

  async _handleGet(request, response, next) {
    const url = this.parseUrl(request);
    switch (url.length) {
      case 1: {
        let { token, hostname } = this.parseQueryParameters(request);
        if (!token) {
          token = request.get("token");
        }
        response.redirect(
          `/nodejs/next?token=${token}&hostname=${hostname}&redirect=1`
        );
        return this._createResult({ request, response });
      }
      case 2:
        return this._readResult({ request, response });
      case 3:
        switch (url[2]) {
          case "html":
            return this._downloadResultHtml({ request, response });
          case "compare":
            return this._readResultComparison({ request, response });
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
