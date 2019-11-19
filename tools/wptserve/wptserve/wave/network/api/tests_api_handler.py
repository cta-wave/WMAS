from __future__ import absolute_import
import json
import sys
import traceback

from .api_handler import ApiHandler
from ...utils.serializer import serialize_session
from ...data.session import PAUSED, COMPLETED, ABORTED, PENDING, RUNNING


class TestsApiHandler(ApiHandler):
    def __init__(
        self, 
        wpt_port, 
        wpt_ssl_port, 
        tests_manager, 
        sessions_manager,
        hostname
    ):
        self._tests_manager = tests_manager
        self._sessions_manager = sessions_manager
        self._wpt_port = wpt_port
        self._wpt_ssl_port = wpt_ssl_port
        self._hostname = hostname

    def read_tests(self, response):
        tests = self._tests_manager.read_tests()
        self.send_json(tests, response)

    def read_session_tests(self, request, response):
        uri_parts = self.parse_uri(request)
        token = uri_parts[3]
        session = self._sessions_manager.read_session(token)

        if session is None:
            response.status = 404
            return
        
        data = serialize_session(session)
        tests = {
            u"token": token,
            u"pending_tests": data[u"pending_tests"],
            u"running_tests": data[u"running_tests"],
            u"completed_tests": data[u"completed_tests"]
        }
        self.send_json(tests, response)

    
    def read_next_test(self, request, response):
        try:
            uri_parts = self.parse_uri(request)
            token = uri_parts[3]
            hostname = self._hostname

            session = self._sessions_manager.read_session(token)
            if session is None:
                response.status = 404
                return

            if session.status == PAUSED:
                url = self._generate_wave_url(
                    hostname=hostname,
                    uri=u"/pause.html",
                    token=token
                )
                self.send_json({u"next_test": url}, response)
                return
            if session.status == COMPLETED or session.status == ABORTED:
                url = self._generate_wave_url(
                    hostname=hostname,
                    uri=u"/finish.html",
                    token=token
                )
                self.send_json({u"next_test": url}, response)
                return
            if session.status == PENDING:
                url = self._generate_wave_url(
                    hostname=hostname,
                    uri=u"/newsession.html",
                    token=token
                )
                self.send_json({u"next_test": url}, response)
                return
            
            test = self._tests_manager.next_test(session)

            if test is None:
                if session.status != RUNNING: return
                url = self._generate_wave_url(
                    hostname=hostname,
                    uri=u"/finish.html",
                    token=token
                )
                self.send_json({u"next_test": url}, response)
                self._sessions_manager.complete_session(token)
                return

            test_timeout = self._tests_manager.get_test_timeout(test=test, session=session)
            url = self._generate_test_url(
                test=test,
                token=token,
                test_timeout=test_timeout,
                hostname=hostname
            )

            self.send_json({
                u"next_test": url
            }, response)
        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to read next test: u" + info[0].__name__ + u": u" + info[1].args[0]
            response.status = 500

    def handle_request(self, request, response):
        method = request.method
        uri_parts = self.parse_uri(request)
        uri_parts = uri_parts[3:]

        # /api/tests
        if len(uri_parts) == 0:         
            if method == u"GET":
                self.read_tests(response)
                return

        # /api/tests/<token>
        if len(uri_parts) == 1:         
            if method == u"GET":
                self.read_session_tests(request, response)
                return

        # /api/tests/<token>/<function>
        if len(uri_parts) == 2:
            function = uri_parts[1]
            if method == u"GET":
                if function == u"next":
                    self.read_next_test(request, response)
                    return

        response.status = 404

    def _generate_wave_url(self, hostname, uri, token):
        return self._generate_url(
            hostname=hostname,
            uri=uri,
            port=self._wpt_port,
            query=u"?token=u" + token
        )

    def _generate_test_url(self, hostname, test, token, test_timeout):
        protocol = u"http"
        port = self._wpt_port

        if u"https" in test:
            protocol = u"https"
            port = self._wpt_ssl_port

        query = u"?token={}&timeout={}".format(token, test_timeout)

        return self._generate_url(
            protocol=protocol,
            hostname=hostname,
            port=port,
            uri=test,
            query=query
        )

    def _generate_url(self, hostname, port=80, uri=u"/", query=u"", protocol=u"http"):
        if not uri.startswith(u"/"): uri = u"/" + uri
        return u"{}://{}:{}{}{}".format(protocol, hostname, port, uri, query)