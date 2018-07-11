const path = require('path')

const WaveServer = require('./src/core/wave-server')
;(async () => {
  const { applicationDirectoryPath, configurationFilePath } = getRunParameters()

  console.log('Starting Wave Server ...')
  const waveServer = new WaveServer()
  await waveServer.initialize({
    applicationDirectoryPath,
    configurationFilePath
  })
  await waveServer.start()
  console.log('Wave Server started on port ' + waveServer.getPort())
})().catch(error => console.error(error))

function getRunParameters () {
  const processArguments = process.argv
  const parameters = {
    applicationDirectoryPath: __dirname
  }
  for (let i = 2; i < processArguments.length; i++) {
    const key = processArguments[i]
    const value = processArguments[i + 1]
    switch (key) {
      case '--config':
        parameters.configurationFilePath = value
        i++
        break
    }
  }
  return parameters
}
