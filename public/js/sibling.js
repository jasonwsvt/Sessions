class Sibling extends StorageUtility {
    _app = null;
    _siblings = false;
    _type = null;
    _data = null;
    _children = false;
    
    constructor(app, siblings) {
        super();
        this._app = app;
        this._siblings = siblings;
    }
    get app()                    { return this._app; }
    get currentUser()            { return (this.parent)           ? this.parent.currentUser : null; }
    get storagePermanence()        { return this.currentUser.storagePermanence; }
    get useServerStorage()       { return this.currentUser.useServerStorage; }
    get pushToStorageFrequency() { return this.currentUser.pushToStorageFrequency; }
    get pushToServerFrequency()  { return this.currentUser.pushToServerFrequency; }
    get parent()                 { return (this._siblings.parent) ? this._siblings.parent   : null; }
    get type()                   { return this._type; }
    get siblings()               { return (this._siblings)        ? this._siblings          : null; }
    get children()               { return (this._children)        ? this._children          : null; }
    get storageTableName()       { return this.siblings.type; }

    set data(data)               { this._data = data; }
    get data()                   { return this._data; }

    get name()                   { return this._data.name; }
    set name(name)               { this._data.name = name; this._save(); }

    get id()                     { return this._data.id; }
    set id(id) {
        if (this._data.id != id) {
            this._data.id = id;
            this._save();
            if (this._children) {
                this._children.unsorted.forEach(child => (child._data.parentId = id));
            }
        }
    }
    get lastEdited()      { return this._data.lastEdited; }
    get lastOpened()      { return this._data.lastOpened; }

    setAsCurrent() {
        this._siblings.current = this._data.id;
        this._data.lastOpened = this.now;
        if (this._children) { this._children.mostRecentlyOpened.setAsCurrent(); }
    }
                                
    init(id) {
        this._data = this._newData(id);
//        console.log("New:", this.siblings.type, "Entries:", this.siblings.entries, this._data);
        this._postInit();
        this._save();
        if (this._children) { this._children.new(id); }
    }

    _postInit() { return; }

    load(data) {
        this._data = data;
        this._updateData();
        this._postLoad();
        if (this._children) { this._children.load(this._data.id); }
    }

    _postLoad() { return; }

    _save() {
        this._data.lastEdited = this.now;
        this.setRecordInUpdate(this._data);
        this.siblings.schedulePushes();
    }

    _newData(id, parentId) { pass; }

    _updateData() {
        const newData = this._newData(0, 0);
        const newKeys = Object.keys(newData);
        const curKeys = Object.keys(this._data);
        var change = false;
        newKeys.map(entry => { if (!curKeys.includes(entry)) { change = true; this._data[entry] = newData[entry]; } });
        curKeys.map(entry => { if (!newKeys.includes(entry)) { change = true; delete this._data[entry]; } });
        if (change) { this._save(); }
    }
}