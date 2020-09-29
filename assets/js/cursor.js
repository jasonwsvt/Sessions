/* session has a lines instance and a cursor and allows for entering data
*/

class Cursor {
    _lines = null;
    _cursorCode = "<h2 id = 'cursor'>|</h2>";
    _typedElementCode = "<button type='button' class='btn btn-light typed'></button>";
    _cursor = null;
    _cursorX = null;

    constructor(lines) {
        const self = this;
        this._lines = lines;
        this._lines.appendToLine(0, this._cursorCode);
        this._cursor = $("#cursor");

        $(document).ready(function() {
            Mousetrap.bind(['up'], function(e)        { self.up;          return false; });
            Mousetrap.bind(['down'], function(e)      { self.down;        return false; });
            Mousetrap.bind(['left'], function(e)      { self.left;        return false; });
            Mousetrap.bind(['right'], function(e)     { self.right;       return false; });
            Mousetrap.bind(['home'], function(e)      { self.home;        return false; });
            Mousetrap.bind(['end'], function(e)       { self.end;         return false; });
            Mousetrap.bind(['pageup'], function(e)    { self.pageup;      return false; });
            Mousetrap.bind(['pagedown'], function(e)  { self.pagedown;    return false; });
            Mousetrap.bind(['backspace'], function(e) { self.backspace;   return false; });
            Mousetrap.bind(['del'], function(e)       { self.delete;      return false; });
            Mousetrap.bind(['enter'], function(e)     { self.enter;       return false; });
            $(document).on("keypress", function(e)    { self.type(e.key); return false; });
        });
    }

    get linesID() { return this._lines.ID; }

    get linesDiv() { return this._lines.div; }

    get linesInstance() { return this._lines; }

    get lastEdited() { return this._lastEditedTimestamp; }

    get lineIndex() { return this._lineIndex; }
    get elementIndex() { return this._cursorIndex; }

    get _prevElementIndex()  { return this._cursorIndex - 1; }
    get _prevElementExists() { return this._lines.elementExists(this._lineIndex, this._prevElementIndex); }
    get _prevElement()       { return this._lines.element(this._lineIndex, this._prevElementIndex); }
    get _removePrevElement() { console.log("removePrevElement"); this._lines.removeElement(this._lineIndex, this._prevElementIndex); }

    get _elementsBefore()    { console.log("elementsBefore"); return this._lines.elementsBefore(this._lineIndex, this._cursorIndex); }
    _addElementBefore(e)     { this._lines.insertBefore(this._lineIndex, this._cursorIndex, e); }
    get _cursorIndex()       { return this._cursor.index(); }
    get _detachCursor()      { return this._cursor.detach(); }
    get _detachCursorToEnd() { console.log("detachCursorToEnd"); return this._lines.detachElementToEnd(this._lineIndex, this._cursorIndex); }
    _addElementAfter(e)      { this._lines.insertAfter(this._lineIndex, this._cursorIndex, e); }
    get _elementsAfter()     { console.log("ElementsAfter"); return this._lines.elementsAfter(this._lineIndex, this._cursorIndex); }

    get _nextElementIndex()  { return this._cursorIndex + 1; }
    get _nextElementExists() { return this._lines.elementExists(this._lineIndex, this._nextElementIndex); }
    get _nextElement()       { return this._lines.element(this._lineIndex, this._nextElementIndex); }
    get _removeNextElement() { console.log("removeNextElement"); this._lines.removeElement(this._lineIndex, this._nextElementIndex); }

    get _prevLineIndex()     { return this._lineIndex - 1; }
    get _prevLineExists()    { return this._lines.lineExists(this._prevLineIndex); }
    get _prevLine()          { return this._lines.line(this._prevLineIndex); }
    get _prevLineLength()    { return this._lines.lineLength(this._prevLineIndex); }

    get _insertLineAbove()   { console.log("insertLineAbove"); this._lines.insertLineBefore(this._lineIndex); }
    get _lineIndex()         { return this._cursor.parent().index(); }
    get _lineLength()        { return this._lines.lineLength(this._lineIndex); }
    get _line()              { return this._lines.line(this._lineIndex); }
    get _insertLineBelow()   { this._lines.insertLineAfter(this._lineIndex); }

