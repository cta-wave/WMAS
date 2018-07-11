const Route = require('../../data/route')
const Serializer = require('../../utils/serializer')
const ApiHandler = require('./api-handler')
const Session = require('../../data/session')

class SessionApiHandler extends ApiHandler {
  constructor (sessionManager) {
    super()
    this._routes = this._createRoutes()
    this._sessionManager = sessionManager
  }

  _createRoutes () {
    return [
      new Route('/sessions/*', this._handleRequest.bind(this)),
      new Route('/sessions', this._handleRequest.bind(this))
    ]
  }

  getRoutes () {
    return this._routes
  }

  _handleRequest (request, response) {
    const url = this.parseUrl(request)
    switch (request.method) {
      case 'GET':
        switch (url.length) {
          case 1:
            return this._getSessions({ request, response })
          case 2:
            return this._getSession({ response, token: url[1] })
          case 3:
            switch (url[2].toLowerCase()) {
              case 'pause':
                response.send()
                return this._pauseSession(url[1])
              case 'resume':
                response.send()
                return this._resumeSession(url[1])
              case 'token':
                return this._findToken({ response, fragment: url[1] })
              case 'stop':
                response.send()
                return this._stopSession(url[1])
            }
        }
    }
    response.status(404).send()
  }

  async _stopSession (token) {
    const session = await this._sessionManager.getSession(token)
    session.setStatus(Session.ABORTED)
  }

  async _findToken ({ response, fragment }) {
    const token = await this._sessionManager.findToken(fragment)
    this.sendJson({ token }, response)
  }

  async _pauseSession (token) {
    const session = await this._sessionManager.getSession(token)
    if (session.getStatus() === Session.RUNNING) {
      session.setStatus(Session.PAUSED)
    }
  }

  async _resumeSession (token) {
    const session = await this._sessionManager.getSession(token)
    if (session.getStatus() === Session.PAUSED) {
      session.setStatus(Session.RUNNING)
    }
  }

  async _getSessions ({ request, response }) {
    const sessions = await this._sessionManager.getSessions()
    const sessionsObject = Serializer.serializeSessions(sessions)
    this.sendJson(sessionsObject, response)
  }

  async _getSession ({ response, token }) {
    const session = await this._sessionManager.getSession(token)
    if (!session) {
      response.status(404).send()
    } else {
      const sessionObject = Serializer.serializeSession(session)
      this.sendJson(sessionObject, response)
    }
  }
}

module.exports = SessionApiHandler
