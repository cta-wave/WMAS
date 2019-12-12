class Client {
  constructor(sessionToken) {
    this._sessionToken = sessionToken;
  }

  sendMessage(message) {
    throw new Error("Client.sendMessage is not implemented!");
  }

  getSessionToken() {
    return this._sessionToken;
  }

  setSessionToken(sessionToken) {
    this._sessionToken = sessionToken;
    return this;
  }
}

module.exports = Client