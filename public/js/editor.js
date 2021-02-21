class Editor {
    app = null;
    cursor = null;
    lines = null;

    constructor(app) {
        const self = this;
        this.app = app;
        this.lines = new Lines(this);
        this.cursor = new Cursor(this);
        $(document).ready(function() {
            $(document).on("keyup", function(e) {
                self.app.data.setKey(self.current, "lines", self.lines.linesArray);
            });
        });
    }

    init() {
        const mostRecentlyCreated = this.app.data.sortByCreation(this.app.data.tierIds(3)).slice(-1, 1)[0];
        const mostRecentlyOpened = this.app.data.sortByLastOpened(this.app.data.tierIds(3)).slice(-1, 1)[0];
        this.load(mostRecentlyOpened ? mostRecentlyOpened : mostRecentlyCreated);
    }

    get buttons()         { return this.app.buttons; }
    get session()         { return this.app.data.record(this.current); }
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

    load(id) {
        //console.log(id);
        this.current = id;
        this.lines.load();
        this.cursor.checkForCursor();
    }
}