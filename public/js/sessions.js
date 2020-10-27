class Sessions extends Siblings {
    constructor(app, parent) {
        super(app, Session, parent);
        this._type = "sessions";
        this._sortByLastX = true;
    }

    get currentUser() { return this.parent.parent.parent; }

    findByCreation(creation)  { return this._sessions.find(session => (session.creation == creation)); }
}