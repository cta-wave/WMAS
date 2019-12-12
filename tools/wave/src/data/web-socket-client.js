const Client = require("./client");

class WebSocketClient extends Client {
  constructor(sessionToken, socket) {
    super(sessionToken);
    this._socket = socket;
  }

  sendMessage(message) {
    this._socket.send(message);
  }
}

module.exports = WebSocketClient;