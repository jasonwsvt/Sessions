class User extends Sibling {
    _passwordVerified = false;

    constructor(app, users) {
        super(app, users);
        this._children = new Clients(app, this);
        this._type = "user";
    }

    get currentUser()        { return this; }

    get clients()            { return this._children; }

    get parentId()           { return null; }
    set parentId(parentId)   { return null; }

    get isPractitioner()     { return this._data.practitioner; }

    get userName()           { return this._data.userName }
    set userName(userName)   {
        if (this._data.userName != userName) {
            this._data.userName = userName;
            this._save();
        }
    }

    get email()              { return this._data.email; }
    set email(email)         {
        if (this._data.email != email) {
            this._data.email = email;
            this._save();
        }
    }

    get name()               { return `${this._data.firstName} ${this._data.lastName}`; }
    set name(name)           { return; }

    get passwordHash() { return this._data.passwordHash; }
    set passwordHash(passwordHash) {
        this._data.passwordHash = passwordHash;
        this._save();
    }

    verifyPassword() { this._passwordVerified == true; }
    get passwordVerfified() { return this._passwordVerified; }

    get rememberMe()         { return this._data.rememberMe; }
    set rememberMe(val) {
        if (this._data.rememberMe != val) { 
            this._data.rememberMe = val;
            this._save();
        }
    }

    get useLocalStorage() { return this._data.useLocalStorage; }
    set useLocalStorage(val) {
        if (this._data.useLocalStorage == false && val == true) {
            this._transitionStorages = true;
            this._data.useLocalStorage = true;
            this.migrate();
            this._data.pushToStorageFrequency = 60;
            this.schedulePushToStorage();
            this._save();
        }
        if (this._data.useLocalStorage == true && val == false) {
            this._data.useLocalStorage = false;
            this.migrate();
            this._data.pushToStorageFrequency = false;
            this.stopPushToStorage();
            this._save();
        }
    }

    get pushToStorageFrequency() { return this._data.pushToStorageFrequency; }
    set pushToStorageFrequency(newFrequency) {
        console.log("Old storage frequency:", this._data.pushToStorageFrequency, "new:", newFrequency);
        if (this._data.pushToStorageFrequency != newFrequency) {
            console.log("not the same");
            const nextPushToStorage = this.nextPushToStorage;
            if (newFrequency) {
                if (nextPushToStorage) {
                    console.log("next push to storage exists")
                    this.stopPushToStorage();
                    var secondsFromPreviousScheduling = this.now - nextPushToStorage + this._data.pushToStorageFrequency;
                    console.log(secondsFromPreviousScheduling, nextPushToStorage, this._data.pushToStorageFrequency);
                    if (secondsFromPreviousScheduling > newFrequency) {
                        console.log("pushing to storage now")
                        this.pushToStorage();
                    }
                    else {
                        console.log("scheduling a push to storage at ", newFrequency - secondsFromPreviousScheduling, "seconds from now");
                        this.schedulePushToStorage(newFrequency - secondsFromPreviousScheduling);
                    }
                }
                else {
                    this.schedulePushToStorage(newFrequency);
                }
            }
            else {
                this.siblings.stopPushToStorage();
            }
            this._data.pushToStorageFrequency = newFrequency;
            this._save();
        }
    }

    get useServerStorage()   { return this._data.useServerStorage; }
    set useServerStorage(val) {
        if (this._data.useServerStorage == false && val == true) {
            this._data.useServerStorage = true;
            this._data.pushToServerFrequency = 36000;
            this._save();
        }
        if (this._data.useServerStorage == true && val == false) {
            this._data.useServerStorage = false;
            this._data.pushToServerFrequency = false;
            this.siblings.stopPushToServer();
            //should all data be pulled to the session?  An option to do so?  A warning that everything on the session will be deleted?
            this._save();
        }
    }
        
    get pushToServerFrequency() { return this._data.pushToServerFrequency; }
    set pushToServerFrequency(val) {
        if (this._data.pushToServerFrequency != val) {
            this._data.pushToServerFrequency = val;
            if (val == false) {
                this.siblings.stopPushToServer();
            }
            this._save();
        }
    }
    
    _newData(id, parentId) {
        const name = this.siblings.defaultName;
        return {
            id: id,
            userName: name,
            email: "",
            passwordHash: "",
            rememberMe: false,
            lastEdited: false,
            lastOpened: false,
            practitioner: false,
            useLocalStorage: false,
            pushToStorageFrequency: false,
            useServerStorage: false,
            pushToServerFrequency: false
        }
    }

    _postInit() {
        this.container.setItem("currentUser", this._data.id);
    }
 
    _postLoad() {
        this.container.setItem("currentUser", this._data.id);
    }
}