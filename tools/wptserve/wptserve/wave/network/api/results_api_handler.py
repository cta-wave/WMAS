from __future__ import absolute_import
import json
import sys
import traceback

from .api_handler import ApiHandler

from ...utils.serializer import serialize_session
from ...data.exceptions.not_found_exception import NotFoundException


class ResultsApiHandler(ApiHandler):
    def __init__(self, results_manager):
        self._results_manager = results_manager

    def create_result(self, request, response):
        try:
            uri_parts = self.parse_uri(request)
            token = uri_parts[3]

            data = None
            body = request.body.decode(u"utf-8")
            if body != u"":
                data = json.loads(body)

            self._results_manager.create_result(token, data)

        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print(u"Failed to create result: " + info[0].__name__ + u": " + unicode(info[1].args[0]))
            response.status = 500

    def read_results(self, request, response):
        try:
            uri_parts = self.parse_uri(request)
            token = uri_parts[3]

            results = self._results_manager.read_results(token)

            self.send_json(response=response, data=results)

        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to read results: " + info[0].__name__ + u": " + info[1].args[0]
            response.status = 500

    def read_results_compact(self, request, response):
        try:
            uri_parts = self.parse_uri(request)
            token = uri_parts[3]

            results = self._results_manager.read_flattened_results(token)

            self.send_json(response=response, data=results)

        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to read compact results: " + info[0].__name__ + u": " + info[1].args[0]
            response.status = 500
    
    def read_results_api_wpt_report_url(self, request, response):
        try:
            uri_parts = self.parse_uri(request)
            token = uri_parts[3]
            api = uri_parts[4]

            uri = self._results_manager.read_results_wpt_report_uri(token, api)
            self.send_json({"uri": uri}, response)
        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to read results report url: " + info[0].__name__ + u": " + info[1].args[0]
            response.status = 500

    def read_results_api_wpt_multi_report_uri(self, request, response):
        try:
            uri_parts = self.parse_uri(request)
            api = uri_parts[3]
            query = self.parse_query_parameters(request)
            tokens = query["tokens"].split(",")
            uri = self._results_manager.read_results_wpt_multi_report_uri(
                    tokens,
                    api
            )
            self.send_json({"uri": uri}, response)
        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print u"Failed to read results multi report url: " + info[0].__name__ + u": " + unicode(info[1].args[0])
            response.status = 500

    def handle_request(self, request, response):
        method = request.method
        uri_parts = self.parse_uri(request)
        uri_parts = uri_parts[3:]

        # /api/results/<token>
        if len(uri_parts) == 1:         
            if method == u"POST":
                self.create_result(request, response)
                return

            if method == u"GET":
                self.read_results(request, response)
                return

        # /api/results/<token>/<function>
        if len(uri_parts) == 2:  
            function = uri_parts[1]
            if method == u"GET":
                if function == u"compact":
                    self.read_results_compact(request, response)
                    return
                if function == u"reporturl":
                    return self.read_results_api_wpt_multi_report_uri(request, response)

        # /api/results/<token>/<api>/<function>
        if len(uri_parts) == 3:  
            function = uri_parts[2]
            if method == u"GET":
                if function == u"reporturl":
                    self.read_results_api_wpt_report_url(request, response)
                    return

        response.status = 404
