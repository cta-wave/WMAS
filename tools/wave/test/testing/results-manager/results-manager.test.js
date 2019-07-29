const ResultsManager = require("../../../src/testing/results-manager");
const Session = require("../../../src/data/session");
const FileSystem = require("../../../src/utils/file-system");
const TestManager = require("../../../src/testing/test-manager");

test("Create result that doesn't finish neither api nor session.", async () => {
  let sessionUpdated = false;
  const session = createMockingSession({
    tests: {
      apiOne: ["apiOne/tests/one.html", "apiOne/tests/two.html"]
    },
    runningTests: {
      apiOne: ["apiOne/tests/one.html", "apiOne/tests/two.html"]
    },
    completedTests: {}
  });
  console.log(session.getTestFilesCount())
  const {
    mockSessionManager,
    mockTestManager,
    mockDatabase
  } = createMockingDependencies({
    sessionManager: {
      readSession: async token => {
        expect(typeof token).toEqual("string");
        return session;
      },
      updateSession: async session => {
        expect(session).toBeInstanceOf(Session);
        sessionUpdated = true;
      }
    }
  });

  const resultsDirectoryPath = "./test/testing/results-manager/results";
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    resultsDirectoryPath,
    database: mockDatabase,
    sessionManager: mockSessionManager,
    testManager: mockTestManager
    // exportTemplateDirectoryPath
  });

  const token = session.getToken();
  const data = createMockingResultData("apiOne/tests/one.html");

  await resultsManager.createResult({ token, data });
  expect(sessionUpdated).toEqual(true);

  // Clean up
  // const directories = await FileSystem.readDirectory(resultsDirectoryPath);
  // for (let directory of directories) {
  //   await FileSystem.removeDirectory(directory);
  // }
});

test("Create result that finishes api but not session.", () => {});
test("Create result that finishes api and session.", () => {});

function createMockingResultData(testPath) {
  if (!testPath) testPath = "apiOne/tests/one.html";
  return {
    test: testPath,
    tests: [
      {
        name: "This is the description of a sample test results data.",
        status: 0,
        message: null,
        stack: null
      }
    ],
    status: 0,
    message: null,
    stack: null
  };
}

function createMockingDependencies({
  sessionManager = {
    readSession: async token => {
      expect(typeof token).toEqual("string");
    },
    updateSession: async session => {
      expect(session).toBeInstanceOf(Session);
    }
  },
  testManager = {
    completeTest: ({ test, session }) => {
      expect(typeof test).toEqual("string");
      expect(session).toBeInstanceOf(Session);
      const testManager = new TestManager();
      const runningTests = session.getRunningTests();
      const completedTests = session.getCompletedTests();
      testManager.removeTestFromList(runningTests, test);
      testManager.addTestToList(completedTests, test);
    }
  },
  database = {
    results: [],
    createSession: async session => {
      expect(session).toBeInstanceOf(Session);
      return null;
    },
    readSession: async token => {
      expect(typeof token).toEqual("string");
      return null;
    },
    readSessions: async () => [],
    readPublicSessions: async () => [],
    updateSession: async session => expect(session).toBeInstanceOf(Session),
    deleteSession: async token => expect(typeof token).toBe("string"),
    createResult: async (token, result) => {
      expect(typeof token).toEqual("string");
      expect(result).toBeInstanceOf(Object);
      database.results.push(result);
    },
    readResults: async token => {
      expect(typeof token).toEqual("string");
      return database.results;
    }
  }
} = {}) {
  const mockSessionManager = sessionManager;
  const mockTestManager = testManager;
  const mockDatabase = database;
  return { mockSessionManager, mockTestManager, mockDatabase };
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
