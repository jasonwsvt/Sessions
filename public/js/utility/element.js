class Element {
    _disableExpression = () => (this.group.findByName(this.group.defaultName));
    _codeFunc = () => {
        var button = "<button";
        if (this._id) { button += " id = '" + this._buttonID + "'"; }
        button += " type = 'button' class = 'btn btn-dark btn-sm'></button>";
        return button;
    }

    constructor() {

    }

    get e()              { return $("#" + this._buttonID); }

    hidden()            { return (this.e.hasClass("hidden")); }
    toggleHidden()      { this.e.toggleClass("hidden"); }
    show()              { this.e.removeClass("hidden"); }
    hide()              { this.e.addClass("hidden"); }
    hideIf(expr)        { this._hideIf = expr; }

    set disableIf(expr) { this._disableIf = expr; }
    disable()           { this.e.attr("disabled", this._disableIf()); }

    set id(id)          { this._id = id; }
    get id()            { return this._id; }

    set code(code)      { this._codeFunc = code; }
    get code()          { return this._codeFunc; }

    manage() {
        this.disable();
    }

    close() {
        this.pickerButton.blur();
    }
}