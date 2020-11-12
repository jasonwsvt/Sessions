class Client extends Sibling {
    constructor(app, clients) {
        super(app, clients);
        this._type = "client";
        this._children = new Issues(app, this);
    }

    get issues()           { return this._children; }
    get clients()          { return this._siblings; }

//    get parentId()         { return (this._data.userId) ? this._data.userId : null; }
//    set parentId(parentId) {
//        if (this._data.userId != parentId) {
//            this._data.userId = parentId;
//            this._update();
//        }
//    }

    _newData(id) {
        var name = (this.clients.entries == 0 && this.siblings.defaultFirstName) ? this.siblings.defaultFirstName : this.siblings.defaultName;
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