class Users extends Siblings {
    constructor(app) {
        super(app, User, "user");
        this._type = "users";
        this._defaultName = "new_user";
        this.load();
    }

    get firstCreated()        { return; }
    get mostRecentlyCreated() { return; }
    get mostRecentlyOpened()  { return; }
    get mostRecentlyEdited()  { return; }
    get sortByCreation()      { return; }
    get sortByLastEdited()    { return; }
    get sortByLastOpened()    { return; }
    get sortByName()          { return; }

    load() {
        var entries, entry, userName;
//        console.log(this._type, this._defaultName);
        if (Object.keys(localStorage).includes("rememberMe")) {
            console.log("has RememberMe user");
            userName = JSON.parse(localStorage.getItem(localStorage.getItem("rememberMe")));
            entries = JSON.parse(sessionStorage.getItem(this._type));
            entry = entries.find(entry => (entry.userName == userName));
            this._current = entry.id;
            user = new this._SiblingClass(this);
            user.load(entry);
            this._users.push(user);
        }
        else if (Object.keys(sessionStorage).includes(this._type)) {
            console.log("has sessionStorage users");
            entries = JSON.parse(sessionStorage.getItem(this._type));
            entry = entries.find(entry => (entry.userName == this._defaultName));
            if (entry) {
                this._current = entry.id;
                this._loadFrom(sessionStorage);
            }
        }
        else if (Object.keys(localStorage).includes(this._type)) {
            console.log("has localStorage users");
            entries = JSON.parse(localStorage.getItem(this._type));
            entry = entries.find(entry => (entry.userName == this._defaultName));
            if (entry) {
                this._current = entry.id;
                this._loadFrom(localStorage);
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
                this._current = data.id;
                user = new this._SiblingClass(this);
                user.load(data);
                this._users.push(user);
                return true;
            }
        }
        return false;
    }
}