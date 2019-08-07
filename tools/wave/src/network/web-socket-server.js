const WebSocket = require("ws");

class WebSocketServer {
  constructor({ server, sessionManager }) {
    this._sessionManager = sessionManager;
    this._webSocketServer = new WebSocket.Server({ server });
    this._webSocketServer.on("connection", this._handleConnection.bind(this));
  }

  _handleConnection(client) {
    client.on("message", async data => {
      data = JSON.parse(data);
      if (!data) return;
      const { token } = data;
      this._sessionManager.addSessionClient({ socket: client, token });
      client.on("close", () => {
        this._sessionManager.removeSessionClient({ socket: client, token });
      });
    });
  }
}

module.exports = WebSocketServer;
