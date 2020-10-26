class Client extends Sibling {
    constructor(app, clients) {
        super(app, clients);
        this._children = new Issues(app, this);
        this._childrenType = "issues";
        this._type = "client";
        this._defaultName = "New Client";

    }

    get issues()           { return this._children; }
    get clients()          { return this._siblings; }

    get parentId()         { return (this._data.userId) ? this._data.userId : null; }
    set parentId(parentId) { if (this._data.userId != parentId) { this._data.userId = parentId; } }

    _newData(id, userId) {
        return {
            id: id,
            userId: userId,
            name: this._defaultName,
            lastEdited: null,
            lastOpened: null
        }
    }
}