class Issue extends Sibling {
    constructor(app, issues) {
        super(app, issues);
        this._children = new Sessions(app, this);
        this._childrenType = "sessions";
        this._type = "issue";
        this._defaultName = "New Issue";
    }

    get sessions()         { return this._children; }
    get issues()           { return this._siblings; }
    get currentUser()      { return this._siblings.parent.parent; }

    get parentId()         { return (this._data.clientId) ? this._data.clientId : null; }
    set parentId(parentId) { if (this._data.clientId != parentId) { this._data.clientId = parentId; } }

    _newData(id) {
        var clientId = this.parent.id;
        return {
            id: id,
            clientId: clientId,
            name: this._defaultName,
            lastEdited: null,
            lastOpened: null
        }
    }
}