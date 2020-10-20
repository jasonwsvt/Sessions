class Editor {
    _app = null;
    _cursor = null;
    _lines = null;

    constructor(app) {
        this._app = app;
        this._linesObject = new Lines(this);
        this._cursor = new Cursor(this);

        $(document).ready(function() {
            $(document).on("keyup", function() {
                self.app.userManager.currentUser.currentClient.currentIssue.currentSession.lines = self.lines.linesArray;
            });
        });
    }

    get app() { return this._app; }
    get lines() { return this._lines; }
    get cursor() { return this._cursor; }
}