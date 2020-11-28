/* utilities class links to sessions class
*/

class UserUtility extends StorageUtility {
    _utilities = null;
    _utilityID = null;
    _type = null;
    _selectedUser = null;

    _dotIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-dot my-2' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'/></svg>";
    _caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
    _caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";
    _plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
    _pencilIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-pencil-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg>";
    _searchIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-search' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'/><path fill-rule='evenodd' d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'/></svg>";
    _loginIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-door-open' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM11.5 2H11V1h.5A1.5 1.5 0 0 1 13 2.5V15h-1V2.5a.5.5 0 0 0-.5-.5z'/><path fill-rule='evenodd' d='M10.828.122A.5.5 0 0 1 11 .5V15h-1V1.077l-6 .857V15H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117z'/><path d='M8 9c0 .552.224 1 .5 1s.5-.448.5-1-.224-1-.5-1-.5.448-.5 1z'/></svg>";
    _createNewAccountIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";

    _loginButtonID = "loginButton";
    _loginDivID = "loginDiv";
    _loginDivBrowserUsersID = "loginDivBrowserUsers";
    _loginDivSessionUsersID = "loginDivSessionUsers";
    _loginDivUsernameID = "loginDivUsername";
    _loginDivPasswordID = "loginDivPassword";
    _loginDivMessagesID = "loginDivMessages";
    _loginDivButtonID = "loginDivButton";
    _loginDivForgotPasswordButtonID = "loginDivForgotPasswordButton";

    constructor (utilities, group) {
        super();
        const self = this;
        this._utilities = utilities;
        this._group = group;
        this._type = "user";
        this._utilityID = "userUtility";

        this._build();

        $(document).ready(function() {
            self.loginButton.on("click", function (e) {
                self.utilities.closeAllUtilityMenus(self._loginButtonID);
                if (self.loginDiv.hasClass("hidden")) {
                    self.loginDiv.removeClass("hidden");
                    this.blur();
                    self._manageLoginMenu();
                    self.loginDivUsername.focus();
                }
                else {
                    self._closeLoginMenu();
                }
                e.stopPropagation();
            });

            self.loginDiv.find("input").on("keypress", function (e) {
                e.stopPropagation();
            });

            self.loginDiv.find("input").on("keyup", function (e) {
                self._manageLoginMenu();
                e.stopPropagation();
            });

            self.loginDiv.on("click", function (e) {
                e.stopPropagation();
            });
        }); 
    }

    get utilities()                     { return this._utilities; }
    get app()                           { return this._utilities.app; }
    get group()                         { return this._group(); }
    get current()                       { return this.group.current; }
    get lines()                         { return this.app.editor.lines; }
    get buttons()                       { return this.app.buttons; }
    get storagePermanence()             { return this.current.storagePermanence; }
    get div()                           { return $("#" + this._utilityID); }

    get loginButton()                   { return $("#" + this._loginButtonID); }
    get loginDiv()                      { return $("#" + this._loginDivID); }
    get loginDivBrowserUsers()          { return $("#" + this._loginDivBrowserUsersID); }
    get loginDivSessionUsers()          { return $("#" + this._loginDivSessionUsersID); }
    get loginDivUsername()              { return $("#" + this._loginDivUsernameID); }
    get loginDivPassword()              { return $("#" + this._loginDivPasswordID); }
    get loginDivMessages()              { return $("#" + this._loginDivMessagesID); }
    get loginDivButton()                { return $("#" + this._loginDivButtonID); }
    get loginDivForgotPasswordButton()  { return $("#" + this._loginDivForgotPasswordButtonID); }

    _build() {
        this._buildLoginMenu();
    }

    _buildLoginMenu() {
        const loginIcon = this._loginIcon;

        const loginButton = "<button id = '" + this._loginButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + loginIcon + "</button>";
        const loginDiv = "<div id = '" + this._loginDivID + "' class = 'hidden userMenu'></div>";
        const browserUsers = "<div id = '" + this._loginDivBrowserUsersID + "'></div>";
        const sessionUsers = "<div id = '" + this._loginDivSessionUsersID + "'></div>";
        const username = "<input id = '" + this._loginDivUsernameID + "' placeholder = 'username' size = '50'>";
        const password = "<input id = '" + this._loginDivPasswordID + "' type = 'password' placeholder = 'password' size = '30'>";
        const messages = "<div id = '" + this._loginDivMessagesID + "'></div>";
        const action = "<button id = '" + this._loginDivButtonID + "' type = 'button'>Log in</button>";

        this.div.append(loginButton + loginDiv);
        this.loginDiv.addClass("container");
        this.loginDiv.append(browserUsers);
        this.loginDiv.append(sessionUsers);
        this.loginDiv.append(username);
        this.loginDiv.append(password);
        this.loginDiv.append(messages);
        this.loginDiv.append(action);
   
        this.loginDiv.css("left", String(this.settingsButton.position().left) + "px");
        this.loginDiv.css("top", String(this.settingsButton.position().top + 32) + "px");
        this._resetLoginMenu();
    }

