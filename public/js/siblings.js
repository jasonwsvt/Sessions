class Siblings {
    _app = null;
    _SiblingClass = null;
    _type = null;
    _parent = false;
    _siblings = [];
    _current = null;
    _type = null;
    _defaultName = null;
    _defaultFirstName = null;
    _sortByLastX = false;

    constructor(app, SiblingClass, parent) {
        this._app = app;
        this._SiblingClass = SiblingClass;
        if (parent != undefined) { this._parent = parent; }
    }
    get app()                 { return this._app; }
    get parent()              { return (this._parent) ? this._parent : null; }
    get canHaveChildren()     { return this._canHaveChildren; }
    get type()                { return this._type; }
    get defaultName()         { return this._defaultName; }
    get defaultFirstName()    { return this._defaultFirstName; }

    get firstCreated()        { return this.sortByCreation.slice(0)[0]; }
    get mostRecentlyCreated() { return this.sortByCreation.slice(-1)[0]; }
    get mostRecentlyOpened()  { return this.sortByLastOpened.slice(-1)[0]; }
    get mostRecentlyEdited()  { return this.sortByLastEdited.slice(-1)[0]; }
    set current(id)           { this._current = id; }
    get current()             { return this.findById(this._current); }
    findById(id)              { return this._siblings.find(sibling => (sibling.id == id)); }
    findByName(name)          { return this._siblings.find(sibling => (sibling.name == name)); }
    get entries()             { return this._siblings.length; }

    get sortByCreation() {
        return (this._sortByLastX)
            ? this._siblings.sort((a,b) => (Number(a.creation) - Number(b.creation)))
            : this._siblings.sort((a,b) => (a.children.firstCreated.creation - b.children.firstCreated.creation));
    }
    get sortByLastEdited() {
        return (this._sortByLastX)
            ? this._siblings.sort((a,b) => (Number(a._data.lastEdited) - Number(b._data.lastEdited)))
            : this._siblings.sort((a,b) => (a.children.mostRecentlyEdited.lastEdited - b.children.mostRecentlyEdited.lastEdited));
    }
    get sortByLastOpened() {
        return (this._sortByLastX)
            ? this._siblings.sort((a,b) => (Number(a._data.lastOpened) - Number(b._data.lastOpened)))
            : this._siblings.sort((a,b) => (a.children.mostRecentlyOpened.lastOpened - b.children.mostRecentlyOpened.lastOpened));
    }
    get sortByName() {
        return this._siblings.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    }
    get unsorted() {
        return this._siblings;
    }

    load(parentId) {
        this._loadFrom(sessionStorage, parentId);
        if (this.currentUser.useLocalStorage)   { this._loadFrom(localStorage, parentId); }
        if (this.currentUser.useServerStorage)  { this._loadFrom(serverStorage, parentId); }
        if (this.entries == 0) { this.new(parentId); }
        this._current = this.unsorted.sort((a,b) => (Number(a._data.lastOpened) - Number(b._data.lastOpened))).slice(-1)[0].id;
    }

    _loadFrom(container, parentId) {
        var data = [], sibling;
        if (Object.keys(container).includes(this._type)) {
            data = JSON.parse(container.getItem(this._type)).filter(entry =>
                ((parentId == undefined || parentId == entry[this.parent.type + "Id"]) &&
                    (!this.findById(entry.id)) ||
                     (this.findById(entry.id) &&
                      this.findById(entry.id)._data.lastEdited < entry.lastEdited)));
            data.forEach(entry => {
                sibling = new this._SiblingClass(this._app, this);
                sibling.load(entry);
                this._siblings.push(sibling);
            });
        }
    }

    new() {
        var id = this.newId;
//        var parentId = this.parent.id;
//        console.log(parentId);
        this._current = id;
        var sibling = new this._SiblingClass(this._app, this);
//        console.log(this._type, "new", parentId, id, "Current:", this._current, "Entries:", this.entries);
        sibling.init(id);
        this._siblings.push(sibling);
        return id;
    }

    get newId() {
        var id;
        while (true) {
            id = Math.round(Math.random()*1000000000000000);
            if (!this.findById(id)) { break; }
        }
        return id;
    }

    backup() {
        var sessionEntries, localEntries;
        if (Object.keys(sessionStorage).includes(this.type) && 
            (this.app.users.current.useLocalStorage || this.app.users.current.useServerStorage)) {
            sessionEntries = JSON.parse(sessionStorage.getItem(this.type));
            if (this.app.users.current.useLocalStorage) {
                if (Object.keys(localStorage).includes(this.type)) {
                    localEntries = JSON.parse(localStorage.getItem(this.type));
                }
                else { localEntries = []; }
                sessionEntries.forEach(entry => {
                    localEntries.find(localEntry => (localEntry.id == entry.id)) = entry;
                });
                localStorage.setItem(this.type, JSON.stringify(localEntries));
            }
            if (this.app.users.current.useServerStorage) {

            }
            sessionStorage.removeItem(this.type);
        }
    }

    localBackup() {
        
    }

    serverBackup() {

    }
}