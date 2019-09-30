const STATUS_EVENT = "status";
const RESUME_EVENT = "resume";
const TEST_COMPLETED_EVENT = "test_completed";

class EventDispatcher {
  constructor() {
    this._clients = {};
  }

  addSessionClient(client) {
    const token = client.getSessionToken();
    if (!this._clients[token]) this._clients[token] = [];
    this._clients[token].push(client);
  }

  removeSessionClient(clientToDelete) {
    if (!clientToDelete) return;
    const token = clientToDelete.getSessionToken();
    if (!this._clients[token]) return;
    this._clients[token].splice(
      this._clients[token].findIndex(client => client === clientToDelete),
      1
    );
    if (this._clients[token].length === 0) delete this._clients[token];
  }

  dispatchEvent({ token, type, data }) {
    if (!this._clients[token]) return;
    const event = { type, data };
    this._clients[token].forEach(client =>
      client.sendMessage(JSON.stringify(event))
    );
  }
}

EventDispatcher.STATUS_EVENT = STATUS_EVENT;
EventDispatcher.TEST_COMPLETED_EVENT = TEST_COMPLETED_EVENT;
EventDispatcher.RESUME_EVENT = RESUME_EVENT;

module.exports = EventDispatcher;
