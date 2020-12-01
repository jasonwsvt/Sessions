/* utilities class links to sessions class
*/

class UserLoginUtility extends StorageUtility {
    _userUtilities = null;
    _utilityID = null;
    _type = null;
    _selectedUser = null;

    _loginIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-door-open' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM11.5 2H11V1h.5A1.5 1.5 0 0 1 13 2.5V15h-1V2.5a.5.5 0 0 0-.5-.5z'/><path fill-rule='evenodd' d='M10.828.122A.5.5 0 0 1 11 .5V15h-1V1.077l-6 .857V15H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117z'/><path d='M8 9c0 .552.224 1 .5 1s.5-.448.5-1-.224-1-.5-1-.5.448-.5 1z'/></svg>";

    _buttonID = "loginButton";
    _divID = "loginDiv";
    _browserUsersID = "loginDivBrowserUsers";
    _sessionUsersID = "loginDivSessionUsers";
    _userNameID = "loginDivUsername";
    _passwordID = "loginDivPassword";
    _messagesDivID = "loginDivMessages";
    _loginID = "loginDivButton";
    _forgotID = "loginDivForgotPasswordButton";

    constructor (userUtilities, group) {
        super();
        const self = this;
        this._userUtilities = userUtilities;
        this._group = group;
        this._type = "user";
        this._utilityID = "userUtility";

        $(document).ready(function() {
            self.button.on("click", function (e) {
                self.utilities.closeAllUtilityMenus(self._buttonID);
                if (self.div.hasClass("hidden")) {
                    self.div.removeClass("hidden");
                    this.blur();
                    self._manageLoginMenu();
                    self.userName.focus();
                }
                else {
                    self._closeLoginMenu();
                }
                e.stopPropagation();
            });

            self.div.find("input").on("keypress", function (e) {
                e.stopPropagation();
            });

            self.div.find("input").on("keyup", function (e) {
                self._manageLoginMenu();
                e.stopPropagation();
            });

            self.div.on("click", function (e) {
                e.stopPropagation();
            });
        }); 
    }

    get userUtilities()                 { return this._userUtilities; }
    get utilities()                     { return this._userUtilities.utilities; }
    get app()                           { return this.utilities.app; }
    get group()                         { return this._group(); }
    get current()                       { return this.group.current; }
    get lines()                         { return this.app.editor.lines; }
    get buttons()                       { return this.app.buttons; }
    get storagePermanence()             { return this.current.storagePermanence; }
//    get userUtilitiesDiv()                           { return $("#" + this._utilityID); }

    get button()                   { return $("#" + this._buttonID); }
    get div()                      { return $("#" + this._divID); }
    get browserUsers()          { return $("#" + this._browserUsersID); }
    get sessionUsers()          { return $("#" + this._sessionUsersID); }
    get userName()              { return $("#" + this._userNameID); }
    get password()              { return $("#" + this._passwordID); }
    get messagesDiv()              { return $("#" + this._messagesDivID); }
    get login()                { return $("#" + this._loginID); }
    get forgot()  { return $("#" + this._forgotID); }

    build() {
        this.buildLoginMenu();
    }

    buildLoginMenu() {
        const loginIcon = this._loginIcon;
//console.log("build login menu");
//console.trace();
        const button = "<button id = '" + this._buttonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + loginIcon + "</button>";
        const div = "<div id = '" + this._divID + "' class = 'hidden userMenu'></div>";
        const browserUsers = "<div id = '" + this._browserUsersID + "'></div>";
        const sessionUsers = "<div id = '" + this._sessionUsersID + "'></div>";
        const username = "<input id = '" + this._userNameID + "' placeholder = 'username' size = '50'>";
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
        this.resetLoginMenu();
    }

    manage() {
        this._manageLoginMenu();
    }

    _manageLoginMenu() {
        if (this._selectedUser || this.userName.val()) {
            if (this._selectedUser) { }
            this._enterPasswordStep();
        }
        else { this._selectUserNameStep(); }
    }

    reset() {
        this.resetLoginMenu();
    }

    resetLoginMenu() {
        this._selectedUser = "";
        this._selectedUserContainer = "";
        this.userName.val("");
        this.password.val("");
        this._propagateUserNameButtons();
    }

    _propagateUserNameButtons() {
        const self = this;

        this.browserUsers.empty();
        const browserUsers = this.group.bUsers.filter(r => (r.id != this.current.id && !r.hidden));
        browserUsers.forEach(r => {
            this.browserUsers.append("<button type = 'button' class = 'btn btn-primary' value = '" + r.id + "'>" + r.userName + "</button>");
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
                self.resetLoginMenu();
                self.resetSettingsMenu();
                self._closeLoginMenu();
            }
            else {
                self._manageLoginMenu();
            }
            e.stopPropagation();
        });

        this.sessionUsers.empty();
        const sessionUsers = this.sUsers.filter(r => (r.userName != this.current.userName));
        sessionUsers.forEach(r => {
            this.sessionUsers.append("<button type = 'button' class = 'btn btn-warning' value = '" + r.id + "'>" + r.userName + "</button>");
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
                self.resetLoginMenu();
                self._closeLoginMenu();
            }
            else {
                self._manageLoginMenu();
            }
            e.stopPropagation();
        });
    }

    _selectUserNameStep() {
        this.browserUsers.find("button").show();
        this.sessionUsers.find("button").show();
        this.userName.show();
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

        if (this.userName.val() == "") { this.userName.hide(); }
        else { this.userName.show(); }

        this.password.show();
        this.login.show();
    }

    noPasswordAccount() {
        var user = this.userExists(this._selectedUserContainer, this._selectedUser);

        return (user && this.password.val() == "" && user.passwordHash == "");
    }

    verifyCredentials() {
        var container, user;
        if (this.userName.val() != "") {
            [localStorage, sessionStorage].forEach(c => {
                if (!user && Object.keys(c).includes("users")) {
                    user = userExists(c, userName);
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

    userExists(container, userName) {
        if (Object.keys(container).includes("users")) {
            const users = JSON.parse(container.getItem("users"));
            const user = users.find(user => (user.userName = userName));
            return (user) ? user : undefined;
        }
        return undefined;
    }

    hashedPassword(password) {
        return "hashed " + password;
    }

    close(except) {
        if (except != this._buttonID)      { this._closeLoginMenu(); }
    }

    _closeLoginMenu() {
        this.div.addClass("hidden");
        this.button.blur();
    }
}