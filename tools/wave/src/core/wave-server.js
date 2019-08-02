const path = require("path");

const TestLoader = require("../testing/test-loader");
const Database = require("../database");
const HttpServer = require("../network/http-server");
const SessionManager = require("../testing/session-manager");
const SessionApiHandler = require("../network/api/session-api-handler");
const ResultsApiHandler = require("../network/api/results-api-handler");
const TestApiHandler = require("../network/api/test-api-handler");
const ResultsManager = require("../testing/results-manager");
const TestManager = require("../testing/test-manager");
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

    const testLoader = new TestLoader();
    const testManager = new TestManager();
    const sessionManager = new SessionManager();
    const resultsManager = new ResultsManager();

    testManager.initialize({ testLoader, resultsManager, sessionManager });

    sessionManager.initialize({
      database,
      testTimeout,
      testLoader
    });

    resultsManager.initialize({
      resultsDirectoryPath,
      database,
      sessionManager,
      testManager,
      exportTemplateDirectoryPath: path.join(
        applicationDirectoryPath,
        "./export"
      )
    });
    await resultsManager.loadResults();

    testLoader.initialize({
      resultsManager,
      includeListFilePath,
      excludeListFilePath
    });

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
      sessionManager,
      testManager
    });
    httpServer.registerRoutes(testApiHandler.getRoutes());

    const sessionApiHandler = new SessionApiHandler(
      sessionManager,
      resultsManager
    );
    httpServer.registerRoutes(sessionApiHandler.getRoutes());

    const resultsApiHandler = new ResultsApiHandler(resultsManager);
    httpServer.registerRoutes(resultsApiHandler.getRoutes());

    const staticRoutes = [
      new Route({
        method: Route.STATIC,
        directory: path.join(applicationDirectoryPath, "./www")
      }),
      new Route({
        method: Route.GET,
        uri: "/",
        handler: (request, response) => {
          response.sendFile(path.join(applicationDirectoryPath, "index.html"));
        }
      }),
      new Route({
        method: Route.STATIC,
        uri: "/results",
        directory: resultsDirectoryPath
      }),
      new Route({
        method: Route.OPTIONS,
        uri: "/",
        handler: (request, response) => response.send()
      })
    ];

    httpServer.registerRoutes(staticRoutes);

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
