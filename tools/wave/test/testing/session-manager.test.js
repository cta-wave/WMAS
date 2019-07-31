const SessionManager = require("../../src/testing/session-manager");
const Session = require("../../src/data/session");

test("Create session with correct data", async () => {
  const sessionManager = new SessionManager();
  const { mockDatabase, mockTestLoader } = createMockingDependencies({
    testLoader: {
      tests: {
        apiOne: ["/apiOne/one.html", "/apiOne/two.html"]
      }
    }
  });
  sessionManager.initialize({
    database: mockDatabase,
    testTimeout: 3000,
    testLoader: mockTestLoader
  });

  const dateBefore = Date.now();

  const session = await sessionManager.createSession({
    userAgent: "Test User Agent",
    path: "/apiOne,/apiTwo",
    types: ["TESTHARNESS"],
    referenceTokens: ["token1", "token2"],
    testTimeout: 500
  });

  const dateAfter = Date.now();

  expect(session).toBeInstanceOf(Session);
  const token = session.getToken();
  expect(typeof token).toEqual("string");
  expect(token).toEqual(
    expect.stringMatching(
      /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/
    )
  );
  const pendingTests = session.getPendingTests();
  expect(pendingTests).toBeInstanceOf(Object);
  expect(pendingTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["/apiOne/one.html", "/apiOne/two.html"])
  );
  const runningTests = session.getRunningTests();
  expect(runningTests).toBeInstanceOf(Object);
  expect(runningTests).toStrictEqual({});
  const completedTests = session.getRunningTests();
  expect(completedTests).toBeInstanceOf(Object);
  expect(completedTests).toStrictEqual({});
  const userAgent = session.getUserAgent();
  expect(userAgent).toBe("Test User Agent");
  const path = session.getPath();
  expect(path).toBe("/apiOne,/apiTwo");
  const types = session.getTypes();
  expect(types).toBeInstanceOf(Array);
  expect(types).toEqual(expect.arrayContaining(["TESTHARNESS"]));
  const referenceTokens = session.getReferenceTokens();
  expect(referenceTokens).toBeInstanceOf(Array);
  expect(referenceTokens).toEqual(expect.arrayContaining(["token1", "token2"]));
  const testTimeout = session.getTestTimeout();
  expect(testTimeout).toBe(500);
  const status = session.getStatus();
  expect(status).toBe(Session.RUNNING);
  const testFilesCount = session.getTestFilesCount();
  expect(testFilesCount).toHaveProperty("apiOne", 2);
  const testFilesCompleted = session.getTestFilesCompleted();
  expect(testFilesCompleted).toStrictEqual({});
  const dateStarted = session.getDateStarted();
  expect(dateStarted).toBeGreaterThanOrEqual(dateBefore);
  expect(dateStarted).toBeLessThanOrEqual(dateAfter);
  const dateFinished = session.getDateFinished();
  expect(dateFinished).toBeFalsy();
  const isPublic = session.isPublic();
  expect(isPublic).toBe(false);
});

test("Creating a session caches the instance.", async () => {
  const sessionManager = new SessionManager();
  const { mockDatabase, mockTestLoader } = createMockingDependencies();
  sessionManager.initialize({
    database: mockDatabase,
    testTimeout: 3000,
    testLoader: mockTestLoader
  });

  const session = await sessionManager.createSession({
    userAgent: "Test User Agent",
    path: "/apiOne,/apiTwo",
    types: ["TESTHARNESS"],
    referenceTokens: ["token1", "token2"],
    testTimeout: 500
  });

  const token = session.getToken();

  const cachedSession = await sessionManager.readSession(token);
  expect(session).toBe(cachedSession);
});

test("Adding a session should put it in database and cache.", async () => {
  let sessionCreatedInDatabase = false;
  const sessionManager = new SessionManager();
  const { mockDatabase, mockTestLoader } = createMockingDependencies({
    database: {
      createSession: session => {
        expect(session).toBeInstanceOf(Session);
        sessionCreatedInDatabase = true;
      }
    }
  });
  sessionManager.initialize({
    database: mockDatabase,
    testTimeout: 3000,
    testLoader: mockTestLoader
  });

  const session = createMockingSession();

  await sessionManager.addSession(session);

  expect(sessionCreatedInDatabase).toBe(true);

  const token = session.getToken();
  const cachedSession = await sessionManager.readSession(token);
  expect(session).toBe(cachedSession);
});

