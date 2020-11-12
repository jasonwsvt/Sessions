class Issue extends Sibling {
    constructor(app, issues) {
        super(app, issues);
        this._children = new Sessions(app, this);
        this._type = "issue";
    }

    get sessions()         { return this._children; }
    get issues()           { return this._siblings; }

//    get parentId()         { return (this._data.clientId) ? this._data.clientId : null; }
//    set parentId(parentId) { if (this._data.clientId != parentId) { this._data.clientId = parentId; } }

    _newData(id) {
        var clientId = this.parent.id;
        var name = this.siblings.defaultName;
        return {
            id: id,
            clientId: clientId,
            name: name,
            lastEdited: null,
            lastOpened: null
        }
    }
}