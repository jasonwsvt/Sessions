/* utilities class links to sessions class
*/

class UserLoginUtility {
    _userUtilities = null;
    _utilityID = null;
    _type = null;
    _selectedUser = null;

    _loginIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-door-open' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM11.5 2H11V1h.5A1.5 1.5 0 0 1 13 2.5V15h-1V2.5a.5.5 0 0 0-.5-.5z'/><path fill-rule='evenodd' d='M10.828.122A.5.5 0 0 1 11 .5V15h-1V1.077l-6 .857V15H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117z'/><path d='M8 9c0 .552.224 1 .5 1s.5-.448.5-1-.224-1-.5-1-.5.448-.5 1z'/></svg>";

    _buttonID = "loginButton";
    _divID = "loginDiv";
    _browserUsersID = "loginDivBrowserUsers";
    _sessionUsersID = "loginDivSessionUsers";
    _usernameID = "loginDivUsername";
    _passwordID = "loginDivPassword";
    _messagesDivID = "loginDivMessages";
    _loginID = "loginDivButton";
    _forgotID = "loginDivForgotPasswordButton";

    constructor (userUtilities, group) {
        const self = this;
        this._userUtilities = userUtilities;
        this._group = group;
        this._type = "user";
        this._utilityID = "userUtility";

        //Check to see if a user qualifies for automatic login
        if      (rememberMeUserId)      { this.loadFrom(localStorage, rememberMeUserId); }
        else if (defaultSessionUser)    { this.loadFrom(sessionStorage, defaultSessionUser.id); }
        else if (noPasswordSessionUser) { this.loadFrom(sessionStorage, noPasswordSessionUser.id); }
        else if (defaultBrowserUser)    { this.loadFrom(localStorage, defaultBrowserUser.id); }
        else if (noPasswordBrowserUser) { this.loadFrom(localStorage, noPasswordBrowserUser.id); }

        $(document).ready(function() {
            self.button.on("click", function (e) {
                self.utilities.closeAllUtilityMenus(self._buttonID);
                if (self.div.hasClass("hidden")) {
                    self.div.removeClass("hidden");
                    this.blur();
                    self.manage();
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
                self.manage();
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
    get group()             { return this._group(); }
    get current()           { return this.group.current; }
    get lines()             { return this.app.editor.lines; }
    get buttons()           { return this.app.buttons; }
    get storagePermanence() { return this.current.storagePermanence; }
//    get userUtilitiesDiv()  { return $("#" + this._utilityID); }

    get button()            { return $("#" + this._buttonID); }
    get div()               { return $("#" + this._divID); }
    get browserUsers()      { return $("#" + this._browserUsersID); }
    get sessionUsers()      { return $("#" + this._sessionUsersID); }
    get username()          { return $("#" + this._usernameID); }
    get password()          { return $("#" + this._passwordID); }
    get messagesDiv()       { return $("#" + this._messagesDivID); }
    get login()             { return $("#" + this._loginID); }
    get forgot()            { return $("#" + this._forgotID); }

    build() {
        const loginIcon = this._loginIcon;
//console.log("build login menu");
//console.trace();
        const button = "<button id = '" + this._buttonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + loginIcon + "</button>";
        const div = "<div id = '" + this._divID + "' class = 'hidden userMenu'></div>";
        const browserUsers = "<div id = '" + this._browserUsersID + "'></div>";
        const sessionUsers = "<div id = '" + this._sessionUsersID + "'></div>";
        const username = "<input id = '" + this._usernameID + "' placeholder = 'username' size = '50'>";
        const password = "<input id = '" + this._passwordID + "' type = 'password' placeholder = 'password' size = '30'>";
        const messages = "<div id = '" + this._messagesDivID + "'></div>";
        const action = "<button id = '" + this._loginID + "' type = 'button'>Log in</button>";

        this.userUtilities.div.append(button + div);
        this.div.addClass("container");
        this.div.append(browserUsers);
        this.div.append(sessionUsers);
        this.div.append(username);
        this.div.append(password);
        this.div.append(messages);
        this.div.append(action);
   
        this.div.css("left", String(this.userUtilities.div.position().left) + "px");
        this.div.css("top", String(this.userUtilities.div.position().top + 32) + "px");
        this.reset();
    }

    manage() {
        if (this._selectedUser || this.username.val()) {
            if (this._selectedUser) { }  // what would I want to do if selectedUser and not username.val?
            this._enterPasswordStep();
        }
        else { this._selectUserNameStep(); }
    }

    reset() {
        this._selectedUser = "";
        this._selectedUserContainer = "";
        this.username.val("");
        this.password.val("");
        this._propagateUserNameButtons();
    }

    _propagateUserNameButtons() {
        const self = this;

        this.browserUsers.empty();
        const browserUsers = this.bUsers.filter(r => (r.id != this.current.id && !r.hidden));
        browserUsers.forEach(r => {
            this.browserUsers.append("<button type = 'button' class = 'btn btn-primary' value = '" + r.id + "'>" + r.username + "</button>");
        });
        this.browserUsers.find("button").on("click", function (e) {
            this.blur();
            self._selectedUser = (self._selectedUser == $(this).text()) ? "" : $(this).text();
            self._selectedUserContainer = localStorage;
            console.log(self.noPasswordAccount(), $(this).val());
            if (self.noPasswordAccount()) {
                console.log("loggin in");
                self.group.loadFrom(self._selectedUserContainer, parseInt($(this).val()));
                self.utilities.manage("user");
                self.userUtilities.reset();
                self.close();
            }
            else {
                self.manage();
            }
            e.stopPropagation();
        });

        this.sessionUsers.empty();
        const sessionUsers = this.sUsers.filter(r => (r.username != this.current.username));
        sessionUsers.forEach(r => {
            this.sessionUsers.append("<button type = 'button' class = 'btn btn-warning' value = '" + r.id + "'>" + r.username + "</button>");
        });
        this.sessionUsers.find("button").on("click", function (e) {
            this.blur();
            self._selectedUser = (self._selectedUser == $(this).text()) ? "" : $(this).text();
            self._selectedUserContainer = sessionStorage;
            console.log(self.noPasswordAccount(), $(this).val());
            if (self.noPasswordAccount()) {
                console.log("switching account");
                self.group.loadFrom(self._selectedUserContainer, parseInt($(this).val()));
                self.utilities.manage("user");
                self.resetSettingsMenu();
                self.reset();
                self.close();
            }
            else {
                self.manage();
            }
            e.stopPropagation();
        });
    }

    _selectUserNameStep() {
        this.browserUsers.find("button").show();
        this.sessionUsers.find("button").show();
        this.username.show();
        this.password.hide();
        this.login.hide();
        this.messagesDiv.empty();
    }

    _enterPasswordStep() {
        var i, button, buttons;

        buttons = this.browserUsers.find("button");
        for (i = 0; i < buttons.length; i++) {
            button = buttons.eq(i);
            console.log(button);
            if (button.text() != this._selectedUser) { button.hide(); } else { button.show(); }
        }

        buttons = this.sessionUsers.find("button");
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
        var user = this.userExists(this._selectedUserContainer, this._selectedUser);

        return (user && this.password.val() == "" && user.passwordHash == "");
    }

    verifyCredentials() {
        var container, user;
        if (this.username.val() != "") {
            [localStorage, sessionStorage].forEach(c => {
                if (!user && Object.keys(c).includes("users")) {
                    user = userExists(c, username);
                    if (user) { container = c; }
                }
            });
        }
        else { 
            user = userExists(this._selectedUserContainer, this._selectedUser);
        }

        if (user) {
            if ((this.password.val() == "" && user.passwordHash == "") ||
                (this.hashedPassword(this.password.val()) == user.passwordHash)) {
                this.group.loadFrom(container, user);
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

    userExists(container, username) {
        if (Object.keys(container).includes("users")) {
            const users = JSON.parse(container.getItem("users"));
            const user = users.find(user => (user.username = username));
            return (user) ? user : undefined;
        }
        return undefined;
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