    manage() {
        this._manageLoginMenu();
    }

    _manageLoginMenu() {
        if (this._selectedUser || this.loginDivUsername.val()) {
            if (this._selectedUser) { }
            this._enterPasswordStep();
        }
        else { this._selectUserNameStep(); }
    }

    _reset() {
        this._resetLoginMenu();
    }

    _resetLoginMenu() {
        this._selectedUser = "";
        this._selectedUserContainer = "";
        this.loginDivUsername.val("");
        this.loginDivPassword.val("");
        this._propagateUserNameButtons();
    }

    _propagateUserNameButtons() {
        const self = this;

        this.loginDivBrowserUsers.empty();
        const browserUsers = this.group.bUsers.filter(r => (r.id != this.current.id && !r.hidden));
        browserUsers.forEach(r => {
            this.loginDivBrowserUsers.append("<button type = 'button' class = 'btn btn-primary' value = '" + r.id + "'>" + r.userName + "</button>");
        });
        this.loginDivBrowserUsers.find("button").on("click", function (e) {
            this.blur();
            self._selectedUser = (self._selectedUser == $(this).text()) ? "" : $(this).text();
            self._selectedUserContainer = localStorage;
            console.log(self.noPasswordAccount(), $(this).val());
            if (self.noPasswordAccount()) {
                console.log("loggin in");
                self.group.loadFrom(self._selectedUserContainer, parseInt($(this).val()));
                self.utilities.manage("user");
                self._resetLoginMenu();
                self._resetSettingsMenu();
                self._closeLoginMenu();
            }
            else {
                self._manageLoginMenu();
            }
            e.stopPropagation();
        });

        this.loginDivSessionUsers.empty();
        const sessionUsers = this.sUsers.filter(r => (r.userName != this.current.userName));
        sessionUsers.forEach(r => {
            this.loginDivSessionUsers.append("<button type = 'button' class = 'btn btn-warning' value = '" + r.id + "'>" + r.userName + "</button>");
        });
        this.loginDivSessionUsers.find("button").on("click", function (e) {
            this.blur();
            self._selectedUser = (self._selectedUser == $(this).text()) ? "" : $(this).text();
            self._selectedUserContainer = sessionStorage;
            console.log(self.noPasswordAccount(), $(this).val());
            if (self.noPasswordAccount()) {
                console.log("switching account");
                self.group.loadFrom(self._selectedUserContainer, parseInt($(this).val()));
                self.utilities.manage("user");
                self._resetSettingsMenu();
                self._resetLoginMenu();
                self._closeLoginMenu();
            }
            else {
                self._manageLoginMenu();
            }
            e.stopPropagation();
        });
    }

    _selectUserNameStep() {
        this.loginDivBrowserUsers.find("button").show();
        this.loginDivSessionUsers.find("button").show();
        this.loginDivUsername.show();
        this.loginDivPassword.hide();
        this.loginDivButton.hide();
        this.loginDivMessages.empty();
    }

    _enterPasswordStep() {
        var i, button, buttons;

        buttons = this.loginDivBrowserUsers.find("button");
        for (i = 0; i < buttons.length; i++) {
            button = buttons.eq(i);
            console.log(button);
            if (button.text() != this._selectedUser) { button.hide(); } else { button.show(); }
        }

        buttons = this.loginDivSessionUsers.find("button");
        for (i = 0; i < buttons.length; i++) {
            button = buttons.eq(i);
            console.log(button);
            if (button.text() != this._selectedUser) { button.hide(); } else { button.show(); }
        }

        if (this.loginDivUsername.val() == "") { this.loginDivUsername.hide(); }
        else { this.loginDivUsername.show(); }

        this.loginDivPassword.show();
        this.loginDivButton.show();
    }

    noPasswordAccount() {
        var user = this.userExists(this._selectedUserContainer, this._selectedUser);

        return (user && this.loginDivPassword.val() == "" && user.passwordHash == "");
    }

    verifyCredentials() {
        var container, user;
        if (this.loginDivUsername.val() != "") {
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
            if ((this.loginDivPassword.val() == "" && user.passwordHash == "") ||
                (this.hashedPassword(this.loginDivPassword.val()) == user.passwordHash)) {
                this.group.loadFrom(container, user);
            }
            else {
                this.loginDivMessages.text("Password invalid.");
            }
        }
        else {
            this.loginDivMessages.text("Username invalid.");
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

    closeMenus(except) {
        if (except != this._loginButtonID)      { this._closeLoginMenu(); }
    }

    _closeLoginMenu() {
        this.loginDiv.addClass("hidden");
        this.loginButton.focusout();
    }
}