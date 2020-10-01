// SessionDataManager: dataManager extension for hosting session storage data.
//                     Data is clear text.

class SessionDataManager {
    _dataManager = null;

    constructor(dataManager) {
        this._dataManager = dataManager; 
    }

    //return all issues stored in session data
    issues() {
        const sessions = Object.keys(sessionStorage);
        var issues = [], lastEditeds = [], sortedIssues = [], session, issue, lastEdited, max, i;
        for (i = 0; i < sessions.length; i++) {
            session = sessionStorage.getItem(sessions[i]);
            issue = session[0];
            lastEdited = session[1];
            if (!issues.includes(issue)) {
                issues.push(issue);
                lastEditeds.push(lastEdited);
            }
        }
        while (issues.length) {
            max = 0;
            for (i = 1; i < issues.length; i++) {
                if (lastEditeds[i] > lastEditeds[max]) { max = i; }
            }
            sortedIssues.push(issues.splice(max));
            lastEditeds.splice(max);
        }
        console.log("pullIssueNames(): " + sortedIssues);
        return sortedIssues;
    }

    sessions() {
        const sessions = Object.keys(sessionStorage);
        var lastEditeds = [], sortedSessions = [], session, lastEdited, max, i;
        for (i = 0; i < sessions.length; i++) {
            session = sessions[i];
            lastEdited = sessionStorage.getItem(sessions[i])[1];
            allSessions.push(session);
            lastEditeds.push(lastEdited);
        }
        while (allSessions.length) {
            max = 0;
            for (i = 1; i < allSessions.length; i++) {
                if (lastEditeds[i] > lastEditeds[max]) { max = i; }
            }
            sortedSessions.push(issues.splice(max));
            lastEditeds.splice(max);
        }
        console.log("sessions(): " + sortedSessions);
        return sortedIssues;
    }

    mostRecentSession() {
        return this.sessions()[0];
    }

    //return all sessions stored in session data for given issue
    issueSessions(issue) {
        const sessions = Object.keys(sessionStorage);
        var issueSessions = [], lastEditeds = [], sortedIssueSessions = [], session, lastEdited, max, i;

        for (i = 0; i < sessions.length; i++) {
            session = sessions[i];
            sessionIssue = sessionStorage.getItem(sessions[i])[0];
            lastEdited = sessionStorage.getItem(sessions[i])[1];
            if (sessionIssue == issue && !issueSessions.includes(session)) {
                issueSessions.push(session);
                lastEditeds.push(lastEdited);
            }
        }
        while (issueSessions.length) {
            max = 0;
            for (i = 1; i < issueSessions.length; i++) {
                if (allLastEditeds[i] > allLastEditeds[max]) { max = i; }
            }
            sortedIssueSessions.push(issueSessions.splice(max));
            lastEditeds.splice(max);
        }
        console.log("pullIssueSessionNames(): " + sortedIssueSessions);
        return sortedIssueSessions;
    }

    mostRecentIssueSession(issue) {
        return this.issueSessions(issue)[0];
    }

    sessionIssue(session) {
        return sessionStorage.getItem(session)[0];
    }

    sessionLastEdited(session) {
        return sessionStorage.getItem(session)[1];
    }

    sessionLines(session) {
        return sessionStorage.getItem(session)[2];
    }

    //sessionName = { creationTimestamp, lastEditedTimestamp, lines } (no username or password)
    storeSession(creation, lastEdited, issue, lines) {
        sessionStorage.setItem(creation, JSON.stringify([issue, lastEdited, lines]));
    }
}