/* session has a lines instance and a cursor and allows for entering data
*/

class Session {
    _lines = null;
    _cursorCode = "<span id = 'cursor'></span>";
    _cursor = null;
    _indent = 50;
    _session = null;
    _issue = null;
    _lastEditedTimestamp = null;
    _creationTimestamp = null;

    constructor(linesID) {
        this._lines = new Lines(linesID);
        this._cursor = new Cursor(this._lines);
        const self = this;
        this._creationTimestamp = Math.floor(Date.now() / 1000);

        $(document).ready(function() {
            Mousetrap.bind(['tab'], function(e)       { self.indentLine;  return false; });
            Mousetrap.bind(['shift+tab'], function(e) { self.outdentLine; return false; });
    
            $(document).on("keyup", function(e) {
                if (!self.lastEdited || self.lastEdited < lines.lastEdited) {
                    self.setLastEdited(lines.lastEdited);
                }

                if (e.key === "Enter" && self.cursorLineIndex > 0) {
                    lines.line(self.cursorLineIndex).css("paddingLeft", 
                        lines.line(self.cursorLineIndex - 1).css("paddingLeft"));
                }
            });

        });
    }

    get lastEdited()         { return this._lastEditedTimestamp; }
    setLastEdited(ts)        { this._lastEditedTimestamp = ts; }
    get creation()           { return this._creationTimestamp; }
    get linesInstance()      { return this._lines; }
    get linesID()            { return this._lines.ID; }
    get linesDiv()           { return this._lines.div; }
    get cursorLineIndex()    { return this._cursor.lineIndex; }
    get cursorElementIndex() { return this._cursor.elementIndex; }

    insertButton(e) {
        console.log(this.cursorLineIndex + " " + this.cursorElementIndex + " " + e);
        this._lines.insertBefore(this.cursorLineIndex, this.cursorElementIndex, e);
    }

    get indentLine() {
        if (this._cursor.lineIndex != 0) {
            const prevLinePadding = parseInt(this._lines.line(this._cursor.lineIndex - 1).css("paddingLeft"));
            const curLinePadding = parseInt(this._lines.line(this._cursor.lineIndex).css("paddingLeft"));
            if (curLinePadding <= prevLinePadding) {
                this._lines.line(this._cursor.lineIndex).css("paddingLeft",
                    String(curLinePadding + this._indent) + "px");
            }
        }
    }

    get outdentLine() {
        const curLinePadding = parseInt(this._lines.line(this._cursor.lineIndex).css("paddingLeft"));
        if (curLinePadding >= this._indent) {
            this._lines.line(this._cursor.lineIndex).css("paddingLeft",
                String(curLinePadding - this._indent) + "px");
        }
    }

    get height() {
        return this.linesDiv.css("height");
    }

    set height(height) {
        this.linesDiv.css("height", height);
    }
}