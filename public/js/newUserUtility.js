/* utilities class links to sessions class
*/

class NewUserUtility {
    constructor (userUtilities) {
        const self = this;
        this.userUtilities = userUtilities;
        this._utilityID = "newUserUtility";
        this._plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
        this._createNewAccountIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
        this._infoIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>';
        this._buttonID = "newAccountButton";
    
        this._build();

        $(document).ready(function() {
            self.button.on("click", function (e) {
                console.log("newAccountButton");
                self.utilities.close(self._buttonID);
                self._new();
                self.manage();
                self.userUtilities.settings.button.trigger('click');
                this.blur();
                e.stopPropagation();
            });
        }); 
    }

    get utilities()         { return this.userUtilities.utilities; }
    get app()               { return this.utilities.app; }
    get data()              { return this.app.data; }
    get div()               { return $("#" + this._utilityID); }
    get sessionId()         { return this.app.editor.current; }
    get id()                { return this.data.tierIds(0)[0]; }
    get username()          { return this.data.value(this.id, "username"); }

    get button()            { return $("#" + this._buttonID); }

    _new() {
        const u = this.userUtilities;
        const data = this.app.data;
        if (u.localBackupId)  { u.cancelLocalBackup();  u.localBackup(); }
        if (u.serverBackupId) { u.cancelServerBackup(); u.serverBackup(); }
        data.clear();
        this.init();
        this.userUtilities.reset();
    }

    _build() {
        const plusIcon = this._plusIcon;

        const button = "<button id = '" + this._buttonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + plusIcon + "</button>";

        this.userUtilities.div.append(button);
    }

    init() {
        const infoIcon = this._infoIcon;
        const data = this.app.data;
        if (data.isEmpty()) {
            data.addChild(data.addChild(data.addChild(data.import({ username: "newuser" }), { name: "Self" }), { name: "New Issue" }), { lines: ['<div><button type="button" class="btn btn-light space">Click the ' + infoIcon + ' in the top right corner of the page for the instructions!  Press backspace to remove this text.</button><h4 id="cursor">|</h4></div>']});
        }
        this.manage();
    }

    manage() {
        const data = this.app.data;
        const def = this.userUtilities.defaultUsername;
        const newuserExists = Object.keys(localStorage).includes(def);
        const isDefault = data.value(data.tierIds(0)[0], "username") == def;
        const backupRequested = !!this.userUtilities.backupRequested;
        this.button.prop("disabled", isDefault || newuserExists || backupRequested);
    }

    reset() {
        this.manage();
    }

    close(except) {
        if (except != this._buttonID) { 
            this.div.addClass("hidden");
            this.button.blur();
        }
    }
}