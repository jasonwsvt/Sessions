class Sessions extends Siblings {
    constructor(app, parent) {
        super(app, Session, parent);
        this._siblingsType = "sessions";
    }

    get currentUser() { return this.parent.parent.parent; }

    findByCreation(creation)  { return this._sessions.find(session => (session.creation == creation)); }
}