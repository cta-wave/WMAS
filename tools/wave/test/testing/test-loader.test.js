const TestLoader = require("../../src/testing/test-loader");

test("getTests() returns only apis with tests when passing reference session with no passed tests in one api", async () => {
  const testLoader = new TestLoader();
  testLoader.initialize({
    resultsManager: {
      readCommonPassedTests: () => createMockingResultsAllFailing()
    }
  });
  testLoader._tests[TestLoader.AUTOMATIC_TESTS]["apiOne"] = [
    "/apiOne/test/1.html",
    "/apiOne/test/2.html",
    "/apiOne/test/3.html",
    "/apiOne/test/4.html",
    "/apiOne/test/5.html",
    "/apiTwo/test/6.html"
  ];

  const tests = await testLoader.getTests({
    types: [TestLoader.AUTOMATIC_TESTS],
    includeList: ["/"],
    excludeList: [],
    referenceTokens: ["ref1"]
  });

  expect(tests).not.toHaveProperty("apiOne");
});

function createMockingResultsAllFailing() {
  const results = { apiOne: [], apiTwo: [] };
  const simpleResults = [
    { test: "/apiOne/test/1.html", status: "OK", subStatus: "FAIL" },
    { test: "/apiOne/test/2.html", status: "OK", subStatus: "FAIL" },
    { test: "/apiOne/test/3.html", status: "OK", subStatus: "FAIL" },
    { test: "/apiOne/test/4.html", status: "OK", subStatus: "FAIL" },
    { test: "/apiOne/test/5.html", status: "OK", subStatus: "FAIL" },
    { test: "/apiTwo/test/6.html", status: "OK", subStatus: "FAIL" }
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
