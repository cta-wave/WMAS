const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");
const Route = require("../data/route");

const DEFAULT_PORT = 8080;

const { ALL, GET, POST, PUT, DELETE, OPTIONS, STATIC } = Route;

/**
 * @module HttpServer
 */
class HttpServer {
  constructor() {
    this._app = express();
    this._app.use(cookieParser());
    // this._app.use(compression());
    this._app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: "50mb"
      })
    );
    this._app.use(bodyParser.json({ limit: "50mb" }));
    this._app.use(bodyParser.raw({ limit: "50mb" }));
    this._server = http.createServer(this._app);
  }

  initialize() {
    this._app.use((request, response, next) => {
      response.set("Access-Control-Allow-Credentials", "true");
      response.set("Access-Control-Allow-Origin", request.get("Origin"));
      response.set("Access-Control-Allow-Headers", "Content-Type");
      response.set("Cache-Control", "no-cache");
      return next();
    });
  }

  registerRoutes(routes) {
    routes.forEach(route => this.registerRoute(route));
  }

  /**
   * @param {Route} route
   */
  registerRoute(route) {
    const uri = route.getUri();
    const handler = route.getHandler();
    const directory = route.getDirectory();
    switch (route.getMethod()) {
      case GET:
        this._app.get(uri, handler);
        return;
      case PUT:
        this._app.put(uri, handler);
        return;
      case POST:
        this._app.post(uri, handler);
        return;
      case DELETE:
        this._app.delete(uri, handler);
        return;
      case OPTIONS:
        this._app.options(uri, handler);
        return;
      case ALL:
        this._app.all(uri, handler);
        return;
      case STATIC:
        this._app.use(uri, express.static(directory));
        return;
    }
  }

  async start(port = DEFAULT_PORT) {
    this._port = port;
    return new Promise(resolve => this._server.listen(this._port, resolve));
  }

  getPort() {
    return this._port;
  }

  getServer() {
    return this._server;
  }
}

module.exports = HttpServer;
