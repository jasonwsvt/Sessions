class StorageUtility {
    _lastPushToStorage = false;
    _lastPushToServer = false;
    _scheduledPushToStorage = null;

    get storagePermanence()      { return false; }
    get useServerStorage()       { return false; }
    get pushToStorageFrequency() { return false; }
    get pushToServerFrequency()  { return false; }
    get canHaveChildren()        { return false; }
    get parentIdName()           { return this.parent.type + "Id"; }

    schedulePushes() {
        if (varType(this.pushToStorageFrequency) != "integer") {
            //console.trace();
            //console.log("schedulePushes", this.type, this.pushToStorageFrequency, this.pushToServerFrequency);
        }
        if (this.pushToStorageFrequency) { this.schedulePushToStorage(); }
        if (this.pushToServerFrequency)  { this.schedulePushToServer(); }
    }

    schedulePushToStorage(seconds = this.pushToStorageFrequency) {
        //console.log(this.type, "schedulePushToStorage("+seconds+")");
        if (seconds && !this.nextPushToStorage) {
            this.nextPushToStorage = this.now + seconds;
            //console.log(this.nextPushToStorage);
            if (this.nextPushToServer) {
                const difference = this.nextPushToServer - this.nextPushToStorage;
                if (difference < 5 && difference > 5) { this.nextPushToStorage = this.nextPushToStorage - 5; }
            }
            var time = (this.nextPushToStorage - this.now) * 1000;
            this._scheduledPushToStorage = setTimeout(() => this.pushToStorage(), time);
            //console.log("scheduled", this.type, "storage push in", seconds, "seconds at", this.nextPushToStorage);
        }
    }

    reschedulePushToStorage(newFrequency = this.pushToStorageFrequency) {
        //console.log(this.type, "reschedulePushToStorage(", newFrequency, ")", this.nextPushToStorage);
        const nextPushToStorage = this.nextPushToStorage;
        if (nextPushToStorage) {
            //console.log(this.type, "next push to storage exists")
            this.stopPushToStorage();
            if (newFrequency) {
                var secondsFromPreviousScheduling = this.now - nextPushToStorage + this.pushToStorageFrequency;
                //console.log(secondsFromPreviousScheduling, nextPushToStorage, this.pushToStorageFrequency);
                if (secondsFromPreviousScheduling > newFrequency) {
                    //console.log(this.type, "canceling", this.type, "push and pushing to storage now")
                    this.pushToStorage();
                }
                else {
                    //console.log(this.type, "rescheduling", this.type, "push at ", newFrequency - secondsFromPreviousScheduling, "seconds from now");
                    this.schedulePushToStorage(newFrequency - secondsFromPreviousScheduling);
                }
            }
        }
        if (this.canHaveChildren) { this.current.children.reschedulePushToStorage(newFrequency); }
    }

    stopPushToStorage() {
        //console.log(this.type, "stopPushToStorage");
        clearTimeout(this._scheduledPushToStorage);
        this.removeNextPushToStorage();
        
    }

    pushToStorage() {
        //console.log("pushToStorage", this.type);
        this.removeNextPushToStorage();
        this.lastPushToStorage = this.now;
        if (!this.csTableExists) { 
            //console.log(this.storageTableName, "doesn't exist");
            this.csRecords = this.cuRecords;
        }
        else {
            var csRecords = this.csRecords;
            this.cuRecords.forEach(cuRecord => {
                //console.log(this.storageTableName, "before:", storageRecords)
                csRecords = csRecords.filter(csRecord => (csRecord.id != cuRecord.id));
                csRecords.push(cuRecord);
                //console.log(this.storageTableName, "after:", storageRecords)
            });
            this.csRecords = csRecords;
        }
        this.cuRemoveTable();
        //console.log(this.updateTableExists);
    }

    pushToServer() {
    }

    get container()             { return (this.storagePermanence) ? localStorage : sessionStorage; }
    get otherContainer()        { return (this.storagePermanence) ? sessionStorage : localStorage; }

    get updateTableName()       { return "update_" + this.storageTableName; }
    get storageTableName()      { return ""; }  //set this in extended class;

//    removeStorageTable()        { this.container.removeItem(this.storageTableName); }
//    removeUpdateTable()         { this.container.removeItem(this.updateTableName); }
    cuRemoveTable() { this.removeTable(this.container, this.updateTableName); }
    csRemoveTable() { this.removeTable(this.container, this.storageTableName); }
    ouRemoveTable() { this.removeTable(this.otherContainer, this.updateTableName); }
    osRemoveTable() { this.removeTable(this.otherContainer, this.storageTableName); }
    buRemoveTable() { this.removeTable(localStorage, this.updateTableName); }
    bsRemoveTable() { this.removeTable(localStorage, this.storageTableName); }
    suRemoveTable() { this.removeTable(sessionStorage, this.updateTableName); }
    ssRemoveTable() { this.removeTable(this.container, this.storageTableName); }
    removeTable(container, table) { container.removeItem(table); }

//    get updateTableExists()     { return this.tableExists(this.updateTableName); }
//    get storageTableExists()    { return this.tableExists(this.storageTableName); }
    get cuTableExists() { return this.tableExists(this.container, this.updateTableName); }
    get csTableExists() { return this.tableExists(this.container, this.storageTableName); }
    get ouTableExists() { return this.tableExists(this.otherContainer, this.updateTableName); }
    get osTableExists() { return this.tableExists(this.otherContainer, this.storageTableName); }
    get buTableExists() { return this.tableExists(localStorage, this.updateTableName); }
    get bsTableExists() { return this.tableExists(localStorage, this.storageTableName); }
    get suTableExists() { return this.tableExists(sessionStorage, this.updateTableName); }
    get ssTableExists() { return this.tableExists(sessionStorage, this.storageTableName); }
    tableExists(container, tableName) {
        const exists = (Object.keys(container).includes(tableName))
        return exists;
    }

//    get updateRecords()         { return this.getRecords(this.updateTableName); }
//    get storageRecords()        { return this.getRecords(this.storageTableName); }
    get cuRecords() { return this.getRecords(this.container, this.updateTableName); }
    get csRecords() { return this.getRecords(this.container, this.storageTableName); }
    get ouRecords() { return this.getRecords(this.otherContainer, this.updateTableName); }
    get osRecords() { return this.getRecords(this.otherContainer, this.storageTableName); }
    get buRecords() { return this.getRecords(localStorage, this.updateTableName); }
    get bsRecords() { return this.getRecords(localStorage, this.storageTableName); }
    get suRecords() { return this.getRecords(sessionStorage, this.updateTableName); }
    get ssRecords() { return this.getRecords(sessionStorage, this.storageTableName); }
    getRecords(container, tableName) {
        const records = (this.tableExists(container, tableName)) ? JSON.parse(container.getItem(tableName)) : [];
        //console.log("getRecords("+tableName+"):", val);
        return records;
    }

//    set updateRecords(value)    { this.setRecords(this.updateTableName, value); }
//    set storageRecords(value)   { this.setRecords(this.storageTableName, value); }
    set cuRecords(value) { this.setRecords(this.container, this.updateTableName, value); }
    set csRecords(value) { this.setRecords(this.container, this.storageTableName, value); }
    set ouRecords(value) { this.setRecords(this.otherContainer, this.updateTableName, value); }
    set osRecords(value) { this.setRecords(this.otherContainer, this.storageTableName, value); }
    set buRecords(value) { this.setRecords(localStorage, this.updateTableName, value); }
    set bsRecords(value) { this.setRecords(localStorage, this.storageTableName, value); }
    set suRecords(value) { this.setRecords(sessionStorage, this.updateTableName, value); }
    set ssRecords(value) { this.setRecords(sessionStorage, this.storageTableName, value); }
    setRecords(container, tableName, value) {
//        console.log(this.container,".setRecords(",tableName,", ",value,")");
        if (isString(value)) { console.trace(); }
        container.setItem(tableName, JSON.stringify(value));
    }

//    removeRecordInUpdate(id)    { this.removeRecord(this.updateTableName, id); }
//    removeRecordInStorage(id)   { this.removeRecord(this.storageTableName, id); }
    cuRemoveRecord(id) { this.removeRecord(this.container, this.updateTableName, id); }
    csRemoveRecord(id) { this.removeRecord(this.container, this.storageTableName, id); }
    ouRemoveRecord(id) { this.removeRecord(this.otherContainer, this.updateTableName, id); }
    osRemoveRecord(id) { this.removeRecord(this.otherContainer, this.storageTableName, id); }
    buRemoveRecord(id) { this.removeRecord(localStorage, this.updateTableName, id); }
    bsRemoveRecord(id) { this.removeRecord(localStorage, this.storageTableName, id); }
    suRemoveRecord(id) { this.removeRecord(sessionStorage, this.updateTableName, id); }
    ssRemoveRecord(id) { this.removeRecord(sessionStorage, this.storageTableName, id); }
    removeRecord(container, tableName, id) {
        console.log("removeRecord(",container,",",tableName,",",id,")");
        const records = this.getRecords(container, tableName);
        const filteredRecords = records.filter(x => (x.id != id));
        this.setRecords(container, tableName, filteredRecords);
    }

//    findRecordByIdInUpdate(id)  { return this.findRecordById(this.updateTableName, id); }
//    findRecordByIdInStorage(id) { return this.findRecordById(this.storageTableName, id); }
    cuFindRecordById(id) { return this.findRecordById(this.container, this.updateTableName, id); }
    csFindRecordById(id) { return this.findRecordById(this.container, this.storageTableName, id); }
    ouFindRecordById(id) { return this.findRecordById(this.otherContainer, this.updateTableName, id); }
    osFindRecordById(id) { return this.findRecordById(this.otherContainer, this.storageTableName, id); }
    buFindRecordById(id) { return this.findRecordById(localStorage, this.updateTableName, id); }
    bsFindRecordById(id) { return this.findRecordById(localStorage, this.storageTableName, id); }
    suFindRecordById(id) { return this.findRecordById(sessionStorage, this.updateTableName, id); }
    ssFindRecordById(id) { return this.findRecordById(sessionStorage, this.storageTableName, id); }
    findRecordById(container, tableName, id) {
        //varErr(this.getRecords(tableName), isArrayOfObjects, "table records");
        //console.log(this.getRecords(tableName));
        //varErr(this.getRecords(tableName).find(record => (record.id == id)), isObject, "record");
        //console.log(this.getRecords(tableName).find(record => (record.id == id)));
        const records = this.getRecords(container, tableName)
        const record = records.find(record => (record.id == id));
        return record;
    }

//    findRecordsByParentIdInUpdate() { return this.findRecordsByParentId(this.updateTableName); }
//    findRecordsByParentIdInStorage() { return this.findRecordsByParentId(this.storageTableName); }
    cuParentIdRecords() { return this.parentIdRecords(this.container, this.updateTableName); }
    csParentIdRecords() { return this.parentIdRecords(this.container, this.storageTableName); }
    ouParentIdRecords() { return this.parentIdRecords(this.otherContainer, this.updateTableName); }
    osParentIdRecords() { return this.parentIdRecords(this.otherContainer, this.storageTableName); }
    buParentIdRecords() { return this.parentIdRecords(localStorage, this.updateTableName); }
    bsParentIdRecords() { return this.parentIdRecords(localStorage, this.storageTableName); }
    suParentIdRecords() { return this.parentIdRecords(sessionStorage, this.updateTableName); }
    ssParentIdRecords() { return this.parentIdRecords(sessionStorage, this.storageTableName); }
    parentIdRecords(container, tableName) {
        if (this.tableExists(container, tableName)) {
            var records = this.getRecords(container, tableName).filter(entry =>
                (this.parentId == entry[this.parentIdName] &&
                    (!this.findById(entry.id) ||
                     (this.findById(entry.id).lastEdited <= entry.lastEdited))));

            //console.log("Found records:", records);
            return records;
        }
    }
    
//    setRecordInUpdate(newX)     { this.setRecord(this.updateTableName, newX); }
//    setRecordInStorage(newX)    { this.setRecord(this.storageTableName, newX); }
    cuSetRecord(newX) { this.setRecord(this.container, this.updateTableName, newX); }
    csSetRecord(newX) { this.setRecord(this.container, this.storageTableName, newX); }
    ouSetRecord(newX) { this.setRecord(this.otherContainer, this.updateTableName, newX); }
    osSetRecord(newX) { this.setRecord(this.otherContainer, this.storageTableName, newX); }
    buSetRecord(newX) { this.setRecord(localStorage, this.updateTableName, newX); }
    bsSetRecord(newX) { this.setRecord(localStorage, this.storageTableName, newX); }
    suSetRecord(newX) { this.setRecord(sessionStorage, this.updateTableName, newX); }
    ssSetRecord(newX) { this.setRecord(sessionStorage, this.storageTableName, newX); }
    setRecord(container, tableName, newX) {
        console.log("\nsetRecord(",container, tableName, newX, ")");
        console.trace();
        var records = this.getRecords(container, tableName);
        //console.log("Table records:", records);
        var filtered = records.filter(x => (x.id != newX.id));
        //console.log("Filtered records:", filtered);
        var afterPush = filtered;
        afterPush.push(newX);
        //console.log(filtered, ".push(", newX, "):", afterPush);
        if (isArray(afterPush)) {
            //console.log("saving array to", tableName);
            this.setRecords(container, tableName, afterPush);
        }
    }

//    localUserNameExists(userName) { return (this.storageUserNameExists(userName) && this.otherContainerUserNameExists(userName)); }
//    storageUserNameExists(userName) { return this.userNameExists(this.container, userName); }
//    otherContainerUsernameExists(userName) { return this.userNameExists(this.otherContainer, userName); }
    lUserNameExists(userName) { return (this.sUserNameExists(userName) && this.oUserNameExists(userName)); }
    cUserNameExists(userName) { return this.userNameExists(this.container, userName); }
    oUserNameExists(userName) { return this.userNameExists(this.otherContainer, userName); }
    bUserNameExists(userName) { return this.userNameExists(localStorage, userName); }
    sUserNameExists(userName) { return this.userNameExists(sessionStorage, userName); }
    userNameExists(container, userName) {// needs to be fixed to include update_users
        if (Object.keys(container).includes("users") &&
            JSON.parse(container.getItem("users")).find(record => (record.userName == userName))) {
                return true;
        }
        return false;
    }

//    get browserUsers() { return this.userNames(localStorage); }
//    get sessionUsers() { return this.userNames(sessionStorage); }
//    get users()        { return this.userNames(this.container); }
    get cUsers() { return this.users(this.container); }
    get oUsers() { return this.users(this.otherContainer); }
    get bUsers() { return this.users(localStorage); }
    get sUsers() { return this.users(sessionStorage); }
    users(container) { //should find usernames from users and update_users
        var users, userNames = [];
        users = this.getRecords(container, "update_users");
        users = users.concat(this.getRecords(container, "users"));
//        console.trace();
//        console.log(users);
        if (users.length) { users.reduce((a,b) => (a.id == b.id)); }
        return users;
    }

    get lastPushToStorage()     { return this._lastPushToStorage; }
    set lastPushToStorage(time) { this._lastPushToStorage = time; }
    get nextPushToStorage()     { return this._nextPushToStorage; }
    set nextPushToStorage(time) { this._nextPushToStorage = time; }
    removeNextPushToStorage()   { this._nextPushToStorage = false; }

    get lastPushToServer()      { return this._lastPushToServer; }
    set lastPushToServer(time)  { this._lastPushToServer = time; }
    get nextPushToServer()      { return this._nextPushToServer; }
    set nextPushToServer(time)  { this._nextPushToServer = time; }
    removeNextPushToServer()    { this._nextPushToServer = false; }

    get rememberMeExists()      { return (Object.keys(localStorage).includes("rememberMe")); }
    get rememberMe()            { return (this.rememberMeExists) ? localStorage.getItem("rememberMe") : null; }
    set rememberMe(id)          { localStorage.setItem("rememberMe", id) }
    clearRememberMe()           { localStorage.removeItem("rememberMe"); }

    get now() { return Math.floor(Date.now() / 1000); }

    get newId() {
        var id, duplicate;
        const buRecords = this.buRecords;
        const bsRecords = this.bsRecords;
        const suRecords = this.suRecords;
        const ssRecords = this.ssRecords;
        while (true) {
            id = Math.round(Math.random()*1000000000000000);
            duplicate = false;
            [buRecords, bsRecords, suRecords, ssRecords].forEach(records => {
                if (duplicate == false) {
                    if (records.find(record => (record.id == id))) { duplicate = true; }
                }
            });
            if (duplicate == false) { break; }
        }
        return id;
    }

    migrate() {
        console.log("\n", this.type, this.storagePermanence);

        //Push to storage so all data is in storage table.
        this.pushToStorage();

        //all records in container
        const csRecords = this.csRecords;
        //console.log("container records", csRecords);

        const idName = (this.type == "user") ? "id" : this.parentIdName;
        const id = (this.type == "user") ? this.id : this.parentId;
        console.log(idName, id);
        //records in container to migrate
        const csMigrate = csRecords.filter(r => (r[idName] == id));
        console.log("records to migrate:", csMigrate);
        //records in container that aren't migrating
        const csKeep = csRecords.filter(r => (r[idName] != id));
        console.log(this.type, "records to keep:", csKeep);

        //records in other container
        var osRecords = this.osRecords;
        console.log("Records in the other container", osRecords);
        //records in other container, concatenated with records to migrate
        osRecords = osRecords.concat(csMigrate);
        console.log("Records to migrate concatenated with the other container records", osRecords);

        //If csKeep is empty, remove it, otherwise save it.
        if (!csKeep.length) { console.log("Removing container table."); this.csRemoveTable(); }
        else { console.log("Keeping container table."); this.csRecords = csKeep; }
        if (JSON.stringify(this.csRecords) != JSON.stringify(csKeep)) {
            console.log("Container table not equal to records.");
        }

        //Save the combined records to the other container.
        this.osRecords = osRecords;
        if (JSON.stringify(this.osRecords) != JSON.stringify(osRecords)) {
            console.log("Container table not equal to records.");
        }

        if (this.canHaveChildren) {
            if (this.type == "user") { this.children.migrate(); }
            else { this.current.children.migrate(); }
        }

        console.log(this.osRecords);

        if (this.type == "user") {
            this.removeTable(this.container, "currentUser");
            this.setRecords(this.otherContainer, "currentUser", this.currentUser.id);
        }
    }
}