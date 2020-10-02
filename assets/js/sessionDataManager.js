// SessionDataManager: dataManager extension for hosting session storage data.
//                     Data is clear text.

class SessionDataManager {
    _dataManager = null;

    constructor(dataManager) {
        this._dataManager = dataManager; 
    }

    //return all issues stored in session data
    issues() {
        const sessionKeys = Object.keys(sessionStorage);
        var unsortedIssues = [], lastEditeds = [], sortedIssues = [];
        var session, issue, lastEdited, max, i;
        for (i = 0; i < sessionKeys.length; i++) {
            session = this.session(sessionKeys[i]);
            issue = session[0];
            lastEdited = session[1];
            if (!unsortedIssues.includes(issue)) {
                unsortedIssues.push(issue);
                lastEditeds.push(lastEdited);
            }
        }
        while (unsortedIssues.length) {
            max = 0;
            for (i = 1; i < unsortedIssues.length; i++) {
                if (lastEditeds[i] > lastEditeds[max]) { max = i; }
            }
            sortedIssues.push(unsortedIssues.splice(max));
            lastEditeds.splice(max);
        }
//        console.log("pullIssueNames(): " + sortedIssues);
        return sortedIssues;
    }

    sessions() {
        const sessionKeys = Object.keys(sessionStorage);
        var unsortedSessions = [], lastEditeds = [], sortedSessions = [];
        var session, sessionName, lastEdited, max, i;
        for (i = 0; i < sessionKeys.length; i++) {
            sessionName = sessionKeys[i];
            session = this.session(sessionName);
            lastEdited = session[1];
            unsortedSessions.push(sessionName);
            lastEditeds.push(lastEdited);
        }
        while (unsortedSessions.length) {
            max = 0;
            for (i = 1; i < unsortedSessions.length; i++) {
                if (lastEditeds[i] > lastEditeds[max]) { max = i; }
            }
            sortedSessions.push(unsortedSessions.splice(max,1));
            lastEditeds.splice(max,1);
        }
//        console.log("sessions(): " + sortedSessions);
        return sortedSessions;
    }

    mostRecentSession() {
        return this.sessions()[0];
    }

    //return all sessions stored in session data for given issue
    issueSessions(issue) {
        const sessionKeys = Object.keys(sessionStorage);
        var unsortedIssueSessions= [], sortedIssueSessions = [], lastEditeds = [];
        var session, sessionIssue, sessionName, lastEdited, max, i;

        for (i = 0; i < sessionKeys.length; i++) {
            sessionName = sessionKeys[i];
            session = this.session(sessionName);
            sessionIssue = session[0];
            lastEdited = session[1];
            if (sessionIssue == issue && !unsortedIssueSessions.includes(sessionName)) {
                unsortedIssueSessions.push(sessionName);
                lastEditeds.push(lastEdited);
            }
        }
        while (unsortedIssueSessions.length) {
            max = 0;
            for (i = 1; i < unsortedIssueSessions.length; i++) {
                if (lastEditeds[i] > lastEditeds[max]) { max = i; }
            }
            sortedIssueSessions.push(unsortedIssueSessions.splice(max));
            lastEditeds.splice(max);
        }
        console.log("issueSessions(): " + sortedIssueSessions);
        return sortedIssueSessions;
    }

    mostRecentIssueSession(issue) {
        return this.issueSessions(issue)[0];
    }

    session(session) {
//        console.log("session(" + session + ") - returning " + sessionStorage.getItem(session));
        return JSON.parse(sessionStorage.getItem(session));
    }

    sessionIssue(session) {
//        console.log("sessionIssue(" + session + ") - returning " + this.session(session)[0]);
        return this.session(session)[0];
    }

    sessionLastEdited(session) {
//        console.log("sessionLastEdited(" + session + ") - returning " + this.session(session)[1]);
        return this.session(session)[1];
    }

    sessionLines(session) {
//        console.log("sessionLines(" + session + ") - returning " + this.session(session)[2]);
        return this.session(session)[2];
    }

    //sessionName = { creationTimestamp, lastEditedTimestamp, lines } (no username or password)
    storeSession(creation, lastEdited, issue, lines) {
        sessionStorage.setItem(creation, JSON.stringify([issue, lastEdited, lines]));
    }
}