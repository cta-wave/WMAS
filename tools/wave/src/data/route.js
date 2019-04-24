class Route {
  constructor(endPoint, handler) {
    this._endPoint = endPoint;
    this._handler = handler;
  }

  getEndPoint() {
    return this._endPoint;
  }

  setEndPoint(endPoint) {
    this._endPoint = endPoint;
    return this;
  }

  getHandler() {
    return this._handler;
  }

  setHandler(handler) {
    this._handler = handler;
    return this;
  }
}

module.exports = Route;
