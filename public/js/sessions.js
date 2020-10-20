class Sessions {
    _issue = null;
    _sessions = [];
    _current = null;

    constructor(issue)        { this._issue = issue; }
    get app()                 { return this._issue.app; }

    get mostRecentlyEdited()  { return this.sortByLastEdited.slice(-1); }
    get mostRecentlyOpened()  { return this.sortByLastOpened.slice(-1); }
    get mostRecentlyCreated() { return this.sortByCreation.slice(-1); }
    get firstCreated()        { return this.sortByCreation.slice(0); }

    get sortByLastEdited()    { return this._sessions.sort((a,b) => (Number(a.lastEdited) - Number(b.lastEdited))); }
    get sortByLastOpened()    { return this._sessions.sort((a,b) => (Number(a.lastOpened) - Number(b.lastOpened))); }
    get sortByCreation()      { return this._sessions.sort((a,b) => (Number(a.creation) - Number(b.creation)));}
    get sortByName()          { return this._sessions.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())); }

    findByName(name)          { return this._sessions.find(s => (s.name == name)); }
    findByCreation(creation)  { return this._sessions.find(s => (s.creation == creation)); }
    findById(id)              { return this._sessions.find(s => (s.id == id)); }

    get current()             { return this._sessions[this._current]; }
    get length()              { return this._sessions.length }

    get data()                { return this._sessions.map(session, () => session.data) }
    set data(data) {
        var session;
        data.forEach(info => {
            session = new Session(this);
            session.load(info);
        })
    }

    new(creation = Math.floor(Date.now() / 1000)) {
        var id = this._sessions.length;
        var session = new session(this);
        session.init(id, creation);
        this._sessions.push(session); 
        this._current = id;
        return id;
    }
}