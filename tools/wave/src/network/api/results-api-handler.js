const Route = require('../../data/route')
const ApiHandler = require('./api-handler')

class ResultsApiHandler extends ApiHandler {
  constructor (resultsManager) {
    super()
    this._routes = this._createRoutes()
    this._resultsManager = resultsManager
  }

  _createRoutes () {
    return [
      new Route('/results', this._handleRequest.bind(this)),
      new Route('/results/*', this._handleRequest.bind(this))
    ]
  }

  getRoutes () {
    return this._routes
  }

  async _handleRequest (request, response, next) {
    const { method } = request
    const url = this.parseUrl(request)
    const test = request.get('test')
    let { token, tokens, api } = this.parseQueryParameters(request)
    if (!token) {
      token = request.get('token')
    }

    switch (method) {
      case 'POST':
        response.send()
        if (!test) return
        return this._createResult({ data: request.body, token, test })
      case 'GET':
        switch (url.length) {
          case 1: {
            response.redirect(
              `/nodejs/next?token=${token}&timeout=null&hostname=${request.query.hostname}&redirect=1`
            )
            if (!test) return
            let data = { status: 3 } // NOTRUN
            try {
              data = JSON.parse(decodeURI(request.query.data))
            } catch (error) {
              console.log('json error, data was:', request.query.data)
              data = { status: 1 } // ERROR
            }
            return this._createResult({
              data,
              token,
              test
            })
          }
          case 2: {
            switch (url[1]) {
              case 'html':
                const reftoken = token
                return this._serveHtmlReport({ tokens, reftoken, response, api })
              default:
                token = url[1]
                let results = await this._resultsManager.getResults(token)
                results = this._flattenResults(results)
                this.sendJson(results, response)
                return
            }
          }
          case 3:
            const tokenArr = url[1].split(',')
            let refTokenArr = url[2].split(',')
            for (let i = 0; i < refTokenArr.length; i++) {
              const element = refTokenArr[i]
              if (element.includes('-')) {
                continue
              } else {
                refTokenArr = refTokenArr.filter( e => e !== element)
                let tokens = await this._resultsManager.getTokensFromHash(element)
                for (let i = 0; i < tokens.length; i++) {
                  refTokenArr.push(tokens[i])
                }
              }
            }
            let passedRefTests = await this._filterPassedTests(refTokenArr)
            let refIntersect = this._getIntersect(passedRefTests)
            let sessionResults = await this._getSessionResults(tokenArr, refIntersect)
            this.sendJson(sessionResults, response)
            return
          case 4: {
            switch (url[3]) {
              case 'json':
                return this._sendJsonReport({
                  response,
                  token: url[1],
                  api: url[2]
                })
              case 'html':
                return this._serveHtmlReport({
                  response,
                  token: url[1],
                  api: url[2]
                })
            }
          }
        }
    }
    next()
  }

  async _sendJsonReport ({ token, response, api }) {
    const filePath = await this._resultsManager.getJsonPath({ token, api })
    const fileName =
      token.split('-').shift() + '-' + api + '-' + filePath.split('/').pop()
    response.set(
      'Content-Disposition',
      'attachment;filename="' + fileName + '"'
    )
    response.sendFile(filePath)
  }

  async _serveHtmlReport ({ token, tokens, reftoken, response, api }) {
    const uri = await this._resultsManager.getHtmlPath({
      tokens,
      reftoken,
      token,
      api
    })
    response.redirect(uri)
  }

  async _createResult ({ data, token, test }) {
    const result = this._resultsManager.prepareResult(data)
    if (test) {
      result.test = test
    } else {
      test = result.test
    }
    if (test.startsWith('/')) test = test.substr(1)
    await this._resultsManager.saveResult({ token, test, result })
  }

