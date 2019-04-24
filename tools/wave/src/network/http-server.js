const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

const DEFAULT_PORT = 8080;

class HttpServer {
  constructor() {
    this._app = express();
    this._app.use(cookieParser());
    this._app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: "50mb"
      })
    );
    this._app.use(bodyParser.json({ limit: "50mb" }));
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

  registerStatic(path, root = "/") {
    this._app.use(root, express.static(path));
  }

  registerRoutes(routes) {
    routes.forEach(route => this.registerRoute(route));
  }

  registerRoute(route) {
    const endPoint = route.getEndPoint();
    const handler = route.getHandler();
    this._app.all(endPoint, handler);
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
