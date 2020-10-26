class Issues extends Siblings {
    constructor(app, parent) {
        super(app, Issue, parent);
        this._siblingsType = "issues";
    }

    get currentUser() { return this.parent.parent; }
}