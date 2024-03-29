/* session has a lines instance and a cursor and allows for entering data
*/

class Cursor {
    constructor(editor) {
        const self = this;
        this._editor = editor;
        this._cursorID = "cursor";
        this._cursorCode = "<h4 id = '" + this._cursorID + "'>|</h4>";
        this._typedElementCode = "<button type='button' class='btn btn-light typed'></button>";
        this._indent = 50;
        this.checkForCursor();

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
            Mousetrap.bind(['tab'], function(e)       { self.indentLine;  return false; });
            Mousetrap.bind(['shift+tab'], function(e) { self.outdentLine; return false; });
    
//            $(document).on("keyup", function(e) {
//                if (e.key === "Enter" && self.cursorLineIndex > 0) {
//                    self.lines.line(self.cursorLineIndex).css("paddingLeft", 
//                        self.lines.line(self.cursorLineIndex - 1).css("paddingLeft"));
//                }
//            });
        });
    }

//    set numVisibleLines(num) { this._numVisibleLines = num; }
    get lines()              { return this._editor.lines; }
    get linesID()            { return this.lines.ID; }
    get linesDiv()           { return this.lines.div; }

    get cursor()             { return $("#cursor"); }
    get lineIndex()          { return this._lineIndex; }
    get elementIndex()       { return this._cursorIndex; }
    checkForCursor()         { if (!this.cursor.length) { this.lines.appendToLine(0, this._cursorCode); } }

    get _prevElementIndex()  { return this._cursorIndex - 1; }
    get _prevElementExists() { return this.lines.elementExists(this._lineIndex, this._prevElementIndex); }
    get _prevElement()       { return this.lines.element(this._lineIndex, this._prevElementIndex); }
    get _removePrevElement() { this.lines.removeElement(this._lineIndex, this._prevElementIndex); }

    get _elementsBefore()    { return this.lines.elementsBefore(this._lineIndex, this._cursorIndex); }
    _addElementBefore(e)     { this.lines.insertBefore(this._lineIndex, this._cursorIndex, e); }
    get _cursorIndex()       { return this.cursor.index(); }
    get _detachCursor()      { return this.cursor.detach(); }
    get _detachCursorToEnd() { return this.lines.detachElementToEnd(this._lineIndex, this._cursorIndex); }
    _addElementAfter(e)      { this.lines.insertAfter(this._lineIndex, this._cursorIndex, e); }
    get _elementsAfter()     { return this.lines.elementsAfter(this._lineIndex, this._cursorIndex); }

    get _nextElementIndex()  { return this._cursorIndex + 1; }
    get _nextElementExists() { return this.lines.elementExists(this._lineIndex, this._nextElementIndex); }
    get _nextElement()       { return this.lines.element(this._lineIndex, this._nextElementIndex); }
    get _removeNextElement() { this.lines.removeElement(this._lineIndex, this._nextElementIndex); }

    get _prevLineIndex()     { return this._lineIndex - 1; }
    get _prevLineExists()    { return this.lines.lineExists(this._prevLineIndex); }
    get _prevLine()          { return this.lines.line(this._prevLineIndex); }
    get _prevLineLength()    { return this.lines.lineLength(this._prevLineIndex); }

    get _insertLineAbove()   { this.lines.insertLineBefore(this._lineIndex); }
    get _lineIndex()         { return this.cursor.parent().index(); }
    get _lineLength()        { return this.lines.lineLength(this._lineIndex); }
    get _line()              { return this.lines.line(this._lineIndex); }
    get _insertLineBelow()   { this.lines.insertLineAfter(this._lineIndex); }

    get _nextLineIndex()     { return this.lineIndex + 1; }
    get _nextLineExists()    { return this.lines.lineExists(this._nextLineIndex); }
    get _nextLine()          { return this.lines.line(this._nextLineIndex); }
    get _nextLineLength()    { return this.lines.lineLength(this._nextLineIndex); }

    get _lastElementIndex()  { return this._lineLength - 1; }
    get _lastLineIndex()     { return this.lines.numLines - 1; }

    _setCursorX()            { this._cursorX = this.lines.distanceToElement(this._lineIndex, this._cursorIndex); }

    get _prevLineClosestIndex() {
        //console.log("prevLineClosestIndex " + this._prevLineIndex + " " + this._cursorX);
        return this.lines.closestIndex(this._prevLineIndex, this._cursorX);
    }

    get _nextLineClosestIndex() {
        //console.log("nextLineClosestIndex " + this._nextLineIndex + " " + this._cursorX);
        return this.lines.closestIndex(this._nextLineIndex, this._cursorX);
    }

    manageHiddenCursor() {
        //if top of cursor is below the bottom of the lines div,
        //or the bottom of the cursor is above the top of the lines div
        //scroll the cursor into view
        const container = $("#" + this.linesID);
        const containerTop = container.scrollTop();
        const containerBottom = containerTop + container.height();
        const elementTop = this.cursor.offset().top - container.position().top + containerTop;
        const elementBottom = elementTop + this.cursor.outerHeight();
        if (elementTop < containerTop || elementBottom > containerBottom) {
            this._line[0].scrollIntoView({behavior: "smooth", block: "nearest"});
        }
    }

    get left() {
        if (this._cursorIndex > 0) {
            const prevElementIndex = this._prevElementIndex;
            const lineIndex = this._lineIndex;
            this.lines.insertBefore(lineIndex, prevElementIndex, this._detachCursor);
        }
        else if (this._prevLineExists) {
            const lineIndex = this._prevLineIndex;
            this.lines.appendToLine(lineIndex, this._detachCursor);
        }
        this.manageHiddenCursor();
        this._setCursorX();
    }

    get right() {
        if (this._cursorIndex < this._lastElementIndex) {
            const nextElementIndex = this._cursorIndex;  // same after cursor is detached
            const lineIndex = this._lineIndex;
            this.lines.insertAfter(lineIndex, nextElementIndex, this._detachCursor);
        }
        else if (this._nextLineExists) {
            const lineIndex = this._nextLineIndex;
            this.lines.prependToLine(lineIndex, this._detachCursor);
        }
        this.manageHiddenCursor();
        this._setCursorX();
    }

    //if it's the first row, do home function
    //find the element in previous line whose sum of all previous outer widths is equal or greater than _cursorX
    //if it's not equal, get the value for the width minus the width of the current element
    //if _cursorX is closer to the left, add it before the element, otherwise add it after
    get up() {
        //console.log("up");
        if (!this._prevLineExists) {if (this._prevElementExists) { this.home; } }
        else {
            const x = this._prevLineClosestIndex;
            //console.log("this._prevLineClosestIndex: " + x);
            if (x == this._prevLineLength) {
                this.lines.appendToLine(this._prevLineIndex, this._detachCursor);
            }
            else {
                this.lines.insertBefore(this._prevLineIndex, x, this._detachCursor);
            }
        }
        this.manageHiddenCursor();
    }

    //if it's the last row, do end function
    //find the element in next line whose sum of all previous outer widths is equal or greater than _cursorX
    //if it's not equal, get the value for the width minus the width of the current element
    //if _cursorX is closer to the left, add it before the element, otherwise add it after
    get down() {
        //console.log("down");
        if (!this._nextLineExists) { if (this._nextElementExists) { this.end; } }
        else {
            const x = this._nextLineClosestIndex;
            //console.log("this._nextLineClosestIndex: " + x);
            if (x == this._nextLineLength) {
                //console.log("insert at end of line");
                this.lines.appendToLine(this._nextLineIndex, this._detachCursor);
            }
            else {
                //console.log("insert before element " + x);
                this.lines.insertBefore(this._nextLineIndex, x, this._detachCursor);
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
            this._insertLineBelow;
            this.lines.appendToLine(this._nextLineIndex, this._detachCursorToEnd);
            if (parseInt(this.lines.line(this._prevLineIndex).css("paddingLeft")) >= this._indent) {
                this.lines.line(this._lineIndex).css("paddingLeft", 
                    this.lines.line(this._prevLineIndex).css("paddingLeft"));
            }
        }
        this.manageHiddenCursor();
        this._setCursorX();
    }

    //remove previous element if it exists
    //otherwise, move whole line to previous line, if it exists
    get backspace() {
        if (this._prevElementExists) {
            if (!this._prevElement.hasClass("typed") || 
                (this._prevElement.hasClass("typed") &&
                 ((!this._prevElement.hasClass("space") && this._prevElement.text().length == 1) ||
                  (this._prevElement.hasClass("space") && this._prevElement.text().length == 0)))) {
                this.lines.removeElement(this._lineIndex, this._prevElementIndex);
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
            this.lines.appendToLine(this._prevLineIndex, this._detachCursorToEnd);
            this.lines.removeLine(this._nextLineIndex);
        }
        this.manageHiddenCursor();
        this._setCursorX();
    }

    //if the subseqent element exits,
    //if the subsequent element is typed and has no contents, or is not typed, remove it
    //if the subsequent element is typed and has contents, delete the first character
    //if no subsequent element exists, but the next line exists, move contents of below line to current line
    get delete() {
        //console.log("delete");
        if (this._nextElementExists) {
            //console.log("next element exists");
            if (!this._nextElement.hasClass("typed") || (this._nextElement.hasClass("typed") && this._nextElement.text().length == 1)) {
                //console.log("next element not typed or (is typed but has only one character)");
                this.lines.removeElement(this._lineIndex, this._nextElementIndex);
            }
            else {
                //console.log("next element is typed and has more than one character");
                this._nextElement.text(this._nextElement.text().slice(1));
            }
        }
        else if (this._nextLineExists) {
            //console.log("next line exists");
            this.lines.appendToLine(this._lineIndex, this.lines.detachLine(this._nextLineIndex));
            this.lines.removeLine(this._nextLineIndex);
        }
        this._setCursorX();
    }

    //move cursor to beginning of line
    get home() {
        //console.log("home");
        this.lines.prependToLine(this._lineIndex, this._detachCursor);
        this.manageHiddenCursor();
        this._setCursorX();
    }

    //move cursor to end of line
    get end() {
        //console.log("end");
        this.lines.appendToLine(this._lineIndex, this._detachCursor);
        this.manageHiddenCursor();
        this._setCursorX();
    }

    //do up a certain number of times
    get pageup() {
        var n;
        //console.log("pageup");
        if (this._lineIndex >= this._numVisibleLines) { n = this._numVisibleLines; }
        else { n = this._lineIndex; }
        for (i = 0; i < n; i--) { this.up; }
        this.manageHiddenCursor();
    }

    //do down a certain number of times
    get pagedown() {
        var n;
        //console.log("pagedown");
        if (this._lineIndex + this._numVisibleLines < this.lines.numLines) { n = this._numVisibleLines; }
        else { n = this.lines.numLines - 1; }
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

    insertButton(e) {
        this.lines.insertBefore(this.lineIndex, this.elementIndex, e);
    }

    get indentLine() {
        if (this.lineIndex != 0) {
            const prevLinePadding = parseInt(this.lines.line(this.lineIndex - 1).css("paddingLeft"));
            const curLinePadding = parseInt(this.lines.line(this.lineIndex).css("paddingLeft"));
            if (curLinePadding <= prevLinePadding) {
                this.lines.line(this.lineIndex).css("paddingLeft",
                    String(curLinePadding + this._indent) + "px");
            }
        }
    }

    get outdentLine() {
        const curLinePadding = parseInt(this.lines.line(this.lineIndex).css("paddingLeft"));
        if (curLinePadding >= this._indent) {
            this.lines.line(this.lineIndex).css("paddingLeft",
                String(curLinePadding - this._indent) + "px");
        }
    }
}