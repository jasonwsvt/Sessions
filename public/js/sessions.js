class Sessions extends Siblings {
    constructor(app, parent) {
        super(app, Session, parent);
        this._type = "sessions";
        this._sortByLastX = true;
        this._canHaveChildren = false;
    }

    findByCreation(creation)  { return this._sessions.find(session => (session.creation == creation)); }
}