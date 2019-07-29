const Serializer = require("../../src/utils/serializer");
const Session = require("../../src/data/session");

test("Turn a session instance into a plain javascript object.", () => {
  const session = new Session("test_token", {
    path: "/path/one,/path/two",
    types: ["TEST_HARNESS", "MANUAL"],
    userAgent: "Some user agent string",
    pendingTests: {
      apiOne: [
        "/pending/test/one.html",
        "/pending/test/two.html",
        "/pending/test/three.html"
      ],
      apiTwo: [],
      apiThree: []
    },
    runningTests: {
      apiOne: [],
      apiTwo: [
        "/running/test/one.html",
        "/running/test/two.html",
        "/running/test/three.html"
      ],
      apiThree: []
    },
    completedTests: {
      apiOne: [],
      apiTwo: [],
      apiThree: [
        "/completed/test/one.html",
        "/completed/test/two.html",
        "/completed/test/three.html"
      ]
    },
    testTimeout: 30000,
    status: "running",
    testFilesCount: 9,
    testFilesCompleted: 3,
    dateStarted: 654346464,
    dateFinished: null,
    isPublic: false,
    referenceTokens: ["reference_token_one", "reference_token_two"]
  });

  const object = Serializer.serializeSession(session);

  expect(object).toBeInstanceOf(Object);
  expect(object).toHaveProperty("token", "test_token");
  expect(object).toHaveProperty("path", "/path/one,/path/two");
  expect(object).toHaveProperty("types", ["TEST_HARNESS", "MANUAL"]);
  expect(object).toHaveProperty("user_agent", "Some user agent string");
  expect(object).toHaveProperty("pending_tests", {
    apiOne: [
      "/pending/test/one.html",
      "/pending/test/two.html",
      "/pending/test/three.html"
    ],
    apiTwo: [],
    apiThree: []
  });
  expect(object).toHaveProperty("running_tests", {
    apiOne: [],
    apiTwo: [
      "/running/test/one.html",
      "/running/test/two.html",
      "/running/test/three.html"
    ],
    apiThree: []
  });
  expect(object).toHaveProperty("completed_tests", {
    apiOne: [],
    apiTwo: [],
    apiThree: [
      "/completed/test/one.html",
      "/completed/test/two.html",
      "/completed/test/three.html"
    ]
  });
  expect(object).toHaveProperty("test_timeout", 30000);
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
});

test("Turn multiple session instances into an array of plain javascript objects.", () => {
  const sessions = [
    new Session("test_token1", {
      path: "/path/one,/path/two",
      types: ["TEST_HARNESS", "MANUAL"],
      userAgent: "Some user agent string",
      pendingTests: {
        apiOne: [
          "/pending/test/one.html",
          "/pending/test/two.html",
          "/pending/test/three.html"
        ],
        apiTwo: [],
        apiThree: []
      },
      runningTests: {
        apiOne: [],
        apiTwo: [
          "/running/test/one.html",
          "/running/test/two.html",
          "/running/test/three.html"
        ],
        apiThree: []
      },
      completedTests: {
        apiOne: [],
        apiTwo: [],
        apiThree: [
          "/completed/test/one.html",
          "/completed/test/two.html",
          "/completed/test/three.html"
        ]
      },
      testTimeout: 30000,
      status: "running",
      testFilesCount: 9,
      testFilesCompleted: 3,
      dateStarted: 654346464,
      dateFinished: null,
      isPublic: false,
      referenceTokens: ["reference_token_one", "reference_token_two"]
    }),
    new Session("test_token2", {
      path: "/path/one,/path/two",
      types: ["TEST_HARNESS", "MANUAL"],
      userAgent: "Some user agent string",
      pendingTests: {
        apiOne: [
          "/pending/test/one.html",
          "/pending/test/two.html",
          "/pending/test/three.html"
        ],
        apiTwo: [],
        apiThree: []
      },
      runningTests: {
        apiOne: [],
        apiTwo: [
          "/running/test/one.html",
          "/running/test/two.html",
          "/running/test/three.html"
        ],
        apiThree: []
      },
      completedTests: {
        apiOne: [],
        apiTwo: [],
        apiThree: [
          "/completed/test/one.html",
          "/completed/test/two.html",
          "/completed/test/three.html"
        ]
      },
      testTimeout: 30000,
      status: "running",
      testFilesCount: 9,
      testFilesCompleted: 3,
      dateStarted: 654346464,
      dateFinished: null,
      isPublic: false,
      referenceTokens: ["reference_token_one", "reference_token_two"]
    })
  ];

  const objects = Serializer.serializeSessions(sessions);

  expect(objects).toBeInstanceOf(Array);

  for (let i = 1; i <= 2; i++) {
    const object = objects[i - 1];
    expect(object).toHaveProperty("token", "test_token" + i);
    expect(object).toHaveProperty("path", "/path/one,/path/two");
    expect(object).toHaveProperty("types", ["TEST_HARNESS", "MANUAL"]);
    expect(object).toHaveProperty("user_agent", "Some user agent string");
    expect(object).toHaveProperty("pending_tests", {
      apiOne: [
        "/pending/test/one.html",
        "/pending/test/two.html",
        "/pending/test/three.html"
      ],
      apiTwo: [],
      apiThree: []
    });
    expect(object).toHaveProperty("running_tests", {
      apiOne: [],
      apiTwo: [
        "/running/test/one.html",
        "/running/test/two.html",
        "/running/test/three.html"
      ],
      apiThree: []
    });
    expect(object).toHaveProperty("completed_tests", {
      apiOne: [],
      apiTwo: [],
      apiThree: [
        "/completed/test/one.html",
        "/completed/test/two.html",
        "/completed/test/three.html"
      ]
    });
    expect(object).toHaveProperty("test_timeout", 30000);
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
  }
});
