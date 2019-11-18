class ResultsDatabase(object):
    def initialize(self):
        self._results = {}

    def create_result(self, token, result):
        if token not in self._results: self._results[token] = []
        self._results[token].append(result)

    def read_results(self, token):
        if token not in self._results: return []
        return self._results[token]

    def delete_results(self, token):
        if token not in self._results: return
        del self._results[token]