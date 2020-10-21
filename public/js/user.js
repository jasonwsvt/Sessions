class User {
    _id = null;
    _userName = null;
    _firstName = null;
    _lastName = null;
    _passwordHash = null;
    _practitioner = null;
    _useLocalStorage = false;
    _useServerStorage = false;
    _clients = null;

    constructor(mgr)         { this._mgr = mgr; this._clients = new Clients(this); }
    get app()                { return this._mgr.app; }
    get mgr()                { return this._mgr; }
    get clients()            { return (this._clients) ? this._clients : null; }
    get current()            { return this._clients.current; }

    get name()               { return `${this._firstName} ${this._lastName}` }
    get userName()           { return this._userName }
    get firstName()          { return this._firstName }
    get lastName()           { return this._lastName }
    get isPractitioner()     { return this._practitioner; }

    set userName(userName)   { if (this._userName != userName) { this._userName = userName; this._save(); } }
    set lastName(lastName)   { if (this._lastName != lastName) { this._lastName = lastName; this._save(); } }
    set firstName(firstName) { if (this._firstName != firstName) { this._firstName = firstName; this._save(); } }
    set password(password)   { const newHash = this.hash(password);
                               if (this._passwordHash != newHash) { this._passwordHash = newHash; this._save(); } }

    set data(data)           { this._useLocalStorage = data.useLocalStorage;
                               this._useSessionStorage = data.useSessionStorage;
                               this._userName = data.userName;
                               this._firstName = data.firstName;
                               this._lastName = data.lastName;
                               this._passwordHash = data.passwordHash;
                               this._practitioner = data.practitioner;
                               this._id = data._id;
                               this._clients.data = data.clients; }

    get data()               { return { userName:      this._userName,
                                        _id:           this.id,
                                        firstName:     this._firstName,
                                        lastName:      this._lastName,
                                        passwordHash:  this._passwordHash,
                                        useLocalData:  this._useLocalData,
                                        useServerData: this._useServerData,
                                        clients:       this.clients.data } }

    init(id, userName = this._mgr.default) { 
        this._userName = userName;
        this._id = id;
        this._clients.new("Self");
    }
}