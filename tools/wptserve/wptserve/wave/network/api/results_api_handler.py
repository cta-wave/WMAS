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
            body = request.body.decode("utf-8")
            if body != "":
                data = json.loads(body)

            self._results_manager.create_result(token, data)

        except Exception as e:
            info = sys.exc_info()
            traceback.print_tb(info[2])
            print("Failed to create result: " + info[0].__name__ + ": " + info[1].args[0])
            response.status = 500

    def handle_request(self, request, response):
        method = request.method
        uri_parts = self.parse_uri(request)
        uri_parts = uri_parts[3:]

        # /api/results/<token>
        if len(uri_parts) == 1:         
            if method == "POST":
                self.create_result(request, response)
                return

        response.status = 404
