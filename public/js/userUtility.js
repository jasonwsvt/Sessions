/* utilities class links to sessions class
*/

class UserUtility {
    _utilities = null;
    _utilityID = null;
    _type = null;

    _dotIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-dot my-2' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'/></svg>";
    _caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
    _caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";
    _plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
    _pencilIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-pencil-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg>";
    _searchIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-search' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'/><path fill-rule='evenodd' d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'/></svg>";
    _loginIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-door-open' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM11.5 2H11V1h.5A1.5 1.5 0 0 1 13 2.5V15h-1V2.5a.5.5 0 0 0-.5-.5z'/><path fill-rule='evenodd' d='M10.828.122A.5.5 0 0 1 11 .5V15h-1V1.077l-6 .857V15H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117z'/><path d='M8 9c0 .552.224 1 .5 1s.5-.448.5-1-.224-1-.5-1-.5.448-.5 1z'/></svg>";
    _createNewAccountIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";

    _settingsButtonID = "settingsButton";
    _settingsDivID = "settingsDiv";
    _settingsDivUsernameID = "settingsDivUsername";
    _settingsDivCurrentPasswordID = "settingsDivCurrentPassword";
    _settingsDivNewPassword1ID = "settingsDivNewPassword1";
    _settingsDivNewPassword2ID = "settingsDivNewPassword2";
    _settingsDivEmailID = "settingsDivEmail";
    _settingsDivUsernameLocalToolID = "settingsDivUsernameLocalTool";
    _settingsDivUsernameServerToolID = "settingsDivUsernameServerTool";
    _settingsDivPasswordLocalToolID = "settingsDivPasswordLocalTool";
    _settingsDivPasswordServerToolID = "settingsDivPasswordServerTool";
    _settingsDivEmailLocalToolID = "settingsDivEmailLocalTool";
    _settingsDivEmailServerToolID = "settingsDivEmailServerTool";
    _settingsDivMessagesID = "settingsDivMessages";
    _settingsDivActionID = "settingsDivAction";
    _settingsDivOptionsID = "settingsDivOptions";
    _backupFrequencyLocalToolID = "backupFrequencyLocalTool";
    _backupFrequencyServerToolID = "backupFrequencyServerTool";

    _loginButtonID = "loginButton";
    _loginDivID = "loginDiv";
    _loginDivUsernameID = "loginDivUsername";
    _loginDivPasswordID = "loginDivPassword";
    _loginDivForgotPasswordButtonID = "loginDivForgotPasswordButton";

    _newAccountButtonID = "createNewAccountButton";
    _newAccountDivID = "createNewAccountDiv";
    _newAccountDivUsernameID = "createNewAccountDivUsername";
    _newAccountDivPasswordID = "createNewAccountDivPassword";

