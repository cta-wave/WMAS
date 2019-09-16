const SessionManager = require("../../src/testing/session-manager");
const Session = require("../../src/data/session");
const TestLoader = require("../../src/testing/test-loader");
const EventDispatcher = require("../../src/testing/event-dispatcher");
const HttpPollingClient = require("../../src/data/http-polling-client");

test("findToken() only accepts fragments with 8 characters or more", async () => {
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: { findTokens: () => [true], readExpiringSessions: () => [] }
  });

  let found;

  found = await sessionManager.findToken("12345678");
  expect(found).toBe(true);

  found = await sessionManager.findToken("1234567");
  expect(found).toBeFalsy();
});

test("findToken() calls database.findTokens() and returns nothing if there are more than one matching", async () => {
  let isFindTokensCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      findTokens: fragment => {
        isFindTokensCalled = true;
        if (fragment.length === 8) {
          return [true];
        } else {
          return [true, true];
        }
      },
      readExpiringSessions: () => []
    }
  });

  let found;

  found = await sessionManager.findToken("12345678");
  expect(found).toBe(true);

  found = await sessionManager.findToken("123456789");
  expect(found).toBeFalsy();

  expect(isFindTokensCalled).toBe(true);
});

test("createSession() creates session with defaults if no config provided", async () => {
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    testLoader: {
      getTests: async () => ({ apiOne: ["/apiOne/test/one.html"] })
    },
    database: { createSession: async () => {}, readExpiringSessions: () => [] }
  });

  const session = await sessionManager.createSession();
  expect(session.getUserAgent()).toBeFalsy();
  const tests = session.getTests();
  expect(tests).toHaveProperty("include");
  expect(tests.include).toHaveLength(1);
  expect(tests.include).toContain("/");
  expect(tests).toHaveProperty("exclude");
  expect(tests.exclude).toHaveLength(0);
  const types = session.getTypes();
  expect(types).toBeInstanceOf(Array);
  expect(types).toHaveLength(2);
  expect(types).toContain(TestLoader.AUTOMATIC_TESTS);
  expect(types).toContain(TestLoader.MANUAL_TESTS);
  const timeouts = session.getTimeouts();
  expect(timeouts).toBeInstanceOf(Object);
  expect(timeouts).toHaveProperty("automatic");
  expect(timeouts.automatic).toBe(60000);
  expect(timeouts).toHaveProperty("manual");
  expect(timeouts.manual).toBe(300000);
  const token = session.getToken();
  const tokenRegex = new RegExp(
    "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$"
  );
  expect(token).toMatch(tokenRegex);
  const pendingTests = session.getPendingTests();
  expect(pendingTests).toBeInstanceOf(Object);
  expect(Object.keys(pendingTests)).toHaveLength(1);
  expect(pendingTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["/apiOne/test/one.html"])
  );
  const runningTests = session.getRunningTests();
  expect(runningTests).toBeInstanceOf(Object);
  expect(Object.keys(runningTests)).toHaveLength(0);
  const completedTests = session.getCompletedTests();
  expect(completedTests).toBeInstanceOf(Object);
  expect(Object.keys(completedTests)).toHaveLength(0);
  const testFilesCount = session.getTestFilesCount();
  expect(testFilesCount).toBeInstanceOf(Object);
  expect(Object.keys(testFilesCount)).toHaveLength(1);
  expect(testFilesCount).toHaveProperty("apiOne");
  expect(testFilesCount.apiOne).toBe(1);
  const testFilesCompleted = session.getTestFilesCompleted();
  expect(testFilesCompleted).toBeInstanceOf(Object);
  expect(Object.keys(testFilesCompleted)).toHaveLength(0);
  const status = session.getStatus();
  expect(status).toBe(Session.PENDING);
  const referenceTokens = session.getReferenceTokens();
  expect(referenceTokens).toBeInstanceOf(Array);
  expect(referenceTokens).toHaveLength(0);
  const webhookUrls = session.getWebhookUrls();
  expect(webhookUrls).toBeInstanceOf(Array);
  expect(webhookUrls).toHaveLength(0);
});

