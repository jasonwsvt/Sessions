class User {
    constructor(app, users) {
        super(app, users, Clients);
    }

    get newData() {
        return {
            id: this.newId,
            userName: this.parent.default,
            firstName: null,
            lastName: null,
            passwordHash: null,
            practitioner: null,
            useLocalStorage: false,
            useServerStorage: false,
            lastEdited: null,
            lastOpened: null
        }
    }
}