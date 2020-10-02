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
    _issuePickerDivID = "issuePickerDiv";
    _issuePickerSearchID = "issuePickerSearch";
    _issuePickerScrollDivID = "issuePickerScrollDiv";
    _issueRenameButtonID = "issueRenameButton";
    _issueRenameDivID = "issueRenameDiv";
    _issueRenameInputID = "issueRenameInput";
    _issueAddButtonID = "issueAddButton";
    _issueAddDivID = "issueAddDiv";
    _issueAddInputID = "issueAddInput";
    _sessionPickerButtonID = "sessionPickerButton";
    _sessionPickerDivID = "sessionPickerDiv";
    _sessionPickerInputID = "sessionPickerInput";
    _sessionPickerDivInputID = "sessionPickerDivInput";
    _sessionPickerScrollDivID = "sessionPickerScrollDiv";
    _sessionAddButtonID = "sessionAddButton";
    _sessionAddInputID = "sessionAddInput";
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
                const caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
                const caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";
                const pickerDiv = $("#" + self._issuePickerDivID);
                const scrollDiv = $("#" + self._issuePickerScrollDivID);
                const button = $("#" + self._issuePickerButtonID);
                if (scrollDiv.children().length > 1) {
                    pickerDiv.toggleClass("hidden");
                    pickerDiv.css("left", String(button.position().left) + "px");
                    pickerDiv.css("top", String(button.position().top + button.outerHeight()) + "px");
                    pickerDiv.toggleClass("popUpMenu");
                }
            });

            $("#" + self._issueRenameButtonID).on("click", function() {
                const div = $("#" + self._issueRenameDivID)
                const button = $("#" + self._issueRenameButtonID);
                const input = $("#" + self._issueRenameInputID);
                if (div.hasClass("hidden")) {
                    div.removeClass("hidden");
                    div.css("left", String(button.position().left) + "px");
                    div.css("top", String(button.position().top + button.outerHeight()) + "px");
                    div.addClass("popUpMenu");
                    input.val(self.sessions.issueName);
                    input.focus();
                }
                else {
                    div.addClass("hidden");
                    div.removeClass("popUpMenu");
                }
            });

            $("#" + self._issueRenameInputID).on("keypress", function(e) {
                const caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
                const div = $("#" + self._issueRenameDivID);
                const pickerButton = $("#" + self._issuePickerButtonID);
                if (e.key == "Enter") {
                    div.addClass("hidden");
                    div.removeClass("popUpMenu");
                    self.sessions.renameIssue(this.value);
                    self._manageIssueUtilities();
                }
                e.stopPropagation();
            });

            $("#" + self._issueAddButtonID).on("click", function() {
                const div = $("#" + self._issueAddDivID)
                const button = $("#" + self._issueAddButtonID);
                div.toggleClass("hidden");
                div.css("left", String(button.position().left) + "px");
                div.css("top", String(button.position().top + button.outerHeight()) + "px");
                div.toggleClass("popUpMenu");
            });

            $("#" + self._issueAddInputID).on("keypress", function(e) {
                const div = $("#" + self._issueAddDivID);
                const pickerButton = $("#" + self._issuePickerButtonID);
                if (e.key == "Enter") {
                    div.addClass("hidden");
                    div.removeClass("popUpMenu");
                    self.sessions.newIssue(this.value);
                    self.update();
                }
                e.stopPropagation();
            });

            $("#" + self._sessionPickerButtonID).on("click", function() {
                const caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
                const caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";
                const pickerDiv = $("#" + self._sessionPickerDivID);
                const scrollDiv = $("#" + self._sessionPickerScrollDivID);
                const button = $("#" + self._sessionPickerButtonID);
                console.log(button.position().left);
                if (scrollDiv.children().length > 1) {
                    if (pickerDiv.hasClass("hidden")) {
                        pickerDiv.removeClass("hidden");
                        pickerDiv.css("left", String(button.position().left) + "px");
                        pickerDiv.css("top", String(button.position().top + button.outerHeight()) + "px");
                        pickerDiv.addClass("popUpMenu");
                    }
                    else {
                        pickerDiv.addClass("hidden");
                        pickerDiv.removeClass("popUpMenu");
                    }
                }
            });

            $("#" + self._sessionPickerDivID).find("button").on("click", function() {
                const pickerDiv = $("#" + self._sessionPickerDivID);
                self.sessions.loadSession(this.value);
                pickerDiv.addClass("hidden");
                pickerDiv.removeClass("popUpMenu");        
            });

            $("#" + self._sessionAddButtonID).on("click", function() {
                console.log("here");
                self.sessions.newSession();
                self.update();
            });

            $("#" + self._slideUpButtonID).on("click", function() {
                const lines = self.lines.div;
                const lineHeight = Number(lines.children().eq(0).height());
                const minLinesHeight = 0;
                if (parseInt(lines.height()) > minLinesHeight) {
                    lines.height(String(parseInt(lines.height()) - lineHeight) + "px");
                    self.buttons.adjustDivHeights();
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
                    self.buttons.adjustDivHeights();
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
    get buttons()  { return this.sessions.buttons; }
    
    _buildUtilitiesBar() {
        const dotIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-dot my-2' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'/></svg>";
        const plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
        const pencilIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-pencil-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg>";
        const exportIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-download' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/><path fill-rule='evenodd' d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z'/></svg>";
        const importIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-upload' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/><path fill-rule='evenodd' d='M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z'/></svg>";
        const scrollUpIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-arrow-bar-up' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z'/></svg>";
        const scrollDownIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-arrow-bar-down' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z'/></svg>";
        const infoIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-info-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path d='M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z'/><circle cx='8' cy='4.5' r='1'/></svg>";
        const configIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-gear' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z'/><path fill-rule='evenodd' d='M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z'/></svg>";
        const searchIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-search' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'/><path fill-rule='evenodd' d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'/></svg>";

        const slideUpButton = "<button id = '" + this._slideUpButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + scrollUpIcon + "</button>";
        const slideDownButton = "<button id = '" + this._slideDownButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + scrollDownIcon + "</button>";
        const importButton = "<button id = '" + this._importButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + importIcon + "</button>";
        const exportButton = "<button id = '" + this._exportButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + exportIcon + "</button>";
        const infoButton = "<button id = '" + this._infoButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + infoIcon + "</button>";
        const configButton = "<button id = '" + this._configButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + configIcon + "</button>";

        const loginButton = "<button id = '" + this._loginButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>Click to log in.</button>";
        const loginDiv = "<div id = '" + this._loginDivID + "' class = 'hidden'></div>";
        const loginDivUsernameInput = "<input id = '" + this._usernameID + "' type = 'text' placeholder = 'username'>";
        const loginDivPasswordInput = "<input id = '" + this._passwordID + "' type = 'text' placeholder = 'password'>";
        const loginDivLoginButton = "<button id = '" + this._loginID + "' type = 'button' class = 'btn btn-dark btn-sm'>Set up new account</button>";
        const loginDivForgotPasswordButton = "<button id = '" + this._forgotPasswordID + "' type = 'button' class = 'btn btn-dark btn-sm'>Forgot password?</button>";
        const loginDivNewAccountButton = "<button id = '" + this._newAccountID + "' type = 'button' class = 'btn btn-dark btn-sm'>Set up new account.</button>";

        const issuePickerButton = "<button id = '" + this._issuePickerButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'></button>";
        const issuePickerDiv = "<div id = '" + this._issuePickerDivID + "' class = 'hidden'></div>";
        const issuePickerSearchInput = searchIcon + "<input id = '" + this._issuePickerInputID + "' placeholder = 'search'>";
        const issuePickerScrollDiv = "<div id = '" + this._issuePickerScrollDivID + "'></div>";

        const issueRenameButton = "<button id = '" + this._issueRenameButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + pencilIcon + "</button>";
        const issueRenameDiv = "<div id = '" + this._issueRenameDivID + "' class = 'hidden'></div>";
        const issueRenameInput = "<input id = '" + this._issueRenameInputID + "' placeholder = 'rename the selected issue' size = '50'>";

        const issueAddButton = "<button id = '" + this._issueAddButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + plusIcon + "</button>";
        const issueAddDiv = "<div id = '" + this._issueRenameDivID + "' class = 'hidden'></div>";
        const issueAddInput = "<input id = '" + this._issueAddInputID + "' placeholder = 'add a new issue'>";

        const sessionPickerButton = "<button id = '" + this._sessionPickerButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'></button>";
        const sessionPickerDiv = "<div id = '" + this._sessionPickerDivID + "' class = 'hidden'></div>";
        const sessionPickerScrollDiv = "<div id = '" + this._sessionPickerScrollDivID + "'></div>";

        const sessionAddButton = "<button id = '" + this._sessionAddButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + plusIcon + "</button>";
        
        this.div.append("<span></span><span></span>");
        this.div.children().eq(0).append(loginButton + loginDiv);
        $("#" + this._loginDivID).append(loginDivUsernameInput + loginDivPasswordInput + loginDivLoginButton + loginDivForgotPasswordButton + loginDivNewAccountButton);
        this.div.children().eq(0).append(dotIcon);
        this.div.children().eq(0).append(issuePickerButton + issuePickerDiv);
        $("#" + this._issuePickerDivID).append(issuePickerSearchInput + issuePickerScrollDiv);
        this.div.children().eq(0).append(issueRenameButton + issueRenameDiv);
        $("#" + this._issueRenameDivID).append(issueRenameInput);
        this.div.children().eq(0).append(issueAddButton + issueAddDiv);
        $("#" + this._issueAddDivID).append(issueAddInput);
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
        const caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
        const pickerButton = $("#" + this._issuePickerButtonID);
//        const renameButton = $("#" + this._issueRenameButtonID);
        const addButton = $("#" + this._issueAddButtonID);
        const div = $("#" + this._issuePickerScrollDivID);
        const issues = this.data.issues();
        const numIssues = issues.length;
        const selectedIssue = this.sessions.issueName;
        var code, pickerButtonText;
        div.empty();
        if (numIssues) {
            pickerButtonText = selectedIssue;
            if (numIssues > 1) { pickerButtonText += " " + caretDownIcon; }
            pickerButton.html(pickerButtonText);
            div.append("<div style='display: grid'>");
            issues.forEach(function(entry) {
                code = "<div class = 'row'><button type='button' class='btn ";
                if (entry == selectedIssue) { code += "btn-info"; }
                else { code += "btn-outline-info"; }
                code += " btn-sm'>" + entry + "</button></div>";
                div.append(code);
            });
            div.append("</div>");
            //            renameButton.attr("disabled", false);
//            pickerButton.attr("disabled", false);
        }
//        else {
//            pickerButton.text("No issues.  Create one!");
//            pickerButton.attr("disabled", true);
//            renameButton.attr("disabled", true);
//        }
        if (numIssues == 1 && selectedIssue == "Unspecified") { addButton.attr("disabled", true); }
        else                                                  { addButton.attr("disabled", false); }

    }

    _manageSessionUtilities() {
        const caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
        const numIssues = $("#" + this._issuePickerScrollDivID).children().length;
        const pickerButton = $("#" + this._sessionPickerButtonID);
        const addButton = $("#" + this._sessionAddButtonID);
        const selectedSession = this.sessions.sessionName;
        const selectedIssue = this.data.sessionIssue(selectedSession);
        const sessions = this.data.issueSessions(this.data.sessionIssue(selectedSession));
        const div = $("#" + this._sessionPickerScrollDivID);
        const self = this;
        var code, sessionPickerText;
        div.empty();
        if (sessions.length) {
            sessionPickerText = this.dateString(selectedSession);
            if (sessions.length > 1) { sessionPickerText += " " + caretDownIcon; }
            pickerButton.html(sessionPickerText);

            sessions.forEach(function(entry) {
                code = "<button type='button' class='btn ";
                if (entry == selectedSession) { code += "btn-info"; }
                else { code += "btn-outline-info"; }
                code += " btn-sm' value = '" + entry + "'>" + self.dateString(entry) + "</button>";
                div.append(code);
            });
        }
//        if (sessions.length > 1)  { pickerButton.attr("disabled", false); }
//        else if (sessions.length) { pickerButton.attr("disabled", true); }
//        else                      { pickerButton.text("No sessions.  Create an issue!"); }

        if (numIssues == 1 && selectedIssue == "Unspecified") { addButton.attr("disabled", true); }
        else                                                  { addButton.attr("disabled", false); }
    }

    dateString(entry) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const d = new Date(entry * 1000);
        const year = String(d.getFullYear());
        const month = months[d.getMonth()];
        const day = String(d.getDate());
        const hour = String((d.getHours() > 12) ? d.getHours() - 12 : d.getHours()).padStart(2, '0');
        const minute = String(d.getMinutes()).padStart(2, '0');
        const second = String(d.getSeconds()).padStart(2, '0');
        const ampm = String((d.getHours() > 12) ? "PM" : "AM");
        return month + " " + day + ", " + year + " " + hour + ":" + minute + ":" + second + ampm;
    }
}