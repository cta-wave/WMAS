import re
from threading import Timer

from .event_dispatcher import TEST_COMPLETED_EVENT

class TestsManager:
    def initialize(
        self, 
        test_loader, 
        sessions_manager, 
        results_manager, 
        event_dispatcher
    ):
        self._test_loader = test_loader
        self._sessions_manager = sessions_manager
        self._results_manager = results_manager
        self._event_dispatcher = event_dispatcher

        self._timeouts = []

    def next_test(self, session):
        pending_tests = session.pending_tests
        running_tests = session.running_tests
        token = session.token

        test = self._get_next_test_from_list(pending_tests)
        if test is None: return None

        pending_tests = self.remove_test_from_list(pending_tests, test)
        running_tests = self.add_test_to_list(running_tests, test)

        test_timeout = self.get_test_timeout(test, session) / 1000.0
        print(test_timeout)

        def handler(self, token, test):
            print("TIMEOUT")
            self._on_test_timeout(token, test)

        timer = Timer(test_timeout, handler, [self, token, test])
        self._timeouts.append({
            "test": test,
            "timeout": timer
        })

        session.pending_tests = pending_tests
        session.running_tests = running_tests
        self._sessions_manager.update_session(session)

        timer.start()
        return test

    def _get_next_test_from_list(self, tests):
        test = None
        api = None
        has_http = True
        has_manual = True
        current_api = 0
        current_test = 0

        apis = list(tests.keys())
        apis.sort(key=lambda api: api.lower())

        for api in apis:
            tests[api].sort(key=lambda api: api.replace("/", "").lower())

        while test is None:
            if len(api) <= current_api: return None
            api = apis[current_api]

            if len(tests[api]) <= current_test:
                current_api = current_api + 1
                current_test = 0

                if current_api == len(apis):
                    if has_http:
                        has_http = False
                        current_api = 0
                        test = None
                        continue

                    if has_manual:
                        has_manual = False
                        current_api = 0
                        test = None
                        has_http = True
                        continue

                    return None
                
                test = None
                continue
            test = tests[api][current_test]

            if "manual" in test and "https" not in test: return test

            if "manual" in test and "https" in test:
                if not has_http: return test

            if "manual" not in test and "https" not in test:
                if not has_manual: return test

            if "manual" not in test and "https" in test:
                if not has_manual and not has_http: return test

            current_test = current_test + 1
            test = None

        return test

    def remove_test_from_list(self, test_list, test):
        api = None
        for part in test.split("/"):
            if part is None or part == "": continue
            api = part
            break
        if api not in test_list: return test_list
        if test not in test_list[api]: return test_list
        test_list[api].remove(test)
        if len(test_list[api]) == 0:
            del test_list[api]

        return test_list

    def add_test_to_list(self, test_list, test):
        api = None
        for part in test.split("/"):
            if part is None or part == "": continue
            api = part
            break
        if api in test_list and test in test_list[api]: return test_list
        if api not in test_list: test_list[api] = []
        test_list[api].append(test)
        return test_list

    def get_test_timeout(self, test, session):
        timeouts = session.timeouts
        print(timeouts)
        test_timeout = None
        
        for path in list(timeouts.keys()):
            pattern = re.compile("^" + path.replace(".", ""))
            if pattern.match(test.replace(".", "")) is not None:
                test_timeout = timeouts[path]
                break

        if test_timeout is None:
            if "manual" in test:
                test_timeout = timeouts["manual"]
            else:
                test_timeout = timeouts["automatic"]

        return test_timeout

    def _on_test_timeout(self, token, test):
        data = {
            "test": test,
            "status": "TIMEOUT",
            "message": None,
            "subtests": [
                {
                    "status": "TIMEOUT",
                    "xstatus": "SERVERTIMEOUT"
                }
            ]
        }

        self._results_manager.create_result(token, data)


    def read_tests(self):
        return self._test_loader.get_tests()

    def complete_test(self, test, session):
        running_tests = session.running_tests
        completed_tests = session.completed_tests

        running_tests = self.remove_test_from_list(running_tests, test)
        completed_tests = self.add_test_to_list(completed_tests, test)
        session.running_tests = running_tests
        session.completed_tests = completed_tests

        timeout = next((t for t in self._timeouts if t["test"] == test), None)
        timeout["timeout"].cancel()
        self._timeouts.remove(timeout)

        self.update_tests(
            running_tests=running_tests, 
            completed_tests=completed_tests, 
            session=session
        )

        self._event_dispatcher.dispatch_event(
            token=session.token,
            event_type=TEST_COMPLETED_EVENT,
            data=test
        )

    def update_tests(
        self, 
        pending_tests=None, 
        running_tests=None, 
        completed_tests=None, 
        session=None
    ):
        if completed_tests is not None:
            test_files_completed = self.calculate_test_files_count(completed_tests)
            session.test_files_completed = test_files_completed
            session.completed_tests = completed_tests

        if pending_tests is not None:
            session.pending_tests = pending_tests

        if running_tests is not None:
            session.running_tests = running_tests

        self._sessions_manager.update_session(session)


    def calculate_test_files_count(self, tests):
        count = {}
        for api in tests:
            count[api] = len(tests[api])
        return count
