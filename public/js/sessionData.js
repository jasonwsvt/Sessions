class SessionData {
    _useSessionStorage = false;
    _useLocalStorage = false;
    _useServerStorage = false;
    _mostUpToDate = null;
    _lastEdited = null;
    _lastOpened = null;
    _issue = null;
    _creation = null;
    _lines = null;

    constructor(creation) { this._creation = creation; }
    get creation()        { return this._creation; }
    get mostUpToDate()    { return this._mostUpToDate; }
    get lastEdited()      { return this._lastEdited; }
    get lastOpened()      { return this._lastOpened; }
    get issue()           { return this._issue; }
    set issue(newIssue)   { this._issue = newIssue; this._update(); }
    get clearLines()      { this._lines = null; }
    set lines(lines)      { this._lines = lines; this._update(); }

    get lines() {
        this._lastOpened = Math.floor(Date.now() / 1000);
        if (this._lines == []) {
            switch (this._mostUpToDate) {
                case "Session": this._pullLinesFromSessionStorage(); break;
                case "Local":   this._pullLinesFromLocalStorage();   break;
                case "Server":  this._pullLinesFromServerDB();       break;
            }
        }
        return this._lines;
    }

    _update() {
        this._lastUpdated = Math.floor(Date.now() / 1000);
        if (this._useLocalStorage)   { this._saveToLocalStorage();   this._mostUpToDate = "Local"; }
        if (this._useSessionStorage) { this._saveToSessionStorage(); this._mostUpToDate = "Session"; }
    }

    setSessionData(issue, lastOpened, lastEdited) {
        this._useSessionData = true;
        if (this._lastEdited == null || lastEdited > this._lastEdited) {
            this._mostUpToDate = "Session";
            this._setData(issue, lastEdited, lastOpened);
        }
    }

    setLocalData(issue, lastOpened, lastEdited) {
        this._useLocalStorage = true;
        if (this._lastEdited == null || lastEdited > this._lastEdited) {
            this._mostUpToDate = "Local";
            this._setData(issue, lastEdited, lastOpened);
        }
    }

    setServerData(issue, lastOpened, lastEdited) {
        this._useServerStorage = true;
        if (this._lastEdited == null || lastEdited > this._lastEdited) {
            this._mostUpToDate = "Server";
            this._setData(issue, lastEdited, lastOpened);
        }
    }

    pullSessionData() {
        session = sessionStorage.getItem(this._creation);
        this.setSessionData(session[0], session[1], session[2]);
    }

    pullLocalData() {
        session = localStorage.getItem(this._creation);
        this.setLocalData(session[0], session[1], session[2]);
    }

    //issue, lastOpened, lastEdited, lines
    _setData(issue, lastOpened, lastEdited) {
        this._issue = issue;
        this._lastEdited = lastEdited;
        this._lastOpened = lastOpened;
    }

    _pullLinesFromSessionStorage() {
        this._lines = sessionStorage.getItem(this._creation)[3];
    }

    _pullLinesFromLocalStorage() {
        this._lines = localStorage.getItem(this._creation)[3];
    }

    _pullLinesFromServerDB() {
    }

    //creation -> issue, lastOpened, lastEdited, lines
    _saveToSessionStorage() {
        sessionStorage.setItem(creation, JSON.stringify(this._issue, this._lastOpened, this._lastEdited, this._lines));
    }

    _saveToLocalStorage() {
        localStorage.setItem(creation, JSON.stringify(this._issue, this._lastOpened, this._lastEdited, this._lines));
    }
}