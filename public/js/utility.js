class Utility {
    _utilityID = null;
    _app = null;
    _parent = null;
    _type = null;
    _naming = null;

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

    constructor (utilities, parent, type, naming = true) {
        const self = this;
        this._utilities = utilities;
        this._parent = parent;
        this._type = type;
        this._naming = naming;

        this._init();
        this._build();
        this._manage();

        $(document).ready(function() {
            self.pickerButton.on("click", function(e) {
                self.utilities.closeAllUtilityMenus(self._pickerButtonID);
                if (self.entries > 1) {
                    if (self.pickerDiv.hasClass("hidden")) {
                        if (self.entries > 1) {
                            $(this).html(self.current.name + " " + self._caretUpIcon);
                        }
                        if (self.entries == 1) {
                            $(this).html(self.current.name);
                        }
                        self.pickerDiv.removeClass("hidden");
                        self.pickerDiv.css("left", String(self.pickerButton.position().left) + "px");
                        self.pickerDiv.css("top", String(self.pickerButton.position().top + self.pickerButton.outerHeight()) + "px");
                        self.pickerDiv.addClass("popUpMenu");
                        self.pickerSearchInput.focus();
                        }
                    else {
                        self.pickerButton.html(self.current.name + " " + self._caretDownIcon);
                        self.closeMenus();
                    }
                }
                e.stopPropagation();
            });

            self.pickerSearchInput.on("click", function(e) {
                e.stopPropagation();
            });

            self.pickerSearchInput.on("keypress", function(e) {
                e.stopPropagation();
            });

            self.pickerSearchInput.on("keyup", function(e) {
                for (var i = 0; i < self.entries; i++) {
                    if (!self.button(i).text().includes($(this).val())) {
                        self.row(i).addClass("hidden");
                    }
                    else if (self.row(i).hasClass("hidden")) {
                        self.row(i).removeClass("hidden");
                    }
                }
                e.stopPropagation();
            });

            self.pickerScrollDiv.on("click", function(e) {
                e.stopPropagation();
            });

            self.pickerDiv.on("click", function(e) {
                e.stopPropagation();
            });

//            self.pickerDiv.on("focusout", function() {
//                console.log(self.pickerDivID + " focusout");
//                if (self.entries > 1) { self.pickerButton.html(self.current.name + " " + self._caretDownIcon); }
//                else { self.pickerButton.html(self.current.name); }
//                self.pickerButton.blur();
//            });

            if (self._naming) {
                self.renameButton.on("click", function(e) {
                    self.utilities.closeAllUtilityMenus(self._renameButtonID);
                    if (self.renameDiv.hasClass("hidden")) {
                        self.renameDiv.removeClass("hidden");
                        self.renameDiv.css("left", String(self.renameButton.position().left) + "px");
                        self.renameDiv.css("top", String(self.renameButton.position().top + self.renameButton.outerHeight()) + "px");
                        self.renameDiv.addClass("popUpMenu");
                        self.renameInput.val(self.current.name);
                        self.renameInput.focus();
                    }
                    else {
                        self.closeMenus();
                    }
                    e.stopPropagation();
                });

                self.renameInput.on("keypress", function(e) {
                    if (e.key == "Enter") {
                        self.renameDiv.addClass("hidden");
                        self.renameDiv.removeClass("popUpMenu");
                        self.parent.name = this.value;
                        self._manage();
                        self.closeMenus();
//                        self.renameDiv.blur();
//                        self.renameButton.blur();
                    }
                    e.stopPropagation();
                });

//                self.renameDiv.on("focusout", function() {
//                    self.closeMenus();
//                });

                self.addButton.on("click", function(e) {
                    self.utilities.closeAllUtilityMenus(self._addButtonID);
                    if (self.addDiv.hasClass("hidden")) {
                        self.addDiv.removeClass("hidden");
                        self.addDiv.css("left", String(self.addButton.position().left) + "px");
                        self.addDiv.css("top", String(self.addButton.position().top + self.addButton.outerHeight()) + "px");
                        self.addDiv.addClass("popUpMenu");
                        self.addInput.focus();
                    }
                    else {
                        self.utilities.closeAllUtilityMenus();
                    }
                    e.stopPropagation();
                });

                self.addInput.on("keypress", function(e) {
                    if (e.key == "Enter") {
                        self.parent.new(this.value);
                        self._manage();
                        self.closeMenus();
                    }
                    e.stopPropagation();
                });

//                self.addDiv.on("focusout", function() {
//                    self.closeMenus();
//                });
            }
            else {
                self.addButton.on("click", function(e) {
                    self.parent.new();
                    self._manage();
                    self.utilities.closeAllUtilityMenus();
                    e.stopPropagation();
                });
            }
        }); 
    }

    get span()              { return $("#" + this._spanID); }
    get utilities()         { return this._utilities; }
    get app()               { return this.utilities.app; }
    get parent()            { return this._parent(); }
    get current()           { return this.parent.current; }
    get editor()            { return this.app.editor; }
    get entries()           { return this.parent.entries; }
    get pickerButton()      { return $("#" + this._pickerButtonID); }
    get pickerDiv()         { return $("#" + this._pickerDivID); }
    get pickerSearch()      { return $("#" + this._pickerSearchID); }
    get pickerSearchInput() { return $("#" + this._pickerSearchInputID); }
    get pickerScrollDiv()   { return $("#" + this._pickerScrollDivID); }
    get renameButton()      { return $("#" + this._renameButtonID); }
    get renameDiv()         { return $("#" + this._renameDivID); }
    get renameInput()       { return $("#" + this._renameInputID); }
    get addButton()         { return $("#" + this._addButtonID); }
    get addDiv()            { return $("#" + this._addDivID); }
    get addInput()          { return $("#" + this._addInputID); }
    row(i)                  { return this.pickerScrollDiv.find(".row").eq(i); }
    button(i)               { return this.pickerScrollDiv.find("button").eq(i); }

    _init() {
        this._spanID = this._type + "Utility";
        this._pickerButtonID = this._type + "PickerButton";
        this._pickerDivID = this._type + "PickerDiv";
        this._pickerSearchID = this._type + "PickerSearch";
        this._pickerSearchInputID = this._type + "PickerSearchInput";
        this._pickerScrollDivID = this._type + "PickerScrollDiv";
        this._renameButtonID = this._type + "RenameButton";
        this._renameDivID = this._type + "RenameDiv";
        this._renameInputID = this._type + "RenameInput";
        this._addButtonID = this._type + "AddButton";
        this._addDivID = this._type + "AddDiv";
        this._addInputID = this._type + "AddInput";    
    }

    _build() {
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

        this.span.append(pickerButton + pickerDiv);
        this.pickerDiv.append(pickerSearchInput + pickerScrollDiv);

        if (this._naming) {
            this.span.append(renameButton + renameDiv);
            this.renameDiv.append(renameInput);
        }

        this.span.append(addButton + addDiv);
        this.addDiv.append(addInput);
    }

    _manage() {
        const self = this;
        var code, pickerButtonText, scrollDivHeight;
        this.pickerScrollDiv.empty();
//        console.log("Parent:", this.parent);
//        console.log("Current:", this.current);
//        console.log("Current name:", this.current.name);
        pickerButtonText = this.current.name;
        if (this.entries > 1) { pickerButtonText += " " + this._caretDownIcon; }
        this.pickerButton.html(pickerButtonText);
        if (this.entries > 1) {
            code = "<div style = 'display: grid'>";
            this.parent.sortByName.forEach(function(entry) {
                code += "<div class = 'row'><button type='button' class='btn ";
                if (entry.name == self.current.name) { code += "btn-info"; }
                else { code += "btn-outline-info"; }
                code += " btn-sm' value = '" + entry.name + "'>" + entry.name + "</button></div>";
            });
            code += "</div>";
            this.pickerScrollDiv.append(code);

            this.pickerScrollDiv.find("button").on("click", function(e) {
                self.parent.findByName(this.value).setAsCurrent();
                self.closeMenus();
                self._manage();
                e.stopPropagation();
            });

            scrollDivHeight = this.entries * parseInt(this.row(0).outerHeight);
            if (this.pickerScrollDiv.position().top + scrollDivHeight > window.innerHeight) {
                scrollDivHeight = window.innerHeight - this.pickerScrollDiv.position().top;
            }
            this.pickerScrollDiv.css("height", String(scrollDivHeight) + "px");
            this.pickerDiv.css("height", String(parseInt(this.pickerSearchInput.outerHeight) + parseInt(this.pickerScrollDiv.outerHeight) + 10) + "px");

            if (this.entries == 1 && this.current.name == "Unspecified") { this.addButton.attr("disabled", true); }
            else                                                    { this.addButton.attr("disabled", false); }
        }

    }

    closeMenus(except) {
        if (except != this._pickerButtonID)   {
            this.pickerDiv.addClass("hidden");
            this.pickerDiv.removeClass("popUpMenu");
            this.pickerDiv.blur();
            this.pickerButton.blur();
        }
        if (except != this._renameButtonID)   { 
            this.renameDiv.addClass("hidden");
            this.renameDiv.removeClass("popUpMenu");
            this.renameDiv.blur();
            this.renameButton.blur();
        }
        if (except != this._addButtonID)      { 
            this.addDiv.addClass("hidden");
            this.addDiv.removeClass("popUpMenu");
            this.addDiv.blur();
            this.addButton.blur();
        }
    }
}