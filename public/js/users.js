class Users extends Siblings {
    _defaultUserName = null;

    constructor(app) {
        super(app, User, "user");
        this._siblingsType = "users";
        this._defaultUserName = "New User";
        this._init();
    }

    get firstCreated()        { pass; }
    get mostRecentlyCreated() { pass; }
    get mostRecentlyOpened()  { pass; }
    get mostRecentlyEdited()  { pass; }
    get sortByCreation()      { pass; }
    get sortByLastEdited()    { pass; }
    get sortByLastOpened()    { pass; }
    get sortByName()          { pass; }

    load(data) {
        var user = new User(this._app, this);
        user.load(data);
        user.setAsCurrent();
        this._users.push(user);
    }

    _init() {
        if (Object.keys(localStorage).includes("rememberMe")) {
            load(JSON.parse(localStorage.getItem(localStorage.getItem("rememberMe"))));
        }
        else if (Object.keys(sessionStorage).includes(this._siblingType)) {
            data = sessionStorage.getItem(this._siblingType).find(user => (user.userName == this._defaultUserName));
            if (data) {
                this.load(data);
            }
        }
        else if (Object.keys(localStorage).includes(this._siblingsType)) {
            data = localStorage.getItem(this._siblingsType).find(user => (user.userName == this._defaultUserName));
            if (data) {
                this.load(data);
            }
        }
        else {
            this.new();
        }
    }

    logIn(userName, password) {
        if (Object.keys(localStorage).includes(userName)) {
            data = JSON.parse(localStorage.getItem(userName));
            if (data.passwordHash == this.hash(password)) {
                this.data = user;
                return true;
            }
        }
        return false;
    }

    hash(password)               {
        return "hashed " + password;
    }
}