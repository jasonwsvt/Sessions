/* utilities class links to session class and dataManager classes
*/

class IssueUtilities {
    _utilities = null;

    _caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
    _caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";
    _plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
    _pencilIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-pencil-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg>";
    _searchIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-search' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'/><path fill-rule='evenodd' d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'/></svg>";

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

    constructor (utilities) {
        const self = this;
        this._utilities = utilities;

        $(document).ready(function() {
            $("html").on("click", function(e) {
                if(!self._issuePickerDiv.hasClass("hidden")) {
                    self._issuePickerDiv.trigger("focusout");
                }
                if(!self._issueRenameDiv.hasClass("hidden")) {
                    self._issueRenameDiv.trigger("focusout");
                }
                if(!self._issueAddDiv.hasClass("hidden")) {
                    self._issueAddDiv.trigger("focusout");
                }
            });

            self._issuePickerButton.on("click", function(e) {
                if (self._numRows > 1) {
                    if (self._issuePickerDiv.hasClass("hidden")) {
                        $(this).html(self.sessions.issueName + " " + self._caretUpIcon);
                        self._issuePickerDiv.removeClass("hidden");
                        self._issuePickerDiv.css("left", String(self._issuePickerButton.position().left) + "px");
                        self._issuePickerDiv.css("top", String(self._issuePickerButton.position().top + self._issuePickerButton.outerHeight()) + "px");
                        self._issuePickerDiv.addClass("popUpMenu");
                        self._issuePickerSearchInput.focus();
                        }
                    else {
                        self._issuePickerButton.html(self.sessions.issueName + " " + self._caretDownIcon);
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
                for (var i = 0; i < self._numRows; i++) {
                    if (!self._button(i).text().includes($(this).val())) {
                        self._row(i).addClass("hidden");
                    }
                    else if (self._row(i).hasClass("hidden")) {
                        self._row(i).removeClass("hidden");
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
                self._issuePickerButton.html(self.sessions.issueName + " " + self._caretDownIcon);
                self._issuePickerDiv.addClass("hidden");
                self._issuePickerDiv.removeClass("popUpMenu");
                self._issuePickerButton.blur();
            });

            self._issueRenameButton.on("click", function(e) {
                if (self._issueRenameDiv.hasClass("hidden")) {
                    self._issueRenameDiv.removeClass("hidden");
                    self._issueRenameDiv.css("left", String(self._issueRenameButton.position().left) + "px");
                    self._issueRenameDiv.css("top", String(self._issueRenameButton.position().top + self._issueRenameButton.outerHeight()) + "px");
                    self._issueRenameDiv.addClass("popUpMenu");
                    self._issueRenameInput.val(self.sessions.issueName);
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
                    self.sessions.renameIssue(this.value);
                    self.manage();
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
                if (self._issueAddDiv.hasClass("hidden")) {
                    self._issueAddDiv.removeClass("hidden");
                    self._issueAddDiv.css("left", String(self._issueAddButton.position().left) + "px");
                    self._issueAddDiv.css("top", String(self._issueAddButton.position().top + self._issueAddButton.outerHeight()) + "px");
                    self._issueAddDiv.addClass("popUpMenu");
                    self._issueAddInput.focus();
                }
                else {
                    self._issueAddDiv.addClass("hidden");
                    self._issueAddDiv.removeClass("popUpMenu");
                    self._issueAddDiv.blur();
                    self._issueAddButton.blur();
                }
                e.stopPropagation();
            });

            self._issueAddInput.on("keypress", function(e) {
                if (e.key == "Enter") {
                    self._issueAddDiv.addClass("hidden");
                    self._issueAddDiv.removeClass("popUpMenu");
                    self.sessions.newIssue(this.value);
                    self.manage();
                    self._issueAddDiv.blur();
                    self._issueAddButton.blur();
                }
                e.stopPropagation();
            });

            self._issueAddDiv.on("focusout", function() {
                $(this).addClass("hidden");
                $(this).removeClass("popUpMenu");
                self._issueAddButton.blur();
            });
        });
    }

    get utilities()          { return this._utilities; }
    get div()                { return this.utilities.div; }
    get lines()              { return this.utilities.lines; }
    get sessions()           { return this.utilities.sessions; }
    get data()               { return this.utilities.data; }
    get buttons()            { return this.utilities.buttons; }
    get numIssues()          { return this._numRows; }
    get _issuePickerButton()      { return $("#" + this._issuePickerButtonID); }
    get _issuePickerDiv()         { return $("#" + this._issuePickerDivID); }
    get _issuePickerSearch()      { return $("#" + this._issuePickerSearchID); }
    get _issuePickerSearchInput() { return $("#" + this._issuePickerInputID); }
    get _issuePickerScrollDiv()   { return $("#" + this._issuePickerScrollDivID); }
    get _issueRenameButton()      { return $("#" + this._issueRenameButtonID); }
    get _issueRenameDiv()         { return $("#" + this._issueRenameDivID); }
    get _issueRenameInput()       { return $("#" + this._issueRenameInputID); }
    get _issueAddButton()         { return $("#" + this._issueAddButtonID); }
    get _issueAddDiv()            { return $("#" + this._issueAddDivID); }
    get _issueAddInput()          { return $("#" + this._issueAddInputID); }
    get _numIssueRows()           { return this._issuePickerScrollDiv.find(".row").length; }
    _issueRow(i)                  { return this._issuePickerScrollDiv.find(".row").eq(i); }
    _issueButton(i)               { return this._issuePickerScrollDiv.find(".button").eq(i); }
    
    build(element) {
        const plusIcon = this._plusIcon;
        const pencilIcon = this._pencilIcon;
        const searchIcon = this._searchIcon;

        const pickerButton = "<button id = '" + this._issuePickerButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'></button>";
        const pickerDiv = "<div id = '" + this._issuePickerDivID + "' class = 'hidden'></div>";
        const pickerSearchInput = "<input id = '" + this._issuePickerSearchInputID + "' placeholder = 'search'> " + searchIcon;
        const pickerScrollDiv = "<div id = '" + this._issuePickerScrollDivID + "'></div>";

        const renameButton = "<button id = '" + this._issueRenameButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + pencilIcon + "</button>";
        const renameDiv = "<div id = '" + this._issueRenameDivID + "' class = 'hidden'></div>";
        const renameInput = "<input id = '" + this._issueRenameInputID + "' placeholder = 'rename the selected issue' size = '50'>";

        const addButton = "<button id = '" + this._issueAddButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + plusIcon + "</button>";
        const addDiv = "<div id = '" + this._issueAddDivID + "' class = 'hidden'></div>";
        const addInput = "<input id = '" + this._issueAddInputID + "' placeholder = 'add a new issue'>";

        element.append(pickerButton + pickerDiv);
        this._issuePickerDiv.append(pickerSearchInput + pickerScrollDiv);
        this._issuePickerScrollDiv.css("height", "125px");
        element.append(renameButton + renameDiv);
        this._issueRenameDiv.append(renameInput);
        element.append(addButton + addDiv);
        this._issueAddDiv.append(addInput);
    }

    manageIssueUtilities() {
        const self = this;
        const issues = this.data.issues();
        const numIssues = issues.length;
        const selectedIssue = this.sessions.issueName;
        var code, pickerButtonText;
        this._issuePickerScrollDiv.empty();
        if (numIssues) {
            pickerButtonText = selectedIssue;
            if (numIssues > 1) { pickerButtonText += " " + this._caretDownIcon; }
            this._issuePickerButton.html(pickerButtonText);
            code = "<div style = 'display: grid'>";
            issues.forEach(function(entry) {
                code += "<div class = 'row'><button type='button' class='btn ";
                if (entry == selectedIssue) { code += "btn-info"; }
                else { code += "btn-outline-info"; }
                code += " btn-sm'>" + entry + "</button></div>";
            });
            code += "</div>";
            this._issuePickerScrollDiv.append(code);
        }

        this._issuePickerScrollDiv.find("button").on("click", function() {
            console.log(self._issuePickerScrollDivID + " button click " + $(this).text());
            self.sessions.loadMostRecentSessionForIssue($(this).text());
            self._issuePickerDiv.addClass("hidden");
            self._issuePickerDiv.removeClass("popUpMenu");
            self._issuePickerDiv.blur();
            self._issuePickerButton.blur();
            self.utilities.manage();
        });

        if (numIssues == 1 && selectedIssue == "Unspecified") { this._issueAddButton.attr("disabled", true); }
        else                                                  { this._issueAddButton.attr("disabled", false); }

    }
}