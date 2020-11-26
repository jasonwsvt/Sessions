/* utilities class links to sessions class
*/

class SyncUtility {
    _utilitiesID = "utilities";
    _utilityID = "syncUtility";
    _app = null;

    _infoIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-info-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path d='M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z'/><circle cx='8' cy='4.5' r='1'/></svg>";

    _infoButtonID = "infoButton";
    _infoDivID = "infoDiv";

    constructor (app) {
        const self = this;
        this._app = app;

        this._build();
        this.manage();

        $(document).ready(function() {
            self._infoButton.on("click", function() {

            });
        }); 
    }

    get div()                     { return $("#" + this._utilityID); }
    get app()                     { return this._app; }
    get lines()                   { return this.app.editor.lines; }
    get buttons()                 { return this.app.buttons; }
    get _infoButton()             { return $("#" + this._infoButtonID); }
    get _infoDiv()                { return $("#" + this._infoDivID); }

    _build() {
        const infoIcon = this._infoIcon;

        const infoButton = "<button id = '" + this._infoButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + infoIcon + "</button>";
        const infoDiv = "<div id = '" + this._infoDivID + "' class = 'popUpMenu'></div>";

        this.div.append(infoButton + infoDiv);
        this._infoDiv.append();
    }

    manage() {
    }

    closeMenus(except) {
        if (except != this._issuePickerButtonID)   {
            this._issuePickerDiv.addClass("hidden");
            this._issuePickerButton.blur();
        }
        if (except != this._issueRenameButtonID)   { 
            this._issueRenameDiv.addClass("hidden");
            this._issueRenameButton.blur();
        }
        if (except != this._issueAddButtonID)      { 
            this._issueAddDiv.addClass("hidden");
            this._issueAddButton.blur();
        }
        if (except != this._sessionPickerButtonID) { 
            this._sessionPickerDiv.addClass("hidden");
            this._sessionPickerButton.blur();
        }
    }
}