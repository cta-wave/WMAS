const Serializer = require("../../src/utils/serializer");
const Session = require("../../src/data/session");

test("Turn a session instance into a plain javascript object.", () => {
  const session = new Session("test_token", {
    tests: { include: ["/apiOne", "/apiTwo"], exclude: ["/apiTwo/sub"] },
    types: ["TEST_HARNESS", "MANUAL"],
    userAgent: "Some user agent string",
    pendingTests: {
      apiOne: [
        "/apiOne/test/one.html",
        "/apiOne/test/two.html",
        "/apiOne/test/three.html"
      ],
      apiTwo: [],
      apiThree: []
    },
    runningTests: {
      apiOne: [],
      apiTwo: [
        "/apiTwo/test/one.html",
        "/apiTwo/test/two.html",
        "/apiTwo/test/three.html"
      ],
      apiThree: []
    },
    completedTests: {
      apiOne: [],
      apiTwo: [],
      apiThree: [
        "/apiThree/test/one.html",
        "/apiThree/test/two.html",
        "/apiThree/test/three.html"
      ]
    },
    timeouts: { automatic: 60000, manual: 300000 },
    status: "running",
    testFilesCount: 9,
    testFilesCompleted: 3,
    dateStarted: 654346464,
    dateFinished: null,
    isPublic: false,
    browser: { name: "Mocking Browser", version: "1.0" },
    referenceTokens: ["reference_token_one", "reference_token_two"],
    malfunctioningTests: ["/apiOne/test/one.html", "/apiOne/test/two.html"]
  });

  const object = Serializer.serializeSession(session);

  expect(object).toBeInstanceOf(Object);
  expect(object).toHaveProperty("token", "test_token");
  const tests = object.tests;
  expect(tests).toBeInstanceOf(Object);
  expect(tests).toHaveProperty("include");
  expect(tests.include).toBeInstanceOf(Array);
  expect(tests.include).toContain("/apiOne");
  expect(tests.include).toContain("/apiTwo");
  expect(tests.exclude).toBeInstanceOf(Array);
  expect(tests.exclude).toContain("/apiTwo/sub");
  expect(object).toHaveProperty("types", ["TEST_HARNESS", "MANUAL"]);
  expect(object).toHaveProperty("user_agent", "Some user agent string");
  expect(object).toHaveProperty("pending_tests", {
    apiOne: [
      "/apiOne/test/one.html",
      "/apiOne/test/two.html",
      "/apiOne/test/three.html"
    ],
    apiTwo: [],
    apiThree: []
  });
  expect(object).toHaveProperty("running_tests", {
    apiOne: [],
    apiTwo: [
      "/apiTwo/test/one.html",
      "/apiTwo/test/two.html",
      "/apiTwo/test/three.html"
    ],
    apiThree: []
  });
  expect(object).toHaveProperty("completed_tests", {
    apiOne: [],
    apiTwo: [],
    apiThree: [
      "/apiThree/test/one.html",
      "/apiThree/test/two.html",
      "/apiThree/test/three.html"
    ]
  });
  const timeouts = object.timeouts;
  expect(timeouts).toBeInstanceOf(Object);
  expect(timeouts).toHaveProperty("automatic");
  expect(timeouts.automatic).toBe(60000);
  expect(timeouts).toHaveProperty("manual");
  expect(object).toHaveProperty("status", "running");
  expect(object).toHaveProperty("browser");
  expect(object.browser).toHaveProperty("name");
  expect(object.browser).toHaveProperty("version");
  expect(object).toHaveProperty("test_files_count", 9);
  expect(object).toHaveProperty("test_files_completed", 3);
  expect(object).toHaveProperty("date_started", 654346464);
  expect(object).toHaveProperty("date_finished", null);
  expect(object).toHaveProperty("is_public", false);
  expect(object).toHaveProperty("reference_tokens", [
    "reference_token_one",
    "reference_token_two"
  ]);
  expect(object).toHaveProperty("malfunctioning_tests", [
    "/apiOne/test/one.html",
    "/apiOne/test/two.html"
  ]);
});

