class Client {
    _id = null;
    _name = null;
    _clients = null;
    _issues = null;

    constructor(clients) { this._clients = clients; this._issues = new Issues(this); }
    get app()            { return this._clients.app; }
    get clients()        { return this._clients; }
    get issues()         { return this._issues; }

    get id()             { return this._id }
    get name()           { return this._name }
    set name(name)       { this._name = name; this._save(); }

    set data(data)       { this._name = data.name;
                           this._id = data._id; }
    get data()           { return { name:   this.name,
                                    _id:    this.id } }

    init(id, name = this._clients.default) {
        this._name = name;
        this._id = id;
        this._issues.new();
    }

    setAsCurrent() {
        this._clients.current = this._id;
        this._issues.mostRecentlyOpened.setAsCurrent();
    }

    _save() {
        var clientData;
        if (Object.keys(sessionStorage).includes("clients")) {
            clientData = JSON.parse(sessionStorage.getItem("clients"));
        }
        clientData[_id]= this.data;
        sessionStorage.setItem("users", JSON.stringify(clientData));
    }

    load(data) {
        this.data = data;
        this.issues.load(data.issues);
    }
}