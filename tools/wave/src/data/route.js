const ALL = "all";
const GET = "get";
const POST = "post";
const PUT = "put";
const DELETE = "delete";
const STATIC = "static";
const OPTIONS = "options";

/**
 * @module Route
 */
class Route {
  constructor({method = ALL, uri = "/", handler = () => {}, directory = "/"} = {}) {
    this._method = method;
    this._uri = uri;
    this._handler = handler;
    this._directory = directory;
  }

  getMethod() {
    return this._method;
  }

  setMethod(method) {
    this._method = method;
    return this;
  }

  getUri() {
    return this._uri;
  }

  setUri(uri) {
    this._uri = uri;
    return this;
  }

  getHandler() {
    return this._handler;
  }

  setHandler(handler) {
    this._handler = handler;
    return this;
  }

  getDirectory() {
    return this._directory;
  }

  setDirectory(directory) {
    this._directory = directory
    return this;
  }
}

Route.GET = GET;
Route.POST = POST;
Route.PUT = PUT;
Route.DELETE = DELETE;
Route.STATIC = STATIC;
Route.ALL = ALL;

module.exports = Route;
