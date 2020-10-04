class Sessions {
    _sessionObject = null;
    _dataManager = null;
    _utilitiesID = "utilities";
    _linesID = "lines";
    _buttonsNavID = "buttonsNav";
    _buttonsID = "buttons";
    _sessionName = null;
    _issueName = null;
    

    constructor() {
        var self = this, session;
        this.createContainers();

        this._dataManager = new DataManager(this);
        this._buttons = new Buttons(this._buttonsNavID, this._buttonsID, this._dataManager.getButtons());
        this._utilities = new Utilities(this._utilitiesID, this._dataManager, this);
        this._sessionObject = new Session(this._linesID, []);

        session = this.data.mostRecentSession();
        if (Number(session)) { this.loadSession(session); } else { this.newSession(); }
        this.utilities.manage();
        
        this.buttons.adjustDivHeights();

        $(document).ready(function() {
            $(document).on("keyup", function() {
                self.storeSession();
            });

            $("#" + self._buttonsID + " button").on("click", function(e) {
                self.session.insertButton("<button type='button' class='btn btn-light'>" + $(this).text() + "</button>");
                $(this).blur();
            });

            $(window).resize(function() {
                self._buttons.adjustDivHeights();
            });
        });
    }

    get session()     { return this._sessionObject; }
    get lines()       { return this._sessionObject.lines; }
    get data()        { return this._dataManager; }
    get buttons()     { return this._buttons; }
    get sessionName() { return this._sessionName; }
    get issueName()   { return this._issueName; }
    get utilities()   { return this._utilities; }

    createContainers() {
        var utilitiesCode, linesCode, buttonsContainer, buttonsNavCode, buttonsCode;
    
        utilitiesCode = "<div id = '" + this._utilitiesID + "'></div>";
        linesCode = "<div id = '" + this._linesID +"' class = 'align-self-start'></div>";
        buttonsNavCode = "<div id = '" + this._buttonsNavID + "' class='col col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6'></div>";
        buttonsCode = "<div id = '" + this._buttonsID + "' class='col col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6'></div>";
        buttonsContainer = "<div class = 'container-fluid'><div class = 'row'>" + buttonsNavCode + buttonsCode + "</div></div>";

        $("body").prepend(utilitiesCode + linesCode + buttonsContainer);
    }

    loadSession(session) {
        this.storeSession();
        console.log("loadSession: " + session + " (" + this.data.sessionIssue(session) + ")");
        this._sessionName = session;
        this._issueName = this.data.sessionIssue(session);
        console.log("loadSession: " + this.issueName + " " + this.sessionName);
        console.log(this.data.sessionLines(session));
        this.session.newSession(this.data.sessionLines(session));
    }

    newSession() {
        if (this._issueName == null) { this._issueName = "Unspecified"; }
        this._sessionName = Math.floor(Date.now() / 1000);
        this.session.newSession([]);
        this.storeSession();
    }

    loadMostRecentSessionForIssue(issue) {
        this.storeSession();
        this._issueName = issue;
        this._sessionName = this.data.mostRecentIssueSession(issue);
        console.log("loadMostRecentSessionForIssue(" + issue + "):" + this.sessionName);
        this.loadSession(this.sessionName);
    }

    newIssue(newIssue) {
        this.storeSession();
        this._issueName = newIssue;
        this.newSession();
    }

    renameIssue(issueName) {
        this.data.renameIssue(this._issueName, issueName);
        this._issueName = issueName;
    }

    storeSession() {
        this.data.storeSession(this.sessionName, 
                               this.session.lastEdited,
                               this.issueName,
                               this.lines.linesArray);
    }
}