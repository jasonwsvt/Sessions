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
            console.log(self.lines.div);
            $(document).on("keyup", function(e) {
                self.session.lines = self.lines.linesArray;
            });
        });
    }

    get buttons()         { return this.app.buttons; }
    get session()         {
        const data = this.app.data;
        if (!data.isEmpty()) {
            const mostRecentlyOpened = data.sortByLastOpened(data.tierIds(3))[0];
            const mostRecentlyCreated = data.sortByCreation(data.tierIds(3))[0];
            return data.record(mostRecentlyOpened ? mostRecentlyOpened : mostRecentlyCreated);
        }
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