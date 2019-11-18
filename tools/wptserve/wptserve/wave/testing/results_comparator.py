class ResultsComparator(object):
    def __init__(self, results_manager):
        self._results_manager = results_manager

    def read_common_passed_tests(self, tokens=[]):
        if tokens is None or len(tokens) == 0: return None

        session_results = []

        for token in tokens:
            session_result = self._results_manager.read_results(token)
            session_results.append(session_result)

        passed_tests = {}
        failed_tests = {}

        for result in session_results:
            for api in result:
                if api not in passed_tests: passed_tests[api] = []
                if api not in failed_tests: failed_tests[api] = []

                for api_result in result[api]:
                    passed = True
                    for subtest in api_result[u"subtests"]:
                        if subtest[u"status"] == u"PASS": continue
                        passed = False
                        break

                    test = api_result[u"test"]

                    if passed:
                        if test in failed_tests[api]: continue
                        if test in passed_tests[api]: continue
                        passed_tests[api].append(test)
                    else:
                        if test in passed_tests[api]:
                            passed_tests.remove(test)
                        if test in failed_tests[api]: continue
                        failed_tests[api].append(test)
        return passed_tests