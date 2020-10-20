class Issue {
    _name = null;
    _id = null;
    _sessions = null;
    _issues = null;
    
    constructor(issues) {
        this._issues = issues;
        this._sessions = new Sessions(this);
    }
    get id()       { return this._id }
    get name()     { return this._name; }
    set name(name) { this._name = name; this._update(); }
    get sessions() { return this._sessions; }
    get currentSession() { return this._sessions.current; }

    get data() { return { name: this.name,
                          sessions: this.sessions.data } }

    set name(newName) {
        this._name = newName;
    }
}