class Sibling {
    _app = null;
    _siblings = false;
    _type = null;
    _data = null;
    _children = false;
    _childrenType = null;
    _defaultName = null;
    
    constructor(app, siblings, type) {
        this._app = app;
        this._siblings = siblings;
        this._type = type;
    }
    get app()            { return this._app; }
    get siblings()       { return (this._siblings)        ? this._siblings        : null; }
    get parent()         { return (this._siblings.parent) ? this._siblings.parent : null; }
    get children()       { return (this._children)        ? this._children        : null; }

    set data(data)       { this._data = data; }
    get data()           { return this._data; }

    get name()           { return this._data.name; }
    set name(name)       { this._data.name = name; this._save(); }

    get id()             { return this._data.id; }
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
                                
    init(id, parentId) {
        this._data = this._newData(id, parentId);
        this._save();
        if (this._children) { this._children.new(this._data.id); }
    }

    load(data) {
        console.log(data);
        this._data = data;
        this._postLoad();
        if (this._children) { this._children.load(); }
    }

    _postLoad() { return; }

    _save() {
        var sessionData = [];
        this._data.lastEdited = this.now;
        if (Object.keys(sessionStorage).includes(this.siblings.siblingsType)) {
            sessionData = JSON.parse(sessionStorage.getItem(this.siblings.siblingsType));
        }
        sessionData = sessionData.filter(session => {
//            console.log(session.id, (session.id == this._data.id), this._data.id);
            if (Number(session.id) != Number(this._data.id)) {
                return session;
            }
        });
        sessionData.push(this._data);

//        console.log(this.siblings.siblingsType, this._data.id, sessionData, JSON.stringify(sessionData));
        sessionStorage.setItem(this.siblings.siblingsType, JSON.stringify(sessionData));
    }

    get now() {
        return Math.floor(Date.now() / 1000);
    }

    newData(parentId) { pass; }
}