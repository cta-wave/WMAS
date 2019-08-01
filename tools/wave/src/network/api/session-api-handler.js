const Route = require("../../data/route");
const Serializer = require("../../utils/serializer");
const ApiHandler = require("./api-handler");
const Session = require("../../data/session");
const SessionManager = require("../../testing/session-manager");
const ResultsManager = require("../../testing/results-manager");

const { GET, POST, DELETE, PUT } = Route;

const TOKEN_LENGTH = 36;

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
    try {
      const userAgent = request.get("User-Agent");
      const {
        tests: { include, exclude } = {},
        types,
        timeouts,
        reference_tokens,
        webhook_urls
      } = request.body;
      const session = await this._sessionManager.createSession({
        tests: { include, exclude },
        types,
        timeouts,
        referenceTokens: reference_tokens,
        webhookUrls: webhook_urls,
        userAgent
      });

      const token = session.getToken();
      const responsePayload = { token };
      response.send(JSON.stringify(responsePayload));
    } catch (error) {
      console.error(new Error(`Failed to create session:\n${error.stack}`));
      response.status(500).send();
    }
  }

  async _readSession({ request, response } = {}) {
    try {
      const url = this.parseUrl(request);
      const token = url[1];
      const session = await this._sessionManager.readSession(token);
      if (!session) {
        response.status(404).send();
        return;
      }
      const sessionObject = Serializer.serializeSession(session);
      delete sessionObject.pending_tests;
      delete sessionObject.running_tests;
      delete sessionObject.completed_tests;
      delete sessionObject.test_files_count;
      delete sessionObject.test_files_completed;
      delete sessionObject.status;
      this.sendJson(sessionObject, response);
    } catch (error) {
      console.error(new Error(`Failed to read session:\n${error.stack}`));
      response.status(500).send();
    }
  }

  async _readSessionStatus({ request, response } = {}) {
    try {
      const url = this.parseUrl(request);
      const token = url[1];
      const session = await this._sessionManager.readSession(token);
      if (!session) {
        response.status(404).send();
        return;
      }
      const sessionObject = Serializer.serializeSession(session);
      delete sessionObject.pending_tests;
      delete sessionObject.running_tests;
      delete sessionObject.completed_tests;
      delete sessionObject.tests;
      delete sessionObject.types;
      delete sessionObject.user_agent;
      delete sessionObject.timeouts;
      delete sessionObject.browser;
      delete sessionObject.date_started;
      delete sessionObject.date_finished;
      delete sessionObject.is_public;
      delete sessionObject.reference_tokens;
      delete sessionObject.webhook_urls;
      this.sendJson(sessionObject, response);
    } catch (error) {
      console.error(new Error(`Failed to read session:\n${error.stack}`));
      response.status(500).send();
    }
  }

  async _readPublicSessions({ response }) {
    try {
      const publicSessions = await this._sessionManager.readPublicSessions();
      const publicSessionsJson = publicSessions.map(session =>
        session.getToken()
      );
      this.sendJson(publicSessionsJson, response);
    } catch (error) {
      console.error(
        new Error(`Failed to read public sessions:\n${error.stack}`)
      );
      response.status(500).send();
    }
  }

  async _updateSession({ request, response } = {}) {
    try {
      const url = this.parseUrl(request);
      const token = url[1];
      const {
        tests: { include, exclude } = {},
        types,
        timeouts,
        reference_tokens,
        webhook_urls
      } = request.body;
      await this._sessionManager.updateSession(token, {
        tests: { include, exclude },
        types,
        timeouts,
        referenceTokens: reference_tokens,
        webhookUrls: webhook_urls
      });
      response.send();
    } catch (error) {
      console.error(new Error(`Failed to update session:\n${error.stack}`));
      response.status(500).send();
    }
  }

  async _deleteSession({ request, response }) {
    try {
      const url = this.parseUrl(request);
      const token = url[1];
      await this._sessionManager.deleteSession(token);
      await this._resultsManager.deleteResults(token);
      response.send();
    } catch (error) {
      console.error(new Error(`Failed to delete session:\n${error.stack}`));
      response.status(500).send();
    }
  }

  async _startSession({ request, response }) {
    try {
      const url = this.parseUrl(request);
      const token = url[1];
      await this._sessionManager.startSession(token);
      response.send();
    } catch (error) {
      console.error(new Error(`Failed to start session:\n${error.stack}`));
      response.status(500).send();
    }
  }

  async _pauseSession({ request, response }) {
    try {
      const url = this.parseUrl(request);
      const token = url[1];
      await this._sessionManager.pauseSession(token);
      response.send();
    } catch (error) {
      console.error(new Error(`Failed to pause session:\n${error.stack}`));
      response.status(500).send();
    }
  }

  async _resumeSession({ request, response }) {
    try {
      const url = this.parseUrl(request);
      const token = url[1];
      await this._sessionManager.resumeSession(token);
      response.send();
    } catch (error) {
      console.error(new Error(`Failed to resume session:\n${error.stack}`));
      response.status(500).send();
    }
  }

  async _stopSession({ request, response }) {
    try {
      const url = this.parseUrl(request);
      const token = url[1];
      await this._sessionManager.stopSession(token);
      response.send();
    } catch (error) {
      console.error(new Error(`Failed to stop session:\n${error.stack}`));
      response.status(500).send();
    }
  }

  async _findToken({ response, request }) {
    try {
      const url = this.parseUrl(request);
      const fragment = url[1];
      const token = await this._sessionManager.findToken(fragment);
      if (!token) {
        response.status(404).send();
        return;
      }
      this.sendJson({ token }, response);
    } catch (error) {
      console.error(new Error(`Failed to find session:\n${error.stack}`));
      response.status(500).send();
    }
  }

  getRoutes() {
    const uri = "/api/sessions*";
    return [
      new Route({ method: POST, uri, handler: this._handlePost.bind(this) }),
      new Route({ method: GET, uri, handler: this._handleGet.bind(this) }),
      new Route({
        method: DELETE,
        uri,
        handler: this._handleDelete.bind(this)
      }),
      new Route({ method: PUT, uri, handler: this._handlePut.bind(this) })
    ];
  }

  _handlePost(request, response) {
    console.log(`POST   ${request.url}`)
    const url = this.parseUrl(request);
    switch (url.length) {
      case 1:
        return this._createSession({ request, response });
    }
    response.status(404).send();
  }

  _handlePut(request, response) {
    console.log(`PUT    ${request.url}`)
    const url = this.parseUrl(request);
    switch (url.length) {
      case 2:
        return this._updateSession({ request, response });
    }
    response.status(404).send();
  }

  _handleGet(request, response) {
    console.log(`GET    ${request.url}`)
    const url = this.parseUrl(request);
    switch (url.length) {
      case 2:
        if (url[1] === "public") {
          return this._readPublicSessions({ response });
        }
        if (url[1].length !== TOKEN_LENGTH) {
          return this._findToken({ request, response });
        }
        return this._readSession({ request, response });
      case 3:
        switch (url[2].toLowerCase()) {
          case "start":
            return this._startSession({ request, response });
          case "pause":
            return this._pauseSession({ request, response });
          case "resume":
            return this._resumeSession({ request, response });
          case "stop":
            return this._stopSession({ request, response });
          case "status":
            return this._readSessionStatus({ request, response });
        }
    }
    response.status(404).send();
  }

  _handleDelete(request, response) {
    console.log(`DELETE ${request.url}`)
    const url = this.parseUrl(request);
    switch (url.length) {
      case 2:
        return this._deleteSession({ request, response });
    }
    response.status(404).send();
  }
}

module.exports = SessionApiHandler;
