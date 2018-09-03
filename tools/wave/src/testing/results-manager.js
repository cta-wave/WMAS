const path = require('path')
const crypto = require('crypto')

const FileSystem = require('../utils/file-system')
const UserAgentParser = require('../utils/user-agent-parser')
const WptReport = require('./wpt-report')

class ResultsManager {
  constructor ({ resultsDirectoryPath, database, sessionManager }) {
    this._resultsDirectoryPath = resultsDirectoryPath
    this._database = database
    this._sessionManager = sessionManager
  }

  async getJsonPath ({ token, api }) {
    const session = await this._sessionManager.getSession(token)
    return this._getFilePath({
      userAgent: session.getUserAgent(),
      api,
      token
    })
  }

  async getJsonPath2 ({ token, api }) {
    const session = await this._sessionManager.getSession(token)
    return {
      inputDir: this._resultsDirectoryPath,
      token,
      api,
      filename: this._getFileName(session.getUserAgent()),
    }
  }

  async getHtmlPath ({ tokens, reftoken, token, api }) {
    let directoryPath = ''
    if (token) {
      directoryPath = token + '/' + api
    } else {
      let hash = crypto.createHash('sha1')
      tokens
        .sort((tokenA, tokenB) => (tokenA > tokenB ? 1 : -1))
        .forEach(token =>
          token.split('').forEach(letter => hash.update(letter))
        )

      hash = hash.digest('hex')
      const comparisonDirectoryPath = path.join(
        this._resultsDirectoryPath,
        hash
      )

      if (!await FileSystem.exists(comparisonDirectoryPath)) {
        await FileSystem.makeDirectory(comparisonDirectoryPath)
      }

      const apiDirectoryPath = path.join(comparisonDirectoryPath, api)
      if (await FileSystem.exists(apiDirectoryPath)) {
        await FileSystem.removeDirectory(apiDirectoryPath)
      }
      await FileSystem.makeDirectory(apiDirectoryPath)

      const resultJsonFilePaths = await Promise.all(
        tokens.map(token => this.getJsonPath2({ token, api }))
      )
      const referenceDir = reftoken ?
        path.join(this._resultsDirectoryPath, reftoken, api) :
        null
      await WptReport.generateMultiReport({
        outputHtmlDirectoryPath: apiDirectoryPath,
        specName: api,
        resultJsonFilePaths,
        referenceDir
      })

      directoryPath = hash + '/' + api
    }
    return directoryPath + (reftoken ? '/all_filtered.html' : '/all.html')
  }

  async saveResult ({ token, result, test }) {
    const session = await this._sessionManager.getSession(token)
    if (!session) return

    if (!session.testExists(test)) return

    if (!session.isTestComplete(test)) {
      session.completeTest(test)
      await this._database.createResult(token, result)
      const api = test.split('/')[0]
      if (session.isApiComplete(api)) {
        await this.saveApiResults({ token, api })
        await this.generateReport({ token, api })
      }
    }
    await this._sessionManager.updateSession(session)
  }

  async saveApiResults ({ token, api }) {
    const apiResults = { results: (await this.getResults(token))[api] }

    await this._ensureResultsDirectoryExistence({ api, token })

    const filePath = await this.getJsonPath({ token, api })
    await FileSystem.writeFile(filePath, JSON.stringify(apiResults, null, 2))
  }

  async generateReport ({ token, api }) {
    const filePath = await this.getJsonPath({ token, api })
    const dirPath = path.dirname(filePath)
    await WptReport.generateReport({
      inputJsonDirectoryPath: dirPath,
      outputHtmlDirectoryPath: dirPath,
      specName: api
    })
  }

  async getTokensFromHash(element) {
    let tokens = []
    const tempPath = path.join(this._resultsDirectoryPath, element)
    if (await FileSystem.exists(tempPath)) {
      const tokenUaRegex = /(.+)[-]([a-zA-Z]{2}\d+).json/
      const apiNames = await FileSystem.readDirectory(tempPath)
      const targetFolder = path.join(tempPath, apiNames[0])
      tokens = await FileSystem.readDirectory(targetFolder)
      tokens = tokens.filter( name => {
        return tokenUaRegex.exec(name)
      })
      for (let i = 0; i < tokens.length; i++) {
        tokens[i] = tokens[i].replace(/(-[a-zA-Z]{2}\d+).json/, '')
      }
    }
    return tokens
  }

  async _ensureResultsDirectoryExistence ({ token, api }) {
    if (!await FileSystem.stats(this._resultsDirectoryPath)) {
      await FileSystem.makeDirectory(this._resultsDirectoryPath)
    }

    let directory = path.join(this._resultsDirectoryPath, token)
    if (!await FileSystem.stats(directory)) {
      await FileSystem.makeDirectory(directory)
    }

    directory = path.join(directory, api)
    if (!await FileSystem.stats(directory)) {
      await FileSystem.makeDirectory(directory)
    }
  }

  _getFilePath ({ userAgent, api, token }) {
    const apiDirectory = path.join(this._resultsDirectoryPath, token, api)
    return path.join(apiDirectory, this._getFileName(userAgent))
  }

  _getFileName (userAgent) {
    const { browser: { name, version } } = UserAgentParser.parse(userAgent)
    const abbreviation = UserAgentParser.abbreviateBrowserName(name)
    return abbreviation + version + '.json'
  }

  async getResults (token) {
    const results = await this._database.getResults(token)
    const resultsPerApi = {}
    results.forEach(result => {
      let api
      if (result.test.startsWith('/')) {
        api = result.test.split('/')[1]
      } else {
        api = result.test.split('/')[0]
      }
      if (!resultsPerApi[api]) resultsPerApi[api] = []
      delete result._id
      resultsPerApi[api].push(result)
    })

    return resultsPerApi
  }

  prepareResult (result) {
    const harness_status_map = {
      0: 'OK',
      1: 'ERROR',
      2: 'TIMEOUT',
      3: 'NOTRUN'
    }
    const subtest_status_map = {
      0: 'PASS',
      1: 'FAIL',
      2: 'TIMEOUT',
      3: 'NOTRUN'
    }

    if (result.tests) {
      result.tests.forEach(test => {
        test.status = subtest_status_map[test.status]
        delete test.stack
      })
      result.subtests = result.tests
      delete result.tests
    }

    delete result.stack
    result.status = harness_status_map[result.status]

    return result
  }
}

module.exports = ResultsManager