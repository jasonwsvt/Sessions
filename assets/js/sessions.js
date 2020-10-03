class Sessions {
    _sessionObject = null;
    _dataManager = null;
    _utilitiesID = "utilities";
    _linesID = "lines";
    _buttonsNavID = "buttonsNav";
    _buttonsID = "buttons";
    _currentSession = null;
    _currentIssue = null;
    

    constructor() {
        var self = this, session;
        this.createContainers();

        this._dataManager = new DataManager(this);
        this._buttons = new Buttons(this._buttonsNavID, this._buttonsID, this._dataManager.getButtons());
        this._utilities = new Utilities(this._utilitiesID, this._dataManager, this);
        this._sessionObject = new Session(this._linesID, []);

        session = this.data.mostRecentSession();
        if (Number(session)) { this.loadSession(session); } else { this.newSession(); }
        this.utilities.update();
        
        this.buttons.adjustDivHeights();

        $(document).ready(function() {
            $(document).on("keyup", function() {
                self.storeSession();
            });

            $("#" + self._buttonsID + " button").on("click", function(e) {
                self.session.insertButton("<button type='button' class='btn btn-light'>" + $(this).text() + "</button>");
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
    get sessionName() { return this._currentSession; }
    get issueName()   { return this._currentIssue; }
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
        if (this.currentSession) { this.storeSession(); }
        this._currentSession = session;
        this._currentIssue = this.data.sessionIssue(session);
        this.session.newSession(this.data.sessionLines(session));
    }

    newSession() {
        if (this._currentIssue == null) { this._currentIssue = "Unspecified"; }
        this.session.newSession([]);
        this.storeSession();
    }

    loadMostRecentSessionForIssue(issue) {
        this.storeSession();
        this._currentIssue = issue;
        this._currentSession = this.data.mostRecentIssueSession(issue);
        this.loadSession(this.sessionName);
    }

    newIssue(newIssue) {
        this.storeSession();
        this._currentIssue = newIssue;
        this.newSession();
    }

    renameIssue(issueName) {
        this.data.renameIssue(this._currentIssue, issueName);
        this._currentIssue = issueName;
    }

    storeSession() {
        this.data.storeSession(this.sessionName, 
                               this.session.lastEdited,
                               this.issueName,
                               this.lines.linesArray);
    }
}