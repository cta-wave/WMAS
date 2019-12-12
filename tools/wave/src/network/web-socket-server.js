const WebSocket = require("ws");
const WebSocketClient = require("../data/web-socket-client");

class WebSocketServer {
  constructor({ server, eventDispatcher }) {
    this._eventDispatcher = eventDispatcher;
    this._webSocketServer = new WebSocket.Server({ server });
    this._webSocketServer.on("connection", this._handleConnection.bind(this));
  }

  _handleConnection(socket) {
    socket.on("message", async data => {
      data = JSON.parse(data);
      if (!data) return;
      const { token } = data;
      const webSocketClient = new WebSocketClient(token, socket);
      this._eventDispatcher.addSessionClient(webSocketClient);
      socket.on("close", () => {
        try {
          this._eventDispatcher.removeSessionClient(webSocketClient);
        } catch (error) {
          console.error(
            `Failed to remove client from event dispatcher:\n${error.stack}`
          );
        }
      });
    });
  }
}

module.exports = WebSocketServer;
