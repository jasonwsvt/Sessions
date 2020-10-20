class Sessions {
    _issue = null;
    _sessions = [];
    _current = null;

    constructor(issue) {
        this._issue = issue;
    }

    get mostRecentlyEdited()  { return this.sortByLastEdited.slice(-1); }
    get mostRecentlyOpened()  { return this.sortByLastOpened.slice(-1); }
    get mostRecentlyCreated() { return this.sortByCreation.slice(-1); }
    get firstCreated()        { return this.sortByCreation.slice(0); }
    get sortByLastEdited()    { return this._sessions.sort((a,b) => (Number(a.lastEdited) - Number(b.lastEdited))); }
    get sortByLastOpened()    { return this._sessions.sort((a,b) => (Number(a.lastOpened) - Number(b.lastOpened))); }
    get sortByCreation()      { return this._sessions.sort((a,b) => (Number(a.creation) - Number(b.creation)));}

    findByCreation(creation)  { return this._sessions.find(s => (s.creation == creation)); }
    findById(id)              { return this._sessions.find(s => (s.id == id)); }

    get current()             { return this._sessions[this._current]; }
    get length()              { return this._sessions.length }
    get data()                { return this._sessions.map(session, () => session.data) }

    new() {
        var creation = Math.floor(Date.now() / 1000);
        var session = new Session(creation);
        this._sessions.push(session);
        this.lines.load(creation);
        this.cursor.checkForCursor();
    }

    load(data) {
        var session;
        data.forEach(info => {
            session = new Issue(this);
            session.load(info);
        })
    }
}