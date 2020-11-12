class Users extends Siblings {
    constructor(app) {
        super(app, User, "user");
        this._type = "users";
        this._defaultName = "new_user";
        this.initialPushToStorage();
        this.load();
        if (Object.keys(sessionStorage).includes("users") && JSON.parse(sessionStorage.getItem("users")).length >= 1) { sessionStorage.clear(); }
    }

    get currentUser()            { return (this._current) ? this.findById(this._current) : null; }
    get pushToStorageFrequency() { return this.currentUser.pushToStorageFrequency; }
    get pushToServerFrequency()  { return this.currentUser.pushToServerFrequency; }
    get firstCreated()           { return; }
    get mostRecentlyCreated()    { return; }
    get mostRecentlyOpened()     { return; }
    get mostRecentlyEdited()     { return; }
    get sortByCreation()         { return; }
    get sortByLastEdited()       { return; }
    get sortByLastOpened()       { return; }
    get sortByName()             { return; }

    load() {
        var containers = [sessionStorage, localStorage];
        containers.forEach(container => {
            if (Object.keys(container).includes(this._type)) {
                console.log("looking for one user without password");
                var userRecords = JSON.parse(container.getItem(this._type));
                if (userRecords.length == 1 && userRecords[0].passwordHash == "") {
                    console.log("one user without password found: ", userRecords[0].id);
                    this._loadFrom(container, userRecords[0].id);
                }
                else { console.log("didn't find a user without a password"); }
            }
        });
        if (!this.current) {
            //console.log("looking for remember me user");
            if (Object.keys(localStorage).includes("rememberMe")) {   //Remember Me set
                if (Object.keys(localStorage).includes("users")) {
                    if (JSON.parse(localStorage.getItem("users")).find(user => (user.id == localStorage.getItem("rememberMe")))) {
                        //console.log("rememberMe user found:", this._current);
                        this._loadFrom(localStorage, localStorage.getItem("rememberMe"));
                    }
                    else { console.log("didn't find a rememberMe user with that id"); }
                }
            }
        }
        if (!this.current) { this.new(); }
    }

    _loadFrom(container, id) {
        var data = JSON.parse(container.getItem(this._type)).find(entry => (entry.id == id));
        this._siblings.push(new this._SiblingClass(this._app, this));
        this._current = id;
        this._siblings[this._siblings.length - 1].load(data);
    }


    logIn(userName, password) {
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