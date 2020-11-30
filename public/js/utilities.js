class Utilities {
    _app = null;
    _userUtilities = null;
    _clientUtility = null;
    _issueUtility = null;
    _sessionUtility = null;
    _slideUtility = null;
    _infoUtility = null;

    constructor(app) {
        var self = this;
        this._app = app;

        this._userUtilities = new UserUtilities(this, this.users);
        this._clientUtility = new Utility(this, this.currentUserClients, "client");
        this._issueUtility = new Utility(this, this.currentClientIssues, "issue");
        this._sessionUtility = new Utility(this, this.currentIssueSessions, "session", false);
        this._sliderUtility = new SliderUtility(this);
        this._infoUtility = new InfoUtility(this);

        this.manage("user");  //switch to "user" once userItility is created
        this._userUtilities.reset();

        $(document).ready(function() {
            $("html").on("click", function(e) {
                self.closeAllUtilityMenus();
            });
        });
    }

    get utilities()        { return this; }
    get app()              { return this._app; }
    users()                { return this.app.users; }
    currentUserClients()   { return this.app.users.current.children; }
    currentClientIssues()  { return this.app.users.current.children.current.children; }
    currentIssueSessions() { return this.app.users.current.children.current.children.current.children; }

    manage(type) {
        switch (type) {
            case "user":    this._userUtilities.manage();
            case "client":  this._clientUtility.manage();
            case "issue":   this._issueUtility.manage();
            case "session": this._sessionUtility.manage();
        }
    }
      
    closeAllUtilityMenus(except) {
        this._userUtilities.closeMenus(except);
        this._clientUtility.closeMenus(except);
        this._issueUtility.closeMenus(except);
        this._sessionUtility.closeMenus(except);
    }
}