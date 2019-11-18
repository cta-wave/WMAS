from __future__ import absolute_import
import re

from ..data.session import COMPLETED, ABORTED
from ..utils.serializer import serialize_session
from ..utils.deserializer import deserialize_session, deserialize_sessions

class SessionsDatabase(object):
    def initialize(self, results_database, tests_database):
        self._results_database = results_database
        self._tests_database = tests_database

        #tmp
        self._sessions = []

    def create_session(self, session):
        token = session.token
        session_dict = serialize_session(session)

        tests = {}
        if session.status != COMPLETED and session.status != ABORTED:
            tests[u"pending_tests"] = session.pending_tests
            tests[u"running_tests"] = session.running_tests
            tests[u"completed_tests"] = session.completed_tests

        tests[u"malfunctioning_tests"] = session.malfunctioning_tests
        self._tests_database.create_tests(token, tests)

        del session_dict[u"completed_tests"]
        del session_dict[u"running_tests"]
        del session_dict[u"pending_tests"]
        del session_dict[u"malfunctioning_tests"]
        self._sessions.append(session_dict)

    def read_session(self, token):
        session_dict = None
        for session in self._sessions:
            if session[u"token"] == token:
                session_dict = session
                break

        if session_dict is None: return None

        session = deserialize_session(session_dict)

        tests = self._tests_database.read_tests(token)

        if tests is not None:
            if session.status != COMPLETED and session.status != ABORTED:
                if u"pending_tests" in tests: session.pending_tests = tests[u"pending_tests"]
                if u"completed_tests" in tests: session.completed_tests = tests[u"completed_tests"]
                if u"running_tests" in tests: session.running_tests = tests[u"running_tests"]
            if u"malfunctioning_tests" in tests: session.malfunctioning_tests = tests[u"malfunctioning_tests"]

        return session

    def read_sessions(self):
        return deserialize_sessions(self._sessions)

    def read_expiring_sessions(self):
        expiring_sessions = []
        for session in self._sessions:
            if session[u"expiration_date"] == None: continue
            expiring_sessions.append(session)
        expiring_sessions = deserialize_sessions(expiring_sessions)
        return expiring_sessions

    def read_public_sessions(self):
        public_sessions = []
        for session in self._sessions:
            if not session.is_public: continue
            public_sessions.append(session)
        return public_sessions

    def update_session(self, session):
        token = session.token
        if self.read_session(token) is None: return
        session_dict = serialize_session(session)

        tests = {}
        if session.status != COMPLETED and session.status != ABORTED:
            tests[u"pending_tests"] = session.pending_tests
            tests[u"running_tests"] = session.running_tests
            tests[u"completed_tests"] = session.completed_tests

        tests[u"malfunctioning_tests"] = session.malfunctioning_tests
        self._tests_database.update_tests(token, tests)

        del session_dict[u"completed_tests"]
        del session_dict[u"running_tests"]
        del session_dict[u"pending_tests"]
        del session_dict[u"malfunctioning_tests"]

        for session in self._sessions:
            if session[u"token"] == token:
                self._sessions.remove(session)
                break
        self._sessions.append(session_dict)

    def delete_session(self, token):
        for session in self._sessions:
            if session[u"token"] == token:
                self._sessions.remove(session)
                break

        self._tests_database.delete_tests(token)
        self._results_database.delete_results(token)


    def find_tokens(self, fragment):
        tokens = []
        pattern = re.compile(u"^" + fragment)
        for session in self._sessions:
            if pattern.match(session[u"token"]) is not None:
                tokens.append(session[u"token"])
        return tokens