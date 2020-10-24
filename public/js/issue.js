class Issue extends Sibling {
    constructor(app, issues) {
        super(app, issues);
        this._children = new Sessions(app, this);
        this._defaultName = "New Issue";
    }

    get parentId()         { return (this._data.clientId) ? this._data.clientId : null; }
    set parentId(parentId) { if (this._data.clientId != parentId) { this._data.clientId = parentId; } }

    get newData(clientId) {
        return {
            id: this.newId,
            clientId: clientId,
            name: this._defaultName,
            lastEdited: null,
            lastOpened: null
        }
    }
}