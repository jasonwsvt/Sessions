class Users extends Siblings {
    constructor(app) {
        super(app, User, "user");
        this._type = "users";
        this._defaultName = "new_user";
        this.load();
    }

    get currentUser()         { return (this._current) ? this._current : null; }
    get firstCreated()        { return; }
    get mostRecentlyCreated() { return; }
    get mostRecentlyOpened()  { return; }
    get mostRecentlyEdited()  { return; }
    get sortByCreation()      { return; }
    get sortByLastEdited()    { return; }
    get sortByLastOpened()    { return; }
    get sortByName()          { return; }

    load() {
        if (Object.keys(sessionStorage).includes(this._type)) { //Wasn't backed up
            this._current = JSON.parse(sessionStorage.getItem(this._type)).pop().id;
            this._loadFrom(sessionStorage);
        }
        else if (Object.keys(localStorage).includes("rememberMe")) {
            this._current = localStorage.getItem("rememberMe");
            this._loadFrom(localStorage);
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