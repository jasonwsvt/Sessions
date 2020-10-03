/* utilities class links to session class and dataManager classes
*/

class IssueUtilities {
    _utilities = null;

    _loginButtonID = "loginButton";
    _issuePickerButtonID = "issuePickerButton";
    _issuePickerDivID = "issuePickerDiv";
    _issuePickerSearchID = "issuePickerSearch";
    _issuePickerInputID = "issuePickerInput";
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
            $("#" + self._issuePickerButtonID).on("click", function() {
                const caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
                const caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";
                const pickerDiv = $("#" + self._issuePickerDivID);
                const scrollDiv = $("#" + self._issuePickerScrollDivID);
                const button = $("#" + self._issuePickerButtonID);
                const input = $("#" + self._issuePickerInputID);
                const rows = scrollDiv.find(".row");
                console.log(self._issuePickerButtonID + " click (buttons: " + rows.length + ")");
                if (rows.length > 1) {
                    if (pickerDiv.hasClass("hidden")) {
                        button.html(self.sessions.issueName + " " + caretUpIcon);
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

            $("#" + self._issuePickerInputID).on("keypress", function(e) {
                e.stopPropagation();
            });

            $("#" + self._issuePickerInputID).on("keyup", function(e) {
                //hide issuePickerScrollDiv buttons that don't match search
                const scrollDiv = $("#" + self._issuePickerScrollDivID);
                const rows = scrollDiv.find(".row");
                var i;
                for (i = 0; i < rows.length; i++) {
                    var button = rows.eq(i).find("button");
                    if (!button.text().includes($(this).val())) {
                        button.parent().addClass("hidden");
                    }
                    else {
                        if (button.parent().hasClass("hidden")) {
                            button.parent().removeClass("hidden");
                        }
                    }
                }
                e.stopPropagation();
            });

            $("#" + self._issuePickerScrollDivID + " button").on("click", function() {
                const pickerDiv = $("#" + self._issuePickerDivID);
                const button = $("#" + self._issuePickerButtonID);
                console.log(self._issuePickerScrollDivID + " button click");
                self.sessions.loadMostRecentSessionForIssue(this.value);
                pickerDiv.addClass("hidden");
                pickerDiv.removeClass("popUpMenu");
                pickerDiv.blur();
                button.blur();
            });

            $("#" + self._issuePickerDivID).on("focusout", function() {
                const caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
                const button = $("#" + self._issuePickerButtonID);
                console.log(self._issuePickerDivID + " focusout");
                button.html(self.sessions.issueName + " " + caretDownIcon);
                $(this).addClass("hidden");
                $(this).removeClass("popUpMenu");
                button.blur();
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
                    div.blur();
                    button.blur();
                }
            });

            $("#" + self._issueRenameInputID).on("keypress", function(e) {
                const div = $("#" + self._issueRenameDivID);
                const button = $("#" + self._issueRenameButtonID);
                if (e.key == "Enter") {
                    div.addClass("hidden");
                    div.removeClass("popUpMenu");
                    self.sessions.renameIssue(this.value);
                    self._manageIssueUtilities();
                    div.blur();
                    button.blur();
                }
                e.stopPropagation();
            });

            $("#" + self._issueRenameDivID).on("focusout", function() {
                const button = $("#" + self._issueRenameButtonID);
                $(this).addClass("hidden");
                $(this).removeClass("popUpMenu");
                button.blur();
            });

            $("#" + self._issueAddButtonID).on("click", function() {
                const div = $("#" + self._issueAddDivID)
                const button = $("#" + self._issueAddButtonID);
                const input = $("#" + self._issueAddInputID);
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

            $("#" + self._issueAddInputID).on("keypress", function(e) {
                const div = $("#" + self._issueAddDivID);
                const button = $("#" + self._issueAddButtonID);
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

            $("#" + self._issueAddDivID).on("focusout", function() {
                const button = $("#" + self._issueAddButtonID);
                $(this).addClass("hidden");
                $(this).removeClass("popUpMenu");
                button.blur();
            });
        });
    }

    get utilities() { return this._utilities; }
    get div()       { return this.utilities.div; }
    get lines()     { return this.utilities.lines; }
    get sessions()  { return this.utilities.sessions; }
    get data()      { return this.utilities.data; }
    get buttons()   { return this.utilities.buttons; }
    
    build(element) {
        const plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
        const pencilIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-pencil-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg>";
        const searchIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-search' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'/><path fill-rule='evenodd' d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'/></svg>";

        const issuePickerButton = "<button id = '" + this._issuePickerButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'></button>";
        const issuePickerDiv = "<div id = '" + this._issuePickerDivID + "' class = 'hidden'></div>";
        const issuePickerSearchInput = "<input id = '" + this._issuePickerInputID + "' placeholder = 'search'> " + searchIcon;
        const issuePickerScrollDiv = "<div id = '" + this._issuePickerScrollDivID + "'></div>";

        const issueRenameButton = "<button id = '" + this._issueRenameButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + pencilIcon + "</button>";
        const issueRenameDiv = "<div id = '" + this._issueRenameDivID + "' class = 'hidden'></div>";
        const issueRenameInput = "<input id = '" + this._issueRenameInputID + "' placeholder = 'rename the selected issue' size = '50'>";

        const issueAddButton = "<button id = '" + this._issueAddButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + plusIcon + "</button>";
        const issueAddDiv = "<div id = '" + this._issueAddDivID + "' class = 'hidden'></div>";
        const issueAddInput = "<input id = '" + this._issueAddInputID + "' placeholder = 'add a new issue'>";

        element.append(issuePickerButton + issuePickerDiv);
        $("#" + this._issuePickerDivID).append(issuePickerSearchInput + issuePickerScrollDiv);
        element.append(issueRenameButton + issueRenameDiv);
        $("#" + this._issueRenameDivID).append(issueRenameInput);
        element.append(issueAddButton + issueAddDiv);
        $("#" + this._issueAddDivID).append(issueAddInput);
    }

    manage() {
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
            code = "<div style = 'display: grid'>";
            issues.forEach(function(entry) {
                code += "<div class = 'row'><button type='button' class='btn ";
                if (entry == selectedIssue) { code += "btn-info"; }
                else { code += "btn-outline-info"; }
                code += " btn-sm'>" + entry + "</button></div>";
            });
            code += "</div>";
            div.append(code);
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
}