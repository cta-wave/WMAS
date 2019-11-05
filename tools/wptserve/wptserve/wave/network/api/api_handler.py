import json


class ApiHandler:
    def send_json(self, data, response, status=200):
        json_string = json.dumps(data)
        response.content = json_string
        response.headers = [("Content-Type", "application/json")]
        response.status = status

    def parse_uri(self, request):
        uri_parts = []
        for part in request.request_path.split("/"):
            if part == "":
                continue
            uri_parts.append(part)
        return uri_parts
