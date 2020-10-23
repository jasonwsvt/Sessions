class Users {
    _app = null;
    _current = null;
    _editor = null;
    _users = [];
    _utility = null;
    _default = "New User";

    constructor(app)             { this._app = app; this._init(); }
    get app()                    { return this._app; }
    get default()                { return this._default; }

    findById(id)                 { return this._users.find(i => (i.id == id)); }
    findByUserName(userName)     { return this._users.find(i => (i.userName == userName)); }
    get current()                { return this.findById(this._current); }
    set current(id)              { this._current = id; }

    get entries()                { return this._users.length; }

    set data(data)               { user = new User(this);
                                   user.data = data; }

    _init() {
        var userName, user;
        if (Object.keys(localStorage).includes("rememberMe")) {
            userName = localStorage.getItem("rememberMe");
            user = new User(this);
            user.load(JSON.parse(localStorage.getItem(userName)));
            user.setAsCurrent();
            this._users.push(user);
        }
        else {
            this.new();
        }
    }

    new(userName = this.default) {
        var id = this.entries;
        var user = new User(this);
        user.init(id, userName);
        user.setAsCurrent();
        this._users.push(user);
        return id;
    }

    logIn(userName, password)    { if (Object.keys(localStorage).includes(userName)) {
                                       user = JSON.parse(localStorage.getItem(userName));
                                       if (user.passwordHash == this.hash(password)) {
                                           this.data = user;
                                           return true;
                                       }
                                   }
                                   return false;
                                 }

    hash(password)               { return "hashed " + password; }
}