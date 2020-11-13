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
        if (!this.storageTableExists) { 
            //console.log(this.storageTableName, "doesn't exist");
            this.storageRecords = this.updateRecords;
        }
        else {
            var storageRecords = this.storageRecords;
            this.updateRecords.forEach(updateRecord => {
                //console.log(this.storageTableName, "before:", storageRecords)
                storageRecords = storageRecords.filter(storageRecord => (storageRecord.id != updateRecord.id));
                storageRecords.push(updateRecord);
                //console.log(this.storageTableName, "after:", storageRecords)
            });
            this.storageRecords = storageRecords;
        }
        this.removeUpdateTable();
        //console.log(this.updateTableExists);
    }

    pushToServer() {
    }

    migrate() {
        //console.log("migrate");
        [this.updateTableName, this.storageTableName].forEach(table => {
            this.container.setItem(table, JSON.stringify(this.otherContainer.getItem(table)));
        });
        if (this.canHaveChildren) { this.current.children.migrate(); }
    }

    get container()             { return (this.storagePermanence) ? localStorage : sessionStorage; }
    get otherContainer()        { return (this.storagePermanence) ? sessionStorage : localStorage; }

    get updateTableName()       { return "update_" + this.storageTableName; }
    removeUpdateTable()         { this.container.removeItem(this.updateTableName); }
    get updateTableExists()     { return this.tableExists(this.updateTableName); }
    get updateRecords()         { return this.getRecords(this.updateTableName); }
    set updateRecords(value)    { this.setRecords(this.updateTableName, value); }
    removeRecordInUpdate(id)    { this.removeRecord(this.updateTableName, id); }
    setRecordInUpdate(newX)     { this.setRecord(this.updateTableName, newX); }
    findRecordByIdInUpdate(id)  { return this.findRecordById(this.updateTableName, id); }

    get storageTableName()      { return ""; }  //set this in extended class;
    removeStorageTable()        { this.container.removeItem(this.storageTableName); }
    get storageTableExists()    { return this.tableExists(this.storageTableName); }
    get storageRecords()        { return this.getRecords(this.storageTableName); }
    set storageRecords(value)   { this.setRecords(this.storageTableName, value); }
    removeRecordInStorage(id)   { this.removeRecord(this.storageTableName, id); }
    setRecordInStorage(newX)    { this.setRecord(this.storageTableName, newX); }
    findRecordByIdInStorage(id) { return this.findRecordById(this.storageTableName, id); }
    findRecordsByParentIdInStorage(parentId) {
        var records = this.findRecordsByParentId(this.storageTableName, parentId);
        console.log(this.storageTableName, parentId, records);
        return records;
    }

    tableExists(tableName) {
        const exists = (Object.keys(this.container).includes(tableName));
//        console.log("tableExists("+tableName+"):", val);
        return exists;
    }

    getRecords(tableName) {
        const records = (this.tableExists(tableName)) ? JSON.parse(this.container.getItem(tableName)) : [];
//        console.log("getRecords("+tableName+"):", val);
        return records;
    }

    setRecords(tableName, value) {
//        console.log(this.container,".setRecords(",tableName,", ",value,")");
        this.container.setItem(tableName, JSON.stringify(value));
    }

    removeRecord(tableName, id) {
        console.log("removeRecord(",tableName,", ",id,")");
        this.setRecords(tableName, this.getRecords(tableName).filter(x => (x.id != id)));
    }

    findRecordById(tableName, id) {
        //varErr(this.getRecords(tableName), isArrayOfObjects, "table records");
        //console.log(this.getRecords(tableName));
        //varErr(this.getRecords(tableName).find(record => (record.id == id)), isObject, "record");
        //console.log(this.getRecords(tableName).find(record => (record.id == id)));
        return this.getRecords(tableName).find(record => (record.id == id));
    }

    findRecordsByParentId(tableName, parentId) {
        console.trace();
        console.log("findRecordsBy" + this.parentIdName + "(",tableName, ",", parentId, ")");
        if (this.tableExists(tableName)) {
            console.log("Records in " + tableName + ":", this.getRecords(tableName));
            this.getRecords(tableName).forEach(entry => {
                console.log(entry[this.parentIdName], "and", parentId, "are equal:", entry[this.parentIdName] == parentId);
                if (entry[this.parentIdName] == parentId) {
                    console.log(entry);
                    if (!this.findById(entry.id)) {
                        console.log("entry not already loaded");
                    }
                    else if (this.findById(entry.id).lastEdited < entry.lastEdited) {
                        console.log("entry found and lastEdited newer");
                    }
                }
            });
            var records = this.getRecords(tableName).filter(entry =>
                (parentId == entry[this.parentIdName] &&
                    (!this.findById(entry.id) ||
                     (this.findById(entry.id).lastEdited < entry.lastEdited))));

            console.log("Found records:", records);
            return records;
        }
    }
    
    setRecord(tableName, newX) {
        //console.log("setRecord("+tableName+",",newX,")");
        var records = this.getRecords(tableName).filter(x => (x.id != newX.id));
        //console.log(tableName, "records:", this.getRecords(tableName));
        //console.log("Before push:", records);
        records.push(newX);
        //console.log("After push:", records);
        this.setRecords(tableName, records);
    }

    localUserNameExists(userName) { return (this.storageUserNameExists(userName) && this.otherContainerUserNameExists(userName)); }
    storageUserNameExists(userName) { return this.userNameExists(this.container, userName); }
    otherContainerUsernameExists(userName) { return this.userNameExists(this.otherContainer, userName); }
    userNameExists(container, userName) {
        if (Object.keys(container).includes("users") &&
            JSON.parse(container.getItem("users")).find(record => (record.userName == userName))) {
                return true;
        }
        return false;
    }

    get lastPushToStorage()     { return this._lastPushToStorage; }
    set lastPushToStorage(time) { this._lastPushToStorage = time; }
    get nextPushToStorage()     { return this._nextPushToStorage; }
    set nextPushToStorage(time) { this._nextPushToStorage = time; }
    removeNextPushToStorage()   { this._nextPushToStorage = false; }

    get lastPushToServer()      { return this._lastPushToServer;}
    set lastPushToServer(time)  { this._lastPushToServer = time;}
    get nextPushToServer()      { return this._nextPushToServer;}
    set nextPushToServer(time)  { this._nextPushToServer = time;}
    removeNextPushToServer()    { this._nextPushToServer = false; }

    get rememberMeExists()      { return (Object.keys(localStorage).includes("rememberMe")); }
    get rememberMe()            { return (this.rememberMeExists) ? localStorage.getItem("rememberMe") : null; }
    set rememberMe(id)          { localStorage.setItem("rememberMe", id) }
    clearRememberMe()           { localStorage.removeItem("rememberMe"); }

    get now() {
        return Math.floor(Date.now() / 1000);
    }
}