class UserManager {
    _app = null;
    _current = null;
    _editor = null;
    _users = [];
    _utility = null;
    _default = "New User";

    constructor(app)             { this._app = app; this._init(); this._utility = new LoginUtility(this); }
    get app()                    { return this._app; }
    get default()                { return this._default; }

    findById(id)                 { return this._users.find(i => (i.id == id)); }
    findByUserName(userName)     { return this._users.find(i => (i.userName == userName)); }

    get current()                { return this._users[this._current] }
    get entries()                { return this._users.length }

    get data()                   { return this._users.map(user, () => user.data) }
    set data(data)               { user = new User(this);
                                   user.data = data; }

    new(userName = this.default) { var id = this.entries;
                                   var user = new User(this);
                                   user.init(id, userName);
                                   this._users.push(user);
                                   this._current = id;
                                   return id; }

    _init()                      { const users = null;
                                   if (Object.keys(localStorage).includes("rememberMe")) {
                                       user = localStorage.getItem("rememberMe"); 
                                       this.data = JSON.parse(localStorage.getItem(user));
                                   }
                                   else {
                                       this.new();
                                   }
    }
}