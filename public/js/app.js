class App {
    _users = null;
    _buttons = null;
    _editor = null;
    _userUtility = null;
    _clientUtility = null;
    _issueUtility = null;
    _sessionUtility = null;

    constructor() {
        this._users = new Users(this);
        this._editor = new Editor(this);
        this._buttons = new Buttons(this);
//        this._userUtility = new UserUtility(this);
        this._clientUtility = new Utility(this, this.currentUserClients, "client");
        this._issueUtility = new Utility(this, this.currentClientIssues, "issue");
        this._sessionUtility = new Utility(this, this.currentIssueSessions, "session", false);
    }

    get app()              { return this; }
    get userManager()      { return this._userManager; }
    get editor()           { return this._editor; }
    get buttons()          { return this._buttons; }
    get users()            { return this._users; }
    currentUserClients()   { console.log(this.app.users, this.app.users.current, this.app.users.current.clients); return this.app.users.current.clients; }
    currentClientIssues()  { console.log(this.app.users.current.clients.current, this.app.users.current.clients.current.issues); return this.app.currentUserClients.current.issues; }
    currentIssueSessions() { return this.app.currentClientIssues.current.sessions; }
}

var app = new App();