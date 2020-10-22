/* utilities class links to sessions class
*/

class ScrollUtilitys {
    _utilitiesID = "utilities";
    _app = null;

    _scrollUpIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-arrow-bar-up' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z'/></svg>";
    _scrollDownIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-arrow-bar-down' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z'/></svg>";

    _slideUpButtonID = "slideUpButton";
    _slideDownButtonID = "slideDownButton";

    constructor (app) {
        const self = this;
        this._app = app;

        this._build();
        this.manage();

        $(document).ready(function() {
            self._slideUpButton.on("click", function() {
                self.lines.reduceVisibleLines();
                return false;
            });

            Mousetrap.bind(['ctrl+up'], function(e) {
                self.lines.reduceVisibleLines();
                return false;
            });

            self._slideDownButton.on("click", function() {
                self.lines.increaseVisibleLines();
                return false;
            });

            Mousetrap.bind(['ctrl+down'], function(e) {
                self.lines.increaseVisibleLines();
                return false;
            });
        }); 
    }

    get span()                     { return $("#" + this._utilityID); }
    get app()                     { return this._app; }
    get lines()                   { return this.app.editor.lines; }
    get buttons()                 { return this.app.buttons; }
    get _slideUpButton()          { return $("#" + this._slideUpButtonID); }
    get _slideDownButton()        { return $("#" + this._slideDownButtonID); }

    _build() {
        const scrollUpIcon = this._scrollUpIcon;
        const scrollDownIcon = this._scrollDownIcon;

        const slideUpButton = "<button id = '" + this._slideUpButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + scrollUpIcon + "</button>";
        const slideDownButton = "<button id = '" + this._slideDownButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + scrollDownIcon + "</button>";

        rightSide.append(slideUpButton + slideDownButton);
        rightSide.append(dotIcon);
    }

    manage() {
    }

    closeMenus(except) {
        if (except != this._issuePickerButtonID)   {
            this._issuePickerDiv.addClass("hidden");
            this._issuePickerDiv.removeClass("popUpMenu");
            this._issuePickerButton.focusout();
        }
        if (except != this._issueRenameButtonID)   { 
            this._issueRenameDiv.addClass("hidden");
            this._issueRenameDiv.removeClass("popUpMenu");
            this._issueRenameButton.focusout();
        }
        if (except != this._issueAddButtonID)      { 
            this._issueAddDiv.addClass("hidden");
            this._issueAddDiv.removeClass("popUpMenu");
            this._issueAddButton.focusout();
        }
        if (except != this._sessionPickerButtonID) { 
            this._sessionPickerDiv.addClass("hidden");
            this._sessionPickerDiv.removeClass("popUpMenu");
            this._sessionPickerButton.focusout();
        }
    }
}