class Users extends Siblings {
    constructor(app) {
        super(app, User, "user");
        this._type = "users";
        this._defaultName = "new_user";
        this.load();
    }

    get firstCreated()        { return; }
    get mostRecentlyCreated() { return; }
    get mostRecentlyOpened()  { return; }
    get mostRecentlyEdited()  { return; }
    get sortByCreation()      { return; }
    get sortByLastEdited()    { return; }
    get sortByLastOpened()    { return; }
    get sortByName()          { return; }

    load() {
        var entries, entry, userName;
//        console.log(this._type, this._defaultName);
        if (Object.keys(sessionStorage).includes(this._type)) {
//            console.log("has sessionStorage users");
            entries = JSON.parse(sessionStorage.getItem(this._type));
            entry = entries.pop(); //.find(entry => (entry.userName == this._defaultName));
            if (entry) {
                this._current = entry.id;
                this._loadFrom(sessionStorage);
            }
        }
        else if (Object.keys(localStorage).includes("rememberMe")) {
            console.log("has RememberMe user");
            userName = JSON.parse(localStorage.getItem(localStorage.getItem("rememberMe")));
            entries = JSON.parse(sessionStorage.getItem(this._type));
            entry = entries.find(entry => (entry.userName == userName));
            this._current = entry.id;
            user = new this._SiblingClass(this);
            user.load(entry);
            this._users.push(user);
        }
        else if (Object.keys(localStorage).includes(this._type)) {
            console.log("has localStorage users");
            entries = JSON.parse(localStorage.getItem(this._type));
            entry = entries.find(entry => (entry.userName == this._defaultName));
            if (entry) {
                this._current = entry.id;
                this._loadFrom(localStorage);
            }
        }
        else {
            this.new();
        }
    }

    logIn(userName, password) {
        if (Object.keys(localStorage).includes(userName)) {
            data = JSON.parse(localStorage.getItem(userName));
            if (data.passwordHash == this.hash(password)) {
                this._current = data.id;
                user = new this._SiblingClass(this);
                user.load(data);
                this._users.push(user);
                return true;
            }
        }
        return false;
    }

    backup() {
        var sessionEntries, localEntries;
        if (Object.keys(sessionStorage).includes(this.type) && 
            (this.app.users.current.useLocalStorage || this.app.users.current.useServerStorage)) {
            sessionEntries = JSON.parse(sessionStorage.getItem(this.type));
            if (this.app.users.current.useLocalStorage) {
                if (Object.keys(localStorage).includes(this.type)) {
                    localEntries = JSON.parse(localStorage.getItem(this.type));
                }
                else { localEntries = []; }
                sessionEntries.forEach(entry => {
                    localEntries.find(localEntry => (localEntry.id == entry.id)) = entry;
                });
                localStorage.setItem(this.type, JSON.stringify(localEntries));
            }
            if (this.app.users.current.useServerStorage) {

            }
            sessionStorage.removeItem(this.type);
        }
    }

    backupToLocal() {
        if (Object.keys(sessionStorage).includes("backup")) {
            const sessionBackup = JSON.parse(sessionStorage.getItem(backup));
            useLocalStorage = sessionBackup.useLocalStorage;
            useServerStorage = sessionBackup.useServerStorage;
            sessionTypes = Object.keys(sessionBackup);
            delete sessionTypes.useLocalStorage;
            delete sessionTypes.useServerStorage;
            sessionTypes.forEach(type => {
                var allEntries = JSON.parse(sessionStorage.getItem(type));
                sessionBackup[type].forEach(id, () => {
                    allEntries.find(entry => { if (entry.id == id) { entriesToBackUp.push(entry); } });
                    entriesToBackUp.
                });
            });
            if (useServerStorage) {
                var localBackup;
                if (Object.keys(localStorage).includes("backup")) {
                    localBackup = JSON.parse(localStorage.getItem("backup"));

                    sessionBackup.forEach(type => {
                        
                    })
                }
                else { localBackup = backup; }
                localStorage.setItem("backup", localBackup);
            }
        }
    }

    backupToServer() {

    }
}