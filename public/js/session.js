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
            this._save();
        }
    }

    _setLastEdited(lastEdited) { this._lastEdited = lastEdited; this._save(); }
    _setLastOpened(lastOpened) { this._lastOpened = lastOpened; this._save(); }

    get data()        { return { creation:   this._creation,
                                 lastEdited: this._lastEdited,
                                 lastOpened: this._lastOpened  } }
    
    get sessionData() { return { creation:   this._creation,
                                 lastEdited: this._lastEdited,
                                 lastOpened: this._lastOpened,
                                 lines:      this._lines       } }

    load(data) {
        this._creation = data.creation;
        this._lastEdited = data.lastEdited;
        this._lastOpened = data.lastOpened;
    }

    _save() {
//        console.log("updating:", this._lines);
//        console.trace();
        if (!this._useSessionStorage && !this._useLocalStorage && !this._useServerStorage) {
            this._useSessionStorage = true;
        }
        if (this._useLocalStorage)   { this._saveToLocalStorage();   this._mostUpToDate = "Local"; }
        if (this._useSessionStorage) { this._saveToSessionStorage(); this._mostUpToDate = "Session"; }
    }

    _saveToSessionStorage() {
        sessionStorage.setItem(this._creation, JSON.stringify(this._sessionData));
    }

    _saveToLocalStorage() {
        localStorage.setItem(this._creation, JSON.stringify(this._sessionData));
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