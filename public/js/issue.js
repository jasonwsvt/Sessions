class Issue {
    constructor(app, issues) {
        super(app, issues, Sessions);
    }

    get newData(clientId) {
        return {
            id: this.newId,
            clientId: clientId,
            name: this.parent.default,
            lastEdited: null,
            lastOpened: null
        }
    }
}