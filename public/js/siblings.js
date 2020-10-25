class Siblings {
    _app = null;
    _SiblingClass = null;
    _siblingsType = null;
    _parent = false;
    _siblings = [];
    _current = null;

    constructor(app, SiblingClass, parent) {
        this._app = app;
        this._SiblingClass = SiblingClass;
        if (parent != undefined) { this._parent = parent; }
    }
    get app()                 { return this._app; }
    get parent()              { return (this._parent) ? this._parent : null; }
    get hasChildren()         { return (this.unsorted[0].children() == false); }
    get siblingsType()        { return this._siblingsType; }

    get firstCreated()        { return this.sortByCreation.slice(0)[0]; }
    get mostRecentlyCreated() { return this.sortByCreation.slice(-1)[0]; }
    get mostRecentlyOpened()  { return this.sortByLastOpened.slice(-1)[0]; }
    get mostRecentlyEdited()  { return this.sortByLastEdited.slice(-1)[0]; }
    set current(id)           { this._current = id; }
    get current()             { return this.findById(this._current); }
    findById(id)              { return this._siblings.find(sibling => (sibling.id == id)); }
    findByName(name)          { return this._siblings.find(sibling => (sibling.name == name)); }
    get entries()             { return this._siblings.length }

    get sortByCreation() {
        return (this.hasChildren)
            ? this._siblings.sort((a,b) => (a.children.firstCreated.creation - b.children.firstCreated.creation))
            : this._siblings.sort((a,b) => (Number(a.creation) - Number(b.creation)));
    }
    get sortByLastEdited() {
        return (this.hasChildren)
            ? this._siblings.sort((a,b) => (a.children.mostRecentlyEdited.lastEdited - b.children.mostRecentlyEdited.lastEdited))
            : this._sessions.sort((a,b) => (Number(a._data.lastEdited) - Number(b._data.lastEdited)));
    }
    get sortByLastOpened() {
        return (this.hasChildren)
            ? this._siblings.sort((a,b) => (a.children.mostRecentlyOpened.lastOpened - b.children.mostRecentlyOpened.lastOpened))
            : this._sessions.sort((a,b) => (Number(a._data.lastOpened) - Number(b._data.lastOpened)));
    }
    get sortByName() {
        return this._siblings.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    }
    get unsorted() {
        return this._siblings;
    }

    load(data) {
        var sibling;
        data.forEach(entry => {
            sibling = new this._SiblingClass(this);
            sibling.load(entry);
        });
    }

    new(parentId = null) {
        var id = this.newId;
        var sibling = new this._SiblingClass(this._app, this);
        sibling.init(id, parentId);
        this._siblings.push(sibling);
        this._current = id;
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
}