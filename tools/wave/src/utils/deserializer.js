const Session = require("../data/session");

/**
 * @module Deserializer
 */
class Deserializer {
  /**
   * @param {Object[]} sessionJsons
   */
  deserializeSessions(sessionJsons) {
    return sessionJsons.map(sessionObject =>
      this.deserializeSession(sessionObject)
    );
  }

  /**
   * @param {Object} sessionJson
   */
  deserializeSession(sessionJson) {
    const token = sessionJson.token;
    const path = sessionJson.path;
    const types = sessionJson.types;
    const userAgent = sessionJson.user_agent;
    const testTimeout = sessionJson.test_timeout;
    const pendingTests = sessionJson.pending_tests;
    const runningTests = sessionJson.running_tests;
    const completedTests = sessionJson.completed_tests;
    const status = sessionJson.status;
    const testFilesCount = sessionJson.test_files_count;
    const testFilesCompleted = sessionJson.test_files_completed;
    const dateStarted = sessionJson.date_started;
    const dateFinished = sessionJson.date_finished;
    const isPublic = sessionJson.is_public;
    const referenceTokens = sessionJson.reference_tokens;
    const browser = sessionJson.browser;
    return new Session(token, {
      path,
      types,
      userAgent,
      testTimeout,
      pendingTests,
      runningTests,
      completedTests,
      status,
      testFilesCount,
      testFilesCompleted,
      dateStarted,
      dateFinished,
      isPublic,
      referenceTokens,
      browser
    });
  }
}
let deserializer = new Deserializer();

module.exports = deserializer;
