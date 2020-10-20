class User {
    _useLocalData = false;
    _useServerData = false;
    _clients = null;
    _userName = null;
    _firstName = null;
    _lastName = null;

    constructor() {
        this._clients = new Clients(this);
        this._clients.new("Self");
    }

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
                                        useLocalData:  this._useLocalData,
                                        useServerData: this._useServerData,
                                        clients:       this.clients.data } }

}