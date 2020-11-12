class User extends Sibling {
    _passwordVerified = false;

    constructor(app, users) {
        super(app, users);
        this._children = new Clients(app, this);
        this._type = "user";
    }

    get currentUser()        { return this; }

    get parentId()           { return null; }
    set parentId(parentId)   { return null; }

    get isPractitioner()     { return this._data.practitioner; }

    get userName()           { return this._data.userName }
    set userName(userName)   {
        if (this._data.userName != userName) {
            this._data.userName = userName;
            this._update();
        }
    }

    get email()              { return this._data.email; }
    set email(email)         {
        if (this._data.email != email) {
            this._data.email = email;
            this._update();
        }
    }

    get passwordHash() { return this._data.passwordHash; }
    set passwordHash(passwordHash) {
        this._data.passwordHash = passwordHash;
        this._update();
    }

    verifyPassword() { this._passwordVerified == true; }
    get passwordVerfified() { return this._passwordVerified; }

    get rememberMe()         { return this._data.rememberMe; }
    set rememberMe(val) {
        if (this._data.rememberMe != val) { 
            this._data.rememberMe = val;
            this._update();
        }
    }

    get storagePermanence() { return this._data.storagePermanence; }
    set storagePermanence(val) {
        if (this._data.storagePermanence != val) {
            this._data.storagePermanence = val;
            this.migrate();
            if (val == false && this.rememberMe == this.id) {
                this.clearRememberMe();
            }
            this._update();
        }
    }

    get pushToStorageFrequency() { return this._data.pushToStorageFrequency; }
    set pushToStorageFrequency(newFrequency) {
        //console.log("Old storage frequency:", this._data.pushToStorageFrequency, "new:", newFrequency);
        if (this._data.pushToStorageFrequency != newFrequency) {
            //console.log("not the same");
            this.siblings.reschedulePushToStorage(newFrequency);
            this._data.pushToStorageFrequency = newFrequency;
            this._update();
        }
    }

    get useServerStorage()   { return this._data.useServerStorage; }
    set useServerStorage(val) {
        if (this._data.useServerStorage == false && val == true) {
            this._data.useServerStorage = true;
            this._data.pushToServerFrequency = 36000;
            this._update();
        }
        if (this._data.useServerStorage == true && val == false) {
            this._data.useServerStorage = false;
            this._data.pushToServerFrequency = false;
            this.siblings.stopPushToServer();
            //should all data be pulled to the session?  An option to do so?  A warning that everything on the session will be deleted?
            this._update();
        }
    }
        
    get pushToServerFrequency() { return this._data.pushToServerFrequency; }
    set pushToServerFrequency(val) {
        if (this._data.pushToServerFrequency != val) {
            this._data.pushToServerFrequency = val;
            if (val == false) {
                this.siblings.stopPushToServer();
            }
            this._update();
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
            storagePermanence: false,
            pushToStorageFrequency: 60,
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