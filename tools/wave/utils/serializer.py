from __future__ import unicode_literals
from datetime import datetime


def serialize_session(session):
    return {
        "token": session.token,
        "types": session.test_types,
        "user_agent": session.user_agent,
        "labels": session.labels,
        "timeouts": session.timeouts,
        "test_state": session.test_state,
        "last_completed_test": session.last_completed_test,
        "tests": session.tests,
        "pending_tests": session.pending_tests,
        "running_tests": session.running_tests,
        "status": session.status,
        "browser": session.browser,
        "date_created": session.date_created,
        "date_started": session.date_started,
        "date_finished": session.date_finished,
        "is_public": session.is_public,
        "reference_tokens": session.reference_tokens,
        "webhook_urls": session.webhook_urls,
        "expiration_date": session.expiration_date,
        "type": session.type,
        "malfunctioning_tests": session.malfunctioning_tests
    }

def serialize_sessions(sessions):
    serialized_sessions = []
    for session in sessions:
        serialized_sessions.append(serialize_session(session))
    return serialized_sessions

def serialize_device(device):
    return {
        "token": device.token,
        "user_agent": device.user_agent,
        "name": device.name,
        "last_active": datetime.utcfromtimestamp(device.last_active/1000).isoformat()
    }
