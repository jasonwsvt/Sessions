class Users extends Siblings {
    constructor(app) {
        super(app, User, "user");
        this._type = "users";
        this._defaultName = "new_user";
        this.initialPushToStorage();
        this.load();
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
        var rememberMeUserId = this.rememberMe;
        var sessionUsers = this.sUsers;
        var browserUsers = this.bUsers;
        if (sessionUsers) {
//            console.log(sessionUsers);
            var noPasswordSessionUser = sessionUsers.find(r => (r.passwordHash == "" && r.hidden == false));
            var defaultSessionUser = sessionUsers.find(r => (r.username == this._defaultName));
        }
        if (browserUsers) {
            var noPasswordBrowserUser = browserUsers.find(r => (r.passwordHash == "" && r.hidden == false));
            var defaultBrowserUser = browserUsers.find(r => (r.username == this._defaultName));
        }
        if      (rememberMeUserId)      { this.loadFrom(localStorage, rememberMeUserId); }
        else if (defaultSessionUser)    { this.loadFrom(sessionStorage, defaultSessionUser.id); }
        else if (noPasswordSessionUser) { this.loadFrom(sessionStorage, noPasswordSessionUser.id); }
        else if (defaultBrowserUser)    { this.loadFrom(localStorage, defaultBrowserUser.id); }
        else if (noPasswordBrowserUser) { this.loadFrom(localStorage, noPasswordBrowserUser.id); }
        else                            { this.new(); }
    }

    loadFrom(container, id) {
        this._current = id;
        var data = this.findRecord(container, this._type, id);
//        console.log(data);
        this._siblings.push(new this._SiblingClass(this._app, this));
        this._siblings[this._siblings.length - 1].load(data);
    }


    logIn(username, password) {
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
                var updateRecords = this.getRecords(container, updateTable);
                //console.log("updateTable:", updateTable);
                //console.log("updateRecords:", updateRecords);
                var storageTable = updateTable.split("_")[1]; //everything after update_
                if (keys.includes(storageTable)) {
                    var storageRecords = this.getRecords(container, storageTable);
                    //console.log("storageTable:", storageTable);
                    //console.log("storageRecords:", storageRecords);
                    updateRecords.forEach(updateRecord => {
                        //console.log("updateRecord:", updateRecord);
                        //console.log("StorageRecords before:", storageRecords);
                        storageRecords = storageRecords.filter(storageRecord => (storageRecord.id != updateRecord.id));
                        //console.log("StorageRecords after filter:", storageRecords);
                        storageRecords.push(updateRecord);
                        //console.log("StorageRecords after push:", storageRecords);
                    });
                    if (isString(storageRecords)) { console.trace(); }
                    this.setRecords(container, storageTable, storageRecords);
                }
                else {
                    //console.log(storageTable, "does not exist.  Creating with", updateRecords);
                    if (isString(updateRecords)) { console.trace(); }
                    this.setRecords(container, storageTable, updateRecords);
                }
                this.removeTable(container, updateTable);
            });
        });
    }
}