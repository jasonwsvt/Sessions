/* utilities class links to sessions class
*/

class UserSettingsUtility {
    constructor (userUtilities) {
        this._userUtilities = userUtilities;
        this._type = "user";
        this._selectedUser = null;
    
        this._caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
        this._caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";
        this._plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
        this._pencilIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-pencil-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg>";
        this._searchIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-search' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'/><path fill-rule='evenodd' d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'/></svg>";
    
        this._buttonID = "settingsButton";
        this._divID = "settingsDiv";
        this._usernameID = "settingsDivUsername";
        this._currentPasswordID = "settingsDivCurrentPassword";
        this._newPassword1ID = "settingsDivNewPassword1";
        this._newPassword2ID = "settingsDivNewPassword2";
        this._emailID = "settingsDivEmail";
        this._rememberMeID = "settingsDivRememberMe";
        this._hiddenID = "settingsDivHidden";
        this._storageID = "settingsDivStorage";
        this._messagesDivID = "settingsDivMessages";
        this._actionDivID = "settingsDivAction";
        this._optionsDivID = "settingsDivOptions";
        this._localBackupFrequencyID = "localBackupFrequency";
        this._serverBackupFrequencyID = "serverBackupFrequency";
        this._localManualBackupID = "localManualBackup";
        this._serverManualBackupID = "serverManualBackup";

        this._build();

        const self = this;
        $(document).ready(function() {
            self.button.on("click", function (e) {
                self.utilities.close(self._buttonID);
                if (self.div.hasClass("hidden")) {
                    self.open();
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
                self.manageForm();
                e.stopPropagation();
            });

            self.div.on("click", function (e) {
                e.stopPropagation();
            });

            self.rememberMe.on("click", function (e) {
                const value = $(this).prop("checked");
                self.setKey("rememberMe", value);
                if (value) { localStorage.setItem("rememberMe", self.value("username")); }
                else { localStorage.removeItem("rememberMe"); }
                self.userUtilities.requestBackup();
                self.userUtilities.manage(0);
                e.stopPropagation();
            });

            self.hidden.on("click", function (e) {
                self.setKey("hidden", $(this).prop("checked"));
                self.userUtilities.requestBackup();
                e.stopPropagation();
            });

            self.localBackupFrequency.on("change", function (e) {
                if (self.userUtilities.localBackupId) { self.userUtilities.cancelLocalBackup(); }
                var val = $(this).find("option:selected").val();
                val = (val == "false") ? false : parseInt(val);
                if (val) { self.userUtilities.scheduleLocalBackup(val); }
                else { self.userUtilities.requestBackup(); }
                self.setKey("localBackupFrequency", val);
                console.log(val, self.value("localBackupFrequency"));
                self.userUtilities.manage(0);
                //self.manageForm();
            });

            self.serverBackupFrequency.on("change", function (e) {
                if (self.userUtilities.serverBackupId) { self.userUtilities.cancelServerBackup(); }
                var val = $(this).find("option:selected").val();
                val = (val == "false") ? false : parseInt(val);
                if (val) { self.userUtilities.scheduleServerBackup(val); }
                else { self.userUtilities.requestBackup(); }
                self.value("serverBackupFrequency", val);
                self.userUtilities.manage(0);
                //self.manageForm();
            });

            self.localManualBackup.on("click", function (e) {
                if (self.userUtilities.localBackupId) { self.userUtilities.cancelLocalBackup(); }
                self.userUtilities.localBackup();
                self.userUtilities.manage(0);
                this.blur();
            });

            self.serverManualBackup.on("click", function (e) {
                if (self.userUtilities.serverBackupId) { self.userUtilities.cancelServerBackup(); }
                self.userUtilities.serverBackup();
                self.userUtilities.manage(0);
                this.blur();
            });
        }); 
    }

    get userUtilities()         { return this._userUtilities; }
    get utilities()             { return this._userUtilities.utilities; }
    get app()                   { return this.utilities.app; }
    get data()                  { return this.app.data; }
    get sessionId()             { return this.userUtilities.current; }
    get id()                    { return this.data.tierIds(0)[0]; }
    setKey(key, value)          { this.data.setKey(this.id, key, value); }
    value(key)                  { return this.data.value(this.id, key); }

    get button()                { return $("#" + this._buttonID); }
    get div()                   { return $("#" + this._divID); }
    get username()              { return $("#" + this._usernameID); }
    get currentPassword()       { return $("#" + this._currentPasswordID); }
    get newPassword1()          { return $("#" + this._newPassword1ID); }
    get newPassword2()          { return $("#" + this._newPassword2ID); }
    get email()                 { return $("#" + this._emailID); }
    get rememberMe()            { return $("#" + this._rememberMeID); }
    get hidden()                { return $("#" + this._hiddenID); }
    get storage()               { return $("#" + this._storageID); }
    get messagesDiv()           { return $("#" + this._messagesDivID); }
    get actionDiv()             { return $("#" + this._actionDivID); }
    get optionsDiv()            { return $("#" + this._optionsDivID); }
    get localBackupFrequency()  { return $("#" + this._localBackupFrequencyID); }
    get serverBackupFrequency() { return $("#" + this._serverBackupFrequencyID); }
    get localManualBackup()     { return $("#" + this._localManualBackupID); }
    get serverManualBackup()    { return $("#" + this._serverManualBackupID); }

    _build() {
        const prefix = "<div class = 'row'><div class = 'col-3'>";
        const infix1 = "</div><div class = 'col-3' style = 'text-align: right'>";
        const infix2 = "</div><div class = 'col-3' style = 'text-align: center'>";
        const postfix = "</div>";
        const button = "<button id = '" + this._buttonID + "' type = 'button' class = 'btn btn-dark btn-sm'></button>";
        const div = "<div id = '" + this._divID + "' class = 'container userMenu hidden'></div>";
        const username =  "<input id = '" + this._usernameID + "' type = 'text' placeholder = 'username' size = '30'>";
        const currentPassword = "<input id = '" + this._currentPasswordID + "' type = 'password' placeholder = 'enter current password for settings' size = '30'>";
        const newPassword1 = "<input id = '" + this._newPassword1ID + "' type = 'password' placeholder = 'new password' size = '30'>";
        const newPassword2 = "<input id = '" + this._newPassword2ID + "' type = 'password' placeholder = 'retype new password' size = '30'>";
        const email = "<input id = '" + this._emailID + "' type = 'email' placeholder = 'email address' size = '30'>";
        const hidden = "<input id = '" + this._hiddenID + "' type = 'checkbox'> Hidden";
        const rememberMe = "<input id = '" + this._rememberMeID + "' type = 'checkbox'> Remember me";
        const localBackup = "<label>Local</label>";
        const serverBackup = "<label>Server</label>" 
        const backupLocationLabel = "<label style = 'text-align: right; display: inline-block; width: 100%'>Backup location:</label>";

        const automatedBackupLabel = "<label style = 'text-align: right; display: inline-block; width: 100%'>Automated:</label>";
        const localBackupFrequency = "<select id = '" + this._localBackupFrequencyID + "'></select>";
        const serverBackupFrequency = "<select id = '" + this._serverBackupFrequencyID + "'></select>";

        const manualBackupLabel = "<label style = 'text-align: right; display: inline-block; width: 100%'>Manual:</label>";
        const localManualBackup = "<button id = '" + this._localManualBackupID + "' type = 'button' class = 'btn btn-primary btn-sm'>Now</button>";
        const serverManualBackup = "<button id = '" + this._serverManualBackupID + "' type = 'button' class = 'btn btn-primary btn-sm'>Now</button>";

        const messagesDiv = "<div id = '" + this._messagesDivID + "'></div>";
        const actionDiv = "<div id = '" + this._actionDivID + "'></div>";
        const optionsDiv = "<div id = '" + this._optionsDivID + "'></div>";

        this.userUtilities.div.append(button + div);
        this.div.append(username);
        this.div.append(currentPassword);
        this.div.append(newPassword1);
        this.div.append(newPassword2);
        this.div.append(email);
        this.div.append(prefix + hidden     + infix1 + backupLocationLabel  + infix2 + localBackup          + infix2 + serverBackup          + postfix);
        this.div.append(prefix + rememberMe + infix1 + automatedBackupLabel + infix2 + localBackupFrequency + infix2 + serverBackupFrequency + postfix);
        this.div.append(prefix              + infix1 + manualBackupLabel    + infix2 + localManualBackup    + infix2 + serverManualBackup    + postfix);
        this.div.append(messagesDiv);
        this.div.append(actionDiv);
        this.div.append(optionsDiv);

        //this.div.css("left", String(this.button.position().left) + "px");
        //this.div.css("top", String(this.button.position().top + 32) + "px");
        this.div.css("top", String(this.userUtilities.div.position().top + 32) + "px");
        this.div.css("left", String(this.userUtilities.div.position().left) + "px");
        this.localBackupFrequency.html([false, 5, 10, 20, 30, 45, 60, 120, 180, 240, 300]
            .map(f => { return "<option value = '" + f + "'>" + this.frequencyName(f) + "</option>"; }).join(""));
        this.serverBackupFrequency.html([false, 60, 2*60, 3*60, 4*60, 5*60, 10*60, 20*60, 40*60, 60*60, 2*60*60, 5*60*60, 10*60*60]
            .map(f => { return "<option value = '" + f + "'>" + this.frequencyName(f) + "</option>"; }).join(""));
    }

    reset() {
        this.button.html(this.value("username"));
        this.username.val(this.value("username"));
        this.currentPassword.val("");
        this.newPassword1.val("");
        this.newPassword2.val("");
        this.email.val((isString(this.value("email"))) ? this.value("email") : "");
        this.localBackupFrequency.val(String((this.value("localBackupFrequency") != undefined) ? this.value("localBackupFrequency") : false));
        this.localBackupFrequency.val(String((this.value("serverBackupFrequency") != undefined) ? this.value("serverBackupFrequency") : false));
    }

    manage() {
        var fields = [this.username, this.email, this.currentPassword, this.newPassword1, this.newPassword2];

        if (!this.data.hasKey("password") || this.data.value("password") == "" || this.passwordVerified) {
            fields.forEach(field => {
                if (field.hasClass("hidden")) { field.removeClass("hidden"); }
            });
            if (!this.currentPassword.hasClass("hidden")) {
                this.currentPassword.addClass("hidden");
            }
            this.manageForm();
        }
        else {
            fields.forEach(field => {
                if (!field.hasClass("hidden")) { field.addClass("hidden"); }
            });
            if (this.currentPassword.hasClass("hidden")) {
                this.currentPassword.removeClass("hidden");
            }
        }
    }

    manageForm() {
        var messages = [], actions = [], options = [];
        const uname = this.unameState;
        const isDefault = (uname == this.userUtilities.defaultUsername);
        const curPW = this.curPWState;
        const newPW = this.newPWState;
        const email = this.emailState;
        const server = this.value("useServerStorage") == true;
        const changes = uname != "Unchanged" || newPW != "Empty" || email != "Unchanged";

        if (curPW == "Invalid") { messages.push("Current password is invalid."); }
        else {
            //SetUp
            this.hidden.prop("checked", this.value("hidden") == true);
            this.hidden.prop("disabled", (changes || this.value("username") == this.userUtilities.defaultUsername));
            this.rememberMe.prop("checked", this.value("rememberMe") == true);
            this.rememberMe.prop("disabled", (changes || (Object.keys(localStorage).includes("rememberMe") && localStorage.getItem("rememberMe") != this.value("username"))));
            this.localBackupFrequency.prop("disabled", changes);
            this.localBackupFrequency.val(String(this.value("localBackupFrequency") || false));
            this.localManualBackup.prop("disabled", changes);            
            this.serverBackupFrequency.prop("disabled", (!server || changes));
            this.serverBackupFrequency.val(String(this.value("serverBackupFrequency") || false));
            this.serverManualBackup.prop("disabled", (!server || changes));

            //Messages
            if (uname == "Invalid")          { messages.push("Usernames must be 5-20 characters, each a letter, number, ., -, or _.")}
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
                if (uname == "Local and server duplicate") {
                    messages.push("Username is unavailable both locally and on the server.");
                }
                if (uname == "Local duplicate") {
                    messages.push("Username is already exists locally.");
                }
                if (uname == "Server duplicate") {
                    messages.push("username is unavailable on the server.");
                }
                if ((curPW == "Weak" && newPW == "Empty") || newPW == "Weak") {
                    messages.push("Server storage requires a stronger password.");
                }
                if (curPW == "Empty" && newPW == "Empty") {
                    messages.push("Server storage requires a strong password.");
                }
            }
            else {
                if (uname == "Default") { messages.push("The username must not be the default."); }
                if (uname == "Local and server duplicate") {
                    messages.push("Username already exists locally and on the server.");
                }
                if (uname == "Local duplicate") {
                    messages.push("Username is already exists locally.");
                }
                if (uname == "Server duplicate") {
                    messages.push("Username is duplicated on the server.");
                }
            }

            //Actions
            if (!server) {
                if (["Filled", "Server duplicate"].includes(uname)) {
                    actions.push("change username");
                }
                if (curPW == "Empty" && ["Weak", "Strong"].includes(newPW)) {
                    actions.push("add password");
                }
                if (curPW != "Empty" && ["Weak", "Strong"].includes(newPW)) {
                    actions.push("change password");
                }
            }
            else {
                if (["Filled", "Local duplicate"].includes(uname) && !isDefault) {
                    actions.push("change username");
                }
                if (newPW == "Strong") { actions.push("change password"); }
            }
            if (email == "Filled")  { actions.push("set email address"); }
            if (email == "Emptied") { actions.push("remove email address"); }
            if (email == "Changed") { actions.push("change email address"); }
    
            //Options
            if (!server) {
                if (curPW != "Empty" && newPW == "Empty") { options.push("Remove password"); }
                if (["Filled", "Unchanged"].includes(uname) &&
                    ((curPW == "Strong" && newPW == "Empty") || newPW == "Strong") && email != "Invalid") {
                    options.push("Add server storage");
                }
            }
            else {
                options.push("Remove server storage");
            }
        }

        this.messagesDiv.html(messages.join("<br>"));
        this.actions(actions);
        this.options(options);
    }

