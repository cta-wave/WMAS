const Session = require("../data/session");

class Deserializer {
  deserializeSessions(sessionsObject) {
    return sessionsObject.map(sessionObject =>
      this.deserializeSession(sessionObject)
    );
  }

  deserializeSession(sessionObject) {
    const token = sessionObject.token;
    const path = sessionObject.path;
    const types = sessionObject.types;
    const userAgent = sessionObject.user_agent;
    const testTimeout = sessionObject.test_timeout;
    const pendingTests = sessionObject.pending_tests;
    const runningTests = sessionObject.running_tests;
    const completedTests = sessionObject.completed_tests;
    const status = sessionObject.status;
    const testFilesCount = sessionObject.test_files_count;
    const testFilesCompleted = sessionObject.test_files_completed;
    const dateStarted = sessionObject.date_started;
    const dateFinished = sessionObject.date_finished;
    const isPublic = sessionObject.is_public;
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
      isPublic
    });
  }
}
let deserializer = new Deserializer();

module.exports = deserializer;
