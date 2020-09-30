// SessionDataManager: dataManager extension for hosting session storage data.
//                     Data is clear text.

class SessionDataManager {
    _dataManager = null;

    constructor(dataManager) {
        this._dataManager = dataManager; 
    }

    get issue() {
        return this._dataManager.issue;
    }

    //return all issues stored in session data
    issues() {
        const allSessions = Object.keys(sessionStorage);
        var allIssues = [];
        for (i = 0; i < allSessions.length; i++) {
            if (!allIssues.includes(allSesions[i].issue)) {
                allIssues.push(allIssues[i].issue);
            }
        }
        return allIssues;
    }

    //return all sessions stored in session data for given issue
    getIissueSessionNames() {
        const allSessions = Object.keys(sessionStorage);
        const issue = this._dataManager.issueName;
        const issueSessions = [];

        for (i = 0; i < allSessions.length; i++) {
            if (allSesions[i].issue == issue && !allIssueSessions.includes(i)) {
                issueSessions.push(i);
            }
        }

        return issueSessions;
    }

    //sessionName = { creationTimestamp, lastEditedTimestamp, lines } (no username or password)
    storeSession() {
        const creationTimestamp = this._dataManager.session.creation;
        const lastEditedTimestamp = this._dataManager.session.lastEdited;
        const issue = (this._dataManager.issueName) ? this._dataManager.issueName : "Undefined";
        
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