class Sessions {
    _issue = null;
    _sessions = [];
    _current = null;

    constructor(issue)        { this._issue = issue; }
    get app()                 { return this._issue.app; }
    get default()             { return Math.floor(Date.now() / 1000); }

    get firstCreated()        { return this.sortByCreation.slice(0); }
    get mostRecentlyCreated() { return this.sortByCreation.slice(-1); }
    get mostRecentlyOpened()  { return this.sortByLastOpened.slice(-1); }
    get mostRecentlyEdited()  { return this.sortByLastEdited.slice(-1); }
    get current()             { return this.findByID(this._current); }
    set current(id)           { this._current = id; }
    findByName(name)          { return this._sessions.find(s => (s.name == name)); }
    findByCreation(creation)  { return this._sessions.find(s => (s.creation == creation)); }
    findById(id)              { return this._sessions.find(s => (s.id == id)); }

    get entries()             { return this._sessions.length; }
    get sortByCreation()      { return this._sessions.sort((a,b) => (Number(a.creation) - Number(b.creation)));}
    get sortByLastEdited()    { return this._sessions.sort((a,b) => (Number(a.lastEdited) - Number(b.lastEdited))); }
    get sortByLastOpened()    { return this._sessions.sort((a,b) => (Number(a.lastOpened) - Number(b.lastOpened))); }
    get sortByName()          { return this._sessions.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())); }

    load(data)                { var session;
                                data.forEach(entry => {
                                    session = new Session(this);
                                    session.load(entry); }) }

    new(creation = this.default) { var id = this.entries;
                                   var session = new session(this);
                                   session.init(id, creation);
                                   this._sessions.push(session); 
                                   this._current = id;
                                   return id; }
}