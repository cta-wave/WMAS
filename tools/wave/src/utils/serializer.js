const UserAgentParser = require("./user-agent-parser");
const Session = require("../data/session");

/**
 * @module Serializer
 */
class Serializer {
  /**
   * @param {Session[]} sessions
   */
  serializeSessions(sessions) {
    return sessions.map(session => this.serializeSession(session));
  }

  /**
   * @param {Session} session
   */
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
    const date_started = session.getDateStarted();
    const date_finished = session.getDateFinished();
    const { browser } = UserAgentParser.parse(session.getUserAgent());
    const is_public = session.isPublic();
    const reference_tokens = session.getReferenceTokens();
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
      browser,
      date_started,
      date_finished,
      is_public,
      reference_tokens
    };
  }
}

let serializer = new Serializer();
module.exports = serializer;
