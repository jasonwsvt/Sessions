class Sibling {
    _data = null;
    _siblings = false;
    _children = false;
    
    constructor(app, siblings, Children)  {
        this._siblings = siblings;
        if (Children != undefined) { this._children = new Children(app, this); }
    }
    get app()            { return this._app; }
    get siblings()       { return (this._siblings)        ? this._siblings        : null; }
    get parent()         { return (this._siblings.parent) ? this._siblings.parent : null; }
    get children()       { return (this._children)        ? this._children        : null; }

    set data(data)       { this._data = data; }
    get data()           { return this._data; }
    get parentId()       { return (this._data.parentId)   ? this._data.parentId   : null; }
    get name()           { return this._data.name; }
    set name(name)       { this._data.name = name; this._save(); }
    get id()             { return this._data.id }
    set id(id) {
        if (this._data.id != id) {
            this._data.id = id;
            this._save();
            if (this._children) {
                this._children.unsorted.forEach(child => (child._data.parentId = id));
            }
        }
    }

    setAsCurrent() {
        this._siblings.current = this._data.id;
        this._data.lastOpened = this.now;
        if (this._children) { this._children.mostRecentlyOpened.setAsCurrent(); }
    }
                                
    init(parentId) {
        this.data(newData(parentId));
        if (this._children) { this._children.new(this.data.id); }
    }

    _save() {
        var sessionData;
        this._data.lastEdited = this.now;
        if (Object.keys(sessionStorage).includes(this._siblings.type + "s")) {
            sessionData = JSON.parse(sessionStorage.getItem(this._siblings.type + "s"));
        }
        sessionData[this._id]= this.data;
        sessionStorage.setItem(this._siblings.type + "s", JSON.stringify(data));
    }

    load(data) {
        this.data = data;
        if (this._children) { this._children.load(data[this._children.type + "s"]); }
    }

    get now() {
        Math.floor(Date.now() / 1000);
    }
}