test("createSession() creates session with provided config", async () => {
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    testLoader: {
      getTests: async () => ({
        apiOne: ["/apiOne/test/one.html"],
        apiTwo: ["/apiTwo/test/one.html"]
      })
    },
    database: { createSession: async () => {}, readExpiringSessions: () => [] }
  });

  const session = await sessionManager.createSession({
    tests: { include: ["/apiOne", "/apiTwo"], exclude: ["/apiThree"] },
    types: [TestLoader.AUTOMATIC_TESTS],
    timeouts: { automatic: 500, "/apiTwo": 600 },
    referenceTokens: ["ref_token_1", "ref_token_2"],
    webhookUrls: ["http://webhook.url/endpoint"],
    userAgent: "some user agent"
  });
  expect(session.getUserAgent()).toBe("some user agent");
  const tests = session.getTests();
  expect(tests).toHaveProperty("include");
  expect(tests.include).toHaveLength(2);
  expect(tests.include).toContain("/apiOne");
  expect(tests.include).toContain("/apiTwo");
  expect(tests).toHaveProperty("exclude");
  expect(tests.exclude).toHaveLength(1);
  expect(tests.exclude).toContain("/apiThree");
  const types = session.getTypes();
  expect(types).toBeInstanceOf(Array);
  expect(types).toHaveLength(1);
  expect(types).toContain(TestLoader.AUTOMATIC_TESTS);
  const timeouts = session.getTimeouts();
  expect(timeouts).toBeInstanceOf(Object);
  expect(timeouts).toHaveProperty("automatic");
  expect(timeouts.automatic).toBe(500);
  expect(timeouts).toHaveProperty("/apiTwo");
  expect(timeouts["/apiTwo"]).toBe(600);
  const token = session.getToken();
  const tokenRegex = new RegExp(
    "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$"
  );
  expect(token).toMatch(tokenRegex);
  const pendingTests = session.getPendingTests();
  expect(pendingTests).toBeInstanceOf(Object);
  expect(Object.keys(pendingTests)).toHaveLength(2);
  expect(pendingTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["/apiOne/test/one.html"])
  );
  expect(pendingTests).toHaveProperty(
    "apiTwo",
    expect.arrayContaining(["/apiTwo/test/one.html"])
  );
  const runningTests = session.getRunningTests();
  expect(runningTests).toBeInstanceOf(Object);
  expect(Object.keys(runningTests)).toHaveLength(0);
  const completedTests = session.getCompletedTests();
  expect(completedTests).toBeInstanceOf(Object);
  expect(Object.keys(completedTests)).toHaveLength(0);
  const testFilesCount = session.getTestFilesCount();
  expect(testFilesCount).toBeInstanceOf(Object);
  expect(Object.keys(testFilesCount)).toHaveLength(2);
  expect(testFilesCount).toHaveProperty("apiOne");
  expect(testFilesCount.apiOne).toBe(1);
  expect(testFilesCount).toHaveProperty("apiTwo");
  expect(testFilesCount.apiOne).toBe(1);
  const testFilesCompleted = session.getTestFilesCompleted();
  expect(testFilesCompleted).toBeInstanceOf(Object);
  expect(Object.keys(testFilesCompleted)).toHaveLength(0);
  const status = session.getStatus();
  expect(status).toBe(Session.PENDING);
  const referenceTokens = session.getReferenceTokens();
  expect(referenceTokens).toBeInstanceOf(Array);
  expect(referenceTokens).toHaveLength(2);
  expect(referenceTokens).toContain("ref_token_1");
  expect(referenceTokens).toContain("ref_token_2");
  const webhookUrls = session.getWebhookUrls();
  expect(webhookUrls).toBeInstanceOf(Array);
  expect(webhookUrls).toHaveLength(1);
  expect(webhookUrls).toContain("http://webhook.url/endpoint");
});

test("createSession() calls testLoader.getTests() with parameters from config", async () => {
  let isGetTestsCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    testLoader: {
      getTests: async ({
        includeList,
        excludeList,
        referenceTokens,
        types
      }) => {
        expect(includeList).toBeInstanceOf(Array);
        expect(includeList).toHaveLength(2);
        expect(includeList).toContain("/apiOne");
        expect(includeList).toContain("/apiTwo");
        expect(excludeList).toBeInstanceOf(Array);
        expect(excludeList).toHaveLength(1);
        expect(excludeList).toContain("/apiThree");
        expect(referenceTokens).toBeInstanceOf(Array);
        expect(referenceTokens).toHaveLength(2);
        expect(referenceTokens).toContain("ref_token_1");
        expect(referenceTokens).toContain("ref_token_2");
        expect(types).toBeInstanceOf(Array);
        expect(types).toHaveLength(1);
        expect(types).toContain(TestLoader.AUTOMATIC_TESTS);
        isGetTestsCalled = true;
        return {};
      }
    },
    database: { createSession: async () => {}, readExpiringSessions: () => [] }
  });

  const session = await sessionManager.createSession({
    tests: { include: ["/apiOne", "/apiTwo"], exclude: ["/apiThree"] },
    types: [TestLoader.AUTOMATIC_TESTS],
    referenceTokens: ["ref_token_1", "ref_token_2"]
  });

  expect(isGetTestsCalled).toBe(true);
});

test("createSession() calls database.createSession()", async () => {
  let isCreateSessionCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    testLoader: { getTests: async () => ({}) },
    database: {
      createSession: async () => {
        isCreateSessionCalled = true;
      },
      readExpiringSessions: () => []
    }
  });
  const session = await sessionManager.createSession();
  expect(isCreateSessionCalled).toBe(true);
});

