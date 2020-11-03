const { session } = require("passport");

class User extends Sibling {
    _passwordVerified = false;
    _localBackup = null;
    _serverBackup = null;

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
            this._data.useLocalStorage = true;
            this._data.localBackupFrequency = 60;
            sessionStorage.setItem("backupToLocalStorage", true);
            //tell the backup object to start backing up
            this._save();
        }
        if (this._data.useLocalStorage == true && val == false) {
            this._data.useLocalStorage = false;
            this._data.localBackupFrequency = false;
            sessionStorage.setItem("backupToLocalStorage");
            //tell the backup object to stop backing up
            this._save();
        }
    }

    get localBackupFrequency() { return this._data.localBackupFrequency; }
    set localBackupFrequency(val) {
        if (this._data.localBackupFrequency != val) {
            this._data.localBackupFrequency = val;
            if (val == false) { sessionStorage.removeItem("backupToLocalStorage"); }
            else { sessionStorage.setItem("backupToLocalStorage", true); }
            this._save();
        }
    }

    get useServerStorage()   { return this._data.useServerStorage; }
    set useServerStorage(val) {
        if (this._data.useServerStorage == false && val == true) {
            this._data.useServerStorage = true;
            this._data.serverBackupFrequency = 36000;
            sessionStorage.setItem("backupToServer", true);
            //tell the backup object to start backing up
            this._save();
        }
        if (this._data.useServerStorage == true && val == false) {
            this._data.useServerStorage = false;
            this._data.serverBackupFrequency = false;
            sessionStorage.removeItem("backupToServer");
            //tell the backup object to stop backing up
            this._save();
        }
    }
        
    get serverBackupFrequency() { return this._data.serverBackupFrequency; }
    set serverBackupFrequency(val) {
        if (this._data.serverBackupFrequency != val) {
            this._data.serverBackupFrequency = val;
            if (val == false) { sessionStorage.removeItem("backupToServer"); }
            else { sessionStorage.setItem("backupToServer", true); }
            this._save();
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

    startBackupTimer() {
        if (this._data.localBackupFrequency && (this.nextLocalBackup == null || this.nextLocalBackup <= this.now)) {
            this._nextLocalBackup = (this.now + this._data.localBackupFrequency) * 1000;
            this._localBackup = setTimeout(this.backupToLocal, this._data.localBackupFrequency * 1000);
        }
        if (this._data.serverBackupFrequency && (this.nextServerBackup == null || this.nextServerBackup <= this.now)) {
            this._nextServerBackup = (this.now + this._data.serverBackupFrequency) * 1000;
            this._serverBackup = setTimeout(this.backupToServer, this._data.serverBackupFrequency * 1000);
        }
    }

    backupToLocal() {
        var backupToServer, localRecords, sessionRecords;
        sessionStorage.setItem("backupToLocalStorage", this.now);
        const keys = Object.keys(sessionStorage);
        if (keys.includes("backupToServer")) {
            backupToServer = true;
            delete keys.indexOf("backupToServer");
        }
        keys.forEach(type => {
            if (!Object.keys(localStorage).includes(type)) {
                localStorage.setItem(type, sessionStorage.getItem(type));
            }
            else {
                localRecords = JSON.parse(localStorage.getItem(type));
                sessionRecords = JSON.parse(sessionStorage.getItem(type));
                sessionRecords.forEach(s => {
                    localRecords.filter(l => (l.id != s.id));
                    localRecords.push(s);
                });
                localStorage.setItem(type, JSON.stringify(localRecords));
            }
            sessionStorage.removeItem(type);
        });
    }

    backupToServer() {
        //find everything from the last server backup time in both sessionStorage and localStorage
        //If the user uses localStorage, don't delete from sessionStorage.
        //
    }
}