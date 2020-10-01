/* utilities class links to session class and dataManager classes
*/

class Utilities {
    _utilitiesID = null;
    _dataManager = null;
    _sessions = null;
    _minLinesHeight = null;
    _maxLinesHeight = null;

    _loginButtonID = "loginButton";
    _issuePickerButtonID = "issuePickerButton";
    _issueRenameButtonID = "issueRenameButton";
    _issueAddButtonID = "issueAddButton";
    _sessionPickerButtonID = "sessionPickerButton";
    _sessionAddButtonID = "sessionAddButton";
    _issuePickerDivID = "issuePickerDiv";
    _issuePickerScrollDivID = "issuePickerScrollDiv";
    _sessionPickerDivID = "sessionPickerDiv";
    _sessionPickerScrollDivID = "sessionPickerScrollDiv";
    _slideUpButtonID = "slideUpButton";
    _slideDownButtonID = "slideDownButton";
    _importButtonID = "importButton";
    _exportButtonID = "exportButton";
    _forgotPasswordID = "forgotPassword";
    _newAccountID = "newAccount";
    _loginDivID = "loginDiv";
    _usernameID = "username";
    _passwordID = "password";
    _loginID = "login";
    _forgotPasswordID = "forgotPassword";
    _newAccountID = "newAccount";
    _infoButtonID = "infoButton";
    _configButtonID = "configButton";

    constructor (utilitiesID, dataManager, sessions) {
        const self = this;
        this._utilitiesID = utilitiesID;
        this._dataManager = dataManager;
        this._sessions = sessions;

        this._buildUtilitiesBar();

        $(document).ready(function() {
            $("#" + self._loginButtonID).on("click", function() {

            });

            $("#" + self._issuePickerButtonID).on("click", function() {

            });

            $("#" + self._issueRenameButtonID).on("click", function() {

            });

            $("#" + self._issueAddButtonID).on("click", function() {

            });

            $("#" + self._sessionPickerButtonID).on("click", function() {

            });

            $("#" + self._sessionAddButtonID).on("click", function() {

            });

            $("#" + self._slideUpButtonID).on("click", function() {
                const lines = self.lines.div;
                const lineHeight = Number(lines.children().eq(0).height());
                const minLinesHeight = 0;
                if (parseInt(lines.height()) > minLinesHeight) {
                    lines.height(String(parseInt(lines.height()) - lineHeight) + "px");
                    buttons.adjustDivHeights();
                }
            });

            Mousetrap.bind(['ctrl+up'], function(e) {
                $("#" + self._slideUpButtonID).trigger("click");
                return false;
            });

            $("#" + self._slideDownButtonID).on("click", function() {
                const lines = self.lines.div;
                const lineHeight = Number(lines.children().eq(0).height());
                const maxLinesHeight = $(window).height() - Number(lines.children().eq(0).height());
                if (parseInt(lines.height()) < maxLinesHeight) {
                    lines.height(String(parseInt(lines.height()) + lineHeight) + "px");
                    buttons.adjustDivHeights();
                }
            });

            Mousetrap.bind(['ctrl+down'], function(e) {
                $("#" + self._slideDownButtonID).trigger("click");
                return false;
            });

            $("#" + self._exportButtonID).on("click", function() {

            });
    
            $("#" + self._importButtonID).on("click", function() {
    
            });
    
            $("#" + self._configButtonID).on("click", function() {
    
            });
    
            $("#" + self._infoButtonID).on("click", function() {

            });
        });
    }

    get div()      { return $("#" + this._utilitiesID); }
    get lines()    { return this.sessions.lines; }
    get sessions() { return this._sessions; }
    get data()     { return this._dataManager; }
    

