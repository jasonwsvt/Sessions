class UserLoginUtility {
    _userUtilities = null;
    _utilityID = null;
    _type = null;
    _selectedUser = null;
    _users = null;

    _loginIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-door-open' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM11.5 2H11V1h.5A1.5 1.5 0 0 1 13 2.5V15h-1V2.5a.5.5 0 0 0-.5-.5z'/><path fill-rule='evenodd' d='M10.828.122A.5.5 0 0 1 11 .5V15h-1V1.077l-6 .857V15H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117z'/><path d='M8 9c0 .552.224 1 .5 1s.5-.448.5-1-.224-1-.5-1-.5.448-.5 1z'/></svg>";

    _buttonID      = "loginButton";
    _divID         = "loginDiv";
    _localUsersID  = "loginDivLocalUsers";
    _usernameID    = "loginDivUsername";
    _passwordID    = "loginDivPassword";
    _messagesDivID = "loginDivMessages";
    _loginID       = "loginDivButton";
    _forgotID      = "loginDivForgotPasswordButton";

    constructor (userUtilities) {
        const self = this;
        this._userUtilities = userUtilities;
        this._utilityID = "loginUtility";

        this._build();

        $(document).ready(function() {
            self.button.on("click", function (e) {
                self.utilities.close(self._buttonID);
                if (self.div.hasClass("hidden")) {
                    self.div.removeClass("hidden");
                    this.blur();
                    self.determineStage();
                    self.username.focus();
                }
                else {
                    self.close();
                }
                e.stopPropagation();
            });

            self.div.find("input").on("keypress", function (e) {
                e.stopPropagation();
            });

            self.div.find("input").on("keyup", function (e) {
                self.determineStage();
                e.stopPropagation();
            });

            self.div.on("click", function (e) {
                e.stopPropagation();
            });
        }); 
    }

    get userUtilities()     { return this._userUtilities; }
    get utilities()         { return this._userUtilities.utilities; }
    get app()               { return this.utilities.app; }
    get group()             { return this.userUtilities.group; }
    get current()           { return this.userUtilities.current; }
    get lines()             { return this.app.editor.lines; }
    get buttons()           { return this.app.buttons; }
    get storagePermanence() { return this.current.storagePermanence; }
    get id()                { return this.app.data.tierIds(0)[0]; }

    get button()            { return $("#" + this._buttonID); }
    get div()               { return $("#" + this._divID); }
    get localUsers()        { return $("#" + this._localUsersID); }
    get username()          { return $("#" + this._usernameID); }
    get password()          { return $("#" + this._passwordID); }
    get messagesDiv()       { return $("#" + this._messagesDivID); }
    get login()             { return $("#" + this._loginID); }
    get forgot()            { return $("#" + this._forgotID); }

    _build() {
        const loginIcon = this._loginIcon;
        const button = "<button id = '" + this._buttonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + loginIcon + "</button>";
        const div = "<div id = '" + this._divID + "' class = 'hidden userMenu'></div>";
        const localUsers = "<div id = '" + this._localUsersID + "'></div>";
        const username = "<input id = '" + this._usernameID + "' placeholder = 'username' size = '50'>";
        const password = "<input id = '" + this._passwordID + "' type = 'password' placeholder = 'password' size = '30'>";
        const messages = "<div id = '" + this._messagesDivID + "'></div>";
        const action = "<button id = '" + this._loginID + "' type = 'button'>Log in</button>";
        this.userUtilities.div.append(button + div);
        this.div.addClass("container");
        this.div.append(localUsers);
        this.div.append(username);
        this.div.append(password);
        this.div.append(messages);
        this.div.append(action);
   
        this.div.css("left", String(this.userUtilities.div.position().left) + "px");
        this.div.css("top", String(this.userUtilities.div.position().top + 32) + "px");
    }

    init() {
        //Check to see if a user qualifies for automatic login
        const localKeys = Object.keys(localStorage);
        const defaultUsername = this.userUtilities.defaultUsername;

        //rememberMe user
        if (localKeys.length >= 2 && localKeys.includes("rememberMe")) {
            const username = localStorage.getItem("rememberMe");
            if (localKeys.includes(username)) {
                const user = JSON.parse(localStorage.getItem(username));
                if (user.hasOwnProperty("rememberMe") && user.rememberMe == true) {
                    this.app.data.importFromLocalStorage(username);
                    return;
                }
            }
        }

        //user with default username and no password
        if (localKeys.length >= 1 && localKeys.includes(defaultUsername)) {
            const user = JSON.parse(localStorage.getItem(defaultUsername));
            if (user && user.hasOwnProperty("username") && user.username == defaultUsername &&
                (!user.hasOwnProperty("password") || user.password == "")) {
                    this.app.data.importFromLocalStorage(defaultUsername);
                    return;
            }
        }

        //user with one unhidden account and no password
        if (localKeys.length == 1) {
            const user = JSON.parse(localStorage.getItem(localKeys[0]));
            if (user && user.hasOwnProperty("username") &&
                (!user.hasOwnProperty("password") || user.password == "")) {
                    this.app.data.importFromLocalStorage(localKeys[0]);
                    return;
            }
        }
    }

    manage() {
        console.log("switching login button disabled to", this.userUtilities.backupRequested);
        this.button.prop("disabled", this.userUtilities.backupRequested);
    }

    determineStage() {
        if (this._selectedUser || this.username.val()) {
            if (this._selectedUser) { }  // what would I want to do if selectedUser and not username.val?
            this._enterPasswordStage();
        }
        else { this._selectUserNameStage(); }
    }

    reset() {
        this._selectedUser = "";
        this._selectedUserContainer = "";
        this.username.val("");
        this.password.val("");
        this.resetUsersList();
        this._propagateUserNameButtons();
    }

    _propagateUserNameButtons() {
        const self = this;

        this.localUsers.empty();
        this._users.filter(u => u.id != this.id && u.hidden != true).forEach(r => {
            this.localUsers.append("<button type = 'button' class = 'btn btn-primary' value = '" + r.id + "'>" + r.username + "</button>");
        });
        this.localUsers.find("button").on("click", function (e) {
            this.blur();
            self._selectedUser = (self._selectedUser == $(this).text()) ? "" : $(this).text();
            self._selectedUserContainer = localStorage;
            console.log(self.noPasswordAccount(), $(this).val());
            if (self.noPasswordAccount()) {
                self.loginUser();
            }
            else {
                self.determineStage();
            }
            e.stopPropagation();
        });
    }

    _selectUserNameStage() {
        this.localUsers.find("button").show();
        this.username.show();
        this.password.hide();
        this.login.hide();
        this.messagesDiv.empty();
    }

    _enterPasswordStage() {
        var i, button, buttons;

        buttons = this.localUsers.find("button");
        for (i = 0; i < buttons.length; i++) {
            button = buttons.eq(i);
            console.log(button);
            if (button.text() != this._selectedUser) { button.hide(); } else { button.show(); }
        }

        if (this.username.val() == "") { this.username.hide(); }
        else { this.username.show(); }

        this.password.show();
        this.login.show();
    }

    noPasswordAccount() {
        var user = this._users.find(user => user.username == this._selectedUser);
        //console.log(user, this._selectedUser);
        return (user && this.password.val() == "" && (!user.hasOwnProperty("password") || user.password == ""));
    }

    verifyCredentials() {
        if (this.username.val() != "") { this._selectedUser = this.username.val(); }
        const user = this._users.find(user => user.username == this._selectedUser);

        if (user) {
            if ((this.password.val() == "" && user.password == "") ||
                (this.hashedPassword(this.password.val()) == user.password)) {
                this.loginUser();
            }
            else {
                this.messagesDiv.text("Password invalid.");
            }
        }
        else {
            this.messagesDiv.text("Username invalid.");
        }

        //Not found locally, so try logging in on the server.
    }

    loginUser() {
        //console.log("logging in");
        const user = this._users.find(user => user.username == this._selectedUser);
        if (user.localBackupLocation == "localStorage") {
            this.app.data.importFromLocalStorage(this._selectedUser);
        }
        else {
            this.app.data.importFromSessionStorage(this._selectedUser);
        }
        this.app.editor.init();
        this.utilities.manage(0);
        this.userUtilities.reset();
        this.close();
    }

    resetUsersList() {
        const localKeys = Object.keys(localStorage).filter(key => key != "rememberMe");
        this._users = localKeys.map(username => {
            const user = JSON.parse(localStorage.getItem(username));
            if (user.hasOwnProperty("children")) { delete user.children; }
            return user;
        });
    }

    user(username) {
        return this._users.find(user => user.username == username);
    }

    hashedPassword(password) {
        return "hashed " + password;
    }

    close(except) {
        if (except != this._buttonID) {
            this.div.addClass("hidden");
            this.button.blur();
        }
    }
}