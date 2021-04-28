class Editor {
    constructor(app) {
        const self = this;
        this.app = app;
        this.current = null;
        this.lines = new Lines(this);
        this.cursor = new Cursor(this);
  
        $(document).ready(function() {
            $(document).on("keyup", function(e) {
                self.app.data.setKey(self.current, "lines", self.lines.linesArray);
            });
        });
    }

    init() {
        const tier3Ids = this.app.data.tierIds(3);
        const mostRecentlyCreated = this.app.data.lastCreated(tier3Ids);
        const mostRecentlyOpened = this.app.data.lastOpened(tier3Ids);
        //console.log(tier3Ids, mostRecentlyCreated, mostRecentlyOpened)
        this.load(mostRecentlyOpened ? mostRecentlyOpened : mostRecentlyCreated);
    }

    get buttons()         { return this.app.buttons; }
    get session()         { return this.app.data.record(this.current); }
    //get lineHeight()      { return this.lines.div.children().eq(0).height(); }
    get lineHeight()      { return this.lines.div.find("button").eq(0).outerHeight(); }
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