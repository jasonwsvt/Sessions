/* Lines: functions for hosting several Line objects
   Line: functions for hosting a single list of elements
*/

class Lines {
    _containerID = null;
    _lineCode = "<div></div>";
    _sessionsObject = null;
    _creation = null;

    constructor(cID, sessions) {
        this._containerID = cID;
        this._sessionsObject = sessions;
    }

    get ID()         { return this._containerID; }
    get div()        { return $("#" + this._containerID); }
    get sessions()   { return this._sessionsObject; }
    get session()    { //console.log(this._creation, this.sessions.session(this._creation)); 
                       return this.sessions.session(this._creation); }

    get numLines()        { return this.div.children().length; }
    lineExists(i)         { return (i >= 0 && i < this.numLines); }
    elementExists(i, x)   { return (this.lineExists(i) && x >= 0 && x < this.lineLength(i)); }
    line(i)               { return (this.lineExists(i)) ? this.div.children().eq(i) : null; }
    lineLength(i)         { return (this.lineExists(i)) ? this.line(i).children().length : null; }
    removeLine(i)         { return (this.lineExists(i)) ? this.line(i).detach() : null; }
    detachLine(i)         { return (this.lineExists(i)) ? this.line(i).children().detach() : null; }
    prependToLine(i, e)   { return (this.lineExists(i)) ? this.line(i).prepend(e) : null; }
    appendToLine(i, e)    { return (this.lineExists(i)) ? this.line(i).append($(e)) : null; }
    insertLineAfter(i)    { return (this.lineExists(i)) ? this.line(i).after(this._lineCode) : null; }
    insertLineBefore(i)   { return (this.lineExists(i)) ? this.line(i).before(this._lineCode) : null; }
    element(i, x)         { return (this.elementExists(i, x)) ? this.line(i).children().eq(x) : null; }
    elementsBefore(i, x)  { return (this.elementExists(i, x)) ? this.element(i, x).prevAll() : null; }
    elementsAfter(i, x)   { return (this.elementExists(i, x)) ? this.element(i, x).nextAll() : null; }
    removeElement(i, x)   { return (this.elementExists(i, x)) ? this.element(i, x).remove() : null; }
    insertAfter(i, x, e)  { return (this.elementExists(i, x)) ? this.element(i, x).after(e) : null; }
    insertBefore(i, x, e) { return (this.elementExists(i, x)) ? this.element(i, x).before(e) : null; }

    detachElementToEnd(i, x) { 
        if (this.elementExists(i, x)) {
            if (x == 0) {
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
        var x, rWidth, lWidth;
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

    get linesArray() {
        var i, linesArray = [];
        for (var i = 0; i < this.numLines; i++) {
            linesArray.push(this.line(i)[0].outerHTML);
        }
        return linesArray;
    }

    load(creation) {
//        console.trace();
        const self = this;
        if (this._creation) { this.session.lines = this.linesArray; }
        this._creation = creation;
        const lines = this.session.lines;
//        console.log("load: " + this._creation, typeof this._creation, this.session.lines);
        this.div.empty();
        if (lines.length) {
            lines.forEach(function(line) {
                self.div.append(line);
            });
        }
        else {
            this.div.append(this._lineCode);
        }
    }

    get height() {
        return this.div.css("height");
    }

    set height(height) {
        this.div.css("height", height);
    }
}