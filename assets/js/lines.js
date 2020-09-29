/* Lines: functions for hosting several Line objects
   Line: functions for hosting a single list of elements
*/

class Lines {
    _containerID = null;
    _container = null;
    _lineCode = "<div></div>";
    _lastEditedTimestamp = null;

    constructor(cID) {
        this._containerID = cID;
        this._container = $("#" + this._containerID);
        this._container.append(this._lineCode);
    }

    get lastEdited() {
        return this._lastEditedTimestamp;
    }

    updateLastEditedTimestamp() {
        this._lastEditedTimestamp = Math.floor(Date.now() / 1000);
    }

    get numLines() {
        return this._container.children().length;
    }

    lineExists(i) {
        return (i >= 0 && i < this.numLines);
    }

    line(i) {
        return (this.lineExists(i)) ? this._container.children().eq(i) : null;
    }

    lineLength(i) {
        return (this.lineExists(i)) ? this.line(i).children().length : null;
    }

    removeLine(i) {
        this.updateLastEditedTimestamp();
        if (this.lineExists(i)) { console.log("this.line(" + i + ").remove();"); }
        if (this.lineExists(i)) { return this.line(i).detach(); }
    }
    detachLine(i) {
        if (this.lineExists(i)) { console.log("this.line(" + i + ").children().detach();"); }
        if (this.lineExists(i)) { return this.line(i).children().detach(); }
    }

    prependToLine(i, e) {
        this.updateLastEditedTimestamp();
        if (this.lineExists(i)) { console.log("this.line(" + i + ").prepend(" + e + ");"); }
        if (this.lineExists(i)) { this.line(i).prepend(e); }
    }

    appendToLine(i, e) {
        this.updateLastEditedTimestamp();
        if (this.lineExists(i)) { this.line(i).append($(e)); }
    }

    insertLineAfter(i) {
        this.updateLastEditedTimestamp();
        if (this.lineExists(i)) { console.log("this.line(" + i + ").after(" + this._lineCode + "));"); }
        if (this.lineExists(i)) { this.line(i).after(this._lineCode); }
    }

    insertLineBefore(i) {
        this.updateLastEditedTimestamp();
        if (this.lineExists(i)) { console.log("this.line(" + i + ").before(" + this._lineCode + "));"); }
        if (this.lineExists(i)) { this.line(i).before(this._lineCode); }
    }

    elementExists(i, x) {
        return (this.lineExists(i) && x >= 0 && x < this.lineLength(i));
    }

    element(i, x) {
        return (this.elementExists(i,x)) ? this.line(i).children().eq(x) : null;
    }

    removeElement(i, x) {
        this.updateLastEditedTimestamp();
        if (this.elementExists(i, x)) { console.log("this.line(" + i + ").children().eq(" + x + ").remove();"); }
        if (this.elementExists(i,x)) { this.line(i).children().eq(x).remove(); }
    }

    elementsBefore(i, x) {
        return (this.elementExists(i, x)) ? this.line(i).children().eq(x).prevAll() : null;
    }

    elementsAfter(i, x) {
        return (this.elementExists(i, x)) ? this.line(i).children().eq(x).nextAll() : null;
    }

    insertAfter(i, x, e) {
        console.log("insertAfter");
        this.updateLastEditedTimestamp();
        if (this.elementExists(i, x)) { this.line(i).children().eq(x).after(e); }
    }

    insertBefore(i, x, e) {
        this.updateLastEditedTimestamp();
        if (this.elementExists(i, x)) { this.line(i).children().eq(x).before(e); }
    }

    detachElementToEnd(i, x) {
        if (this.elementExists(i, x)) {
            if (x == 0) {
                console.log("detaching while line");
                return this.detachLine(i);
            }
            else if (x > 0) {
                return this.elementsAfter(i, x - 1).detach();
            }
        }
    }

    distanceToElement(i, x) {
        let width = 0;
        if (this.elementExists(i, x)) {
            if (x == 0) { return 0; }
            else {
                this.elementsBefore(i, x).each(function(index) {
                    width += parseInt($(this).outerWidth(), 10);
                });
            }
        }
        return width;
    }

    closestIndex(i, width) {
        var x, rWidth = 0, lWidth = 0;
        if (this.lineExists(i)) {
            if (this.lineLength(i) == 0) { return 0; }
            for (x = 0; x < this.lineLength(i); x++) {
                lWidth = this.distanceToElement(i, x);
                rWidth = lWidth + this.element(i,x).outerWidth();
                if (rWidth >= width || x == this.lineLength(i) - 1) { break; }
            }
            if (Math.abs(width - lWidth) < Math.abs(rWidth - width)) {
                return x;
            }
            else {
                return x + 1;
            }
        }
        else { return false; }
    }
}