class User extends Sibling {
    constructor(app, users) {
        super(app, users);
        this._children = new Clients(app, this);
        this._childrenType = "clients";
        this._type = "user";
        this._defaultName = "New User";
    }

    get clients()            { return this._children; }

    get parentId()           { return null; }
    set parentId(parentId)   { return null; }

    get isPractitioner()     { return this._data.practitioner; }

    get userName()           { return this._data.userName }
    set userName(userName)   {
        if (this._data.userName != userName) {
            this._userName = userName;
            this._save();
        }
    }

    get name()               { return `${this._data.firstName} ${this._data.lastName}`; }
    set name(name)           { pass; }

    get firstName()          { return this._data.firstName; }
    set firstName(firstName) {
        if (this._data.firstName != firstName) {
            this._firstName = firstName;
            this._save();
        }
    }

    get lastName()           { return this._data.lastName; }
    set lastName(lastName) {
        if (this._data.lastName != lastName) {
            this._lastName = lastName;
            this._save();
        }
    }
    set password(password) {
        const newHash = this.hash(password);
        if (this._data.passwordHash != newHash) {
            this._data.passwordHash = newHash;
            this._save();
        }
    }

    get useLocalStorage()    { return this._data.useLocalStorage; }
    set useLocalStorage(useLocalStorage) {
        if (this._data.useLocalStorage != useLocalStorage) {
            this._data.useLocalStorage = useLocalStorage;
            this._save();
        }
    }

    get useServerStorage()   { return this._data.useServerStorage; }
    set useServerStorage(useServerStorage)  {
        if (this._data.useServerStorage != useServerStorage) {
            this._data.useServerStorage = useServerStorage;
            this._save();
        }
    }
    
    _newData(id, parentId) {
        return {
            id: id,
            userName: this._defaultName,
            firstName: "",
            lastName: "",
            passwordHash: "",
            lastEdited: false,
            lastOpened: false,
            practitioner: false,
            useLocalStorage: false,
            useServerStorage: false
        }
    }
}