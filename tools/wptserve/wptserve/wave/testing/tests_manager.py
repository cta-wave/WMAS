class TestsManager:
    def initialize(self, test_loader):
        self._test_loader = test_loader

    def read_tests(self):
        return self._test_loader.get_tests()