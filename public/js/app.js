class App {
    userManager = null;
    buttons = null;
    editor = null;
    utilities = null;

    constructor() {
        this._userManager = new UserManager(this);
        this._editor = new Editor(this);
        this._buttons = new Buttons(this);
        this._utilities = new Utilities(this);
    }

    get userManager() { return this._userManager; }
    get editor()      { return this._editor; }
    get buttons()     { return this._buttons; }
    get utilities()   { return this._utilities; }
}