const Session = require('../data/session')

class Deserializer {
  deserializeSessions (sessionsObject) {
    return sessionsObject.map(sessionObject =>
      this.deserializeSession(sessionObject)
    )
  }

  deserializeSession (sessionObject) {
    const token = sessionObject.token
    const path = sessionObject.path
    const types = sessionObject.types
    const userAgent = sessionObject.user_agent
    const testTimeout = sessionObject.test_timeout
    const pendingTests = sessionObject.pending_tests
    const runningTests = sessionObject.running_tests
    const completedTests = sessionObject.completed_tests
    const status = sessionObject.status
    return new Session(token, {
      path,
      types,
      userAgent,
      testTimeout,
      pendingTests,
      runningTests,
      completedTests,
      status
    })
  }
}
let deserializer = new Deserializer()

module.exports = deserializer
