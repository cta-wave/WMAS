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
    fs.readFile(
      path,
      {
        encoding: "UTF-8"
      },
      (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      }
      );
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

const addHarnessToTestsHeader = async(testsPath,testsListPath) =>{

  var files = fs.readFileSync(testsListPath).toString().split("\n");
  var numberOfTestFiles = 0;
  for(var i=0; i<files.length ; i++){
    var fileExtension = files[i].split('.').pop();
    filename = path.join(testsPath,files[i]);
    if(fs.existsSync(filename)){
      if(fileExtension == "html" || fileExtension == "htm"){
        var contents = fs.readFileSync(filename, 'utf8');
        var position = contents.indexOf('<head>') ;
        var temp = contents.substring(1,position + 10);
        position = temp.lastIndexOf('\n');
        if(position !== -1 ){
          numberOfTestFiles = numberOfTestFiles + 1;
          contents = contents.substring(position +1 );
          var file = fs.openSync(filename,'r+');
          var bufferedText = new Buffer('\n<script src="/resources/testharness.js"></script> \n<script src="/resources/testharnessreport.js"></script> \n' + contents);
          fs.writeSync(file, bufferedText, 0, bufferedText.length, position + 3);
          fs.close(file);
        }
      }
    }
  }
  return numberOfTestFiles;
}


(async () => {

  const testDir = process.argv[2] || DEFAULT_TEST_DIR;

  // Files that will be overwritten in the original webgl test suite 
  const PRE_TEST_NAME = "js-test-pre.js";
  const UNIT_TEST_NAME = "unit.js";

  const RESOURCES = path.join( __dirname ,"resources");
  const DEFAULT_TEST_DIR = "/webgl/";
  const DEFAULT_OUTPUT_DIR = ".";
  const SUB_DIR_NAME = "webgl";

  const testsPath = path.join(testDir, "conformance-suites");
  const v1_0_3_harnessDir = path.join(testsPath, "1.0.3");
  const preTestsPath = path.join(RESOURCES, PRE_TEST_NAME);
  const unitTestPath = path.join(RESOURCES, UNIT_TEST_NAME);
  let outputPath = process.argv[3] || DEFAULT_OUTPUT_DIR;
  outputPath = path.join(outputPath, SUB_DIR_NAME);
  const testsOutputPath = path.join(outputPath, "conformance-suite");
  const resourcesPath = path.join(testsOutputPath, "resources");
  const presTestDestinationPath = path.join(resourcesPath, "js-test-pre.js");
  const unitTestDestinationputPath = path.join(testsOutputPath, "conformance", "more", "unit.js");

  const testsListPath = path.join(RESOURCES, "list_all_tests")
  
  if (!(await readStats(SUB_DIR_NAME))) await makeDirectory(SUB_DIR_NAME);

  await copyDirectory(v1_0_3_harnessDir, testsOutputPath);
  await copyFile(preTestsPath, presTestDestinationPath);
  await copyFile(unitTestPath, unitTestDestinationputPath);
  const numberOfTestFiles = await addHarnessToTestsHeader(testsOutputPath,testsListPath);
  console.log(`Total of ${numberOfTestFiles} webGl tests integrated`, testsListPath);
})();
