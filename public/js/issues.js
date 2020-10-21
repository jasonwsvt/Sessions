class Issues {
    _client = null;
    _issues = [];
    _current = null;
    _default = "New Issue";

    constructor(client)       { this._client = client; this._utility = new Utility(this, "issue"); }
    get app()                 { return this._client.app; }
    get default()             { return this._default; }

    get firstCreated()        { return this.sortByCreation.slice(0); }
    get mostRecentlyCreated() { return this.sortByCreation.slice(-1); }
    get mostRecentlyOpened()  { return this.sortByLastOpened.slice(-1); }
    get mostRecentlyEdited()  { return this.sortByLastEdited.slice(-1); }
    get current()             { return this.findByID(this._current); }
    set current(id)           { this._current = id; }
    findById(id)              { return this._issues.find(i => (i._id == id)); }
    findByName(name)          { return this._issues.find(i => (i.name == name)); }

    get entries()             { return this._issues.length }
    get sortByCreation()      { return this._issues.sort((a,b) => (a.sessions.firstCreated.creation - b.sessions.firstCreated.creation) )}
    get sortByLastEdited()    { return this._issues.sort((a,b) => (a.sessions.mostRecentlyEdited.lastEdited - b.sessions.mostRecentlyEdited.lastEdited) )}
    get sortByLastOpened()    { return this._issues.sort((a,b) => (a.sessions.mostRecentlyOpened.lastOpened - b.sessions.mostRecentlyOpened.lastOpened) )}
    get sortByName()          { return this._issues.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())); }

    load(data)                { var issue;
                                data.forEach(entry => {
                                    issue = new Issue(this);
                                    issue.load(entry);
                                    this._issues.push(issue); }) }

    new(name = this._default) { var id = this.entries;
                                var issue = new Issue(this);
                                issue.init(id, name);
                                this._issues.push(issue); 
                                this.current = id;
                                return id; }
}