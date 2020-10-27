class Issues extends Siblings {
    constructor(app, parent) {
        super(app, Issue, parent);
        this._type = "issues";
        this._defaultName = "New Issue";
    }

    get currentUser() { return this.parent.parent; }
}