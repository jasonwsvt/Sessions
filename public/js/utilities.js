class Utilities {
    _app = null;
    _userUtility = null;
    _clientUtility = null;
    _issueUtility = null;
    _sessionUtility = null;
    _slideUtility = null;
    _transferUtility = null;
    _infoUtility = null;

    _dotIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-dot my-2' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'/></svg>";

    constructor(app) {
        var self = this;
        this._app = app;
//        this._userUtility = new UserUtility(this);
        $("#userUtility").after(this._dotIcon);
        this._clientUtility = new Utility(this, this.currentUserClients, "client");
        $("#clientUtility").after(this._dotIcon);
        this._issueUtility = new Utility(this, this.currentClientIssues, "issue");
        $("#issueUtility").after(this._dotIcon);
        this._sessionUtility = new Utility(this, this.currentIssueSessions, "session", false);
        this._sliderUtility = new SliderUtility(this);
        $("#sliderUtility").after(this._dotIcon);
//        this._transferUtility = new TransferUtility(this);
        $("#transferUtility").after(this._dotIcon);
//        this._infoUtility = new InfoUtility(this);

        $(document).ready(function() {
            $("html").on("click", function(e) {
                self.closeAllUtilityMenus();
            });

            $(window).resize(function() {
                self.buttons.adjustDivHeights();
            });
        });
    }

    get app() { return this._app; }
    get utilities() { return this; }

    currentUserClients()   {
//        console.log("Users:", this.app.users);
//        console.log("Current user:", this.app.users.current);
//        console.log("Current user clients:", this.app.users.current.clients);
        return this.app.users.current.clients;
    }

    currentClientIssues()  {
//        console.log("Current client:", this.app.users.current.clients.current);
//        console.log("Current client issues:", this.app.users.current.clients.current.issues);
//        console.trace();
        return this.app.users.current.clients.current.issues;
    }

    currentIssueSessions() {
        return this.app.users.current.clients.current.issues.current.sessions;
    }
        
    closeAllUtilityMenus(except) {
        //this._userUtility.closeMenus(except);
        this._clientUtility.closeMenus(except);
        this._issueUtility.closeMenus(except);
        this._sessionUtility.closeMenus(except);
    }
        
}