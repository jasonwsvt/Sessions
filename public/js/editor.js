class Editor {
    _app = null;
    _cursor = null;
    _lines = null;

    constructor(app) {
        const self = this;
        this._app = app;
        this._lines = new Lines(this);
        this._cursor = new Cursor(this);
    }

    get app()             { return this._app; }
    get lines()           { return this._lines; }
    get cursor()          { return this._cursor; }
    get buttons()         { return this.app.buttons; }
    get session()         {
        //              users user    clients  client  issues   issue   sessions session
        return this.app.users.current.children.current.children.current.children.current;
    }
    get lineHeight()      { return this.lines.div.children().eq(0).height(); }
    get height()          { return parseInt(this.lines.div.css("height")); }
    set height(height)    { this.lines.div.css("height", String(height) + "px"); }
    get numVisibleLines() { return this.height / this.lineHeight; }

    increaseVisibleLines() {
        const maxVisibleLines = Math.floor($(window).height() / this.lineHeight);
        if (this.numVisibleLines < maxVisibleLines) {
            this.lines.div.css("height", String((this.numVisibleLines + 1) * this.lineHeight) + "px");
            this.buttons.adjustDivHeights();
        }
    }

    reduceVisibleLines() {
        const minVisibleLines = 0;
        if (this.numVisibleLines > minVisibleLines) {
            this.lines.div.css("height", String((this.numVisibleLines - 1) * this.lineHeight) + "px");
            this.buttons.adjustDivHeights();
        }
    }

    load() {
        this.lines.load();
        this.cursor.checkForCursor();
    }
}