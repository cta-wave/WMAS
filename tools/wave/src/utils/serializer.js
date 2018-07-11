const UserAgentParser = require('../utils/user-agent-parser')

class Serializer {
  serializeSessions (sessions) {
    return sessions.map(session => this.serializeSession(session))
  }

  serializeSession (session) {
    const token = session.getToken()
    const path = session.getPath()
    const types = session.getTypes()
    const user_agent = session.getUserAgent()
    const test_timeout = session.getTestTimeout()
    const total_tests_count = session.getTotalTestsCount()
    const pending_tests = session.getPendingTests()
    const running_tests = session.getRunningTests()
    const completed_tests = session.getCompletedTests()
    const status = session.getStatus()
    const { browser } = UserAgentParser.parse(user_agent)
    return {
      token,
      path,
      types,
      user_agent,
      test_timeout,
      total_tests_count,
      pending_tests,
      running_tests,
      completed_tests,
      status,
      browser
    }
  }
}

let serializer = new Serializer()
module.exports = serializer
