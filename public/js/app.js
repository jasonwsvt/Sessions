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
        this._clientUtility = new Utility(this, "client");
        this._issueUtility = new Utility(this, "issue");
        this._sessionUtility = new Utility(this, "session");
    }

    get userManager()    { return this._userManager; }
    get editor()         { return this._editor; }
    get buttons()        { return this._buttons; }
    get users()          { return this._users; }
    get currentUser()    { return this._users.current; }
    get currentClient()  { return this.currentUser.clients; }
    get currentIssue()   { return this.currentClient.issues; }
    get currentSession() { return this.currentIssue.sessions; }
}