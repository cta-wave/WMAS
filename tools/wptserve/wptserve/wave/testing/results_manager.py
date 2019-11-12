import os
import shutil

from .results_comparator import ResultsComparator


class ResultsManager:
    def initialize(
        self, 
        results_directory_path,
        sessions_manager
    ):
        self._results_directory_path = results_directory_path
        self._sessions_manager = sessions_manager
        self._results_comparator = ResultsComparator(results_manager=self)
        self.read_common_passed_tests = self._results_comparator.read_common_passed_tests

    def create_result(self, token, data):
        result = self.prepare_result(data)
        test = result["test"]

        session = self._sessions_manager.read_session(token)

        if session is None: return

    def prepare_result(self, result):
        harness_status_map = {
            0: "OK",
            1: "ERROR",
            2: "TIMEOUT",
            3: "NOTRUN"
        }

        subtest_status_map = {
            0: "PASS",
            1: "FAIL",
            2: "TIMEOUT",
            3: "NOTRUN"
        }

        if "tests" in result:
            for test in results["tests"]:
                test["status"] = subtest_status_map[test.["status"]]
                del test["stack"]
            result["subtests"] = result["tests"]
            del result["tests"]

        del result["stack"]
        result["status"] = harness_status_map[result["status"]]

        return result

    def read_results(self, token):
        return {}


    def delete_results(self, token):
        results_directory = os.path.join(self._results_directory_path, token)
        if not os.path.isdir(results_directory): return
        shutil.rmtree(results_directory)