  _flattenResults (results) {
    const flattenedResults = {}
    for (let api in results) {
      if (!flattenedResults[api]) {
        flattenedResults[api] = { pass: 0, fail: 0, timeout: 0, timeoutfiles: [], not_run: 0 }
      }
      for (let result of results[api]) {
        if (!result.subtests) {
          switch (result.status) {
            case 'OK':
              flattenedResults[api].pass++
              break
            case 'ERROR':
              flattenedResults[api].fail++
              break
            case 'TIMEOUT':
              flattenedResults[api].timeout++
              break
            case 'NOTRUN':
              flattenedResults[api].not_run++
              break
          }
          if (results.xstatus === 'SERVERTIMEOUT') {
            flattenedResults[api].timeoutfiles.push(result.test)
          }
          continue
        }
        for (let test of result.subtests) {
          switch (test.status) {
            case 'PASS':
              flattenedResults[api].pass++
              break
            case 'FAIL':
              flattenedResults[api].fail++
              break
            case 'TIMEOUT':
              flattenedResults[api].timeout++
              break
            case 'NOTRUN':
              flattenedResults[api].not_run++
              break
          }
          if (test.xstatus === 'SERVERTIMEOUT') {
            flattenedResults[api].timeoutfiles.push(result.test)
          }
        }
      }
    }
    return flattenedResults
  }

  _calculateIntersect(a ,b) {
    var t
    if (b.length > a.length) t = b, b = a, a = t
    return a.filter(e => {
      return b.includes(e)
    })
  }

  async _filterPassedTests(refTokenArr) {
    let passedRefTests = []
    for (let i = 0; i < refTokenArr.length; i++) {
      let passedTests = {}
      let refSessionResults = await this._resultsManager.getResults(refTokenArr[i])
      for (let api in refSessionResults) {
        let testsForApi = refSessionResults[api]
        passedTests[api] = []
        for (let k = 0; k < testsForApi.length; k++) {
          let subtestsArr = testsForApi[k].subtests
          for (let m = 0; m < subtestsArr.length; m++) {
             let subtest = subtestsArr[m]
             if (subtest.status === 'PASS') {
              passedTests[api].push(subtest.name)
             }
          }
        }
      }
      passedRefTests.push(passedTests)
    }
    return passedRefTests
  }

  _getIntersect(passedRefTests) {
    let refIntersect = {}
    for (let i = 0; i < passedRefTests.length; i++) {
      if (i === 0) {
        refIntersect = passedRefTests[i]
      }
      if (i + 1 === passedRefTests.length) {
        continue
      }
      const refTestsNext = passedRefTests[i + 1]
      for (let api in refIntersect) {
        refIntersect[api] = (this._calculateIntersect(refIntersect[api], refTestsNext[api]))
      }
    }
    return refIntersect
  }

  _percent (count, total) {
    const percent = Math.floor(count / total * 10000) / 100
    if (!percent) {
      return 0
    }
    return percent
  }

  async _getSessionResults(tokenArr, refIntersect) {
    let sessionResults = {}
    for (let i = 0; i < tokenArr.length; i++) {
      const token = tokenArr[i]
      sessionResults[token] = {}
      const sessionResult = await this._resultsManager.getResults(token)
      for (let api in sessionResult) {
        sessionResults[token][api] = 0
        const apiResult = sessionResult[api]
        let passedSubTests = 0
        for (let result in apiResult) {
          const subtests = apiResult[result].subtests
          for (let k = 0; k < subtests.length; k++) {
            const subtest = subtests[k]
            if (subtest.status === 'PASS' && refIntersect[api] && refIntersect[api].includes(subtest.name)) {
              passedSubTests++
            }
          }
        }
        if (refIntersect[api]) {
          const totalSubtestsForApi = refIntersect[api].length
          sessionResults[token][api] = this._percent(passedSubTests, totalSubtestsForApi)
        } else {
          sessionResults[token][api] = 'not tested'
        }
      }
    }
    return sessionResults
  }
}

module.exports = ResultsApiHandler
