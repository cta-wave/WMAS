const Deserializer = require("../../src/utils/deserializer");
const Session = require("../../src/data/session");

test("Turn a plain javascript object into a session instance.", () => {
  const object = {
    token: "test_token",
    tests: { include: ["/apiOne", "/apiTwo"], exclude: ["/apiTwo/sub"] },
    types: ["TEST_HARNESS", "MANUAL"],
    user_agent: "Some user agent string",
    timeouts: { automatic: 60000, manual: 300000 },
    test_files_count: 9,
    test_files_completed: 3,
    pending_tests: {
      apiOne: [
        "/apiOne/test/one.html",
        "/apiOne/test/two.html",
        "/apiOne/test/three.html"
      ],
      apiTwo: [],
      apiThree: []
    },
    running_tests: {
      apiOne: [],
      apiTwo: [
        "/apiTwo/test/one.html",
        "/apiTwo/test/two.html",
        "/apiTwo/test/three.html"
      ],
      apiThree: []
    },
    completed_tests: {
      apiOne: [],
      apiTwo: [],
      apiThree: [
        "/apiThree/test/one.html",
        "/apiThree/test/two.html",
        "/apiThree/test/three.html"
      ]
    },
    status: "running",
    browser: {
      name: "Other",
      version: "0"
    },
    date_started: 654346464,
    date_finished: null,
    is_public: false,
    reference_tokens: ["reference_token_one", "reference_token_two"]
  };

  const session = Deserializer.deserializeSession(object);

  expect(session).toBeInstanceOf(Session);
  expect(session.getToken()).toBe("test_token");
  const tests = session.getTests();
  expect(tests).toBeInstanceOf(Object);
  expect(tests).toHaveProperty("include");
  expect(tests.include).toBeInstanceOf(Array);
  expect(tests.include).toContain("/apiOne");
  expect(tests.include).toContain("/apiTwo");
  expect(tests.exclude).toBeInstanceOf(Array);
  expect(tests.exclude).toContain("/apiTwo/sub");
  expect(session.getTypes()).toStrictEqual(["TEST_HARNESS", "MANUAL"]);
  expect(session.getUserAgent()).toBe("Some user agent string");
  const timeouts = session.getTimeouts();
  expect(timeouts).toBeInstanceOf(Object);
  expect(timeouts).toHaveProperty("automatic");
  expect(timeouts.automatic).toBe(60000);
  expect(timeouts).toHaveProperty("manual");
  expect(timeouts.manual).toBe(300000);
  expect(session.getTestFilesCount()).toBe(9);
  expect(session.getTestFilesCompleted()).toBe(3);
  expect(session.getPendingTests()).toStrictEqual({
    apiOne: [
      "/apiOne/test/one.html",
      "/apiOne/test/two.html",
      "/apiOne/test/three.html"
    ],
    apiTwo: [],
    apiThree: []
  });
  expect(session.getRunningTests()).toStrictEqual({
    apiOne: [],
    apiTwo: [
      "/apiTwo/test/one.html",
      "/apiTwo/test/two.html",
      "/apiTwo/test/three.html"
    ],
    apiThree: []
  });
  expect(session.getCompletedTests()).toStrictEqual({
    apiOne: [],
    apiTwo: [],
    apiThree: [
      "/apiThree/test/one.html",
      "/apiThree/test/two.html",
      "/apiThree/test/three.html"
    ]
  });
  expect(session.getStatus()).toBe("running");
  expect(session.getDateStarted()).toBe(654346464);
  expect(session.getDateFinished()).toBe(null);
  expect(session.isPublic()).toBe(false);
  expect(session.getReferenceTokens()).toStrictEqual([
    "reference_token_one",
    "reference_token_two"
  ]);
});

test("Turn multiple plain javascript objects into an array of session instances.", () => {
  const objects = [];
  for (let i = 0; i < 2; i++) {
    objects.push({
      token: "test_token" + i,
      tests: { include: ["/apiOne", "/apiTwo"], exclude: ["/apiTwo/sub"] },
      types: ["TEST_HARNESS", "MANUAL"],
      user_agent: "Some user agent string",
      timeouts: { automatic: 60000, manual: 300000 },
      test_files_count: 9,
      test_files_completed: 3,
      pending_tests: {
        apiOne: [
          "/apiOne/test/one.html",
          "/apiOne/test/two.html",
          "/apiOne/test/three.html"
        ],
        apiTwo: [],
        apiThree: []
      },
      running_tests: {
        apiOne: [],
        apiTwo: [
          "/apiTwo/test/one.html",
          "/apiTwo/test/two.html",
          "/apiTwo/test/three.html"
        ],
        apiThree: []
      },
      completed_tests: {
        apiOne: [],
        apiTwo: [],
        apiThree: [
          "/apiThree/test/one.html",
          "/apiThree/test/two.html",
          "/apiThree/test/three.html"
        ]
      },
      status: "running",
      browser: {
        name: "Other",
        version: "0"
      },
      date_started: 654346464,
      date_finished: null,
      is_public: false,
      reference_tokens: ["reference_token_one", "reference_token_two"]
    });
  }

  const sessions = Deserializer.deserializeSessions(objects);

  expect(sessions).toBeInstanceOf(Array);
  for (let i = 0; i < 2; i++) {
    const session = sessions[i];
    expect(session).toBeInstanceOf(Session);
    expect(session.getToken()).toBe("test_token" + i);
    const tests = session.getTests();
    expect(tests).toBeInstanceOf(Object);
    expect(tests).toHaveProperty("include");
    expect(tests.include).toBeInstanceOf(Array);
    expect(tests.include).toContain("/apiOne");
    expect(tests.include).toContain("/apiTwo");
    expect(tests.exclude).toBeInstanceOf(Array);
    expect(tests.exclude).toContain("/apiTwo/sub");
    expect(session.getTypes()).toStrictEqual(["TEST_HARNESS", "MANUAL"]);
    expect(session.getUserAgent()).toBe("Some user agent string");
    const timeouts = session.getTimeouts();
    expect(timeouts).toBeInstanceOf(Object);
    expect(timeouts).toHaveProperty("automatic");
    expect(timeouts.automatic).toBe(60000);
    expect(timeouts).toHaveProperty("manual");
    expect(timeouts.manual).toBe(300000);
    expect(session.getTestFilesCount()).toBe(9);
    expect(session.getTestFilesCompleted()).toBe(3);
    expect(session.getPendingTests()).toStrictEqual({
      apiOne: [
        "/apiOne/test/one.html",
        "/apiOne/test/two.html",
        "/apiOne/test/three.html"
      ],
      apiTwo: [],
      apiThree: []
    });
    expect(session.getRunningTests()).toStrictEqual({
      apiOne: [],
      apiTwo: [
        "/apiTwo/test/one.html",
        "/apiTwo/test/two.html",
        "/apiTwo/test/three.html"
      ],
      apiThree: []
    });
    expect(session.getCompletedTests()).toStrictEqual({
      apiOne: [],
      apiTwo: [],
      apiThree: [
        "/apiThree/test/one.html",
        "/apiThree/test/two.html",
        "/apiThree/test/three.html"
      ]
    });
    expect(session.getStatus()).toBe("running");
    expect(session.getDateStarted()).toBe(654346464);
    expect(session.getDateFinished()).toBe(null);
    expect(session.isPublic()).toBe(false);
    expect(session.getReferenceTokens()).toStrictEqual([
      "reference_token_one",
      "reference_token_two"
    ]);
  }
});
