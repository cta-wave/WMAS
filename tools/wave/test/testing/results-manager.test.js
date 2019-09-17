const path = require("path");
const JSZip = require("jszip");

const ResultsManager = require("../../src/testing/results-manager");
const Session = require("../../src/data/session");
const FileSystem = require("../../src/utils/file-system");
const TestManager = require("../../src/testing/test-manager");
const WptReport = require("../../src/utils/wpt-report");
const Serializer = require("../../src/utils/serializer");
const DuplicateError = require("../../src/data/errors/duplicate-error");
const PermissionDeniedError = require("../../src/data/errors/permission-denied-error");
const InvalidDataError = require("../../src/data/errors/invalid-data-error");

const mockingResults = createMockingResults();

test("createResult() doesn't do anything if token is invalid", async () => {
  let isCompleteTestCalled = false;
  let isCreateResultCalled = false;
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    sessionManager: { readSession: async () => {} },
    testManager: {
      completeTest: async () => {
        isCompleteTestCalled = true;
      }
    },
    database: {
      createResult: async () => {
        isCreateResultCalled = true;
      }
    }
  });

  await resultsManager.createResult({
    token: "abc",
    data: mockingResults.apiOne[0]
  });
  expect(isCompleteTestCalled).toBe(false);
  expect(isCreateResultCalled).toBe(false);
});

test("createResult() calls testManager.completeTest()", async () => {
  let isCompleteTestCalled = false;
  const session = createMockingSession({
    runningTests: { apiOne: [mockingResults.apiOne[0].test] }
  });
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    sessionManager: { readSession: async () => session },
    testManager: {
      completeTest: async () => {
        isCompleteTestCalled = true;
      }
    },
    database: { createResult: async () => {} }
  });

  await resultsManager.createResult({
    token: session.getToken(),
    data: mockingResults.apiOne[0]
  });
  expect(isCompleteTestCalled).toBe(true);
});

test("createResult() calls database.createResult", async () => {
  let isCreateResultCalled = false;
  const session = createMockingSession({
    runningTests: { apiOne: [mockingResults.apiOne[0].test] }
  });
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    sessionManager: { readSession: async () => session },
    testManager: { completeTest: async () => {} },
    database: {
      createResult: async () => {
        isCreateResultCalled = true;
      }
    }
  });

  await resultsManager.createResult({
    token: session.getToken(),
    data: mockingResults.apiOne[0]
  });
  expect(isCreateResultCalled).toBe(true);
});

test("createResult() calls resultManager.saveApiResults if the tests api is complete", async () => {
  let isSaveApiResultsCalled = false;
  const session = createMockingSession({
    pendingTests: { apiTwo: ["/apiTwo/random/test.html"] },
    runningTests: { apiOne: [mockingResults.apiOne[0].test] },
    completedTests: {},
    testFilesCount: { apiOne: 1, apiTwo: 1 }
  });
  const testManager = new TestManager();
  testManager.initialize({
    sessionManager: { updateTests: async () => {} }
  });
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    sessionManager: { readSession: async () => session },
    testManager,
    database: { createResult: async () => {} }
  });
  resultsManager.saveApiResults = async () => {
    isSaveApiResultsCalled = true;
  };
  resultsManager.generateReport = async () => {};

  await resultsManager.createResult({
    token: session.getToken(),
    data: mockingResults.apiOne[0]
  });
  expect(isSaveApiResultsCalled).toBe(true);
});

test("createResult() calls resultManager.generateReport if the tests api is complete", async () => {
  let isGenerateReportCalled = false;
  const session = createMockingSession({
    pendingTests: { apiTwo: ["/apiTwo/random/test.html"] },
    runningTests: { apiOne: [mockingResults.apiOne[0].test] },
    completedTests: {},
    testFilesCount: { apiOne: 1, apiTwo: 1 }
  });
  const testManager = new TestManager();
  testManager.initialize({
    sessionManager: { updateTests: async () => {} }
  });
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    sessionManager: { readSession: async () => session },
    testManager,
    database: { createResult: async () => {} }
  });
  resultsManager.saveApiResults = async () => {};
  resultsManager.generateReport = async () => {
    isGenerateReportCalled = true;
  };

  await resultsManager.createResult({
    token: session.getToken(),
    data: mockingResults.apiOne[0]
  });
  expect(isGenerateReportCalled).toBe(true);
});

