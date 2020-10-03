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
            self._pickerButton.on("click", function() {
                const caretDownIcon = self._caretDownIcon;
                const caretUpIcon = self._caretUpIcon;
                const pickerDiv = this._pickerDiv;
                const scrollDiv = this._pickerScrollDiv;
                const button = this._pickerButton;
                const rows = scrollDiv.find(".row");
                console.log(this._pickerButtonID + " click (buttons: " + rows.length + ")");
                if (rows.length > 1) {
                    if (pickerDiv.hasClass("hidden")) {
                        $(this).html(self.sessions.issueName + " " + caretUpIcon);
                        pickerDiv.removeClass("hidden");
                        pickerDiv.css("left", String(button.position().left) + "px");
                        pickerDiv.css("top", String(button.position().top + button.outerHeight()) + "px");
                        pickerDiv.addClass("popUpMenu");
                        input.focus();
                        }
                    else {
                        button.html(self.sessions.issueName + " " + caretDownIcon);
                        pickerDiv.addClass("hidden");
                        pickerDiv.removeClass("popUpMenu");
                        pickerDiv.blur();
                        button.blur();
                    }
                }
            });

            self._pickerSearchInput.on("keypress", function(e) {
                e.stopPropagation();
            });

            self._pickerSearchInput.on("keyup", function(e) {
                const numRows = this._numRows;
                for (var i = 0; i < numRows; i++) {
                    var button = this._button(i);
                    var row = this._row(i);
                    if (!button.text().includes($(this).val())) {
                        row.addClass("hidden");
                    }
                    else if (row.hasClass("hidden")) {
                        row.removeClass("hidden");
                    }
                }
                e.stopPropagation();
            });

            self._pickerScrollDiv.find("button").on("click", function() {
                const pickerDiv = self._pickerDiv;
                const button = self._pickerButton;
                console.log(self._pickerScrollDivID + " button click");
                self.sessions.loadMostRecentSessionForIssue(this.value);
                pickerDiv.addClass("hidden");
                pickerDiv.removeClass("popUpMenu");
                pickerDiv.blur();
                button.blur();
            });

            self._pickerDiv.on("focusout", function() {
                const caretDownIcon = self._caretDownIcon;
                const button = self._pickerButton;
                console.log(self._pickerDivID + " focusout");
                button.html(self.sessions.issueName + " " + caretDownIcon);
                $(this).addClass("hidden");
                $(this).removeClass("popUpMenu");
                button.blur();
            });

            self._renameButton.on("click", function() {
                const div = self._renameDiv;
                const button = self._renameButton;
                const input = self._renameInput;
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
                    div.blur();
                    button.blur();
                }
            });

            self._renameInput.on("keypress", function(e) {
                const div = self._renameDiv;
                const button = self._renameButton;
                if (e.key == "Enter") {
                    div.addClass("hidden");
                    div.removeClass("popUpMenu");
                    self.sessions.renameIssue(this.value);
                    self.manage();
                    div.blur();
                    button.blur();
                }
                e.stopPropagation();
            });

            self._renameDiv.on("focusout", function() {
                const button = self._renameButton;
                $(this).addClass("hidden");
                $(this).removeClass("popUpMenu");
                button.blur();
            });

            self._addButton.on("click", function() {
                const div = self._addDiv;
                const button = self._addButton;
                const input = self._addInput;
                if (div.hasClass("hidden")) {
                    div.removeClass("hidden");
                    div.css("left", String(button.position().left) + "px");
                    div.css("top", String(button.position().top + button.outerHeight()) + "px");
                    div.addClass("popUpMenu");
                    input.focus();
                }
                else {
                    div.addClass("hidden");
                    div.removeClass("popUpMenu");
                    div.blur();
                    button.blur();
                }
            });

            self._addInput.on("keypress", function(e) {
                const div = self._addDiv;
                const button = self._addButton;
                if (e.key == "Enter") {
                    div.addClass("hidden");
                    div.removeClass("popUpMenu");
                    self.sessions.newIssue(this.value);
                    self.update();
                    div.blur();
                    button.blur();
                }
                e.stopPropagation();
            });

            self._addDiv.on("focusout", function() {
                const button = $("#" + self._addButtonID);
                $(this).addClass("hidden");
                $(this).removeClass("popUpMenu");
                button.blur();
            });
        });
    }

    get utilities()          { return this._utilities; }
    get div()                { return this.utilities.div; }
    get lines()              { return this.utilities.lines; }
    get sessions()           { return this.utilities.sessions; }
    get data()               { return this.utilities.data; }
    get buttons()            { return this.utilities.buttons; }
    get _pickerButton()      { return $("#" + this.pickerButtonID); }
    get _pickerDiv()         { return $("#" + this.pickerDivID); }
    get _pickerSearch()      { return $("#" + this.pickerSearchID); }
    get _pickerSearchInput() { return $("#" + this.pickerInputID); }
    get _pickerScrollDiv()   { return $("#" + this.pickerScrollDivID); }
    get _renameButton()      { return $("#" + this.renameButtonID); }
    get _renameDiv()         { return $("#" + this.renameDivID); }
    get _renameInput()       { return $("#" + this.renameInputID); }
    get _addButton()         { return $("#" + this.addButtonID); }
    get _addDiv()            { return $("#" + this.addDivID); }
    get _addInput()          { return $("#" + this.addInputID); }
    get _numRows()           { return this._scrollDiv.find(".row").length; }
    _row(i)                  { return this._scrollDiv.find(".row").eq(i); }
    _button(i)               { return this._scrollDiv.find(".button").eq(i); }
    
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
        element.append(renameButton + renameDiv);
        this._renameDiv.append(renameInput);
        element.append(addButton + addDiv);
        this._addDiv.append(addInput);
    }

    manage() {
        const caretDownIcon = this._caretDownIcon;
        const pickerButton = this._pickerButton;
        const addButton = this._addButton;
        const div = this._pickerScrollDiv;
        const issues = this.data.issues();
        const numIssues = issues.length;
        const selectedIssue = this.sessions.issueName;
        var code, pickerButtonText;
        div.empty();
        console.log(pickerButton + " " + addButton + " " + div + " " + selectedIssue + " " + numIssues);
        if (numIssues) {
            pickerButtonText = selectedIssue;
            if (numIssues > 1) { pickerButtonText += " " + caretDownIcon; }
            pickerButton.html(pickerButtonText);
            console.log("pickerButtonText: " + pickerButton.html());
            code = "<div style = 'display: grid'>";
            issues.forEach(function(entry) {
                code += "<div class = 'row'><button type='button' class='btn ";
                if (entry == selectedIssue) { code += "btn-info"; }
                else { code += "btn-outline-info"; }
                code += " btn-sm'>" + entry + "</button></div>";
            });
            code += "</div>";
            console.log(code);
            div.append(code);
        }
        if (numIssues == 1 && selectedIssue == "Unspecified") { addButton.attr("disabled", true); }
        else                                                  { addButton.attr("disabled", false); }

    }
}