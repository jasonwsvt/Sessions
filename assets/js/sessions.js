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

        session = this._dataManager.mostRecentSession();
        console.log("most recent session: " + session);
        this.loadSession((Number(session)) ? session : "New");
        
        this._buttons.adjustDivHeights();

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
    get sessionName() { return this._currentSession; }
    get issueName()   { return this._currentIssue; }
    get data()        { return this._dataManager; }

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
        if (!Number(session)) {
            this._currentSession = Math.floor(Date.now() / 1000);
            this._currentIssue = "Unspecified";
            this._sessionObject = new Session(this._linesID, []);
            this.storeSession();
        }
        else {
            this._currentSession = session;
            this._currentIssue = this.data.sessionIssue(session);
            this._sessionObject = new Session(this._linesID, this.data.sessionLines(session));
        }
        this._utilities.update();
    }

    storeSession() {
        console.log("session name: " + this.sessionName);
        console.log("this.session.lastEdited: " + this.session.lastEdited);
        console.log("this.issueName: " + this.issueName);
        console.log("this.lines.linesArray: " + this.lines.linesArray);
        this.data.storeSession(this.sessionName, 
                                       this.session.lastEdited,
                                       this.issueName,
                                       this.lines.linesArray);
    }
}