class Database:
    def __init__(self):
        self._sessions = []

    def create_session(self, session):
        self._sessions.append(session)

    def read_session(self, token):
        for session in self._sessions:
            if session.token == token:
                return session

    def read_expiring_sessions(self):
        sessions = []

        for session in self._sessions:
            if session.expiration_date is not None:
                sessions.append(session)
        return sessions

    def update_session(self, session):
        remove_session = None
        for db_session in self._sessions:
            if db_session.token == session.token:
                remove_session = db_session
        if remove_session is not None:
            self._sessions.remove(remove_session)
        self._sessions.append(session)
    
    def delete_session(self, token):
        for session in self._sessions:
            if session.token == token:
                self._sessions.remove(session)