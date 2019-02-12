const UserAgentParser = require("./user-agent-parser");

class Serializer {
  serializeSessions(sessions) {
    return sessions.map(session => this.serializeSession(session));
  }

  serializeSession(session) {
    const token = session.getToken();
    const path = session.getPath();
    const types = session.getTypes();
    const user_agent = session.getUserAgent();
    const test_timeout = session.getTestTimeout();
    const test_files_count = session.getTestFilesCount();
    const test_files_completed = session.getTestFilesCompleted();
    const pending_tests = session.getPendingTests();
    const running_tests = session.getRunningTests();
    const completed_tests = session.getCompletedTests();
    const status = session.getStatus();
    const { browser } = UserAgentParser.parse(session.getUserAgent());
    return {
      token,
      path,
      types,
      user_agent,
      test_timeout,
      test_files_count,
      test_files_completed,
      pending_tests,
      running_tests,
      completed_tests,
      status,
      browser
    };
  }
}

let serializer = new Serializer();
module.exports = serializer;
