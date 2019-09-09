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
    const tests = session.getTests();
    const types = session.getTypes();
    const user_agent = session.getUserAgent();
    const timeouts = session.getTimeouts();
    const test_files_count = session.getTestFilesCount();
    const test_files_completed = session.getTestFilesCompleted();
    const pending_tests = session.getPendingTests();
    const running_tests = session.getRunningTests();
    const completed_tests = session.getCompletedTests();
    const status = session.getStatus();
    const date_started = session.getDateStarted();
    const date_finished = session.getDateFinished();
    const browser = session.getBrowser();
    const is_public = session.isPublic();
    const reference_tokens = session.getReferenceTokens();
    const webhook_urls = session.getWebhookUrls();
    const expiration_date = session.getExpirationDate();
    return {
      token,
      tests,
      types,
      user_agent,
      timeouts,
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
      reference_tokens,
      webhook_urls,
      expiration_date
    };
  }
}

let serializer = new Serializer();
module.exports = serializer;
