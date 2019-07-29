const TestManager = require("../../src/testing/test-manager");
const Session = require("../../src/data/session");

test("Get next test without timeout.", () => {
  const session = createMockingSession({
    pendingTests: {
      apiOne: ["/pending/test/one.html"],
      apiTwo: [],
      apiThree: []
    }
  });
  const testManager = new TestManager();

  const test = testManager.nextTest({ session });

  expect(test).toBe("/pending/test/one.html");
});

test("Get http tests first, then https tests.", () => {
  const session = createMockingSession({
    pendingTests: {
      apiOne: [
        "/pending/test/test1.https.html",
        "/pending/test/test2.html",
        "/pending/test/test3.https.html",
        "/pending/test/test4.html"
      ],
      apiTwo: [],
      apiThree: []
    }
  });
  const testManager = new TestManager();

  let test = "";

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.not.stringContaining("https"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.not.stringContaining("https"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.stringContaining("https"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.stringContaining("https"));
});

test("Get manual tests first, then automatic.", () => {
  const session = createMockingSession({
    pendingTests: {
      apiOne: [
        "/pending/test/test1.manual.html",
        "/pending/test/test2.html",
        "/pending/test/test3.manual.html",
        "/pending/test/test4.html"
      ],
      apiTwo: [],
      apiThree: []
    }
  });
  const testManager = new TestManager();

  let test = "";

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.stringContaining("manual"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.stringContaining("manual"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.not.stringContaining("manual"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.not.stringContaining("manual"));
});

test("Get manual first, http second and https third.", () => {
  const session = createMockingSession({
    pendingTests: {
      apiOne: [
        "/pending/test/test1.https.html",
        "/pending/test/test2.manual.html",
        "/pending/test/test3.html",
        "/pending/test/test4.https.html",
        "/pending/test/test5.html",
        "/pending/test/test6.manual.html",
        "/pending/test/test7.html"
      ],
      apiTwo: [],
      apiThree: []
    }
  });
  const testManager = new TestManager();

  let test = "";

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.stringContaining("manual"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.stringContaining("manual"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.not.stringContaining("https"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.not.stringContaining("https"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.not.stringContaining("https"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.stringContaining("https"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.stringContaining("https"));
});

test("Get manual http first, manual https seconds, http third and https fourth.", () => {
  const session = createMockingSession({
    pendingTests: {
      apiOne: [
        // 2 of each combination
        "/pending/test/test1.https.html",
        "/pending/test/test2.manual.https.html",
        "/pending/test/test3.html",
        "/pending/test/test4.manual.html",
        "/pending/test/test5.html",
        "/pending/test/test6.https.html",
        "/pending/test/test7.manual.https.html",
        "/pending/test/test8.manual.html"
      ],
      apiTwo: [],
      apiThree: []
    }
  });
  const testManager = new TestManager();

  let test = "";

  // 2x manual + http
  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.stringContaining("manual"));
  expect(test).toEqual(expect.not.stringContaining("https"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.stringContaining("manual"));
  expect(test).toEqual(expect.not.stringContaining("https"));

  // 2x manual + https
  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.stringContaining("manual"));
  expect(test).toEqual(expect.stringContaining("https"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.stringContaining("manual"));
  expect(test).toEqual(expect.stringContaining("https"));

  // 2x automatic + http
  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.not.stringContaining("https"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.not.stringContaining("https"));

  // 2x automatic + https
  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.stringContaining("https"));

  test = testManager.nextTest({ session });
  expect(test).toEqual(expect.not.stringContaining("manual"));
  expect(test).toEqual(expect.stringContaining("https"));
});

test("Getting next test should put it on the running list and remove it from the pending list of the session instance.", () => {
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

  let pendingTests = null;
  let runningTests = null;

  testManager.nextTest({ session });
  pendingTests = session.getPendingTests();
  runningTests = session.getRunningTests();
  expect(pendingTests).toBeInstanceOf(Object);
  expect(pendingTests).toHaveProperty("apiOne",
    expect.arrayContaining([
      "/apiOne/test/test2.html",
      "/apiOne/test/test3.html",
      "/apiOne/test/test4.html"
    ])
  );
  expect(runningTests).toBeInstanceOf(Object);
  expect(runningTests).toHaveProperty("apiOne",
    expect.arrayContaining(["/apiOne/test/test1.html"])
  );

  testManager.nextTest({ session });
  pendingTests = session.getPendingTests();
  runningTests = session.getRunningTests();
  expect(pendingTests).toBeInstanceOf(Object);
  expect(pendingTests).toHaveProperty("apiOne",
    expect.arrayContaining([
      "/apiOne/test/test3.html",
      "/apiOne/test/test4.html"
    ])
  );
  expect(runningTests).toBeInstanceOf(Object);
  expect(runningTests).toHaveProperty("apiOne",
    expect.arrayContaining([
      "/apiOne/test/test1.html",
      "/apiOne/test/test2.html"
    ])
  );

  testManager.nextTest({ session });
  pendingTests = session.getPendingTests();
  runningTests = session.getRunningTests();
  expect(pendingTests).toBeInstanceOf(Object);
  expect(pendingTests).toHaveProperty("apiOne",
    expect.arrayContaining(["/apiOne/test/test4.html"])
  );
  expect(runningTests).toBeInstanceOf(Object);
  expect(runningTests).toHaveProperty("apiOne",
    expect.arrayContaining([
      "/apiOne/test/test1.html",
      "/apiOne/test/test2.html",
      "/apiOne/test/test3.html"
    ])
  );
});

test("Timeout function gets called on next test with correct parameters.", async () => {
  const session = createMockingSession({
    token: "test_token",
    testTimeout: 500,
    pendingTests: { apiOne: ["test/test.html"] }
  });
  const testManager = new TestManager();

  let timeoutId = null;
  const wasCalled = await new Promise(resolve => {
    testManager.nextTest({
      session,
      onTimeout: (token, test) => {
        expect(token).toBe("test_token");
        expect(test).toBe("test/test.html");
        resolve(true);
      }
    });
    timeoutId = setTimeout(() => resolve(false), 700);
  });
  clearTimeout(timeoutId);

  expect(wasCalled).toBe(true);
});

test("Completing test removes it from running tests and adds it to completed tests list.", () => {
  const session = createMockingSession({
    runningTests: {
      apiOne: ["apiOne/one.html", "apiOne/two.html", "apiOne/three.html"]
    },
    completedTests: {}
  });
  const testManager = new TestManager();

  let runningTests = null;
  let completedTests = null;

  testManager.completeTest({ session, test: "apiOne/one.html" });
  runningTests = session.getRunningTests();
  completedTests = session.getCompletedTests();
  expect(runningTests).toBeInstanceOf(Object);
  expect(runningTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["apiOne/two.html", "apiOne/three.html"])
  );
  expect(completedTests).toBeInstanceOf(Object);
  expect(completedTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["apiOne/one.html"])
  );

  testManager.completeTest({ session, test: "apiOne/two.html" });
  runningTests = session.getRunningTests();
  completedTests = session.getCompletedTests();
  expect(runningTests).toBeInstanceOf(Object);
  expect(runningTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["apiOne/three.html"])
  );
  expect(completedTests).toBeInstanceOf(Object);
  expect(completedTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining(["apiOne/one.html", "apiOne/two.html"])
  );

  testManager.completeTest({ session, test: "apiOne/three.html" });
  runningTests = session.getRunningTests();
  completedTests = session.getCompletedTests();
  expect(runningTests).toBeInstanceOf(Object);
  expect(runningTests).toHaveProperty("apiOne", expect.arrayContaining([]));
  expect(completedTests).toBeInstanceOf(Object);
  expect(completedTests).toHaveProperty(
    "apiOne",
    expect.arrayContaining([
      "apiOne/one.html",
      "apiOne/two.html",
      "apiOne/three.html"
    ])
  );
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