test("createSession() adds created session to cache", async () => {
  let isReadSessionCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    testLoader: { getTests: async () => ({}) },
    database: {
      createSession: async () => {},
      readSession: () => {
        isReadSessionCalled = true;
      },
      readExpiringSessions: () => []
    }
  });
  const session = await sessionManager.createSession();
  const readSession = await sessionManager.readSession(session.getToken());

  expect(isReadSessionCalled).toBe(false);
  expect(readSession).toEqual(session);
});

test("addSession() calls database.createSesson()", async () => {
  let isCreateSessionCalled = false;
  const session = createMockingSession();
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async addedSession => {
        isCreateSessionCalled = true;
        expect(addedSession).toEqual(session);
      },
      readExpiringSessions: () => []
    }
  });
  await sessionManager.addSession(session);
  expect(isCreateSessionCalled).toBe(true);
});

test("addSession() adds the provided session to the cache", async () => {
  let isReadSessionCalled = false;
  const session = createMockingSession();
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      readSession: () => {
        isReadSessionCalled = true;
      },
      readExpiringSessions: () => []
    }
  });
  await sessionManager.addSession(session);
  const readSession = await sessionManager.readSession(session.getToken());
  expect(isReadSessionCalled).toBe(false);
  expect(readSession).toEqual(session);
});

test("readSession() calls database.readSession() and adds it to the cache, if not in cache", async () => {
  let isReadSessionCalled = false;
  const session = createMockingSession();
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    testLoader: { getTests: async () => ({}) },
    database: {
      readSession: () => {
        isReadSessionCalled = true;
        return session;
      },
      readExpiringSessions: () => []
    }
  });
  let readSession = await sessionManager.readSession(session.getToken());

  expect(isReadSessionCalled).toBe(true);
  expect(readSession).toEqual(session);

  isReadSessionCalled = false;
  readSession = await sessionManager.readSession(session.getToken());

  expect(isReadSessionCalled).toBe(false);
  expect(readSession).toEqual(session);
});

test("readSessions() calls database.readSessions()", async () => {
  let isReadSessionsCalled = false;
  const session = createMockingSession();
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      readSessions: () => {
        isReadSessionsCalled = true;
        return [session];
      },
      readExpiringSessions: () => []
    }
  });
  const readSessions = await sessionManager.readSessions();

  expect(isReadSessionsCalled).toBe(true);
  expect(readSessions).toBeInstanceOf(Array);
  expect(readSessions).toContain(session);
});

test("readPublicSessions() calls database.readPublicSessions()", async () => {
  let isReadPublicSessionsCalled = false;
  const session = createMockingSession();
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      readPublicSessions: () => {
        isReadPublicSessionsCalled = true;
        return [session];
      },
      readExpiringSessions: () => []
    }
  });
  const readPublicSessions = await sessionManager.readPublicSessions();

  expect(isReadPublicSessionsCalled).toBe(true);
  expect(readPublicSessions).toBeInstanceOf(Array);
  expect(readPublicSessions).toContain(session);
});

test("updateSession() calls database.updateSession()", async () => {
  let isUpdateSessionCalled = false;
  const session = createMockingSession();
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      updateSession: updatedSession => {
        isUpdateSessionCalled = true;
        expect(updatedSession).toEqual(session);
      },
      readExpiringSessions: () => []
    }
  });
  await sessionManager.updateSession(session);

  expect(isUpdateSessionCalled).toBe(true);
});

