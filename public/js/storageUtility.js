class StorageUtility {
    get useLocalStorage()        { return false; }
    get useServerStorage()       { return false; }
    get pushToStorageFrequency() { return false; }
    get pushToServerFrequency()  { return false; }
    get canHaveChindren()        { return false; }

    initialPush() {
        if (this.pushToStorageFrequency) { this.pushToStorage(); }
        if (this.pushToServerFrequency)  { this.pushToServer(); }
        if (this.canHaveChildren) { this.current.children.initialPush(); }
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
        this.removeUpdateItem();
    }

    pushToServer() {
    }

    get updateItem()            { return "update_" + this.storageItem; }
    get storageItem()           { return ""; }
    get container()             { return (this.useLocalStorage) ? localStorage : sessionStorage; }
    removeUpdateItem()          { this.container.removeItem(this.updateItem); }
    get updateExists()          { return this.itemExists(this.updateItem); }
    get update()                { return this.getItem(this.updateItem); }
    set update(value)           { this.setItem(this.updateItem, value); }
    updateRemoveItem(id)        { this.removeItem(this.updateItem, id); }
    updateNewItem(newX)         { this.newItem(this.updateItem, newX); }
    updateChangeItem(newX)      { this.changeItem(this.updateItem, newX); }

    removeStorageItem()         { this.container.removeItem(this.storageItem); }
    get storageExists()         { return this.itemExists(this.storageItem); }
    get storage()               { return this.getItem(this.storageItem); }
    set storage(value)          { this.setItem(this.storageItem, value); }
    storageRemoveItem(id)       { this.removeItem(this.storageItem, id); }
    storageNewItem(newX)        { this.newItem(this.storageItem, newX); }
    storageChangeItem(newX)     { this.changeItem(this.storageItem, newX); }

    itemExists(item) {
        return (Object.keys(this.container).includes(item));
    }

    getItem(item) {
        return (this.itemExists(item)) ? JSON.parse(this.container.getItem(item)) : [];
    }

    setItem(item, value) {
        console.trace();
        console.log(value); 
        this.container.setItem(item, JSON.stringify(value));
    }

    removeItem(item, id) {
        this.setItem(item, this.itemExists(item) ? this.getItem(item).filter(x => (x.id != id)) : []);
    }

    newItem(item, newX) {
        this.setItem(item, this.itemExists(item) ? this.getItem(item).push(newX) : [].push(newX));
    }

    changeItem(item, newX) {
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