class Sessions {
    _lines = null;
    _session = null;
    _dataManager = null;
    _utilitiesID = "utilities";
    _linesID = "lines";
    _buttonsNavID = "buttonsNav";
    _buttonsID = "buttons";
    _issues = null;

    constructor() {
        var self = this;
        this.createContainers();

        this._lines = new Lines(this._linesID);
        this._session = new Session(this._lines);
        this._dataManager = new DataManager(this);
        this._buttons = new Buttons(this._buttonsNavID, this._buttonsID, this._dataManager.getButtons());
        this._utilities = new Utilities(this._utilitiesID, this._dataManager, this, this._buttons);

        $(document).ready(function() {
            $(document).on("keyup", function() {
                if (!self._session.lastEdited || self._session.lastEdited < self._lines.lastEdited) {
                    self._lastEdited = self._lines.lastEdited;
                    self._dataManager.storeSession();
                }
            });

            $("#" + self._buttonsID + " button").on("click", function(e) {
                self._session.insertButton("<button type='button' class='btn btn-light'>" + $(this).text() + "</button>");
            });

            $(window).resize(function() {
                self._buttons.adjustDivHeights();
            });
        });
    }

    get sessionInstance() { return this._session; }
    get linesInstance()   { return this._session.linesInstance;}

    createContainers() {
        var utilitiesCode, linesCode, buttonsContainer, buttonsNavCode, buttonsCode;
    
        utilitiesCode = "<div id = '" + this._utilitiesID + "'></div>";
        linesCode = "<div id = '" + this._linesID +"' class = 'align-self-start'></div>";
        buttonsNavCode = "<div id = '" + this._buttonsNavID + "' class='col col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6'></div>";
        buttonsCode = "<div id = '" + this._buttonsID + "' class='col col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6'></div>";
        buttonsContainer = "<div class = 'container-fluid'><div class = 'row'>" + buttonsNavCode + buttonsCode + "</div></div>";

        $("body").prepend(utilitiesCode + linesCode + buttonsContainer);
    }

    getIssues() {

    }

    getIssueSessions() {

    }
}