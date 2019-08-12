const TestManager = require("../../src/testing/test-manager");
const Session = require("../../src/data/session");

// NEXT TEST

test("nextTest() calls sessionManager.updateSession(session)", async () => {
  const session = createMockingSession({
    pendingTests: {
      apiOne: ["/apiOne/test/one.html"]
    },
    runningTests: {},
    completedTests: {}
  });
  let isUpdateSessionCalled = false;
  const testManager = new TestManager();
  testManager.initialize({
    sessionManager: {
      updateSession: async session => {
        expect(session).toBeInstanceOf(Session);
        isUpdateSessionCalled = true;
      }
    }
  });

  const test = await testManager.nextTest(session);

  expect(test).toBe("/apiOne/test/one.html");
  expect(isUpdateSessionCalled).toBe(true);
});

// GET CORRECT TEST URL

test("nextTest() returns http tests first, then https tests.", async () => {
  const session = createMockingSession({
    pendingTests: {
      apiOne: [
        "/apiOne/test/test1.https.html",
        "/apiOne/test/test2.html",
        "/apiOne/test/test3.https.html",
        "/apiOne/test/test4.html"
      ]
    },
    runningTests: {},
    completedTests: {}
  });
  const testManager = new TestManager();
  testManager.initialize({ sessionManager: { updateSession: async () => {} } });

  let test = "";

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.not.stringContaining("https"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.not.stringContaining("https"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.stringContaining("https"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.stringContaining("https"));
});

test("nextTest() returns manual tests first, then automatic.", async () => {
  const session = createMockingSession({
    pendingTests: {
      apiOne: [
        "/apiOne/test/test1.manual.html",
        "/apiOne/test/test2.html",
        "/apiOne/test/test3.manual.html",
        "/apiOne/test/test4.html"
      ]
    },
    runningTests: {},
    completedTests: {}
  });
  const testManager = new TestManager();
  testManager.initialize({ sessionManager: { updateSession: async () => {} } });

  let test = "";

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.stringContaining("manual"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.stringContaining("manual"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.not.stringContaining("manual"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.not.stringContaining("manual"));
});

test("nextTest() returns manual first, http second and https third.", async () => {
  const session = createMockingSession({
    pendingTests: {
      apiOne: [
        "/apiOne/test/test1.https.html",
        "/apiOne/test/test2.manual.html",
        "/apiOne/test/test3.html",
        "/apiOne/test/test4.https.html",
        "/apiOne/test/test5.html",
        "/apiOne/test/test6.manual.html",
        "/apiOne/test/test7.html"
      ]
    }
  });
  const testManager = new TestManager();
  testManager.initialize({ sessionManager: { updateSession: async () => {} } });

  let test = "";

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.stringContaining("manual"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.stringContaining("manual"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.not.stringContaining("https"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.not.stringContaining("https"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.not.stringContaining("https"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.stringContaining("https"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.stringContaining("https"));
});

test("nextTest() returns manual http first, manual https seconds, http third and https fourth.", async () => {
  const session = createMockingSession({
    pendingTests: {
      apiOne: [
        // 2 of each combination
        "/apiOne/test/test1.https.html",
        "/apiOne/test/test2.manual.https.html",
        "/apiOne/test/test3.html",
        "/apiOne/test/test4.manual.html",
        "/apiOne/test/test5.html",
        "/apiOne/test/test6.https.html",
        "/apiOne/test/test7.manual.https.html",
        "/apiOne/test/test8.manual.html"
      ]
    }
  });
  const testManager = new TestManager();
  testManager.initialize({ sessionManager: { updateSession: async () => {} } });

  let test = "";

  // 2x manual + http
  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.stringContaining("manual"));
  expect(test).toEqual(expect.not.stringContaining("https"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.stringContaining("manual"));
  expect(test).toEqual(expect.not.stringContaining("https"));

  // 2x manual + https
  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.stringContaining("manual"));
  expect(test).toEqual(expect.stringContaining("https"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.stringContaining("manual"));
  expect(test).toEqual(expect.stringContaining("https"));

  // 2x automatic + http
  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.not.stringContaining("https"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.not.stringContaining("https"));

  // 2x automatic + https
  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.stringContaining("https"));

  test = await testManager.nextTest(session);
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.stringContaining("https"));
});

// MOVE FETCHED TEST TO NEXT TEST LIST

test("nextTest() should put tests on the running list and remove it from the pending list of the session instance.", async () => {
  const session = createMockingSession({
    pendingTests: {
      apiOne: [
        "/apiOne/test/test1.html",
        "/apiOne/test/test2.html",
        "/apiOne/test/test3.html",
        "/apiOne/test/test4.html"
      ],
      apiTwo: [],
      apiThree: []
    },
    runningTests: {}
  });
  const testManager = new TestManager();
  testManager.initialize({ sessionManager: { updateSession: async () => {} } });

  let pendingTests = null;
  let runningTests = null;

  test = await testManager.nextTest(session);
  pendingTests = session.getPendingTests();
  runningTests = session.getRunningTests();
  expect(pendingTests).toBeInstanceOf(Object);
  expect(pendingTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining([
      "/apiOne/test/test2.html",
      "/apiOne/test/test3.html",
      "/apiOne/test/test4.html"
    ])
  );
  expect(runningTests).toBeInstanceOf(Object);
  expect(runningTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["/apiOne/test/test1.html"])
  );

  test = await testManager.nextTest(session);
  pendingTests = session.getPendingTests();
  runningTests = session.getRunningTests();
  expect(pendingTests).toBeInstanceOf(Object);
  expect(pendingTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining([
      "/apiOne/test/test3.html",
      "/apiOne/test/test4.html"
    ])
  );
  expect(runningTests).toBeInstanceOf(Object);
  expect(runningTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining([
      "/apiOne/test/test1.html",
      "/apiOne/test/test2.html"
    ])
  );

  test = await testManager.nextTest(session);
  pendingTests = session.getPendingTests();
  runningTests = session.getRunningTests();
  expect(pendingTests).toBeInstanceOf(Object);
  expect(pendingTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["/apiOne/test/test4.html"])
  );
  expect(runningTests).toBeInstanceOf(Object);
  expect(runningTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining([
      "/apiOne/test/test1.html",
      "/apiOne/test/test2.html",
      "/apiOne/test/test3.html"
    ])
  );
});

// TIMEOUT FUNCTION IS SET AND CALLED

test("nextTest() calls timeout function with correct parameters", async () => {
  const session = createMockingSession({
    token: "test_token",
    timeouts: { automatic: 100 },
    pendingTests: { apiOne: ["/apiOne/test/one.html"] }
  });
  let isTimeoutCalled = false;
  const testManager = new TestManager();
  testManager.initialize({
    sessionManager: { updateSession: async () => {} }
  });

  testManager._onTestTimeout = (token, test) => {
    expect(token).toBe("test_token");
    expect(test).toBe("/apiOne/test/one.html");
    isTimeoutCalled = true;
  };
  await testManager.nextTest(session);

  await new Promise(resolve => setTimeout(resolve, 150));
  expect(isTimeoutCalled).toBe(true);
});

test("nextTest() timeout function calls resultManager.createResult()", async () => {
  const session = createMockingSession({
    token: "test_token",
    timeouts: { automatic: 100 },
    pendingTests: { apiOne: ["/apiOne/test/one.html"] }
  });
  let isCreateResultCalled = false;
  const testManager = new TestManager();
  testManager.initialize({
    sessionManager: { updateSession: async () => {} },
    resultsManager: {
      createResult: async ({ token, data }) => {
        expect(token).toBe(session.getToken());
        expect(data.test).toBe("/apiOne/test/one.html");
        isCreateResultCalled = true;
      }
    }
  });
  await testManager.nextTest(session);

  await new Promise(resolve => setTimeout(resolve, 150));
  expect(isCreateResultCalled).toBe(true);
});

test("completeTest() removes it from running tests and adds it to completed tests list.", async () => {
  const session = createMockingSession({
    runningTests: {
      apiOne: ["/apiOne/one.html", "/apiOne/two.html", "/apiOne/three.html"]
    },
    completedTests: {}
  });
  const testManager = new TestManager();
  testManager.initialize({
    sessionManager: {
      updateSession: async () => {},
      updateTests: async () => {}
    }
  });

  let runningTests = null;
  let completedTests = null;

  testManager.completeTest({ session, test: "/apiOne/one.html" });
  runningTests = session.getRunningTests();
  completedTests = session.getCompletedTests();
  expect(runningTests).toBeInstanceOf(Object);
  expect(runningTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["/apiOne/two.html", "/apiOne/three.html"])
  );
  expect(completedTests).toBeInstanceOf(Object);
  expect(completedTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["/apiOne/one.html"])
  );

  testManager.completeTest({ session, test: "/apiOne/two.html" });
  runningTests = session.getRunningTests();
  completedTests = session.getCompletedTests();
  expect(runningTests).toBeInstanceOf(Object);
  expect(runningTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["/apiOne/three.html"])
  );
  expect(completedTests).toBeInstanceOf(Object);
  expect(completedTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["/apiOne/one.html", "/apiOne/two.html"])
  );

  testManager.completeTest({ session, test: "/apiOne/three.html" });
  runningTests = session.getRunningTests();
  completedTests = session.getCompletedTests();
  expect(runningTests).toBeInstanceOf(Object);
  expect(runningTests).toHaveProperty("apiOne", expect.arrayContaining([]));
  expect(completedTests).toBeInstanceOf(Object);
  expect(completedTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining([
      "/apiOne/one.html",
      "/apiOne/two.html",
      "/apiOne/three.html"
    ])
  );
});

test("completeTest() clears the timeout", async () => {
  const session = createMockingSession({
    token: "test_token",
    timeouts: { automatic: 100 },
    pendingTests: { apiOne: ["/apiOne/test/one.html"] }
  });
  let isTimeoutCalled = false;
  const testManager = new TestManager();
  testManager.initialize({
    sessionManager: {
      updateSession: async () => {},
      updateTests: async () => {}
    }
  });

  testManager._onTestTimeout = (token, test) => {
    expect(token).toBe("test_token");
    expect(test).toBe("/apiOne/test/one.html");
    isTimeoutCalled = true;
  };
  await testManager.nextTest(session);
  await testManager.completeTest({ test: "/apiOne/test/one.html", session });

  await new Promise(resolve => setTimeout(resolve, 150));
  expect(isTimeoutCalled).toBe(false);
});

test("completeTest() calls sessionManager.updateTests()", async () => {
  const session = createMockingSession({
    token: "test_token",
    timeouts: { automatic: 100 },
    pendingTests: { apiOne: ["/apiOne/test/one.html"] }
  });
  let isUpdateTestsCalled = false;
  const testManager = new TestManager();
  testManager.initialize({
    sessionManager: {
      updateSession: async () => {},
      updateTests: async ({ runningTests, completedTests, session }) => {
        expect(runningTests).not.toBeNull();
        expect(completedTests).not.toBeNull();
        expect(session).toBeInstanceOf(Session);
        expect(session.getToken()).toBe("test_token");
        isUpdateTestsCalled = true;
      }
    }
  });

  await testManager.nextTest(session);
  await testManager.completeTest({ test: "/apiOne/test/one.html", session });
  expect(isUpdateTestsCalled).toBe(true);
});

test("removeTestFromList() removes a test from a list", () => {
  const tests = {
    apiOne: [
      "/apiOne/test/one.html",
      "/apiOne/test/two.html",
      "/apiOne/test/three.html"
    ]
  };

  const testManager = new TestManager();
  testManager.initialize();

  const newTests = testManager.removeTestFromList(
    tests,
    "/apiOne/test/one.html"
  );
  expect(tests).toBeInstanceOf(Object);
  expect(tests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["/apiOne/test/one.html"])
  );
  expect(newTests).toBeInstanceOf(Object);
  expect(newTests).toHaveProperty(
    "apiOne",
    expect.not.arrayContaining(["/apiOne/test/one.html"])
  );
});

