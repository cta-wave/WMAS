const fs = require("fs");
const path = require("path");
const util = require("util");

const rmdir = util.promisify(fs.rmdir);

class FileSystem {
  async makeDirectory(directoryPath) {
    return new Promise((resolve, reject) => {
      fs.mkdir(directoryPath, error => {
        if (error) reject(error);
        resolve();
      });
    });
  }

  async readDirectory(directoryPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(directoryPath, (error, files) => {
        if (error) reject(error);
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
    return new Promise(resolve => {
      fs.stat(path, (error, stats) => {
        if (error) resolve(null);
        resolve(stats);
      });
    });
  }

  async readFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (error, data) => {
        if (error) reject(error);
        resolve(data);
      });
    });
  }

  async writeFile(filePath, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, data, error => {
        if (error) reject(error);
        resolve();
      });
    });
  }

  async removeFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, error => {
        if (error) reject(error);
        resolve();
      });
    });
  }

  async copyFile(sourceFilePath, destinyFilePath) {
    return new Promise(resolve => {
      fs.createReadStream(sourceFilePath)
        .pipe(fs.createWriteStream(destinyFilePath))
        .on("close", () => {
          resolve();
        });
    });
  }

  async exists(path) {
    return (await this.stats(path)) !== null;
  }
}

const fileSystem = new FileSystem();

module.exports = fileSystem;
