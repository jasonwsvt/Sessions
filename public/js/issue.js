class Issue {
    _id = null;
    _name = null;
    _issues = null;
    _sessions = null;
    
    constructor(issues)  { this._issues = issues; this._sessions = new Sessions(this); }
    get app()            { return this._issues.app; }
    get issues()         { return this._issues; }
    get sessions()       { return this._sessions; }

    get id()             { return this._id }
    get name()           { return this._name; }
    set name(name)       { this._name = name; this._save(); }

    set data(data)       { this._name = data.name;
                           this._id = data._id;
                           this._sessions.data = data.sessions; }
    get data()           { return { name:     this.name,
                                    _id:      this.id,
                                    sessions: this.sessions.data } }

    init(id, name = this._issues.default) {
        this._id = id;
        this._name = name;
        this._sessions.new();
    }

    setAsCurrent() {
        this._issues.current = this._id;
        this._sessions.mostRecentlyOpened.setAsCurrent();
    }

    _save() {
        var issueData;
        if (Object.keys(sessionStorage).includes("issues")) {
            issueData = JSON.parse(sessionStorage.getItem("issues"));
        }
        issueData[_id]= this.data;
        sessionStorage.setItem("issues", JSON.stringify(issueData));
    }

    load(data) {
        this.data = data;
        this.sessions.load(data.sessions);
    }
}