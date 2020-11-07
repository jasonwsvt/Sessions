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
            var storageRecords = JSON.parse(this.storage);
            JSON.parse(this.update).forEach(s => {
                storageRecords = storageRecords.filter(l => (l.id != s.id));
                storageRecords.push(s);
            });
            this.storage = JSON.stringify(storageRecords);
        }
        this.removeUpdateContainer();
    }

    pushToServer() {
    }

    get updateContainer()       { return (this.useLocalStorage) ? localStorage : sessionStorage; }
    get updateExists()          { return (Object.keys(this.updateContainer).includes("update_" + this._type)); }
    get update()                { return (this.updateExists) ? this.updateContainer.getItem("update_" + this._type) : []; }
    set update(value)           { this.updateContainer.setItem("update_" + this._type, value); }
    removeUpdateContainer()     { this.updateContainer.removeItem("update_" + this._type); }
    updateNewItem(newX)         { this.update = JSON.stringify(JSON.parse(this.update).push(newX)); }
    updateRemoveItem(id)        { this.update = JSON.stringify(JSON.parse(this.update).filter(x => (x.id != id))); }
    updateChangeItem(newX)      { var records = JSON.stringify(JSON.parse(this.update).filter(x => (x.id != newX.id)));
                                  this.update = JSON.stringify(records.push(newX)); }

    get storageContainer()      { return (this.useLocalStorage) ? localStorage : sessionStorage; }
    get storageExists()         { return (Object.keys(this.storageContainer).includes(this._type)); }
    get storage()               { return this.storageContainer.getItem(this._type); }
    set storage(value)          { this.storageContainer.setItem(this._type, value); }
    removeStorageContainer()    { this.storageContainer.removeItem(this._type); }
    storageChangeItem(newX)     { this.storage = JSON.stringify(JSON.parse(this.storage).map(x => ((x.id == newX.id) ? newX : x))); }
    storageNewItem(newX)        { this.storage = JSON.stringify(JSON.parse(this.storage).push(newX)); }

    get lastPushToStorage()     { return this.storageContainer.getItem("lastPushToStorage"); }
    set lastPushToStorage(time) { this.storageContainer.setItem("lastPushToStorage", time); }
    get nextPushToStorage()     { return this.storageContainer.getItem("nextPushToStorage"); }
    set nextPushToStorage(time) { this.storageContainer.setItem("nextPushToStorage", time); }
    removeNextPushToStorage()   { this.storageContainer.removeItem("nextPushToStorage"); }

    get lastPushToServer()      { return this.storageContainer.getItem("lastPushToServer");}
    set lastPushToServer(time)  { this.storageContainer.setItem("lastPushToServer", time);}
    get nextPushToServer()      { return this.storageContainer.getItem("nextPushToServer");}
    set nextPushToServer(time)  { this.storageContainer.setItem("nextPushToServer", time);}
    removeNextPushToServer()    { this.storageContainer.removeItem("nextPushToServer"); }
}