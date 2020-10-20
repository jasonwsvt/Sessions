class User {
    _id = null;
    _userName = null;
    _firstName = null;
    _lastName = null;
    _passwordHash = null;
    _useLocalStorage = false;
    _useServerStorage = false;
    _clients = null;

    constructor(mgr)         { this._mgr = mgr; this._clients = new Clients(this); }
    get app()                { return this._mgr.app; }
    get clients()            { return (this._clients) ? this._clients : null; }
    get currentClient()      { return this._clients.current; }
    get name()               { return `${this._firstName} ${this._lastName}` }
    get userName()           { return this._userName }
    set userName(userName)   { this._userName = userName; this._update(); }
    get firstName()          { return this._firstName }
    set firstName(firstName) { this._firstName = firstName; this._update(); }
    get lastName()           { return this._lastName }
    set lastName(lastName)   { this._lastName = lastName; this._update(); }

    get data()               { return { userName:      this._userName,
                                        firstName:     this._firstName,
                                        lastName:      this._lastName,
                                        passwordHash:  this._passwordHash,
                                        useLocalData:  this._useLocalData,
                                        useServerData: this._useServerData,
                                        clients:       this.clients.data } }

    set data(data)           { this._useLocalStorage = data.useLocalStorage;
                               this._useSessionStorage = data.useSessionStorage;
                               this._userName = data.userName;
                               this._firstName = data.firstName;
                               this._lastName = data.lastName;
                               this._passwordHash = data.passwordHash;
                               this._id = data._id;
                               this._clients.data = data.clients; }

    init(id, userName = "Unspecified") { 
        this._userName = userName;
        this._id = id;
        this._clients.new("Self");
    }
}