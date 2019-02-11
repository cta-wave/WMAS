const fs = require("fs");
const path = require("path");

const readDirectory = async directoryPath => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (error, files) => {
      if (error) {
        reject(error);
      }
      resolve(files);
    });
  });
};

const makeDirectory = async directoryPath => {
  return new Promise((resolve, reject) => {
    fs.mkdir(directoryPath, error => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
};

const readStats = async path => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (error, stats) => {
      if (error) {
        resolve(null);
      }
      resolve(stats);
    });
  });
};

const readFile = async path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "UTF-8" }, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

const writeFile = async (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, error => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
};

const copyFile = async (sourcePath, destinationPath) => {
  return writeFile(destinationPath, await readFile(sourcePath));
};

const copyDirectory = async (sourceDir, destinationDir) => {
  if (!(await readStats(destinationDir))) await makeDirectory(destinationDir);
  const files = await readDirectory(sourceDir);
  for (let file of files) {
    const sourceFile = path.join(sourceDir, file);
    const destinationFile = path.join(destinationDir, file);
    const stats = await readStats(sourceFile);
    if (stats.isDirectory()) {
      await copyDirectory(sourceFile, destinationFile);
    } else {
      await copyFile(sourceFile, destinationFile);
    }
  }
};

const getOutputPath = ({ testsPath, currentPath, outputPath }) => {
  return path.join(outputPath, path.relative(testsPath, currentPath));
};

// Tests that will freeze the runner
// ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-3-14.js
// ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-3-14.js
// ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-3-14.js
// ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-3-14.js
// ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-3-14.js
const excludedTests = [
  /15\.4\.4\.15-3-14\.js/,
  /15\.4\.4\.18-3-14\.js/,
  /15\.4\.4\.20-3-14\.js/,
  /15\.4\.4\.21-3-14\.js/,
  /15\.4\.4\.22-3-14\.js/
];

let testCount = 0;

const generateTest = async ({
  testsPath,
  outputPath,
  currentPath,
  templateContent
}) => {
  if (!currentPath) currentPath = testsPath;
  let stats = await readStats(currentPath);
  if (stats.isDirectory()) {
    const outputDir = getOutputPath({ testsPath, outputPath, currentPath });
    if (!(await readStats(outputDir))) await makeDirectory(outputDir);
    let files = await readDirectory(currentPath);
    for (let file of files) {
      await generateTest({
        currentPath: path.join(currentPath, file),
        outputPath,
        testsPath,
        templateContent
      });
    }
  } else {
    if (
      currentPath.indexOf(".js") === -1 ||
      excludedTests.some(regex => regex.test(currentPath))
    ) {
      return;
    }

    const jsRelativePath = path.relative(testsPath, currentPath);
    // console.log(jsRelativePath.replace('.js', ''))
    const jsOutputPath = path.join(outputPath, jsRelativePath);
    const htmlOutputPath = jsOutputPath.replace(".js", ".html");
    let testContent = templateContent;
    testContent = testContent.replace(
      "{{TEST_URL}}",
      "/ecmascript/tests/" + jsRelativePath
    );
    testContent = testContent.replace(
      "{{TEST_TITLE}}",
      jsRelativePath.split("/").pop()
    );
    await writeFile(htmlOutputPath, testContent);
    await copyFile(currentPath, jsOutputPath);
    testCount++;
  }
};

(async () => {
  const ADAPTER_SCRIPT_NAME = "webplatform-adapter.js";
  const HTML_TEMPLATE_NAME = path.join(__dirname, "test-template.html");
  const DEFAULT_TEST_DIR = "./test262";
  const DEFAULT_OUTPUT_DIR = ".";
  const SUB_DIR_NAME = "ecmascript";

  const testDir = process.argv[2] || DEFAULT_TEST_DIR;
  const testsPath = path.join(testDir, "test");
  const harnessDir = path.join(testDir, "console/harness");
  let outputPath = process.argv[3] || DEFAULT_OUTPUT_DIR;
  outputPath = path.join(outputPath, SUB_DIR_NAME);
  const testsOutputPath = path.join(outputPath, "tests");
  const harnessOutputDir = path.join(outputPath, "harness");
  const adapterSourcePath = path.join(__dirname, ADAPTER_SCRIPT_NAME);
  const adapterDestinationPath = path.join(outputPath, ADAPTER_SCRIPT_NAME);

  if (!(await readStats(outputPath))) await makeDirectory(outputPath);

  console.log("Reading test template ...");
  const templateContent = await readFile(HTML_TEMPLATE_NAME);
  console.log("Generating tests ...");
  await generateTest({
    testsPath,
    outputPath: testsOutputPath,
    templateContent
  });
  await copyFile(adapterSourcePath, adapterDestinationPath);
  await copyDirectory(harnessDir, harnessOutputDir);
  console.log(
    `Generated ${testCount} tests in directory ${outputPath} (${path.resolve(
      outputPath
    )})`
  );
})();
