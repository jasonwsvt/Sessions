class App {
    userManager = null;
    buttons = null;
    editor = null;

    constructor() {
        this._userManager = new UserManager(this);
        this._editor = new Editor(this);
        this._buttons = new Buttons(this);
    }

    get userManager() { return this._userManager; }
    get editor()      { return this._editor; }
    get buttons()     { return this._buttons; }
}