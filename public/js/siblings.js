class Siblings {
    _app = null;
    _SiblingClass = null;
    _type = null;
    _parent = false;
    _siblings = [];
    _current = null;
    _type = null;
    _defaultName = null;
    _defaultFirstName = null;
    _sortByLastX = false;

    constructor(app, SiblingClass, parent) {
        this._app = app;
        this._SiblingClass = SiblingClass;
        if (parent != undefined) { this._parent = parent; }
    }

    get app()                 { return this._app; }
    get parent()              { return (this._parent) ? this._parent : null; }
    get canHaveChildren()     { return this._canHaveChildren; }
    get type()                { return this._type; }
    get defaultName()         { return this._defaultName; }
    get defaultFirstName()    { return this._defaultFirstName; }
    get currentUser()         { return this.parent.currentUser; }

    get firstCreated()        { return this.sortByCreation.slice(0)[0]; }
    get mostRecentlyCreated() { return this.sortByCreation.slice(-1)[0]; }
    get mostRecentlyOpened()  { return this.sortByLastOpened.slice(-1)[0]; }
    get mostRecentlyEdited()  { return this.sortByLastEdited.slice(-1)[0]; }
    set current(id)           { this._current = id; }
    get current()             { return this.findById(this._current); }
    findById(id)              { return this._siblings.find(sibling => (sibling.id == id)); }
    findByName(name)          { return this._siblings.find(sibling => (sibling.name == name)); }
    get entries()             { return this._siblings.length; }

    get sortByCreation() {
        return (this._sortByLastX)
            ? this._siblings.sort((a,b) => (Number(a.creation) - Number(b.creation)))
            : this._siblings.sort((a,b) => (a.children.firstCreated.creation - b.children.firstCreated.creation));
    }
    get sortByLastEdited() {
        return (this._sortByLastX)
            ? this._siblings.sort((a,b) => (Number(a._data.lastEdited) - Number(b._data.lastEdited)))
            : this._siblings.sort((a,b) => (a.children.mostRecentlyEdited.lastEdited - b.children.mostRecentlyEdited.lastEdited));
    }
    get sortByLastOpened() {
        return (this._sortByLastX)
            ? this._siblings.sort((a,b) => (Number(a._data.lastOpened) - Number(b._data.lastOpened)))
            : this._siblings.sort((a,b) => (a.children.mostRecentlyOpened.lastOpened - b.children.mostRecentlyOpened.lastOpened));
    }
    get sortByName() {
        return this._siblings.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    }
    get unsorted() {
        return this._siblings;
    }

    load(parentId) {
        this._loadFrom(sessionStorage, parentId);
        if (this.currentUser.useLocalStorage)   { this._loadFrom(localStorage, parentId); }
        if (this.currentUser.useServerStorage)  { this._loadFrom(serverStorage, parentId); }
        if (this.entries == 0) { this.new(parentId); }
        this._current = this.unsorted.sort((a,b) => (Number(a._data.lastOpened) - Number(b._data.lastOpened))).slice(-1)[0].id;
    }

    _loadFrom(container, parentId) {
        var data = [], sibling;
        if (Object.keys(container).includes(this._type)) {
            data = JSON.parse(container.getItem(this._type)).filter(entry =>
                ((parentId == undefined || parentId == entry[this.parent.type + "Id"]) &&
                    (!this.findById(entry.id)) ||
                     (this.findById(entry.id) &&
                      this.findById(entry.id)._data.lastEdited < entry.lastEdited)));
            data.forEach(entry => {
                sibling = new this._SiblingClass(this._app, this);
                sibling.load(entry);
                this._siblings.push(sibling);
            });
        }
    }

    new() {
        var id = this.newId;
//        var parentId = this.parent.id;
//        console.log(parentId);
        this._current = id;
        var sibling = new this._SiblingClass(this._app, this);
//        console.log(this._type, "new", parentId, id, "Current:", this._current, "Entries:", this.entries);
        sibling.init(id);
        this._siblings.push(sibling);
        return id;
    }

    get newId() {
        var id;
        while (true) {
            id = Math.round(Math.random()*1000000000000000);
            if (!this.findById(id)) { break; }
        }
        return id;
    }

    initialPush() {
        if (this.currentUser.pushToStorageFrequency) { this.pushToStorage(); }
        if (this.currentUser.pushToServerFrequency)  { this.pushToServer(); }
        if (this.canHaveChildren) { this.current.children.initialPush(); }
    }

    schedulePushes() {
        if (this.currentUser.pushToStorageFrequency) { this.schedulePushToStorage(); }
        if (this.currentUser.pushToServerFrequency)  { this.schedulePushToServer(); }
    }

    schedulePushToStorage(seconds = this.currentUser.pushToStorageFrequency) {
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

    get updateContainer()       { return (this.currentUser.useLocalStorage) ? localStorage : sessionStorage; }
    get updateExists()          { return (Object.keys(this.updateContainer).includes("update_" + this._type)); }
    get update()                { return this.updateContainer.getItem("update_" + this._type); }
    set update(value)           { this.updateContainer.setItem("update_" + this._type, value); }
    removeUpdateContainer()     { this.updateContainer.removeItem("update_" + this._type); }
    updateChangeItem(newX)      { this.update = JSON.stringify(JSON.parse(this.update).map(x => ((x.id == newX.id) ? newX : x))); }
    updateNewItem(newX)         { this.update = JSON.stringify(JSON.parse(this.update).push(newX)); }

    get storageContainer()      { return (this.currentUser.useLocalStorage) ? localStorage : sessionStorage; }
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