class Session extends Sibling {
    constructor(app, sessions) {
        super(app, sessions);
        this._type = "session";
    }

    get sessions()         { return this._siblings; }

    get creation()         { return this._data.creation; }

    get parentId()         { return (this._data.issueId) ? this._data.issueId : null; }
    set parentId(parentId) {
        if (this._data.issueId && this._data.issueId != parentId) {
            this._data.issueId = parentId; this._save();
        }
    }

    get lines() {
        var session;
        console.log("loading lines for", this._data.id);
        if (this._data.lines.length == 0) {
            //On the off-chance the app crashed and on reload the push to storage didn't catch them yet
            if (this.updateExists) {
                console.log(this.update);
                this._data.lines = this.update.find(entry => (entry.id == this._data.id)).lines;
            }
            else if (this.storageExists) {
                this._data.lines = this.storage.find(entry => (entry.id == this._data.id)).lines;
            }
            else if (this.currentUser.useServerStorage) { //request from server

            }
            return (this._data.lines) ? this._data.lines : [];
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
            this._data.lastEdited = this.now;
            this._save();
        }
    }

    set name(name) { pass; }
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