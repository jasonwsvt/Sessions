class Client {
    _name = null;
    _id = null;
    _issues = null;

    constructor(clients) {
        this.clients = clients;
        this._issues = new Issues(this);
    }

    get id()           { return this._id }
    get name()         { return this._name }
    set name(name)     { this._name = name; this._update(); }
    get issues()       { return this._issues.issues }
    get currentIssue() { return this._issues.current }

    get data()         { return { name:   this.name,
                                  issues: this.issues.data } }
}