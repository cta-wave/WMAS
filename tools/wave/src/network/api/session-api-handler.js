const Route = require("../../data/route");
const Serializer = require("../../utils/serializer");
const ApiHandler = require("./api-handler");
const Session = require("../../data/session");
const SessionManager = require("../session-manager");
const ResultsManager = require("../../testing/results-manager");

const { GET, POST, DELETE } = Route;

/**
 * @module SessionApiHandler
 */
class SessionApiHandler extends ApiHandler {
  /**
   * @constructor
   * @param {SessionManager} sessionManager
   * @param {ResultsManager} resultsManager
   */
  constructor(sessionManager, resultsManager) {
    super();
    this._sessionManager = sessionManager;
    this._resultsManager = resultsManager;
  }

  async _createSession({ request, response }) {
    const userAgent = request.get("User-Agent");
    const { path, reftoken, types, testTimeout } = this.parseQueryParameters(
      request
    );
    const referenceTokens = reftoken.split(",").filter(token => !!token);
    const session = await this._sessionManager.createSession({
      path,
      referenceTokens,
      types,
      userAgent,
      testTimeout
    });

    const token = session.getToken();

    // save token in cookie to resume session if tests run into problems
    response.cookie("sid", token, {
      maxAge: 1000 * 60 * 60 * 48, // 2 days
      httpOnly: true
    });
    response.send(token);
  }

  async _readSession({ request, response, detailsOnly = false } = {}) {
    const url = this.parseUrl(request);
    const token = url[1];
    const session = await this._sessionManager.readSession(token);
    if (!session) {
      response.status(404).send();
    } else {
      const sessionObject = Serializer.serializeSession(session);
      if (detailsOnly) {
        delete sessionObject.running_tests;
        delete sessionObject.completed_tests;
        delete sessionObject.pending_tests;
      }
      this.sendJson(sessionObject, response);
    }
  }

  async _readSessions({ request, response }) {
    const sessions = await this._sessionManager.readSessions();
    const sessionsObject = Serializer.serializeSessions(sessions);
    this.sendJson(sessionsObject, response);
  }

  async _readPublicSessions({ response }) {
    const publicSessions = await this._sessionManager.readPublicSessions();
    const publicSessionsJson = publicSessions.map(session =>
      session.getToken()
    );
    this.sendJson(publicSessionsJson, response);
  }

  async _deleteSession({ request, response }) {
    const url = this.parseUrl(request);
    const token = url[1];
    await this._sessionManager.deleteSession(token);
    await this._resultsManager.deleteResults(token);
    response.send();
  }

  async _pauseSession({ request, response }) {
    const url = this.parseUrl(request);
    const token = url[1];
    const session = await this._sessionManager.readSession(token);
    if (session.getStatus() === Session.RUNNING) {
      session.setStatus(Session.PAUSED);
    }
    response.send();
  }

  async _resumeSession({ request, response }) {
    const url = this.parseUrl(request);
    const token = url[1];
    const session = await this._sessionManager.readSession(token);
    if (session.getStatus() === Session.PAUSED) {
      session.setStatus(Session.RUNNING);
    }
    response.send();
  }

  async _stopSession({ request, response }) {
    const url = this.parseUrl(request);
    const token = url[1];
    const session = await this._sessionManager.readSession(token);
    session.setStatus(Session.ABORTED);
    this._sessionManager.updateSession(session);
    response.send();
  }

  async _findToken({ response, fragment }) {
    const url = this.parseUrl(request);
    const fragment = url[1];
    const token = await this._sessionManager.findToken(fragment);
    this.sendJson({ token }, response);
  }

  getRoutes() {
    const uri = "/sessions*";
    return [
      new Route({ method: POST, uri, handler: this._handlePost.bind(this) }),
      new Route({ method: GET, uri, handler: this._handleGet.bind(this) }),
      new Route({ method: DELETE, uri, handler: this._handleDelete.bind(this) })
    ];
  }

  _handlePost(request, response) {
    const url = this.parseUrl(request);
    switch (url.length) {
      case 1:
        return this._createSession({ request, response });
    }
    response.status(404).send();
  }

  _handleGet(request, response) {
    const url = this.parseUrl(request);
    switch (url.length) {
      case 1:
        return this._readSessions({ request, response });
      case 2:
        if (url[1] === "public") {
          return this._readPublicSessions({ response });
        }
        return this._readSession({ request, response });
      case 3:
        switch (url[2].toLowerCase()) {
          case "pause":
            return this._pauseSession({ request, response });
          case "resume":
            return this._resumeSession({ request, response });
          case "stop":
            return this._stopSession({ request, response });
          case "token":
            return this._findToken({ request, response });
          case "details":
            return this._readSession({
              request,
              response,
              detailsOnly: true
            });
        }
    }
    response.status(404).send();
  }

  _handleDelete(request, response) {
    const url = this.parseUrl(request);
    switch (url.length) {
      case 2:
        return this._deleteSession({ request, response });
    }
    response.status(404).send();
  }
}

module.exports = SessionApiHandler;
