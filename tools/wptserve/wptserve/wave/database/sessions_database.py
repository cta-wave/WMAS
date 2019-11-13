import re

from ..data.session import COMPLETED, ABORTED
from ..utils.serializer import serialize_session
from ..utils.deserializer import deserialize_session, deserialize_sessions

class SessionsDatabase:
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
            tests["pending_tests"] = session.pending_tests
            tests["running_tests"] = session.running_tests
            tests["completed_tests"] = session.completed_tests

        tests["malfunctioning_tests"] = session.malfunctioning_tests
        self._tests_database.create_tests(token, tests)

        del session_dict["completed_tests"]
        del session_dict["running_tests"]
        del session_dict["pending_tests"]
        del session_dict["malfunctioning_tests"]
        self._sessions.append(session_dict)

    def read_session(self, token):
        session_dict = None
        for session in self._sessions:
            if session["token"] == token:
                session_dict = session
                break

        if session_dict is None: return None

        session = deserialize_session(session_dict)

        tests = self._tests_database.read_tests(token)

        if tests is not None:
            if session.status != COMPLETED and session.status != ABORTED:
                if "pending_tests" in tests: session.pending_tests = tests["pending_tests"]
                if "completed_tests" in tests: session.completed_tests = tests["completed_tests"]
                if "running_tests" in tests: session.running_tests = tests["running_tests"]
            if "malfunctioning_tests" in tests: session.malfunctioning_tests = tests["malfunctioning_tests"]

        return session

    def read_sessions(self):
        return deserialize_sessions(self._sessions)

    def read_expiring_sessions(self):
        expiring_sessions = []
        for session in self._sessions:
            if session["expiration_date"] == None: continue
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
            tests["pending_tests"] = session.pending_tests
            tests["running_tests"] = session.running_tests
            tests["completed_tests"] = session.completed_tests

        tests["malfunctioning_tests"] = session.malfunctioning_tests
        self._tests_database.update_tests(token, tests)

        del session_dict["completed_tests"]
        del session_dict["running_tests"]
        del session_dict["pending_tests"]
        del session_dict["malfunctioning_tests"]

        for session in self._sessions:
            if session["token"] == token:
                self._sessions.remove(session)
                break
        self._sessions.append(session_dict)

    def delete_session(self, token):
        for session in self._sessions:
            if session["token"] == token:
                self._sessions.remove(session)
                break

        self._tests_database.delete_tests(token)
        self._results_database.delete_results(token)


    def find_tokens(self, fragment):
        tokens = []
        pattern = re.compile("^" + fragment)
        for session in self._sessions:
            if pattern.match(session.token) is not None:
                tokens.append(session.token)
        return tokens