test("updateSessionConfiguration() updates the config of a session if its status is pending", async () => {
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    testLoader: {
      getTests: async ({ includeList }) =>
        includeList.indexOf("/apiTwo") === -1
          ? {
              apiOne: ["/apiOne/test/one.html"]
            }
          : {
              apiOne: ["/apiOne/test/one.html"],
              apiTwo: ["/apiTwo/test/one.html"]
            }
    },
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    }
  });

  let session = await sessionManager.createSession();
  session.setStatus(Session.RUNNING);

  const updateConfig = {
    tests: { include: ["/apiOne", "/apiTwo"], exclude: ["/apiThree"] },
    types: [TestLoader.AUTOMATIC_TESTS],
    timeouts: { automatic: 500, "/apiTwo": 600 },
    referenceTokens: ["ref_token_1", "ref_token_2"],
    webhookUrls: ["http://webhook.url/endpoint"]
  };

  await sessionManager.updateSessionConfiguration(
    session.getToken(),
    updateConfig
  );

  session = await sessionManager.readSession(session.getToken());

  expect(session.getUserAgent()).toBeFalsy();
  let tests = session.getTests();
  expect(tests).toHaveProperty("include");
  expect(tests.include).toHaveLength(1);
  expect(tests.include).toContain("/");
  expect(tests).toHaveProperty("exclude");
  expect(tests.exclude).toHaveLength(0);
  let types = session.getTypes();
  expect(types).toBeInstanceOf(Array);
  expect(types).toHaveLength(2);
  expect(types).toContain(TestLoader.AUTOMATIC_TESTS);
  expect(types).toContain(TestLoader.MANUAL_TESTS);
  let timeouts = session.getTimeouts();
  expect(timeouts).toBeInstanceOf(Object);
  expect(timeouts).toHaveProperty("automatic");
  expect(timeouts.automatic).toBe(60000);
  expect(timeouts).toHaveProperty("manual");
  expect(timeouts.manual).toBe(300000);
  let token = session.getToken();
  const tokenRegex = new RegExp(
    "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$"
  );
  expect(token).toMatch(tokenRegex);
  let pendingTests = session.getPendingTests();
  expect(pendingTests).toBeInstanceOf(Object);
  expect(Object.keys(pendingTests)).toHaveLength(1);
  expect(pendingTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["/apiOne/test/one.html"])
  );
  let runningTests = session.getRunningTests();
  expect(runningTests).toBeInstanceOf(Object);
  expect(Object.keys(runningTests)).toHaveLength(0);
  let completedTests = session.getCompletedTests();
  expect(completedTests).toBeInstanceOf(Object);
  expect(Object.keys(completedTests)).toHaveLength(0);
  let testFilesCount = session.getTestFilesCount();
  expect(testFilesCount).toBeInstanceOf(Object);
  expect(Object.keys(testFilesCount)).toHaveLength(1);
  expect(testFilesCount).toHaveProperty("apiOne");
  expect(testFilesCount.apiOne).toBe(1);
  let testFilesCompleted = session.getTestFilesCompleted();
  expect(testFilesCompleted).toBeInstanceOf(Object);
  expect(Object.keys(testFilesCompleted)).toHaveLength(0);
  let status = session.getStatus();
  expect(status).toBe(Session.RUNNING);
  let referenceTokens = session.getReferenceTokens();
  expect(referenceTokens).toBeInstanceOf(Array);
  expect(referenceTokens).toHaveLength(0);
  let webhookUrls = session.getWebhookUrls();
  expect(webhookUrls).toBeInstanceOf(Array);
  expect(webhookUrls).toHaveLength(0);

  session.setStatus(Session.PENDING);

  await sessionManager.updateSessionConfiguration(
    session.getToken(),
    updateConfig
  );

  expect(session.getUserAgent()).toBeFalsy();
  tests = session.getTests();
  expect(tests).toHaveProperty("include");
  expect(tests.include).toHaveLength(2);
  expect(tests.include).toContain("/apiOne");
  expect(tests.include).toContain("/apiTwo");
  expect(tests).toHaveProperty("exclude");
  expect(tests.exclude).toHaveLength(1);
  expect(tests.exclude).toContain("/apiThree");
  types = session.getTypes();
  expect(types).toBeInstanceOf(Array);
  expect(types).toHaveLength(1);
  expect(types).toContain(TestLoader.AUTOMATIC_TESTS);
  timeouts = session.getTimeouts();
  expect(timeouts).toBeInstanceOf(Object);
  expect(timeouts).toHaveProperty("automatic");
  expect(timeouts.automatic).toBe(500);
  expect(timeouts).toHaveProperty("/apiTwo");
  expect(timeouts["/apiTwo"]).toBe(600);
  token = session.getToken();
  expect(token).toMatch(tokenRegex);
  pendingTests = session.getPendingTests();
  expect(pendingTests).toBeInstanceOf(Object);
  expect(Object.keys(pendingTests)).toHaveLength(2);
  expect(pendingTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["/apiOne/test/one.html"])
  );
  expect(pendingTests).toHaveProperty(
    "apiTwo",
    expect.arrayContaining(["/apiTwo/test/one.html"])
  );
  runningTests = session.getRunningTests();
  expect(runningTests).toBeInstanceOf(Object);
  expect(Object.keys(runningTests)).toHaveLength(0);
  completedTests = session.getCompletedTests();
  expect(completedTests).toBeInstanceOf(Object);
  expect(Object.keys(completedTests)).toHaveLength(0);
  testFilesCount = session.getTestFilesCount();
  expect(testFilesCount).toBeInstanceOf(Object);
  expect(Object.keys(testFilesCount)).toHaveLength(2);
  expect(testFilesCount).toHaveProperty("apiOne");
  expect(testFilesCount.apiOne).toBe(1);
  expect(testFilesCount).toHaveProperty("apiTwo");
  expect(testFilesCount.apiOne).toBe(1);
  testFilesCompleted = session.getTestFilesCompleted();
  expect(testFilesCompleted).toBeInstanceOf(Object);
  expect(Object.keys(testFilesCompleted)).toHaveLength(0);
  status = session.getStatus();
  expect(status).toBe(Session.PENDING);
  referenceTokens = session.getReferenceTokens();
  expect(referenceTokens).toBeInstanceOf(Array);
  expect(referenceTokens).toHaveLength(2);
  expect(referenceTokens).toContain("ref_token_1");
  expect(referenceTokens).toContain("ref_token_2");
  webhookUrls = session.getWebhookUrls();
  expect(webhookUrls).toBeInstanceOf(Array);
  expect(webhookUrls).toHaveLength(1);
  expect(webhookUrls).toContain("http://webhook.url/endpoint");
});

