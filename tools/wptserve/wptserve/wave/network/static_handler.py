import os


class StaticHandler:
    def __init__(self):
        self.static_dir = os.path.join(
            os.getcwd(), "tools/wptserve/wptserve/wave/www")
        print(self.static_dir)

    def handle_request(self, request, response):
        file_path = "."

        for part in request.request_path.split("/")[2:]:
            file_path = file_path + "/" + part

        if file_path == "." or file_path == "./":
            file_path = "index.html"

        file_path = file_path.split("?")[0]
        file_path = os.path.join(self.static_dir, file_path)

        headers = []

        content_types = {
            "html": "text/html",
            "js": "text/javascript",
            "css": "text/css",
            "jpg": "image/jpeg",
            "jpeg": "image/jpeg",
            "ttf": "font/ttf",
            "woff": "font/woff",
            "woff2": "font/woff2"
        }

        headers.append(
            ("Content-Type", content_types[file_path.split(".")[-1]]))

        data = None
        with open(file_path, "rb") as file:
            data = file.read()

        response.content = data
        response.headers = headers


# add_required_headers
# close_connection
# content
# delete_cookie
# encoding
# explicit_flush
# headers
# iter_content
# logger
# request
# send_body_for_head_request
# set_cookie
# set_error
# status
# unset_cookie
# write
# write_content
# write_status_headers
# writer
