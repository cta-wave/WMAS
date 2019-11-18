from __future__ import absolute_import
from ..testing.test_loader import AUTOMATIC, MANUAL

PAUSED = u"paused"
RUNNING = u"running"
COMPLETED = u"completed"
ABORTED = u"aborted"
PENDING = u"pending"
UNKNOWN = u"unknown"


class Session(object):
    def __init__(
            self,
            token=u"",
            types=[MANUAL],
            user_agent=u"",
            labels=[],
            tests={},
            pending_tests={},
            running_tests={},
            completed_tests={},
            timeouts={},
            status=UNKNOWN,
            test_files_count=0,
            test_files_completed=0,
            date_started=None,
            date_finished=None,
            is_public=False,
            reference_tokens=[],
            browser=None,
            webhook_urls=[],
            expiration_date=None,
            malfunctioning_tests=[]
    ):
        self.token = token
        self.types = types
        self.user_agent = user_agent
        self.labels = labels
        self.tests = tests
        self.pending_tests = pending_tests
        self.running_tests = running_tests
        self.completed_tests = completed_tests
        self.timeouts = timeouts
        self.status = status
        self.test_files_count = test_files_count
        self.test_files_completed = test_files_completed
        self.date_started = date_started
        self.date_finished = date_finished
        self.is_public = is_public
        self.reference_tokens = reference_tokens
        self.browser = browser
        self.webhook_urls = webhook_urls
        self.expiration_date = expiration_date
        self.malfunctioning_tests = malfunctioning_tests