test("createResult() calls sessionManager.completeSession() if all apis in session are complete", async () => {
  let isCompleteSessionCalled = false;
  const session = createMockingSession({
    pendingTests: {},
    runningTests: { apiOne: [mockingResults.apiOne[0].test] },
    completedTests: {},
    testFilesCount: { apiOne: 1 }
  });
  const testManager = new TestManager();
  testManager.initialize({
    sessionManager: { updateTests: async () => {} }
  });
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    sessionManager: {
      readSession: async () => session,
      completeSession: async () => {
        isCompleteSessionCalled = true;
      }
    },
    testManager,
    database: { createResult: async () => {} }
  });
  resultsManager.saveApiResults = async () => {};
  resultsManager.generateReport = async () => {};
  resultsManager.createInfoFile = async () => {};

  await resultsManager.createResult({
    token: session.getToken(),
    data: mockingResults.apiOne[0]
  });
  expect(isCompleteSessionCalled).toBe(true);
});

test("createResult() calls resultManager.createInfoFile() if all apis in session are complete", async () => {
  let isCreateInfoFileCalled = false;
  const session = createMockingSession({
    pendingTests: {},
    runningTests: { apiOne: [mockingResults.apiOne[0].test] },
    completedTests: {},
    testFilesCount: { apiOne: 1 }
  });
  const testManager = new TestManager();
  testManager.initialize({
    sessionManager: { updateTests: async () => {} }
  });
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    sessionManager: {
      readSession: async () => session,
      completeSession: async () => {}
    },
    testManager,
    database: { createResult: async () => {} }
  });
  resultsManager.saveApiResults = async () => {};
  resultsManager.generateReport = async () => {};
  resultsManager.createInfoFile = async () => {
    isCreateInfoFileCalled = true;
  };

  await resultsManager.createResult({
    token: session.getToken(),
    data: mockingResults.apiOne[0]
  });
  expect(isCreateInfoFileCalled).toBe(true);
});

test("readResults() returns all results of session, divided into their respective apis", async () => {
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    database: {
      readResults: async () => [
        ...mockingResults.apiOne,
        ...mockingResults.apiTwo
      ]
    }
  });

  const results = await resultsManager.readResults();
  expect(results).toBeInstanceOf(Object);
  expect(Object.keys(results)).toHaveLength(2);
  expect(results).toHaveProperty("apiOne");
  expect(results.apiOne).toBeInstanceOf(Array);
  expect(results.apiOne).toHaveLength(mockingResults.apiOne.length);
  expect(results).toHaveProperty("apiTwo");
  expect(results.apiTwo).toBeInstanceOf(Array);
  expect(results.apiTwo).toHaveLength(mockingResults.apiTwo.length);
});

test("readResults() calls database.readResults()", async () => {
  let isReadResultsCalled = false;
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    database: {
      readResults: async () => {
        isReadResultsCalled = true;
        return [...mockingResults.apiOne, ...mockingResults.apiTwo];
      }
    }
  });

  const results = await resultsManager.readResults();
  expect(isReadResultsCalled).toBe(true);
});

test("readResults() returns only tests under the specified filterPath", async () => {
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    database: {
      readResults: async () => [
        ...mockingResults.apiOne,
        ...mockingResults.apiTwo
      ]
    }
  });

  const results = await resultsManager.readResults("abc", "/apiOne");
  expect(results).toBeInstanceOf(Object);
  expect(Object.keys(results)).toHaveLength(1);
  expect(results).toHaveProperty("apiOne");
  expect(results.apiOne).toBeInstanceOf(Array);
  expect(results.apiOne).toHaveLength(mockingResults.apiOne.length);
  expect(results).not.toHaveProperty("apiTwo");
});

test("readFlattenedResults() returns the count of passed, failed, timed out and not run result per api of a session", async () => {
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    database: {
      readResults: async () => [
        ...mockingResults.apiOne,
        ...mockingResults.apiTwo
      ]
    }
  });

  const flattenedResults = await resultsManager.readFlattenedResults();
  expect(flattenedResults).toBeInstanceOf(Object);
  expect(Object.keys(flattenedResults)).toHaveLength(2);
  expect(flattenedResults).toHaveProperty("apiOne");
  expect(flattenedResults.apiOne).toBeInstanceOf(Object);
  expect(flattenedResults.apiOne).toHaveProperty("pass");
  expect(flattenedResults.apiOne).toHaveProperty("fail");
  expect(flattenedResults.apiOne).toHaveProperty("timeout");
  expect(flattenedResults.apiOne).toHaveProperty("not_run");
  expect(flattenedResults).toHaveProperty("apiTwo");
  expect(flattenedResults.apiTwo).toBeInstanceOf(Object);
  expect(flattenedResults.apiTwo).toHaveProperty("pass");
  expect(flattenedResults.apiTwo).toHaveProperty("fail");
  expect(flattenedResults.apiTwo).toHaveProperty("timeout");
  expect(flattenedResults.apiTwo).toHaveProperty("not_run");
});

