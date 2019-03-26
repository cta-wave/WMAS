const Route = require("../../data/route");
const Serializer = require("../../utils/serializer");
const ApiHandler = require("./api-handler");
const Session = require("../../data/session");

class SessionApiHandler extends ApiHandler {
  constructor(sessionManager, resultsManager) {
    super();
    this._routes = this._createRoutes();
    this._sessionManager = sessionManager;
    this._resultsManager = resultsManager;
  }

  _createRoutes() {
    return [
      new Route("/sessions/*", this._handleRequest.bind(this)),
      new Route("/sessions", this._handleRequest.bind(this))
    ];
  }

  getRoutes() {
    return this._routes;
  }

  _handleRequest(request, response) {
    const url = this.parseUrl(request);
    switch (request.method) {
      case "GET":
        switch (url.length) {
          case 1:
            return this._getSessions({ request, response });
          case 2:
            const token = url[1];
            if (token === "public") {
              return this._getPublicSessions({ response });
            }
            return this._getSession({ response, token: url[1] });
          case 3:
            switch (url[2].toLowerCase()) {
              case "pause":
                response.send();
                return this._pauseSession(url[1]);
              case "resume":
                response.send();
                return this._resumeSession(url[1]);
              case "token":
                return this._findToken({ response, fragment: url[1] });
              case "stop":
                response.send();
                return this._stopSession(url[1]);
              case "delete":
                response.send();
                return this._deleteSession(url[1]);
              case "details":
                return this._getSession({
                  response,
                  token: url[1],
                  detailsOnly: true
                });
            }
        }
    }
    response.status(404).send();
  }

  async _stopSession(token) {
    const session = await this._sessionManager.getSession(token);
    session.setStatus(Session.ABORTED);
    this._sessionManager.updateSession(session);
  }

  async _findToken({ response, fragment }) {
    const token = await this._sessionManager.findToken(fragment);
    this.sendJson({ token }, response);
  }

  async _pauseSession(token) {
    const session = await this._sessionManager.getSession(token);
    if (session.getStatus() === Session.RUNNING) {
      session.setStatus(Session.PAUSED);
    }
  }

  async _resumeSession(token) {
    const session = await this._sessionManager.getSession(token);
    if (session.getStatus() === Session.PAUSED) {
      session.setStatus(Session.RUNNING);
    }
  }

  async _deleteSession(token) {
    await this._sessionManager.deleteSession(token);
    await this._resultsManager.deleteResults(token);
  }

  async _getSessions({ request, response }) {
    const sessions = await this._sessionManager.getSessions();
    const sessionsObject = Serializer.serializeSessions(sessions);
    this.sendJson(sessionsObject, response);
  }

  async _getSession({ response, token, detailsOnly = false } = {}) {
    const session = await this._sessionManager.getSession(token);
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

  async _getPublicSessions({ response }) {
    const publicSessions = await this._sessionManager.getPublicSessions();
    const publicSessionsJson = publicSessions.map(session =>
      session.getToken()
    );
    this.sendJson(publicSessionsJson, response);
  }
}

module.exports = SessionApiHandler;
