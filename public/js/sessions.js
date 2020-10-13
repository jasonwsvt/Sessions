class Sessions {
    _user = null;
    _sessions = [];
    _useLocalData = false;
    _useServerData = false;
    _currentSession = null;
    _linesObject = null;
    _cursorObject = null;
    _buttonsObject = null;

    constructor(linesID, buttonsID, buttonsObject) {
        const self = this;
        //pull local data for user
        this._userInit();
        this._sessionInit();
        this._localInit();
        this._serverInit();

        this._buttonsObject = buttonsObject;
        this._buttonsID = buttonsID;
        this._linesObject = new Lines(linesID, this);
  
        if (this.numSessions) {
            this.lines.load(this.sortByLastOpened(this.sessions()).slice(-1)[0].creation);
        }
        else { this.newSession(); }

        this._cursorObject = new Cursor(this.lines);

        $(document).ready(function() {
            $(document).on("keyup", function() {
                self.lines.session.lines = self.lines.linesArray;
            });

            $("#" + self._buttonsID + " button").on("click", function(e) {
                self.cursor.insertButton("<button type='button' class='btn btn-light'>" + $(this).text() + "</button>");
                $(this).blur();
            });
        });
    }

    get lines() { return this._linesObject; }
    get cursor() { return this._cursorObject; }
    get buttons() { return this._buttonsObject; }

    _userInit() {
        //find the "remember me" user in localStorage, if any
    }

    _sessionInit() {
        //pull all session data from sessionStorage, minus lines
        //put information into sessions object
        const keys = Object.keys(sessionStorage);
        var self = this;
        keys.forEach((creation) => {
            if (Number(creation) > 1600000000 && !this.session(creation)) {
                self._sessions.push(new Session(Number(creation)));
//                console.log(self.session(creation));
                self.session(creation).pullSessionData();
            }
        });
    }

    _localInit() {
        //pull all session data from localStorage, minus lines
        //put information into sessions object
        const keys = Object.keys(localStorage);
        var self = this;
        keys.forEach((creation) => {
            if (Number(creation) > 1600000000 && !this.session(creation)) {
                self._sessions.push(new Session(creation));
                console.log(self.session(creation));
                self.session(creation).pullLocalData();
            }
        });
    }

    _serverInit() {
        //pull all session data from server storage, minus lines
        //put information into sessions object
    }

    get numSessions()    { return this._sessions.length; }
    session(creation)    { return this.sessions().find(s => (s.creation == creation)); }
    sessions()           { return this._sessions; }
    issueSessions(issue) { return this.sessions().filter(s => { return s.issue == issue; }); }
    sortByCreation(s)    { return s.sort((a,b) => { return Number(a.creation) - Number(b.creation); }); }
    sortByLastEdited(s)  { return s.sort((a,b) => { return Number(a.lastEdited) - Number(b.lastEdited); }); }
    sortByLastOpened(s)  { return s.sort((a,b) => { return Number(a.lastOpened) - Number(b.lastOpened); }); }
    sortByIssue(s)       { return s.sort((a,b) => a.issue.toLowerCase().localeCompare(b.issue.toLowerCase())); }

    renameIssue(oldIssue, newIssue) {
        this._sessions.forEach((session) => {
            if (session.issue == oldIssue) {
                session.issue = newIssue;
            }
        });
    }

    newSession(issue) {
        var creation = Math.floor(Date.now() / 1000);
        var session = new Session(creation);
        if (typeof issue != "string" || issue == "") { issue = "Unspecified"; }
        session.issue = issue;
        this._sessions.push(session);
        this.lines.load(creation);
        this.cursor.checkForCursor();
    }
    
    mostRecentlyEdited(sessions) {
//        console.log(sessions);
        var recentMost = [], issue, index;
        sessions.forEach(session => {
            issue = session.issue;
            index = recentMost.map(session => { return session.issue; }).indexOf(issue);
            if (index >= 0) {
                if (recentMost[index].lastEdited < session.lastEdited) {
                    recentMost[index] = session;
                }
                //else recentMost already has the most recently edited session for issue
            }
            else {
                recentMost.push(session);
            }
        });
        return recentMost;
    }

    mostRecentlyOpened(sessions) {
        var recentMost = [], issue, index;
        sessions.forEach(session => {
            issue = session.issue;
            index = recentMost.map(session => { return session.issue; }).indexOf(issue);
            if (index >= 0) {
                if (recentMost[index].lastOpened < session.lastOpened) {
                    recentMost[index] = session;
                }
                //else recentMost already has the most recently edited session for issue
            }
            else {
                recentMost.push(session);
            }
        });
        console.log(recentMost);
        return recentMost;
    }

    mostRecentlyCreated(sessions) {
        var recentMost = [], issue, index;
        sessions.forEach(session => {
            issue = session.issue;
            index = recentMost.map(session => { return session.issue; }).indexOf(issue);
            if (index >= 0) {
                if (recentMost[index].creation < session.creation) {
                    recentMost[index] = session;
                }
                //else recentMost already has the most recently edited session for issue
            }
            else {
                recentMost.push(session);
            }
        });
        return recentMost;
    }

    pullLocalDataForUser() {
        //see if there's a user record (remember me checked), and if so,
        //  get the values for using local and server storage
        //  if (localStorage == true) { this.activateLocalStorage; }
        //  if (serverStorage == true) { this.activateServerStorage; }
        //  pull issues and sessions for user
    }

    //gets a stringified JSON of all the Because Reasons components from the server
    getButtons() {
        return becauseReasonsButtonsData;
        //check if buttons are stored in localstorage, if so, check the version
        //pull the version of the most recent buttons from server
        //if the local version is older than the server version, or there is no local version,
        //pull buttons json data with ajax from the Node server
    }

    createServerAccount() {
        //
    }

    authenticate(username, password) {
        //if it's a new location, ensure through email that it's okay
    }

    successfulLoginProcedure() {
        //find out which storage types are okay on this computer
        //if there's any data in local or session storage that isn't on the server,
        //or has a newer lastUpdated timestamp than on the server, update it.
        //synchronizeData()
        //get issue names and names of all sessions for each issue
        //get most recent issue name
        //get most recently accessed session for the most recent issue
    }

    synchronizeData() {

    }
}