class User extends Sibling {
    _passwordVerified = false;

    constructor(app, users) {
        super(app, users);
        this._children = new Clients(app, this);
        this._type = "user";
    }

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
    set email(email)         { this._data.email = email; }

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
            this._save;
        }
    }

    get useLocalStorage() { return this._data.useLocalStorage; }
    set useLocalStorage(val) {
        if (this._data.useLocalStorage == false && val == true) {
            this._data.useLocalStorage = true;
            this._data.localBackupFrequency = 60;
            //tell the backup object to start backing up
            this._save();
        }
        if (this._data.useLocalStorage == true && val == false) {
            this._data.useLocalStorage = false;
            this._data.localBackupFrequency = false;
            //tell the backup object to stop backing up
            this._save();
        }
    }

    get localBackupFrequency() { return this._data.localBackupFrequency; }
    set localBackupFrequency(val) {
        if (this._data.localBackupFrequency != val) {
            this._data.localBackupFrequency = val;
            this._save;
        }
    }

    get useServerStorage()   { return this._data.useServerStorage; }
    set useServerStorage(val) {
            if (this._data.useServerStorage == false && val == true) {
                this._data.useServerStorage = true;
                this._data.serverBackupFrequency = 36000;
                //tell the backup object to start backing up
                this._save();
            }
            if (this._data.useServerStorage == true && val == false) {
                this._data.useServerStorage = false;
                this._data.serverBackupFrequency = false;
                //tell the backup object to stop backing up
                this._save();
            }
        }
        
        get serverBackupFrequency() { return this._data.serverBackupFrequency; }
        set serverBackupFrequency(val) {
            if (this._data.serverBackupFrequency != val) {
                this._data.serverBackupFrequency = val;
                this._save;
            }
        }
    
        _newData(id, parentId) {
        var name = this.siblings.defaultName;
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
            localBackupFrequency: false,
            useServerStorage: false,
            serverBackupFrequency: false
        }
    }
}