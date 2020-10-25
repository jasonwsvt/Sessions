class Issues extends Siblings {
    constructor(app, parent) {
        super(app, Issue, "issue", parent);
        this._siblingsType = "issues";
    }
}