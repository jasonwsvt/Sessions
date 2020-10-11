/* utilities class links to sessions class
*/

class Utilities {
    _utilitiesID = null;
    _sessions = null;
    _minLinesHeight = null;
    _maxLinesHeight = null;

    _dotIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-dot my-2' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'/></svg>";
    _caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
    _caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";
    _plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
    _pencilIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-pencil-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg>";
    _searchIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-search' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'/><path fill-rule='evenodd' d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'/></svg>";
    _dotIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-dot my-2' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'/></svg>";
    _exportIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-download' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/><path fill-rule='evenodd' d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z'/></svg>";
    _importIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-upload' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/><path fill-rule='evenodd' d='M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z'/></svg>";
    _scrollUpIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-arrow-bar-up' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z'/></svg>";
    _scrollDownIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-arrow-bar-down' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z'/></svg>";
    _infoIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-info-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path d='M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z'/><circle cx='8' cy='4.5' r='1'/></svg>";
    _configIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-gear' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z'/><path fill-rule='evenodd' d='M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z'/></svg>";

    _loginButtonID = "loginButton";
    _forgotPasswordID = "forgotPassword";
    _newAccountID = "newAccount";
    _loginDivID = "loginDiv";
    _usernameID = "username";
    _passwordID = "password";
    _loginID = "login";

    _issuePickerButtonID = "issuePickerButton";
    _issuePickerDivID = "issuePickerDiv";
    _issuePickerSearchID = "issuePickerSearch";
    _issuePickerSearchInputID = "issuePickerSearchInput";
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
    _infoButtonID = "infoButton";
    _configButtonID = "configButton";


