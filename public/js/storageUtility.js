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
    //findRecordsByParentIdInUpdate(parentId) {
    findRecordsByParentIdInUpdate() {
        //        var records = this.findRecordsByParentId(this.updateTableName, parentId);
        var records = this.findRecordsByParentId(this.updateTableName);
        //console.log(this.updateTableName, parentId, records);
        return records;
    }


    get storageTableName()      { return ""; }  //set this in extended class;
    removeStorageTable()        { this.container.removeItem(this.storageTableName); }
    get storageTableExists()    { return this.tableExists(this.storageTableName); }
    get storageRecords()        { return this.getRecords(this.storageTableName); }
    set storageRecords(value)   { this.setRecords(this.storageTableName, value); }
    removeRecordInStorage(id)   { this.removeRecord(this.storageTableName, id); }
    setRecordInStorage(newX)    { this.setRecord(this.storageTableName, newX); }
    findRecordByIdInStorage(id) { return this.findRecordById(this.storageTableName, id); }
//    findRecordsByParentIdInStorage(parentId) {
    findRecordsByParentIdInStorage() {
            //        var records = this.findRecordsByParentId(this.storageTableName, parentId);
        var records = this.findRecordsByParentId(this.storageTableName);
        //console.log(this.storageTableName, parentId, records);
        return records;
    }

    tableExists(tableName) {
        const exists = (Object.keys(this.container).includes(tableName));
//        console.log("tableExists("+tableName+"):", val);
        return exists;
    }

    getRecords(tableName) {
        const records = (this.tableExists(tableName)) ? JSON.parse(this.container.getItem(tableName)) : [];
        //console.log("getRecords("+tableName+"):", val);
        return records;
    }

    setRecords(tableName, value) {
//        console.log(this.container,".setRecords(",tableName,", ",value,")");
        if (isString(value)) { console.trace(); }
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

    //findRecordsByParentId(tableName, parentId) {
    findRecordsByParentId(tableName) {
            //console.log("findRecordsBy" + this.parentIdName + "(",tableName, ",", parentId, ")");
        if (this.tableExists(tableName)) {
            //console.log("Records in " + tableName + ":", this.getRecords(tableName));
/*            this.getRecords(tableName).forEach(entry => {
                //console.log(entry[this.parentIdName], "and", parentId, "are equal:", entry[this.parentIdName] == parentId);
                if (entry[this.parentIdName] == this.parentId) {
                    //console.log(entry);
                    if (!this.findById(entry.id)) {
                        //console.log("entry not already loaded");
                    }
                    else if (this.findById(entry.id).lastEdited < entry.lastEdited) {
                        //console.log("entry found and lastEdited newer");
                    }
                }
            }); */
            var records = this.getRecords(tableName).filter(entry =>
                (this.parentId == entry[this.parentIdName] &&
                    (!this.findById(entry.id) ||
                     (this.findById(entry.id).lastEdited <= entry.lastEdited))));

            //console.log("Found records:", records);
            return records;
        }
    }
    
    setRecord(tableName, newX) {
        //console.log("\nsetRecord");
        //console.log("Table name:", tableName);
        //console.log("newX:", newX);
        var records = this.getRecords(tableName);
        //console.log("Table records:", records);
        var filtered = records.filter(x => (x.id != newX.id));
        //console.log("Filtered records:", filtered);
        var afterPush = filtered;
        afterPush.push(newX);
        //console.log(filtered, ".push(", newX, "):", afterPush);
        if (isArray(afterPush)) {
            //console.log("saving array to", tableName);
            this.setRecords(tableName, afterPush);
        }
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
    get browserUsers() { return this.userNames(localStorage); }
    get sessionUsers() { return this.userNames(sessionStorage); }
    get users()        { return this.userNames(this.container); }
    get oUsers()       { return this.userNames(this.otherContainer); }
    userNames(container) {
        if (Object.keys(container).includes("users")) {
            return JSON.parse(container.getItem("users")).map(user => {
                return { "id": user.id, "userName": user.userName, "hidden": user.hidden }
            });
        }
        return [];
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
        var id, records, duplicate;
        while (true) {
            id = Math.round(Math.random()*1000000000000000);
            duplicate = false;
            [localStorage, sessionStorage].forEach(container => {
                [this.updateTableName, this.storageTableName].forEach(table => {
                    if (duplicate == false) {
                        records = (Object.keys(container).includes(table))
                            ? JSON.parse(container.getItem(table)) : [];
                        if (records.find(record => (record.id == id))) { duplicate = true; }
                    }
                });
            });
            if (duplicate == false) { break; }
        }
        return id;
    }

    migrate() {
        //do a push to storage
        //For each item in this.siblings.unsorted,
        //    if the id is duplicated in the other container, change it.
        //Then migrate without any need to check for duplicates.
        var cRecords, records, duplicate;

        [this.updateTableName, this.storageTableName].forEach(tableName => {
            //get all the records in the table for the other container
            const oRecords = (Object.keys(this.otherContainer).includes(tableName))
                ? JSON.parse(this.otherContainer.getItem(tableName)) : [];
            if (this.tableExists(tableName)) {
                console.log(tableName, "exists");
                if (oRecords && oRecords.length) {
                    while (true) {
                        if (this.type == "user") {
                            //If it's the user, get the record for the user
                            cRecords = [];
                            cRecords.push(this.findRecordById(tableName, this.id));
                        }
                        else {
                            //if it's not the user, get the records for the parentId
                            cRecords = this.findRecordsByParentId(tableName);
                        }
                        console.log(tableName, this.id, cRecords);
                        if (isArrayOfObjects(cRecords)) {
                            duplicate = cRecords.find(cRecord => (oRecords.find(oRecord => (cRecord.id == oRecord.id))));
                            if (!duplicate) { break; }
                            else {
                                this.findById(duplicate.id).changeId();
                            }
                        }
                        else { break; }
                    }
                    //If there are records in oRecords, merge cRecords into oRecords
                    this.otherContainer.setItem(tableName, JSON.stringify(oRecords.concat(cRecords)));
                }
                else {
                    //If there are no records in oRecords, set oRecords equal to cRecords
                    if (this.type == "user") {
                        //If it's the user, get the record for the user
                        console.log("moving records for", this.id, "to the other container");
                        cRecords = [];
                        cRecords.push(this.findRecordById(tableName, this.id));
                    }
                    else {
                        //if it's not the user, get the records for the parentId
                        console.log("moving records for", this.parentIdName, this.parentId, "to the other container");
                        console.log("All records in", tableName, ":", this.getRecords(tableName));
                        console.log("Records for", this.parentIdName, this.parentId, ":", this.findRecordsByParentId(tableName));
                        cRecords = this.findRecordsByParentId(tableName);
                    }
                    console.log("moving", cRecords, "to other container");
                    this.otherContainer.setItem(tableName, JSON.stringify(cRecords));
                }
                //delete the records from cRecords
                if (this.type == "user") {
                    records = this.getRecords(tableName).filter(record => (record.id != this.id));
                }
                else {
                    records = this.getRecords(tableName).filter(record => (record[this.parentIdName] != this.parentId));
                }
                if (isArrayOfObjects(records)) {
                    this.setRecords(tableName, records);
                }
                else {
                    this.container.removeItem(tableName);
                }
            }
            else { console.log (tableName, "does not exist.  Nothing to migrate."); }
        });
        if (this.canHaveChildren) {
            if (this.type == "user") { this.children.migrate(); }
            else { this.current.children.migrate(); }
        }
        this.container.removeItem("currentUser");
        this.otherContainer.setItem("currentUser", this.currentUser.id);
    }

    //changeId goes through update and storage in container and changes the id.
    //         It then calls changeParentId for the children if they exist.
    changeId() {
        var newId = this.newId;
        [this.updateTableName, this.storageTableName].forEach(table => {
            if (this.tableExists(table)) {
                records = this.getRecords(table);
                record = records.find(r => (r.id == this.id));
                if (record) {
                    records = records.filter(r => (r.id != this.id));
                    record.id = newId;
                    records.push(record);
                    this.setRecords(table, records);
                }
            }
        });
        if (this.canHaveChildren) {
            this.children.changeParentIdOfAllChildren(newId);
        }
        this._data.id = newId;
        this._update();
    }

    //changeParentIdOfAllChildren is run in children only
    //                            It goes through update and storage in container
    //                            and changes the parentId
    //                            must not be run outside of changeId
    changeParentIdOfAllChildren(newParentId) {
        [this.updateTableName, this.storageTableName].forEach(table => {
            if (this.tableExists(table)) {
                records = this.getRecords(table);
                parentIdRecords = records.filter(record => (record.parentId == this.parent.id));
                if (parentIdRecords) {
                    records = records.filter(record => ( record.parentId != this.parent.id));
                    parentIdRecords.forEach(record => {
                        record[this.parentIdName] = newParentId;
                        records.push(record);
                        this.findById(record.id).changeParentId(newParentId);
                    });
                    this.setRecords(table, records);
                }
            }
        });
    }

    changeParentId(newParentId) {
        this._data[this.parentIdName] = newParentId;
        this._update();
    }
}