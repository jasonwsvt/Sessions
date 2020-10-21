class Editor {
    _app = null;
    _cursor = null;
    _lines = null;

    constructor(app) {
        const self = this;
        this._app = app;
        this._lines = new Lines(this);
        this._cursor = new Cursor(this);

        $(document).ready(function() {
            $(document).on("keyup", function() {
                //                   User    Client  Issue   Session
                self.app.userManager.current.current.current.current.lines = self.lines.linesArray;
            });
        });
    }

    get app()    { return this._app; }
    get lines()  { return this._lines; }
    get cursor() { return this._cursor; }
}