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
                console.log(self._type, self.settingsDiv.hasClass("hidden"))
                if (self.settingsDiv.hasClass("hidden")) {
                    self.settingsDiv.removeClass("hidden");
                    this.blur();
                }
                else { console.log("got here");
                    self._closeSettingsMenu();
                }
                e.stopPropagation();
            });

            self.settingsDiv.find("input").on("keyup", function(e) {
                this.manageSettingsDivForm();
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
        const usernameLocalTool = "<button id = '" + this._settingsDivUsernameLocalToolID + "' type = 'button' class = 'btn btn-dark btn-sm'>";
        const usernameServerTool = "<button id = '" + this._settingsDivUsernameServerToolID + "' type = 'button' class = 'btn btn-dark btn-sm'>";
        const currentPassword = "<input id = '" + this._settingsDivCurrentPasswordID + "' type = 'password' placeholder = 'current password' size = '30'>";
        const newPassword1 = "<input id = '" + this._settingsDivPassword1ID + "' type = 'password' placeholder = 'new password' size = '30'>";
        const newPassword2 = "<input id = '" + this._settingsDivPassword2ID + "' type = 'password' placeholder = 'retype new password' size = '30'>";
        const passwordLocalTool = "<button id = '" + this._settingsDivPasswordLocalToolID + "' type = 'button' class = 'btn btn-dark btn-sm'>";
        const passwordServerTool = "<button id = '" + this._settingsDivPasswordServerToolID + "' type = 'button' class = 'btn btn-dark btn-sm'>";
        const email = "<input id = '" + this._settingsDivEmailID + "' type = 'email' placeholder = 'email address' size = '30'>";
        const emailLocalTool = "<button id = '" + this._settingsDivEmailLocalToolID + "' type = 'button' class = 'btn btn-dark btn-sm'>";
        const emailServerTool = "<button id = '" + this._settingsDivEmailServerToolID + "' type = 'button' class = 'btn btn-dark btn-sm'>";

        const backupFrequencyLabel = "<label style = 'text-align: right; width: 100%'>Back-up Frequency:</label>";
        var backupFrequencies = [2, 3, 4, 5, 10, 15, 20, 30, 40, 60]
            .map(f => { return String(f) + " minutes"; })
            .map(f => { return "<option value = '" + f + "'>" + f + "</option>"; })
            .join("");
        const backupFrequencyServerTool = "<select id = '" + this._backupFrequencyServerToolID + "'>" + backupFrequencies + "</select>";
        backupFrequencies = [5, 10, 20, 30, 45]
            .map(f => { return String(f) + " seconds"; })
            .map(f => { return "<option value = '" + f + "'>" + f + "</option>"; })
            .join("");
        backupFrequencies.push("1 minute");
        backupFrequencies.concat(backupFrequencies);
        const backupFrequencyLocalTool = "<select id = '" + this._backupFrequencyServerToolID + "'>" + backupFrequencies + "</select>";


//        const loginButton = "<button id = '" + this._loginButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + pencilIcon + "</button>";
//        const loginDiv = "<div id = '" + this._loginDivID + "' class = 'hidden userMenu'></div>";
//        const loginInput = "<input id = '" + this._loginInputID + "' placeholder = 'rename the selected " + type + "' size = '50'>";

//        const newAccountButton = "<button id = '" + this._newAccountButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + plusIcon + "</button>";
//        const newAccountDiv = "<div id = '" + this._newAccountDivID + "' class = 'hidden userMenu'></div>";
//        const newAccountInput = "<input id = '" + this._newAccountInputID + "' placeholder = 'rename the selected " + type + "' size = '50'>";

        this.span.append(settingsButton + settingsDiv);
        this.settingsDiv.append(prefix + username             + infix + usernameTool        + postfix);
        this.settingsDiv.append(prefix + currentPassword
                                       + newPassword1 + "<br>"
                                       + newPassword2         + infix + passwordTool        + postfix);
        this.settingsDiv.append(prefix + email                + infix + emailTool           + postfix);
        this.settingsDiv.append(prefix +                        infix + "Local"                  + infix + "Server"                  + postfix);
        this.settingsDiv.append(prefix + backupFrequencyLabel + infix + backupFrequencyLocalTool + infix + backupFrequencyServerTool + postfix);
//        this.span.append(loginButton + loginDiv);
//        this.span.append(newAccountButton + newAccountDiv);
//        this.newAccountDiv.addClass("hidden");
//        this.newAccountDiv.append(newAccountInput);
    }

    manage() {
        this.settingsButton.html(this.current.userName);
        this.settingsDiv.css("left", String(this.settingsButton.position().left) + "px");
        this.settingsDiv.css("top", String(this.settingsButton.position().top + this.settingsButton.outerHeight()) + "px");
        this.settingsDivUsername.val(this.current.userName);

        this.manageSettingsDivForm();
        
//        this.loginDiv.css("left", String(this.loginButton.position().left) + "px");
//        this.loginDiv.css("top", String(this.loginButton.position().top + this.loginButton.outerHeight()) + "px");
//        this.newAccountDiv.css("left", String(this.newAccountButton.position().left) + "px");
//        this.newAccountDiv.css("top", String(this.newAccountButton.position().top + this.newAccountButton.outerHeight()) + "px");
                
    }

    manageSettingsDivForm() {
        var user = settingsDivUsername,
            userLT = settingsDivUsernameLocalTool,
            userST = settingsDivUsernameServerTool,
            curpw = settingsDivCurrentPassword,
            newpw1 = settingsDivNewPassword1,
            newpw2 = settingsDivNewPassword2,
            pwLT = settingsDivPasswordLocalTool,
            pwST = settingsDivPasswordServerTool,
            email = settingsDivEmail,
            emailLT = settingsDivEmailLocalTool,
            emailST = settingsDivEmailServerTool
            setButton = this.setButton;

        if (!this.user.current.hasLocalAccount && !this.user.current.hasServerAccount) {
            if (!curpw.parent.parent.hasClass("hidden")) { curpw.parent.parent.addClass("hidden"); }
        }
        else if (curpw.parent.parent.hasClass("hidden")) { curpw.parent.parent.removeClass("hidden"); }
        
        if (user.val() != this.current.userName) { 
            setButton(userLT, "red", (this.group.findByName(user.val()) != null) ? "Must be unique." : "Update Username");
            setButton(userST, "yellow", "Check if available"); 
        }
        else { userLT.text("No change."); userST.text("No change."); }

        if (curpw.val().length) {
            if (newpw1.val().length) {
                if (newpw1.val() == newpw2.val()) {
                    this.setButton(userLT, "green", "Reset password");

                }
                else {

                }
            }
            else {

            }
        }
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