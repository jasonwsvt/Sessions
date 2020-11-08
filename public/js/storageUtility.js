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
            if (Number.isInteger(this.nextPushToServer)) {
                const difference = this.nextPushToServer - this.nextPushToStorage;
                if (difference < 5 && difference > 5) { this.nextPushToStorage = this.nextPushToStorage - 5; }
            }
            this._scheduledPushToStorage = setTimeout(this.pushToStorage, (this.nextPushToStorage - this.now) * 1000);
            console.log("scheduled a storage push at", this.nextPushToStorage);
        }
    }

    stopPushToStorage() {
        console.log("Cancelling push to storage");
        clearInterval(this._scheduledPushToStorage);
        this.removeNextPushToStorage();
    }

    _pushToStorage() {
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
        this.removeUpdateRecords();
    }

    pushToServer() {
    }

    get container()             { return (this.useLocalStorage) ? localStorage : sessionStorage; }

    get updateItem()            { return "update_" + this.storageItem; }
    removeUpdateRecords()       { this.container.removeItem(this.updateItem); }
    get updateExists()          { return this.itemExists(this.updateItem); }
    get update()                { return this.getRecord(this.updateItem); }
    set update(value)           { this.setRecord(this.updateItem, value); }
    updateRemoveRecord(id)      { this.removeRecord(this.updateItem, id); }
    updateNewRecord(newX)       { this.newRecord(this.updateItem, newX); }
    updateChangeRecord(newX)    { this.changeRecord(this.updateItem, newX); }

    get storageItem()           { return ""; }  //set this in extended class;
    removeStorageRecords()      { this.container.removeItem(this.storageItem); }
    get storageExists()         { return this.itemExists(this.storageItem); }
    get storage()               { return this.getRecord(this.storageItem); }
    set storage(value)          { this.setItem(this.storageItem, value); }
    storageRemoveRecord(id)     { this.removeRecord(this.storageItem, id); }
    storageNewRecord(newX)      { this.newRecord(this.storageItem, newX); }
    storageChangeRecord(newX)   { this.changeRecord(this.storageItem, newX); }

    itemExists(item) {
        const val = (Object.keys(this.container).includes(item));
        return val;
    }

    getRecord(item) {
        const val = (this.itemExists(item)) ? JSON.parse(this.container.getItem(item)) : [];
        return val;
    }

    setRecord(item, value) {
        console.trace();
        console.log(value); 
        this.container.setItem(item, JSON.stringify(value));
    }

    removeRecord(item, id) {
        this.setItem(item, this.itemExists(item) ? this.getItem(item).filter(x => (x.id != id)) : []);
    }

    newRecord(item, newX) {
        this.setItem(item, this.itemExists(item) ? this.getItem(item).push(newX) : [].push(newX));
    }

    changeRecord(item, newX) {
        var records = (this.itemExists(item)) ? this.getItem(item).filter(x => (x.id != newX.id)) : [];
        console.log("Records:", records);
        console.log("newX:", newX);
        console.log("records.push(NewX):", records.push(newX));
        this.setItem(item, records.push(newX));
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
}