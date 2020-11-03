class App {
    _backup = null;
    _users = null;
    _buttons = null;
    _editor = null;
    _utilities = null;

    constructor() {
        this._backup = new Backup();
        this._users = new Users(this);
        this._editor = new Editor(this);
        this._utilities = new Utilities(this);
        this._buttons = new Buttons(this);
        this.editor.load();
    }

    get app()       { return this; }
    get backup()    { return this._backup; }
    get users()     { return this._users; }
    get editor()    { return this._editor; }
    get utilities() { return this._utilities; }
    get buttons()   { return this._buttons; }
}

var app = new App();