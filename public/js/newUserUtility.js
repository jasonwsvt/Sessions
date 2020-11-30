/* utilities class links to sessions class
*/

class NewUserUtility extends StorageUtility {
    _userUtilities = null;
//    _type = null;
    _selectedUser = null;

    _plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";

    _buttonID = "newAccountButton";

    constructor (userUtilities, group) {
        super();
        const self = this;
        this._userUtilities = userUtilities;
        this._group = group;
//        this._type = "user";

        this._build();

        $(document).ready(function() {
            self.button.on("click", function (e) {
                console.log("new account button");
                self.utilities.closeAllUtilityMenus(self._buttonID);
                self.group.new();
                self._reset();
                self.userUtilities.settings.button.trigger('click');
                this.blur();
                e.stopPropagation();
            });
        }); 
    }

    get utilities()         { return this._utilities; }
    get app()               { return this._utilities.app; }
    get group()             { return this._group(); }
    get current()           { return this.group.current; }
    get lines()             { return this.app.editor.lines; }
    get buttons()           { return this.app.buttons; }
    get storagePermanence() { return this.current.storagePermanence; }
    get userUtilities()     { return this._userUtilities; }

    get div()               { return $("#" + this._divID); }
    get button()            { return $("#" + this._buttonID); }

    _build() {
        const plusIcon = this._plusIcon;

        const button = "<button id = '" + this._buttonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + plusIcon + "</button>";

        this.userUtilities.div.append(button);
    }

    closeMenu(except) {
        if (except != this._buttonID) {
            this.div.addClass("hidden");
            this.button.focusout();
        }
    }
}