test("deleteResults() removes the results directory of a specific session", async () => {
  let isRemoveDirectoryCalled = false;
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    sessionManager: {
      readSession: async () => ({ getUserAgent: () => "some user agent" })
    }
  });

  resultsManager.readResults = async () => ({ apiOne: "all_results" });
  resultsManager._ensureResultsDirectoryExistence = async () => {};

  FileSystem.removeDirectory = async resultDirectoryPath => {
    isRemoveDirectoryCalled = true;
    const pathParts = resultDirectoryPath.split("/");
    expect(pathParts.pop()).toBe("token_abc");
  };

  FileSystem.exists = async () => true;

  await resultsManager.deleteResults("token_abc");
  expect(isRemoveDirectoryCalled).toBe(true);
});

test("getJsonPath() returns the path to an apis result of a specific session", async () => {
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    sessionManager: {
      readSession: async () => ({ getUserAgent: () => "some user agent" })
    }
  });

  const path = await resultsManager.getJsonPath({
    token: "token_abc",
    api: "apiOne"
  });
  pathParts = path.split("/");
  expect(pathParts.pop()).toBe("Xx00.json");
  expect(pathParts.pop()).toBe("apiOne");
  expect(pathParts.pop()).toBe("token_abc");
});

test("saveApiResults() persists results of a specific api as json file in the session results directory", async () => {
  let isWriteFileCalled = false;
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    sessionManager: {
      readSession: async () => ({ getUserAgent: () => "some user agent" })
    }
  });

  resultsManager.readResults = async () => ({ apiOne: "all_results" });
  resultsManager._ensureResultsDirectoryExistence = async () => {};

  FileSystem.writeFile = async (filePath, data) => {
    isWriteFileCalled = true;
    expect(filePath).toBe(
      await resultsManager.getJsonPath({ token: "token_abc", api: "apiOne" })
    );
    expect(data).toBe(JSON.stringify({ results: "all_results" }, null, 2));
  };

  await resultsManager.saveApiResults({ token: "token_abc", api: "apiOne" });
  expect(isWriteFileCalled).toBe(true);
});

test("loadResults() performs lookup in database for all results in results directory and loads them if they are not present", async () => {
  let isLoadSessionFromFileCalled = false;
  let isLoadResultCalled = false;
  let isAddSessionCalled = false;
  let isCreateResultCalled = false;
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    sessionManager: {
      readSession: async token => {
        expect(["token_abc", "token_def", "token_ghi"]).toContain(token);
        return false;
      },
      addSession: () => {
        isAddSessionCalled = true;
      }
    },
    database: {
      createResult: async () => {
        isCreateResultCalled = true;
      }
    }
  });
  resultsManager._loadSessionFromInfoFile = async path => {
    isLoadSessionFromFileCalled = true;
    return createMockingSession({ token: path.split("/").pop() });
  };
  resultsManager.loadResult = async () => {
    isLoadResultCalled = true;
    return [...mockingResults.apiOne, ...mockingResults.apiTwo];
  };

  FileSystem.exists = async () => true;
  FileSystem.readDirectory = async () => [
    "token_abc",
    "token_def",
    "token_ghi"
  ];

  await resultsManager.loadResults();

  expect(isLoadSessionFromFileCalled).toBe(true);
  expect(isLoadResultCalled).toBe(true);
  expect(isAddSessionCalled).toBe(true);
  expect(isCreateResultCalled).toBe(true);
});