    get unameState() { //Unchanged, Emptied, Duplicate, Filled
        const current = this.value("username");
        const fieldVal = this.username.val();
        const server = this.value("useServerStorage");
        const valid = /^[a-zA-Z0-9_\-.]{5,20}$/;
        const localDup = !!Object.keys(localStorage).includes(fieldVal);
        const serverDup = false;

        if (current == fieldVal)                        { return "Unchanged"; }
        if (!valid.test(fieldVal))                      { return "Invalid"; }
        if (current.length > 0 && fieldVal.length == 0) { return "Emptied"; }
        if (localDup && serverDup)                      { return "Local and server duplicate"; }
        if (localDup)                                   { return "Local duplicate"; }
        if (serverDup)                                  { return "Server duplicate"; }
        return "Filled";
    }

    get curPWState() { //Empty, Invalid, Insecure, Strong
        const fieldVal = this.currentPassword.val();
        const hashed = this.hashedPassword(fieldVal);
        const current = isString(this.value("password")) ? this.value("password") : "";
        const strongComplexity = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#$%^&*()_+\-|~=`{}\[\]:\";\'<>?,.\/])(?=.{8,127})/;
        const strongLength = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{20,127})/;

        if (current == "" && fieldVal == "")                                  { return "Empty"; }
        if (hashed != current)                                                { return "Invalid"; }
        if (!strongComplexity.test(fieldVal) && !strongLength.test(fieldVal)) { return "Weak"; }
        return "Strong";
    }

    get newPWState() { //Empty, Different, Insecure, Strong
        const pw1 = this.newPassword1.val();
        const pw2 = this.newPassword2.val();
        const strongComplexity = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#$%^&*()_+\-|~=`{}\[\]:\";\'<>?,.\/])(?=.{8,127})/;
        const strongLength = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{20,127})/;

        if (pw1.length == 0 && pw2.length == 0)                     { return "Empty"; }
        if (pw1 != pw2)                                             { return "Different"; }
        if (!strongComplexity.test(pw1) && !strongLength.test(pw1)) { return "Weak"; }
        return "Strong";
    }

    get PWsEqual() {
        const cur = this.currentPassword.val();
        const pw1 = this.newPassword1.val();
        const pw2 = this.newPassword2.val();

        return (cur == pw1 && cur == pw2);
    }

    get emailState() { //Unchanged, Invalid, Emptied, Filled, Changed
        const fieldVal = this.email.val();
        const current = isString(this.value("email")) ? this.value("email") : "";
        const valid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if (fieldVal == current)                           { return "Unchanged"; }
        if (!valid.test(fieldVal) && fieldVal.length != 0) { return "Invalid"; }
        if (current.length == 0 && fieldVal.length != 0)   { return "Filled"; }
        if (current.length != 0 && fieldVal.length == 0)   { return "Emptied"; }
        return "Changed";
    }
    
    actions(actions) {
        var funcs = [], actionText = "";
        const self = this;

        this.actionDiv.text("");

        if (actions.length) {
            if (actions.length == 1) { actionText = actions[0]; }
            if (actions.length == 2) { actionText = actions[0] + " and " + actions[1]; }
            if (actions.length > 2) {
                actionText = actions.slice(0, -1).join(", ") + ", and " + actions.slice(-1);
            }
            actionText.replace(/^\w/, function(c) { return c.toUpperCase(); });

            actions.forEach(action => {
                switch (action) {
                    case "set username":
                    case "change username":      
                        funcs.push(() => {
                            const update = (this.value("username") == this.userUtilities.defaultUsername);
                            if (Object.keys(localStorage).includes(this.value("username"))) {
                                localStorage.setItem(this.username.val(), localStorage.getItem(this.value("username")));
                                localStorage.removeItem(this.value("username"));
                            }
                            this.setKey("username", this.username.val());
                            this.button.html(this.value("username"));
                            this.userUtilities.manage(0);
                        });
                        break;
                    case "add password": 
                    case "change password":
                        funcs.push(() => {
                            this.setKey("password", this._newPassword);
                            this.newPassword1.val("");
                            this.newPassword2.val("");
                        });
                        break;
                    case "set email address":
                    case "change email address": 
                        funcs.push(() => { this.setKey("email", this.email.val()); });
                        break;
                    case "remove email address": 
                        funcs.push(() => { this.app.data.deleteKey(this.id, "email"); });
                        break;
                    default: console.log(action + " is not supported.");
                }
            });

            this.actionDiv.append("<button id = 'settingsDivActionButton' type = 'button' class = 'btn btn-primary'>" + actionText + "</button>");
            $("#settingsDivActionButton").on("click", function (e) {
                funcs.forEach(func => { func(); });
                self.userUtilities.requestBackup();
                self.manageForm();
            });
        }
    }

    options(options) {
        var func, cl;
        const self = this;

        this.optionsDiv.text("");

        options.forEach((option, index) => {
            switch (option) {
                case "Remove password":                                 
                    cl = "btn-warning";
                    func = () => {
                        this.currentPassword.val("");
                        this.removeKey("password");
                    };
                    break;
                case "Add server storage":                              
                    cl = "btn-success";
                    func = () => {
                        this.setKey("useServerStorage", true);
                    };
                    break;
                case "Remove server storage":
                    cl = "btn-danger";
                    func = () => {
                        this.removeKey("useServerStorage");
                    };
                    break; //If no local storage, download all data to session Storage?
                default: console.log(option + "is not supported.");
            }

            this.optionsDiv.append("<button id = 'settingsDivOption" + index + "' type = 'button' class = 'btn " + cl + "'>" + option + "</button><br>");
            $("#settingsDivOption" + index).on("click", function (e) {
                func();
                self.manageForm();
            });
        });
    }

    hashedPassword(password) {
        return "hashed " + password;
    }

    frequencyName(seconds) {
        return (seconds == false) ? "Disabled" : 
               (seconds < 60)     ? `${seconds} seconds` : 
               (seconds == 60)    ? "1 minute" :
               (seconds < 3600)   ? `${seconds / 60} minutes` :
               (seconds == 3600)  ? "1 hour" :
                                    `${seconds / 3600} hours`;
    }

    open() {
        this.button.removeClass("btn-dark");
        this.button.addClass("btn-secondary");
        this.div.removeClass("hidden");
        this.button.blur();
        this.manage();
    }

    close(except) {
        if (except != this._buttonID) {
            this.button.removeClass("btn-secondary");
            this.button.addClass("btn-dark");
            this.div.addClass("hidden");
            this.button.blur();
        }
    }
}