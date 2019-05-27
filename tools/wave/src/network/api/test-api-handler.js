const Route = require("../../data/route");
const Session = require("../../data/session");
const ApiHandler = require("./api-handler");
const SessionManager = require("../session-manager");
const ResultsManager = require("../../testing/results-manager");

class TestApiHandler extends ApiHandler {
  /**
   * @constructor
   * @param {Object} config
   * @param {SessionManager} config.sessionManager
   * @param {ResultsManager} config.resultsManager
   */
  constructor({
    wavePort,
    wptPort,
    wptSslPort,
    resultsManager,
    sessionManager
  }) {
    super();
    this._wptPort = wptPort;
    this._wptSslPort = wptSslPort;
    this._wavePort = wavePort;
    this._resultsManager = resultsManager;
    this._sessionManager = sessionManager;
  }

  getRoutes() {
    return [
      new Route({ uri: "/next*", handler: this._handleRequest.bind(this) })
    ];
  }

  _handleRequest(request, response) {
    const method = request.method;
    switch (method) {
      case "GET":
        return this._nextTest({ request, response });
    }
    response.status(404).send();
  }

  async _nextTest({ request, response }) {
    let { token } = this.parseQueryParameters(request);
    if (!token) {
      token = request.get("token");
    }
    if (!token) {
      token = request.query.token;
    }
    if (!token || token === "null") {
      token = request.cookies.sid;
    }

    const { resume } = this.parseQueryParameters(request);
    const { hostname } = request;

    let session = await this._sessionManager.getSession(token);

    if (resume) {
      let query = "?token=" + token + "&resume=1";
      response.redirect(
        this._generateUrl({
          hostname,
          port: this._wavePort,
          uri: "/newsession.html",
          query
        })
      );
      return;
    }

    switch (session.getStatus()) {
      case Session.PAUSED: {
        let query = "?token=" + session.getToken();
        response.redirect(
          this._generateUrl({
            hostname,
            uri: "/pause.html",
            port: this._wavePort,
            query
          })
        );
        return;
      }
      case Session.COMPLETED:
      case Session.ABORTED: {
        let query = "?token=" + session.getToken();
        response.redirect(
          this._generateUrl({
            hostname,
            uri: "/complete.html",
            port: this._wavePort,
            query
          })
        );
        return;
      }
    }

    let test = session.nextTest(this._onTestTimeout.bind(this));

    console.log("TEST", test);
    if (!test) {
      if (session.getStatus() === Session.RUNNING) {
        let query = "?token=" + session.getToken();
        const url = this._generateUrl({
          hostname,
          uri: "/complete.html",
          port: this._wavePort,
          query
        });

        if (request.query.redirect) {
          response.redirect(url);
        } else {
          response.redirect(url);
        }
        await this._sessionManager.updateSession(session);
      }
      return;
    }

    // console.log('TEST', test)

    const url = this._generateTestUrl({
      test,
      token: session.getToken(),
      testTimeout:
        test.indexOf("manual") !== -1
          ? 5 * 60 * 1000
          : session.getTestTimeout(),
      hostname
    });

    if (request.query.redirect) {
      response.redirect(url);
    } else {
      response.redirect(url);
    }
    await this._sessionManager.updateSession(session);
  }

  _generateTestUrl({ hostname, test, token, testTimeout }) {
    let protocol = "http";
    let port = this._wptPort;

    if (test.indexOf("https") !== -1) {
      protocol = "https";
      port = this._wptSslPort;
    }

    let query = "?";
    query += "&token=" + token;
    query += "&timeout=" + testTimeout;

    return this._generateUrl({ protocol, hostname, port, uri: test, query });
  }

  _generateUrl({ protocol, hostname, port, uri, query }) {
    protocol = protocol || "http";
    port = port || 80;
    uri = uri || "/";
    if (!uri.startsWith("/")) uri = "/" + uri;
    query = query || "";
    return protocol + "://" + hostname + ":" + port + uri + query;
  }

  _onTestTimeout(token, test) {
    console.log("TIMEOUT", test);
    const data = {
      token,
      test,
      result: {
        test,
        status: "TIMEOUT",
        message: null,
        subtests: [
          {
            status: "TIMEOUT",
            xstatus: "SERVERTIMEOUT"
          }
        ]
      }
    };
    this._resultsManager
      .createResult({ token, data })
      .catch(error => console.error(error));
  }
}

module.exports = TestApiHandler;
