class Users extends Siblings {
    constructor(app) {
        super(app, User, "user");
        this._type = "users";
        this._defaultName = "new_user";
        this.initialPushToStorage();
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
        containers.forEach(container => {
            //console.log("looking for one user without password in", container, this.type);
            if (Object.keys(container).includes(this._type)) {
                var userRecords = JSON.parse(container.getItem(this._type));
                if (userRecords.length == 1 && userRecords[0].passwordHash == "") {
                    this._current = userRecords[0].id;
                    //console.log("one user without password found:", container, userRecords[0], this._current);
                    this._loadFrom(container, this._type);
                }
            }
        });
        if (!this.current) {
            containers.forEach(container => {
                //console.log("looking for remember me user");
                if (Object.keys(container).includes("rememberMe")) {   //Remember Me set
                    this._current = container.getItem("rememberMe");
                    tables.forEach(tableName => { // order: session:update, local:update, session:users, local:users
                        if (Object.keys(container).includes(tableName)) {
                            if (JSON.parse(container.getItem(tableName)).find(user => (user.id == this._current))) {
                                //console.log("rememberMe user found:", container, table, this._current);
                                this._loadFrom(container, tableName);
                            }
                        }
                    })
                }
            })
        }
        if (!this.current) { this.new(); }
    }

    _loadFrom(container, parentId) {
        var data = [], user;
        data = JSON.parse(container.getItem(this._type)).filter(entry =>
            ((parentId == undefined || parentId == entry[this.parent.type + "Id"]) &&
                (!this.findById(entry.id)) ||
                 (this.findById(entry.id) &&
                  this.findById(entry.id)._data.lastEdited < entry.lastEdited)));
        data.forEach(entry => {
            user = new this._SiblingClass(this._app, this);
            user.load(entry);
            this._siblings.push(user);
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

    initialPushToStorage() {
        //console.log("initialPushToStorage():");
        var containers = [sessionStorage, localStorage];
        containers.forEach(container => {
            var keys = Object.keys(container);
            //console.log("Keys:", keys);
            if (keys.includes("currentUser")) { container.removeItem("currentUser"); }
            var updateTables = keys.filter(name => name.startsWith("update_"));
            //console.log("updateTables:", updateTables);
            updateTables.forEach(updateTable => { 
                //console.log(updateTable);
                var updateRecords = JSON.parse(container.getItem(updateTable));
                var storageTable = updateTable.split("_")[1]; //everything after update_
                if (keys.includes(storageTable)) {
                    var storageRecords = JSON.parse(container.getItem(storageTable));
                    //console.log(storageTable, storageRecords);
                    updateRecords.forEach(updateRecord => {
                        //console.log(updateRecord);
                        storageRecords.filter(storageRecord => (storageRecord.id != updateRecord.id));
                        storageRecords.push(updateRecord);
                    });
                    container.setItem(storageTable, JSON.stringify(storageRecords));
                }
                else {
                    //console.log(storageTable, "does not exist.  Creating with", updateRecords);
                    container.setItem(storageTable, JSON.stringify(updateRecords));
                }
                container.removeItem(updateTable);
            });
        });
    }
}