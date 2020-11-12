class Client extends Sibling {
    constructor(app, clients) {
        super(app, clients);
        this._type = "client";
        this._children = new Issues(app, this);
    }

    _newData(id) {
        var name = (this.siblings.entries == 0 && this.siblings.defaultFirstName) ? this.siblings.defaultFirstName : this.siblings.defaultName;
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