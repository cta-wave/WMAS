from __future__ import absolute_import

import os, time
from threading import Timer

from .sessions_database import SessionsDatabase
from .tests_database import TestsDatabase
from .results_database import ResultsDatabase

class Database(object):
    def __init__(self):
        self.sessions_database = SessionsDatabase()
        self.tests_database = TestsDatabase()
        self.results_database = ResultsDatabase()

        self.sessions_database.initialize(
            tests_database=self.tests_database, 
            results_database=self.results_database
        )
        self.create_session = self.sessions_database.create_session
        self.read_session = self.sessions_database.read_session
        self.read_sessions = self.sessions_database.read_sessions
        self.read_expiring_sessions = self.sessions_database.read_expiring_sessions
        self.read_public_sessions = self.sessions_database.read_public_sessions
        self.update_session = self.sessions_database.update_session
        self.delete_session = self.sessions_database.delete_session
        self.find_tokens = self.sessions_database.find_tokens
    
        self.tests_database.initialize()
        self.create_tests = self.tests_database.create_tests
        self.read_tests = self.tests_database.read_tests
        self.update_tests = self.tests_database.update_tests
        self.delete_tests = self.tests_database.delete_tests

        self.results_database.initialize()
        self.create_result = self.results_database.create_result
        self.read_results = self.results_database.read_results
        self.delete_results = self.results_database.delete_results

    def __dump_dbs(self):
        print("[Database] Dumping caches, time: {}".format(
            time.time()
        ))
        if (self.sessions_database.save_db() and
            self.tests_database.save_db() and
            self.results_database.save_db()):
            print("[Database] Cache dump DONE!\n Paths: \n{}\n{}\n{}".format(
                self.sessions_database.abs_db_path,
                self.tests_database.abs_db_path,
                self.results_database.abs_db_path
            ))
        else:
            raise DumpError("[Database] ERROR DURING CACHE DUMP!")
        # re-run cache dump scheduling
        self.save_caches()

    # See: https://docs.python.org/2.7/library/threading.html?highlight=timer#timer-objects
    def save_caches(self, interval=10):
        Timer(
            interval=interval,
            function=self.__dump_dbs, 
            args=()
        ).start()
        print("[Database] Schedule caches dump with {} seconds interval \
            current time: {}".format(interval, time.time()))

class DumpError(Exception):
    def __init__(self, msg):
        self.msg = msg
    def __str__(self):
        return repr(self.value)