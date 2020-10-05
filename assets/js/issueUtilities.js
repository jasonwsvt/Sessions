/* utilities class links to session class and dataManager classes
*/

class IssueUtilities {
    _utilities = null;

    _caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
    _caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";
    _plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
    _pencilIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-pencil-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg>";
    _searchIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-search' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'/><path fill-rule='evenodd' d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'/></svg>";

    _pickerButtonID = "issuePickerButton";
    _pickerDivID = "issuePickerDiv";
    _pickerSearchID = "issuePickerSearch";
    _pickerSearchInputID = "issuePickerSearchInput";
    _pickerScrollDivID = "issuePickerScrollDiv";
    _renameButtonID = "issueRenameButton";
    _renameDivID = "issueRenameDiv";
    _renameInputID = "issueRenameInput";
    _addButtonID = "issueAddButton";
    _addDivID = "issueAddDiv";
    _addInputID = "issueAddInput";

    constructor (utilities) {
        const self = this;
        this._utilities = utilities;

        $(document).ready(function() {
            $("html").on("click", function(e) {
                if(!self._pickerDiv.hasClass("hidden")) {
                    self._pickerDiv.trigger("focusout");
                }
                if(!self._renameDiv.hasClass("hidden")) {
                    self._renameDiv.trigger("focusout");
                }
                if(!self._addDiv.hasClass("hidden")) {
                    self._addDiv.trigger("focusout");
                }
            });

            self._pickerButton.on("click", function(e) {
                if (self._numRows > 1) {
                    if (self._pickerDiv.hasClass("hidden")) {
                        $(this).html(self.sessions.issueName + " " + self._caretUpIcon);
                        self._pickerDiv.removeClass("hidden");
                        self._pickerDiv.css("left", String(self._pickerButton.position().left) + "px");
                        self._pickerDiv.css("top", String(self._pickerButton.position().top + self._pickerButton.outerHeight()) + "px");
                        self._pickerDiv.addClass("popUpMenu");
                        self._pickerSearchInput.focus();
                        }
                    else {
                        self._pickerButton.html(self.sessions.issueName + " " + self._caretDownIcon);
                        self._pickerDiv.addClass("hidden");
                        self._pickerDiv.removeClass("popUpMenu");
                        self._pickerDiv.blur();
                        self._pickerButton.blur();
                    }
                }
                e.stopPropagation();
            });

            self._pickerSearchInput.on("click", function(e) {
                e.stopPropagation();
            });

            self._pickerSearchInput.on("keypress", function(e) {
                e.stopPropagation();
            });

            self._pickerSearchInput.on("keyup", function(e) {
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

            self._pickerScrollDiv.on("click", function(e) {
                e.stopPropagation();
            });

            self._pickerDiv.on("click", function(e) {
                e.stopPropagation();
            });

            self._pickerDiv.on("focusout", function() {
                console.log(self._pickerDivID + " focusout");
                self._pickerButton.html(self.sessions.issueName + " " + self._caretDownIcon);
                self._pickerDiv.addClass("hidden");
                self._pickerDiv.removeClass("popUpMenu");
                self._pickerButton.blur();
            });

            self._renameButton.on("click", function(e) {
                if (self._renameDiv.hasClass("hidden")) {
                    self._renameDiv.removeClass("hidden");
                    self._renameDiv.css("left", String(self._renameButton.position().left) + "px");
                    self._renameDiv.css("top", String(self._renameButton.position().top + self._renameButton.outerHeight()) + "px");
                    self._renameDiv.addClass("popUpMenu");
                    self._renameInput.val(self.sessions.issueName);
                    self._renameInput.focus();
                }
                else {
                    self._renameDiv.addClass("hidden");
                    self._renameDiv.removeClass("popUpMenu");
                    self._renameDiv.blur();
                    self._renameButton.blur();
                }
                e.stopPropagation();
            });

            self._renameInput.on("keypress", function(e) {
                if (e.key == "Enter") {
                    self._renameDiv.addClass("hidden");
                    self._renameDiv.removeClass("popUpMenu");
                    self.sessions.renameIssue(this.value);
                    self.manage();
                    self._renameDiv.blur();
                    self._renameButton.blur();
                }
                e.stopPropagation();
            });

            self._renameDiv.on("focusout", function() {
                $(this).addClass("hidden");
                $(this).removeClass("popUpMenu");
                self._renameButton.blur();
            });

            self._addButton.on("click", function(e) {
                if (self._addDiv.hasClass("hidden")) {
                    self._addDiv.removeClass("hidden");
                    self._addDiv.css("left", String(self._addButton.position().left) + "px");
                    self._addDiv.css("top", String(self._addButton.position().top + self._addButton.outerHeight()) + "px");
                    self._addDiv.addClass("popUpMenu");
                    self._addInput.focus();
                }
                else {
                    self._addDiv.addClass("hidden");
                    self._addDiv.removeClass("popUpMenu");
                    self._addDiv.blur();
                    self._addButton.blur();
                }
                e.stopPropagation();
            });

            self._addInput.on("keypress", function(e) {
                if (e.key == "Enter") {
                    self._addDiv.addClass("hidden");
                    self._addDiv.removeClass("popUpMenu");
                    self.sessions.newIssue(this.value);
                    self.manage();
                    self._addDiv.blur();
                    self._addButton.blur();
                }
                e.stopPropagation();
            });

            self._addDiv.on("focusout", function() {
                $(this).addClass("hidden");
                $(this).removeClass("popUpMenu");
                self._addButton.blur();
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
    get _pickerButton()      { return $("#" + this._pickerButtonID); }
    get _pickerDiv()         { return $("#" + this._pickerDivID); }
    get _pickerSearch()      { return $("#" + this._pickerSearchID); }
    get _pickerSearchInput() { return $("#" + this._pickerInputID); }
    get _pickerScrollDiv()   { return $("#" + this._pickerScrollDivID); }
    get _renameButton()      { return $("#" + this._renameButtonID); }
    get _renameDiv()         { return $("#" + this._renameDivID); }
    get _renameInput()       { return $("#" + this._renameInputID); }
    get _addButton()         { return $("#" + this._addButtonID); }
    get _addDiv()            { return $("#" + this._addDivID); }
    get _addInput()          { return $("#" + this._addInputID); }
    get _numRows()           { return this._pickerScrollDiv.find(".row").length; }
    _row(i)                  { return this._pickerScrollDiv.find(".row").eq(i); }
    _button(i)               { return this._pickerScrollDiv.find(".button").eq(i); }
    
    build(element) {
        const plusIcon = this._plusIcon;
        const pencilIcon = this._pencilIcon;
        const searchIcon = this._searchIcon;

        const pickerButton = "<button id = '" + this._pickerButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'></button>";
        const pickerDiv = "<div id = '" + this._pickerDivID + "' class = 'hidden'></div>";
        const pickerSearchInput = "<input id = '" + this._pickerSearchInputID + "' placeholder = 'search'> " + searchIcon;
        const pickerScrollDiv = "<div id = '" + this._pickerScrollDivID + "'></div>";

        const renameButton = "<button id = '" + this._renameButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + pencilIcon + "</button>";
        const renameDiv = "<div id = '" + this._renameDivID + "' class = 'hidden'></div>";
        const renameInput = "<input id = '" + this._renameInputID + "' placeholder = 'rename the selected issue' size = '50'>";

        const addButton = "<button id = '" + this._addButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + plusIcon + "</button>";
        const addDiv = "<div id = '" + this._addDivID + "' class = 'hidden'></div>";
        const addInput = "<input id = '" + this._addInputID + "' placeholder = 'add a new issue'>";

        element.append(pickerButton + pickerDiv);
        this._pickerDiv.append(pickerSearchInput + pickerScrollDiv);
        this._pickerScrollDiv.css("height", "125px");
        element.append(renameButton + renameDiv);
        this._renameDiv.append(renameInput);
        element.append(addButton + addDiv);
        this._addDiv.append(addInput);
    }

    manage() {
        const self = this;
        const issues = this.data.issues();
        const numIssues = issues.length;
        const selectedIssue = this.sessions.issueName;
        var code, pickerButtonText;
        this._pickerScrollDiv.empty();
        if (numIssues) {
            pickerButtonText = selectedIssue;
            if (numIssues > 1) { pickerButtonText += " " + this._caretDownIcon; }
            this._pickerButton.html(pickerButtonText);
            code = "<div style = 'display: grid'>";
            issues.forEach(function(entry) {
                code += "<div class = 'row'><button type='button' class='btn ";
                if (entry == selectedIssue) { code += "btn-info"; }
                else { code += "btn-outline-info"; }
                code += " btn-sm'>" + entry + "</button></div>";
            });
            code += "</div>";
            this._pickerScrollDiv.append(code);
        }

        this._pickerScrollDiv.find("button").on("click", function() {
            console.log(self._pickerScrollDivID + " button click " + $(this).text());
            self.sessions.loadMostRecentSessionForIssue($(this).text());
            self._pickerDiv.addClass("hidden");
            self._pickerDiv.removeClass("popUpMenu");
            self._pickerDiv.blur();
            self._pickerButton.blur();
            self.utilities.manage();
        });

        if (numIssues == 1 && selectedIssue == "Unspecified") { this._addButton.attr("disabled", true); }
        else                                                  { this._addButton.attr("disabled", false); }

    }
}