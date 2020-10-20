class Issues {
    _client = null;
    _issues = [];
    _current = null;

    constructor(client)       { this._client = client; this._utility = new Utility(this); }
    get app()                 { return this._client.app; }

    get mostRecentlyEdited()  { return this.sortByLastEdited.slice(-1); }
    get mostRecentlyOpened()  { return this.sortByLastOpened.slice(-1); }
    get mostRecentlyCreated() { return this.sortByCreation.slice(-1); }
    get firstCreated()        { return this.sortByCreation.slice(0); }

    get sortByLastEdited()    { return this._issues.sort((a,b) => (a.sessions.mostRecentlyEdited.lastEdited - b.sessions.mostRecentlyEdited.lastEdited) )}
    get sortByLastOpened()    { return this._issues.sort((a,b) => (a.sessions.mostRecentlyOpened.lastOpened - b.sessions.mostRecentlyOpened.lastOpened) )}
    get sortByCreation()      { return this._issues.sort((a,b) => (a.sessions.firstCreated.creation - b.sessions.firstCreated.creation) )}
    get sortByName()          { return this._issues.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())); }

    findById(id)              { return this._issues.find(i => (i._id == id)); }
    findByName(name)          { return this._issues.find(i => (i.name == name)); }

    get current()             { return this._issues[this._current] }
    get length()              { return this._issues.length }

    get data()                { return this._issues.map(issue, () => issue.data) }
    set data(data) {
        var issue;
        data.forEach(info => {
            issue = new Issue(this);
            issue.load(info);
            this._issues.push(issue);
        })
    }

    new(name = "Unspecified") {
        var id = this._issues.length;
        var issue = new Issue(this);
        issue.init(id, name);
        this._issues.push(issue); 
        this._current = id;
        return id;
    }
}