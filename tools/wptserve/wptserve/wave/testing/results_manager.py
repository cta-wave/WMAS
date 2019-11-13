import os
import shutil
import re

from .results_comparator import ResultsComparator


class ResultsManager:
    def initialize(
        self, 
        results_directory_path,
        sessions_manager,
        tests_manager,
        database
    ):
        self._results_directory_path = results_directory_path
        self._sessions_manager = sessions_manager
        self._tests_manager = tests_manager
        self._database = database
        self._results_comparator = ResultsComparator(results_manager=self)
        self.read_common_passed_tests = self._results_comparator.read_common_passed_tests

    def create_result(self, token, data):
        result = self.prepare_result(data)
        test = result["test"]
        print(test)

        session = self._sessions_manager.read_session(token)

        if session is None: return
        if not self._sessions_manager.test_in_session(test, session): return
        if self._sessions_manager.is_test_complete(test, session): return
        self._tests_manager.complete_test(test, session)
        self._database.create_result(token, result)

        api = next((p for p in test.split("/") if p is not None), None)
        if not self._sessions_manager.is_api_complete(api, session): return
        self.save_api_results(token, api)
        self.generate_report(token, api)

        test_files_count = session.test_files_count
        apis = list(test_files_count.keys())
        if next((a for a in apis if self._sessions_manager.is_api_complete(a, session)), None) is not None: return
        self._sessions_manager.complete_session(token)
        self.create_info_file(session)

    def read_results(self, token, filter_path=None):
        filter_api = None
        if filter_path is not None:
            filter_api = next((p for p in filter_path.split("/") if p is not None), None)
        results = self._database.read_results(token)

        results_per_api = {}

        for result in results:
            api = next((p for p in result["test"].split("/") if p is not ""), None)
            if filter_api is not None and api.lower() != filter_api.lower(): continue
            if filter_path is not None:
                pattern = re.compile("^" + filter_path.replace(".", ""))
                if pattern.match(result["test"].replace(".", "")) is None: continue
            if api not in results_per_api: results_per_api[api] = []
            results_per_api[api].append(result)

        return results_per_api


    def delete_results(self, token):
        results_directory = os.path.join(self._results_directory_path, token)
        if not os.path.isdir(results_directory): return
        shutil.rmtree(results_directory)

    def prepare_result(self, result):
        harness_status_map = {
            0: "OK",
            1: "ERROR",
            2: "TIMEOUT",
            3: "NOTRUN",
            "OK": "OK",
            "ERROR": "ERROR",
            "TIMEOUT": "TIMEOUT",
            "NOTRUN": "NOTRUN"
        }

        subtest_status_map = {
            0: "PASS",
            1: "FAIL",
            2: "TIMEOUT",
            3: "NOTRUN",
            "PASS": "PASS",
            "FAIL": "FAIL",
            "TIMEOUT": "TIMEOUT",
            "NOTRUN": "NOTRUN"
        }

        if "tests" in result:
            for test in results["tests"]:
                test["status"] = subtest_status_map[test["status"]]
                if "stack" in test: del test["stack"]
            result["subtests"] = result["tests"]
            del result["tests"]

        if "stack" in result: del result["stack"]
        result["status"] = harness_status_map[result["status"]]

        return result

    def save_api_results(self, token, api):
        print("TODO: IMPLEMENT save_api_results")
    
    def generate_report(self, token, api):
        print("TODO: IMPLEMENT generate_report")

    def create_info_file(self, session):
        print("TODO: IMPLEMENT create_info_file")