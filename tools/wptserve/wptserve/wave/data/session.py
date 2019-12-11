from __future__ import absolute_import
from ..testing.test_loader import AUTOMATIC, MANUAL

PAUSED = u"paused"
RUNNING = u"running"
COMPLETED = u"completed"
ABORTED = u"aborted"
PENDING = u"pending"
UNKNOWN = u"unknown"

API_NOT_STARTED = "not_started"
HTTP_RUNNING = "http"
HTTPS_RUNNING = "https"
API_COMPLETE = "complete"


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
            test_state={},
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
        self.test_state = test_state
        self.date_started = date_started
        self.date_finished = date_finished
        self.is_public = is_public
        self.reference_tokens = reference_tokens
        self.browser = browser
        self.webhook_urls = webhook_urls
        self.expiration_date = expiration_date
        self.malfunctioning_tests = malfunctioning_tests
