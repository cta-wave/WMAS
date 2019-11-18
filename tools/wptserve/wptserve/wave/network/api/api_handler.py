from __future__ import absolute_import
import json


class ApiHandler(object):
    def send_json(self, data, response, status=200):
        json_string = json.dumps(data)
        response.content = json_string
        response.headers = [(u"Content-Type", u"application/json")]
        response.status = status

    def parse_uri(self, request):
        uri_parts = []
        for part in request.request_path.split(u"/"):
            if part == u"":
                continue
            uri_parts.append(part)
        return uri_parts
