class Client extends Sibling {
    constructor(app, clients) {
        super(app, clients);
        this._children = new Clients(app, this);
        this._defaultName = "New Client";
    }

    get parentId()         { return (this._data.userId) ? this._data.userId : null; }
    set parentId(parentId) { if (this._data.userId != parentId) { this._data.userId = parentId; } }

    get newData(userId) {
        return {
            id: this.newId,
            userId: userId,
            name: this._defaultName,
            lastEdited: null,
            lastOpened: null
        }
    }
}