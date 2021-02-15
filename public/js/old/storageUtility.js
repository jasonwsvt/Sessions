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

    get container()              { return (this.storagePermanence) ? localStorage : sessionStorage; }
    get otherContainer()         { return (this.storagePermanence) ? sessionStorage : localStorage; }

    get uTableName()             { return "update_" + this.sTableName; }
    get sTableName()             { return ""; }  //set this in extended class;

    get now() { return Math.floor(Date.now() / 1000); }

    get cuTableExists() { return this.tableExists(this.container, this.uTableName); }
    get csTableExists() { return this.tableExists(this.container, this.sTableName); }
    get ouTableExists() { return this.tableExists(this.otherContainer, this.uTableName); }
    get osTableExists() { return this.tableExists(this.otherContainer, this.sTableName); }
    get buTableExists() { return this.tableExists(localStorage, this.uTableName); }
    get bsTableExists() { return this.tableExists(localStorage, this.sTableName); }
    get suTableExists() { return this.tableExists(sessionStorage, this.uTableName); }
    get ssTableExists() { return this.tableExists(sessionStorage, this.sTableName); }
    tableExists(container, tableName) {
        const exists = (Object.keys(container).includes(tableName));
        return exists;
    }

    cuRemoveTable() { this.removeTable(this.container, this.uTableName); }
    csRemoveTable() { this.removeTable(this.container, this.sTableName); }
    ouRemoveTable() { this.removeTable(this.otherContainer, this.uTableName); }
    osRemoveTable() { this.removeTable(this.otherContainer, this.sTableName); }
    buRemoveTable() { this.removeTable(localStorage, this.uTableName); }
    bsRemoveTable() { this.removeTable(localStorage, this.sTableName); }
    suRemoveTable() { this.removeTable(sessionStorage, this.uTableName); }
    ssRemoveTable() { this.removeTable(this.container, this.sTableName); }
    removeTable(container, table) { container.removeItem(table); }

    get cuRecords() { return this.getRecords(this.container, this.uTableName); }
    get csRecords() { return this.getRecords(this.container, this.sTableName); }
    get ouRecords() { return this.getRecords(this.otherContainer, this.uTableName); }
    get osRecords() { return this.getRecords(this.otherContainer, this.sTableName); }
    get buRecords() { return this.getRecords(localStorage, this.uTableName); }
    get bsRecords() { return this.getRecords(localStorage, this.sTableName); }
    get suRecords() { return this.getRecords(sessionStorage, this.uTableName); }
    get ssRecords() { return this.getRecords(sessionStorage, this.sTableName); }
    getRecords(container, tableName) {
        const records = (this.tableExists(container, tableName)) ? JSON.parse(container.getItem(tableName)) : [];
        //console.log("getRecords("+tableName+"):", val);
        return records;
    }

    set cuRecords(value) { this.setRecords(this.container, this.uTableName, value); }
    set csRecords(value) { this.setRecords(this.container, this.sTableName, value); }
    set ouRecords(value) { this.setRecords(this.otherContainer, this.uTableName, value); }
    set osRecords(value) { this.setRecords(this.otherContainer, this.sTableName, value); }
    set buRecords(value) { this.setRecords(localStorage, this.uTableName, value); }
    set bsRecords(value) { this.setRecords(localStorage, this.sTableName, value); }
    set suRecords(value) { this.setRecords(sessionStorage, this.uTableName, value); }
    set ssRecords(value) { this.setRecords(sessionStorage, this.sTableName, value); }
    setRecords(container, tableName, value) {
//        console.log(this.container,".setRecords(",tableName,", ",value,")");
        if (isString(value)) { console.trace(); }
        container.setItem(tableName, JSON.stringify(value));
    }


    get cuThisRecord() { return this.findRecord(this.container, this.uTableName, this.id); }
    get csThisRecord() { return this.findRecord(this.container, this.sTableName, this.id); }
    cuFindRecord(id)   { return this.findRecord(this.container, this.uTableName, id); }
    csFindRecord(id)   { return this.findRecord(this.container, this.sTableName, id); }
    ouFindRecord(id)   { return this.findRecord(this.otherContainer, this.uTableName, id); }
    osFindRecord(id)   { return this.findRecord(this.otherContainer, this.sTableName, id); }
    buFindRecord(id)   { return this.findRecord(localStorage, this.uTableName, id); }
    bsFindRecord(id)   { return this.findRecord(localStorage, this.sTableName, id); }
    suFindRecord(id)   { return this.findRecord(sessionStorage, this.uTableName, id); }
    ssFindRecord(id)   { return this.findRecord(sessionStorage, this.sTableName, id); }
    findRecord(container, tableName, id) {
        //varErr(this.getRecords(tableName), isArrayOfObjects, "table records");
        //console.log(this.getRecords(tableName));
        //varErr(this.getRecords(tableName).find(record => (record.id == id)), isObject, "record");
        //console.log(this.getRecords(tableName).find(record => (record.id == id)));
        const records = this.getRecords(container, tableName)
        const record = records.find(record => (record.id == id));
        return record;
    }

    cuSetRecord(record) { this.setRecord(this.container, this.uTableName, record); }
    csSetRecord(record) { this.setRecord(this.container, this.sTableName, record); }
    ouSetRecord(record) { this.setRecord(this.otherContainer, this.uTableName, record); }
    osSetRecord(record) { this.setRecord(this.otherContainer, this.sTableName, record); }
    buSetRecord(record) { this.setRecord(localStorage, this.uTableName, record); }
    bsSetRecord(record) { this.setRecord(localStorage, this.sTableName, record); }
    suSetRecord(record) { this.setRecord(sessionStorage, this.uTableName, record); }
    ssSetRecord(record) { this.setRecord(sessionStorage, this.sTableName, record); }
    setRecord(container, tableName, record) {
//        console.log("\nsetRecord(",container, tableName, record, ")", this.storagePermanence);
//        console.trace();
        var records = this.getRecords(container, tableName);
        //console.log("Table records:", records);
        var filtered = records.filter(x => (x.id != record.id));
        //console.log("Filtered records:", filtered);
        var afterPush = filtered;
        afterPush.push(record);
        //console.log(filtered, ".push(", record, "):", afterPush);
        if (isArray(afterPush)) {
            //console.log("saving array to", tableName);
            this.setRecords(container, tableName, afterPush);
        }
    }

    cuRemoveThisRecord() { this.removeRecord(this.container, this.uTableName, this.id); }
    csRemoveThisRecord() { this.removeRecord(this.container, this.sTableName, this.id); }
    cuRemoveRecord(id)   { this.removeRecord(this.container, this.uTableName, id); }
    csRemoveRecord(id)   { this.removeRecord(this.container, this.sTableName, id); }
    ouRemoveRecord(id)   { this.removeRecord(this.otherContainer, this.uTableName, id); }
    osRemoveRecord(id)   { this.removeRecord(this.otherContainer, this.sTableName, id); }
    buRemoveRecord(id)   { this.removeRecord(localStorage, this.uTableName, id); }
    bsRemoveRecord(id)   { this.removeRecord(localStorage, this.sTableName, id); }
    suRemoveRecord(id)   { this.removeRecord(sessionStorage, this.uTableName, id); }
    ssRemoveRecord(id)   { this.removeRecord(sessionStorage, this.sTableName, id); }
    removeRecord(container, tableName, id) {
        console.log("removeRecord(",container,",",tableName,",",id,")");
        const records = this.getRecords(container, tableName);
        const filteredRecords = records.filter(x => (x.id != id));
        this.setRecords(container, tableName, filteredRecords);
    }

    get cuParentIdRecords() { return this.getParentIdRecords(this.container, this.uTableName, this.parentIdName, this.parentId); }
    get csParentIdRecords() { return this.getParentIdRecords(this.container, this.sTableName, this.parentIdName, this.parentId); }
    get ouParentIdRecords() { return this.getParentIdRecords(this.otherContainer, this.uTableName, this.parentIdName, this.parentId); }
    get osParentIdRecords() { return this.getParentIdRecords(this.otherContainer, this.sTableName, this.parentIdName, this.parentId); }
    get buParentIdRecords() { return this.getParentIdRecords(localStorage, this.uTableName, this.parentIdName, this.parentId); }
    get bsParentIdRecords() { return this.getParentIdRecords(localStorage, this.sTableName, this.parentIdName, this.parentId); }
    get suParentIdRecords() { return this.getParentIdRecords(sessionStorage, this.uTableName, this.parentIdName, this.parentId); }
    get ssParentIdRecords() { return this.getParentIdRecords(sessionStorage, this.sTableName, this.parentIdName, this.parentId); }
    getParentIdRecords(container, tableName, name, id) {
        if (this.tableExists(container, tableName)) {
            var records = this.getRecords(container, tableName).filter(entry => (id == entry[name]));
            return records;
        }
    }
    
    set cuParentIdRecords(records) { return this.setParentIdRecords(this.container, this.uTableName, this.parentIdName, this.parentId, records); }
    set csParentIdRecords(records) { return this.setParentIdRecords(this.container, this.sTableName, this.parentIdName, this.parentId, records); }
    set ouParentIdRecords(records) { return this.setParentIdRecords(this.otherContainer, this.uTableName, this.parentIdName, this.parentId, records); }
    set osParentIdRecords(records) { return this.setParentIdRecords(this.otherContainer, this.sTableName, this.parentIdName, this.parentId, records); }
    set buParentIdRecords(records) { return this.setParentIdRecords(localStorage, this.uTableName, this.parentIdName, this.parentId, records); }
    set bsParentIdRecords(records) { return this.setParentIdRecords(localStorage, this.sTableName, this.parentIdName, this.parentId, records); }
    set suParentIdRecords(records) { return this.setParentIdRecords(sessionStorage, this.uTableName, this.parentIdName, this.parentId, records); }
    set ssParentIdRecords(records) { return this.setParentIdRecords(sessionStorage, this.sTableName, this.parentIdName, this.parentId, records); }
    setParentIdRecords(container, tableName, name, id, records) {
        if (this.tableExists(container, tableName)) {
            const otherRecords = this.getRecords(container, tableName).filter(entry => (id != entry[name]));
            const allRecords = records.concat(otherRecords);
            this.setRecords(container, tableName, allRecords);
        }
    }
    
    cuRemoveParentIdRecords() { return this.removeParentIdRecords(this.container, this.uTableName, this.parentIdName, this.parentId); }
    csRemoveParentIdRecords() { return this.removeParentIdRecords(this.container, this.sTableName, this.parentIdName, this.parentId); }
    ouRemoveParentIdRecords() { return this.removeParentIdRecords(this.otherContainer, this.uTableName, this.parentIdName, this.parentId); }
    osRemoveParentIdRecords() { return this.removeParentIdRecords(this.otherContainer, this.sTableName, this.parentIdName, this.parentId); }
    buRemoveParentIdRecords() { return this.removeParentIdRecords(localStorage, this.uTableName, this.parentIdName, this.parentId); }
    bsRemoveParentIdRecords() { return this.removeParentIdRecords(localStorage, this.sTableName, this.parentIdName, this.parentId); }
    suRemoveParentIdRecords() { return this.removeParentIdRecords(sessionStorage, this.uTableName, this.parentIdName, this.parentId); }
    ssRemoveParentIdRecords() { return this.removeParentIdRecords(sessionStorage, this.sTableName, this.parentIdName, this.parentId); }
    removeParentIdRecords(container, tableName, name, id) {
        if (this.tableExists(container, tableName)) {
            const otherRecords = this.getRecords(container, tableName).filter(entry => (id != entry[name]));
            this.setRecords(container, tableName, otherRecords);
        }
    }
    
    lUserNameExists(username) { return (this.bUserNameExists(username) && this.sUserNameExists(username)); }
    cUserNameExists(username) { return this.usernameExists(this.container, username); }
    oUserNameExists(username) { return this.usernameExists(this.otherContainer, username); }
    bUserNameExists(username) { return this.usernameExists(localStorage, username); }
    sUserNameExists(username) { return this.usernameExists(sessionStorage, username); }
    usernameExists(container, username) {// needs to be fixed to include update_users
        if (Object.keys(container).includes("users") &&
            JSON.parse(container.getItem("users")).find(record => (record.username == username))) {
                return true;
        }
        return false;
    }

    get cUsers() { return this.users(this.container); }
    get oUsers() { return this.users(this.otherContainer); }
    get bUsers() { return this.users(localStorage); }
    get sUsers() { return this.users(sessionStorage); }
    users(container) { //should find usernames from users and update_users
        var users;
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

    schedulePushes() {
        if (varType(this.pushToStorageFrequency) != "integer") {
            //console.trace();
            //console.log("schedulePushes", this.type, this.pushToStorageFrequency, this.pushToServerFrequency);
        }
        this.schedulePushToStorage();
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
            //console.log(this.sTableName, "doesn't exist");
            this.csRecords = this.cuRecords;
        }
        else {
            var csRecords = this.csRecords;
            this.cuRecords.forEach(cuRecord => {
                //console.log(this.sTableName, "before:", storageRecords)
                csRecords = csRecords.filter(csRecord => (csRecord.id != cuRecord.id));
                csRecords.push(cuRecord);
                //console.log(this.sTableName, "after:", storageRecords)
            });
            this.csRecords = csRecords;
        }
        this.cuRemoveTable();
        //console.log(this.updateTableExists);
    }

    pushToServer() {
    }

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

        if (this.type == "user") {
            this.osSetRecord(this.csThisRecord);
            this.csRemoveThisRecord();
            this.children.migrate();
            this.removeTable(this.container, "currentUser");
            this.setRecords(this.otherContainer, "currentUser", this.currentUser.id);
        }
        else {
            this.osParentIdRecords = this.csParentIdRecords;
            this.osRemoveParentIdRecords();
            if (this.canHaveChildren) { this.unsorted.forEach(child => { child.children.migrate(); }); }
        }
    }

    //Initially called from user.
    pullRecords() {
        this.pushToStorage();

        var data = this.csThisRecord;

        if (this.canHaveChildren) {
            const type = this.children.type;
            data[type] = [];
            this.children.unsorted.forEach(child => {
                data[type].push(child.pullRecords());
            });
        }
        return data;
    }
}