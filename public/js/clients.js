class Clients {
    _user = null;
    _clients = [];
    _current = null;

    constructor(user) {
        this._user = user;
    }

    get mostRecentlyEdited()  { return this.sortByLastEdited.slice(-1); }
    get mostRecentlyOpened()  { return this.sortByLastOpened.slice(-1); }
    get mostRecentlyCreated() { return this.sortByCreation.slice(-1); }
    get firstCreated()        { return this.sortByCreation.slice(0); }
    get sortByLastEdited()    { return this._clients.sort((a,b) => (a.issues.mostRecentlyEdited - b.issues.mostRecentlyEdited) ) }
    get sortByLastOpened()    { return this._clients.sort((a,b) => (a.issues.mostRecentlyOpened - b.issues.mostRecentlyOpened) ) }
    get sortByCreation()      { return this._clients.sort((a,b) => (a.issues.firstCreated - b.issues.firstCreated)) }
    get sortByName()          { return this._clients.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())); }

    findById(id)              { return this._clients.find(i => (i.id == id)); }
    findByName(name)          { return this._clients.find(i => (i.name == name)); }

    get current()             { return this._clients[this._current] }
    get length()              { return this._clients.length }
    get data()                { return this._clients.map(client, () => client.data) }

    new(name)     { this._clients.push(new Client(name, this)); }
}