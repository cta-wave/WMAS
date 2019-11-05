import json
from .api_handler import ApiHandler

from ...utils.serializer import serialize_session


class TestsApiHandler(ApiHandler):
    def __init__(self, tests_manager, session_manager):
        self._tests_manager = tests_manager
        self._session_manager = session_manager

    def read_tests(self, response):
        tests = self._tests_manager.read_tests()
        self.send_json(tests, response)

    def read_session_tests(self, request, response):
        uri_parts = self.parse_uri(request)
        token = uri_parts[3]
        session = self._session_manager.read_session(token)

        if session is None:
            response.status = 404
            return
        
        data = serialize_session(session)
        tests = {
            "token": token,
            "pending_tests": data["pending_tests"],
            "running_tests": data["running_tests"],
            "completed_tests": data["completed_tests"]
        }
        self.send_json(tests, response)

    def handle_request(self, request, response):
        method = request.method
        uri_parts = self.parse_uri(request)
        uri_parts = uri_parts[3:]

        # /api/tests
        if len(uri_parts) == 0:         
            if method == "GET":
                self.read_tests(response)
                return

        # /api/tests/<token>
        if len(uri_parts) == 1:         
            if method == "GET":
                self.read_session_tests(request, response)
                return

        response.status = 404
