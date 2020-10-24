class Sessions {
    constructor(app, parent) {
        super(app, Session, "session", parent);
    }

    findByCreation(creation)  { return this._sessions.find(session => (session.creation == creation)); }
}