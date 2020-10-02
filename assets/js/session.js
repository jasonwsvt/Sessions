/* session has a lines instance and a cursor and allows for entering data
*/

class Session {
    _linesObject = null;
    _cursor = null;
    _indent = 50;
    _issue = null;
    _lastEditedTimestamp = null;

    constructor(linesID, linesArray) {
        const self = this;
        this._linesObject = new Lines(linesID, linesArray);
        this._cursor = new Cursor(this.lines);
        this.setLastEdited();

        $(document).ready(function() {
            Mousetrap.bind(['tab'], function(e)       { self.indentLine;  return false; });
            Mousetrap.bind(['shift+tab'], function(e) { self.outdentLine; return false; });
    
            $(document).on("keyup", function(e) {
                self.setLastEdited();

                if (e.key === "Enter" && self.cursorLineIndex > 0) {
                    self.lines.line(self.cursorLineIndex).css("paddingLeft", 
                        self.lines.line(self.cursorLineIndex - 1).css("paddingLeft"));
                }
            });

        });
    }

    get lastEdited()         { return this._lastEditedTimestamp; }
    setLastEdited()          { this._lastEditedTimestamp = Math.floor(Date.now() / 1000); }
    get creation()           { return this._creationTimestamp; }
    get lines()              { return this._linesObject; }
    get cursorLineIndex()    { return this._cursor.lineIndex; }
    get cursorElementIndex() { return this._cursor.elementIndex; }

    insertButton(e) {
        console.log(this.cursorLineIndex + " " + this.cursorElementIndex + " " + e);
        this.lines.insertBefore(this.cursorLineIndex, this.cursorElementIndex, e);
    }

    get indentLine() {
        if (this._cursor.lineIndex != 0) {
            const prevLinePadding = parseInt(this.lines.line(this._cursor.lineIndex - 1).css("paddingLeft"));
            const curLinePadding = parseInt(this.lines.line(this._cursor.lineIndex).css("paddingLeft"));
            if (curLinePadding <= prevLinePadding) {
                this.lines.line(this._cursor.lineIndex).css("paddingLeft",
                    String(curLinePadding + this._indent) + "px");
            }
        }
    }

    get outdentLine() {
        const curLinePadding = parseInt(this.lines.line(this._cursor.lineIndex).css("paddingLeft"));
        if (curLinePadding >= this._indent) {
            this.lines.line(this._cursor.lineIndex).css("paddingLeft",
                String(curLinePadding - this._indent) + "px");
        }
    }

    get height() {
        return this.lines.div.css("height");
    }

    set height(height) {
        this.lines.div.css("height", height);
    }
}