    constructor (utilitiesID, sessions, buttons) {
        const self = this;
        this._utilitiesID = utilitiesID;
        this._sessions = sessions;
        this._buttons = buttons;

        this.build();
        this.manage();
        this.buttons.adjustDivHeights();

        $(document).ready(function() {
            $("html").on("click", function(e) {
                self.closeMenus();
            });

            self._issuePickerButton.on("click", function(e) {
                self.closeMenus(self._issuePickerButtonID);
                if (self._numIssueRows > 1) {
                    if (self._issuePickerDiv.hasClass("hidden")) {
                        if (self.numIssues > 1) {
                            $(this).html(self.currentIssue + " " + self._caretUpIcon);
                        }
                        if (self.numIssues == 1) {
                            $(this).html(self.currentIssue);
                        }
                        self._issuePickerDiv.removeClass("hidden");
                        self._issuePickerDiv.css("left", String(self._issuePickerButton.position().left) + "px");
                        self._issuePickerDiv.css("top", String(self._issuePickerButton.position().top + self._issuePickerButton.outerHeight()) + "px");
                        self._issuePickerDiv.addClass("popUpMenu");
                        self._issuePickerSearchInput.focus();
                        }
                    else {
                        self._issuePickerButton.html(self.currentIssue + " " + self._caretDownIcon);
                        self._issuePickerDiv.addClass("hidden");
                        self._issuePickerDiv.removeClass("popUpMenu");
                        self._issuePickerDiv.blur();
                        self._issuePickerButton.blur();
                    }
                }
                e.stopPropagation();
            });

            self._issuePickerSearchInput.on("click", function(e) {
                e.stopPropagation();
            });

            self._issuePickerSearchInput.on("keypress", function(e) {
                e.stopPropagation();
            });

            self._issuePickerSearchInput.on("keyup", function(e) {
                for (var i = 0; i < self._numIssueRows; i++) {
//                    console.log($(this).val(), self._issueButton(i), "'" + self._issueButton(i).text() + "'");
                    if (!self._issueButton(i).text().includes($(this).val())) {
                        self._issueRow(i).addClass("hidden");
                    }
                    else if (self._issueRow(i).hasClass("hidden")) {
                        self._issueRow(i).removeClass("hidden");
                    }
                }
                e.stopPropagation();
            });

            self._issuePickerScrollDiv.on("click", function(e) {
                e.stopPropagation();
            });

            self._issuePickerDiv.on("click", function(e) {
                e.stopPropagation();
            });

            self._issuePickerDiv.on("focusout", function() {
                console.log(self._issuePickerDivID + " focusout");
                if (self.numIssues > 1) { self._issuePickerButton.html(self.currentIssue + " " + self._caretDownIcon); }
                else { self._issuePickerButton.html(self.currentIssue); }
//                self._issuePickerDiv.addClass("hidden");
//                self._issuePickerDiv.removeClass("popUpMenu");
                self._issuePickerButton.blur();
            });

            self._issueRenameButton.on("click", function(e) {
                self.closeMenus(self._issueRenameButtonID);
                if (self._issueRenameDiv.hasClass("hidden")) {
                    self._issueRenameDiv.removeClass("hidden");
                    self._issueRenameDiv.css("left", String(self._issueRenameButton.position().left) + "px");
                    self._issueRenameDiv.css("top", String(self._issueRenameButton.position().top + self._issueRenameButton.outerHeight()) + "px");
                    self._issueRenameDiv.addClass("popUpMenu");
                    self._issueRenameInput.val(self.currentIssue);
                    self._issueRenameInput.focus();
                }
                else {
                    self._issueRenameDiv.addClass("hidden");
                    self._issueRenameDiv.removeClass("popUpMenu");
                    self._issueRenameDiv.blur();
                    self._issueRenameButton.blur();
                }
                e.stopPropagation();
            });

            self._issueRenameInput.on("keypress", function(e) {
                if (e.key == "Enter") {
                    self._issueRenameDiv.addClass("hidden");
                    self._issueRenameDiv.removeClass("popUpMenu");
                    self.sessions.renameIssue(self.currentIssue, this.value);
                    self.manageIssueUtilities();
                    self._issueRenameDiv.blur();
                    self._issueRenameButton.blur();
                }
                e.stopPropagation();
            });

            self._issueRenameDiv.on("focusout", function() {
                $(this).addClass("hidden");
                $(this).removeClass("popUpMenu");
                self._issueRenameButton.blur();
            });

            self._issueAddButton.on("click", function(e) {
                self.closeMenus(self._issueAddButtonID);
                if (self._issueAddDiv.hasClass("hidden")) {
                    self._issueAddDiv.removeClass("hidden");
                    self._issueAddDiv.css("left", String(self._issueAddButton.position().left) + "px");
                    self._issueAddDiv.css("top", String(self._issueAddButton.position().top + self._issueAddButton.outerHeight()) + "px");
                    self._issueAddDiv.addClass("popUpMenu");
                    self._issueAddInput.focus();
                }
                else {
                    self.closeMenus();
                }
                e.stopPropagation();
            });

            self._issueAddInput.on("keypress", function(e) {
                if (e.key == "Enter") {
                    self._issueAddDiv.addClass("hidden");
                    self._issueAddDiv.removeClass("popUpMenu");
                    self.sessions.newSession(this.value);
                    self.manage();
                    self.closeMenus();
                }
                e.stopPropagation();
            });

            self._issueAddDiv.on("focusout", function() {
                $(this).addClass("hidden");
                $(this).removeClass("popUpMenu");
                self._issueAddButton.blur();
            });

            self._sessionPickerButton.on("click", function(e) {
                self.closeMenus(self._sessionPickerButtonID);
                if (self._numSessionButtons > 1) {
                    if (self._sessionPickerDiv.hasClass("hidden")) {
                        if (self.numSessions == 1) {
                            self._sessionPickerButton.html(self.dateString(self.currentSession));
                        }
                        if (self.numSessions > 1) {
                            self._sessionPickerButton.html(self.dateString(self.currentSession) + " " + self._caretUpIcon);
                        }
                        self._sessionPickerDiv.removeClass("hidden");
                        self._sessionPickerDiv.css("left", String(self._sessionPickerButton.position().left) + "px");
                        self._sessionPickerDiv.css("top", String(self._sessionPickerButton.position().top + self._sessionPickerButton.outerHeight()) + "px");
                        self._sessionPickerDiv.addClass("popUpMenu");
                        self._sessionPickerDiv.focus();
                    }
                    else {
                        self._sessionPickerButton.html(self.dateString(self.currentSession) + " " + self._caretDownIcon);
                        self._sessionPickerDiv.addClass("hidden");
                        self._sessionPickerDiv.removeClass("popUpMenu");
                        self._sessionPickerButton.blur();
                    }
                }
                e.stopPropagation();
            });

            self._sessionPickerDiv.on("focusout", function() {
                if (self.numSessions == 1) {
                    self._sessionPickerButton.html(self.dateString(self.currentSession));
                }
                if (self.numSessions > 1) {
                    self._sessionPickerButton.html(self.dateString(self.currentSession) + " " + self._caretDownIcon);
                }
                $(this).addClass("hidden");
                $(this).removeClass("popUpMenu");
            });

            self._sessionAddButton.on("click", function(e) {
                self.sessions.newSession(self.currentIssue);
                self.manageSessionUtilities();
                $(this).blur();
                e.stopPropagation();
            });

            self._slideUpButton.on("click", function() {
                const lineHeight = Number(self.lines.div.children().eq(0).height());
                const minLinesHeight = 0;
                if (parseInt(self.lines.height) > minLinesHeight) {
                    self.lines.height = String(parseInt(self.lines.height) - lineHeight) + "px";
                    self.buttons.adjustDivHeights();
                }
            });

            Mousetrap.bind(['ctrl+up'], function(e) {
                self._slideUpButton.trigger("click");
                return false;
            });

            self._slideDownButton.on("click", function() {
                const lineHeight = Number(self.lines.div.children().eq(0).height());
                const maxLinesHeight = $(window).height() - Number(self.lines.div.children().eq(0).height());
                if (parseInt(self.lines.height) < maxLinesHeight) {
                    self.lines.height = String(parseInt(self.lines.height) + lineHeight) + "px";
                    self.buttons.adjustDivHeights();
                }
            });

            Mousetrap.bind(['ctrl+down'], function(e) {
                self._slideDownButton.trigger("click");
                return false;
            });

            self._exportButton.on("click", function() {

            });

            self._importButton.on("click", function() {

            });

            self._configButton.on("click", function() {

            });

            self._infoButton.on("click", function() {

            });
        }); 
    }

