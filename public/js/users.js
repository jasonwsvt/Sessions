class Users extends Siblings {
    _defaultUserName = null;

    constructor(app) {
        super(app, User, "user");
        this._siblingsType = "users";
        this._defaultUserName = "New User";
        this.load();
    }

    get firstCreated()        { pass; }
    get mostRecentlyCreated() { pass; }
    get mostRecentlyOpened()  { pass; }
    get mostRecentlyEdited()  { pass; }
    get sortByCreation()      { pass; }
    get sortByLastEdited()    { pass; }
    get sortByLastOpened()    { pass; }
    get sortByName()          { pass; }

    load() {
        var entries, entry, userName;
        console.log(this._siblingsType, this._defaultUserName);
        if (Object.keys(localStorage).includes("rememberMe")) {
            console.log("has RememberMe user");
            userName = JSON.parse(localStorage.getItem(localStorage.getItem("rememberMe")));
            entries = JSON.parse(sessionStorage.getItem(this._siblingsType));
            entry = entries.find(entry => (entry.userName == userName));
            this._current = entry.id;
            user = new this._SiblingClass(this);
            user.load(entry.useLocalStorage, entry.useServerStorage, entry);
        }
        else if (Object.keys(sessionStorage).includes(this._siblingsType)) {
            console.log("has sessionStorage users");
            entries = JSON.parse(sessionStorage.getItem(this._siblingsType));
            entry = entries.find(entry => (entry.userName == this._defaultUserName));
            if (entry) {
                this._current = entry.id;
                this._loadFrom(entry.useLocalStorage, entry.useServerStorage, sessionStorage);
            }
        }
        else if (Object.keys(localStorage).includes(this._siblingsType)) {
            console.log("has localStorage users");
            entries = JSON.parse(localStorage.getItem(this._siblingsType));
            entry = entries.find(entry => (entry.userName == this._defaultUserName));
            if (entry) {
                this._current = entry.id;
                this._loadFrom(entry.useLocalStorage, entry.useServerStorage, localStorage);
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