test("updateSessionConfiguartion() calls sessionManager.readSession()", async () => {
  let isReadSessionCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    testLoader: {
      getTests: async () => ({
        apiOne: ["/apiOne/test/one.html"]
      })
    },
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    }
  });

  let session = await sessionManager.createSession();

  sessionManager.readSession = token => {
    expect(token).toBe(session.getToken());
    isReadSessionCalled = true;
    return session;
  };

  await sessionManager.updateSessionConfiguration(session.getToken(), {});

  expect(isReadSessionCalled).toBe(true);
});

test("updateSessionConfiguration() calls testLoader.getTests() if session tests are updated", async () => {
  let isGetTestsCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    testLoader: {
      getTests: async () => {
        isGetTestsCalled = true;
        return {
          apiOne: ["/apiOne/test/one.html"]
        };
      }
    },
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    }
  });

  let session = await sessionManager.createSession();
  isGetTestsCalled = false;

  await sessionManager.updateSessionConfiguration(session.getToken(), {
    tests: { include: ["/apiOne/some/tests.html"] }
  });

  expect(isGetTestsCalled).toBe(true);
  isGetTestsCalled = false;

  await sessionManager.updateSessionConfiguration(session.getToken(), {});

  expect(isGetTestsCalled).toBe(false);
});

test("updateSessionConfiguration() calls database.updateSession()", async () => {
  let isUpdateSessionCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    testLoader: {
      getTests: async () => ({
        apiOne: ["/apiOne/test/one.html"]
      })
    },
    database: {
      createSession: async () => {},
      updateSession: async () => {
        isUpdateSessionCalled = true;
      },
      readExpiringSessions: () => []
    }
  });

  let session = await sessionManager.createSession();

  await sessionManager.updateSessionConfiguration(session.getToken(), {
    tests: { include: ["/apiOne/some/tests.html"] }
  });

  expect(isUpdateSessionCalled).toBe(true);
});

test("deleteSession() removes session from cache", async () => {
  let isReadSessionCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    testLoader: {
      getTests: async () => ({
        apiOne: ["/apiOne/test/one.html"]
      })
    },
    database: {
      createSession: async () => {},
      readSession: () => {
        isReadSessionCalled = true;
      },
      deleteSession: () => {},
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });

  let session = await sessionManager.createSession();

  await sessionManager.deleteSession(session.getToken());
  const readSession = await sessionManager.readSession(session.getToken());

  expect(isReadSessionCalled).toBe(true);
});

test("deleteSession() calls database.deleteSession()", async () => {
  let isDeleteSessionCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    testLoader: {
      getTests: async () => ({
        apiOne: ["/apiOne/test/one.html"]
      })
    },
    database: {
      createSession: async () => {},
      deleteSession: () => {
        isDeleteSessionCalled = true;
      },
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });

  let session = await sessionManager.createSession();

  await sessionManager.deleteSession(session.getToken());

  expect(isDeleteSessionCalled).toBe(true);
});

test("startSession() changes session status to Session.RUNNING from Session.PENDING or Session.PAUSED", async () => {
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });
  const session = createMockingSession();
  await sessionManager.addSession(session);

  session.setStatus(Session.PENDING);
  await sessionManager.startSession(session.getToken());
  expect(session.getStatus()).toBe(Session.RUNNING);

  session.setStatus(Session.PAUSED);
  await sessionManager.startSession(session.getToken());
  expect(session.getStatus()).toBe(Session.RUNNING);

  session.setStatus(Session.ABORTED);
  await sessionManager.startSession(session.getToken());
  expect(session.getStatus()).toBe(Session.ABORTED);

  session.setStatus(Session.COMPLETED);
  await sessionManager.startSession(session.getToken());
  expect(session.getStatus()).toBe(Session.COMPLETED);
});

test("startSession() calls sessionManager.readSession()", async () => {
  let isReadSessionCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });
  const session = createMockingSession();
  sessionManager.readSession = () => {
    isReadSessionCalled = true;
    return session;
  };
  await sessionManager.addSession(session);

  session.setStatus(Session.PENDING);
  await sessionManager.startSession(session.getToken());
  expect(isReadSessionCalled).toBe(true);
});

test("startSession() sets date started when successful", async () => {
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });
  const session = createMockingSession();
  await sessionManager.addSession(session);

  session.setStatus(Session.PENDING);
  await sessionManager.startSession(session.getToken());
  expect(session.getStatus()).toBe(Session.RUNNING);
  expect(Date.now() - session.getDateStarted()).toBeLessThan(1000);
});

