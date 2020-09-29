/* session has a lines instance and a cursor and allows for entering data
*/

class Session {
    _linesObject = null;
    _linesID = null;
    _lines = null;
    _cursorCode = "<span id = 'cursor'></span>";
    _cursor = null;
    _indent = 50;
    _session = null;
    _issue = null;
    _lastEditedTimestamp = null;

    constructor(linesObject, linesID, bufferID) {
        this._linesObject = linesObject;
        this._linesID = linesID;
        this._lines = $("#" + linesID);
        this._bufferID = bufferID;
        this._buffer = $("#" + bufferID);
        this._cursor = new Cursor(this._linesObject, this._linesID);
        const self = this;

        $(document).ready(function() {
            Mousetrap.bind(['tab'], function(e)       { self.indentLine;  return false; });
            Mousetrap.bind(['shift+tab'], function(e) { self.outdentLine; return false; });
    
            $(document).on("keyup", function(e) {
                if (!self.lastEdited || self.lastEdited < linesObject.lastEdited) {
                    self.setLastEdited(linesObject.lastEdited);
                }

                if (e.key === "Enter" && self.cursorLineIndex > 0) {
                    linesObject.line(self.cursorLineIndex).css("paddingLeft", 
                        linesObject.line(self.cursorLineIndex - 1).css("paddingLeft"));
                }
            });

        });
    }

    insertButton(e) {
        console.log(this.cursorLineIndex + " " + this.cursorElementIndex + " " + e);
        this._linesObject.insertBefore(this.cursorLineIndex, this.cursorElementIndex, e);
    }

    setLastEdited(ts) {
        this._lastEditedTimestamp = ts;
    }

    get lastEdited() {
        return this._lastEditedTimestamp;
    }

    get cursorLineIndex() {
        return this._cursor.lineIndex;
    }

    get cursorElementIndex() {
        return this._cursor.elementIndex;
    }

    get lastEdited() {
        return this._lastEditedTimestamp;
    }

    get indentLine() {
        if (this._cursor.lineIndex != 0) {
            const prevLinePadding = parseInt(this._linesObject.line(this._cursor.lineIndex - 1).css("paddingLeft"));
            const curLinePadding = parseInt(this._linesObject.line(this._cursor.lineIndex).css("paddingLeft"));
            if (curLinePadding <= prevLinePadding) {
                this._linesObject.line(this._cursor.lineIndex).css("paddingLeft",
                    String(curLinePadding + this._indent) + "px");
            }
        }
    }

    get outdentLine() {
        const curLinePadding = parseInt(this._linesObject.line(this._cursor.lineIndex).css("paddingLeft"));
        if (curLinePadding >= this._indent) {
            this._linesObject.line(this._cursor.lineIndex).css("paddingLeft",
                String(curLinePadding - this._indent) + "px");
        }
    }

    get height() {
        return this._lines.css("height");
    }

    set height(height) {
        this._lines.css("height", height);
    }
}