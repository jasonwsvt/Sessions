class Session {
    _id = null;
    _creation = null;
    _lastOpened = null;
    _lastEdited = null;
    _lines = [];
    _mostUpToDate = null;

    constructor(creation) { this._creation = creation; }
    get creation()        { return this._creation; }
    get lastEdited()      { return this._lastEdited; }
    get lastOpened()      { return this._lastOpened; }
    get mostUpToDate()    { return this._mostUpToDate; }
    get clearLines()      { this._lines = []; }
    set lines(lines)      { this._setLines(lines); }

    get lines() {
//        console.log("lines()", this._creation, this._mostUpToDate, this._lines);
        if (!this._lines.length) { //console.log("this._lines == []", this._mostUpToDate);
            switch (this._mostUpToDate) {
                case "Session": this._pullLinesFromSessionStorage(); break;
                case "Local":   this._pullLinesFromLocalStorage();   break;
                case "Server":  this._pullLinesFromServerDB();       break;
            }
        }
//        console.log("lines()", this._lines);
        this._setLastOpened(Math.floor(Date.now() / 1000));
        return this._lines;
    }

    _setLines(lines) {
        if (JSON.stringify(lines) != JSON.stringify(this._lines)) {
            console.log("_setLines(" + lines + ") for " + this.creation);
            this._lines = lines;
            this._lastEdited = Math.floor(Date.now() / 1000);
            this._update();
        }
    }

    _setLastEdited(lastEdited) {
        this._lastEdited = lastEdited;
        this._update();
    }

    _setLastOpened(lastOpened) {
        this._lastOpened = lastOpened;
        this._update();
    }

    get data()        { return { creation:   this._creation,
                                 lastEdited: this._lastEdited,
                                 lastOpened: this._lastOpened  } }
    
    get sessionData() { return { creation:   this._creation,
                                 lastEdited: this._lastEdited,
                                 lastOpened: this._lastOpened,
                                 lines:      this._lines       } }

    //creation -> issue, lastOpened, lastEdited, lines
    pullSessionData() {
        this._useSessionStorage = true;
        const session = JSON.parse(sessionStorage.getItem(this._creation));
//        console.log("pullSessionData(): " + session);
        this.setSessionData(session[0], session[1], session[2]);
    }

    pullLocalData() {
        this._useLocalStorage = true;
        const session = JSON.parse(localStorage.getItem(this._creation));
        this.setLocalData(session[0], session[1], session[2]);
    }

    setSessionData(issue, lastOpened, lastEdited) {
        this._useSessionStorage = true;
        if (parseInt(lastEdited) < 1600000000) { console.log(lastEdited); console.trace(); }  
        if (this._lastEdited == null || lastEdited >= this._lastEdited) {
            this._mostUpToDate = "Session";
            this._setData(issue, lastEdited, lastOpened);
        }
    }

    setLocalData(issue, lastOpened, lastEdited) {
        this._useLocalStorage = true;
        if (this._lastEdited == null || lastEdited >= this._lastEdited) {
            this._mostUpToDate = "Local";
            this._setData(issue, lastEdited, lastOpened);
        }
    }

    setServerData(issue, lastOpened, lastEdited) {
        this._useServerStorage = true;
        if (this._lastEdited == null || lastEdited > this._lastEdited) {
            this._mostUpToDate = "Server";
            this._setData(issue, lastOpened, lastEdited);
        }
    }

    //issue, lastOpened, lastEdited, lines
    _setData(issue, lastOpened, lastEdited) {
//        if (parseInt(lastEdited) < 1600000000) { console.log(lastEdited); console.trace(); }
//        if (issue.length < 5) { console.log(lastEdited); console.trace(); }
//        if (parseInt(lastOpened) < 1600000000) { console.log(lastOpened); console.trace(); }
        this._issue = issue;
        this._lastOpened = lastOpened;
        this._lastEdited = lastEdited;
    }

    _update() {
//        console.log("updating:", this._lines);
//        console.trace();
        if (!this._useSessionStorage && !this._useLocalStorage && !this._useServerStorage) {
            this._useSessionStorage = true;
        }
        if (this._useLocalStorage)   { this._saveToLocalStorage();   this._mostUpToDate = "Local"; }
        if (this._useSessionStorage) { this._saveToSessionStorage(); this._mostUpToDate = "Session"; }
    }

    _saveToSessionStorage() {
        sessionStorage.setItem(this._creation, JSON.stringify([this._issue, this._lastOpened, this._lastEdited, this._lines]));
    }

    _saveToLocalStorage() {
        localStorage.setItem(this._creation, JSON.stringify([this._issue, this._lastOpened, this._lastEdited, this._lines]));
    }

    _pullLinesFromSessionStorage() {
        const session = JSON.parse(sessionStorage.getItem(this._creation));
        this._lines = session[3];
    }

    _pullLinesFromLocalStorage() {
        const session = JSON.parse(localStorage.getItem(this._creation));
        this._lines = session[3];
    }

    _pullLinesFromServerDB() {
    }
}