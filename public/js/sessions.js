class Sessions extends Siblings {
    constructor(app, parent) {
        super(app, Session, "session", parent);
        this._siblingsType = "sessions";
    }

    findByCreation(creation)  { return this._sessions.find(session => (session.creation == creation)); }
}