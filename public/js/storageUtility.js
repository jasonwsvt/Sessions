class StorageUtility {
    get storagePermanence()        { return false; }
    get useServerStorage()       { return false; }
    get pushToStorageFrequency() { return false; }
    get pushToServerFrequency()  { return false; }
    get canHaveChindren()        { return false; }

    initialPush() {
        console.log("initialPush");
        if (this.pushToStorageFrequency || this.pushToServerFrequency) {
            if (this.pushToStorageFrequency) { this.pushToStorage(); }
            if (this.pushToServerFrequency)  { this.pushToServer(); }
            if (this.canHaveChildren) { this.current.children.initialPush(); }
        }
    }

    schedulePushes() {
        console.log("schedulePushes")
        if (this.pushToStorageFrequency) { this.schedulePushToStorage(); }
        if (this.pushToServerFrequency)  { this.schedulePushToServer(); }
    }

    schedulePushToStorage(seconds = this.pushToStorageFrequency) {
        console.log("schedulePushToStorage("+seconds+")");
        if (seconds && !this.nextPushToStorage) {
            this.nextPushToStorage = this.now + seconds;
            if (this.nextPushToServer) {
                const difference = this.nextPushToServer - this.nextPushToStorage;
                if (difference < 5 && difference > 5) { this.nextPushToStorage = this.nextPushToStorage - 5; }
            }
            this._scheduledPushToStorage = setTimeout(() => this.pushToStorage, (this.nextPushToStorage - this.now) * 1000);
//            console.log("scheduled a storage push at", this.nextPushToStorage);
        }
    }

    stopPushToStorage() {
        console.log("stopPushToStorage");
        clearInterval(this._scheduledPushToStorage);
        this.removeNextPushToStorage();
    }

    pushToStorage() {
        console.log("pushToStorage");
        this.removeNextPushToStorage();
        this.lastPushToStorage = this.now;
        if (!this.storageTableExists) { this.storageTable = this.updateTable; }
        else {
            var storageRecords = this.storageTable;
            this.updateTable.forEach(s => {
                storageRecords = storageRecords.filter(l => (l.id != s.id));
                storageRecords.push(s);
            });
            this.storageTable = JSON.stringify(storageRecords);
        }
        this.removeUpdateTable();
    }

    pushToServer() {
    }

    migrate() {
        console.log("migrate");
        var from = (this.storagePermanence) ? sessionStorage : localStorage;
        var to = (this.storagePermanence) ? localStorage : sessionStorage;
        [this.updateTableName, this.storageTableName].forEach(table => {
            to.setItem(table, from.getItem(table));
        });
        if (this.canHaveChildren) { this.current.children.migrateToLocalStorage(); }
    }

    get container()     { return (this.storagePermanence) ? localStorage : sessionStorage; }

    get updateTableName()     { return "update_" + this.storageTableName; }
    removeUpdateTable()       { this.container.removeItem(this.updateTableName); }
    get updateTableExists()   { return this.tableExists(this.updateTableName); }
    get updateTable()         { return this.getTable(this.updateTableName); }
    set updateTable(value)    { this.setTable(this.updateTableName, value); }
    removeRecordInUpdate(id)  { this.removeRecord(this.updateTableName, id); }
    addRecordToUpdate(newX)   { this.newRecord(this.updateTableName, newX); }
    setRecordInUpdate(newX)   { this.setRecord(this.updateTableName, newX); }

    get storageTableName()    { return ""; }  //set this in extended class;
    removeStorageTable()      { this.container.removeItem(this.storageTableName); }
    get storageTableExists()  { return this.tableExists(this.storageTableName); }
    get storageTable()        { return this.getTable(this.storageTableName); }
    set storageTable(value)   { this.setTable(this.storageTableName, value); }
    removeRecordInStorage(id) { this.removeRecord(this.storageTableName, id); }
    addRecordToStorage(newX)  { this.newRecord(this.storageTableName, newX); }
    setRecordInStorage(newX)  { this.setRecord(this.storageTableName, newX); }

    tableExists(tableName) {
        const val = (Object.keys(this.container).includes(tableName));
        console.log("tableExists("+tableName+"):", val);
        return val;
    }

    getTable(tableName) {
        const val = (this.tableExists(tableName)) ? JSON.parse(this.container.getItem(tableName)) : [];
        console.log("getTable("+tableName+"):", val);
        return val;
    }

    setTable(tableName, value) {
        console.log(this.container+".setTable("+tableName+", "+value+")");
        this.container.setItem(tableName, JSON.stringify(value));
    }

    removeRecord(tableName, id) {
        console.log("removeRecord("+tableName+", "+id+")");
        this.setTable(tableName, this.getTable(tableName).filter(x => (x.id != id)));
    }

    newRecord(tableName, newX) {
        console.log("newRecord("+tableName+",",newX,")");
        this.setTable(tableName, this.getTable(tableName).push(newX));
    }

    setRecord(tableName, newX) {
        console.log("setRecord("+tableName+",",newX,")");
        var records = this.getTable(tableName).filter(x => (x.id != newX.id));
        records.push(newX);
        this.setTable(tableName, records);
    }

    get lastPushToStorage()     { return this.container.getItem("lastPushToStorage"); }
    set lastPushToStorage(time) { this.container.setItem("lastPushToStorage", time); }
    get nextPushToStorage()     { return this.container.getItem("nextPushToStorage"); }
    set nextPushToStorage(time) { this.container.setItem("nextPushToStorage", time); }
    removeNextPushToStorage()   { this.container.removeItem("nextPushToStorage"); }

    get lastPushToServer()      { return this.container.getItem("lastPushToServer");}
    set lastPushToServer(time)  { this.container.setItem("lastPushToServer", time);}
    get nextPushToServer()      { return this.container.getItem("nextPushToServer");}
    set nextPushToServer(time)  { this.container.setItem("nextPushToServer", time);}
    removeNextPushToServer()    { this.container.removeItem("nextPushToServer"); }

    get now() {
        return Math.floor(Date.now() / 1000);
    }
}