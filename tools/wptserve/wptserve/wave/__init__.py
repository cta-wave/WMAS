import sys
import os
from . import configuration_loader

from .network.http_handler import HttpHandler
from .network.api.sessions_api_handler import SessionsApiHandler
from .network.api.tests_api_handler import TestsApiHandler
from .network.static_handler import StaticHandler

from .testing.sessions_manager import SessionsManager
from .testing.results_manager import ResultsManager
from .testing.tests_manager import TestsManager
from .testing.test_loader import TestLoader
from .testing.event_dispatcher import EventDispatcher

from .database import Database


class WaveServer:
    def initialize(self, configuration_file_path=".", application_directory_path=""):
        sys.stdout.write("Loading configuration ...")
        sys.stdout.flush()

        configuration = configuration_loader.load(configuration_file_path)

        print(" done.")

        # Initialize Database
        database = Database()

        # Initialize Managers
        event_dispatcher = EventDispatcher()
        sessions_manager = SessionsManager()
        results_manager = ResultsManager()
        tests_manager = TestsManager()
        test_loader = TestLoader()

        sessions_manager.initialize(
            test_loader=test_loader,
            database=database,
            event_dispatcher=event_dispatcher
        )

        results_manager.initialize(
            results_directory_path=configuration["results_directory_path"])

        tests_manager.initialize(
            test_loader, 
            results_manager=results_manager, 
            sessions_manager=sessions_manager
        )

        # Load Tests
        exclude_list_file_path = os.path.abspath("./excluded.json")
        include_list_file_path = os.path.abspath("./included.json")
        manifest_file_path = os.path.abspath("./MANIFEST.json")
        test_loader.initialize(
            exclude_list_file_path,
            include_list_file_path,
            results_manager=results_manager)

        test_loader.load_tests(manifest_file_path)

        # Initialize HTTP handlers
        static_handler = StaticHandler()
        sessions_api_handler = SessionsApiHandler(
            sessions_manager=sessions_manager, results_manager=results_manager)
        tests_api_handler = TestsApiHandler(tests_manager, sessions_manager)

        # Initialize HTTP server
        http_handler = HttpHandler(
            static_handler=static_handler,
            sessions_api_handler=sessions_api_handler,
            tests_api_handler=tests_api_handler)
        self.handle_request = http_handler.handle_request
