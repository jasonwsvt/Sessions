class Client extends Sibling {
    constructor(app, clients) {
        super(app, clients);
        this._childrenType = "issues";
        this._type = "client";
        this._defaultName = "New Client";
        this._defaultFirstName = "Self";
        this._children = new Issues(app, this);
    }

    get issues()           { return this._children; }
    get clients()          { return this._siblings; }
    get currentUser()      { return this._siblings.parent; }

    get parentId()         { return (this._data.userId) ? this._data.userId : null; }
    set parentId(parentId) { if (this._data.userId != parentId) { this._data.userId = parentId; } }

    _newData(id) {
        var name = (this.clients.entries == 0 && this._defaultFirstName) ? this._defaultFirstName : this._defaultName;
        var userId = this.parent.id;
        return {
            id: id,
            userId: userId,
            name: name,
            lastEdited: null,
            lastOpened: null
        }
    }
}