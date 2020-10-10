class Sessions {
    _user = null;
    _sessions = [];
    _useLocalData = false;
    _useServerData = false;
    _currentSession = null;
    _linesObject = null;
    _cursorObject = null;

    constructor(linesID) {
        //pull local data for user
        this._userInit();
        this._sessionInit();
        this._localInit();
        this._serverInit();

        this._sessions.forEach(session => {
            console.log(session);
        });
        this._linesObject = new Lines(linesID, this);
  
        if (this.numSessions) { this.lines.load(this.mostRecentSession()); }
        else { this.newSession(); }

        this._cursorObject = new Cursor(this._linesObject);

        $(document).ready(function() {
            $(document).on("keyup", function() {
                self.lines.session.lines = self.lines.linesArray;
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

    get lines() { return this._linesObject; }

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
                self._sessions.push(new Session(creation));
                console.log(self.session(creation));
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

    get numSessions() { return this._sessions.length; }

    renameIssue(oldIssue, newIssue) {
        this._sessions.forEach((session) => {
            if (session.issue == oldIssue) {
                session.issue = newIssue;
            }
        });
    }

//    newIssue(newIssue) {
//        var creation = Math.floor(Date.now() / 1000);
//        var session = new Session(creation);
//        session.issue(newIssue);
//        this._sessions.push(session);
//        this.lines.load(creation);
//    }

    newSession(issue) {
        var creation = Math.floor(Date.now() / 1000);
        var session = new Session(creation);
        if (typeof issue != "string" || issue == "") { issue = "Unspecified"; }
        session.issue = issue;
        this._sessions.push(session);
        this.lines.load(creation);
    }
    
    session(creation) {
        return this._sessions.find(session => (session.creation == creation));
//        this._sessions.forEach(session => {
//            if (session.creation == creation) { return session; }
//        });
    }

    issues() {
        var unsortedIssues = [], lastOpeneds = [], sortedIssues = [], max, i;
        this._sessions.forEach(session => {
            if (!unsortedIssues.includes(session.issue)) {
                unsortedIssues.push(session.issue);
                lastOpeneds.push(session.lastOpened);
            }
        });
        while (unsortedIssues.length) {
            max = 0;
            for (i = 1; i < unsortedIssues.length; i++) {
                if (lastOpeneds[i] > lastOpeneds[max]) { max = i; }
            }
            sortedIssues.push(unsortedIssues[max]);
            unsortedIssues.splice(max,1);
            lastOpeneds.splice(max,1);
        }
        console.log("issues(): " + sortedIssues);
        return sortedIssues;
    }

    sessions() {
        var unsortedSessions = [], lastOpeneds = [], sortedSessions = [], max, i;
        this._sessions.forEach((session) => {
            unsortedSessions.push(session.creation);
            lastOpeneds.push(session.lastOpened);
        });
        while (unsortedSessions.length) {
            max = 0;
            for (i = 1; i < unsortedSessions.length; i++) {
                if (lastOpeneds[i] > lastOpeneds[max]) { max = i; }
            }
            sortedSessions.push(unsortedSessions[max]);
            unsortedSessions.splice(max,1);
            lastOpeneds.splice(max,1);
        }
        console.log("sessions(): " + sortedSessions);
        return sortedSessions;
    }

    mostRecentSession() {
        const sessions = this.sessions();
        console.log("mostRecentSession(): " + sessions[0]);
        return sessions[0];
    }

    issueSessions(issue) {
        var unsortedIssueSessions= [], sortedIssueSessions = [], lastOpeneds = [], max, i;
console.log("issueSessions(" + issue + "): " + this._sessions.length);
        this._sessions.forEach((session) => {
            if (session.issue == issue && !unsortedIssueSessions.includes(session.creation)) {
                unsortedIssueSessions.push(session.creation);
                lastOpeneds.push(session.lastOpened);
            }
        });
        while (unsortedIssueSessions.length) {
            max = 0;
            for (i = 1; i < unsortedIssueSessions.length; i++) {
                if (lastOpeneds[i] > lastOpeneds[max]) { max = i; }
            }
            sortedIssueSessions.push(unsortedIssueSessions[max]);
            unsortedIssueSessions.splice(max,1);
            lastOpeneds.splice(max,1);
        }
        return sortedIssueSessions;
    }

    mostRecentIssueSession(issue) {
        const issueSessions = this.issueSessions(issue);
        console.log("mostRecentIssueSession(" + issue + "): " + issueSessions[0]);
        return issueSessions[0];
    }

    sessionLines(creation) {
        console.log("sessionLines(" + session + ")");
        return this._sessions(creation).lines;
    }

    sessionLastEdited(creation) {
        console.log("sessionLastEdited(" + session + ") - returning " + this._sessions(creation).lastEdited);
        return this._sessions(creation).lastEdited;
    }

    sessionLastOpened(creation) {
        console.log("sessionLastEdited(" + session + ") - returning " + this._sessions(creation).lastEdited);
        return this._sessions(creation).lastOpened;
    }

    sessionIssue(creation) {
        console.log("sessionIssue(" + session + ") - returning " + this._sessions(creation).issue);
        return this._sessions(creation).issue;
    }

    storeSession(creation, lastEdited, issue, lines) {
        console.log("storeSession is deprecated.  Use setLines instead.");
        console.trace();
        this.setLines(creation, lines);
    }

    setLines(creation, lines) {
        this.session(creation).lines = lines;
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