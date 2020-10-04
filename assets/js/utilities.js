/* utilities class links to session class and dataManager classes
*/

class Utilities {
    _utilitiesID = null;
    _dataManager = null;
    _sessions = null;
    _minLinesHeight = null;
    _maxLinesHeight = null;

    _slideUpButtonID = "slideUpButton";
    _slideDownButtonID = "slideDownButton";
    _importButtonID = "importButton";
    _exportButtonID = "exportButton";
    _infoButtonID = "infoButton";
    _configButtonID = "configButton";

    constructor (utilitiesID, dataManager, sessions) {
        const self = this;
        this._utilitiesID = utilitiesID;
        this._dataManager = dataManager;
        this._sessions = sessions;

        this._loginUtilities = new LoginUtilities(this);
        this._issueUtilities = new IssueUtilities(this);
        this._sessionUtilities = new SessionUtilities(this);

        this.build();
console.log("utilities constructor");
        $(document).ready(function() {
            $("#" + self._slideUpButtonID).on("click", function() {
                const lines = self.lines.div;
                const lineHeight = Number(lines.children().eq(0).height());
                const minLinesHeight = 0;
                if (parseInt(lines.height()) > minLinesHeight) {
                    lines.height(String(parseInt(lines.height()) - lineHeight) + "px");
                    self.buttons.adjustDivHeights();
                }
            });

            Mousetrap.bind(['ctrl+up'], function(e) {
                $("#" + self._slideUpButtonID).trigger("click");
                return false;
            });

            $("#" + self._slideDownButtonID).on("click", function() {
                const lines = self.lines.div;
                const lineHeight = Number(lines.children().eq(0).height());
                const maxLinesHeight = $(window).height() - Number(lines.children().eq(0).height());
                if (parseInt(lines.height()) < maxLinesHeight) {
                    lines.height(String(parseInt(lines.height()) + lineHeight) + "px");
                    self.buttons.adjustDivHeights();
                }
            });

            Mousetrap.bind(['ctrl+down'], function(e) {
                $("#" + self._slideDownButtonID).trigger("click");
                return false;
            });

            $("#" + self._exportButtonID).on("click", function() {

            });
    
            $("#" + self._importButtonID).on("click", function() {
    
            });
    
            $("#" + self._configButtonID).on("click", function() {
    
            });
    
            $("#" + self._infoButtonID).on("click", function() {

            });
        });
    }

    get div()              { return $("#" + this._utilitiesID); }
    get lines()            { return this.sessions.lines; }
    get sessions()         { return this._sessions; }
    get data()             { return this._dataManager; }
    get buttons()          { return this.sessions.buttons; }
    get loginUtilities()   { return this._loginUtilities; }
    get issueUtilities()   { return this._issueUtilities; }
    get sessionUtilities() { return this._sessionUtilities; }
    
    build() {
        const dotIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-dot my-2' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'/></svg>";

        const exportIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-download' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/><path fill-rule='evenodd' d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z'/></svg>";
        const importIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-upload' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/><path fill-rule='evenodd' d='M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z'/></svg>";
        const scrollUpIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-arrow-bar-up' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z'/></svg>";
        const scrollDownIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-arrow-bar-down' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z'/></svg>";
        const infoIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-info-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path d='M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z'/><circle cx='8' cy='4.5' r='1'/></svg>";
        const configIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-gear' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z'/><path fill-rule='evenodd' d='M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z'/></svg>";

        const slideUpButton = "<button id = '" + this._slideUpButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + scrollUpIcon + "</button>";
        const slideDownButton = "<button id = '" + this._slideDownButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + scrollDownIcon + "</button>";
        const importButton = "<button id = '" + this._importButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + importIcon + "</button>";
        const exportButton = "<button id = '" + this._exportButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + exportIcon + "</button>";
        const configButton = "<button id = '" + this._configButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + configIcon + "</button>";
        const infoButton = "<button id = '" + this._infoButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + infoIcon + "</button>";

        this.div.append("<span></span><span></span>");

        const leftSide = this.div.children().eq(0);
        const rightSide = this.div.children().eq(1);

        this.loginUtilities.build(leftSide);
        leftSide.append(dotIcon);
        this.issueUtilities.build(leftSide);
        leftSide.append(dotIcon);
        this.sessionUtilities.build(leftSide);
        rightSide.append(slideUpButton + slideDownButton);
        rightSide.append(dotIcon);
        rightSide.append(importButton + exportButton);
        rightSide.append(dotIcon);
        rightSide.append(configButton + infoButton);
    }

    manage() {
        this.issueUtilities.manage();
        this.sessionUtilities.manage();
    }
}