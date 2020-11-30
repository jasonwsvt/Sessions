/* utilities class links to sessions class
*/

class UserLoginUtility extends StorageUtility {
    _userUtilities = null;
//    _utilityID = null;
//    _type = null;
    _selectedUser = null;

    _dotIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-dot my-2' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'/></svg>";
    _caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
    _caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";
    _plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
    _pencilIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-pencil-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg>";
    _searchIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-search' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'/><path fill-rule='evenodd' d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'/></svg>";
    _loginIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-door-open' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM11.5 2H11V1h.5A1.5 1.5 0 0 1 13 2.5V15h-1V2.5a.5.5 0 0 0-.5-.5z'/><path fill-rule='evenodd' d='M10.828.122A.5.5 0 0 1 11 .5V15h-1V1.077l-6 .857V15H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117z'/><path d='M8 9c0 .552.224 1 .5 1s.5-.448.5-1-.224-1-.5-1-.5.448-.5 1z'/></svg>";
    _createNewAccountIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";

    _buttonID = "loginButton";
    _divID = "loginDiv";
    _browserUsersID = "loginDivBrowserUsers";
    _sessionUsersID = "loginDivSessionUsers";
    _usernameID = "loginDivUsername";
    _passwordID = "loginDivPassword";
    _messagesDivID = "loginDivMessages";
    _loginButtonID = "loginDivButton";
    _forgotPasswordButtonID = "loginDivForgotPasswordButton";

    constructor (userUtilities, group) {
        super();
        const self = this;
        this._userUtilities = userUtilities;
        this._group = group;
//        this._type = "user";
//        this._utilityID = "userUtility";

//        this._build();

        $(document).ready(function() {
            self.button.on("click", function (e) {
                self.utilities.closeAllUtilityMenus(self._loginButtonID);
                if (self.div.hasClass("hidden")) {
                    self.div.removeClass("hidden");
                    this.blur();
                    self._manage();
                    self.username.focus();
                }
                else {
                    self._close();
                }
                e.stopPropagation();
            });

            self.div.find("input").on("keypress", function (e) {
                e.stopPropagation();
            });

            self.div.find("input").on("keyup", function (e) {
                self._manage();
                e.stopPropagation();
            });

            self.div.on("click", function (e) {
                e.stopPropagation();
            });
        }); 
    }

    get userUtilities()         { return this._userUtilities; }
    get utilities()             { return this._utilities; }
    get app()                   { return this._utilities.app; }
    get group()                 { return this._group(); }
    get current()               { return this.group.current; }
    get lines()                 { return this.app.editor.lines; }
    get buttons()               { return this.app.buttons; }
    get storagePermanence()     { return this.current.storagePermanence; }

    get button()                { return $("#" + this._buttonID); }
    get div()                   { return $("#" + this._divID); }
    get browserUsers()          { return $("#" + this._browserUsersID); }
    get sessionUsers()          { return $("#" + this._sessionUsersID); }
    get username()              { return $("#" + this._usernameID); }
    get password()              { return $("#" + this._passwordID); }
    get messagesDiv()           { return $("#" + this._messagesDivID); }
    get loginButton()           { return $("#" + this._loginButtonID); }
    get forgotPasswordButton()  { return $("#" + this._forgotPasswordButtonID); }

    build() {
        const loginIcon = this._loginIcon;

        const button = "<button id = '" + this._buttonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + loginIcon + "</button>";
        const div = "<div id = '" + this._divID + "' class = 'hidden userMenu'></div>";
        const browserUsers = "<div id = '" + this._browserUsersID + "'></div>";
        const sessionUsers = "<div id = '" + this._sessionUsersID + "'></div>";
        const username = "<input id = '" + this._usernameID + "' placeholder = 'username' size = '50'>";
        const password = "<input id = '" + this._passwordID + "' type = 'password' placeholder = 'password' size = '30'>";
        const messages = "<div id = '" + this._messagesDivID + "'></div>";
        const action = "<button id = '" + this._loginButtonID + "' type = 'button'>Log in</button>";

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
    }

    manage() {
        if (this._selectedUser || this.username.val()) {
            if (this._selectedUser) { }
            this._enterPasswordStep();
        }
        else { this._selectUserNameStep(); }
    }

    _reset() {
        this._selectedUser = "";
        this._selectedUserContainer = "";
        this.username.val("");
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
                console.log("logging in");
                self.group.loadFrom(self._selectedUserContainer, parseInt($(this).val()));
                self.utilities.manage("user");
                self.utilities.reset();
                self._close();
            }
            else {
                self._manage();
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
                self.userUtilities.reset();
                self._close();
            }
            else {
                self._manage();
            }
            e.stopPropagation();
        });
    }

    _selectUserNameStep() {
        this.browserUsers.find("button").show();
        this.sessionUsers.find("button").show();
        this.username.show();
        this.password.hide();
        this.loginButton.hide();
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
        this.loginButton.show();
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
        if (except != this._buttonID) {
            this.div.addClass("hidden");
            this.button.focusout();
        }
    }
}