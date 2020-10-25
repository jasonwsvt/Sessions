class User {
    _id = null;
    _userName = null;
    _firstName = null;
    _lastName = null;
    _passwordHash = null;
    _practitioner = null;
    _useLocalStorage = false;
    _useServerStorage = false;
    _lastEdited = null;
    _users = null;
    _clients = null;

    constructor(users)       { this._users = users; this._clients = new Clients(this); }
    get app()                { return this._users.app; }
    get users()              { return this._users; }
    get clients()            { return this._clients; }
    get current()            { return this._clients.current; }

    get id()                 { return this._id; }
    get name()               { return `${this._firstName} ${this._lastName}` }
    get userName()           { return this._userName }
    get firstName()          { return this._firstName }
    get lastName()           { return this._lastName }
    get isPractitioner()     { return this._practitioner; }

    set id(id) {
        if (this._id != id) {
            this._id = id;
            this._save();
            this._clients.unsorted.forEach(client => (client._userId = id));
        }
    }
    set userName(userName)   { if (this._userName != userName)    { this._userName = userName;    this._save(); } }
    set lastName(lastName)   { if (this._lastName != lastName)    { this._lastName = lastName;    this._save(); } }
    set firstName(firstName) { if (this._firstName != firstName)  { this._firstName = firstName;  this._save(); } }
    set password(password)   { const newHash = this.hash(password);
                               if (this._passwordHash != newHash) { this._passwordHash = newHash; this._save(); } }

    setAsCurrent() {
        this._users.current = this._id;
        this._clients.mostRecentlyOpened.setAsCurrent();
    }

    set data(data)           {
        this._id                = data.id;
        this._userName          = data.userName;
        this._firstName         = data.firstName;
        this._lastName          = data.lastName;
        this._passwordHash      = data.passwordHash;
        this._practitioner      = data.practitioner;
        this._useLocalStorage   = data.useLocalStorage;
        this._useSessionStorage = data.useSessionStorage;
        this._lastEdited        = data.lastEdited;
    }

    get data() {
        return {
            id:            this._id,
            userName:      this._userName,
            firstName:     this._firstName,
            lastName:      this._lastName,
            passwordHash:  this._passwordHash,
            practitioner:  this._practitioner,
            useLocalData:  this._useLocalData,
            useServerData: this._useServerData,
            lastEdited:    this._lastEdited
        }
    }

    init(id, userName = this.users.default) { 
        this._userName = userName;
        this._id = id;
        this._clients.new("Self");
    }

    _save() {
        var userData;
        this._lastEdited = Math.floor(Date.now() / 1000);
        if (Object.keys(sessionStorage).includes("users")) {
            userData = JSON.parse(sessionStorage.getItem("users"));
        }
        userData[this._id]= this.data;
        sessionStorage.setItem("users", JSON.stringify(userData));
    }

    load(data) {
        this.data = data;
        this.clients.load(data.clients);
    }
}