/* utilities class links to sessions class
*/

class UserSettingsUtility extends StorageUtility {
    _userUtilities = null;
    _utilityID = null;
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

    _buttonID = "settingsButton";
    _divID = "settingsDiv";
    _usernameID = "settingsDivUsername";
    _currentPasswordID = "settingsDivCurrentPassword";
    _newPassword1ID = "settingsDivNewPassword1";
    _newPassword2ID = "settingsDivNewPassword2";
    _emailID = "settingsDivEmail";
    _rememberMeID = "settingsDivRememberMe";
    _hiddenID = "settingsDivHidden";
    _storageID = "settingsDivStorage";
    _messagesDivID = "settingsDivMessages";
    _actionDivID = "settingsDivAction";
    _optionsDivID = "settingsDivOptions";
    _pushToStorageFrequencyID = "pushToStorageFrequency";
    _pushToServerFrequencyID = "pushToServerFrequency";

    constructor (userUtilities, group) {
        super();
        const self = this;
        this._userUtilities = userUtilities;
        this._group = group;
//        this._type = "user";
        this._utilityID = "userSettingsUtility";

//        this._build();

        $(document).ready(function() {
            self.button.on("click", function (e) {
                self.utilities.closeAllUtilityMenus(self._buttonID);
                if (self.div.hasClass("hidden")) {
                    self.div.removeClass("hidden");
                    this.blur();
                    self.manage();
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
                self.current.rememberMe = $(this).prop("checked");
                e.stopPropagation();
            });

            self.hidden.on("click", function (e) {
                self.current.hidden = $(this).prop("checked");
                e.stopPropagation();
            });

            self.storage.on("change", function (e) {
                self.current.storagePermanence = $(this).val();
                self.manage();
            });

            self.pushToStorageFrequency.on("change", function (e) {
                const val = $(this).find("option:selected").val();
                self.current.pushToStorageFrequency = (val == "false") ? false : parseInt(val);
                self.manageForm();
            });

            self.pushToServerFrequency.on("change", function (e) {
                const val = $(this).find("option:selected").val();
                self.current.pushToServerFrequency = (val == "false") ? false : parseInt(val);
                self.manageForm();
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

    get button()                        { return $("#" + this._buttonID); }
    get div()                           { return $("#" + this._divID); }
    get userName()                      { return $("#" + this._usernameID); }
    get currentPassword()               { return $("#" + this._currentPasswordID); }
    get newPassword1()                  { return $("#" + this._newPassword1ID); }
    get newPassword2()                  { return $("#" + this._newPassword2ID); }
    get email()                         { return $("#" + this._emailID); }
    get rememberMe()                    { return $("#" + this._rememberMeID); }
    get hidden()                        { return $("#" + this._hiddenID); }
    get storage()                       { return $("#" + this._storageID); }
    get messagesDiv()                   { return $("#" + this._nessagesID); }
    get actionDiv()                     { return $("#" + this._actionDivID); }
    get optionsDiv()                    { return $("#" + this._optionsDivID); }
    get pushToStorageFrequency()        { return $("#" + this._pushToStorageFrequencyID); }
    get pushToServerFrequency()         { return $("#" + this._pushToServerFrequencyID); }

    build() {
        const prefix = "<div class = 'row'><div class = 'col-3'>";
        const infix = "</div><div class = 'col-3' style = 'text-align: center'>";
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
        const storage = "<select id = '" + this._storageID + "'></select>"; 
        const storagePermanenceLabel = "<label style = 'text-align: right'>Storage permanence:</label>";

        const pushToStorageFrequencyLabel = "<label style = 'text-align: right'>Storage frequency:</label>";
        const pushToStorageFrequency = "<select id = '" + this._pushToStorageFrequencyID + "'></select>";
        const pushToServerFrequency = "<select id = '" + this._pushToServerFrequencyID + "'></select>";

        const messages = "<div id = '" + this._messagesID + "'></div>";
        const action = "<div id = '" + this._actionDivID + "'></div>";
        const options = "<div id = '" + this._ptionsDivID + "'></div>";

        this.userUtilities.div.append(button + div);
        this.div.append(username);
        this.div.append(currentPassword);
        this.div.append(newPassword1);
        this.div.append(newPassword2);
        this.div.append(email);
        this.div.append(prefix + hidden     + infix + storagePermanenceLabel      + infix + storage                + infix + "Server"              + postfix);
        this.div.append(prefix + rememberMe + infix + pushToStorageFrequencyLabel + infix + pushToStorageFrequency + infix + pushToServerFrequency + postfix);
        this.div.append(messages);
        this.div.append(action);
        this.div.append(options);

        this.div.css("left", String(this.button.position().left) + "px");
        this.div.css("top", String(this.button.position().top + 32) + "px");
        this.storage.append("<option value = 'true'>Browser</option>");
        this.storage.append("<option value = 'false'>Session</option>");
        this.pushToStorageFrequency.html([5, 10, 20, 30, 45, 60, 120, 180, 240, 300]
            .map(f => { return "<option value = '" + f + "'>" + this.frequencyName(f) + "</option>"; }).join(""));
    }

    _reset() {
        this.button.html(this.current.userName);
        this.userName.val(this.current.userName);
        this.currentPassword.val("");
        this.newPassword1.val("");
        this.newPassword2.val("");
        this.email.val(this.current.email);
        this.pushToStorageFrequency.val(String(this.current.pushToStorageFrequency));
        this.hidden.prop("checked", this.current.hidden);
        this.rememberMe.prop("checked", this.current.rememberMe);
    }

    manage() {
        var fields = [this.userName, this.email, this.currentPassword, this.newPassword1, this.newPassword2];

        if (this.current.passwordHash == "" || this.current.passwordVerified) {
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
        const isDefault = (uname == this.group.defaultName);
        const curPW = this.curPWState;
        const newPW = this.newPWState;
        const email = this.emailState;
        const server = this.current.useServerStorage;
        const storagePermanence = this.current.storagePermanence;

        this.storage.val(String(storagePermanence));

        if (curPW == "Invalid") { messages.push("Current password is invalid."); }
        else {
            //SetUp
            if (!server) {
                this.pushToServerFrequency.html("<option>Disabled</option>");
                this.pushToServerFrequency.prop("disabled", true);
            }
            else {
                this.pushToServerFrequency.html([false, 60, 2*60, 3*60, 4*60, 5*60, 10*60, 20*60, 40*60, 60*60, 2*60*60, 5*60*60, 10*60*60]
                    .map(f => { return "<option value = '" + f + "'>" + this.frequencyName(f) + "</option>"; }).join(""));
                this.pushToServerFrequency.val(String(this.current.pushToServerFrequency));
            }
            this.storage.prop("disabled", (uname == "Local duplicate"));
            this.rememberMe.prop("disabled", !this.ableToSetRememberMe);
            if (this.current.hidden && this.current.userName == this.group.defaultName) {
                this.current.hidden = false;
            }
            this.hidden.prop("checked", this.current.hidden);
            this.hidden.prop("disabled", this.current.userName == this.group.defaultName)

            //Messages
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
                if (uname == "Storage and server duplicate") {
                    messages.push("Username is unavailable in local storage and on the server.");
                }
                if (uname == "Local and server duplicate") {
                    messages.push("Username is unavailable locally and on the server.");
                }
                if (uname == "Storage duplicate") {
                    messages.push("Username is unavailable on the server.");
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
                if (uname == "Storage and server duplicate") {
                    messages.push("Username is duplicated in local storage and on the server.");
                }
                if (uname == "Local and server duplicate") {
                    messages.push("Username is duplicated locally and on the server.");
                }
                if (uname == "Storage duplicate") {
                    messages.push("");
                }
                if (uname == "Local duplicate") {
                    messages.push("");
                }
                if (uname == "Server duplicate") {
                    messages.push("");
                }
            }

            //Actions
            if (!server) {
                if (["Filled", "Local and server duplicate", "Local duplicate", "Server duplicate"].includes(uname)) {
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

    get ableToSetRememberMe() {
        return (this.current.userName != this.group.defaultName &&
                this.storagePermanence &&
                (!this.rememberMeExists || this.rememberMe == this.current.id));
    }

    get unameState() { //Unchanged, Emptied, Duplicate, Filled
        const current = this.current.userName;
        const fieldVal = this.userName.val();
        const server = this.current.useServerStorage;
        const valid = /^[a-z0-9_\-.]{5,20}$/;
        const containerDup = this.cUserNameExists(fieldVal);
        const localDup = this.lUserNameExists(fieldVal);
        const serverDup = false;

        if (current == fieldVal)                        { return "Unchanged"; }
        if (!valid.test(fieldVal))                      { return "Invalid"; }
        if (current.length > 0 && fieldVal.length == 0) { return "Emptied"; }
        if (containerDup && serverDup)                  { return "Storage and server duplicate"; }
        if (localDup && serverDup)                      { return "Local and server duplicate"; }
        if (containerDup)                               { return "Storage duplicate"; }
        if (localDup)                                   { return "Local duplicate"; }
        if (serverDup)                                  { return "Server duplicate"; }
        return "Filled";
    }

    get curPWState() { //Empty, Invalid, Insecure, Strong
        const fieldVal = this.currentPassword.val();
        const hashed = this.hashedPassword(fieldVal);
        const current = this.current.passwordHash;
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
        const current = this.current.email;
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
                            this.current.userName = this.userName.val();
                            this.button.html(this.current.userName);
                        });
                        break;
                    case "add password": 
                    case "change password":
                        funcs.push(() => {
                            this.current.passwordHash = this._newPasswordHash;
                        });
                        break;
                    case "set email address":
                    case "change email address": 
                        funcs.push(() => { this.current.email = this.divEmail.val(); });
                        break;
                    case "remove email address": 
                        funcs.push(() => { this.current.email = ""; });
                        break;
                    default: console.log(action + " is not supported.");
                }
            });

            this.action.append("<button id = 'divActionButton' type = 'button' class = 'btn btn-primary'>" + actionText + "</button>");
            //this.actionButton.on("click", function (e) {
            $("#settingsDivActionButton").on("click", function (e) {
                funcs.forEach(func => { func(); });
                self.manageDivForm();
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
                        this.current.passwordHash = "";
                    };
                    break;
                case "Add server storage":                              
                    cl = "btn-success";
                    func = () => {
                        this.current.useServerStorage = true;
                    };
                    break;
                case "Remove server storage":
                    cl = "btn-danger";
                    func = () => {
                        this.current.useServerStorage = false;
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
        return (seconds == false) ? "Manual" : 
               (seconds < 60)     ? `${seconds} seconds` : 
               (seconds == 60)    ? "1 minute" :
               (seconds < 3600)   ? `${seconds / 60} minutes` :
               (seconds == 3600)  ? "1 hour" :
                                    `${seconds / 3600} hours`;
    }

    close(except) {
        if (except != this._buttonID)   {
            this.div.addClass("hidden");
            this.button.blur();
        }
    }
}