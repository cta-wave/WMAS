const path = require('path')

const TestLoader = require('../testing/test-loader')
const Database = require('../database/database')
const HttpServer = require('../network/http-server')
const SessionManager = require('../network/session-manager')
const SessionApiHandler = require('../network/api/session-api-handler')
const ResultsApiHandler = require('../network/api/results-api-handler')
const TestApiHandler = require('../network/api/test-api-handler')
const ResultsManager = require('../testing/results-manager')
const ConfigurationLoader = require('../core/configuration-loader')
const WebSocketServer = require('../network/web-socket-server')
const Route = require('../data/route')

class WaveServer {
  async initialize ({ applicationDirectoryPath, configurationFilePath }) {
    const config = await ConfigurationLoader.load({
      applicationDirectoryPath,
      configurationFilePath
    })
    const {
      databaseDirectoryPath,
      resultsDirectoryPath,
      manifestFilePath,
      port,
      dbCompactionInterval,
      testTimeout,
      wptPort,
      wptSslPort
    } = config

    this._port = port

    const httpServer = new HttpServer()
    const database = new Database({
      dbCompactionInterval
    })
    await database.load(databaseDirectoryPath)
    const testLoader = new TestLoader({
      resultsDirectoryPath
    })
    const sessionManager = new SessionManager({
      database,
      testTimeout,
      testLoader
    })
    const webSocketServer = new WebSocketServer({
      sessionManager,
      server: httpServer.getServer()
    })
    await sessionManager.initialize()
    const resultsManager = new ResultsManager({
      resultsDirectoryPath,
      database,
      sessionManager
    })
    await resultsManager.loadResults()

    await testLoader.loadTests(manifestFilePath)
    await httpServer.initialize()
    httpServer.registerStatic(path.join(applicationDirectoryPath, './html'))
    httpServer.registerRoute(
      new Route('/', (request, response) => {
        response.sendFile(path.join(applicationDirectoryPath, 'index.html'))
      })
    )
    httpServer.registerStatic(resultsDirectoryPath, '/results')

    const testApiHandler = new TestApiHandler({
      wptPort,
      wptSslPort,
      wavePort: port,
      resultsManager,
      sessionManager
    })
    httpServer.registerRoutes(testApiHandler.getRoutes())

    const sessionApiHandler = new SessionApiHandler(sessionManager)
    httpServer.registerRoutes(sessionApiHandler.getRoutes())

    const resultsApiHandler = new ResultsApiHandler(resultsManager)
    httpServer.registerRoutes(resultsApiHandler.getRoutes())

    this._httpServer = httpServer
  }

  async start (port = this._port) {
    await this._httpServer.start(port)
  }

  getPort () {
    return this._httpServer.getPort()
  }
}

module.exports = WaveServer
