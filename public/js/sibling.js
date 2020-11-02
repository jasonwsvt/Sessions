class Sibling {
    _app = null;
    _siblings = false;
    _type = null;
    _data = null;
    _children = false;
    
    constructor(app, siblings) {
        this._app = app;
        this._siblings = siblings;
    }
    get app()              { return this._app; }
    get siblings()         { return (this._siblings)        ? this._siblings        : null; }
    get parent()           { return (this._siblings.parent) ? this._siblings.parent : null; }
    get children()         { return (this._children)        ? this._children        : null; }
    get type()             { return this._type; }

    set data(data)         { this._data = data; }
    get data()             { return this._data; }

    get name()             { return this._data.name; }
    set name(name)         { this._data.name = name; this._save(); }

    get id()               { return this._data.id; }
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
        var sessionData = [];
        this._data.lastEdited = this.now;
        if (Object.keys(sessionStorage).includes(this.siblings.type)) {
            sessionData = JSON.parse(sessionStorage.getItem(this.siblings.type));
        }
        sessionData = sessionData.filter(session => {
//            console.log(session.id, (session.id == this._data.id), this._data.id);
            if (Number(session.id) != Number(this._data.id)) {
                return session;
            }
        });
        sessionData.push(this._data);

//        console.log(this.siblings.type, this._data.id, sessionData, JSON.stringify(sessionData));
        sessionStorage.setItem(this.siblings.type, JSON.stringify(sessionData));
    
        this.app.users.current.startBackupTimer();
    }

    get now() {
        return Math.floor(Date.now() / 1000);
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