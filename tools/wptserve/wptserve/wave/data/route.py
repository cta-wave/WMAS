class Route:
    def __init__(self, uri="/", handler=None, dependencies={}):
        self._uri = uri
        self._dependencies = dependencies
        self._handler = handler
    
    def get_uri(self):
        return self._uri

    def set_uri(self, uri):
        self._uri = uri
        return self

    def get_handler(self):
        return self._handler

    def set_handler(self, handler):
        self._handler = handler
        return self

    def get_dependencies(self):
        return self._dependencies

    def set_dependencies(self, dependencies):
        self._dependencies = dependencies
        return self