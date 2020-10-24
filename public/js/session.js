class Session {
    constructor(app, users) {
        super(app, users, Clients);
    }

    get creation()        { return this._data.creation; }

    get newData(issueId) {
        return {
            id: this.newId,
            issueId: issueId,
            creation: this.now,
            lastEdited: null,
            lastOpened: null
        }
    }

    set lines(lines)      {
        if (JSON.stringify(lines) != JSON.stringify(this._lines)) {
            console.log("_setLines(" + lines + ") for " + this._creation);
            this._lines = lines;
            this._lastEdited = this.now;
            this._save();
        }
    }

    get lines() {
//        console.log("lines()", this._creation, this._mostUpToDate, this._lines);
        if (!this._lines.length) { this._pullLines(); }
        this._lastOpened = this.now;
        this._save();
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

    get data()         { return { id:        this.id,
                                  issueId:    this.issueId,
                                  creation:   this._creation,
                                  lastEdited: this._lastEdited,
                                  lastOpened: this._lastOpened  } }
    
    set data(data)              { this._id = Number(data.id);
                                  this._issueId = Number(data.issueId)
                                  this._creation = Number(data.creation);
                                  this._lastEdited = Number(data.lastEdited);
                                  this._lastOpened = Number(data.lastOpened); }

    get _sessionData() {
        return {
            creation:   this._creation,
            lastEdited: this._lastEdited,
            lastOpened: this._lastOpened,
            lines:      this._lines
        }
    }

    _save() {
        var sessionData = [];
        if (Object.keys(sessionStorage).includes("sessions")) {
            sessionData = JSON.parse(sessionStorage.getItem("sessions"));
        }
        sessionData[this._id]= this._sessionData;
        sessionStorage.setItem("sessions", JSON.stringify(sessionData));
    }
}