/* utilities class links to sessions class
*/

class Utilities {
    _utilityID = null;
    _app = null;

    _dotIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-dot my-2' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'/></svg>";
    _caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
    _caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";
    _plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
    _pencilIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-pencil-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg>";
    _searchIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-search' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'/><path fill-rule='evenodd' d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'/></svg>";

    _pickerButtonID = null;
    _pickerDivID = null;
    _pickerSearchID = null;
    _pickerSearchInputID = null;
    _pickerScrollDivID = null;
    _renameButtonID = null;
    _renameDivID = null;
    _renameInputID = null;
    _addButtonID = null;
    _addDivID = null;
    _addInputID = null;

    constructor (app, parent, type) {
        const self = this;
        this._app = app;
        this._type = type;
        this._parent = parent;

        this._init();
        this.build();
        this.manage();

        $(document).ready(function() {
            $("html").on("click", function(e) {
                self.closeMenus();
            });

            self._pickerButton.on("click", function(e) {
                self.closeMenus(self._pickerButtonID);
                if (self._numrows > 1) {
                    if (self._pickerDiv.hasClass("hidden")) {
                        if (self.numIssues > 1) {
                            $(this).html(self.currentIssue + " " + self._caretUpIcon);
                        }
                        if (self.numIssues == 1) {
                            $(this).html(self.currentIssue);
                        }
                        self._pickerDiv.removeClass("hidden");
                        self._pickerDiv.css("left", String(self._pickerButton.position().left) + "px");
                        self._pickerDiv.css("top", String(self._pickerButton.position().top + self._pickerButton.outerHeight()) + "px");
                        self._pickerDiv.addClass("popUpMenu");
                        self._pickerSearchInput.focus();
                        }
                    else {
                        self._pickerButton.html(self.currentIssue + " " + self._caretDownIcon);
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
                for (var i = 0; i < self._numrows; i++) {
//                    console.log($(this).val(), self._issueButton(i), "'" + self._issueButton(i).text() + "'");
                    if (!self._issueButton(i).text().includes($(this).val())) {
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
//                console.log(self._pickerDivID + " focusout");
                if (self.numIssues > 1) { self._pickerButton.html(self.currentIssue + " " + self._caretDownIcon); }
                else { self._pickerButton.html(self.currentIssue); }
                self._pickerButton.blur();
            });

            self._renameButton.on("click", function(e) {
                self.closeMenus(self._renameButtonID);
                if (self._renameDiv.hasClass("hidden")) {
                    self._renameDiv.removeClass("hidden");
                    self._renameDiv.css("left", String(self._renameButton.position().left) + "px");
                    self._renameDiv.css("top", String(self._renameButton.position().top + self._renameButton.outerHeight()) + "px");
                    self._renameDiv.addClass("popUpMenu");
                    self._renameInput.val(self.currentIssue);
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
                    self.sessions.renameIssue(self.currentIssue, this.value);
                    self.manageIssueUtilities();
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
                self.closeMenus(self._addButtonID);
                if (self._addDiv.hasClass("hidden")) {
                    self._addDiv.removeClass("hidden");
                    self._addDiv.css("left", String(self._addButton.position().left) + "px");
                    self._addDiv.css("top", String(self._addButton.position().top + self._addButton.outerHeight()) + "px");
                    self._addDiv.addClass("popUpMenu");
                    self._addInput.focus();
                }
                else {
                    self.closeMenus();
                }
                e.stopPropagation();
            });

            self._addInput.on("keypress", function(e) {
                if (e.key == "Enter") {
                    self._addDiv.addClass("hidden");
                    self._addDiv.removeClass("popUpMenu");
                    self.sessions.newSession(this.value);
                    self.manage();
                    self.closeMenus();
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

    get span()                    { return $("#" + this._utilityID); }
    get parent()                  { return this._parent; }
    get app()                     { return this._app; }
    get lines()                   { return this.app.editor.lines; }
    get length()                  { return this.parent.length; }
    get current()                 { return this.parent.current; }
    get _pickerButton()      { return $("#" + this._pickerButtonID); }
    get _pickerDiv()         { return $("#" + this._pickerDivID); }
    get _pickerSearch()      { return $("#" + this._pickerSearchID); }
    get _pickerSearchInput() { return $("#" + this._pickerSearchInputID); }
    get _pickerScrollDiv()   { return $("#" + this._pickerScrollDivID); }
    get _renameButton()      { return $("#" + this._renameButtonID); }
    get _renameDiv()         { return $("#" + this._renameDivID); }
    get _renameInput()       { return $("#" + this._renameInputID); }
    get _addButton()         { return $("#" + this._addButtonID); }
    get _addDiv()            { return $("#" + this._addDivID); }
    get _addInput()          { return $("#" + this._addInputID); }
    _row(i)                  { return this._pickerScrollDiv.find(".row").eq(i); }
    _issueButton(i)               { return this._pickerScrollDiv.find("button").eq(i); }

    init() {
        this._pickerButtonID = this._type + "pickerButton";
        this._pickerDivID = this._type + "pickerDiv";
        this._pickerSearchID = this._type + "pickerSearch";
        this._pickerSearchInputID = this._type + "pickerSearchInput";
        this._pickerScrollDivID = this._type + "pickerScrollDiv";
        this. _renameButtonID = this._type + "renameButton";
        this._renameDivID = this._type + "renameDiv";
        this._renameInputID = this._type + "renameInput";
        this._addButtonID = this._type + "addButton";
        this._addDivID = this._type + "addDiv";
        this._addInputID = this._type + "addInput";    
    }

    build() {
        const plusIcon = this._plusIcon;
        const pencilIcon = this._pencilIcon;
        const searchIcon = this._searchIcon;
        const type = this._type;

        const pickerButton = "<button id = '" + this._pickerButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'></button>";
        const pickerDiv = "<div id = '" + this._pickerDivID + "' class = 'hidden'></div>";
        const pickerSearchInput = "<input id = '" + this._pickerSearchInputID + "' placeholder = 'search'> " + searchIcon;
        const pickerScrollDiv = "<div id = '" + this._pickerScrollDivID + "'></div>";

        const renameButton = "<button id = '" + this._renameButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + pencilIcon + "</button>";
        const renameDiv = "<div id = '" + this._renameDivID + "' class = 'hidden'></div>";
        const renameInput = "<input id = '" + this._renameInputID + "' placeholder = 'rename the selected " + type + "' size = '50'>";

        const addButton = "<button id = '" + this._addButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + plusIcon + "</button>";
        const addDiv = "<div id = '" + this._addDivID + "' class = 'hidden'></div>";
        const addInput = "<input id = '" + this._addInputID + "' placeholder = 'add a new " + type + "'>";

        span.append(pickerButton + pickerDiv);
        this._pickerDiv.append(pickerSearchInput + pickerScrollDiv);
        span.append(renameButton + renameDiv);
        this._renameDiv.append(renameInput);
        span.append(addButton + addDiv);
        this._addDiv.append(addInput);
    }

    manage() {
        const self = this;
        var code, pickerButtonText, scrollDivHeight;
        this._pickerScrollDiv.empty();
        pickerButtonText = this.current;
        if (this.length > 1) { pickerButtonText += " " + this._caretDownIcon; }
        this._pickerButton.html(pickerButtonText);
        if (this.length > 1) {
            code = "<div style = 'display: grid'>";
            this.parent.sortByName().forEach(function(entry) {
                code += "<div class = 'row'><button type='button' class='btn ";
                if (entry.name == this.current) { code += "btn-info"; }
                else { code += "btn-outline-info"; }
                code += " btn-sm' value = '" + entry.name + "'>" + entry.name + "</button></div>";
            });
            code += "</div>";
            this._pickerScrollDiv.append(code);

            this._pickerScrollDiv.find("button").on("click", function(e) {
                self.parent.findByName(this.value).load();
                self.closeMenus();
                self.manage();
                e.stopPropagation();
            });

            scrollDivHeight = parseInt(numIssues) * parseInt(this._row(0).outerHeight);
            if (this._pickerScrollDiv.position().top + scrollDivHeight > window.innerHeight) {
                scrollDivHeight = window.innerHeight - this._pickerScrollDiv.position().top;
            }
            this._pickerScrollDiv.css("height", String(scrollDivHeight) + "px");
            this._pickerDiv.css("height", String(parseInt(this._pickerSearchInput.outerHeight) + parseInt(this._pickerScrollDiv.outerHeight) + 10) + "px");

            if (numIssues == 1 && selectedIssue == "Unspecified") { this._addButton.attr("disabled", true); }
            else                                                  { this._addButton.attr("disabled", false); }
        }

    }

    closeMenus(except) {
        if (except != this._pickerButtonID)   {
            this._pickerDiv.addClass("hidden");
            this._pickerDiv.removeClass("popUpMenu");
            this._pickerButton.focusout();
        }
        if (except != this._renameButtonID)   { 
            this._renameDiv.addClass("hidden");
            this._renameDiv.removeClass("popUpMenu");
            this._renameButton.focusout();
        }
        if (except != this._addButtonID)      { 
            this._addDiv.addClass("hidden");
            this._addDiv.removeClass("popUpMenu");
            this._addButton.focusout();
        }
    }
}