    get div()                     { return $("#" + this._utilitiesID); }
    get lines()                   { return this.sessions.lines; }
    get sessions()                { return this._sessions; }
    get buttons()                 { return this._buttons; }
    get numIssues()               { return this._numIssueRows; }
    get currentIssue()            { return this.lines.session.issue; }
    get currentSession()          { return this.lines.session.creation; }
    get _loginDiv()               { return $("#" + this._loginDivID); }
    get _issuePickerButton()      { return $("#" + this._issuePickerButtonID); }
    get _issuePickerDiv()         { return $("#" + this._issuePickerDivID); }
    get _issuePickerSearch()      { return $("#" + this._issuePickerSearchID); }
    get _issuePickerSearchInput() { return $("#" + this._issuePickerSearchInputID); }
    get _issuePickerScrollDiv()   { return $("#" + this._issuePickerScrollDivID); }
    get _issueRenameButton()      { return $("#" + this._issueRenameButtonID); }
    get _issueRenameDiv()         { return $("#" + this._issueRenameDivID); }
    get _issueRenameInput()       { return $("#" + this._issueRenameInputID); }
    get _issueAddButton()         { return $("#" + this._issueAddButtonID); }
    get _issueAddDiv()            { return $("#" + this._issueAddDivID); }
    get _issueAddInput()          { return $("#" + this._issueAddInputID); }
    get _numIssueRows()           { return this._issuePickerScrollDiv.find(".row").length; }
    _issueRow(i)                  { return this._issuePickerScrollDiv.find(".row").eq(i); }
    _issueButton(i)               { return this._issuePickerScrollDiv.find("button").eq(i); }
    get _sessionPickerButton()    { return $("#" + this._sessionPickerButtonID); }
    get _sessionPickerDiv()       { return $("#" + this._sessionPickerDivID); }
    get _sessionAddButton()       { return $("#" + this._sessionAddButtonID); }
    get _sessionPickerScrollDiv() { return $("#" + this._sessionPickerScrollDivID); }
    get _numSessionButtons()      { return this._sessionPickerScrollDiv.find("button").length; }
    get _slideUpButton()          { return $("#" + this._slideUpButtonID); }
    get _slideDownButton()        { return $("#" + this._slideDownButtonID); }
    get _exportButton()           { return $("#" + this._exportButtonID); }
    get _importButton()           { return $("#" + this._importButtonID); }
    get _configButton()           { return $("#" + this._configButtonID); }
    get _infoButton()             { return $("#" + this._infoButtonID); }

