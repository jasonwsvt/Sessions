class Siblings extends StorageUtility {
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
        super();
        this._app = app;
        this._SiblingClass = SiblingClass;
        if (parent != undefined) { this._parent = parent; }
    }

    get app()                    { return this._app; }
    get currentUser()            { return this.parent.currentUser; }
    get storagePermanence()        { return this.currentUser.storagePermanence; }
    get useServerStorage()       { return this.currentUser.useServerStorage; }
    get pushToStorageFrequency() { return this.currentUser.pushToStorageFrequency; }
    get pushToServerFrequency()  { return this.currentUser.pushToServerFrequency; }
    get parent()                 { return (this._parent) ? this._parent : null; }
    get type()                   { return this._type; }
    get storageTableName()       { return this._type; }
    get canHaveChildren()        { return this._canHaveChildren; }
    get defaultName()            { return this._defaultName; }
    get defaultFirstName()       { return this._defaultFirstName; }

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
        var data = [], sibling;
        if (this.storageTableExists) {
            data = this.storageRecords.filter(entry =>
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

        if (this.entries == 0) { this.new(parentId); }
        this._current = this.unsorted.sort((a,b) => (Number(a._data.lastOpened) - Number(b._data.lastOpened))).slice(-1)[0].id;
    }

    new() {
        console.log("new", this.type);
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
}