test("addTestToList() adds test to a list", () => {
  const tests = {
    apiOne: ["/apiOne/test/two.html", "/apiOne/test/three.html"]
  };

  const testManager = new TestManager();
  testManager.initialize();

  const newTests = testManager.addTestToList(tests, "/apiOne/test/one.html");
  expect(tests).toBeInstanceOf(Object);
  expect(tests).toHaveProperty(
    "apiOne",
    expect.not.arrayContaining(["/apiOne/test/one.html"])
  );
  expect(newTests).toBeInstanceOf(Object);
  expect(newTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["/apiOne/test/one.html"])
  );
});

test("readTests() invokes testLoader.getTests()", async () => {
  let isGetTestsCalled = false;
  const testManager = new TestManager();
  testManager.initialize({
    testLoader: {
      getTests: async () => {
        isGetTestsCalled = true;
      }
    }
  });

  await testManager.readTests();
  expect(isGetTestsCalled).toBe(true);
});

test("readLastCompletedTests() returns completed tests by status in descending alphabetical order", async () => {
  const results = { apiOne: [], apiTwo: [] };
  const simpleResults = [
    { test: "/apiOne/test/1.html", status: "OK", subStatus: "PASS" },
    { test: "/apiOne/test/2.html", status: "OK", subStatus: "PASS" },
    { test: "/apiOne/test/3.html", status: "OK", subStatus: "PASS" },
    { test: "/apiOne/test/4.html", status: "OK", subStatus: "FAIL" },
    { test: "/apiOne/test/5.html", status: "OK", subStatus: "FAIL" },
    { test: "/apiOne/test/6.html", status: "OK", subStatus: "FAIL" },
    { test: "/apiOne/test/7.html", status: "TIMEOUT", subStatus: "PASS" },
    { test: "/apiOne/test/8.html", status: "TIMEOUT", subStatus: "PASS" },
    { test: "/apiOne/test/9.html", status: "TIMEOUT", subStatus: "PASS" }
  ];
  for (let { test, status, subStatus } of simpleResults) {
    let api = test.split("/").find(part => !!part);
    results[api].push({
      test,
      status,
      subtests: [
        {
          name: "Subtest testing feature xy",
          status: subStatus,
          message: "Error message"
        }
      ]
    });
  }
  let isReadResultsCalled = false;
  const testManager = new TestManager();
  testManager.initialize({
    resultsManager: {
      readResults: async () => {
        isReadResultsCalled = true;
        return results;
      }
    }
  });

  const lastCompletedTests = await testManager.readLastCompletedTests({
    token: "test_token",
    count: 5
  });

  expect(lastCompletedTests).toBeInstanceOf(Object);
  expect(lastCompletedTests).toHaveProperty("pass");
  expect(lastCompletedTests.pass).toBeInstanceOf(Array);
  expect(lastCompletedTests.pass).toHaveLength(3);
  expect(lastCompletedTests.pass[0]).toBe("/apiOne/test/3.html");
  expect(lastCompletedTests.pass[1]).toBe("/apiOne/test/2.html");
  expect(lastCompletedTests.pass[2]).toBe("/apiOne/test/1.html");
  expect(lastCompletedTests).toHaveProperty("fail");
  expect(lastCompletedTests.fail).toBeInstanceOf(Array);
  expect(lastCompletedTests.fail).toHaveLength(3);
  expect(lastCompletedTests.fail[0]).toBe("/apiOne/test/6.html");
  expect(lastCompletedTests.fail[1]).toBe("/apiOne/test/5.html");
  expect(lastCompletedTests.fail[2]).toBe("/apiOne/test/4.html");
  expect(lastCompletedTests).toHaveProperty("timeout");
  expect(lastCompletedTests.timeout).toBeInstanceOf(Array);
  expect(lastCompletedTests.timeout).toHaveLength(3);
  expect(lastCompletedTests.timeout[0]).toBe("/apiOne/test/9.html");
  expect(lastCompletedTests.timeout[1]).toBe("/apiOne/test/8.html");
  expect(lastCompletedTests.timeout[2]).toBe("/apiOne/test/7.html");

  expect(isReadResultsCalled).toBe(true);
});

