const fs = require("fs");
const path = require("path");
const util = require("util");

const rmdir = util.promisify(fs.rmdir);

class FileSystem {
  async makeDirectory(directoryPath) {
    return new Promise((resolve, reject) => {
      fs.mkdir(directoryPath, error => {
        if (error) reject(new Error(error.message));
        resolve();
      });
    });
  }

  async readDirectory(directoryPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(directoryPath, (error, files) => {
        if (error) reject(new Error(error.message));
        resolve(files);
      });
    });
  }

  async removeDirectory(directoryPath) {
    const files = await this.readDirectory(directoryPath);
    const tasks = files.map(async filename => {
      const filepath = path.join(directoryPath, filename);
      const stats = await this.stats(filepath);
      if (stats.isDirectory()) {
        await this.removeDirectory(filepath);
      } else {
        await this.removeFile(filepath);
      }
    });
    await Promise.all(tasks);
    return rmdir(directoryPath);
  }

  async stats(path) {
    return new Promise((resolve, reject) => {
      fs.stat(path, (error, stats) => {
        if (error) reject(new Error(error.message));
        resolve(stats);
      });
    });
  }

  async readFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, { encoding: "utf-8" }, (error, data) => {
        if (error) reject(new Error(error.message));
        resolve(data);
      });
    });
  }

  async writeFile(filePath, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, data, error => {
        if (error) reject(new Error(error.message));
        resolve();
      });
    });
  }

  async removeFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, error => {
        if (error) reject(new Error(error.message));
        resolve();
      });
    });
  }

  async copyFile(sourceFilePath, destinyFilePath) {
    return new Promise((resolve, reject) => {
      try {
        fs.createReadStream(sourceFilePath)
          .pipe(fs.createWriteStream(destinyFilePath))
          .on("close", () => {
            resolve();
          });
      } catch (error) {
        reject(new Error(error.message));
      }
    });
  }

  async exists(path) {
    try {
      await this.stats(path);
      return true;
    } catch (error) {
      return false;
    }
  }
}

const fileSystem = new FileSystem();

module.exports = fileSystem;
