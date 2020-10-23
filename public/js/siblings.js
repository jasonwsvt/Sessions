class Issues {
    _app = null;
    _SiblingClass = null;
    _default = null;
    _collectionName = null;
    _parent = false;
    _siblings = [];
    _current = null;

    constructor(app, SiblingClass, defaultName, collectionName, parent) {
        this._app = app;
        this._SiblingClass = SiblingClass;
        this._defaultName = defaultName;
        this._collectionName = collectionName;
        if (parent != undefined) { this._parent = parent; }
    }
    get app()                 { return this._app; }
    get default()             { return this._default; }
    get parent()              { return (this._parent) ? this._parent : null; }
    get chidHasChildren(id)   { return (this.findById(id).children()); }

    get firstCreated()        { return this.sortByCreation.slice(0)[0]; }
    get mostRecentlyCreated() { return this.sortByCreation.slice(-1)[0]; }
    get mostRecentlyOpened()  { return this.sortByLastOpened.slice(-1)[0]; }
    get mostRecentlyEdited()  { return this.sortByLastEdited.slice(-1)[0]; }
    get current()             { return this.findById(this._current); }
    set current(id)           { this._current = id; }
    findById(id)              { return this._siblings.find(sibling => (sibling.id == id)); }
    findByName(name)          { return this._siblings.find(sibling => (sibling.name == name)); }

    get entries()             { return this._siblings.length }
    get sortByCreation()      { return this._siblings.sort((a,b) => (a.children.firstCreated.creation - b.children.firstCreated.creation) )}
    get sortByLastEdited()    { return this._siblings.sort((a,b) => (a.children.mostRecentlyEdited.lastEdited - b.children.mostRecentlyEdited.lastEdited) )}
    get sortByLastOpened()    { return this._siblings.sort((a,b) => (a.children.mostRecentlyOpened.lastOpened - b.children.mostRecentlyOpened.lastOpened) )}
    get sortByName()          { return this._siblings.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())); }
    get unsorted()            { return this._siblings; }

    load(data) {
        var sibling;
        data.forEach(entry => {
            sibling = new this._SiblingClass(this);
            sibling.load(entry);
        });
    }

    new(name = this._default) {
        var id = this.newId;
        var sibling = new this._SiblingClass(this);
        sibling.init(id, name);
        this._siblings.push(sibling);
        this.current = id;
        //console.log("created new issue", this.current.name);
        return id; }

    get newId() {
        var id;
        while (true) {
            id = Math.round(Math.random()*1000000000000000);
            if (!this.findById(id)) { break; }
        }
        return id;
    }
}