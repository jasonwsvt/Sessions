// SessionDataManager: dataManager extension for hosting session storage data.
//                     Data is clear text.

class SessionDataManager {
    _dataManager = null;

    constructor(dataManager) {
        this._dataManager = dataManager; 
    }

    mostRecentIssue() {
        const issues = pullIssueNames();
        return issues[0];
    }

    mostRecentIssueSession() {
        const sessions = this.pullIssueSessionNames();
        return sessions[0];
    }

    //return all issues stored in session data
    pullIssueNames() {
        const sessions = Object.keys(sessionStorage);
        var issues = [], lastEditeds = [], issues = [], session, max, i;
        for (i = 0; i < sessions.length; i++) {
            session = sessionStorage.getItem(sessions[i]);
            if (!issues.includes(session.issue)) {
                issues.push(session.issue);
                lastEditeds.push(session.lastEdited);
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

    //return all sessions stored in session data for given issue
    pullIssueSessionNames() {
        const sessions = Object.keys(sessionStorage);
        const issue = this._dataManager.getSelectedIssueName;
        var issueSessions = [], lastEditeds = [], sortedIssueSessions = [], session, max, i;

        for (i = 0; i < sessions.length; i++) {
            session = sessionStorage.getItem(sessions[i]);
            if (session.issue == issue && !issueSessions.includes(sessions[i])) {
                issueSessions.push(i);
                lastEditeds.push(session.lastEdited);
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
        console.log("pullIssueNames(): " + sortedIssueSessions);
        return sortedIssueSessions;
    }

    //sessionName = { creationTimestamp, lastEditedTimestamp, lines } (no username or password)
    storeSession() {
        const creationTimestamp = this._dataManager.session.creation;
        const lastEditedTimestamp = this._dataManager.session.lastEdited;
        const issue = this._dataManager._issueName;
        
        var lines = []
        this._dataManager.lines.div.children().each(function() {
            lines.push($(this)[0].outerHTML);
        });

        sessionStorage.setItem(creationTimestamp, JSON.stringify({ issue: issue, lastEdited: lastEditedTimestamp, lines: lines }));
    }

//        issue = session["issue"];
//        lastEditedTimestamp = session["lastEdited"];
//        lines = session["lines"];
    getSession(creationTimestamp) {
        return sessionStorage.getItem(creationTimestamp);
    }
}