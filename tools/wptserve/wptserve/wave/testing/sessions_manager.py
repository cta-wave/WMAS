import uuid
import time

from threading import Timer

from .test_loader import AUTOMATIC, MANUAL
from ..data.session import Session, PENDING, PAUSED, RUNNING, ABORTED, COMPLETED
from ..utils.user_agent_parser import parse_user_agent
from .event_dispatcher import STATUS_EVENT, RESUME_EVENT
from ..data.exceptions.not_found_exception import NotFoundException

DEFAULT_TEST_TYPES = [AUTOMATIC, MANUAL]
DEFAULT_TEST_PATHS = ["/"]
DEFAULT_TEST_AUTOMATIC_TIMEOUT = 60000
DEFAULT_TEST_MANUAL_TIMEOUT = 300000


class SessionsManager:
    def initialize(self, test_loader, database, event_dispatcher, tests_manager):
        self._test_loader = test_loader
        self._database = database
        self._sessions = []
        self._expiration_timeout = None
        self._event_dispatcher = event_dispatcher
        self._tests_manager = tests_manager

    def create_session(
        self,
        tests={},
        types=None,
        timeouts={},
        reference_tokens=[],
        webhook_urls=[],
        user_agent="",
        labels=[],
        expiration_date=None
    ):
        if "include" not in tests:
            tests["include"] = DEFAULT_TEST_PATHS
        if "exclude" not in tests:
            tests["exclude"] = []
        if "automatic" not in timeouts:
            timeouts["automatic"] = DEFAULT_TEST_AUTOMATIC_TIMEOUT
        if "manual" not in timeouts:
            timeouts["manual"] = DEFAULT_TEST_MANUAL_TIMEOUT
        if types is None:
            types = DEFAULT_TEST_TYPES

        token = str(uuid.uuid1())
        pending_tests = self._test_loader.get_tests(
            types,
            include_list=tests["include"],
            exclude_list=tests["exclude"],
            reference_tokens=reference_tokens)

        browser = parse_user_agent(user_agent)

        test_files_count = self._tests_manager.calculate_test_files_count(pending_tests)

        session = Session(
            token=token,
            tests=tests,
            user_agent=user_agent,
            browser=browser,
            types=types,
            timeouts=timeouts,
            pending_tests=pending_tests,
            test_files_count=test_files_count,
            test_files_completed={},
            status=PENDING,
            reference_tokens=reference_tokens,
            webhook_urls=webhook_urls,
            labels=labels,
            expiration_date=expiration_date
        )
        self._database.create_session(session)
        self._push_to_cache(session)
        if expiration_date is not None:
            self._set_expiration_timer()

        return session

    def read_session(self, token):
        if token is None:
            return None
        session = self._read_from_cache(token)
        if session is None:
            session = self._database.read_session(token)
            if session is not None:
                self._push_to_cache(session)
        return session

    def update_session(self, session):
        self._push_to_cache(session)
        self._database.update_session(session)

    def update_session_configuration(
        self, token, tests, types, timeouts, reference_tokens, webhook_urls
    ):
        session = self.read_session(token)
        if session is None: raise NotFoundException("Could not find session")
        if session.status != PENDING:
            return

        if tests is not None:
            if "include" not in tests:
                tests["include"] = session.tests["include"]
            if "exclude" not in tests:
                tests["exclude"] = session.tests["exclude"]
            if reference_tokens is None:
                reference_tokens = session.reference_tokens
            if types is None:
                types = session.types
            pending_tests = self._test_loader.get_tests(
                include_list=tests["include"],
                exclude_list=tests["exclude"],
                reference_tokens=reference_tokens,
                types=types
            )
            session.pending_tests = pending_tests
            session.tests = tests
            session.test_files_count = self._tests_manager.calculate_test_files_count(
                pending_tests)
        if types is not None:
            session.types = types
        if timeouts is not None:
            if AUTOMATIC not in timeouts:
                timeouts[AUTOMATIC] = session.timeouts[AUTOMATIC]
            if MANUAL not in timeouts:
                timeouts[MANUAL] = session.timeouts[MANUAL]
            session.timeouts = timeouts
        if reference_tokens is not None:
            session.reference_tokens = reference_tokens
        if webhook_urls is not None:
            session.webhook_urls = webhook_urls

        self._database.update_session(session)
        self._push_to_cache(session)
        return session

    def update_labels(self, token, labels):
        if token is None or labels is None:
            return
        session = self.read_session(token)
        if session.is_public:
            return
        session.labels = labels
        self._push_to_cache(session)
        self._database.update_session(session)

    def delete_session(self, token):
        session = self.read_session(token)
        if session.is_public:
            return

        session = self._read_from_cache(token)
        self._sessions.remove(session)
        self._database.delete_session(session.token)

    def _push_to_cache(self, session):
        duplicate_session = None

        for cached_session in self._sessions:
            if cached_session.token == session.token:
                duplicate_session = cached_session
                break

        if duplicate_session is not None:
            self._sessions.remove(duplicate_session)

        self._sessions.append(session)

    def _read_from_cache(self, token):
        for cached_session in self._sessions:
            if cached_session.token == token:
                return cached_session
        return None

    def _set_expiration_timer(self):
        expiring_sessions = self._database.read_expiring_sessions()
        if len(expiring_sessions) == 0:
            return

        next_session = expiring_sessions[0]

        for session in expiring_sessions:
            if next_session.expiration_date > session.expiration_date:
                next_session = session

        if self._expiration_timeout is not None:
            self._expiration_timeout.cancel()

        timeout = next_session.expiration_date / 1000.0 - int(time.time())
        if timeout < 0:
            timeout = 0

        def handle_timeout(self):
            self._delete_expired_sessions()
            self._set_expiration_timer()

        self._expiration_timeout = Timer(timeout, handle_timeout, [self])
        self._expiration_timeout.start()

    def _delete_expired_sessions(self):
        expiring_sessions = self._database.read_expiring_sessions()
        now = int(time.time())

        for session in expiring_sessions:
            if session.expiration_date / 1000.0 < now:
                self.delete_session(session.token)

    def start_session(self, token):
        session = self.read_session(token)
        if session is None:
            return

        if session.status != PENDING and session.status != PAUSED:
            return

        if session.status == PENDING:
            session.date_started = int(time.time()) * 1000
            session.expiration_date = None

        session.status = RUNNING
        self.update_session(session)

        self._event_dispatcher.dispatch_event(
            token,
            event_type=STATUS_EVENT,
            data=session.status
        )

    def pause_session(self, token):
        session = self.read_session(token)
        if session.status != RUNNING: return
        session.status = PAUSED
        self.update_session(session)
        self._event_dispatcher.dispatch_event(
            token, 
            event_type=STATUS_EVENT, 
            data=session.status
        )

    def stop_session(self, token):
        session = self.read_session(token)
        if session.status == ABORTED or session.status == COMPLETED: return
        session.status = ABORTED
        session.date_finished = time.time() * 1000
        self.update_session(session)
        self._event_dispatcher.dispatch_event(
            token,
            event_type=STATUS_EVENT,
            data=session.status
        )

    def resume_session(self, token, resume_token):
        session = self.read_session(token)
        if session.status != PENDING: return
        self._event_dispatcher.dispatch_event(
            token,
            event_type=RESUME_EVENT,
            data=resume_token
        )
        self.delete_session(token)

    def complete_session(self, token):
        session = self.read_session(token)
        if session.status == COMPLETED or session.status == ABORTED: return
        session.status = COMPLETED
        session.date_finished = time.time() * 1000
        self.update_session(session)
        self._event_dispatcher.dispatch_event(
            token,
            event_type=STATUS_EVENT,
            data=session.status
        )

    def test_in_session(self, test, session):
        return self._test_list_contains_test(test, session.pending_tests) \
            or self._test_list_contains_test(test, session.running_tests) \
            or self._test_list_contains_test(test, session.completed_tests)

    def is_test_complete(self, test, session):
        return self._test_list_contains_test(test, session.completed_tests)

    def _test_list_contains_test(self, test, test_list):
        for api in list(test_list.keys()):
            if test in test_list[api]:
                return True
        return False

    def is_api_complete(self, api, session):
        return api not in session.pending_tests and api not in session.running_tests