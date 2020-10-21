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
    get current()                { return this._users[this._current]; }
    set current(id)              { this.findById(id).setAsCurrent(); }

    get entries()                { return this._users.length; }

    set data(data)               { user = new User(this);
                                   user.data = data; }

    new(userName = this.default) { var id = this.entries;
                                   var user = new User(this);
                                   user.init(id, userName);
                                   this._users.push(user);
                                   this.current = id;
                                   return id; }

    _init()                      { var userName, user;
                                   if (Object.keys(localStorage).includes("rememberMe")) {
                                       userName = localStorage.getItem("rememberMe");
                                       user = new User(this);
                                       user.load(JSON.parse(localStorage.getItem(userName)));
                                       this._users.push(user);
                                       this.current = user._id; 
                                   }
                                   else {
                                       this.new();
                                   }

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