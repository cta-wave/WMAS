const EventDispatcher = require("../../src/testing/event-dispatcher");
const WebSocketClient = require("../../src/data/web-socket-client");
const HttpPollingClient = require("../../src/data/http-polling-client");

test("addSessionClient() adds a web socket client", () => {
  const eventDispatcher = new EventDispatcher();
  const webSocketClient = new WebSocketClient("token101", { send: () => {} });
  eventDispatcher.addSessionClient(webSocketClient);

  const clients = eventDispatcher._clients;
  expect(clients).toHaveProperty("token101");
  expect(clients["token101"]).toBeInstanceOf(Array);
  expect(clients["token101"]).toContain(webSocketClient);
});

test("addSessionClient() adds a http polling client", () => {
  const eventDispatcher = new EventDispatcher();
  const httpPollingClient = new HttpPollingClient("token101", () => {});
  eventDispatcher.addSessionClient(httpPollingClient);

  const clients = eventDispatcher._clients;
  expect(clients).toHaveProperty("token101");
  expect(clients["token101"]).toBeInstanceOf(Array);
  expect(clients["token101"]).toContain(httpPollingClient);
});

test("removeSessionClient() removes a web socket client from a session", () => {
  const eventDispatcher = new EventDispatcher();
  const webSocketClient = new WebSocketClient("token101", { send: () => {} });
  eventDispatcher.addSessionClient(webSocketClient);

  eventDispatcher.removeSessionClient(webSocketClient);
  const clients = eventDispatcher._clients;
  expect(clients).not.toHaveProperty("token101");
});

test("removeSessionClient() removes a http polling client client from a session", () => {
  const eventDispatcher = new EventDispatcher();
  const httpPollingClient = new HttpPollingClient("token101", () => {});
  eventDispatcher.addSessionClient(httpPollingClient);

  eventDispatcher.removeSessionClient(httpPollingClient);
  const clients = eventDispatcher._clients;
  expect(clients).not.toHaveProperty("token101");
});

test("dispatchEvent() sends an event to session specific web socket clients", () => {
  let isMessageSent = false;
  const eventDispatcher = new EventDispatcher();
  const webSocketClient = new WebSocketClient("token101", {
    send: message => {
      isMessageSent = true;
      message = JSON.parse(message);
      expect(message.type).toBe(EventDispatcher.STATUS_EVENT);
      expect(message.data).toBe("running");
    }
  });
  eventDispatcher.addSessionClient(webSocketClient);

  eventDispatcher.dispatchEvent({
    token: "token101",
    type: EventDispatcher.STATUS_EVENT,
    data: "running"
  });
  expect(isMessageSent).toBe(true);
});

test("dispatchEvent() sends an event to session specific http polling clients", () => {
  let isMessageSent = false;
  const eventDispatcher = new EventDispatcher();
  const httpPollingClient = new HttpPollingClient("token101", message => {
    isMessageSent = true;
    message = JSON.parse(message);
    expect(message.type).toBe(EventDispatcher.STATUS_EVENT);
    expect(message.data).toBe("running");
  });
  eventDispatcher.addSessionClient(httpPollingClient);

  eventDispatcher.dispatchEvent({
    token: "token101",
    type: EventDispatcher.STATUS_EVENT,
    data: "running"
  });
  expect(isMessageSent).toBe(true);
});

test("dispatchEvent() sends an event to all session specific clients", () => {
  let isHttpPollingMessageSent = false;
  let isWebSocketMessageSent = false;
  const eventDispatcher = new EventDispatcher();
  const webSocketClient = new WebSocketClient("token101", {
    send: message => {
      isWebSocketMessageSent = true;
      message = JSON.parse(message);
      expect(message.type).toBe(EventDispatcher.STATUS_EVENT);
      expect(message.data).toBe("running");
    }
  });
  eventDispatcher.addSessionClient(webSocketClient);
  const httpPollingClient = new HttpPollingClient("token101", message => {
    isHttpPollingMessageSent = true;
    message = JSON.parse(message);
    expect(message.type).toBe(EventDispatcher.STATUS_EVENT);
    expect(message.data).toBe("running");
  });
  eventDispatcher.addSessionClient(httpPollingClient);

  eventDispatcher.dispatchEvent({
    token: "token101",
    type: EventDispatcher.STATUS_EVENT,
    data: "running"
  });
  expect(isWebSocketMessageSent).toBe(true);
  expect(isHttpPollingMessageSent).toBe(true);
});