    get _nextLineIndex()     { return this._lineIndex + 1; }
    get _nextLineExists()    { return this._lines.lineExists(this._nextLineIndex); }
    get _nextLine()          { return this._lines.line(this._nextLineIndex); }
    get _nextLineLength()    { return this._lines.lineLength(this._nextLineIndex); }

    get _lastElementIndex()  { return this._lineLength - 1; }
    get _lastLineIndex()     { return this._lines.numLines - 1; }

    get _cursorX()           { return this._cursorX; }
    _setCursorX()            { this._cursorX = this._lines.distanceToElement(this._lineIndex, this._cursorIndex); }

    get _prevLineClosestIndex() {
        console.log("prevLineClosestIndex " + this._prevLineIndex + " " + this._cursorX);
        return this._lines.closestIndex(this._prevLineIndex, this._cursorX);
    }

    get _nextLineClosestIndex() {
        console.log("nextLineClosestIndex " + this._nextLineIndex + " " + this._cursorX);
        return this._lines.closestIndex(this._nextLineIndex, this._cursorX);
    }

    manageHiddenCursor() {
        //return true if top of cursor is below the bottom of the lines div,
        //or the bottom of the cursor is above the top of the lines div
        const container = $("#" + this.linesID);
        const containerTop = container.scrollTop();
        const containerBottom = containerTop + container.height();
        const elementTop = this._cursor.offset().top - container.position().top + containerTop;
        const elementBottom = elementTop + this._cursor.outerHeight();
        if (elementTop < containerTop || elementBottom > containerBottom) {
            this._line[0].scrollIntoView({behavior: "smooth", block: "nearest"});
        }
    }

    get left() {
        if (this._cursorIndex > 0) {
            const prevElementIndex = this._prevElementIndex;
            const lineIndex = this._lineIndex;
            this._lines.insertBefore(lineIndex, prevElementIndex, this._detachCursor);
        }
        else if (this._prevLineExists) {
            const lineIndex = this._prevLineIndex;
            this._lines.appendToLine(lineIndex, this._detachCursor);
        }
        this.manageHiddenCursor();
        this._setCursorX();
    }

    get right() {
        if (this._cursorIndex < this._lastElementIndex) {
            const nextElementIndex = this._cursorIndex;  // same after cursor is detached
            const lineIndex = this._lineIndex;
            this._lines.insertAfter(lineIndex, nextElementIndex, this._detachCursor);
        }
        else if (this._nextLineExists) {
            const lineIndex = this._nextLineIndex;
            this._lines.prependToLine(lineIndex, this._detachCursor);
        }
        this.manageHiddenCursor();
        this._setCursorX();
    }

    //if it's the first row, do home function
    //find the element in previous line whose sum of all previous outer widths is equal or greater than _cursorX
    //if it's not equal, get the value for the width minus the width of the current element
    //if _cursorX is closer to the left, add it before the element, otherwise add it after
    get up() {
        console.log("up");
        if (!this._prevLineExists) {if (this._prevElementExists) { this.home; } }
        else {
            const x = this._prevLineClosestIndex;
            console.log("this._prevLineClosestIndex: " + x);
            if (x == this._prevLineLength) {
                this._lines.appendToLine(this._prevLineIndex, this._detachCursor);
            }
            else {
                this._lines.insertBefore(this._prevLineIndex, x, this._detachCursor);
            }
        }
        this.manageHiddenCursor();
    }

    //if it's the last row, do end function
    //find the element in next line whose sum of all previous outer widths is equal or greater than _cursorX
    //if it's not equal, get the value for the width minus the width of the current element
    //if _cursorX is closer to the left, add it before the element, otherwise add it after
    get down() {
        console.log("down");
        if (!this._nextLineExists) { if (this._nextElementExists) { this.end; } }
        else {
            const x = this._nextLineClosestIndex;
            console.log("this._nextLineClosestIndex: " + x);
            if (x == this._nextLineLength) {
                console.log("insert at end of line");
                this._lines.appendToLine(this._nextLineIndex, this._detachCursor);
            }
            else {
                console.log("insert before element " + x);
                this._lines.insertBefore(this._nextLineIndex, x, this._detachCursor);
            }
        }
        this.manageHiddenCursor();
    }

