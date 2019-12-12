class HttpHandler(object):
    def __init__(
        self, 
        static_handler=None, 
        sessions_api_handler=None,
        tests_api_handler=None,
        results_api_handler=None
    ):
        self.static_handler = static_handler
        self.sessions_api_handler = sessions_api_handler
        self.tests_api_handler = tests_api_handler
        self.results_api_handler = results_api_handler

    def handle_request(self, request, response):
        response.headers = [
            ("Access-Control-Allow-Origin", "*"),
            ("Access-Control-Allow-Headers", "*"),
            ("Access-Control-Allow-Methods", "*")
        ]
        if request.method == "OPTIONS":
            return

        is_api_call = False

        for index, part in enumerate(request.request_path.split(u"/")):
            if index > 2:
                break
            if part == u"" or part == None or index != 2:
                continue
            if part != u"api":
                continue

            is_api_call = True

        if (is_api_call):
            self.handle_api(request, response)
        else:
            self.handle_static_file(request, response)

    def handle_api(self, request, response):
        api_name = None

        for index, part in enumerate(request.request_path.split(u"/")):
            if index > 3:
                break
            if part == u"" or part == None or index != 3:
                continue
            api_name = part

        if api_name is None:
            return
        
        if api_name == u"sessions":
            self.sessions_api_handler.handle_request(request, response)
            return
        if api_name == u"tests":
            self.tests_api_handler.handle_request(request, response)
            return
        if api_name == u"results":
            self.results_api_handler.handle_request(request, response)
            return

    def handle_static_file(self, request, response):
        self.static_handler.handle_request(request, response)


# Request Object Attributes
# auth
# body
# cookies
# doc_root
# headers
# method
# protocol_version
# raw_headers
# raw_input
# request_line
# request_path
# route_match
# server
# url
# url_base
# url_parts
