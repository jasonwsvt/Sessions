class Clients {
    _user = null;
    _clients = [];
    _current = null;
    _utility = null;
    _default = "New Client"

    constructor(user)         { this._user = user; } }
    get app()                 { return this._user.app; }
    get default()             { return this._default; }

    get firstCreated()        { return this.sortByCreation.slice(0); }
    get mostRecentlyCreated() { return this.sortByCreation.slice(-1); }
    get mostRecentlyOpened()  { return this.sortByLastOpened.slice(-1); }
    get mostRecentlyEdited()  { return this.sortByLastEdited.slice(-1); }
    get current()             { return this.findByID(this._current); }
    set current(id)           { this.findById(id).setAsCurrent(); }
    findById(id)              { return this._clients.find(i => (i.id == id)); }
    findByName(name)          { return this._clients.find(i => (i.name == name)); }

    get entries()             { return this._clients.length; }
    get sortByCreation()      { return this._clients.sort((a,b) => (a.issues.firstCreated - b.issues.firstCreated)) }
    get sortByLastEdited()    { return this._clients.sort((a,b) => (a.issues.mostRecentlyEdited - b.issues.mostRecentlyEdited) ) }
    get sortByLastOpened()    { return this._clients.sort((a,b) => (a.issues.mostRecentlyOpened - b.issues.mostRecentlyOpened) ) }
    get sortByName()          { return this._clients.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())); }

    new(name = this.default)  { var id = this.entries;
                                var client = new Client(this);
                                client.init(id, name);
                                this._clients.push(client);
                                this.current = id;
                                return id; }

    load(data)                { var client;
                                data.forEach(entry => {
                                client = new Client(this);
                                client.load(entry); }) }

}