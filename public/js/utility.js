class Utility {
    utilities = null;
    _app = null;
    _group = null;
    _type = null;
    _naming = null;
    _sortMethod = "name";

    _caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
    _caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";
    _plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
    _pencilIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-pencil-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg>";
    _searchIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-search' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'/><path fill-rule='evenodd' d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'/></svg>";
    _downArrow = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-arrow-down' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z'/></svg>";
    _upArrow = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-arrow-up' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z'/></svg>";


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

    constructor (utilities, tier, naming = true) {
        const self = this;
        this.utilities = utilities;
        this._tier = tier;
        this._naming = naming;

        this._init();
        this._build();

        $(document).ready(function() {
            self.pickerButton.on("click", function (e) {
                self.utilities.close(self._pickerButtonID);
                if (self.numSiblings > 1) {
                    if (self.pickerDiv.hasClass("hidden")) {
                        if (self.numSiblings > 1) {
                            $(this).html(self.name + " " + self._caretUpIcon);
                        }
                        if (self.numSiblings == 1) {
                            $(this).html(self.name);
                        }
                        self.pickerDiv.removeClass("hidden");
                        this.blur();
                        self.pickerDiv.css("left", String(self.pickerButton.position().left) + "px");
                        self.pickerDiv.css("top", String($(this).position().top + 32) + "px");
                        self.pickerDiv.addClass("utilityMenu");
                        self.pickerSearchInput.focus();
                        }
                    else {
                        self.close();
                    }
                }
                e.stopPropagation();
            });

            self.pickerSearchInput.on("click", function (e) {
                e.stopPropagation();
            });

            self.pickerSearchInput.on("keypress", function (e) {
                e.stopPropagation();
            });

            self.pickerSearchInput.on("keyup", function (e) {
                for (var i = 0; i < self.numSiblings; i++) {
                    if (!self.button(i).text().includes($(this).val())) {
                        self.row(i).addClass("hidden");
                    }
                    else if (self.row(i).hasClass("hidden")) {
                        self.row(i).removeClass("hidden");
                    }
                }
                e.stopPropagation();
            });

            self.pickerScrollDiv.on("click", function (e) {
                e.stopPropagation();
            });

            self.pickerDiv.on("click", function (e) {
                e.stopPropagation();
            });

            self.pickerSort.find("button").on("click", function (e) {
                self.pickerButtons(this.value);
                e.stopPropagation();
            });
//
//            self.pickerDiv.on("focusout", function() {
//            });

            if (self._naming) {
                self.renameButton.on("click", function (e) {
                    self.utilities.close(self._renameButtonID);
                    if (self.renameDiv.hasClass("hidden")) {
                        self.renameDiv.removeClass("hidden");
                        this.blur();
                        self.renameDiv.css("left", String(self.pickerButton.position().left) + "px");
                        self.renameDiv.css("top", String($(this).position().top + 32) + "px");
                        self.renameDiv.addClass("utilityMenu");
                        self.renameInput.val(self.name);
                        self.renameInput.focus();
                    }
                    else {
                        self.close();
                    }
                    e.stopPropagation();
                });

                self.renameDiv.on("click", function (e) {
                    e.stopPropagation();
                });
    
                self.renameInput.on("keypress", function (e) {
                    if (e.key == "Enter") {
                        self.renameDiv.addClass("hidden");
                        self.renameDiv.removeClass("utilityMenu");
                        self.data.setKey(self.id, "name", this.value);
                        self.utilities.manage(self._tier);
                        self.utilities.user.requestBackup();
                        self.close();
                    }
                    e.stopPropagation();
                });

                self.renameInput.on("keyup", function (e) {
                    e.stopPropagation();
                });

                self.renameInput.on("click", function (e) {
                    e.stopPropagation();
                });

                self.addButton.on("click", function (e) {
                    self.utilities.close(self._addButtonID);
                    if (self.addDiv.hasClass("hidden")) {
                        self.addDiv.removeClass("hidden");
                        this.blur();
                        self.addDiv.css("left", String(self.pickerButton.position().left) + "px");
                        self.addDiv.css("top", String($(this).position().top + 32) + "px");
                        self.addDiv.addClass("utilityMenu");
                        self.addInput.focus();
                    }
                    else {
                        self.close();
                    }
                    e.stopPropagation();
                });

                self.addDiv.on("click", function (e) {
                    e.stopPropagation();
                });

                self.addInput.on("keypress", function (e) {
                    e.stopPropagation();
                    var id;
                    if (e.key == "Enter") {
                        if (self.data.find("name", this.value)) { console.log(this.value, self.data.find("name", this.value)); return; }
                        if (self._tier == 1) {
                            id = self.data.addChild(self.data.addChild(self.data.addSibling(self.id, { name: this.value }), { name: "New Issue" }));
                        }
                        if (self._tier == 2) {
                            id = self.data.addChild(self.data.addSibling(self.id, { name: this.value }));
                        }
                        if (self._tier == 3) {
                            id = self.data.addSibling(self.id);
                        }
                        this.value = "";
                        //console.log(self.id, id, self.data.exportPrettyJSON());
                        self.editor.load(id);
                        self.utilities.manage(self._tier);
                        self.close();
                        this.blur();
                        self.utilities.user.requestBackup();
                    }
                    e.stopPropagation();
                });

                self.addInput.on("keyup", function (e) {
                    e.stopPropagation();
                });
            }
            else {
                self.addButton.on("click", function (e) {
                    self.editor.load(self.data.addSibling(self.id));
                    //console.log(self.data.exportPrettyJSON())
                    //console.log(self._tier);
                    self.utilities.manage(self._tier);
                    self.close();
                    this.blur();
                    self.utilities.user.requestBackup();
                    e.stopPropagation();
                });
            }
        }); 
    }

    get app()               { return this.utilities.app; }
    get data()              { return this.app.data; }
    get editor()            { return this.app.editor; }
    get sessionId()         { return this.app.editor.current; }
    get siblings()          { return this.data.siblings(this.id); }
    get numSiblings()       { return this.data.numSiblings(this.id); }
    get type()              { return this._tier == 1 ? "client" : this._tier == 2 ? "issue" : "session"; }
    get default()           { return this._tier == 1 ? "New Client" : "New Issue"; }
    get id()                { return this.data.idPath(this.sessionId)[this._tier]; }
    get name()              { return this._naming ? this.data.value(this.id, "name") : this.parseDate(this.creation); }
    get creation()          { return this.data.value(this.id, "creation"); }
    get lastEdited()        { return this.data.value(this.id, "lastEdited"); }
    get lastOpened()        { return this.data.value(this.id, "lastOpened"); }

    get div()               { return $("#" + this._divID); }
    get pickerButton()      { return $("#" + this._pickerButtonID); }
    get pickerDiv()         { return $("#" + this._pickerDivID); }
    get pickerSearch()      { return $("#" + this._pickerSearchID); }
    get pickerSearchInput() { return $("#" + this._pickerSearchInputID); }
    get pickerScrollDiv()   { return $("#" + this._pickerScrollDivID); }
    get pickerSort()        { return $("#" + this._pickerSortID); }
    get renameButton()      { return $("#" + this._renameButtonID); }
    get renameDiv()         { return $("#" + this._renameDivID); }
    get renameInput()       { return $("#" + this._renameInputID); }
    get addButton()         { return $("#" + this._addButtonID); }
    get addDiv()            { return $("#" + this._addDivID); }
    get addInput()          { return $("#" + this._addInputID); }
    row(i)                  { return this.pickerScrollDiv.find(".row").eq(i); }
    button(i)               { return this.pickerScrollDiv.find("button").eq(i); }

    _init() {
        const type = this.type;

        this._divID = type + "Utility";
        this._pickerButtonID = type + "PickerButton";
        this._pickerDivID = type + "PickerDiv";
        this._pickerSearchID = type + "PickerSearch";
        this._pickerSearchInputID = type + "PickerSearchInput";
        this._pickerScrollDivID = type + "PickerScrollDiv";
        this._pickerSortID = type + "PickerSort";
        this._renameButtonID = type + "RenameButton";
        this._renameDivID = type + "RenameDiv";
        this._renameInputID = type + "RenameInput";
        this._addButtonID = type + "AddButton";
        this._addDivID = type + "AddDiv";
        this._addInputID = type + "AddInput";
    }

    _build() {
        const plusIcon = this._plusIcon;
        const pencilIcon = this._pencilIcon;
        const searchIcon = this._searchIcon;
        const type = this.type;

        const pickerButton = "<button id = '" + this._pickerButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'></button>";
        const pickerDiv = "<div id = '" + this._pickerDivID + "' class = 'hidden'></div>";
        const pickerSearchInput = "<input id = '" + this._pickerSearchInputID + "' placeholder = 'search'>";
        const pickerScrollDiv = "<div id = '" + this._pickerScrollDivID + "'></div>";
        const pickerSort = "<div id = '" + this._pickerSortID + "' class='btn-group btn-group-sm' role='group'></div>";
        const pickerSort1 = "<button type = 'button' class = 'btn btn-secondary' value = 'name'>A-Z</button>";
        const pickerSort2 = "<button type = 'button' class = 'btn btn-secondary' value = 'creation'>Creation</button>";
        const pickerSort3 = "<button type = 'button' class = 'btn btn-secondary' value = 'edited'>Edited</button>";
        const pickerSort4 = "<button type = 'button' class = 'btn btn-secondary' value = 'opened'>Opened</button>";

        const renameButton = "<button id = '" + this._renameButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + pencilIcon + "</button>";
        const renameDiv = "<div id = '" + this._renameDivID + "' class = 'hidden'></div>";
        const renameInput = "<input id = '" + this._renameInputID + "' placeholder = 'rename the selected " + type + "' size = '50'>";

        const addButton = "<button id = '" + this._addButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + plusIcon + "</button>";
        const addDiv = "<div id = '" + this._addDivID + "' class = 'hidden'></div>";
        const addInput = "<input id = '" + this._addInputID + "' placeholder = 'add a new " + type + "'>";

        this.div.addClass("btn-group");
        this.div.attr("role", "group");
        this.div.append(pickerButton + pickerDiv);
        this.pickerDiv.append(pickerSearchInput + pickerSort + pickerScrollDiv);
        this.pickerSort.append(pickerSort1 + pickerSort2 + pickerSort3 + pickerSort4);

        if (this._naming) {
            this.div.append(renameButton + renameDiv);
            this.renameDiv.append(renameInput);
        }

        this.div.append(addButton + addDiv);
        this.addDiv.append(addInput);
    }

    manage() {
        const self = this;
        var pickerButtonText, scrollDivHeight;
        //this.pickerScrollDiv.empty();
        //console.log("Group:", this.group);
        //console.log("Current:", this.sessionId);
        //console.log("Current tier:", this._tier);
        //console.log(this.data.idPath(this.sessionId)[this._tier]);
        //console.log(this.data.has(this.id))
        pickerButtonText = this.name;
        if (this.numSiblings > 1) { pickerButtonText += " " + this._caretDownIcon; }
        this.pickerButton.html(pickerButtonText);
        //console.log(this.pickerButton.html(), this.name, pickerButtonText);

        if (this.numSiblings > 1) {
            this.pickerButtons();

            this.pickerScrollDiv.find("button").on("click", function (e) {
                var id = parseInt(this.value);
                if (self.data.tier(id) != 3) {
                    const tier3Ids = self.data.tierIds(3);
                    const descendants = self.data.descendants(id);
                    var tier3Descendants = descendants.filter(d => tier3Ids.includes(d));
                    const lastOpened = self.data.sortByLastOpened(tier3Descendants).slice(-1)[0];
                    const lastEdited = self.data.sortByLastEdited(tier3Descendants).slice(-1)[0];
                    const creation   = self.data.sortByCreation(tier3Descendants).slice(-1)[0];
                    id = lastEdited ? lastEdited : lastOpened ? lastOpened : creation;
                    //if (id == undefined) {
                    //    console.log(self.data.exportPrettyJSON());
                    //    console.log("this.value:", this.value);
                    //    console.log("tier3Ids:", tier3Ids);
                    //    console.log("descendants:", descendants);
                    //    console.log("tier3Descendants:", tier3Descendants);
                    //    console.log("lastOpened:", lastOpened);
                    //    console.log("lastEdited:", lastEdited);
                    //    console.log("creation:", creation);
                    //    console.log("id:", id);
                    //}
                }
                self.editor.load(id);
                //console.log(self.sessionId, self.current);
                self.close();
                self.utilities.manage(self._tier);
                e.stopPropagation();
            });

            scrollDivHeight = this.numSiblings * parseInt(this.row(0).outerHeight);
            if (this.pickerScrollDiv.position().top + scrollDivHeight > window.innerHeight) {
                scrollDivHeight = window.innerHeight - this.pickerScrollDiv.position().top;
            }
            this.pickerScrollDiv.css("height", String(scrollDivHeight) + "px");
            this.pickerDiv.css("height", String(parseInt(this.pickerSearchInput.outerHeight) + parseInt(this.pickerScrollDiv.outerHeight) + 10) + "px");
        }
        this.addButton.attr("disabled", (this._naming && !!this.data.find("name", this.default, this.siblings)));
    }

    pickerButtons(method) {
        var ids = this.siblings;
        const upArrow = this._upArrow;
        const downArrow = this._downArrow;

        if (method) {
            this._sortMethod = (this._sortMethod == method) ? method + "_reverse" : method;
        }

        ["name", "creation", "edited", "opened"].forEach((value, index) => {
            var sort = "", label = value.charAt(0).toUpperCase() + value.slice(1);
            if (this._sortMethod == value)              { sort = downArrow + " "; }
            if (this._sortMethod == value + "_reverse") { sort = upArrow + " "; }
            this.pickerSort.find("button").eq(index).html(sort + label);
        });
        switch (this._sortMethod.includes("_") ? this._sortMethod.split("_")[0] : this._sortMethod) {
            case "name":     ids = (!this._naming) ? this.data.sort((a, b) => this.parseDate(a.creation) < this.parseDate(b.creation), ids)
                                 : this.data.sortAlnumByKey("name", ids); break;
            case "creation": ids = this.data.sortByCreation(ids);         break;
            case "edited":   ids = this.data.sortByLastEdited(ids);       break;
            case "opened":   ids = this.data.sortByLastOpened(ids);       break;
        }
        if (this._sortMethod.endsWith("_reverse")) { ids = ids.reverse(); }

        var code = "<div style = 'display: grid'>";
        ids.forEach(id => {
            const name = this._naming ? this.data.value(id, "name") : this.parseDate(this.data.value(id, "creation"));
            code += "<div class = 'row'><button type='button' class='btn btn-block ";
            if (id == this.id) { code += "btn-info"; }
            else { code += "btn-outline-info"; }
            code += " btn-sm' value = '" + id + "'>" + name + "</button></div>";
        });
        code += "</div>";

        this.pickerScrollDiv.html(code);
    }

    parseDate(ts) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const d = new Date(ts * 1000);
        const year   = String(d.getFullYear());
        const month  = String(d.getMonth()+1).padStart(2, '0');
        const day    = String(d.getDate()).padStart(2, '0');
        const hour   = String((d.getHours() > 12) ? d.getHours() - 12 : d.getHours()).padStart(2, '0');
        const minute = String(d.getMinutes()).padStart(2, '0');
        const second = String(d.getSeconds()).padStart(2, '0');
        const ampm   = String((d.getHours() > 12) ? "PM" : "AM");
        return `${year}/${month}/${day} ${hour}:${minute}:${second}${ampm}`;
    }

    close(except) {
        if (except != this._pickerButtonID)   {
            this.pickerDiv.addClass("hidden");
            this.pickerDiv.removeClass("utilityMenu");
            this.pickerDiv.blur();
            //console.log(this._tier, this.numSiblings)
            if (this.numSiblings > 1) { this.pickerButton.html(this.name + " " + this._caretDownIcon); }
            else { this.pickerButton.html(this.name); }
            this.pickerButton.blur();
        }
        if (except != this._renameButtonID)   { 
            this.renameDiv.addClass("hidden");
            this.renameDiv.removeClass("utilityMenu");
            this.renameDiv.blur();
            this.renameButton.blur();
        }
        if (except != this._addButtonID)      { 
            this.addDiv.addClass("hidden");
            this.addDiv.removeClass("utilityMenu");
            this.addDiv.blur();
            this.addButton.blur();
        }
    }
}