test("loadResult() loads all results of a session from a directory", async () => {
  let isResultJsonLoaded = false;
  const resultsManager = new ResultsManager();
  resultsManager.initialize();

  FileSystem.readDirectory = async path => {
    if (path === "/path/to/result") {
      return ["apiOne", "apiTwo"];
    }
    return ["EF03.json"];
  };
  FileSystem.stats = async () => ({ isDirectory: () => true });
  FileSystem.readFile = async path => {
    const pathParts = path.split("/");
    pathParts.pop();
    const api = pathParts.pop();
    isResultJsonLoaded = true;
    return JSON.stringify({ results: mockingResults[api] });
  };

  const results = await resultsManager.loadResult("/path/to/result");
  expect(results).toBeInstanceOf(Array);
  expect(results).toHaveLength(
    mockingResults.apiOne.length + mockingResults.apiTwo.length
  );
  expect(isResultJsonLoaded).toBe(true);
});

test("generateReport() triggers wpt report tool to generate a report", async () => {
  let isGenerateReportCalled = false;
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    sessionManager: {
      readSession: async () => ({ getUserAgent: () => "some user agent" })
    }
  });

  const filePath = await resultsManager.getJsonPath({
    token: "token_abc",
    api: "apiOne"
  });
  const dirPath = path.dirname(filePath);

  WptReport.generateReport = async ({
    inputJsonDirectoryPath,
    outputHtmlDirectoryPath,
    specName
  }) => {
    isGenerateReportCalled = true;
    expect(inputJsonDirectoryPath).toBe(dirPath);
    expect(outputHtmlDirectoryPath).toBe(dirPath);
    expect(specName).toBe("apiOne");
  };

  await resultsManager.generateReport({ token: "token_abc", api: "apiOne" });

  expect(isGenerateReportCalled).toBe(true);
});

test("generateMultiReport() triggers wpt report tool to generate a report", async () => {
  let isGenerateReportCalled = false;
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    sessionManager: {
      readSession: async () => ({ getUserAgent: () => "some user agent" })
    }
  });

  FileSystem.exists = async path =>
    path.split("/").pop() === "apiOne" ? false : true;
  FileSystem.makeDirectory = async () => {};

  WptReport.generateMultiReport = async ({
    outputHtmlDirectoryPath,
    specName,
    resultJsonFiles
  }) => {
    isGenerateReportCalled = true;
    expect(typeof outputHtmlDirectoryPath).toBe("string");
    expect(specName).toBe("apiOne");
    expect(resultJsonFiles).toBeInstanceOf(Array);
    for (let file of resultJsonFiles) {
      expect(file).toBeInstanceOf(Object);
      expect(file).toHaveProperty("token");
      expect(file).toHaveProperty("path");
    }
  };

  await resultsManager.generateMultiReport({
    tokens: ["token_abc", "token_def"],
    api: "apiOne"
  });

  expect(isGenerateReportCalled).toBe(true);
});

test("createInfoFile() persists session config and status as a json file in the session result directory", async () => {
  let isWriteFileCalled = false;
  const session = createMockingSession();
  const resultsManager = new ResultsManager();
  resultsManager.initialize();

  FileSystem.writeFile = async (path, data) => {
    const pathParts = path.split("/");
    expect(pathParts.pop()).toBe("info.json");
    expect(pathParts.pop()).toBe(session.getToken());
    const sessionObject = Serializer.serializeSession(session);
    delete sessionObject.running_tests;
    delete sessionObject.pending_tests;
    delete sessionObject.completed_tests;
    expect(data).toBe(JSON.stringify(sessionObject, null, "  "));
    isWriteFileCalled = true;
  };

  await resultsManager.createInfoFile(session);

  expect(isWriteFileCalled).toBe(true);
});

test("importResults() extracts provided ZIP file to results directory", async () => {
  let isWriteFileCalled = false;
  const resultsManager = new ResultsManager();
  await resultsManager.initialize({
    importEnabled: true,
    sessionManager: { readSession: () => null }
  });
  resultsManager.loadResults = () => {};

  const zip = new JSZip();
  zip.file("/info.json", JSON.stringify({ token: "token1" }));
  const blob = await zip.generateAsync({ type: "nodebuffer" });

  FileSystem.makeDirectory = path => {
    expect(path.split("/").pop()).toBe("token1");
  };
  FileSystem.writeFile = (path, data) => {
    expect(path.split("/").pop()).toBe("info.json");
    expect(data).toBe('{"token":"token1"}');
    isWriteFileCalled = true;
  };

  const token = await resultsManager.importResults(blob);
  expect(token).toBe("token1");
  expect(isWriteFileCalled).toBe(true);
});

