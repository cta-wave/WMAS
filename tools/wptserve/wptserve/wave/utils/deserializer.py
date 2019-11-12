from ..data.session import Session, UNKNOWN

def deserialize_session(session_dict):
    tests = {}
    if "tests" in session_dict: tests = session_dict["tests"]
    types = []
    if "types" in session_dict: types = session_dict["types"]
    user_agent = ""
    if "user_agent" in session_dict: user_agent = session_dict["user_agent"]
    labels = []
    if "labels" in session_dict: labels = session_dict["labels"]
    timeouts = {}
    if "timeouts" in session_dict: timeouts = session_dict["timeouts"]
    pending_tests = {}
    if "pending_tests" in session_dict: pending_tests = session_dict["pending_tests"]
    completed_tests = {}
    if "completed_tests" in session_dict: completed_tests = session_dict["completed_tests"]
    running_tests = {}
    if "running_tests" in session_dict: running_tests = session_dict["running_tests"]
    status = UNKNOWN
    if "status" in session_dict: status = session_dict["status"]
    test_files_count = None
    if "test_files_count" in session_dict: test_files_count = session_dict["test_files_count"]
    test_files_completed = None
    if "test_files_completed" in session_dict: test_files_completed = session_dict["test_files_completed"]
    date_started = None
    if "date_started" in session_dict: date_started = session_dict["date_started"]
    date_finished = None
    if "date_finished" in session_dict: date_finished = session_dict["date_finished"]
    is_public = False
    if "is_public" in session_dict: is_public = session_dict["is_public"]
    reference_tokens = []
    if "reference_tokens" in session_dict: reference_tokens = session_dict["reference_tokens"]
    browser = None
    if "browser" in session_dict: browser = session_dict["browser"]
    webhook_urls = []
    if "webhook_urls" in session_dict: webhook_urls = session_dict["webhook_urls"]
    expiration_date = None
    if "expiration_date" in session_dict: expiration_date = session_dict["expiration_date"]
    malfunctioning_tests = []
    if "malfunctioning_tests" in session_dict: malfunctioning_tests = session_dict["malfunctioning_tests"]

    return Session(
        tests=tests,
        types=types,
        user_agent=user_agent,
        labels=labels,
        timeouts=timeouts,
        pending_tests=pending_tests,
        running_tests=running_tests,
        completed_tests=completed_tests,
        status=status,
        test_files_count=test_files_count,
        test_files_completed=test_files_completed,
        date_started=date_started,
        date_finished=date_finished,
        is_public=is_public,
        reference_tokens=reference_tokens,
        browser=browser,
        webhook_urls=webhook_urls,
        expiration_date=expiration_date,
        malfunctioning_tests=malfunctioning_tests
    )