test("Reading a session gets it from the cache, if not existent from the database.", async () => {
  let sessionReadFromDatabase = false;
  const session = createMockingSession();
  const { mockDatabase, mockTestLoader } = createMockingDependencies({
    database: {
      readSession: () => {
        sessionReadFromDatabase = true;
      }
    }
  });
  const sessionManager = new SessionManager();
  sessionManager.initialize({
    database: mockDatabase,
    testTimeout: 3000,
    testLoader: mockTestLoader
  });

  await sessionManager.addSession(session);

  const token = session.getToken();
  let readSession = null;

  readSession = await sessionManager.readSession(token);
  expect(readSession).toBe(session);
  expect(sessionReadFromDatabase).toEqual(false);

  readSession = await sessionManager.readSession(token + "make_invalid");
  expect(readSession).toBeFalsy();
  expect(sessionReadFromDatabase).toEqual(true);
});

test("Reading sessions uses database api.", async () => {
  let sessionsReadFromDatabase = false;
  const { mockDatabase, mockTestLoader } = createMockingDependencies({
    database: {
      readSessions: () => {
        sessionsReadFromDatabase = true;
      }
    }
  });
  const sessionManager = new SessionManager();
  sessionManager.initialize({
    database: mockDatabase,
    testTimeout: 3000,
    testLoader: mockTestLoader
  });

  await sessionManager.readSessions();
  expect(sessionsReadFromDatabase).toEqual(true);
});

test("Reading public session uses database api.", async () => {
  let sessionsReadFromDatabase = false;
  const { mockDatabase, mockTestLoader } = createMockingDependencies({
    database: {
      readPublicSessions: () => {
        sessionsReadFromDatabase = true;
      }
    }
  });
  const sessionManager = new SessionManager();
  sessionManager.initialize({
    database: mockDatabase,
    testTimeout: 3000,
    testLoader: mockTestLoader
  });

  await sessionManager.readPublicSessions();
  expect(sessionsReadFromDatabase).toEqual(true);
});

test("Updating session uses database api.", async () => {
  let sessionUpdatedInDatabase = false;
  const session = createMockingSession();
  const { mockDatabase, mockTestLoader } = createMockingDependencies({
    database: {
      updateSession: session => {
        expect(session).toBeInstanceOf(Session);
        sessionUpdatedInDatabase = true;
      }
    }
  });
  const sessionManager = new SessionManager();
  sessionManager.initialize({
    database: mockDatabase,
    testTimeout: 3000,
    testLoader: mockTestLoader
  });

  await sessionManager.updateSession(session.getToken(), {});
  expect(sessionUpdatedInDatabase).toEqual(true);
});

test("Deleting session removes it from cache and database.", async () => {
  let sessionDeletedFromDatabase = false;
  const session = createMockingSession();
  const { mockDatabase, mockTestLoader } = createMockingDependencies({
    database: {
      deleteSession: token => {
        expect(typeof token).toEqual("string");
        sessionDeletedFromDatabase = true;
      }
    }
  });
  const sessionManager = new SessionManager();
  sessionManager.initialize({
    database: mockDatabase,
    testTimeout: 3000,
    testLoader: mockTestLoader
  });

  const token = session.getToken();

  await sessionManager.addSession(session);

  await sessionManager.deleteSession(token);
  expect(sessionDeletedFromDatabase).toEqual(true);
  const readSession = await sessionManager.readSession(token);
  expect(readSession).toBeFalsy();
})

function createMockingDependencies({
  testLoader: {
    tests = {
      apiOne: ["/apiOne/one.html", "/apiOne/two.html"],
      apiTwo: ["/apiTwo/one.html"]
    },
    getTests = async ({ path, referenceTokens, types }) => {
      expect(typeof path).toBe("string");
      expect(referenceTokens).toBeInstanceOf(Array);
      expect(types).toBeInstanceOf(Array);
      return tests;
    }
  } = {},
  database: {
    createSession = async session => {
      expect(session).toBeInstanceOf(Session);
      return null;
    },
    readSession = async token => {
      expect(typeof token).toEqual("string");
      return null;
    },
    readSessions = async () => [],
    readPublicSessions = async () => [],
    updateSession = async session => expect(session).toBeInstanceOf(Session),
    deleteSession = async token => expect(typeof token).toBe("string")
  } = {}
} = {}) {
  const mockDatabase = {
    createSession,
    readSession,
    readSessions,
    readPublicSessions,
    updateSession,
    deleteSession
  };
  const mockTestLoader = {
    getTests
  };
  return { mockDatabase, mockTestLoader };
}

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
  referenceTokens = ["reference_token_one", "reference_token_two"]
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
    referenceTokens
  });
  return session;
}