test("importResults() throws error if session already exists", async () => {
  const resultsManager = new ResultsManager();
  await resultsManager.initialize({
    importEnabled: true,
    sessionManager: { readSession: () => createMockingSession() }
  });

  const zip = new JSZip();
  zip.file("/info.json", JSON.stringify({ token: "token1" }));
  const blob = await zip.generateAsync({ type: "nodebuffer" });

  try {
    await resultsManager.importResults(blob);
  } catch (error) {
    expect(error).toBeInstanceOf(DuplicateError);
  }
});

test("importResults() throws error if import feature disabled", async () => {
  const resultsManager = new ResultsManager();
  await resultsManager.initialize({
    importEnabled: false
  });

  const zip = new JSZip();
  zip.file("/info.json", JSON.stringify({ token: "token1" }));
  const blob = await zip.generateAsync({ type: "nodebuffer" });

  try {
    await resultsManager.importResults(blob);
  } catch (error) {
    expect(error).toBeInstanceOf(PermissionDeniedError);
  }
});

test("importResults() throws error if zip invalid", async () => {
  const resultsManager = new ResultsManager();
  await resultsManager.initialize({
    importEnabled: true
  });

  const zip = new JSZip();
  zip.file("/some.json", JSON.stringify({ some: "value" }));
  const blob = await zip.generateAsync({ type: "nodebuffer" });

  try {
    await resultsManager.importResults(blob);
  } catch (error) {
    expect(error).toBeInstanceOf(InvalidDataError);
  }
});

test("exportResults() returns ZIP file if session is completed", async () => {
  let isReadFileCalled = false;
  const session = createMockingSession({ status: Session.COMPLETED });
  const resultsManager = new ResultsManager();
  await resultsManager.initialize({
    sessionManager: { readSession: () => session }
  });

  FileSystem.readFile = async path => {
    isReadFileCalled = true;
    return "binary";
  };
  FileSystem.stats = () => ({ isDirectory: () => false });
  FileSystem.readDirectory = () => ["file"];

  const blob = await resultsManager.exportResults("token1");

  expect(blob).toBeInstanceOf(Buffer);
  expect(isReadFileCalled).toBe(true);
});

test("exportResults() returns null if session is not completed", async () => {
  const session = createMockingSession({ status: Session.RUNNING });
  const resultsManager = new ResultsManager();
  await resultsManager.initialize({
    sessionManager: { readSession: () => session }
  });

  FileSystem.stats = () => {};
  FileSystem.readDirectory = () => [];
  FileSystem.readFile = () => {};
  const blob = await resultsManager.exportResults("token1");

  expect(blob).toBe(null);
});

test("exportResultsApiJson() reads a sessions api results from the results directory and returns it as binary blob", async () => {
  let isReadFileCalled = false;
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    sessionManager: {
      readSession: async () => ({ getUserAgent: () => "some user agent" })
    }
  });

  FileSystem.readFile = async path => {
    const pathParts = path.split("/");
    expect(pathParts.pop()).toMatch(/\w\w\d{1,3}\.json/);
    expect(pathParts.pop()).toBe("apiOne");
    expect(pathParts.pop()).toBe("token_abc");
    isReadFileCalled = true;
    return "binary";
  };

  const blob = await resultsManager.exportResultsApiJson({
    token: "token_abc",
    api: "apiOne"
  });

  expect(blob).toBe("binary");
  expect(isReadFileCalled).toBe(true);
});

test("exportResultsAllApiJsons() reads all api results of session, creates zip file and returns its binary blob", async () => {
  let isExportResultsCalled = false;
  const resultsManager = new ResultsManager();
  resultsManager.initialize();

  FileSystem.readDirectory = async () => ["apiOne", "apiTwo"];

  resultsManager.exportResultsApiJson = async () => {
    isExportResultsCalled = true;
    return "data";
  };

  const blob = await resultsManager.exportResultsAllApiJsons("token_abc");

  expect(blob).toBeInstanceOf(Buffer);
  expect(isExportResultsCalled).toBe(true);
});