test("startSession() calls database.updateSession() when successful", async () => {
  let isUpdateSessionCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {
        isUpdateSessionCalled = true;
      },
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });
  const session = createMockingSession();
  await sessionManager.addSession(session);

  session.setStatus(Session.PENDING);
  await sessionManager.startSession(session.getToken());
  expect(isUpdateSessionCalled).toBe(true);
});

test("startSession() dispatches 'status' event when successful", async () => {
  let isEventDispatched = false;
  const session = createMockingSession();
  const eventDispatcher = new EventDispatcher();
  const httpPollingClient = new HttpPollingClient(
    session.getToken(),
    message => {
      isEventDispatched = true;
      message = JSON.parse(message);
      expect(message.type).toBe(EventDispatcher.STATUS_EVENT);
      expect(message.data).toBe(Session.RUNNING);
    }
  );
  eventDispatcher.addSessionClient(httpPollingClient);
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    },
    eventDispatcher
  });
  await sessionManager.addSession(session);

  session.setStatus(Session.PENDING);
  await sessionManager.startSession(session.getToken());
  expect(isEventDispatched).toBe(true);
});

test("pauseSession() changes status to Session.PAUSED from Session.RUNNING", async () => {
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });
  const session = createMockingSession();
  await sessionManager.addSession(session);

  session.setStatus(Session.PENDING);
  await sessionManager.pauseSession(session.getToken());
  expect(session.getStatus()).toBe(Session.PENDING);

  session.setStatus(Session.RUNNING);
  await sessionManager.pauseSession(session.getToken());
  expect(session.getStatus()).toBe(Session.PAUSED);

  session.setStatus(Session.ABORTED);
  await sessionManager.pauseSession(session.getToken());
  expect(session.getStatus()).toBe(Session.ABORTED);

  session.setStatus(Session.COMPLETED);
  await sessionManager.pauseSession(session.getToken());
  expect(session.getStatus()).toBe(Session.COMPLETED);
});

test("pauseSession() calls sessionManager.readSession()", async () => {
  let isReadSessionCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });
  const session = createMockingSession();
  sessionManager.readSession = () => {
    isReadSessionCalled = true;
    return session;
  };
  await sessionManager.addSession(session);

  session.setStatus(Session.PENDING);
  await sessionManager.pauseSession(session.getToken());
  expect(isReadSessionCalled).toBe(true);
});

test("pauseSession() calls database.updateSession()", async () => {
  let isUpdateSessionCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {
        isUpdateSessionCalled = true;
      },
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });
  const session = createMockingSession();
  await sessionManager.addSession(session);

  session.setStatus(Session.RUNNING);
  await sessionManager.pauseSession(session.getToken());
  expect(isUpdateSessionCalled).toBe(true);
});

test("pauseSession() dispatches 'status' event", async () => {
  let isEventDispatched = false;
  const session = createMockingSession();
  const eventDispatcher = new EventDispatcher();
  const httpPollingClient = new HttpPollingClient(
    session.getToken(),
    message => {
      isEventDispatched = true;
      message = JSON.parse(message);
      expect(message.type).toBe(EventDispatcher.STATUS_EVENT);
      expect(message.data).toBe(Session.PAUSED);
    }
  );
  eventDispatcher.addSessionClient(httpPollingClient);
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    },
    eventDispatcher
  });
  await sessionManager.addSession(session);

  session.setStatus(Session.RUNNING);
  await sessionManager.pauseSession(session.getToken());
  expect(isEventDispatched).toBe(true);
});

test("stopSession() changes status to Session.ABORTED if not already Session.ABORTED or Session.COMPLETED", async () => {
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });
  const session = createMockingSession();
  await sessionManager.addSession(session);

  session.setStatus(Session.PENDING);
  await sessionManager.stopSession(session.getToken());
  expect(session.getStatus()).toBe(Session.ABORTED);

  session.setStatus(Session.RUNNING);
  await sessionManager.stopSession(session.getToken());
  expect(session.getStatus()).toBe(Session.ABORTED);

  session.setStatus(Session.ABORTED);
  await sessionManager.stopSession(session.getToken());
  expect(session.getStatus()).toBe(Session.ABORTED);

  session.setStatus(Session.COMPLETED);
  await sessionManager.stopSession(session.getToken());
  expect(session.getStatus()).toBe(Session.COMPLETED);
});

test("stopSession() calls sessionManager.readSession()", async () => {
  let isReadSessionCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });
  const session = createMockingSession();
  sessionManager.readSession = () => {
    isReadSessionCalled = true;
    return session;
  };
  await sessionManager.addSession(session);

  session.setStatus(Session.PENDING);
  await sessionManager.stopSession(session.getToken());
  expect(isReadSessionCalled).toBe(true);
});

test("stopSession() sets date finished when successful", async () => {
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });
  const session = createMockingSession();
  await sessionManager.addSession(session);

  session.setStatus(Session.PENDING);
  await sessionManager.stopSession(session.getToken());
  expect(Date.now() - session.getDateFinished()).toBeLessThan(1000);
});

