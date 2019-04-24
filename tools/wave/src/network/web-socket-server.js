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
      const session = await this._sessionManager.getSession(token);
      session.addClient(client);
      client.on("close", () => {
        session.removeClient(client);
      });
    });
  }
}

module.exports = WebSocketServer;
