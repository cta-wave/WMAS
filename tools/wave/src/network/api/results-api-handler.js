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
            let sessionResults = await this._getSessionResults(tokenArr, passedRefTests)
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
    let refSessionsResults = await Promise.all(refTokenArr.map(async token => await this._resultsManager.getResults(token)))
    let passed = {}

    // get all subtests from all referenced sessions
    for (let i = 0; i < refSessionsResults.length; i++) {
      let res = refSessionsResults[i]
      
      for (let api in res) {
        passed[api] = passed[api] || {}
        res[api].forEach(test => {
          passed[api][test.test] = passed[api][test.test] || []
          passed[api][test.test].push(test.subtests || [])
        })
      }
    }

    // filter out test files where any subtest of any referenced session didn't pass
    for (let api in passed) {
      for (let test in passed[api]) {
        let testLen = passed[api][test][0].length
        // remove test file if subtest count of referenced sessions doesn't match
        if (passed[api][test].some(s => s.length !== testLen)) {
          passed[api][test] = undefined
          continue
        }

        passed[api][test] = passed[api][test].map(fff => {
          let allSubs = {}
          fff.forEach(sub => {
            allSubs[sub.name] = sub.status
          })
          return allSubs
        })

        // check that all subtests passed otherwise exclude that test file
        let ref = passed[api][test].pop()
        for (let sub in ref) {
          if (passed[api][test].some(other => ref[sub] !== 'PASS' || other[sub] !== ref[sub])) {
            passed[api][test] = undefined
            break
          }
        }         
      }
      
      let temp = []
      for (let test in passed[api]) {
        if (passed[api][test] && passed[api][test].length) {
          let out = {}
          out[test] = Object.keys(passed[api][test][0]).length
          temp.push(out)
        }
      }
      passed[api] = temp
    }
    return passed
  }

  _percent (count, total) {
    const percent = Math.floor(count / total * 10000) / 100
    if (!percent) {
      return 0
    }
    return percent
  }

  async _getSessionResults(tokenArr, passedRefTests) {
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
          // don't count subtests if this test didn't pass in reference
          if (!passedRefTests[api].find(t => t[apiResult[result].test])) continue

          let subtests = apiResult[result].subtests || []
          for (let k = 0; k < subtests.length; k++) {
            const subtest = subtests[k]
            if (subtest.status === 'PASS') {
              passedSubTests++
            }
          }
        }
        if (passedRefTests[api]) {
          const totalPassedRefSubtests = passedRefTests[api].reduce((acc, test) => acc + test[Object.keys(test)[0]], 0)
          sessionResults[token][api] = this._percent(passedSubTests, totalPassedRefSubtests)
        } else {
          sessionResults[token][api] = 'not tested'
        }
      }
    }
    return sessionResults
  }
}

module.exports = ResultsApiHandler