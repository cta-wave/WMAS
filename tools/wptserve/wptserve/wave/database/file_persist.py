from __future__ import absolute_import
import os
import time
import json
import Queue
from threading import Thread

DB_ROOT_PATH = 'exports/'
NUM_OF_WRITE_WORKERS = 4

class FilePersist(object):
    def initialize(self):
        script_path = os.path.realpath(__file__)
        target_dir = os.path.join(os.path.dirname(script_path), DB_ROOT_PATH)
        if not os.path.isdir(target_dir):
            try:
                os.mkdir(target_dir)
            except OSError as oerr:
                print("{} >> already exists ".format(target_dir), oerr)
        self.abs_db_path = target_dir
        self.file_write_q = queue.Queue()
        for i in range(NUM_OF_WRITE_WORKERS):
            t = Thread(target=self.__file_write_worker)
            t.daemon = True
            t.start()

    def create(self, token, item, type):
        self.file_write_q.put({'token': token, 'item': intem, 'type': type})
        print("Queued tests I/O exports: {}".format(self.file_q.qsize()))
        pass

    def read(self, token, type):
        script_path = os.path.realpath(__file__)
        target_dir = os.path.join(os.path.dirname(script_path), DB_ROOT_PATH)
        res = []
        with open(os.path.join(target_dir, "{}.txt".format(token))) as f:
            for line in f:
                # print line,
                res.append(json.loads(line))
                pass

    def update(self, token, item, type):
        self.file_write_q.put({'token': token, 'item': intem, 'type': type})
        print("Queued tests I/O exports: {}".format(self.file_q.qsize()))
        pass

    def delete(self, token, type):
        pass
    
    def export(self, q_elem, type):
        target_dir = os.path.join(
            os.path.dirname(__file__), 
            DB_ROOT_PATH, 
            q_elem.token
        )
        if not os.path.isdir(target_dir):
            os.mkdir(target_dir)
        
        # TODO: write alle test in target_dir
        # - ea test -> create a sub dir
        self.__write_to_dir(target_dir, q_elem)

    def __write_to_dir(self, target_dir, q_elem):
        script_path = os.path.realpath(__file__)
        target_dir = os.path.join(os.path.dirname(script_path), DB_ROOT_PATH)
        file = os.path.join(target_dir, "{}.txt".format(token))
        with open(file, 'w') as outfile:
            json.dump(item, outfile)
        pass

    def __create_subdir(self, target_dir, q_elem):
        pass

    def __create_info_file(self, target_dir, q_elem):
        pass

    # write wueue worker
    def __file_write_worker(self):
        while True:
            q_elem = self.file_q.get()
            print("__file_write_worker on queue elem: {}".format(q_elem))
            self.export(q_elem)
            self.file_write_q.task_done()
        


if __name__ == "__main__":
    fp = FilePersist()
    fp.read("myfile",2)
    fp.read("test",2)
    print("done")