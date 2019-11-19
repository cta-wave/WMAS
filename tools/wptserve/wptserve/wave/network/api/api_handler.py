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

    def parse_query_parameters(self, request):
        if u"?" not in request.request_path: return {}
        query = request.request_path.split(u"?")[1]
        if query == u"": return {}
        key_value_pairs = []
        if u"&" in query:
            key_value_pairs = query.split(u"&")
        else:
            key_value_pairs.append(query)

        parsed_parameters = {}
        for key_value_pair in key_value_pairs:
            if u"=" not in key_value_pair:
                parsed_parameters[key_value_pair] = True
                continue
            key, value = key_value_pair.split(u"=")
            parsed_parameters[key] = value

        return parsed_parameters


