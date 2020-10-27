class Clients extends Siblings {
    constructor(app, parent) {
        super(app, Client, parent);
        this._type = "clients";
        this._defaultName = "New Client";
        this._defaultFirstName = "Self";
    }

    get currentUser() { return this.parent; }
}