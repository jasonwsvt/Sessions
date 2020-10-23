class Issue {
    _id = null;
    _clientId = null;
    _name = null;
    _lastEdited = null;
    _issues = null;
    _sessions = null;
    
    constructor(issues)  { this._issues = issues; this._sessions = new Sessions(this); }
    get app()            { return this._issues.app; }
    get issues()         { return this._issues; }
    get sessions()       { return this._sessions; }
    get clientId()       { return this.issues.client.id; }

    get id()             { return this._id }
    set id(id) {
        if (this._id != id) {
            this._id = id;
            this._save();
            this._sessions.unsorted.forEach(session => (session._issueId = id));
        }
    }
    get name()           { return this._name; }
    set name(name)       { this._name = name; this._save(); }

    set data(data)       { this._id = data.id,
                           this._clientId = data.clientId,
                           this._name = data.name; }
    get data()           { return { id:       this.id,
                                    clientId: this.clientId,
                                    name:     this.name } }

    setAsCurrent() {
        this._issues.current = this._id;
        this._sessions.mostRecentlyOpened.setAsCurrent();
    }
                                
    init(id, name = this._issues.default) {
        this._id = id;
        this._name = name;
        this._sessions.new();
    }

    _save() {
        var issueData;
        this._lastEdited = Math.floor(Date.now() / 1000);
        if (Object.keys(sessionStorage).includes("issues")) {
            issueData = JSON.parse(sessionStorage.getItem("issues"));
        }
        issueData[this._id]= this.data;
        sessionStorage.setItem("issues", JSON.stringify(issueData));
    }

    load(data) {
        this.data = data;
        this.sessions.load(data.sessions);
    }
}