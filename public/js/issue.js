class Issue {
    _id = null;
    _name = null;
    _issues = null;
    _sessions = null;
    
    constructor(issues)  { this._issues = issues; this._sessions = new Sessions(this); }
    get app()            { return this._issues.app; }

    get id()             { return this._id }
    get name()           { return this._name; }
    set name(name)       { this._name = name; this._update(); }
    get sessions()       { return this._sessions; }

    get data() { return { name: this.name,
                          sessions: this.sessions.data } }

    load(data) {
        this._name = data.name;
        this._id = data._id;
        this._sessions.load(data.sessions);
    }

    init(id, name = "Unspecified") {
        this._id = id;
        this._name = name;
        this._sessions.new();
    }

    setAsCurrent() {
        this._issues.current = this._id;
        this._sessions.mostRecentlyOpened.setAsCurrent();
    }
}