    build() {
        const plusIcon = this._plusIcon;
        const pencilIcon = this._pencilIcon;
        const searchIcon = this._searchIcon;
        const dotIcon = this._dotIcon;
        const exportIcon = this._exportIcon;
        const importIcon = this._importIcon;
        const scrollUpIcon = this._scrollUpIcon;
        const scrollDownIcon = this._scrollDownIcon;
        const infoIcon = this._infoIcon;
        const configIcon = this._configIcon;

        const loginButton = "<button id = '" + this._loginButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>Click to log in.</button>";
        const loginDiv = "<div id = '" + this._loginDivID + "' class = 'hidden'></div>";
        const loginDivUsernameInput = "<input id = '" + this._usernameID + "' type = 'text' placeholder = 'username'>";
        const loginDivPasswordInput = "<input id = '" + this._passwordID + "' type = 'text' placeholder = 'password'>";
        const loginDivLoginButton = "<button id = '" + this._loginID + "' type = 'button' class = 'btn btn-dark btn-sm'>Set up new account</button>";
        const loginDivForgotPasswordButton = "<button id = '" + this._forgotPasswordID + "' type = 'button' class = 'btn btn-dark btn-sm'>Forgot password?</button>";
        const loginDivNewAccountButton = "<button id = '" + this._newAccountID + "' type = 'button' class = 'btn btn-dark btn-sm'>Set up new account.</button>";

        const issuePickerButton = "<button id = '" + this._issuePickerButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'></button>";
        const issuePickerDiv = "<div id = '" + this._issuePickerDivID + "' class = 'hidden'></div>";
        const issuePickerSearchInput = "<input id = '" + this._issuePickerSearchInputID + "' placeholder = 'search'> " + searchIcon;
        const issuePickerScrollDiv = "<div id = '" + this._issuePickerScrollDivID + "'></div>";

        const issueRenameButton = "<button id = '" + this._issueRenameButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + pencilIcon + "</button>";
        const issueRenameDiv = "<div id = '" + this._issueRenameDivID + "' class = 'hidden'></div>";
        const issueRenameInput = "<input id = '" + this._issueRenameInputID + "' placeholder = 'rename the selected issue' size = '50'>";

        const issueAddButton = "<button id = '" + this._issueAddButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + plusIcon + "</button>";
        const issueAddDiv = "<div id = '" + this._issueAddDivID + "' class = 'hidden'></div>";
        const issueAddInput = "<input id = '" + this._issueAddInputID + "' placeholder = 'add a new issue'>";

        const sessionPickerButton = "<button id = '" + this._sessionPickerButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'></button>";
        const sessionPickerDiv = "<div id = '" + this._sessionPickerDivID + "' class = 'hidden'></div>";
        const sessionPickerScrollDiv = "<div id = '" + this._sessionPickerScrollDivID + "'></div>";

        const sessionAddButton = "<button id = '" + this._sessionAddButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + this._plusIcon + "</button>";
        
        const slideUpButton = "<button id = '" + this._slideUpButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + scrollUpIcon + "</button>";
        const slideDownButton = "<button id = '" + this._slideDownButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + scrollDownIcon + "</button>";
        const importButton = "<button id = '" + this._importButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + importIcon + "</button>";
        const exportButton = "<button id = '" + this._exportButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + exportIcon + "</button>";
        const configButton = "<button id = '" + this._configButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + configIcon + "</button>";
        const infoButton = "<button id = '" + this._infoButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + infoIcon + "</button>";

        this.div.append("<span></span><span></span>");

        const leftSide = this.div.children().eq(0);
        const rightSide = this.div.children().eq(1);

        leftSide.append(loginButton + loginDiv);
        this._loginDiv.append(loginDivUsernameInput + loginDivPasswordInput + loginDivLoginButton + loginDivForgotPasswordButton + loginDivNewAccountButton);
        leftSide.append(dotIcon);
        leftSide.append(issuePickerButton + issuePickerDiv);
        this._issuePickerDiv.append(issuePickerSearchInput + issuePickerScrollDiv);
        leftSide.append(issueRenameButton + issueRenameDiv);
        this._issueRenameDiv.append(issueRenameInput);
        leftSide.append(issueAddButton + issueAddDiv);
        this._issueAddDiv.append(issueAddInput);
        leftSide.append(dotIcon);
        leftSide.append(sessionPickerButton + sessionPickerDiv + sessionAddButton);
        this._sessionPickerDiv.append(sessionPickerScrollDiv);
        rightSide.append(slideUpButton + slideDownButton);
        rightSide.append(dotIcon);
        rightSide.append(importButton + exportButton);
        rightSide.append(dotIcon);
        rightSide.append(configButton + infoButton);
    }

    manage() {
        this.manageIssueUtilities();
        this.manageSessionUtilities();
    }

