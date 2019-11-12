class TestsDatabase:
    def initialize(self):

        #tmp
        self._tests = {}

    def create_tests(self, token, tests):
        self._tests["token"] = token
        self._tests[token] = tests

    def read_tests(self, token):
        return self._tests["token"]

    def update_tests(self, token, tests):
        if token not in self._tests: return
        self._tests[token] = tests

    def delete_tests(self, token):
        del self._tests[token]