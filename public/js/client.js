class Client {
    constructor(app, clients) {
        super(app, clients, Issues);
    }

    get newData(userId) {
        return {
            id: this.newId,
            userId: userId,
            name: this.parent.default,
            lastEdited: null,
            lastOpened: null
        }
    }
}