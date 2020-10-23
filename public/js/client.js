class Client {
    _id = null;
    _name = null;
    _clients = null;
    _issues = null;

    constructor(clients) { this._clients = clients; this._issues = new Issues(this); }
    get app()            { return this._clients.app; }
    get clients()        { return this._clients; }
    get issues()         { return this._issues; }
    get userId()         { return this.clients.user.id; }

    get id()             { return this._id }
    set id(id) {
        if (this._id != id) {
            this._id = id;
            this._save();
            this._issues.unsorted.forEach(issue => (issue._clientId = id));
        }
    }
    get name()           { return this._name }
    set name(name)       { this._name = name; this._save(); }


    set data(data)       { this._id     = data.id,
                           this._userId = data.userId;
                           this._name   = data.name; }
    get data()           { return { id:     this.id,
                                    userId: this.userId,
                                    name:   this.name } }

    setAsCurrent() {
        this._clients.current = this._id;
        this._issues.mostRecentlyOpened.setAsCurrent();
    }

    init(id, name = this._clients.default) {
        this._name = name;
        this._id = id;
        this._issues.new();
    }

    _save() {
        var clientData;
        this._lastEdited = Math.floor(Date.now() / 1000);
        if (Object.keys(sessionStorage).includes("clients")) {
            clientData = JSON.parse(sessionStorage.getItem("clients"));
        }
        clientData[this._id]= this.data;
        sessionStorage.setItem("users", JSON.stringify(clientData));
    }

    load(data) {
        this.data = data;
        this.issues.load(data.issues);
    }
}