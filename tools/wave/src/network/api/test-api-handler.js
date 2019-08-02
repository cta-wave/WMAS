const Route = require("../../data/route");
const Session = require("../../data/session");
const ApiHandler = require("./api-handler");
const SessionManager = require("../../testing/session-manager");
const ResultsManager = require("../../testing/results-manager");
const TestManager = require("../../testing/test-manager");
const Serializer = require("../../utils/serializer");

const DEFAULT_LAST_COMPLETED_TESTS_COUNT = 5;
const DEFAULT_LAST_COMPLETED_TESTS_STATUS = ["ALL"];

const { GET } = Route;

class TestApiHandler extends ApiHandler {
  /**
   * @constructor
   * @param {Object} config
   * @param {SessionManager} config.sessionManager
   * @param {ResultsManager} config.resultsManager
   * @param {TestManager} config.testManager
   */
  constructor({
    wavePort,
    wptPort,
    wptSslPort,
    resultsManager,
    sessionManager,
    testManager
  }) {
    super();
    this._wptPort = wptPort;
    this._wptSslPort = wptSslPort;
    this._wavePort = wavePort;
    this._resultsManager = resultsManager;
    this._sessionManager = sessionManager;
    this._testManager = testManager;
  }

  async _readTests({ response }) {
    try {
      const tests = await this._testManager.readTests();
      this.sendJson(tests, response);
    } catch (error) {
      console.error(new Error(`Failed to read tests:\n${error.stack}`));
      response.status(500).send();
    }
  }

  async _readSessionTests({ request, response }) {
    try {
      const url = this.parseUrl(request);
      const token = url[1];
      const session = await this._sessionManager.readSession(token);
      if (!session) {
        response.status(404).send();
        return;
      }
      const tests = Serializer.serializeSession(session);
      delete tests.tests;
      delete tests.types;
      delete tests.user_agent;
      delete tests.timeouts;
      delete tests.browser;
      delete tests.date_started;
      delete tests.date_finished;
      delete tests.is_public;
      delete tests.reference_tokens;
      delete tests.webhook_urls;
      delete tests.status;
      delete tests.test_files_count;
      delete tests.test_files_completed;
      this.sendJson(tests, response);
    } catch (error) {
      console.error(new Error(`Failed to read session tests:\n${error.stack}`));
      response.status(500).send();
    }
  }

  async _nextTest({ request, response }) {
    try {
      const requestUrl = this.parseUrl(request);
      const token = requestUrl[1];
      const { hostname } = request;

      const session = await this._sessionManager.readSession(token);

      switch (session.getStatus()) {
        case Session.PENDING: {
          response.send();
          return;
        }
        case Session.PAUSED: {
          const url = this._generateWaveUrl({
            hostname,
            uri: "/pause.html",
            token
          });
          this.sendJson({ next_test: url }, response);
          return;
        }
        case Session.COMPLETED:
        case Session.ABORTED: {
          const url = this._generateWaveUrl({
            hostname,
            uri: "/complete.html",
            token
          });
          this.sendJson({ next_test: url }, response);
          return;
        }
      }

      let test = await this._testManager.nextTest(session);

      if (!test) {
        if (session.getStatus() !== Session.RUNNING) return;
        const url = this._generateWaveUrl({
          hostname,
          uri: "/complete.html",
          token
        });
        this.sendJson({ next_test: url }, response);
        return;
      }

      const testTimeout = this._testManager.getTestTimeout({ test, session });
      const url = this._generateTestUrl({ test, token, testTimeout, hostname });

      // console.log("TEST", test);
      this.sendJson({ next_test: url }, response);
    } catch (error) {
      console.error(new Error(`Failed to read next test:\n${error.stack}`));
      response.status(500).send();
    }
  }

  _sendUrl({ url, response, redirect }) {
    if (redirect) {
      response.redirect(url);
    } else {
      response.send(url);
    }
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

  _generateWaveUrl({ hostname, token, uri }) {
    return this._generateUrl({
      hostname,
      uri,
      port: this._wavePort,
      query: "?token=" + token
    });
  }

  _generateUrl({ protocol, hostname, port, uri, query }) {
    protocol = protocol || "http";
    port = port || 80;
    uri = uri || "/";
    if (!uri.startsWith("/")) uri = "/" + uri;
    query = query || "";
    return protocol + "://" + hostname + ":" + port + uri + query;
  }

  async _lastCompletedTests({ request, response }) {
    try {
      const url = this.parseUrl(request);
      const token = url[1];
      let { count, status } = this.parseQueryParameters(request);
      if (!count) count = DEFAULT_LAST_COMPLETED_TESTS_COUNT;
      if (!status) status = DEFAULT_LAST_COMPLETED_TESTS_STATUS;
      const {
        pass,
        fail,
        timeout,
        notRun
      } = await this._testManager.readLastCompletedTests({ token, count });
      const tests = {};
      status.forEach(status => {
        switch (status.toLowerCase()) {
          case "pass":
            tests.pass = pass;
            break;
          case "fail":
            tests.fail = fail;
            break;
          case "timeout":
            tests.timeout = timeout;
            break;
          case "not_run":
            tests.not_run = notRun;
            break;
          case "all":
            tests.pass = pass;
            tests.fail = fail;
            tests.timeout = timeout;
            tests.not_run = notRun;
        }
      });
      this.sendJson(tests, response);
    } catch (error) {
      console.error(new Error(`Failed to read session tests:\n${error.stack}`));
      response.status(500).send();
    }
  }

  getRoutes() {
    const uri = "/api/tests*";
    return [
      new Route({ method: GET, uri, handler: this._handleGet.bind(this) })
    ];
  }

  _handleGet(request, response) {
    console.log(`GET    ${request.url}`);
    const url = this.parseUrl(request);
    switch (url.length) {
      case 1:
        return this._readTests({ response });
      case 2:
        return this._readSessionTests({ request, response });
      case 3:
        switch (url[2]) {
          case "next":
            return this._nextTest({ request, response });
          case "last_completed":
            return this._lastCompletedTests({ request, response });
        }
    }
    response.status(404).send();
  }
}

module.exports = TestApiHandler;
