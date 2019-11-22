
from __future__ import absolute_import

import os
from tinydb import TinyDB, Query

DB_ROOT_PATH = 'exports/'
DB_FILE_NAME = 'cachedump-results.json'

class ResultsDatabase(object):
    def initialize(self):
        script_path = os.path.realpath(__file__)
        target_dir = os.path.join(os.path.dirname(script_path), DB_ROOT_PATH)
        if not os.path.isdir(target_dir):
            try:
                os.mkdir(target_dir)
            except OSError as oerr:
                print("{} >> already exists ".format(target_dir), oerr)
        self._db_path = DB_ROOT_PATH + DB_FILE_NAME
        self.abs_db_path = os.path.join(os.path.dirname(__file__), self._db_path)
        self._results_db = pickledb.load(
            location=self._db_path,
            auto_dump=False
        )

    def create_result(self, token, result):
        self._results_db.set(
            key=token.encode('ascii', 'ignore'), 
            value=result
        )

    def read_results(self, token):
        return self._results_db.get(
            key=token.encode('ascii', 'ignore')
        )
        

    def delete_results(self, token):
        return self._results_db.rem(
            key=token.encode('ascii', 'ignore')
        )
    
    def save_db(self):
        return self._results_db.dump()
