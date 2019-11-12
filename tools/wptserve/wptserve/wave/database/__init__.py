from .sessions_database import SessionsDatabase
from .tests_database import TestsDatabase
from .results_database import ResultsDatabase

class Database:
    def __init__(self):
        sessions_database = SessionsDatabase()
        tests_database = TestsDatabase()
        results_database = ResultsDatabase()

        sessions_database.initialize(
            tests_database=tests_database, 
            results_database=results_database
        )
        self.create_session = sessions_database.create_session
        self.read_session = sessions_database.read_session
        self.read_sessions = sessions_database.read_sessions
        self.read_expiring_sessions = sessions_database.read_expiring_sessions
        self.read_public_sessions = sessions_database.read_public_sessions
        self.update_session = sessions_database.update_session
        self.delete_session = sessions_database.delete_session
        self.find_tokens = sessions_database.find_tokens

        tests_database.initialize()
        self.create_tests = tests_database.create_tests
        self.read_tests = tests_database.read_tests
        self.update_tests = tests_database.update_tests
        self.delete_tests = tests_database.delete_tests

        results_database.initialize()
        self.create_result = results_database.create_result
        self.read_results = results_database.read_results
        self.delete_results = results_database.delete_results