import os
import shutil

from .results_comparator import ResultsComparator


class ResultsManager:
    def initialize(self, results_directory_path):
        self._results_directory_path = results_directory_path
        self._results_comparator = ResultsComparator(results_manager=self)
        self.read_common_passed_tests = self._results_comparator.read_common_passed_tests

    def read_results(self, token):
        return {}


    def delete_results(self, token):
        results_directory = os.path.join(self._results_directory_path, token)
        if not os.path.isdir(results_directory): return
        shutil.rmtree(results_directory)