from __future__ import unicode_literals
import uuid


STATUS_EVENT = "status"
RESUME_EVENT = "resume"
TEST_COMPLETED_EVENT = "test_completed"

DEVICES = "devices"
DEVICE_ADDED_EVENT = "device_added"
DEVICE_REMOVED_EVENT = "device_removed"

class EventDispatcher(object):
    def __init__(self):
        self._listeners = {}

    def add_event_listener(self, listener):
        token = listener.dispatcher_token
        if token not in self._listeners:
            self._listeners[token] = []
        self._listeners[token].append(listener)
        listener.token = str(uuid.uuid1())
        return listener.token

    def remove_event_listener(self, listener_token):
        if listener_token is None:
            return

        for dispatcher_token in self._listeners:
            for listener in self._listeners[dispatcher_token]:
                if listener.token == listener_token:
                    self._listeners[dispatcher_token].remove(listener)
                    if len(self._listeners[dispatcher_token]) == 0:
                        del self._listeners[dispatcher_token]
                    return

    def dispatch_event(self, dispatcher_token, event_type, data=None):
        if dispatcher_token not in self._listeners:
            return
        event = {
            "type": event_type,
            "data": data
        }

        for listener in self._listeners[dispatcher_token]:
            listener.send_message(event)