test("getTestTimeout() returns test specific timeout, if not available the default", () => {
  const session = createMockingSession({
    token: "test_token",
    timeouts: { automatic: 100, "/apiOne/test/twohtml": 200 },
    pendingTests: { apiOne: ["/apiOne/test/one.html", "/apiOne/test/two.html"] }
  });

  const testManager = new TestManager();
  testManager.initialize();

  const timeoutOne = testManager.getTestTimeout({
    session,
    test: "/apiOne/test/one.html"
  });
  expect(timeoutOne).toBe(100);

  const timeoutTwo = testManager.getTestTimeout({
    session,
    test: "/apiOne/test/two.html"
  });
  expect(timeoutTwo).toBe(200);
});

function createMockingSession({
  token = "test_token",
  tests = {
    include: ["/pending/test", "/running/test", "/completed/test"]
  },
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
  timeouts = { automatic: 30000, manual: 60000 },
  status = "running",
  testFilesCount = 9,
  testFilesCompleted = 3,
  dateStarted = 654346464,
  dateFinished = null,
  isPublic = false,
  referenceTokens = ["reference_token_one", "reference_token_two"]
} = {}) {
  const session = new Session(token, {
    tests,
    types,
    userAgent,
    pendingTests,
    runningTests,
    completedTests,
    timeouts,
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