test("stopSession() calls database.updateSession() when successful", async () => {
  let isUpdateSessionCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {
        isUpdateSessionCalled = true;
      },
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });
  const session = createMockingSession();
  await sessionManager.addSession(session);

  session.setStatus(Session.RUNNING);
  await sessionManager.stopSession(session.getToken());
  expect(isUpdateSessionCalled).toBe(true);
});

test("stopSession() dispatches 'status' event when successful", async () => {
  let isEventDispatched = false;
  const session = createMockingSession();
  const eventDispatcher = new EventDispatcher();
  const httpPollingClient = new HttpPollingClient(
    session.getToken(),
    message => {
      isEventDispatched = true;
      message = JSON.parse(message);
      expect(message.type).toBe(EventDispatcher.STATUS_EVENT);
      expect(message.data).toBe(Session.ABORTED);
    }
  );
  eventDispatcher.addSessionClient(httpPollingClient);
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    },
    eventDispatcher
  });
  await sessionManager.addSession(session);

  session.setStatus(Session.RUNNING);
  await sessionManager.stopSession(session.getToken());
  expect(isEventDispatched).toBe(true);
});

test("completeSession() sets the status to Session.COMPLETED", async () => {
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });
  const session = createMockingSession();
  await sessionManager.addSession(session);

  session.setStatus(Session.PENDING);
  await sessionManager.completeSession(session.getToken());
  expect(session.getStatus()).toBe(Session.COMPLETED);

  session.setStatus(Session.RUNNING);
  await sessionManager.completeSession(session.getToken());
  expect(session.getStatus()).toBe(Session.COMPLETED);

  session.setStatus(Session.ABORTED);
  await sessionManager.completeSession(session.getToken());
  expect(session.getStatus()).toBe(Session.ABORTED);

  session.setStatus(Session.COMPLETED);
  await sessionManager.completeSession(session.getToken());
  expect(session.getStatus()).toBe(Session.COMPLETED);
});

test("completeSession() sets date finished when successful", async () => {
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });
  const session = createMockingSession();
  await sessionManager.addSession(session);

  session.setStatus(Session.PENDING);
  await sessionManager.completeSession(session.getToken());
  expect(Date.now() - session.getDateFinished()).toBeLessThan(1000);
});

test("completeSession() calls database.updateSession()", async () => {
  let isUpdateSessionCalled = false;
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {
        isUpdateSessionCalled = true;
      },
      readExpiringSessions: () => []
    },
    eventDispatcher: { dispatchEvent: () => {} }
  });
  const session = createMockingSession();
  await sessionManager.addSession(session);

  session.setStatus(Session.RUNNING);
  await sessionManager.completeSession(session.getToken());
  expect(isUpdateSessionCalled).toBe(true);
});

test("completeSession() dispatches 'status' event when successful", async () => {
  let isEventDispatched = false;
  const session = createMockingSession();
  const eventDispatcher = new EventDispatcher();
  const httpPollingClient = new HttpPollingClient(
    session.getToken(),
    message => {
      isEventDispatched = true;
      message = JSON.parse(message);
      expect(message.type).toBe(EventDispatcher.STATUS_EVENT);
      expect(message.data).toBe(Session.ABORTED);
    }
  );
  eventDispatcher.addSessionClient(httpPollingClient);
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    },
    eventDispatcher
  });
  await sessionManager.addSession(session);

  session.setStatus(Session.RUNNING);
  await sessionManager.stopSession(session.getToken());
  expect(isEventDispatched).toBe(true);
});

test("updateTests() sets the corresponding test lists of the provided session and calls database.updateSession", async () => {
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    }
  });
  const session = createMockingSession({
    pendingTests: {},
    runningTests: {},
    completedTests: {}
  });
  const pendingTests = { apiOne: ["/apiOne/test/one.html"] };
  const runningTests = { apiOne: ["/apiOne/test/two.html"] };
  const completedTests = { apiOne: ["/apiOne/test/three.html"] };

  await sessionManager.updateTests({
    pendingTests,
    runningTests,
    completedTests,
    session
  });

  expect(session.getPendingTests()).toBeInstanceOf(Object);
  expect(Object.keys(session.getPendingTests())).toHaveLength(1);
  expect(session.getPendingTests()).toHaveProperty("apiOne");
  expect(session.getPendingTests().apiOne).toBeInstanceOf(Array);
  expect(session.getPendingTests().apiOne).toHaveLength(1);
  expect(session.getPendingTests().apiOne).toContain("/apiOne/test/one.html");

  expect(session.getRunningTests()).toBeInstanceOf(Object);
  expect(Object.keys(session.getRunningTests())).toHaveLength(1);
  expect(session.getRunningTests()).toHaveProperty("apiOne");
  expect(session.getRunningTests().apiOne).toBeInstanceOf(Array);
  expect(session.getRunningTests().apiOne).toHaveLength(1);
  expect(session.getRunningTests().apiOne).toContain("/apiOne/test/two.html");

  expect(session.getCompletedTests()).toBeInstanceOf(Object);
  expect(Object.keys(session.getCompletedTests())).toHaveLength(1);
  expect(session.getCompletedTests()).toHaveProperty("apiOne");
  expect(session.getCompletedTests().apiOne).toBeInstanceOf(Array);
  expect(session.getCompletedTests().apiOne).toHaveLength(1);
  expect(session.getCompletedTests().apiOne).toContain(
    "/apiOne/test/three.html"
  );
});

