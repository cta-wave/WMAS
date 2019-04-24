const path = require("path");
const fs = require("fs");
const https = require("https");
const JSZip = require("jszip");

const WaveServer = require("./src/core/wave-server");

const REFERENCE_BROWSERS = {
  chrome63: {
    name: "Chrome 63",
    url:
      "https://s3.us-east-2.amazonaws.com/wave-browser-snapshots/wave-reference-browser-results/Chrome63-ce4aec10-7855-11e8-b81b-6714c602f007.zip"
  },
  edge16: {
    name: "Edge 16",
    url:
      "https://s3.us-east-2.amazonaws.com/wave-browser-snapshots/wave-reference-browser-results/Edge16-01d11810-7938-11e8-8749-a6ac1d216fc7.zip"
  },
  firefox57: {
    name: "Firefox 57",
    url:
      "https://s3.us-east-2.amazonaws.com/wave-browser-snapshots/wave-reference-browser-results/Firefox57-a831a820-7855-11e8-9ce0-d6175576bb4b.zip"
  },
  safari11: {
    name: "Safari 11",
    url:
      "https://s3.us-east-2.amazonaws.com/wave-browser-snapshots/wave-reference-browser-results/Safari11-62b61630-7938-11e8-b48e-f58ca22000c9.zip"
  },
  webkit604: {
    name: "WebKit 604",
    url:
      "https://s3.us-east-2.amazonaws.com/wave-browser-snapshots/wave-reference-browser-results/WebKit604-c0cdb6c0-7b99-11e8-939a-90ffd3c0ec6f.zip"
  }
};

const START_OPERATION = "start";
const DOWNLOAD_REFERENCE_RESULTS_OPERATION = "download-reference-results";

(async () => {
  const {
    applicationDirectoryPath,
    configurationFilePath,
    operation
  } = getRunParameters();

  if (!operation) return console.log("No operation specified");

  switch (operation) {
    case START_OPERATION:
      return await startServer(applicationDirectoryPath, configurationFilePath);
    case DOWNLOAD_REFERENCE_RESULTS_OPERATION:
      return await downloadReferenceResults(applicationDirectoryPath);
    default:
      console.log(`Unknown operation "${operation}"`);
  }
})().catch(error => console.error(error));

async function downloadReferenceResults(applicationDirectoryPath) {
  const DOWNLOAD_PATH = path.normalize(
    path.join(applicationDirectoryPath, "../../results")
  );
  if (!(await pathExists(DOWNLOAD_PATH))) await makeDirectories(DOWNLOAD_PATH);

  let keys = Object.keys(REFERENCE_BROWSERS);
  for (let id = keys.shift(); id; id = keys.shift()) {
    const browser = REFERENCE_BROWSERS[id];
    browser.zip = path.join(DOWNLOAD_PATH, browser.url.split("/").pop());
    process.stdout.write(`Downloading ${browser.name} results ...`);
    await downloadFile(browser.url, browser.zip);
    process.stdout.write(" done.\n");
  }

  keys = Object.keys(REFERENCE_BROWSERS);
  for (let id = keys.shift(); id; id = keys.shift()) {
    const browser = REFERENCE_BROWSERS[id];
    process.stdout.write(`Extracting ${browser.name} results ...`);
    await extractZip(browser.zip, DOWNLOAD_PATH);
    process.stdout.write(" done.\n");
  }

  console.log("Cleaning ...");
  keys = Object.keys(REFERENCE_BROWSERS);
  for (let id = keys.shift(); id; id = keys.shift()) {
    const browser = REFERENCE_BROWSERS[id];
    removeFile(browser.zip);
  }
}

async function startServer(applicationDirectoryPath, configurationFilePath) {
  console.log("Starting Wave Server ...");
  const waveServer = new WaveServer();
  await waveServer.initialize({
    applicationDirectoryPath,
    configurationFilePath
  });
  await waveServer.start();
  console.log("Wave Server started on port " + waveServer.getPort());
}

function getRunParameters() {
  const processArguments = process.argv;
  const parameters = {
    applicationDirectoryPath: __dirname,
    operation: process.argv[2]
  };
  for (let i = 3; i < processArguments.length; i++) {
    const key = processArguments[i];
    const value = processArguments[i + 1];
    switch (key) {
      case "--config":
        parameters.configurationFilePath = value;
        i++;
        break;
    }
  }
  return parameters;
}

function downloadFile(url, destinationFilePath) {
  return new Promise(resolve => {
    const file = fs.createWriteStream(destinationFilePath);
    https.get(url, response => {
      file.on("finish", () => {
        resolve();
      });
      file.on("error", () => console.error(error));
      response.pipe(file);
    });
  });
}

async function extractZip(zipPath, destinationPath) {
  return new Promise(resolve => {
    fs.readFile(zipPath, async (error, data) => {
      if (error) {
        console.error(error);
        resolve();
      }
      const zip = new JSZip();
      const content = await zip.loadAsync(data);
      const keys = Object.keys(content.files);
      for (let i = 0; i < keys.length; i++) {
        const file = content.files[keys[i]];
        const filePath = path.join(destinationPath, file.name);
        if (file.dir) {
          await makeDirectories(filePath);
        } else {
          const data = await file.async("string");
          await writeFile(filePath, data);
        }
      }
      resolve();
    });
  });
}

function pathExists(fileSystemPath) {
  return new Promise(resolve => {
    fs.stat(fileSystemPath, error => {
      if (error) resolve(false);
      resolve(true);
    });
  });
}

async function makeDirectories(directoryPath) {
  if (await pathExists(directoryPath)) return;
  return new Promise(resolve => {
    fs.mkdir(directoryPath, async error => {
      if (error) {
        let parent = directoryPath.split("/");
        parent.pop();
        parent = parent.join("/");
        await makeDirectories(parent);
        await makeDirectories(directoryPath);
        resolve();
      } else {
        resolve();
      }
    });
  });
}

function writeFile(filePath, data) {
  return new Promise(resolve => {
    fs.writeFile(filePath, data, error => {
      if (error) console.error(error);
      resolve();
    });
  });
}

function removeFile(filePath) {
  return new Promise(resolve => {
    fs.unlink(filePath, err => {
      if (err) resolve(false);
      resolve(true);
    });
  });
}
