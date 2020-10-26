class Clients extends Siblings {
    constructor(app, parent) {
        super(app, Client, parent);
        this._siblingsType = "clients";
    }
}