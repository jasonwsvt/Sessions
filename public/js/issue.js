class Issue extends Sibling {
    constructor(app, issues) {
        super(app, issues);
        this._children = new Sessions(app, this);
        this._type = "issue";
    }

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