import json
from .api_handler import ApiHandler

from ...utils.serializer import serialize_session


class SessionsApiHandler(ApiHandler):
    def __init__(self, sessions_manager, results_manager):
        self._sessions_manager = sessions_manager
        self._results_manager = results_manager

    def create_session(self, request, response):
        config = {}
        body = request.body.decode("utf-8")
        if body != "":
            config = json.loads(body)
        tests = {}
        if "tests" in config:
            tests = config["tests"]
        types = None
        if "types" in config:
            types = config["types"]
        timeouts = {}
        if "timeouts" in config:
            timeouts = config["timeouts"]
        reference_tokens = []
        if "reference_tokens" in config:
            reference_tokens = config["reference_tokens"]
        webhook_urls = []
        if "webhook_urls" in config:
            webhook_urls = config["webhook_urls"]
        user_agent = request.headers[b"user-agent"].decode("utf-8")
        labels = []
        if "labels" in config:
            labels = config["labels"]
        expiration_date = None
        if "expiration_date" in config:
            expiration_date = config["expiration_date"]

        session = self._sessions_manager.create_session(
            tests,
            types,
            timeouts,
            reference_tokens,
            webhook_urls,
            user_agent,
            labels,
            expiration_date
        )

        self.send_json({"token": session.token}, response)

    def read_session(self, request, response):
        uri_parts = self.parse_uri(request)
        token = uri_parts[3]

        session = self._sessions_manager.read_session(token)
        if session is None:
            response.status = 404
            return

        data = serialize_session(session)

        del data["pending_tests"]
        del data["running_tests"]
        del data["completed_tests"]
        del data["malfunctioning_tests"]
        del data["test_files_count"]
        del data["test_files_completed"]
        del data["date_started"]
        del data["date_finished"]
        del data["status"]

        self.send_json(data, response)

    def read_session_status(self, request, response):
        uri_parts = self.parse_uri(request)
        token = uri_parts[3]

        session = self._sessions_manager.read_session(token)
        data = serialize_session(session)

        del data["tests"]
        del data["pending_tests"]
        del data["running_tests"]
        del data["completed_tests"]
        del data["malfunctioning_tests"]
        del data["types"]
        del data["user_agent"]
        del data["timeouts"]
        del data["browser"]
        del data["is_public"]
        del data["reference_tokens"]
        del data["webhook_urls"]

        self.send_json(data, response)

    def update_session_configuration(self, request, response):
        uri_parts = self.parse_uri(request)
        token = uri_parts[3]

        config = {}
        body = request.body.decode("utf-8")
        if body != "":
            config = json.loads(body)

        tests = {}
        if "tests" in config:
            tests = config["tests"]
        types = None
        if "types" in config:
            types = config["types"]
        timeouts = {}
        if "timeouts" in config:
            timeouts = config["timeouts"]
        reference_tokens = []
        if "reference_tokens" in config:
            reference_tokens = config["reference_tokens"]
        webhook_urls = []
        if "webhook_urls" in config:
            webhook_urls = config["webhook_urls"]

        self._sessions_manager.update_session_configuration(
            token,
            tests,
            types,
            timeouts,
            reference_tokens,
            webhook_urls
        )

    def update_labels(self, request, response):
        uri_parts = self.parse_uri(request)
        token = uri_parts[3]
        body = request.body.decode("utf-8")
        labels = None
        if body != "":
            labels = json.loads(body)
            if "labels" in labels:
                labels = labels["labels"]

        self._sessions_manager.update_labels(token=token, labels=labels)

    def delete_session(self, request, response):
        uri_parts = self.parse_uri(request)
        token = uri_parts[3]

        session = self._sessions_manager.read_session(token)
        if session is None:
            response.status = 404
            return

        self._sessions_manager.delete_session(token)
        self._results_manager.delete_results(token)

    def start_session(self, request, response):
        uri_parts = self.parse_uri(request)
        token = uri_parts[3]

        self._sessions_manager.start_session(token)

    def handle_request(self, request, response):
        method = request.method
        uri_parts = self.parse_uri(request)
        uri_parts = uri_parts[3:]

        # /api/sessions
        if len(uri_parts) == 0:         
            if method == "POST":
                self.create_session(request, response)
                return

        # /api/sessions/<token>
        if len(uri_parts) == 1:         
            if method == "GET":
                self.read_session(request, response)
                return
            if method == "PUT":
                self.update_session_configuration(request, response)
                return
            if method == "DELETE":
                self.delete_session(request, response)
                return

        # /api/sessions/<token>/<function>
        if len(uri_parts) == 2:
            function = uri_parts[1]
            if method == "GET":
                if function == "status":
                    self.read_session_status(request, response)
                    return
            if method == "POST":
                if function == "start":
                    self.start_session(request, response)
                    return
            if method == "PUT":
                if function == "labels":
                    self.update_labels(request, response)
                    return

        response.status = 404
