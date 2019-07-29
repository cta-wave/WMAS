const Deserializer = require("../../src/utils/deserializer");
const Session = require("../../src/data/session");

test("Turn a plain javascript object into a session instance.", () => {
  const object = {
    token: "test_token",
    path: "/path/one,/path/two",
    types: ["TEST_HARNESS", "MANUAL"],
    user_agent: "Some user agent string",
    test_timeout: 30000,
    test_files_count: 9,
    test_files_completed: 3,
    pending_tests: {
      apiOne: [
        "/pending/test/one.html",
        "/pending/test/two.html",
        "/pending/test/three.html"
      ],
      apiTwo: [],
      apiThree: []
    },
    running_tests: {
      apiOne: [],
      apiTwo: [
        "/running/test/one.html",
        "/running/test/two.html",
        "/running/test/three.html"
      ],
      apiThree: []
    },
    completed_tests: {
      apiOne: [],
      apiTwo: [],
      apiThree: [
        "/completed/test/one.html",
        "/completed/test/two.html",
        "/completed/test/three.html"
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
  expect(session.getPath()).toBe("/path/one,/path/two");
  expect(session.getTypes()).toStrictEqual(["TEST_HARNESS", "MANUAL"]);
  expect(session.getUserAgent()).toBe("Some user agent string");
  expect(session.getTestTimeout()).toBe(30000);
  expect(session.getTestFilesCount()).toBe(9);
  expect(session.getTestFilesCompleted()).toBe(3);
  expect(session.getPendingTests()).toStrictEqual({
    apiOne: [
      "/pending/test/one.html",
      "/pending/test/two.html",
      "/pending/test/three.html"
    ],
    apiTwo: [],
    apiThree: []
  });
  expect(session.getRunningTests()).toStrictEqual({
    apiOne: [],
    apiTwo: [
      "/running/test/one.html",
      "/running/test/two.html",
      "/running/test/three.html"
    ],
    apiThree: []
  });
  expect(session.getCompletedTests()).toStrictEqual({
    apiOne: [],
    apiTwo: [],
    apiThree: [
      "/completed/test/one.html",
      "/completed/test/two.html",
      "/completed/test/three.html"
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
  const objects = [
    {
      token: "test_token1",
      path: "/path/one,/path/two",
      types: ["TEST_HARNESS", "MANUAL"],
      user_agent: "Some user agent string",
      test_timeout: 30000,
      test_files_count: 9,
      test_files_completed: 3,
      pending_tests: {
        apiOne: [
          "/pending/test/one.html",
          "/pending/test/two.html",
          "/pending/test/three.html"
        ],
        apiTwo: [],
        apiThree: []
      },
      running_tests: {
        apiOne: [],
        apiTwo: [
          "/running/test/one.html",
          "/running/test/two.html",
          "/running/test/three.html"
        ],
        apiThree: []
      },
      completed_tests: {
        apiOne: [],
        apiTwo: [],
        apiThree: [
          "/completed/test/one.html",
          "/completed/test/two.html",
          "/completed/test/three.html"
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
    },
    {
      token: "test_token2",
      path: "/path/one,/path/two",
      types: ["TEST_HARNESS", "MANUAL"],
      user_agent: "Some user agent string",
      test_timeout: 30000,
      test_files_count: 9,
      test_files_completed: 3,
      pending_tests: {
        apiOne: [
          "/pending/test/one.html",
          "/pending/test/two.html",
          "/pending/test/three.html"
        ],
        apiTwo: [],
        apiThree: []
      },
      running_tests: {
        apiOne: [],
        apiTwo: [
          "/running/test/one.html",
          "/running/test/two.html",
          "/running/test/three.html"
        ],
        apiThree: []
      },
      completed_tests: {
        apiOne: [],
        apiTwo: [],
        apiThree: [
          "/completed/test/one.html",
          "/completed/test/two.html",
          "/completed/test/three.html"
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
    }
  ];

  const sessions = Deserializer.deserializeSessions(objects);

  expect(sessions).toBeInstanceOf(Array);
  for (let i = 1; i <= 2; i++) {
    const session = sessions[i - 1];
    expect(session).toBeInstanceOf(Session);
    expect(session.getToken()).toBe("test_token" + i);
    expect(session.getPath()).toBe("/path/one,/path/two");
    expect(session.getTypes()).toStrictEqual(["TEST_HARNESS", "MANUAL"]);
    expect(session.getUserAgent()).toBe("Some user agent string");
    expect(session.getTestTimeout()).toBe(30000);
    expect(session.getTestFilesCount()).toBe(9);
    expect(session.getTestFilesCompleted()).toBe(3);
    expect(session.getPendingTests()).toStrictEqual({
      apiOne: [
        "/pending/test/one.html",
        "/pending/test/two.html",
        "/pending/test/three.html"
      ],
      apiTwo: [],
      apiThree: []
    });
    expect(session.getRunningTests()).toStrictEqual({
      apiOne: [],
      apiTwo: [
        "/running/test/one.html",
        "/running/test/two.html",
        "/running/test/three.html"
      ],
      apiThree: []
    });
    expect(session.getCompletedTests()).toStrictEqual({
      apiOne: [],
      apiTwo: [],
      apiThree: [
        "/completed/test/one.html",
        "/completed/test/two.html",
        "/completed/test/three.html"
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
    expect(session.getBrowser()).toHaveProperty("name", "Other")
    expect(session.getBrowser()).toHaveProperty("version", "0")
  }
});