test("updateTests() recalculates the total completed tests", async () => {
  const sessionManager = new SessionManager();
  await sessionManager.initialize({
    database: {
      createSession: async () => {},
      updateSession: async () => {},
      readExpiringSessions: () => []
    }
  });
  const session = createMockingSession({
    pendingTests: {},
    runningTests: {},
    completedTests: {}
  });
  const pendingTests = { apiOne: [] };
  const runningTests = { apiOne: [] };
  const completedTests = {
    apiOne: [
      "/apiOne/test/one.html",
      "/apiOne/test/two.html",
      "/apiOne/test/three.html"
    ]
  };

  await sessionManager.updateTests({
    pendingTests,
    runningTests,
    completedTests,
    session
  });

  expect(session.getTestFilesCompleted()).toHaveProperty("apiOne", 3);
});

test("deleteExpiredSessions() deletes all expired sessions", async () => {
  let isSession1Deleted = false;
  let isSession2Deleted = false;
  const session1 = createMockingSession({
    token: "token1",
    expirationDate: Date.now() - 30000
  });
  const session2 = createMockingSession({
    token: "token2",
    expirationDate: Date.now() - 100
  });
  const session3 = createMockingSession({
    token: "token3",
    expirationDate: Date.now() + 30000
  });
  const session4 = createMockingSession({
    token: "token4",
    expirationDate: Date.now() + 1000
  });
  const sessionManager = new SessionManager();
  sessionManager.deleteSession = token => {
    if (token === "token1") isSession1Deleted = true;
    if (token === "token2") isSession2Deleted = true;
    expect(token).not.toBe("token3");
    expect(token).not.toBe("token4");
  };
  await sessionManager.initialize({
    database: {
      readExpiringSessions: () => [session1, session2, session3, session4]
    }
  });

  sessionManager.deleteExpiredSessions();

  expect(isSession1Deleted).toBe(true);
  expect(isSession2Deleted).toBe(true);
});

test("setExpirationTimer() calls deleteExpiredSessions() and resets the timer when session expires", async () => {
  let isDeleteExpiredSessionsCalled = false;
  let isTimerReset = false;
  const session1 = createMockingSession({
    token: "token1",
    expirationDate: Date.now() + 30000
  });
  const session2 = createMockingSession({
    token: "token2",
    expirationDate: Date.now() + 100
  });
  const sessionManager = new SessionManager();
  sessionManager.deleteExpiredSessions = () => {
    isDeleteExpiredSessionsCalled = true;
  };
  await sessionManager.initialize({
    database: {
      readExpiringSessions: () => [session1, session2]
    }
  });

  await sessionManager.setExpirationTimer();

  sessionManager.setExpirationTimer = () => {
    isTimerReset = true;
  }
  await new Promise(resolve => setTimeout(resolve, 120));
  expect(isDeleteExpiredSessionsCalled).toBe(true);
  expect(isTimerReset).toBe(true);
});

function createMockingSession({
  token = "test_token",
  path = "/path/one,/path/two",
  types = ["TEST_HARNESS", "MANUAL"],
  userAgent = "Some user agent string",
  pendingTests = {
    apiOne: [
      "/pending/test/one.html",
      "/pending/test/two.html",
      "/pending/test/three.html"
    ],
    apiTwo: [],
    apiThree: []
  },
  runningTests = {
    apiOne: [],
    apiTwo: [
      "/running/test/one.html",
      "/running/test/two.html",
      "/running/test/three.html"
    ],
    apiThree: []
  },
  completedTests = {
    apiOne: [],
    apiTwo: [],
    apiThree: [
      "/completed/test/one.html",
      "/completed/test/two.html",
      "/completed/test/three.html"
    ]
  },
  testTimeout = 30000,
  status = "running",
  testFilesCount = 9,
  testFilesCompleted = 3,
  dateStarted = 654346464,
  dateFinished = null,
  isPublic = false,
  referenceTokens = ["reference_token_one", "reference_token_two"],
  expirationDate = null
} = {}) {
  const session = new Session(token, {
    path,
    types,
    userAgent,
    pendingTests,
    runningTests,
    completedTests,
    testTimeout,
    status,
    testFilesCount,
    testFilesCompleted,
    dateStarted,
    dateFinished,
    isPublic,
    referenceTokens,
    expirationDate
  });
  return session;
}
