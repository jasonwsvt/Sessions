class Session {
    _id = null;
    _creation = null;
    _lastOpened = null;
    _lastEdited = null;
    _lines = [];
    _sessions = null;

    constructor(sessions) { this._sessions = sessions; }
    get app()             { return this._sessions.app; }
    get user()            { return this.app.userManager.user; }
    get creation()        { return this._creation; }
    get lastEdited()      { return this._lastEdited; }
    get lastOpened()      { return this._lastOpened; }
    get clearLines()      { this._lines = []; }
    _setLastEdited(lastEdited) { this._lastEdited = lastEdited;     this._save(); }
    _setLastOpened(lastOpened) { this._lastOpened = lastOpened;     this._save(); }
    setAsCurrent()             { this._sessions.current = this._id; this.app.editor.load(); }

    _save() {
        var sessionData;
        if (Object.keys(sessionStorage).includes("sessions")) {
            sessionData = JSON.parse(sessionStorage.getItem("sessions"));
        }
        sessionData[_id]= this.data;
        sessionStorage.setItem("sessions", JSON.stringify(sessionData));
    }

    load(data) {
        this.data = data;
    }

    set lines(lines)      {
        if (JSON.stringify(lines) != JSON.stringify(this._lines)) {
            console.log("_setLines(" + lines + ") for " + this.creation);
            this._lines = lines;
            this._lastEdited = Math.floor(Date.now() / 1000);
            this._save();
        }
    }

    get lines() {
//        console.log("lines()", this._creation, this._mostUpToDate, this._lines);
        if (!this._lines.length) { this._pullLines(); }
        this._setLastOpened(Math.floor(Date.now() / 1000));
        return this._lines;
    }

    _pullLines() {
        if (Object.keys(sessionStorage).includes(this._creation)) {
            const session = JSON.parse(sessionStorage.getItem(this._creation));
            this._lines = session[3];
        }
        else if (this.user.useLocalStorage && Object.keys(localStorage).includes(this._creation)) {
            const session = JSON.parse(localStorage.getItem(this._creation));
            this._lines = session[3];
        }
        else if (this.user.useServerStorage) { //request from server

        }
    }

    get name() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const d = new Date(this._creation * 1000);
        const year = String(d.getFullYear());
        const month = months[d.getMonth()];
        const day = String(d.getDate());
        const hour = String((d.getHours() > 12) ? d.getHours() - 12 : d.getHours()).padStart(2, '0');
        const minute = String(d.getMinutes()).padStart(2, '0');
        const second = String(d.getSeconds()).padStart(2, '0');
        const ampm = String((d.getHours() > 12) ? "PM" : "AM");
        return `${month} ${day} ${year} ${hour}:${minute}:${second}${ampm}`;
    }

    get data()         { return { creation:   this._creation,
                                  lastEdited: this._lastEdited,
                                  lastOpened: this._lastOpened  } }
    
    set data(data)              { this._creation = data.creation;
                                  this._lastEdited = data.lastEdited;
                                  this._lastOpened = data.lastOpened; }

    init(id, creation = this._sessions.default) {
        this._creation = creation;
        this._id = id;
    }
}