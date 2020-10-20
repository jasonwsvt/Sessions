class Client {
    _id = null;
    _name = null;
    _clients = null;
    _issues = null;

    constructor(clients) { this._clients = clients; this._issues = new Issues(this); }
    get app()            { return this._clients.app; }

    get id()             { return this._id }
    get name()           { return this._name }
    set name(name)       { this._name = name; this._save(); }
    get issues()         { return this._issues.issues }

    set data(data)       { this._name = data.name;
                           this._id = data._id;
                           this._issues.load(data.issues); }

    get data()           { return { name:   this.name,
                                    _id:    this.id,
                                    issues: this.issues.data } }

    init(id, name = "Unspecified") {
        this._name = name;
        this._id = id;
        this._issues.new();
    }

    setAsCurrent() {
        this._clients.current = this._id;
        this._issues.mostRecentlyOpened.setAsCurrent();
    }
}