    manageIssueUtilities() {
        const self = this;
        const issues = this.sessions.issues();
        const numIssues = issues.length;
        const selectedIssue = this.currentIssue;
//        console.log(issues, numIssues, selectedIssue);
        var code, pickerButtonText, scrollDivHeight, i;
        this._issuePickerScrollDiv.empty();
        pickerButtonText = selectedIssue;
        if (numIssues > 1) { pickerButtonText += " " + this._caretDownIcon; }
        this._issuePickerButton.html(pickerButtonText);
        if (numIssues > 1) {
                code = "<div style = 'display: grid'>";
            issues.forEach(function(entry) {
                code += "<div class = 'row'><button type='button' class='btn ";
                if (entry == selectedIssue) { code += "btn-info"; }
                else { code += "btn-outline-info"; }
                code += " btn-sm'>" + entry + "</button></div>";
            });
            code += "</div>";
            this._issuePickerScrollDiv.append(code);

            this._issuePickerScrollDiv.find("button").on("click", function(e) {
                console.log(self._issuePickerScrollDivID + " button click " + $(this).text());
                self.lines.load(self.sessions.mostRecentIssueSession($(this).text()));
                self.closeMenus();
                self.manage();
                e.stopPropagation();
            });

            scrollDivHeight = parseInt(this.numIssues) * parseInt(this._issueRow(0).outerHeight);
            if (this._issuePickerScrollDiv.position().top + scrollDivHeight > window.innerHeight) {
                scrollDivHeight = window.innerHeight - this._issuePickerScrollDiv.position().top;
            }
            this._issuePickerScrollDiv.css("height", String(scrollDivHeight) + "px");
            this._issuePickerDiv.css("height", String(parseInt(this._issuePickerSearchInput.outerHeight) + parseInt(this._issuePickerScrollDiv.outerHeight) + 10) + "px");

            if (numIssues == 1 && selectedIssue == "Unspecified") { this._issueAddButton.attr("disabled", true); }
            else                                                  { this._issueAddButton.attr("disabled", false); }
        }

    }

    manageSessionUtilities() {
        const selectedSession = this.currentSession;
        const selectedIssue = this.currentIssue;
        const sessions = this.sessions.issueSessions(selectedIssue);
        const self = this;
        var code, pickerText, scrollDivHeight;
        this._sessionPickerScrollDiv.empty();
        pickerText = this.dateString(selectedSession);
        if (sessions.length > 1) { pickerText += " " + this._caretDownIcon; }
        this._sessionPickerButton.html(pickerText);
        if (sessions.length > 1) {
            sessions.forEach(function(entry) {
                code = "<button type='button' class='btn ";
                if (String(entry) == String(selectedSession)) { code += "btn-info"; }
                else { code += "btn-outline-info"; }
                code += " btn-sm' value = '" + entry + "'>" + entry + " " + self.dateString(entry) + "</button>";
                self._sessionPickerScrollDiv.append(code);
            });

            self._sessionPickerScrollDiv.find("button").on("click", function(e) {
                console.log("sessionPickerScrollDiv button click: loading " + this.value);
                self.lines.load(this.value);
                self.closeMenus();
                self.manageSessionUtilities();
                e.stopPropagation();
            });

            scrollDivHeight = parseInt(this.numSessions) * parseInt(this._sessionPickerScrollDiv.find("button").eq(0).outerHeight);
            if (this._sessionPickerScrollDiv.position().top + scrollDivHeight > window.innerHeight) {
                scrollDivHeight = window.innerHeight - this._sessionPickerScrollDiv.position().top;
            }
            this._sessionPickerScrollDiv.css("height", String(scrollDivHeight) + "px");
            this._sessionPickerDiv.css("height", String(parseInt(this._sessionPickerScrollDiv.outerHeight) + 10) + "px");

            if (this._numIssueRows == 1 && selectedIssue == "Unspecified") { this._sessionAddButton.attr("disabled", true); }
                else                                                        { this._sessionAddButton.attr("disabled", false); }
        }
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

    closeMenus(except) {
        if (except != this._issuePickerButtonID)   {
            this._issuePickerDiv.addClass("hidden");
            this._issuePickerDiv.removeClass("popUpMenu");
            this._issuePickerButton.focusout();
        }
        if (except != this._issueRenameButtonID)   { 
            this._issueRenameDiv.addClass("hidden");
            this._issueRenameDiv.removeClass("popUpMenu");
            this._issueRenameButton.focusout();
        }
        if (except != this._issueAddButtonID)      { 
            this._issueAddDiv.addClass("hidden");
            this._issueAddDiv.removeClass("popUpMenu");
            this._issueAddButton.focusout();
        }
        if (except != this._sessionPickerButtonID) { 
            this._sessionPickerDiv.addClass("hidden");
            this._sessionPickerDiv.removeClass("popUpMenu");
            this._sessionPickerButton.focusout();
        }
    }
}