class StorageUtility {
    get useLocalStorage()        { return false; }
    get useServerStorage()       { return false; }
    get pushToStorageFrequency() { return false; }
    get pushToServerFrequency()  { return false; }
    get canHaveChindren()        { return false; }

    initialPush() {
        if (this.pushToStorageFrequency || this.pushToServerFrequency) {
            if (this.pushToStorageFrequency) { this.pushToStorage(); }
            if (this.pushToServerFrequency)  { this.pushToServer(); }
            if (this.canHaveChildren) { this.current.children.initialPush(); }
        }
    }

    schedulePushes() {
        if (this.pushToStorageFrequency) { this.schedulePushToStorage(); }
        if (this.pushToServerFrequency)  { this.schedulePushToServer(); }
    }

    schedulePushToStorage(seconds = this.pushToStorageFrequency) {
        if (seconds && !this.nextPushToStorage) {
            this.nextPushToStorage = this.now + seconds;
            if (this.nextPushToServer) {
                const difference = this.nextPushToServer - this.nextPushToStorage;
                if (difference < 5 && difference > 5) { this.nextPushToStorage = this.nextPushToStorage - 5; }
            }
            this._scheduledPushToStorage = setTimeout(() => this.pushToStorage, (this.nextPushToStorage - this.now) * 1000);
            console.log(this._scheduledPushToStorage, this.pushToStorage, this.nextPushToStorage, this.now);
            console.log("scheduled a storage push at", this.nextPushToStorage);
        }
    }

    stopPushToStorage() {
        console.log("Cancelling push to storage");
        clearInterval(this._scheduledPushToStorage);
        this.removeNextPushToStorage();
    }

    pushToStorage() {
        console.log("backing up to storage");
        this.removeNextPushToStorage();
        this.lastPushToStorage = this.now;
        if (!this.storageExists) { this.storage = this.update; }
        else {
            var storageRecords = this.storage;
            this.update.forEach(s => {
                storageRecords = storageRecords.filter(l => (l.id != s.id));
                storageRecords.push(s);
            });
            this.storage = JSON.stringify(storageRecords);
        }
        this.removeUpdateTable();
    }

    pushToServer() {
    }

    migrate() {
        var from = (this.useLocalStorage) ? sessionStorage : localStorage;
        var to = (this.useLocalStorage) ? localStorage : sessionStorage;
        [this.updateTableName, this.storageTableName].forEach(table => {
            to.setItem(table, from.getItem(table));
        });
        if (this.canHaveChildren) { this.current.children.migrateToLocalStorage(); }
    }

    get container()     { return (this.useLocalStorage) ? localStorage : sessionStorage; }

    get updateTableName()     { return "update_" + this.storageTableName; }
    removeUpdateTable()       { this.container.removeItem(this.updateTableName); }
    get updateExists()        { return this.tableExists(this.updateTableName); }
    get update()              { return this.getRecord(this.updateTableName); }
    set update(value)         { this.setRecord(this.updateTableName, value); }
    updateRemoveRecord(id)    { this.removeRecord(this.updateTableName, id); }
    updateNewRecord(newX)     { this.newRecord(this.updateTableName, newX); }
    updateChangeRecord(newX)  { this.changeRecord(this.updateTableName, newX); }

    get storageTableName()    { return ""; }  //set this in extended class;
    removeStorageTable()      { this.container.removeItem(this.storageTableName); }
    get storageExists()       { return this.tableExists(this.storageTableName); }
    get storage()             { return this.getRecord(this.storageTableName); }
    set storage(value)        { this.setRecord(this.storageTableName, value); }
    storageRemoveRecord(id)   { this.removeRecord(this.storageTableName, id); }
    storageNewRecord(newX)    { this.newRecord(this.storageTableName, newX); }
    storageChangeRecord(newX) { this.changeRecord(this.storageTableName, newX); }

    tableExists(tableName) {
        const val = (Object.keys(this.container).includes(tableName));
        return val;
    }

    getRecord(tableName) {
        const val = (this.tableExists(tableName)) ? JSON.parse(this.container.getItem(tableName)) : [];
        return val;
    }

    setRecord(tableName, value) {
        console.trace();
        console.log(value); 
        this.container.setItem(tableName, JSON.stringify(value));
    }

    removeRecord(tableName, id) {
        this.setRecord(tableName, this.getRecord(tableName).filter(x => (x.id != id)));
    }

    newRecord(tableName, newX) {
        this.setRecord(tableName, this.getRecord(tableName).push(newX));
    }

    changeRecord(tableName, newX) {
        var records = this.getRecord(tableName).filter(x => (x.id != newX.id));
        console.log("newX:", newX);
        console.log("Records before push newX:", records);
        records.push(newX);
        console.log("Records afterward:", records);
        this.setRecord(tableName, records);
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