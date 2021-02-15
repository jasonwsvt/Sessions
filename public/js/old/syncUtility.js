/* utilities class links to sessions class
*/

class SyncUtility {
    _utilitiesID = "utilities";
    _utilityID = "syncUtility";
    _app = null;

    _fullIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-square-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z'/></svg>";
    _partIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-square-half' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 1h6a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H8V1zm6-1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z'/></svg>";
    _emptyIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/></svg>";
    _plusIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
    _minusIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-dash-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z'/></svg>";

    _syncDivID = "syncDiv";

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