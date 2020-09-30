// SessionDataManager: dataManager extension for hosting session storage data.
//                     Data is clear text.

class SessionDataManager {
    _dataManager = null;

    constructor(dataManager) {
        this._dataManager = dataManager; 
    }

    //return all issues stored in session data
    pullIssueNames() {
        const allSessions = Object.keys(sessionStorage);
        var allIssues = [];
        for (var i = 0; i < allSessions.length; i++) {
            if (!allIssues.includes(allSessions[i].issue)) {
                allIssues.push(allSessions[i].issue);
            }
        }
        console.log("pullIssueNames(): " + allIssues);
        return allIssues;
    }

    //return all sessions stored in session data for given issue
    pullIissueSessionNames() {
        const allSessions = Object.keys(sessionStorage);
        const issueName = this._dataManager.issueName;
        const allIssueSessionNames = [];

        for (i = 0; i < allSessions.length; i++) {
            if (allSessions[i].issue == issueName && !allIssueSessionNames.includes(i)) {
                allIssueSessionNames.push(i);
            }
        }
        return allIssueSessionNames;
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