class Issues extends Siblings {
    constructor(app, parent) {
        super(app, Issue, parent);
        this._siblingsType = "issues";
    }
}