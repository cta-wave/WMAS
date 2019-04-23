const path = require("path");
const { exec } = require("child_process");

const FileSystem = require("../utils/file-system");

class WptReport {
  constructor() {
    this._nodeModulesDirectoryPath = process.mainModule.paths[0];
    this._wptReportFilePath = path.join(
      this._nodeModulesDirectoryPath,
      ".bin/wptreport"
    );
  }

  async generateReport({
    inputJsonDirectoryPath,
    outputHtmlDirectoryPath,
    specName,
    isMulti,
    referenceDir
  }) {
    return new Promise((resolve, reject) => {
      exec(
        `${this._wptReportFilePath} ` +
          `--input ${inputJsonDirectoryPath} ` +
          `--output ${outputHtmlDirectoryPath} ` +
          `--spec ${specName} ` +
          `${isMulti ? "--tokenFileName true " : ""}` +
          `${!referenceDir ? "" : `--pass 100 --ref ${referenceDir}`}`,
        (error, stdout, stderr) => {
          if (error) reject(error);
          if (stderr) reject(stderr);
          resolve(stdout);
        }
      );
    });
  }

  async generateMultiReport({
    outputHtmlDirectoryPath,
    specName,
    resultJsonFilePaths,
    referenceDir
  }) {
    await Promise.all(
      resultJsonFilePaths
        .map(async resultJsonFilePath =>
          (await FileSystem.exists(
            path.join(
              resultJsonFilePath.inputDir,
              resultJsonFilePath.token,
              resultJsonFilePath.api,
              resultJsonFilePath.filename
            )
          ))
            ? resultJsonFilePath
            : null
        )
        .map(async promise => {
          const resultJson = await promise;
          if (!resultJson) return;
          return FileSystem.copyFile(
            path.join(
              resultJson.inputDir,
              resultJson.token,
              resultJson.api,
              resultJson.filename
            ),
            path.join(
              outputHtmlDirectoryPath,
              resultJson.token + "-" + resultJson.filename
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
