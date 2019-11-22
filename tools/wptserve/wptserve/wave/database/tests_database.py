
from __future__ import absolute_import
import os
import time
import Queue
from threading import Thread

from tinydb import TinyDB, Query

DB_ROOT_PATH = 'exports/'
DB_FILE_NAME = 'cachedump-tests.json'
NUM_OF_WORKERS = 4
MAX_CACHE_SIZE = 20 # 1 test entry contains max of ~22k sub tests files

class TestsDatabase(object):
    def initialize(self):
        script_path = os.path.realpath(__file__)
        target_dir = os.path.join(os.path.dirname(script_path), DB_ROOT_PATH)
        if not os.path.isdir(target_dir):
            try:
                os.mkdir(target_dir)
            except OSError as oerr:
                print("{} >> already exists ".format(target_dir), oerr)
        self._db_path = DB_ROOT_PATH + DB_FILE_NAME
        self.abs_db_path = os.path.join(
            os.path.dirname(__file__), 
            self._db_path
        )
        self._tests_db = pickledb.load(
            location=self._db_path,
            auto_dump=False
        )
        self.tests_q = Queue.Queue()

        for i in range(NUM_OF_WORKERS):
            t = Thread(target=self.__tests_worker)
            t.daemon = True
            t.start()

    def create_tests(self, token, tests):
        tests = self.__set_touch(tests)
        self._tests_db.set(
            key=token.encode('ascii', 'ignore'), 
            value=tests
        )
        self.__check_cache_size()

    def read_tests(self, token):
        return self._tests_db.get(
            key=token.encode('ascii', 'ignore')
        )

    def update_tests(self, token, tests):
        tests = self.__set_touch(tests)
        self._tests_db.set(
            key=token.encode('ascii', 'ignore'), 
            value=tests
        )

    def delete_tests(self, token):
        tests = self._tests_db.rem(
            key=token.encode('ascii', 'ignore')
        )
        return self.__remove_touch(tests)
    
    def export(self, elem):
        target_dir = os.path.join(
            os.path.dirname(__file__), 
            DB_ROOT_PATH, 
            elem.key
        )
        if not os.path.isdir(target_dir):
            os.mkdir(target_dir)
        
        # TODO: write alle test in target_dir
        # - ea test -> create a sub dir
        self.__write_tests_to_directory(target_dir, elem.item)

    def save_db(self):
        return self._tests_db.dump()

    def __check_cache_size(self):
        keys = self._tests_db.getall()
        oldest = self._tests_db.get(keys[0])
        oldest_key = keys[0]
        if len(keys) > MAX_CACHE_SIZE:
            for key in keys:
                curr_t = self._tests_db.get(keys)
                if oldest['touched'] > curr_t['touched']:
                    oldest = curr_t
                    oldest_key = key
        # FIXME: ONLY PUT 2 QUEUE IF CACHE IS TO BIG (PUT INSIDE PREV IF SCOPE)
        self.tests_q.put({'key': oldest_key, 'item': oldest})
        print("Queued tests I/O exports: {}".format(self.tests_q.qsize()))

    def __set_touch(self, tests):
        tests['touched'] = time.time()
        return tests

    def __remove_touch(self, tests):
        del tests['touched']
        return tests

    def __write_tests_to_directory(self, target_dir, tests):
        pass

    def __create_subdir(self, target_dir, tests):
        pass

    def __create_info_file(self, target_dir, tests):
        pass

    # Queue worker
    def __tests_worker(self):
        while True:
            elem = self.tests_q.get()
            print("__tests_worker on elem: {}".format(elem))
            self.export(elem)
            self.tests_q.task_done()
