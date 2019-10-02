const Client = require("./client")

class HttpPollingClient extends Client {
  constructor(token, responseCallback) {
    super(token);
    this._responseCallback = responseCallback;
  }

  sendMessage(message) {
    this._responseCallback(message);
  }
}

module.exports = HttpPollingClient;