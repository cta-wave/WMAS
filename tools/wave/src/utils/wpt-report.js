const path = require("path");
const { exec } = require("child_process");

const FileSystem = require("../utils/file-system");

class WptReport {
  async generateReport({
    inputJsonDirectoryPath,
    outputHtmlDirectoryPath,
    specName,
    isMulti,
    referenceDir
  }) {
    return new Promise((resolve, reject) => {
      exec(
        `cd tools/wave && npx wptreport ` +
          `--input ${inputJsonDirectoryPath} ` +
          `--output ${outputHtmlDirectoryPath} ` +
          `--spec ${specName} ` +
          `--sort true `+
          `${isMulti ? "--tokenFileName true " : ""}` +
          `${!referenceDir ? "" : `--pass 100 --ref ${referenceDir}`}`,
        (error, stdout, stderr) => {
          if (error) reject(new Error(error.message));
          // if (stderr) reject(new Error(stderr));
          if (stderr) console.warn(`WARNING: ${stderr}`);
          resolve(stdout);
        }
      );
    });
  }

  async generateMultiReport({
    outputHtmlDirectoryPath,
    specName,
    resultJsonFiles,
    referenceDir
  }) {
    await Promise.all(
      resultJsonFiles.map(async resultJsonFile => {
        if (!(await FileSystem.exists(resultJsonFile.path))) return;
        return FileSystem.copyFile(
          resultJsonFile.path,
          path.join(
            outputHtmlDirectoryPath,
            resultJsonFile.token + "-" + resultJsonFile.path.split("/").pop()
          )
        );
      })
    );
    await this.generateReport({
      inputJsonDirectoryPath: outputHtmlDirectoryPath,
      outputHtmlDirectoryPath: outputHtmlDirectoryPath,
      specName,
      isMulti: true,
      referenceDir
    });
  }
}

const wptReport = new WptReport();

module.exports = wptReport;