test("Turn multiple session instances into an array of plain javascript objects.", () => {
  const sessions = [];

  for (let i = 0; i < 2; i++) {
    sessions.push(
      new Session("test_token" + i, {
        tests: { include: ["/apiOne", "/apiTwo"], exclude: ["/apiTwo/sub"] },
        types: ["TEST_HARNESS", "MANUAL"],
        userAgent: "Some user agent string",
        pendingTests: {
          apiOne: [
            "/apiOne/test/one.html",
            "/apiOne/test/two.html",
            "/apiOne/test/three.html"
          ],
          apiTwo: [],
          apiThree: []
        },
        runningTests: {
          apiOne: [],
          apiTwo: [
            "/apiTwo/test/one.html",
            "/apiTwo/test/two.html",
            "/apiTwo/test/three.html"
          ],
          apiThree: []
        },
        completedTests: {
          apiOne: [],
          apiTwo: [],
          apiThree: [
            "/apiThree/test/one.html",
            "/apiThree/test/two.html",
            "/apiThree/test/three.html"
          ]
        },
        timeouts: { automatic: 60000, manual: 300000 },
        status: "running",
        testFilesCount: 9,
        testFilesCompleted: 3,
        dateStarted: 654346464,
        dateFinished: null,
        isPublic: false,
        browser: { name: "Mocking Browser", version: "1.0" },
        referenceTokens: ["reference_token_one", "reference_token_two"],
        malfunctioningTests: ["/apiOne/test/one.html", "/apiOne/test/two.html"]
      })
    );
  }

  const objects = Serializer.serializeSessions(sessions);

  expect(objects).toBeInstanceOf(Array);

  for (let i = 0; i < 2; i++) {
    const object = objects[i];

    expect(object).toBeInstanceOf(Object);
    expect(object).toHaveProperty("token", "test_token" + i);
    const tests = object.tests;
    expect(tests).toBeInstanceOf(Object);
    expect(tests).toHaveProperty("include");
    expect(tests.include).toBeInstanceOf(Array);
    expect(tests.include).toContain("/apiOne");
    expect(tests.include).toContain("/apiTwo");
    expect(tests.exclude).toBeInstanceOf(Array);
    expect(tests.exclude).toContain("/apiTwo/sub");
    expect(object).toHaveProperty("types", ["TEST_HARNESS", "MANUAL"]);
    expect(object).toHaveProperty("user_agent", "Some user agent string");
    expect(object).toHaveProperty("pending_tests", {
      apiOne: [
        "/apiOne/test/one.html",
        "/apiOne/test/two.html",
        "/apiOne/test/three.html"
      ],
      apiTwo: [],
      apiThree: []
    });
    expect(object).toHaveProperty("running_tests", {
      apiOne: [],
      apiTwo: [
        "/apiTwo/test/one.html",
        "/apiTwo/test/two.html",
        "/apiTwo/test/three.html"
      ],
      apiThree: []
    });
    expect(object).toHaveProperty("completed_tests", {
      apiOne: [],
      apiTwo: [],
      apiThree: [
        "/apiThree/test/one.html",
        "/apiThree/test/two.html",
        "/apiThree/test/three.html"
      ]
    });
    const timeouts = object.timeouts;
    expect(timeouts).toBeInstanceOf(Object);
    expect(timeouts).toHaveProperty("automatic");
    expect(timeouts.automatic).toBe(60000);
    expect(timeouts).toHaveProperty("manual");
    expect(object).toHaveProperty("status", "running");
    expect(object).toHaveProperty("browser");
    expect(object.browser).toHaveProperty("name");
    expect(object.browser).toHaveProperty("version");
    expect(object).toHaveProperty("test_files_count", 9);
    expect(object).toHaveProperty("test_files_completed", 3);
    expect(object).toHaveProperty("date_started", 654346464);
    expect(object).toHaveProperty("date_finished", null);
    expect(object).toHaveProperty("is_public", false);
    expect(object).toHaveProperty("reference_tokens", [
      "reference_token_one",
      "reference_token_two"
    ]);
    expect(object).toHaveProperty("malfunctioning_tests", [
      "/apiOne/test/one.html",
      "/apiOne/test/two.html"
    ]);
  }
});
