const path = require("path");

const TestLoader = require("../testing/test-loader");
const Database = require("../database");
const HttpServer = require("../network/http-server");
const SessionManager = require("../network/session-manager");
const SessionApiHandler = require("../network/api/session-api-handler");
const ResultsApiHandler = require("../network/api/results-api-handler");
const TestApiHandler = require("../network/api/test-api-handler");
const ResultsManager = require("../testing/results-manager");
const ConfigurationLoader = require("../core/configuration-loader");
const WebSocketServer = require("../network/web-socket-server");
const Route = require("../data/route");

const print = text => process.stdout.write(text);
const println = text => console.log(text);

class WaveServer {
  async initialize({ applicationDirectoryPath, configurationFilePath }) {
    print("Loading configuration ...");
    const config = await ConfigurationLoader.load({
      applicationDirectoryPath,
      configurationFilePath
    });
    const {
      databaseDirectoryPath,
      resultsDirectoryPath,
      manifestFilePath,
      port,
      dbCompactionInterval,
      testTimeout,
      wptPort,
      wptSslPort
    } = config;
    println(" done.");
    const includeListFilePath = path.join(
      applicationDirectoryPath,
      "include-tests"
    );
    const excludeListFilePath = path.join(
      applicationDirectoryPath,
      "exclude-tests"
    );

    print("Initializing database ...");
    const database = new Database({
      dbCompactionInterval
    });
    await database.initialize(databaseDirectoryPath);
    println(" done.");

    const testLoader = new TestLoader({
      resultsDirectoryPath,
      includeListFilePath,
      excludeListFilePath
    });
    const sessionManager = new SessionManager({
      database,
      testTimeout,
      testLoader
    });

    const resultsManager = new ResultsManager({
      resultsDirectoryPath,
      database,
      sessionManager,
      exportTemplateDirectoryPath: path.join(
        applicationDirectoryPath,
        "./export"
      )
    });
    await resultsManager.loadResults();

    print("Loading tests ...");
    await testLoader.loadTests(manifestFilePath);
    println(" done.");

    const httpServer = new HttpServer();
    httpServer.initialize();

    const testApiHandler = new TestApiHandler({
      wptPort,
      wptSslPort,
      wavePort: port,
      resultsManager,
      sessionManager
    });
    httpServer.registerRoutes(testApiHandler.getRoutes());

    const sessionApiHandler = new SessionApiHandler(
      sessionManager,
      resultsManager
    );
    httpServer.registerRoutes(sessionApiHandler.getRoutes());

    const resultsApiHandler = new ResultsApiHandler(resultsManager);
    httpServer.registerRoutes(resultsApiHandler.getRoutes());
    
    httpServer.registerStatic(path.join(applicationDirectoryPath, "./www"));
    httpServer.registerRoute(
      new Route("/", (request, response) => {
        response.sendFile(path.join(applicationDirectoryPath, "index.html"));
      })
    );
    httpServer.registerStatic(resultsDirectoryPath, "/results");

    httpServer.registerRoute(
      new Route({
        method: Route.OPTIONS,
        uri: "/",
        handler: (request, response) => response.send()
      })
    );

    const webSocketServer = new WebSocketServer({
      sessionManager,
      server: httpServer.getServer()
    });

    this._httpServer = httpServer;
    this._port = port;
  }

  async start(port = this._port) {
    print("Starting http server ...");
    await this._httpServer.start(port);
    println(" done.");
  }

  getPort() {
    return this._httpServer.getPort();
  }
}

module.exports = WaveServer;
