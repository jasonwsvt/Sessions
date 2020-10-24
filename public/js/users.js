class Users extends Siblings {
    constructor(app) {
        super(app, User, "user");
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
    load(data)                { pass; }

    _init() {
        var userName, user;
        if (Object.keys(localStorage).includes("rememberMe")) {
            userName = localStorage.getItem("rememberMe");
            user = new User(this._app, this);
            user.load(JSON.parse(localStorage.getItem(userName)));
            user.setAsCurrent();
            this._users.push(user);
        }
        else {
            this.new();
        }
    }

    logIn(userName, password) {
        if (Object.keys(localStorage).includes(userName)) {
            user = JSON.parse(localStorage.getItem(userName));
            if (user.passwordHash == this.hash(password)) {
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