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
}

module.exports = ResultsApiHandler