    _buildUtilitiesBar() {
        const dotIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-dot my-2' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'/></svg>";
        const plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
        const pencilIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-pencil-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'  data-toggle='popover' data-content='Edit Issue Name'><path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg>";
        const exportIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-download' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/><path fill-rule='evenodd' d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z'/></svg>";
        const importIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-upload' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/><path fill-rule='evenodd' d='M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z'/></svg>";
        const scrollUpIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-arrow-bar-up' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z'/></svg>";
        const scrollDownIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-arrow-bar-down' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z'/></svg>";
        const infoIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-info-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path d='M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z'/><circle cx='8' cy='4.5' r='1'/></svg>";
        const configIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-gear' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z'/><path fill-rule='evenodd' d='M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z'/></svg>";
        const caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
        const caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";
        const searchIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-search' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'/><path fill-rule='evenodd' d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'/></svg>";

        const loginButton = "<button id = '" + this._loginButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>Click to log in.</button>";
        const issuePickerButton = "<button id = '" + this._issuePickerButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'></button>";
        const issueRenameButton = "<button id = '" + this._issueRenameButtonID + "' type = 'button' class = 'btn btn-dark btn-sm' disabled>" + pencilIcon + "</button>";
        const issueAddButton = "<button id = '" + this._issueAddButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + plusIcon + "</button>";
        const sessionPickerButton = "<button id = '" + this._sessionPickerButtonID + "' type = 'button' class = 'btn btn-dark btn-sm' disabled>No sessions.  Create an issue!</button>";
        const sessionAddButton = "<button id = '" + this._sessionAddButtonID + "' type = 'button' class = 'btn btn-dark btn-sm' disabled>" + plusIcon + "</button>";
        const slideUpButton = "<button id = '" + this._slideUpButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + scrollUpIcon + "</button>";
        const slideDownButton = "<button id = '" + this._slideDownButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + scrollDownIcon + "</button>";
        const importButton = "<button id = '" + this._importButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + importIcon + "</button>";
        const exportButton = "<button id = '" + this._exportButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + exportIcon + "</button>";
        const infoButton = "<button id = '" + this._infoButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + infoIcon + "</button>";
        const configButton = "<button id = '" + this._configButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + configIcon + "</button>";

        const loginDiv = "<div id = '" + this._loginDivID + "' class = 'hidden'></div>";
        const loginDivUsernameInput = "<input id = '" + this._usernameID + "' type = 'text' placeholder = 'username'>";
        const loginDivPasswordInput = "<input id = '" + this._passwordID + "' type = 'text' placeholder = 'password'>";
        const loginDivLoginButton = "<button id = '" + this._loginID + "' type = 'button' class = 'btn btn-dark btn-sm'>Set up new account</button>";
        const loginDivForgotPasswordButton = "<button id = '" + this._forgotPasswordID + "' type = 'button' class = 'btn btn-dark btn-sm'>Forgot password?</button>";
        const loginDivNewAccountButton = "<button id = '" + this._newAccountID + "' type = 'button' class = 'btn btn-dark btn-sm'>Set up new account.</button>";

        const issuePickerDiv = "<div id = '" + this._issuePickerDivID + "' class = 'hidden'></div>";
        const issuePickerSearchInput = searchIcon + "<input placeholder = 'search'>";
        const issuePickerScrollDiv = "<div id = '" + this._issuePickerScrollDivID + "'></div>";

        const sessionPickerDiv = "<div id = '" + this._sessionPickerDivID + "' class = 'hidden'></div>";
        const sessionPickerScrollDiv = "<div id = '" + this._sessionPickerScrollDivID + "'></div>";
        
        this.div.append("<span></span><span></span>");
        this.div.children().eq(0).append(loginButton + loginDiv);
        $("#" + this._loginDivID).append(loginDivUsernameInput + loginDivPasswordInput + loginDivLoginButton + loginDivForgotPasswordButton + loginDivNewAccountButton);
        this.div.children().eq(0).append(dotIcon);
        this.div.children().eq(0).append(issuePickerButton + issuePickerDiv + issueRenameButton + issueAddButton);
        $("#" + this._issuePickerDivID).append(issuePickerSearchInput + issuePickerScrollDiv);
        this.div.children().eq(0).append(dotIcon);
        this.div.children().eq(0).append(sessionPickerButton + sessionPickerDiv + sessionAddButton);
        $("#" + this._sessionPickerDivID).append(sessionPickerScrollDiv);
        this.div.children().eq(1).append(slideUpButton + slideDownButton);
        this.div.children().eq(1).append(dotIcon);
        this.div.children().eq(1).append(importButton + exportButton);
        this.div.children().eq(1).append(dotIcon);
        this.div.children().eq(1).append(configButton + infoButton);
    }

    update() {
        this._manageIssueUtilities();
        this._manageSessionUtilities();
    }

    _manageIssueUtilities() {
        var code = "";
        var pickerButton = $("#" + this._issuePickerButtonID);
        var renameButton = $("#" + this._issueRenameButtonID);
        var issues = this.data.issues();
        var selectedIssue = this.data.sessionIssue(this.sessions.sessionName);
        console.log("issues: " + issues);
        console.log("selected issue: " + selectedIssue);
        var div = $("#" + this._issuePickerScrollDivID);
        div.empty();
        if (issues.length) {
            pickerButton.text(selectedIssue);
            issues.forEach(function(entry) {
                code = "<button type='button' class='btn ";
                if (entry == selectedIssue) { code += "btn-info"; }
                else { code += "btn-outline-info"; }
                code += " btn-sm'>" + entry + "</button>";
                div.append(code);
            });
            pickerButton.attr("disabled", false);
            renameButton.attr("disabled", false);
        }
        else {
            pickerButton.text("No issues.  Create one!");
            pickerButton.attr("disabled", true);
            renameButton.attr("disabled", true);
        }
    }

    _manageSessionUtilities() {
        var code = "";
        var numIssues = $("#" + this._issuePickerScrollDivID).children().length;
        var pickerButton = $("#" + this._sessionPickerButtonID);
        var addButton = $("#" + this._sessionAddButtonID);
        var selectedSession = this.sessions.sessionName;
        var sessions = this.data.issueSessions(this.data.sessionIssue(selectedSession));
        var div = $("#" + this._sessionPickerScrollDivID);
        div.empty();
        if (sessions.length) {
            pickerButton.text(selectedSession);
            sessions.forEach(function(entry) {
                code = "<button type='button' class='btn ";
                if (entry == selectedSession) { code += "btn-info"; }
                else { code += "btn-outline-info"; }
                code += " btn-sm'>" + entry + "</button>";
                div.append(code);
            });
        }
        if (sessions.length > 1)  { pickerButton.attr("disabled", false); }
        else if (sessions.length) { pickerButton.attr("disabled", true); }
        else                      { pickerButton.text("No sessions.  Create an issue!"); }

        if (numIssues) { addButton.attr("disabled", false); }
        else           { addButton.attr("disabled", true); }
    }
}