    //can't enter on a blank line
    //add a line below
    //move detached cursor and all following elements to the next line
    get enter() {
        if (this._lineLength > 1
            && (this._prevElementExists
                || (!this._prevElementExists && this._prevLineExists && this._prevLineLength))
            && (this._nextElementExists
                || (!this._nextElementExists
                    && (!this._nextLineExists || (this._nextLineExists && this._nextLineLength))))) {
            console.log("this line has content and the next line either doesn't exist or has content");
            this._insertLineBelow;
            this._lines.appendToLine(this._nextLineIndex, this._detachCursorToEnd);
        }
        this.manageHiddenCursor();
        this._setCursorX();
    }

    //remove previous element if it exists
    //otherwise, move whole line to previous line, if it exists
    get backspace() {
        if (this._prevElementExists) {
            if (!this._prevElement.hasClass("typed") || (this._prevElement.hasClass("typed") && !this._prevElement.hasClass("space") && this._prevElement.text().length <= 1)) {
                this._lines.removeElement(this._lineIndex, this._prevElementIndex);
            }
            else {
                if (this._prevElement.hasClass("space")) {
                    this._prevElement.removeClass("space");
                }
                else {
                    this._prevElement.text(this._prevElement.text().slice(0,-1));
                }
            }
        }
        else if (this._prevLineExists) {
            this._lines.appendToLine(this._prevLineIndex, this._detachCursorToEnd);
            this._lines.removeLine(this._nextLineIndex);
        }
        this.manageHiddenCursor();
        this._setCursorX();
    }

    //if the subseqent element exits,
    //if the subsequent element is typed and has no contents, or is not typed, remove it
    //if the subsequent element is typed and has contents, delete the first character
    //if no subsequent element exists, but the next line exists, move contents of below line to current line
    get delete() {
        console.log("delete");
        if (this._nextElementExists) {
            console.log("next element exists");
            if (!this._nextElement.hasClass("typed") || (this._nextElement.hasClass("typed") && this._nextElement.text().length == 1)) {
                console.log("next element not typed or (is typed but has only one character)");
                this._lines.removeElement(this._lineIndex, this._nextElementIndex);
            }
            else {
                console.log("next element is typed and has more than one character");
                this._nextElement.text(this._nextElement.text().slice(1));
            }
        }
        else if (this._nextLineExists) {
            console.log("next line exists");
            this._lines.appendToLine(this._lineIndex, this._lines.detachLine(this._nextLineIndex));
            this._lines.removeLine(this._nextLineIndex);
        }
        this._setCursorX();
    }

    //move cursor to beginning of line
    get home() {
        console.log("home");
        this._lines.prependToLine(this._lineIndex, this._detachCursor);
        this.manageHiddenCursor();
        this._setCursorX();
    }

    //move cursor to end of line
    get end() {
        console.log("end");
        this._lines.appendToLine(this._lineIndex, this._detachCursor);
        this.manageHiddenCursor();
        this._setCursorX();
    }

    //do up a certain number of times
    get pageup() {
        var n;
        console.log("pageup");
        if (this._lineIndex >= this._numVisibleLines) { n = this._numVisibleLines; }
        else { n = this._lineIndex; }
        for (i = 0; i < n; i--) { this.up; }
        this.manageHiddenCursor();
    }

    //do down a certain number of times
    get pagedown() {
        var n;
        console.log("pagedown");
        if (this._lineIndex + this._numVisibleLines < this._lines.numLines) { n = this._numVisibleLines; }
        else { n = this._lines.numLines - 1; }
        for (i = 0; i < n; i--) { this.down; }
        this.manageHiddenCursor();
    }

    //if the character is a space and there's a typed element before, add a space class to it.
    //otherwise, if there's an element before the cursor, add to the end of it
    //otherwise, add a new element before the cursor with x inside
    type(x) {
        if (!this._prevElementExists ||                    //If no previous element exists,
            (x != " " && this._prevElementExists &&        //or if one _does_ exist, x is not a " ",
                (this._prevElement.hasClass("space") ||    //it either has a space at the end, or
                !this._prevElement.hasClass("typed")))) {  //it's not typed
                this._addElementBefore(this._typedElementCode);    //then add a typed element before
        }
        if (x == " ") {
            if (this._prevElementExists &&
            this._prevElement.hasClass("typed") &&
            !this._prevElement.hasClass("space")) {
                this._prevElement.addClass("space");
            }
        }
        else {
                this._prevElement.text(this._prevElement.text() + x);                   //Append x to the previous element.
                this._setCursorX();
            }
        this.manageHiddenCursor();
    }
}