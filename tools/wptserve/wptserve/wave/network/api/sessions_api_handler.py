from __future__ import absolute_import
import json
import sys
import traceback

from .api_handler import ApiHandler

from ...utils.serializer import serialize_session
from ...data.exceptions.not_found_exception import NotFoundException

TOKEN_LENGTH = 36

class SessionsApiHandler(ApiHandler):
    def __init__(self, sessions_manager, results_manager):
        self._sessions_manager = sessions_manager
        self._results_manager = results_manager

    def create_session(self, request, response):
        try:
            config = {}
            body = request.body.decode(u"utf-8")
            if body != u"":
                config = json.loads(body)
            tests = {}
            if u"tests" in config:
                tests = config[u"tests"]
            types = None
            if u"types" in config:
                types = config[u"types"]
            timeouts = {}
            if u"timeouts" in config:
                timeouts = config[u"timeouts"]
            reference_tokens = []
            if u"reference_tokens" in config:
                reference_tokens = config[u"reference_tokens"]
            webhook_urls = []
            if u"webhook_urls" in config:
                webhook_urls = config[u"webhook_urls"]
            user_agent = request.headers[b"user-agent"].decode(u"utf-8")
            labels = []
            if u"labels" in config:
                labels = config[u"labels"]
            expiration_date = None
            if u"expiration_date" in config:
                expiration_date = config[u"expiration_date"]

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

            self.send_json({u"token": session.token}, response)
        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to create session: u" + info[0].__name__ + u": u" + info[1].args[0]
            response.status = 500

    def read_session(self, request, response):
        try:
            uri_parts = self.parse_uri(request)
            token = uri_parts[3]

            session = self._sessions_manager.read_session(token)
            if session is None:
                response.status = 404
                return

            data = serialize_session(session)

            del data[u"pending_tests"]
            del data[u"running_tests"]
            del data[u"completed_tests"]
            del data[u"malfunctioning_tests"]
            del data[u"test_files_count"]
            del data[u"test_files_completed"]
            del data[u"date_started"]
            del data[u"date_finished"]
            del data[u"status"]

            self.send_json(data, response)
        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to read session: u" + info[0].__name__ + u": u" + info[1].args[0]
            response.status = 500

    def read_session_status(self, request, response):
        try:
            uri_parts = self.parse_uri(request)
            token = uri_parts[3]

            session = self._sessions_manager.read_session(token)
            data = serialize_session(session)

            del data[u"tests"]
            del data[u"pending_tests"]
            del data[u"running_tests"]
            del data[u"completed_tests"]
            del data[u"malfunctioning_tests"]
            del data[u"types"]
            del data[u"user_agent"]
            del data[u"timeouts"]
            del data[u"browser"]
            del data[u"is_public"]
            del data[u"reference_tokens"]
            del data[u"webhook_urls"]

            self.send_json(data, response)
        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to read session status: u" + info[0].__name__ + u": u" + info[1].args[0]
            response.status = 500

    def read_public_sessions(self, request, response):
        try:
            session_tokens = self._sessions_manager.read_public_sessions()

            self.send_json(session_tokens, response)
        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to read public session: u" + info[0].__name__ + u": u" + info[1].args[0]
            response.status = 500

    def update_session_configuration(self, request, response):
        try:
            uri_parts = self.parse_uri(request)
            token = uri_parts[3]

            config = {}
            body = request.body.decode(u"utf-8")
            if body != u"":
                config = json.loads(body)

            tests = {}
            if u"tests" in config:
                tests = config[u"tests"]
            types = None
            if u"types" in config:
                types = config[u"types"]
            timeouts = {}
            if u"timeouts" in config:
                timeouts = config[u"timeouts"]
            reference_tokens = []
            if u"reference_tokens" in config:
                reference_tokens = config[u"reference_tokens"]
            webhook_urls = []
            if u"webhook_urls" in config:
                webhook_urls = config[u"webhook_urls"]

            self._sessions_manager.update_session_configuration(
                token,
                tests,
                types,
                timeouts,
                reference_tokens,
                webhook_urls
            )
        except NotFoundException as e:
            print u"Failed to update session: u" + e.args[0]
            response.status = 404
        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to update session: u" + info[0].__name__ + u": u" + info[1].args[0]
            response.status = 500

    def update_labels(self, request, response):
        try:
            uri_parts = self.parse_uri(request)
            token = uri_parts[3]
            body = request.body.decode(u"utf-8")
            labels = None
            if body != u"":
                labels = json.loads(body)
                if u"labels" in labels:
                    labels = labels[u"labels"]

            self._sessions_manager.update_labels(token=token, labels=labels)
        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to update labels: u" + info[0].__name__ + u": u" + info[1].args[0]
            response.status = 500

    def delete_session(self, request, response):
        try:
            uri_parts = self.parse_uri(request)
            token = uri_parts[3]

            session = self._sessions_manager.read_session(token)
            if session is None:
                response.status = 404
                return

            self._sessions_manager.delete_session(token)
            self._results_manager.delete_results(token)
        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to delete session: u" + info[0].__name__ + u": u" + info[1].args[0]
            response.status = 500

    def start_session(self, request, response):
        try:
            uri_parts = self.parse_uri(request)
            token = uri_parts[3]

            self._sessions_manager.start_session(token)
        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to start session: u" + info[0].__name__ + u": u" + info[1].args[0]
            response.status = 500

    def pause_session(self, request, response):
        try:
            uri_parts = self.parse_uri(request)
            token = uri_parts[3]

            self._sessions_manager.pause_session(token)
        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to pause session: u" + info[0].__name__ + u": u" + info[1].args[0]
            response.status = 500

    def stop_session(self, request, response):
        try:
            uri_parts = self.parse_uri(request)
            token = uri_parts[3]

            self._sessions_manager.stop_session(token)
        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to pause session: u" + info[0].__name__ + u": u" + info[1].args[0]
            response.status = 500

    def find_session(self, request, response):
        try:
            uri_parts = self.parse_uri(request)
            fragment = uri_parts[3]

            token = self._sessions_manager.find_token(fragment)
            if token is None:
                response.status = 404
                return

            self.send_json({u"token": token}, response)
        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to pause session: u" + info[0].__name__ + u": u" + info[1].args[0]
            response.status = 500

    def handle_request(self, request, response):
        method = request.method
        uri_parts = self.parse_uri(request)
        uri_parts = uri_parts[3:]

        # /api/sessions
        if len(uri_parts) == 0:         
            if method == u"POST":
                self.create_session(request, response)
                return

        # /api/sessions/<token>
        if len(uri_parts) == 1:
            function = uri_parts[0]     
            if method == u"GET":
                if function == u"public":
                    self.read_public_sessions(request, response)
                    return
                if len(function) != TOKEN_LENGTH:
                    self.find_session(request, response)
                    return
                self.read_session(request, response)
                return
            if method == u"PUT":
                self.update_session_configuration(request, response)
                return
            if method == u"DELETE":
                self.delete_session(request, response)
                return

        # /api/sessions/<token>/<function>
        if len(uri_parts) == 2:
            function = uri_parts[1]
            if method == u"GET":
                if function == u"status":
                    self.read_session_status(request, response)
                    return
            if method == u"POST":
                if function == u"start":
                    self.start_session(request, response)
                    return
                if function == u"pause":
                    self.pause_session(request, response)
                    return
                if function == u"stop":
                    self.stop_session(request, response)
                    return
            if method == u"PUT":
                if function == u"labels":
                    self.update_labels(request, response)
                    return

        response.status = 404
