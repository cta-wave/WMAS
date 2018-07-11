const useragent = require('useragent')

class UserAgentParser {
  parse (ua) {
    const parsed = useragent.parse(ua)
    if (parsed.family === 'Apple Mail') {
      parsed.family = 'WebKit'
    }
    return {
      browser: {
        name: parsed.family || 'unknown',
        version: parsed.major || '00',
      },
      os: {
        name: parsed.os.family,
      },
      device: {
        name: parsed.device.family,
      }
    }
  }
}

const userAgentParser = new UserAgentParser()

module.exports = userAgentParser
