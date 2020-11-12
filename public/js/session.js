class Session extends Sibling {
    constructor(app, sessions) {
        super(app, sessions);
        this._type = "session";
    }

    get creation()  { return this._data.creation; }

    get lines() {
        var session;
        console.log("loading lines for", this._data.id);
        if (this._data.lines.length == 0) {
            if (this.storageTableExists) {
                session = this.findRecordByIdInStorage(this._data.id);
                if (session && Object.keys(session).includes("lines")) { this._data.lines = session.lines; }
            }
            else if (this.currentUser.useServerStorage) { //request from server
            }
        }
        this._data.lastOpened = this.now;
        this._save();
        return this._data.lines;
    }
    set lines(lines) {
        if (JSON.stringify(lines) != JSON.stringify(this._data.lines)) {
//            console.log(this._data.lines, lines);
            //console.log("_setLines(" + lines + ") for " + this._data.creation);
            this._data.lines = lines;
            this._update();
        }
    }

    set name(name) { return; }
    get name() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const d = new Date(this._data.creation * 1000);
        const year = String(d.getFullYear());
        const month = months[d.getMonth()];
        const day = String(d.getDate());
        const hour = String((d.getHours() > 12) ? d.getHours() - 12 : d.getHours()).padStart(2, '0');
        const minute = String(d.getMinutes()).padStart(2, '0');
        const second = String(d.getSeconds()).padStart(2, '0');
        const ampm = String((d.getHours() > 12) ? "PM" : "AM");
        return `${month} ${day} ${year} ${hour}:${minute}:${second}${ampm}`;
    }

    _newData(id) {
        var issueId = this.parent.id;
        var creation = this.now;
        return {
            id: id,
            issueId: issueId,
            creation: creation,
            lastEdited: null,
            lastOpened: null,
            lines: []
        }
    }

    _postLoad() {
        this._data.lines = [];
    }
}