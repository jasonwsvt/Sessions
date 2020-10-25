class Clients extends Siblings {
    constructor(app, parent) {
        super(app, Client, "client", parent);
        this._siblingsType = "clients";
    }
}