    constructor (utilities, group) {
        const self = this;
        this._utilities = utilities;
        this._group = group;
        this._type = "user";
        this._utilityID = "userUtility";

        this._build();

        $(document).ready(function() {
            self.settingsButton.on("click", function(e) {
                self.utilities.closeAllUtilityMenus(self._settingsButtonID);
                if (self.settingsDiv.hasClass("hidden")) {
                    self.settingsDiv.removeClass("hidden");
                    this.blur();
                    if (self.current.passwordHash == "" || self.current.passwordVerified) {
                        self.showSettingsMenu();
                        self.manageSettingsDivForm();
                    }
                    else {
                        this.showSettingsVerifyPasswordMenu();
                    }
                }
                else { console.log("got here");
                    self._closeSettingsMenu();
                }
                e.stopPropagation();
            });

            self.settingsDiv.find("input").on("keypress", function(e) {
                e.stopPropagation();
            });

            self.settingsDiv.find("input").on("keyup", function(e) {
                self.manageSettingsDivForm();
                e.stopPropagation();
            });

            self.settingsDiv.on("click", function(e) {
                e.stopPropagation();
            });

            self.loginButton.on("click", function(e) {
                self.utilities.closeAllUtilityMenus(self._loginButtonID);
                if (self.loginDiv.hasClass("hidden")) {
                    self.loginDiv.removeClass("hidden");
                    this.blur();
                }
                else {
                    self._closeLoginMenu();
                }
                e.stopPropagation();
            });

            self.newAccountButton.on("click", function(e) {
                self.utilities.closeAllUtilityMenus(self._newAccountButtonID);
                if (self.newAccountDiv.hasClass("hidden")) {
                    self.newAccountDiv.removeClass("hidden");
                    this.blur();
                }
                else {
                    self._closeNewAccountMenu();
                }
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
    get span()                          { return $("#" + this._utilityID); }
    get loginDiv()                      { return $("#" + this._loginDivID); }
    get settingsDiv()                   { return $("#" + this._settingsDivID); }
    get settingsButton()                { return $("#" + this._settingsButtonID); }
    get settingsDivID()                 { return $("#" + this._settingsDivID); }
    get settingsDivUsername()           { return $("#" + this._settingsDivUsernameID); }
    get settingsDivEmail()              { return $("#" + this._settingsDivEmailID); }
    get settingsDivPassword()           { return $("#" + this._settingsDivPasswordID); }
    get settingsDivFirstName()          { return $("#" + this._settingsDivFirstNameID); }
    get settingsDivUsername()           { return $("#" + this._settingsDivUsernameID); }
    get settingsDivCurrentPassword()    { return $("#" + this._settingsDivCurrentPasswordID); }
    get settingsDivNewPassword1()       { return $("#" + this._settingsDivNewPassword1ID); }
    get settingsDivNewPassword2()       { return $("#" + this._settingsDivNewPassword2ID); }
    get settingsDivEmail()              { return $("#" + this._settingsDivEmailID); }
    get settingsDivUsernameLocalTool()  { return $("#" + this._settingsDivUsernameLocalToolID); }
    get settingsDivUsernameServerTool() { return $("#" + this._settingsDivUsernameServerToolID); }
    get settingsDivPasswordLocalTool()  { return $("#" + this._settingsDivPasswordLocalToolID); }
    get settingsDivPasswordServerTool() { return $("#" + this._settingsDivPasswordServerToolID); }
    get settingsDivEmailLocalTool()     { return $("#" + this._settingsDivEmailLocalToolID); }
    get settingsDivEmailServerTool()    { return $("#" + this._settingsDivEmailServerToolID); }
    get settingsDivMessages()           { return $("#" + this._settingsDivMessagesID); }
    get settingsDivAction()             { return $("#" + this._settingsDivActionID); }
    get settingsDivOptions()            { return $("#" + this._settingsDivOptionsID); }
    get backupFrequencyLocalToolID()    { return $("#" + this._backupFrequencyLocalTool); }
    get backupFrequencyServerToolID()   { return $("#" + this._backupFrequencyServerTool); }
    get loginButton()                   { return $("#" + this._loginButtonID); }
    get loginDiv()                      { return $("#" + this._loginDivID); }
    get loginDivUsername()              { return $("#" + this._loginDivUsernameID); }
    get loginDivPassword()              { return $("#" + this._loginDivPasswordID); }
    get loginDivForgotPasswordButton()  { return $("#" + this._loginDivForgotPasswordButtonID); }
    get newAccountButton()              { return $("#" + this._createNewAccountButtonID); }
    get newAccountDiv()                 { return $("#" + this._createNewAccountDivID); }
    get newAccountDivUsername()         { return $("#" + this._createNewAccountDivUsernameID); }
    get newAccountDivPassword()         { return $("#" + this._createNewAccountDivPasswordID); }

    _build() {
        const plusIcon = this._plusIcon;
        const pencilIcon = this._pencilIcon;
        const searchIcon = this._searchIcon;
        const type = this._type;

        const prefix = "<div class = 'row'><div class = 'col-6'>";
        const infix = "</div><div class = 'col-3'>";
        const postfix = "</div>";
        const settingsButton = "<button id = '" + this._settingsButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'></button>";
        const settingsDiv = "<div id = '" + this._settingsDivID + "' class = 'container userMenu hidden'></div>";
        const username =  "<input id = '" + this._settingsDivUsernameID + "' type = 'text' placeholder = 'username' size = '30'>";
        const currentPassword = "<input id = '" + this._settingsDivCurrentPasswordID + "' type = 'password' placeholder = 'enter current password for settings' size = '30'>";
        const newPassword1 = "<input id = '" + this._settingsDivNewPassword1ID + "' type = 'password' placeholder = 'new password' size = '30'>";
        const newPassword2 = "<input id = '" + this._settingsDivNewPassword2ID + "' type = 'password' placeholder = 'retype new password' size = '30'>";
        const email = "<input id = '" + this._settingsDivEmailID + "' type = 'email' placeholder = 'email address' size = '30'>";

        const backupFrequencyLabel = "<label style = 'text-align: right; width: 100%'>Back-up Frequency:</label>";
        const localBackupFrequencies = [false, 5, 10, 20, 30, 45, 60, 120, 180, 240, 300]
            .map(f => { return "<option value = '" + f + "'>" + this.frequencyName(f) + "</option>"; }).join("");
        const backupFrequencyLocalTool = "<select id = '" + this._backupFrequencyServerToolID + "'>" + localBackupFrequencies + "</select>";
        const serverBackupFrequencies = [false, 60, 2*60, 3*60, 4*60, 5*60, 10*60, 20*60, 40*60, 60*60, 2*60*60, 5*60*60, 10*60*60]
            .map(f => { return "<option value = '" + f + "'>" + this.frequencyName(f) + "</option>"; }).join("");
        const backupFrequencyServerTool = "<select id = '" + this._backupFrequencyServerToolID + "'>" + serverBackupFrequencies + "</select>";

        const settingsDivMessages = "<div id = '" + this._settingsDivMessagesID + "'></div>";
        const settingsDivAction = "<div id = '" + this._settingsDivActionID + "'></div>";
        const settingsDivOptions = "<div id = '" + this._settingsDivOptionsID + "'></div>";

//        const loginButton = "<button id = '" + this._loginButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + pencilIcon + "</button>";
//        const loginDiv = "<div id = '" + this._loginDivID + "' class = 'hidden userMenu'></div>";
//        const loginInput = "<input id = '" + this._loginInputID + "' placeholder = 'rename the selected " + type + "' size = '50'>";

//        const newAccountButton = "<button id = '" + this._newAccountButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + plusIcon + "</button>";
//        const newAccountDiv = "<div id = '" + this._newAccountDivID + "' class = 'hidden userMenu'></div>";
//        const newAccountInput = "<input id = '" + this._newAccountInputID + "' placeholder = 'rename the selected " + type + "' size = '50'>";

        this.span.append(settingsButton + settingsDiv);
        this.settingsDiv.append(username);
        this.settingsDiv.append(currentPassword);
        this.settingsDiv.append(newPassword1);
        this.settingsDiv.append(newPassword2);
        this.settingsDiv.append(email);
        this.settingsDiv.append(prefix +                        infix + "Local"                  + infix + "Server"                  + postfix);
        this.settingsDiv.append(prefix + backupFrequencyLabel + infix + backupFrequencyLocalTool + infix + backupFrequencyServerTool + postfix);
        this.settingsDiv.append(settingsDivMessages);
        this.settingsDiv.append(settingsDivAction);
        this.settingsDiv.append(settingsDivOptions);

        this.settingsButton.html(this.current.userName);
        this.settingsDiv.css("left", String(this.settingsButton.position().left) + "px");
        this.settingsDiv.css("top", String(this.settingsButton.position().top + this.settingsButton.outerHeight()) + "px");
        this.settingsDivUsername.val(this.current.userName);

//        this.span.append(loginButton + loginDiv);
//        this.span.append(newAccountButton + newAccountDiv);
//        this.newAccountDiv.addClass("hidden");
//        this.newAccountDiv.append(newAccountInput);
    }

    manage() {
        if (this.current.passwordHash == "" || this.current.passwordVerified) {
            this.showSettingsMenu();
        }
        else {
            this.showSettingsVerifyPasswordMenu();
        }
    }

    showSettingsVerifyPasswordMenu() {
        if (!this.settingsDivUsername.hasClass("hidden")) { this.settingsDivUsername.addClass("hidden"); }
        if (!this.settingsDivEmail.hasClass("hidden")) { this.settingsDivEmail.addClass("hidden"); }
        if (!this.settingsDivCurrentPassword.hasClass("hidden")) { this.settingsDivCurrentPassword.addClass("hidden"); }
        if (!this.settingsDivNewPassword1.hasClass("hidden")) { this.settingsDivNewPassword1.addClass("hidden"); }
        if (!this.settingsDivNewPassword2.hasClass("hidden")) { this.settingsDivNewPassword2.addClass("hidden"); }
        if (this.settingsDivCurrentPassword.hasClass("hidden")) { this.settingsDivCurrentPassword.removeClass("hidden"); }
    }

    showSettingsMenu() {
        if(this.settingsDivUsername.hasClass("hidden")) { this.settingsDivUsername.removeClass("hidden"); }
        if(this.settingsDivEmail.hasClass("hidden")) { this.settingsDivEmail.removeClass("hidden"); }
        if(this.settingsDivCurrentPassword.hasClass("hidden")) { this.settingsDivCurrentPassword.removeClass("hidden"); }
        if(this.settingsDivNewPassword1.hasClass("hidden")) { this.settingsDivNewPassword1.removeClass("hidden"); }
        if(this.settingsDivNewPassword2.hasClass("hidden")) { this.settingsDivNewPassword2.removeClass("hidden"); }
        if(!this.settingsDivCurrentPassword.hasClass("hidden")) { this.settingsDivCurrentPassword.addClass("hidden"); }
    }

    manageLoginMenu() {
//        this.loginDiv.css("left", String(this.loginButton.position().left) + "px");
//        this.loginDiv.css("top", String(this.loginButton.position().top + this.loginButton.outerHeight()) + "px");
    }

    manageNewAccountMenu() {
//        this.newAccountDiv.css("left", String(this.newAccountButton.position().left) + "px");
//        this.newAccountDiv.css("top", String(this.newAccountButton.position().top + this.newAccountButton.outerHeight()) + "px");
    }

    setButton(button, color, text) {
        if (button.hasClass("btn-primary"))   { button.removeClass("btn-primary"); }
        if (button.hasClass("btn-secondary")) { button.removeClass("btn-secondary"); }
        if (button.hasClass("btn-success"))   { button.removeClass("btn-success"); }
        if (button.hasClass("btn-danger"))    { button.removeClass("btn-danger"); }
        if (button.hasClass("btn-warning"))   { button.removeClass("btn-warning"); }
        if (button.hasClass("btn-info"))      { button.removeClass("btn-info"); }
        if (button.hasClass("btn-light"))     { button.removeClass("btn-light"); }
        if (button.hasClass("btn-dark"))      { button.removeClass("btn-dark"); }

        switch(color) {
            case "blue":   button.addClass("btn-primary"); break;
            case "gray":   button.addClass("btn-secondary"); break;
            case "green":  button.addClass("btn-success"); break;
            case "red":    button.addClass("btn-danger"); break;
            case "yellow": button.addClass("btn-warning"); break;
            case "cyan":   button.addClass("btn-info"); break;
            case "white":  button.addClass("btn-light"); break;
            case "black":  button.addClass("btn-dark"); break;
            case "clear":  button.addClass("btn-link"); break;
        }

        button.text(text);
    }

    frequencyName(seconds) {
        return (seconds == false) ? "Manual" : 
               (seconds < 60)     ? `${seconds} seconds` : 
               (seconds == 60)    ? "1 minute" :
               (seconds < 3600)   ? `${seconds / 60} minutes` :
               (seconds == 3600)  ? "1 hour" :
                                    `${seconds / 3600} hours`;
    }

    manageSettingsDivForm() {
        var messages = [], actions = [], options = [];
        var action = "";
        const uname = this.unameState;
        const curPW = this.curPWState;
        const newPW = this.newPWState;
        const email = this.emailState;
        const server = this.current.useServerStorage;
        const local = this.current.useLocalStorage;

        if (curPW == "Invalid")              { messages.push("Current password is invalid."); }
        else {
            if (uname == "Invalid")          { messages.push("Usernames must contain only alphanumeric characters and ., -, and _.")}
            if (uname == "Emptied")          { messages.push("Usernames are required."); }
            if (uname == "Local duplicate")  { messages.push("Username is duplicated locally."); }
            if (uname == "Server duplicate") { messages.push("Username is duplicated on the server."); }
            if (uname == "Empty")            { messages.push("Username must have at least one character."); }
            if (newPW == "Different")        { messages.push("New passwords must match."); }
            if (email == "Invalid")          { messages.push("Email address must be valid or empty."); }

            if (!server) {
                if (uname == "Default") {
                    messages.push("Server storage requires a username that's not the default.");
                }
                if ((curPW == "Weak" && newPW == "Empty") || newPW == "Weak") {
                    messages.push("Server storage requires a stronger password.");
                }
                if (curPW == "Empty" && newPW == "Empty") {
                    messages.push("Server storage requires a strong password.");
                }
            }

            if (server) {
                if (uname == "Default") { messages.push("The username must not be the default."); }
                options.push("Remove server storage");
            }

            if (local) {
                options.push("Remove local storage");
            }

            if (!local && !server) {
                if (["Filled", "Unchanged"].includes(uname) &&
                    ((curPW == "Strong" && newPW == "Empty") || newPW == "Strong") && email != "Invalid") {
                    options.push("Create an account with local and server storage");
                }
                if (["Filled", "Local duplicate", "Unchanged"].includes(uname) &&
                    ((curPW == "Strong" && newPW == "Empty") || newPW == "Strong") && email != "Invalid") {
                    options.push("Create an account with server storage");
                }
                if (["Filled", "Default", "Server duplicate", "Unchanged"].includes(uname) && email != "Invalid" &&
                    ((["Empty", "Weak", "Strong"].includes(curPW) && newPW == "Empty") || ["Empty", "Weak", "Strong"].includes(newPW))) {
                    options.push("Create an account with local storage");
                }
            }

            if (local && !server) {
                if (["Filled", "Default", "Server duplicate"].includes(uname)) { actions.push("Change username"); }
                if (curPW == "Empty" && ["Weak", "Strong"].includes(newPW)) { actions.push("Add password"); }
                if (curPW != "Empty" && ["Weak", "Strong"].includes(newPW)) { actions.push("Change password"); }
                if (curPW != "Empty" && newPW == "Empty") { options.push("Remove password"); }
                if (["Filled", "Unchanged"].includes(uname) &&
                    ((curPW == "Strong" && newPW == "Empty") || newPW == "Strong") && email != "Invalid") {
                    options.push("Add server storage");
                }
            }

            if (!local && server) {
                if (["Filled", "Local duplicate"].includes(uname)) { actions.push("Change username"); }
                if (newPW == "Strong") { actions.push("Change password"); }
                if (["Filled", "Unchanged"].includes(uname) &&
                    ((CurPW == "Strong" && newPW == "Empty") || newPW == "Strong") && email != "Invalid") {
                    options.push("Add local storage");
                }
            }

            if (local || server) {
                if (email == "Filled") { actions.push("Set email address"); }
                if (email == "Emptied") { actions.push("Remove email address"); }
                if (email == "Changed") { actions.push("Change email address"); }
            }
        }

        if (actions.length >= 2) {
            last = actions.pop();
            secondToLast = actions.pop();
            action = actions.join(", ") + [secondToLast, last].join(", and ");
        }
        else if (actions.length) { action = actions[0]; }
        else { action = ""; }
        this.settingsDivMessages.html(messages.join("<br>"));
        this.settingsDivAction.html(action);
        this.settingsDivOptions.html(options.join("<br>"));
    }

    get unameState() { //Unchanged, Emptied, Duplicate, Filled
        const current = this.current.userName;
        const fieldVal = this.settingsDivUsername.val();
        const deflt = this.group.defaultName;
        const valid = /^[a-z0-9_\-.]{5,20}$/;

        if (!valid.test(fieldVal)) { return "Invalid"; }
        if (fieldVal == deflt) { return "Default"; }
        if (current.length > 0 && fieldVal.length == 0) { return "Emptied"; }
        const localDup = this.localDupExists(fieldVal);
        const serverDup = false;
        if (localDup && serverDup) { return "Duplicate"; }
        if (localDup) { return "Local duplicate"; }
        if (serverDup) { return "Server duplicate"; }
        if (current == fieldVal) { return "Unchanged"; }
        return "Filled";
    }

    get curPWState() { //Empty, Invalid, Insecure, Strong
        const fieldVal = this.settingsDivCurrentPassword.val();
        const hashed = this.hashedPassword(fieldVal);
        const current = this.current.passwordHash;
        const strongComplexity = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#$%^&*()_+\-|~=`{}\[\]:\";\'<>?,.\/])(?=.{8,127})/;
        const strongLength = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{20,127})/;
        if (current == "" && fieldVal == "") { return "Empty"; }
        if (hashed != current) { return "Invalid"; }
        if (!strongComplexity.test(fieldVal) && !strongLength.test(fieldVal)) { return "Weak"; }
        return "Strong";
    }

    get newPWState() { //Empty, Different, Insecure, Strong
        const pw1 = this.settingsDivNewPassword1.val();
        const pw2 = this.settingsDivNewPassword2.val();
        const strongComplexity = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#$%^&*()_+\-|~=`{}\[\]:\";\'<>?,.\/])(?=.{8,127})/;
        const strongLength = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{20,127})/;
//        console.log(pw1, pw2, strongComplexity.test(pw1), strongLength.test(pw1));
        if (pw1.length == 0 && pw2.length == 0) { return "Empty"; }
        if (pw1 != pw2) { return "Different"; }
        if (!strongComplexity.test(pw1) && !strongLength.test(pw1)) { return "Weak"; }
        return "Strong";
    }

    get PWsEqual() {
        const pw1 = this.settingsDivNewPassword1.val();
        const pw2 = this.settingsDivNewPassword2.val();
        const cur = this.settingsDivCurrentPassword.val();

        return (pw1 == pw2 && pw2 == cur);
    }

    get emailState() { //Unchanged, Invalid, Emptied, Filled, Changed
        const fieldVal = this.settingsDivEmail.val();
        const current = this.current.email;
        const valid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if (fieldVal == current) { return "Unchanged"; }
        if (!valid.test(fieldVal) && fieldVal.length != 0) { return "Invalid"; }
        if (fieldVal.length != 0 && current.length == 0) { return "Emptied"; }
        if (fieldVal.length == 0 && current.length != 0) { return "Filled"; }
        return "Changed";
    }
    
    localDupExists(userName) {
        return Object.keys(localStorage).includes("users") 
            ? JSTOR.parse(localStorage.getItem("users")).some(user => (user.userName == userName)) : false;
    }

    action(actions) {
        var funcs = [];
        actions.forEach(action => {
            switch (action) {
                case "Set username":
                case "Change username":      
                    funcs.push(() => { this.current.userName = this.settingsDivUsername.val(); });
                    break;
                case "Add password": 
                case "Change password":      
                    funcs.push(() => { this.current.passwordHash = this._newPasswordHash; });
                    break;
                case "Set email address":
                case "Change email address": 
                    funcs.push(() => { this.current.email = this.settingsDivEmail.val(); });
                    break;
                case "Remove email address": 
                    funcs.push(() => { this.current.email = ""; });
                    break;
                default: console.log(action + "is not supported.");
            }
        });
    }

    option(options) {
        var func;
        options.forEach((option, index) => {
            switch (option) {
                case "Create an account with local and server storage":
                    cl = "btn-success";
                    func = () => { this.current.useServerStorage = true; this.current.useLocalStorage = true; };
                    break;
                case "Add local storage":                               
                    cl = "btn-success";
                    func = () => { this.current.useLocalStorage = true; };
                    break;
                case "Create an account with local storage":            
                    cl = "btn-success";
                    func = () => { this.current.useLocalStorage = true; };
                    break;
                case "Add server storage":                              
                    cl = "btn-success";
                    func = () => { this.current.useServerStorage = true; }; 
                    break;
                case "Create an account with server storage":           
                    cl = "btn-success";
                    func = () => { this.current.useServerStorage = true; }; 
                    break;
                case "Remove password":                                 
                    cl = "btn-warning";
                    func = () => { this.current.passwordHash = ""; }; 
                    break;
                case "Remove server storage":
                    cl = "btn-danger";
                    break; //If no local storage, download all data to sessionStorage?
                case "Remove local storage": 
                    cl = "btn-danger";
                    break; //if no server storage, move all data to sessionStorage?
                default: console.log(option + "is not supported.");
            }

            this.settingsDivOptions.append("<button id = 'settingsDivOption" + index + "' type = 'button' class = 'btn " + cl + "'></button>");
            $("#settingsDivOption" + index).on("click", (e) => {
                func();
                self.manageSettingsDivForm();
            });
        });
    }

    hashedPassword(password) {
        return "hashed " + password;
    }

    closeMenus(except) {
        if (except != this._settingsButtonID)   { this._closeSettingsMenu(); }
//        if (except != this._loginButtonID)      { this._closeLoginMenu(); }
//        if (except != this._newAccountButtonID) { this._closeNewAccountMenu(); }
    }

    _closeSettingsMenu() {
        this.settingsDiv.addClass("hidden");
//        this.settingsDiv.removeClass("userMenu");
        this.settingsButton.blur();
    }

    _closeLoginMenu() {
        this.loginDiv.addClass("hidden");
        this.loginDiv.removeClass("userMenu");
        this.loginButton.focusout();
    }

    _closeNewAccountMenu() {
        this.newAccountDiv.addClass("hidden");
        this.newAccountAddDiv.removeClass("userMenu");
        this.newAccountAddButton.focusout();
    }
}