test("exportResultsWptReport() reads all files generated by wpt report, creates zip file and returns its binary blob", async () => {
  let isReadDirectoryCalled = false;
  let isReadFileCalled = false;
  const resultsManager = new ResultsManager();
  resultsManager.initialize();

  FileSystem.readDirectory = async path => {
    const pathParts = path.split("/");
    expect(pathParts.pop()).toBe("apiOne");
    expect(pathParts.pop()).toBe("token_abc");
    isReadDirectoryCalled = true;
    return ["file1", "file2"];
  };

  FileSystem.readFile = async path => {
    const pathParts = path.split("/");
    expect(["file1", "file2"]).toContain(pathParts.pop());
    isReadFileCalled = true;
    return "data";
  };

  const blob = await resultsManager.exportResultsWptReport({
    token: "token_abc",
    api: "apiOne"
  });

  expect(blob).toBeInstanceOf(Buffer);
  expect(isReadDirectoryCalled).toBe(true);
  expect(isReadFileCalled).toBe(true);
});

test("readResultsWptReportUri() returns the path to the wpt report of a session for a specific api", async () => {
  const resultsManager = new ResultsManager();
  resultsManager.initialize();

  FileSystem.exists = () => true;

  const path = await resultsManager.readResultsWptReportUri({
    token: "token_abc",
    api: "apiOne"
  });

  const pathParts = path.split("/").filter(part => !!part);
  expect(pathParts[0]).toBe("results");
  expect(pathParts[1]).toBe("token_abc");
  expect(pathParts[2]).toBe("apiOne");
  expect(pathParts[3]).toBe("all.html");
});

test("exportResultsWptMultiReport() reads all files generated by wpt report, creates zip file and returns its binary blob", async () => {
  let isGenerateMultiReportCalled = false;
  let isReadDirectoryCalled = false;
  let isReadFileCalled = false;
  const resultsManager = new ResultsManager();
  resultsManager.initialize();

  resultsManager.generateMultiReport = async () => {
    isGenerateMultiReportCalled = true;
  };

  FileSystem.readDirectory = async path => {
    const pathParts = path.split("/");
    expect(pathParts.pop()).toBe("apiOne");
    isReadDirectoryCalled = true;
    return ["file1", "file2"];
  };

  FileSystem.readFile = async path => {
    const pathParts = path.split("/");
    expect(["file1", "file2"]).toContain(pathParts.pop());
    isReadFileCalled = true;
    return "data";
  };

  const blob = await resultsManager.exportResultsWptMultiReport({
    tokens: ["token_abc", "token_def", "token_ghi"],
    api: "apiOne"
  });

  expect(blob).toBeInstanceOf(Buffer);
  expect(isReadDirectoryCalled).toBe(true);
  expect(isReadFileCalled).toBe(true);
  expect(isGenerateMultiReportCalled).toBe(true);
});

test("readResultsWptMultiReportUri() returns the path to the wpt report of multiple sessions for a specific api", async () => {
  const resultsManager = new ResultsManager();
  resultsManager.initialize({
    sessionManager: {
      readSession: async () => ({ getUserAgent: () => "some user agent" })
    }
  });

  const path = await resultsManager.readResultsWptMultiReportUri({
    tokens: ["token_abc", "token_def", "token_ghi"],
    api: "apiOne"
  });

  const pathParts = path.split("/").filter(part => !!part);
  expect(pathParts[0]).toBe("results");
  expect(pathParts[1]).toBe(
    "comparison-token_abc-token_def-token_ghi-48888189"
  );
  expect(pathParts[2]).toBe("apiOne");
  expect(pathParts[3]).toBe("all.html");
});

function createMockingResults() {
  const results = { apiOne: [], apiTwo: [] };
  const simpleResults = [
    { test: "/apiOne/test/1.html", status: "OK", subStatus: "PASS" },
    { test: "/apiOne/test/2.html", status: "OK", subStatus: "PASS" },
    { test: "/apiOne/test/3.html", status: "OK", subStatus: "PASS" },
    { test: "/apiOne/test/4.html", status: "OK", subStatus: "FAIL" },
    { test: "/apiOne/test/5.html", status: "OK", subStatus: "FAIL" },
    { test: "/apiTwo/test/6.html", status: "OK", subStatus: "FAIL" },
    { test: "/apiTwo/test/7.html", status: "TIMEOUT", subStatus: "PASS" },
    { test: "/apiTwo/test/8.html", status: "TIMEOUT", subStatus: "PASS" },
    { test: "/apiTwo/test/9.html", status: "TIMEOUT", subStatus: "PASS" }
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
  return results;
}

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
  referenceTokens = ["reference_token_one", "reference_token_two"],
  browser = { name: "Mocking Browser", version: "1.0" }
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
    referenceTokens,
    browser
  });
  return session;
}
