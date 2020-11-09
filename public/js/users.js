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
        var containers = [sessionStorage, localStorage];
        var tables = ["update_" + this._type, this._type];
        tables.forEach(tableName => { // order: session:update, local:update, session:users, local:users
            containers.forEach(container => {
                if (Object.keys(container).includes(tableName)) {
                    var table = container.getItem(tableName);
                    if (table.length == 1 && table[0].passwordHash == "") {
                        this._current = table[0].id;
                        this._loadFrom(container, tableName);
                        return;
                    }
                }
            })
        })
        if (Object.keys(localStorage).includes("rememberMe")) {                 //Remember Me set
            this._current = localStorage.getItem("rememberMe");
            tables.forEach(tableName => { // order: session:update, local:update, session:users, local:users
                containers.forEach(container => {
                    if (Object.keys(container).includes(tableName)) {
                        if (container.getItem(tableName).find(user => (user.id == this._current))) {
                            this._loadFrom(container, tableName);
                            return;
                        }
                    }
                })
            })
        }
        if (this._current == null) {
            this.new();
        }
    }

    _loadFrom(container, tableName, parentId) {
        var data = [], user;
        data = JSON.parse(container.getItem(tableName)).filter(entry =>
            ((parentId == undefined || parentId == entry[this.parent.type + "Id"]) &&
                (!this.findById(entry.id)) ||
                 (this.findById(entry.id) &&
                  this.findById(entry.id)._data.lastEdited < entry.lastEdited)));
        data.forEach(entry => {
            user = new this._SiblingClass(this._app, this);
            user.load(entry);
            this._siblings.push(sibling);
        });
    }


    logIn(userName, password) {
        if (Object.keys(localStorage).includes(userName)) {
            data = JSON.parse(localStorage.getItem(userName));
            if ((password == "" && data.passwordHash == "") || (data.passwordHash == this.hash(password))) {
                this._current = data.id;
                user = new this._SiblingClass(this._app, this);
                user.load(data);
                this._users.push(user);
                return true;
            }
        }
        return false;
    }
}