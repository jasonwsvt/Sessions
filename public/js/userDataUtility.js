/* utilities class links to sessions class
*/

class UserDataUtility {
    _userUtilities = null;
    _group = null;
    localData;
    loadedData;
    deletedRecords = [];

    _buttonIcon    = '<svg width="1.25em" height="1.25em" viewBox="0 0 16 16" class="bi bi-person-lines-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/></svg>';
    _fullIcon      = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/></svg>';
    _partIcon      = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-square-half" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 1h6a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H8V1zm6-1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/></svg>';
    _emptyIcon     = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/></svg>';
    _plusIcon      = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>';
    _minusIcon     = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-dash-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>';
    _hiddenIcon    = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye-slash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/><path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z"/><path fill-rule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"/></svg>';
    _expandedIcon  = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-fullscreen" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/></svg>';
    _collapsedIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-fullscreen-exit" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/></svg>';
    _loadIcon      = '<svg width="1.25em" height="1.25em" viewBox="0 0 16 16" class="bi bi-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg>';
    _exportIcon    = '<svg width="1.25em" height="1.25em" viewBox="0 0 16 16" class="bi bi-upload" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path fill-rule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/></svg>';
    _downArrowIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/></svg>';
    _upArrowIcon   = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/></svg>';
    _squareIcon    = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/></svg>';
    _checkedIcon   = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>';
    _caretDownIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>';
    _caretUpIcon   = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/></svg>';
    _multiIcon     = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-dash-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>'

    _divID                     = "userDataDiv";
    _buttonID                  = "userDataButton";
    _loadDivID                 = "userDataLoadDiv";
    _loadButtonID              = "userDataLoadButton";
    _exportButtonID            = "userDataExportButton";
    _adjustMenuButtonID        = "userDataUtilityAdjustMenuButton";
    _adjustID                  = "userDataUtilityAdjustMenu";
    _optionsID                 = "userDataUtilityOptions";
    _actionsID                 = "userDataUtilityActions";
    _acknowledgeID             = "userDataUtilityAcknowledge";
    _executeID                 = "userDataUtilityexecute";
    _scrollAreaDivID           = "userDataUtilityScrollAreaDiv";
    _messagesDivID             = "userDataUtilityMessagesDiv";
    _actionDivID               = "userDataUtilityActionDiv";
    _rowButtonClass            = "userDataUtilityrowButton";
    _childrenRowsButtonClass   = "childrenRowsButton";
    _localSelectClass          = "localSelectClass";
    _localChildrenSelectClass  = "localChildrenSelectClass";
    _loadedSelectClass         = "loadedSelectClass";
    _loadedChildrenSelectClass = "loadedChildrenSelectClass";

    constructor (userUtilities, group) {
        const self = this;
        this._userUtilities = userUtilities;
        this._group = group;
        this.localData = new DataTree;
        this.loadedData = new DataTree;

        this._build();

        $(document).ready(function() {
            self.button.on("click", function(e) {
                self.utilities.close(self._buttonID);
                if (self.div.hasClass("hidden")) {
                    self.div.removeClass("hidden");
                    this.blur();
                    self.localData.import(self.data.export());
                    self._buildList();
                }
                else {
                    self.close();
                }
                e.stopPropagation();
            });

            self.div.find("input").on("keypress", function (e) {
                e.stopPropagation();
            });

            self.div.find("input").on("keyup", function (e) {
                self.manage();
                e.stopPropagation();
            });

            self.div.find("input").on("click", function (e) {
                self.manage();
                e.stopPropagation();
            });

            self.div.on("click", function (e) {
                e.stopPropagation();
            });

            self.adjustMenuButton.on("click", function (e) {
                //console.log("button clicked");
                self.options.addClass("hidden");
                self.adjust.removeClass("hidden");
                $(this).blur();
            }); 

            self.adjust.find("button").on("click", function (e) {
                //console.log("button clicked");
                self.adjust.data("value", $(this).val());
                $(this).blur();
                self.adjustMenuButton.html($(this).html() + self._caretDownIcon);
                self.adjust.addClass("hidden");
                self.options.removeClass("hidden");
                self.manage();
            }); 

            self.loadButton.on("click", function() {
                self._loadJSON();
                $(this).blur();
            });
        }); 
    }

    get userUtilities()         { return this._userUtilities; }
    get utilities()             { return this.userUtilities.utilities; }
    get app()                   { return this.utilities.app; }
    get data()                  { return this.app.data; }

    get button()                { return $("#" + this._buttonID); }
    get div()                   { return $("#" + this._divID); }
    get exportButton()          { return $("#" + this._exportButtonID); }
    get loadButton()            { return $("#" + this._loadButtonID); }
    get loadDiv()               { return $("#" + this._loadDivID); }
    get adjustMenuButton()      { return $("#" + this._adjustMenuButtonID); }
    get adjust()                { return $("#" + this._adjustID); }
    get actions()               { return $("#" + this._actionsID); }
    get options()               { return $("#" + this._optionsID); }
    get acknowledge()           { return $("#" + this._acknowledgeID); }
    get execute()               { return $("#" + this._executeID); }
    get scrollAreaDiv()         { return $("#" + this._scrollAreaDivID); }
    get messagesDiv()           { return $("#" + this._messagesDivID); }
    get actionDiv()             { return $("#" + this._actionDivID); }
    get rows()                  { return this.scrollAreaDiv.children(); }

    _build() {
        const loadDiv = "<div id = '" + this._loadDivID + "'></div>";
        const loadButton = "<button id = '" + this._loadButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + this._loadIcon + "</button>";
        const exportButton = "<button id = '" + this._exportButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + this._exportIcon + "</button>";

        const button = "<button id = '" + this._buttonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + this._buttonIcon + "</button>";
        const div = "<div id = '" + this._divID + "' class = 'container userDataUtilityMenu hidden'></div>";

        var adjust = "<button class='btn btn-sm btn-primary' type='button' id = '" + this._adjustMenuButtonID + "'>Sort " + this._caretDownIcon + "</button>";
        adjust += "<div id = '" + this._adjustID + "' class = 'hidden'></div>";

        const options = "<div id = '" + this._optionsID + "' class='btn-group btn-group-sm' role='group'></div>";

        const actions = "<div id = '" + this._actionsID + "' class='btn-group btn-group-sm' role='group'></div>";
        const action1 = "<button type = 'button' class = 'btn btn-secondary' value = 'import'>Import</button>";
        const action2 = "<button type = 'button' class = 'btn btn-secondary' value = 'export'>Export</button>";
        const action3 = "<button type = 'button' class = 'btn btn-secondary' value = 'delete'>Delete</button>";

        const acknowledge = "<button id = '" + this._acknowledgeID + "' type = 'button' class = 'btn btn-secondary'>Acknowledge</button>";

        const execute = "<button id = '" + this._executeID + "' type = 'button' class = 'btn btn-secondary'></button>";

        const topLeft = "<div class = 'd-flex flex-row'>" + adjust + "</div>";
        const topRight = "<div>" + options + "</div>";
        const top = "<div class = 'd-flex flex-row justify-content-between'>" + topLeft + topRight + "</div>";
        const scrollDiv = "<div id = '" + this._scrollAreaDivID + "'></div>";
        const messagesDiv = "<div id = '" + this._messagesDivID + "' style = 'text-align: center'></div>";
        const actionDiv = "<div id = '" + this._actionDivID + "' class = 'd-flex justify-content-start'>" + actions + acknowledge + execute + "</div>";

        this.userUtilities.div.append(button + div);
        this.div.append(top + scrollDiv + messagesDiv + actionDiv + loadDiv);
        this.actions.append(action1 + action2 + action3);

        const adjust1 = "<button type = 'button' class = 'btn btn-sm btn-secondary' value = 'sort'>Sort</button>";
        const adjust2 = "<button type = 'button' class = 'btn btn-sm btn-secondary' value = 'expand'>Expand</button>";
        const adjust3 = "<button type = 'button' class = 'btn btn-sm btn-secondary' value = 'collapse'>Collapse</button>";
        const adjust4 = "<button type = 'button' class = 'btn btn-sm btn-secondary' value = 'hide'>Hide</button>";
        const adjust5 = "<button type = 'button' class = 'btn btn-sm btn-secondary' value = 'select'>Select</button>";
        const adjust6 = "<button type = 'button' class = 'btn btn-sm btn-secondary hidden' value = 'import'>Import</button>";
        const adjust7 = "<button type = 'button' class = 'btn btn-sm btn-secondary' value = 'export'>Export</button>";
        const adjust8 = "<button type = 'button' class = 'btn btn-sm btn-secondary' value = 'delete'>Delete</button>";
        this.adjust.append(adjust1, adjust2, adjust3, adjust4, adjust5, adjust6, adjust7, adjust8);

        this.adjust.data("unselectedClass", "btn-secondary");
        this.adjust.data("selectedClass", "btn-primary");
        this.adjust.data("default", "sort");

        this.setUpOptionsData();

        this.actions.data("unselectedClass", "btn-secondary");
        this.actions.data("selectedClass", "btn-primary");

        this.loadDiv.append(loadButton);
        this.loadButton.prop("data-toggle", "popover");
        if (!window.FileReader) {
            this.loadButton.prop("data-content", "The FileReader API is not supported by your browser.");
            this.loadButton.prop("disabled", true);
        }
        else {
            this.loadButton.prop("data-content", "Load data.");
        }

//        this.div.append(exportButton);
//        this.exportButton.prop("data-toggle", "popover");
//        this.exportButton.prop("data-content", "Export data.");

        this.div.css("left", String(this.userUtilities.div.position().left) + "px");
        this.div.css("top", String(this.userUtilities.div.position().top + 32) + "px");

    }

    setUpOptionsData() {
        const loaded = this.loadedData.isEmpty();
        //console.log(this.adjust.children().eq(5));
        if (loaded) { this.adjust.children().eq(5).removeClass("hidden"); }
        else { this.adjust.eq(5).addClass("hidden"); }

        this.options.removeData();

        this.options.data("default_unselectedClass", "btn-info");
        this.options.data("default_selectedClass", "btn-info");

        this.options.data("sort_indices", 4);
        this.options.data("sort_default", "sort_0_0_selected");
        this.options.data("sort_unselectedClass", "btn-dark");
        this.options.data("sort_selectedClass", "btn-info");
        this.options.data("sort_0_state", 0);
        this.options.data("sort_0_states", 2);
        this.options.data("sort_0_0_selected", this._downArrowIcon + "A-Z");
        this.options.data("sort_0_0_unselected", "A-Z");
        this.options.data("sort_0_0_value", "sort alphabetic ascending");
        this.options.data("sort_0_1_selected", this._upArrowIcon + "A-Z");
        this.options.data("sort_0_1_unselected", "A-Z");
        this.options.data("sort_0_1_value", "sort alphabetic descending");
        this.options.data("sort_1_state", 0);
        this.options.data("sort_1_states", 2);
        this.options.data("sort_1_0_selected", this._downArrowIcon + "Creation");
        this.options.data("sort_1_0_unselected", "Creation");
        this.options.data("sort_1_0_value", "sort creation ascending");
        this.options.data("sort_1_1_selected", this._upArrowIcon + "Creation");
        this.options.data("sort_1_1_unselected", "Creation");
        this.options.data("sort_1_1_value", "sort creation descending");
        this.options.data("sort_2_state", 0);
        this.options.data("sort_2_states", 2);
        this.options.data("sort_2_0_selected", this._downArrowIcon + "Edited");
        this.options.data("sort_2_0_unselected", "Edited");
        this.options.data("sort_2_0_value", "sort edited ascending");
        this.options.data("sort_2_1_selected", this._upArrowIcon + "Edited");
        this.options.data("sort_2_1_unselected", "Edited");
        this.options.data("sort_2_1_value", "sort edited descending");
        this.options.data("sort_3_state", 0);
        this.options.data("sort_3_states", 2);
        this.options.data("sort_3_0_selected", this._downArrowIcon + "Opened");
        this.options.data("sort_3_0_unselected", "Opened");
        this.options.data("sort_3_0_value", "sort opened ascending");
        this.options.data("sort_3_1_selected", this._upArrowIcon + "Opened");
        this.options.data("sort_3_1_unselected", "Opened");
        this.options.data("sort_3_1_value", "sort opened descending");
        
        this.options.data("expand_0_html", "Sessions");
        this.options.data("expand_0_value", "expand sessions");
        this.options.data("expand_1_html", "Issues");
        this.options.data("expand_1_value", "expand issues");
        this.options.data("expand_2_html", "Clients");
        this.options.data("expand_2_value", "expand clients");
        this.options.data("expand_3_html", "Selected");
        this.options.data("expand_3_value", "expand selected");
        this.options.data("expand_4_html", "Unselected");
        this.options.data("expand_4_value", "expand unselected");

        if (!loaded) { this.options.data("expand_indices", 5); }
        else {
            this.options.data("expand_indices", 7);
            this.options.data("expand_5_html", "Identical");
            this.options.data("expand_5_value", "expand identical");
            this.options.data("expand_6_html", "Different");
            this.options.data("expand_6_value", "expand different");
        }

        this.options.data("collapse_0_html", "Sessions");
        this.options.data("collapse_0_value", "collapse sessions");
        this.options.data("collapse_1_html", "Issues");
        this.options.data("collapse_1_value", "collapse issues");
        this.options.data("collapse_2_html", "Clients");
        this.options.data("collapse_2_value", "collapse clients");
        this.options.data("collapse_3_html", "Selected");
        this.options.data("collapse_3_value", "collapse selected");
        this.options.data("collapse_4_html", "Unselected");
        this.options.data("collapse_4_value", "collapse unselected");

        if (!loaded) { this.options.data("collapse_indices", 5); }
        else {
            this.options.data("collapse_indices", 7);
            this.options.data("collapse_5_html", "Identical");
            this.options.data("collapse_5_value", "collapse identical");
            this.options.data("collapse_6_html", "Different");
            this.options.data("collapse_6_value", "collapse different");
        }

        this.options.data("hide_0_html", "Sessions");
        this.options.data("hide_0_value", "hide sessions");
        this.options.data("hide_1_html", "Issues");
        this.options.data("hide_1_value", "hide issues");
        this.options.data("hide_2_html", "Clients");
        this.options.data("hide_2_value", "hide clients");
        this.options.data("hide_3_html", "Selected");
        this.options.data("hide_3_value", "hide selected");
        this.options.data("hide_4_html", "Unselected");
        this.options.data("hide_4_value", "hide unselected");

        if (!loaded) { this.options.data("hide_indices", 5); }
        else {
            this.options.data("hide_indices", 7);
            this.options.data("hide_5_html", "Identical");
            this.options.data("hide_5_value", "hide identical");
            this.options.data("hide_6_html", "Different");
            this.options.data("hide_6_value", "hide different");
        }

        if (!loaded) {
            this.options.data("select_indices", 3);
            this.options.data("select_0_html", "All");
            this.options.data("select_0_value", "select local");
            this.options.data("select_1_html", "None");
            this.options.data("select_1_value", "select none");
            this.options.data("select_2_html", "Unselected");
            this.options.data("select_2_value", "select unselected");
        }
        else {
            this.options.data("select_indices", 8);
            this.options.data("select_0_html", "Local");
            this.options.data("select_0_value", "select local");
            this.options.data("select_1_html", "Loaded");
            this.options.data("select_1_value", "select loaded");
            this.options.data("select_2_html", "Older");
            this.options.data("select_2_value", "select older");
            this.options.data("select_3_html", "Newer");
            this.options.data("select_3_value", "select newer");
            this.options.data("select_4_html", "Different");
            this.options.data("select_4_value", "select different");
            this.options.data("select_5_html", "Identical");
            this.options.data("select_5_value", "select identical");
            this.options.data("select_6_html", "None");
            this.options.data("select_6_value", "select none");
            this.options.data("select_7_html", "Unselected");
            this.options.data("select_7_value", "select unselected");
        }
        
        if (!loaded) {
            this.options.data("export_indices", 3);
            this.options.data("export_0_html", "All");
            this.options.data("export_0_value", "export local");
            this.options.data("export_1_html", "Selected");
            this.options.data("export_1_value", "export selected");
            this.options.data("export_2_html", "Unselected");
            this.options.data("export_2_value", "export unselected");
        }
        else {
            this.options.data("export_indices", 6);
            this.options.data("export_0_html", "Local");
            this.options.data("export_0_value", "export local");
            this.options.data("export_1_html", "Loaded");
            this.options.data("export_1_hidden", "until load");
            this.options.data("export_1_value", "export loaded");
            this.options.data("export_2_html", "Older");
            this.options.data("export_2_hidden", "until load");
            this.options.data("export_2_value", "export older");
            this.options.data("export_3_html", "Newer");
            this.options.data("export_3_hidden", "until load");
            this.options.data("export_3_value", "export newer");
            this.options.data("export_4_html", "Selected");
            this.options.data("export_4_value", "export selected");
            this.options.data("export_5_html", "Unselected");
            this.options.data("export_5_value", "export unselected");
        }

        if (loaded) {
            this.options.data("import_indices", 6);
            this.options.data("import_unselectedClass", "btn-warning");
            this.options.data("import_selectedClass", "btn-warning");
            this.options.data("import_0_html", "Local");
            this.options.data("import_0_value", "import local");
            this.options.data("import_1_html", "Loaded");
            this.options.data("import_1_hidden", "until loaded");
            this.options.data("import_1_value", "import loaded");
            this.options.data("import_2_html", "Older");
            this.options.data("import_2_value", "import older");
            this.options.data("import_3_html", "Newer");
            this.options.data("import_3_value", "import newer");
            this.options.data("import_4_html", "Selected");
            this.options.data("import_4_value", "import selected");
            this.options.data("import_5_html", "Unselected");
            this.options.data("import_5_value", "import unselected");
        }

        this.options.data("delete_unselectedClass", "btn-danger");
        this.options.data("delete_selectedClass", "btn-danger");
        if (!loaded) {
            this.options.data("delete_indices", 3);
            this.options.data("delete_0_html", "All");
            this.options.data("delete_0_value", "delete local");
            this.options.data("delete_1_html", "Selected");
            this.options.data("delete_1_value", "delete selected");
            this.options.data("delete_2_html", "Unselected");
            this.options.data("delete_2_value", "delete unselected");
            this.options.data("delete_3_html", "Undo");
            this.options.data("delete_3_value", "delete undo");
        }
        else {
            this.options.data("delete_indices", 7);
            this.options.data("delete_0_html", "Local");
            this.options.data("delete_0_value", "delete local");
            this.options.data("delete_1_html", "Loaded");
            this.options.data("delete_1_value", "delete loaded");
            this.options.data("delete_2_html", "Older");
            this.options.data("delete_2_value", "delete older");
            this.options.data("delete_3_html", "Newer");
            this.options.data("delete_3_value", "delete newer");
            this.options.data("delete_4_html", "Selected");
            this.options.data("delete_4_value", "delete selected");
            this.options.data("delete_5_html", "Unselected");
            this.options.data("delete_5_value", "delete unselected");
            this.options.data("delete_5_html", "Undo");
            this.options.data("delete_5_value", "delete undo");
        }
    }

    reset() {
        //clear loaded data
        this.loadedData.clear();
        this.loadDiv.removeClass("hidden");

        //set adjust default to sort
        this.adjust.data("value", this.adjust.data("default"));

        //set default sort type
        this.options.data("value", this.options.data(this.adjust.data("value") + "_default"));

        //console.log(this.adjust.data("value"), this.adjust.data(this.adjust.data("value")));
        if (this.adjust.data("value") == "sort") {
            this.options.data("value", this.adjust.data(this.adjust.data("value")));
        }
        else {
            this.options.data("value", "");
        }

        this.manage();

        if (!this.actionDiv.hasClass("hidden")) { this.actionDiv.addClass("hidden"); }
        this.actions.data("value", "");
    }

    manage() {
        this.adjust.data("index", this.adjust.find("button").index(this));
        this._manageGroup(this.adjust);
        this._buildOptionButtons();
    }

    _buildOptionButtons() {
        const self = this;
        const adjust = this.adjust.data("value");
        const indices = this.options.data(adjust + "_indices");

        if (this.options.data(adjust + "_selectedClass")) {
            this.options.data("unselectedClass", this.options.data(adjust + "_unselectedClass"));
            this.options.data("selectedClass", this.options.data(adjust + "_selectedClass"));
        }
        else {
            this.options.data("unselectedClass", this.options.data("default_unselectedClass"));
            this.options.data("selectedClass", this.options.data("default_selectedClass"));
        }

        this.options.data("value",
            (this.options.data(adjust + "_lastValue")) ? this.options.data(adjust + "_lastValue") :
            (this.options.data(adjust + "_default")) ? this.options.data(adjust + "_default") : "");
        //console.log(adjust, indices, this.options.data("value"));
        this.options.empty();
        for (var i = 0; i < indices; i++) {
            this.options.append("<button type = 'button' class = 'btn'></button>");
        }

        this.options.find("button").on("click", function (e) {
            self.options.data("value", $(this).val());
            $(this).blur();
            self._manageOptionButtons();
            self._doAdjustOption();
        });

        this._manageOptionButtons();
    }

    _manageOptionButtons() {
        var value, params, adjust, index, indices, state, states, name, i, button, lastIndex, selected;
        value = this.options.data("value");

        if (value) {
            params = value.split("_");
            adjust = params[0];
            index = params[1];
            if (params.length = 4) {
                state = params[2];
                this.options.data(adjust + "_" + index + "_state", state);
                this.options.data(adjust + "_lastIndex", this.options.data(adjust + "_index"));
                lastIndex = this.options.data(adjust + "_lastIndex");
            }
            this.options.data(adjust + "_index", index);
        }
        else {
            adjust = this.adjust.data("value");
        }
        indices = this.options.data(adjust + "_indices");
        //console.log(name, adjust, index, state, lastIndex, indices);
        for (i = 0; i < indices; i++) {
            name = adjust + "_" + i + "_";
            states = this.options.data(name + "states");
            if (states > 1) {
                state = this.options.data(name + "state");
                if (i == lastIndex && index == lastIndex) {
                    state++;
                    if (state == states) { state = 0; }
                    this.options.data(name + "state", state);
                }
                name += state + "_";
            }
            value = name + "value";

            selected = (Object.keys(this.options.data()).filter(r => (r == name + "selected"))).length;
            if (i == index) {
                if (states > 1 && selected) { name += "selected"; }
                else { name += "html"; }
            }
            else {
                if (states > 1 && selected) { name += "unselected"; }
                else { name += "html"; }
            }

            button = this.options.find("button").eq(i);
            name = this.options.data(name);
            button.html(name);
            button.val(value);
            if (i == index) {
                this.options.data("value", button.val());
                button.removeClass(this.options.data("unselectedClass"));
                button.addClass(this.options.data("selectedClass"));
            }
            else {
                button.removeClass(this.options.data("selectedClass"));
                button.addClass(this.options.data("unselectedClass"));
            }
        }
    }

    _manageGroup(group) {
        var i, button;
        if (group.find("button").length == 0) { console.trace(); return; }
        //console.log(group);
        for (i = 0; i < group.find("button").length; i++) {
            button = group.find("button").eq(i);
            //console.log(group.data("value"));
            //console.log(button.val());
            if (group.data("value").toLowerCase() == button.val().toLowerCase()) {
                //console.log("setting button", i, "to", group.data("unselectedClass"));
                button.removeClass(group.data("unselectedClass"));
                button.addClass(group.data("selectedClass"));
            }
            else {
                //console.log("setting button", i, "to", group.data("selectedClass"));
                button.removeClass(group.data("selectedClass"));
                button.addClass(group.data("unselectedClass"));
            }
        }
    }

    _buildList() {
        const self = this;
        //if (this.localData.isEmpty()) { this.localData.import(this.data.export()); }
        //clear scrollAreaDiv
        this.scrollAreaDiv.empty();
        this.loadDiv.css("left", String(this.scrollAreaDiv.position().left + this.scrollAreaDiv.prop("scrollWidth") - this.loadDiv.width() - 22) + "px");
        this.loadDiv.css("top", String(this.scrollAreaDiv.position().top + 5) + "px");
        //call buildRecord with data
        //console.log(localData, this.loadedData);
        //console.log(this.localData.tierIds(0)[0])
        this._buildRecords(this.localData.tierIds(0)[0]);
        //this._buildRecord(this.localData.tierIds(0)[0]);
        if (!this.loadedData.isEmpty()) {
            this.loadDiv.addClass("hidden");
            if (this.localData.tierIds(0)[0] != this.loadedData.tierIds(0)[0]) {
                this._buildRecords(this.loadedData);
                //this._buildRecord(this.loadedData.tierIds(0)[0]);
            }
        }
        else {
            this.loadDiv.removeClass("hidden");
        }

        //click event for rowButtons ("row_" + id)
        this.rowButtons.on("click", function (e) {
            //add shift-click to back-step
            const id = parseInt($(this).parent().parent().parent().parent().prop("id").split("_")[1]);
            if (self.rowIsCollapsed(id))   {
                if (e.shiftKey)            { self.expandRow(id); }
                else                       { self.hideRow(id); }
            }
            else if (self.rowIsHidden(id)) {
                if (e.shiftKey)            { self.collapseRow(id); }
                else                       { self.expandRow(id); }
            }
            else                           {
                if (e.shiftKey)            { self.hideRow(id); }
                else                       { self.collapseRow(id); }
            }
            if (self.rowHasParent(id)) { self.updateChildrenRowsButtonStatus(self.rowParentId(id)); }
        });

        //click event for childrenRowsButton buttons (id + "_children")
        this.childrenRowsButtons.on("click", function (e) {
            const id = parseInt($(this).parent().parent().parent().parent().prop("id").split("_")[1]);
            // If neither Shift nor Control are active, forward and all descendants
            // If Shift is active, backwards
            // If Control is active, only affect children

            const ids = (e.ctrlKey) ? self.allChildIds(id) : self.allDescendantIds(id);

            if (self.rowsAreCollapsed(ids))   {
                if (e.shiftKey)               { self.expandRows(ids); }
                else                          { self.hideRows(ids); }
            }
            else if (self.rowsAreHidden(ids)) {
                if (e.shiftKey)               { self.collapseRows(ids); }
                else                          { self.expandRows(ids); }
            }
            else                              {  
                if (e.shiftKey)               { self.hideRows(ids); }
                else                          { self.collapseRows(ids); }
            }
            self.updateChildrenRowsButtonStatuses(self.rowParentIds(ids));
        });
        
        //click event for select local record buttons ("local_" + id)
        //ctrl additionally selects all descendants.
        this.localSelects.on("click", function (e) {
            const id = parseInt($(this).parent().parent().parent().parent().prop("id").split("_")[1]);
            var ids = (e.ctrlKey) ? [id] : self.localData.ids(self.localData.record(id));
            //console.log(ids);
            if (self.localData.isSelected(id)) { self.unselectLocalRecords(ids); }
            else {                               self.localData.select(ids);   }
            //console.log(ids);
            self.updateChildrenSelectStatuses(self.localData.parentIds(ids));
        });

        //click event for select loaded record buttons ("loaded_" + id)
        //ctrl additionally selects all descendants.
        this.loadedSelects.on("click", function (e) {
            const id = parseInt($(this).parent().parent().parent().parent().prop("id").split("_")[1]);
            var ids = (e.ctrlKey) ? [id] : self.loadedData.ids(self.loadedData.record(id));
            if (self.loadedData.isSelected(id)) { self.unselectLoadedRecords(ids); }
            else {                                self.loadedData.select(ids); }
            self.updateChildrenSelectStatuses(self.loadedData.parentIds(ids));
        });

        //click event for select local Children buttons ("local_" + id + "_children")
        this.localChildrenSelects.on("click", function (e) {
            const id = parseInt($(this).parent().parent().parent().parent().prop("id").split("_")[1]);
            //console.log(id, self.localChildIds(id));
            const ids = (e.ctrlKey) ? self.localData.childIds(id) : self.localData.descendantIds(id);
            if (self.localChildrenSelectIsSelected(id)) {
                self.unselectLocalChildrenSelect(id); self.unselectLocalRecords(ids);
            }
            else {
                self.selectLocalChildrenSelect(id);   self.localData.select(ids);
            }
            self.updateChildrenSelectStatuses(self.localData.parentIds(ids));
        });

        //click event for select loaded Children buttons ("loaded_" + id + "_children")
        this.loadedChildrenSelects.on("click", function (e) {
            const id = parseInt($(this).parent().parent().parent().parent().prop("id").split("_")[1]);
            const ids = (e.ctrlKey) ? self.loadedData.childIds(id) : self.loadedData.descendantIds(id);
            if (self.loadedChildrenSelectIsSelected(id)) {
                self.unselectLoadedChildrenSelect(id); self.unselectLoadedRecords(ids);
            }
            else {
                self.selectLoadedChildrenSelect(id);   self.loadedData.select(ids);
            }
            self.updateChildrenSelectStatuses(self.loadedData.parentIds(ids));
        });

        [this.rowButtons, this.childrenRowsButtons, this.localSelects, this.loadedSelects, this.localChildrenSelects, this.loadedChildrenSelects].forEach(c => {
            c.mousedown(function (e) {
                if (e.ctrlKey || e.shiftKey) {
                    // For non-IE browsers
                    e.preventDefault();
            
                    // For IE
                    if ($.support.msie) {
                        this.onselectstart = function () { return false; };
                        var self = this;  // capture in a closure
                        window.setTimeout(function () { self.onselectstart = null; }, 0);
                    }
                }
            });
        });
    }

    _buildRecords(id) {
        this._buildRecord(id);
        const localIds = this.localData.hasChildren(id) ? this.localData.childIds(id) : [];
        const loadedIds = this.loadedData.hasChildren(id) ? this.loadedData.childIds(id) : [];
        //put sorting here;
        const ids = [...new Set(localIds.concat(loadedIds))];
        ids.forEach(id => { this._buildRecords(id); });
    }


    _buildRecord(id) {
        //console.log(id)
        const localKeys = (this.localData.has(id)) ? this.localData.keys(id) : [];
        const loadedKeys = (this.loadedData.has(id)) ? this.loadedData.keys(id) : [];
        const tier = (this.localData.has(id)) ? this.localData.tier(id) : this.loadedData.tier(id);
        var keys = [], local, loaded, children;

        if (localKeys.length)  {
            local = [];
            this.localData.values(id).forEach((value, index) => local[localKeys[index]] = value);
        } else { local = false; }

        if (loadedKeys.length) {
            loaded = [];
            this.loadedData.values(id).forEach((value, index) => loaded[loadedKeys[index]] = value);
        } else { loaded = false; }

        var unsortedKeys = [...new Set(localKeys.concat(loadedKeys))];
        //console.log(id, tier, local, unsortedKeys);

        //console.log("local:", local);
        //console.log("localKeys:", localKeys);
        //console.log("loaded:", loaded);
        //console.log("loadedKeys:", loadedKeys);
        //console.log("unsortedKeys:", unsortedKeys);

        if (unsortedKeys.find(key => (key.toLowerCase().includes("name")))) {
            keys.push(unsortedKeys.find(key => (key.toLowerCase().includes("name"))));
            unsortedKeys.splice(unsortedKeys.indexOf(keys[keys.length - 1]), 1);
        }
        else if (unsortedKeys.find(key => (key == "creation"))) {
            keys.push(unsortedKeys.find(key => (key == "creation")));
            unsortedKeys.splice(unsortedKeys.indexOf(keys[keys.length - 1]), 1);
        }
        //console.log("After name", unsortedKeys, keys);

        if (unsortedKeys.find(key => (key == "id"))) {
            keys.push(unsortedKeys.find(key => (key == "id")));
            unsortedKeys.splice(unsortedKeys.indexOf(keys[keys.length - 1]), 1);
        }
        //console.log("After id", unsortedKeys, keys);

        if (unsortedKeys.includes("passwordHash")) {
            unsortedKeys.splice(unsortedKeys.indexOf("passwordHash"), 1);
        }
        //console.log("After passwordHash", unsortedKeys, keys);

        ["creation", "lastEdited", "lastOpened"].forEach(key => {
            if (unsortedKeys.includes(key)) {
                keys.push(key);
                unsortedKeys.splice(unsortedKeys.indexOf(key), 1);
            }
        });
        //console.log("After creation, lastEdited, lastOpened, lines", unsortedKeys, keys);

        if (unsortedKeys.find(key => (key.toLowerCase().includes("id")))) {
            keys.push(unsortedKeys.find(key => (key.toLowerCase().includes("id"))));
            parentId = parseInt(local[keys[keys.length - 1]]);
            unsortedKeys.splice(unsortedKeys.indexOf(keys[keys.length - 1]), 1);
        }
        //console.log("After id", unsortedKeys, keys);

        if (unsortedKeys.includes("lines")) {
            keys.push("lines");
            unsortedKeys.splice(unsortedKeys.indexOf("lines"), 1);
        }
        //console.log("After creation, lastEdited, lastOpened, lines", unsortedKeys, keys);

        if (unsortedKeys.includes("children")) {
            children = (tier == 0) ? "clients" : (tier == 1) ? "issues" : "sessions";
            unsortedKeys.splice(unsortedKeys.indexOf("children"), 1);
        } else { children = false; }
        //console.log("after children", unsortedKeys, keys);

        keys = keys.concat(unsortedKeys);
        
        const rowButton = "<span>" + this._expandedIcon + "</span>";
        const selectLocal = "<span>" + this._squareIcon + "</span>";
        const selectLoaded = "<span>" + this._squareIcon + "</span>";
        const childrenRowsButton = "<span>" + this._expandedIcon + "</span>";
        const selectLocalChildren = "<span>" + this._squareIcon + "</span>";
        const selectLoadedChildren = "<span>" + this._squareIcon + "</span>";

        var record = "", line;
        //console.log(local, loaded, children, keys);

        keys.forEach((key, index) => {
            line = (index == 0) ? "<td class = 'outside" + tier + "'>" + rowButton + "</td>" : "<td></td>";
            line += "<td class = 'inside" + tier + "'>" + key + ":</td>";
            if (local) {
                line += "<td>";
                line += (isArray(local[key])) ? this._escapeHTML(local[key]).join("<br>")
                        : (parseInt(local[key]) < 3155760000 && parseInt(local[key]) > 1577880000)
                        ? this.parseDate(local[key]) : local[key];
                line += "</td>";
                line += (index == 0) ? "<td>" + selectLocal + "</td>" : "<td></td>";
            }
            else { line += "<td></td><td></td>"; }
            if (loaded) {
                line += "<td>";
                line += (isArray(loaded[key])) ? this._escapeHTML(loaded[key]).join("<br>")
                        : (parseInt(loaded[key]) < 3155760000 && parseInt(loaded[key]) > 1577880000)
                        ? this.parseDate(loaded[key]) : loaded[key];
                line += "</td>";
                line += (index == 0) ? "<td>" + selectLoaded + "</td>" : "<td></td>";
            }
            else { line += "<td></td><td></td>"; }
            record+= "<tr>" + line + "</tr>";
        });
        if (children) {
            line = "<td class = 'outside" + tier + "'>" + childrenRowsButton + "</td>";
            line += "<td class = 'inside" + tier + "'>" + children + ":</td>";
            if (local.hasOwnProperty("children") && isArray(local.children) && local.children.length) {
                line += "<td>(" + local.children.length + ")</td>";
                line += "<td>" + selectLocalChildren + "</td>";
            }
            else { line += "<td></td><td></td>"; }
            if (loaded.hasOwnProperty("children") && isArray(loaded.children) && loaded.children.length) {
                line += "<td>(" + loaded.children.length + ")</td>";
                line += "<td>" + selectLoadedChildren + "</td>";
            }
            else { line += "<td></td><td></td>"; }
            record += "<tr>" + line + "</tr>";
        }
        if (this.row(id)) { 
            this.row(id).html(record);
            if (this.localData.isSelected(id)) { this.selectLocal(id); }
            if (this.loadedData.isSelected(id)) { this.selectLoaded(id); }
            this.updateChildrenSelectStatus(id);
        }
        else {
            this.scrollAreaDiv.append("<table id = 'row_" + id + "' class = 'flex-container'>" + record + "</table>");
        }
    }

    sortChildren(id, method, direction) {
        var sortValues = [], sortedValues, index, loaded, children, child, childData, value, methodRow, methodValue, sortValue, lastDescendantId, rows;
        if (this.hasChildren(id)) {
            //console.log(id, "has children");
            children = this.allChildIds(id);
            //Determining sort values
            children.forEach(childId => {
                loaded = this.loadedData.has(childId);
                child = this.row(childId);
                if (this.hasChildren(childId)) { value = this.sortChildren(childId, method, direction); }
                childData = child.data(((loaded) ? "loaded" : "local") + "_" + method);
                //console.log(id, childId, method, sortValue);
                sortValues.push({ id: childId, value: (childData ? childData : value) });
            });

            if (children.length > 1) {
                //console.log(id, "before", method, direction, "sort:", sortValues);
                //Sorting values
                sortedValues = [...sortValues];
                sortedValues.sort((a,b) => (isString(a.value) ? a.value.toLowerCase().localeCompare(b.value.toLowerCase()) : a.value - b.value));
                if (direction == "descending") { sortedValues.reverse(); }
                //console.log(id, "after", method, direction, "sort:", sortedValues);

                //Moving rows of id and children based on sort
                index = id;
                sortedValues.forEach((item) => {
                    if (this.hasChildren(item.id)) {
                        lastDescendantId = this.allDescendantIds(item.id).slice(-1)[0];
                        //console.log(item.id, this.allDescendantIds(item.id), lastDescendantId);
                        rows = this.row(item.id).nextUntil("#" + lastDescendantId).addBack().add("#" + lastDescendantId).detach();
                        //console.log("including all the descendants", this.allDescendantIds(item.id));
                        //console.log("moving", item.id, "to", lastDescendantId, "after", index, rows);
                    }
                    else {
                        rows = this.row(item.id).detach();
                        //console.log("moving", item.id, "after", index, rows);
                    }
                    this.row(index).after(rows);
                    index = (this.hasChildren(item.id)) ? this.allDescendantIds(item.id).slice(-1)[0] : item.id;
                });
                return sortedValues[(direction == "descending") ? 0 : sortedValues.length - 1].value;
            } else {
                //console.log(id, "only has one child so no sorting necessary");
                return sortValues[0].value;
            }
        }
    }

    //Array methods
    localRecords(ids) { return this.localData.records(ids); }
    loadedRecords(ids) { return this.loadedData.records(ids); }
    localRecord(id) { return this.localData.record(id); }
    loadedRecord(id) { return this.loadedData.record(id); }

    //Returns an array of indices, one index for each set of children
    rowIndexPath(id)    { const p = this.localIndexPath(id); return (p) ? P : this.loadedIndexPath(id); }
    localIndexPath(id)  { return this.localData.indexPath(id); }
    loadedIndexPath(id) { return this.loadedData.indexPath(id); }

    rowIdPath(id)    { const p = this.localIdPath(id); return (p) ? p : this.loadedIdPath(id); }
    localIdPath(id)  { return this.localData.idPath(id); }
    loadedIdPath(id) { return this.loadedData.idPath(id); }

    rowTier(id)    { const t = this.localTier(id); return (isInteger(t)) ? t : this.loadedTier(id); }
    localTier(id)  { return this.localData.tier(id); }
    loadedTier(id) { return this.loadedData.tier(id); }

    // Returns an array of ids for which the remaining given ids are all their descendants.
    localMostAncestral(ids)  { return this.localData.mostAncestral(ids); }
    loadedMostAncestral(ids) { return this.loadedData.mostAncestral(ids); }

    rowHasParent(id)      { return (this.localData.has(id)) ? this.localHasParent(id) : this.loadedHasParent(id); }
    localHasParent(id)    { return this.localData.hasParent(id); }
    loadedHasParent(id)   { return this.loadedData.hasParent(id); }

    rowParentId(id)       { return (this.localData.has(id)) ? this.localParentId(id) : this.loadedParentId(id); }
    localParentId(id)     { return this.parentId(id, this.localData); }
    loadedParentId(id)    { return this.parentId(id, this.loadedData); }

    rowParentIds(ids)     { return [...new Set(ids.map(id => this.rowParentId(id)))].filter(id => isInteger(id)); }
    localParentIds(ids)   { return this.localData.parentIds(ids); }
    loadedParentIds(ids)  { return this.loadedData.parentIds(ids); }
    get allRowParentIds() { return this.rowParentIds(this.allIds); }
    
    rowHasChildren(id)    { return (this.localData.has(id)) ? this.hasLocalChildren(id) : this.hasLoadedChildren(id); }
    hasLocalChildren(id)  { return this.localData.hasChildren(id); }
    hasLoadedChildren(id) { return this.loadedData.hasChildren(id); }

    //id existance methods
    get loadedRecordsExist() { return (!this.loadedData.isEmpty()); }
    localRecordExists(id)    { return this.localData.has(id); }
    loadedRecordExists(id)   { return this.loadedData.has(id); }
    rowExists(id)            { return (this.localData.has(id) || this.loadedData.has(id)); }

    //deletion methods
    deleteRecords(localIds, loadedIds)  {
        this.localData.delete(localIds);
        this.loadedData.delete(loadedIds);
    }

    undoDelete() {
        this.localData.undoDelete();
        this.loadedData.undoDelete();
    }

    //List display methods
    rowId(id)                   { return "row_" + id; }
    rowIds(ids)                 { return ids.map(id => this.rowId(id)); }
    row(id)                     { return $("#" + this.rowId(id)); }

    //Buttons
    rowButton(id)               { return this.row(id).find("tr:first>td:first>span"); }
    childrenRowsButton(id)      { return this.row(id).find("tr:last>td:first>span"); }
    localSelect(id)             { return (this.localData.has(id)) ? this.row(id).find("tr:first>td:nth-of-type(4)>span") : null; }
    loadedSelect(id)            { return (this.loadedData.has(id)) ? this.row(id).find("tr:first>td:nth-of-type(6)>span") : null; }
    localChildrenSelect(id)     { return (this.localData.has(id)) ? this.row(id).find("tr:last>td:nth-of-type(4)>span") : null; }
    loadedChildrenSelect(id)    { return (this.loadedData.has(id)) ? this.row(id).find("tr:last>td:nth-of-type(6)>span") : null; }
    get rowButtons()            { return this.scrollAreaDiv.find("tr:first-child>td:first-child>span"); }
    get childrenRowsButtons()   { return this.scrollAreaDiv.find("tr:last-child>td:first-child>span"); }
    get localSelects()          { return this.scrollAreaDiv.find(".local tr:first-child>td:nth-of-type(4)>span"); }
    get loadedSelects()         { return this.scrollAreaDiv.find(".loaded tr:first-child>td:nth-of-type(6)>span"); }
    get localChildrenSelects()  { return this.scrollAreaDiv.find(".local tr:last-child>td:nth-of-type(4)>span"); }
    get loadedChildrenSelects() { return this.scrollAreaDiv.find(".loaded tr:last-child>td:nth-of-type(6)>span"); }

    resetRow(id)          { this.unselectRow(id); this.expandRow(id); }
    resetRows(ids)        { ids.forEach(id => this.reset(id)); }
    get resetAllRows()    { this.resetRows(this.allIds); }

    //Hiding methods
    rowIsHidden(id)    { return this.row(id).hasClass("hidden"); }
    rowsAreHidden(ids) { return ids.every(id => this.rowIsHidden(id)); }
    hideRow(id) {
        this.row(id).addClass("hidden");
        this.row(id).removeClass("collapsed");
        this.rowButton(id).html(this._hiddenIcon);
    }
    hideRows(ids)      { ids.forEach(id => this.hideRow(id)); }
    unhideRow(id)      { this.row(id).removeClass("hidden"); this.rowButton(id).html(""); }
    unhideRows(ids)    { console.trace();  console.log("unnecessary call"); /* ids.forEach(id => this.unhideRow(id)); */ }

    //Collapsing methods
    rowIsCollapsed(id)    { return this.row(id).hasClass("collapsed"); }
    rowsAreCollapsed(ids) { return ids.every(id => this.rowIsCollapsed(id)); }
    collapseRow(id) {
        this.row(id).addClass("collapsed");
        this.row(id).removeClass("hidden");
        this.rowButton(id).html(this._collapsedIcon);
    }
    collapseRows(ids)     { ids.forEach(id => this.collapseRow(id)); }
    uncollapseRow(id)     { this.row(id).removeClass("collapsed");  this.rowButton(id).html(""); }
    uncollapseRows(ids)   { console.trace(); console.log("unnecessary call"); /* ids.forEach(id => this.uncollapseRow(id)); */ }

    //Expanding methods
    rowIsExpanded(id)    { return (!this.rowIsCollapsed(id) && !this.rowIsHidden(id)); }
    rowsAreExpanded(ids) { return ids.every(id => this.rowIsExpanded(id)); }
    expandRow(id)        {
        this.row(id).removeClass("hidden");
        this.row(id).removeClass("collapsed");
        this.rowButton(id).html(this._expandedIcon);
    }
    expandRows(ids)      { ids.forEach(id => this.expandRow(id)); }
    unexpandRow(id)      { /*this.row(id).removeClass("expanded");*/ this.rowButton(id).html(""); }
    unexpandRows(ids)    { console.trace(); console.log("unnecessary call"); /* ids.forEach(id => this.unexpandRow(id)); */ }

    //Selecting methods
    rowIsSelected(id)                  { return this.localData.isSelected(id) || this.loadedData.isSelected(id); }
    rowsAreSelected(ids)               { return ids.every(id => this.rowIsSelected(id)); }
    localRecordIsSelected(id)          { return this.row(id).hasClass("localSelected"); }
    loadedRecordIsSelected(id)         { return this.row(id).hasClass("loadedSelected"); }
    localRecordsAreSelected(ids)       { return ids.every(id => this.localData.isSelected(id)); }
    loadedRecordsAreSelected(ids)      { return ids.every(id => this.loadedData.isSelected(id)); }
    localRecordsAreUnselected(ids)     { return ids.every(id => !this.localData.isSelected(id)); }
    loadedRecordsAreUnselected(ids)    { return ids.every(id => !this.loadedData.isSelected(id)); }

    selectLocalRecords(ids)    { ids.forEach(id => this.localData.select(id)); }
    selectLocalRecord(id)      {
        if (this.localData.has(id) && !this.localData.isSelected(id)) {
            if (this.loadedData.has(id) && this.loadedData.isSelected(id)) { this.unselectLoadedRecord(id); }
            this.row(id).addClass("localSelected");
            this.localSelect(id).html(this._checkedIcon);
        }
    }
    selectLoadedRecord(id)     {
        if (this.loadedData.has(id) && !this.loadedData.isSelected(id)) {
            if (this.localData.has(id) && this.localData.isSelected(id)) { this.unselectLocalRecord(id); }
            console.log("selecting loaded record");
            this.row(id).addClass("loadedSelected");
            this.loadedSelect(id).html(this._checkedIcon);
        }
    }
    selectLoadedRecords(ids)   { ids.forEach(id => this.loadedData.select(id)); }

    unselectRow(id)            { this.unselectLocalRecord(id); this.unselectLoadedRecord(id); }
    unselectRows(ids)          { ids.forEach(id => this.unselectRow(id)); }
    unselectLocalRecord(id)    {
        if (this.localData.has(id) && this.localData.isSelected(id)) {
            //console.log("unselecting local record");
            this.row(id).removeClass("localSelected");
            this.localSelect(id).html(this._squareIcon);
        }
    }
    unselectLocalRecords(ids)  { ids.forEach(id => this.unselectLocalRecord(id)); }
    unselectLoadedRecord(id)   {
        if (this.loadedData.has(id) && this.loadedData.isSelected(id)) {
            //console.log("unselecting loaded record");
            this.row(id).removeClass("loadedSelected");
            this.loadedSelect(id).html(this._squareIcon);
        }
    }
    unselectLoadedRecords(ids) { ids.forEach(id => this.loadedData.unselect(id)); }

    //Children select button methods
    localChildrenSelectIsSelected(id)  { return this.localRecordsAreSelected(this.localChildIds(id)); }
    loadedChildrenSelectIsSelected(id) { return this.loadedRecordsAreSelected(this.loadedChildIds(id)); }

    updateChildrenSelectStatuses(ids) { ids.forEach(id => this.updateChildrenSelectStatus(id)); }
    updateChildrenSelectStatus(id) {
        if (this.localData.has(id)) { this.updateLocalChildrenSelectStatus(id); }
        if (this.loadedData.has(id)) { this.updateLoadedChildrenSelectStatus(id); }
    }
    updateLocalChildrenSelectStatus(id) {
        const ids = this.localData.childIds(id);
        this.localChildrenSelect(id).html(
            (this.localRecordsAreSelected(ids))   ? this._fullIcon
          : (this.localRecordsAreUnselected(ids)) ? this._emptyIcon
          :                                         this._multiIcon); //changed from _partIcon
    }
    updateLoadedChildrenSelectStatus(id) {
        const ids = this.loadedData.childIds(id);
        this.loadedChildrenSelect(id).html(
            (this.loadedRecordsAreSelected(ids))   ? this._fullIcon
          : (this.loadedRecordsAreUnselected(ids)) ? this._emptyIcon
          :                                          this._multiIcon);
    }

    selectLocalChildrenSelect(id)    { this.localData.childIds(id).forEach(id => this.localData.select(id)); }
    selectLoadedChildrenSelect(id)   { this.loadedData.childIds(id).forEach(id => this.loadedData.select(id)); }
    unselectLocalChildrenSelect(id)  { this.localData.childIds(id).forEach(id => this.unselectLocalRecord(id)); }
    unselectLoadedChildrenSelect(id) { this.loadedData.childIds(id).forEach(id => this.unselectLoadedRecord(id)); }

    updateChildrenRowsButtonStatuses(ids) { ids.forEach(id => this.updateChildrenRowsButtonStatus(id)); }
    updateChildrenRowsButtonStatus(id) {
        const ids = this.allChildIds(id);
        //console.log(id, ids);
        //console.trace();
        this.childrenRowsButton(id).html(
            (this.rowsAreHidden(ids))    ? this._hiddenIcon
          : (this.rowsAreCollapsed(ids)) ? this._collapsedIcon
          : (this.rowsAreExpanded(ids))  ? this._expandedIcon
          :                                this._multiIcon);
    }

    //row record comparison methods
    rowRecordsAreIdentical(id) { this.localData.isIdentical(this.loadedData.record(id)); }
    localRecordIsNewer(id) { this.localData.isNewer(this.loadedData.record(id)); }
    localRecordIsOlder(id) { this.localData.isOlder(this.loadedData.record(id)); }
    loadedRecordIsNewer(id) { this.loadedData.isNewer(this.localData.record(id)); }
    loadedRecordIsOlder(id) { this.loadedData.isOlder(this.localData.record(id)); }


    //Id collections
    get allIds()    { return this.localData.unionIds(this.loadedData); }
    get localIds()  { return this.localData.ids; }
    get loadedIds() { return this.loadedData.ids; }
    get newerLoadedIds() { this.loadedData.newerIds(this.localData); }
    get olderLoadedIds() { this.loadedData.olderIds(this.localData); }
    get newerLocalIds()  { this.localData.newerIds(this.loadedData); }
    get olderLocalIds()  { this.localData.olderIds(this.loadedData); }
    
    allChildIds(parentId)    { return [... new Set(this.localChildIds(parentId).concat(this.loadedChildIds(parentId)))]; }
    localChildIds(parentId)  { return this.localData.childIds(parentId); }
    loadedChildIds(parentId) { return this.loadedData.childIds(parentId); }

    allDescendantIds(id)    { return [... new Set(this.localDescendantIds(id).concat(this.loadedDescendantIds(id)))]; }
    localDescendantIds(id)  { return this.localData.descendantIds(id); }
    loadedDescendantIds(id) { return this.loadedData.descendantIds(id); }

    get allClientRowIds()         { return [...new Set(this.localData.tierIds(1).concat(this.loadedData.tierIds(1)))]; }
    get allIssueRowIds()          { return [...new Set(this.localData.tierIds(2).concat(this.loadedData.tierIds(2)))]; }
    get allSessionRowIds()        { return [...new Set(this.localData.tierIds(3).concat(this.loadedData.tierIds(3)))]; }
    get allNewerLoadedRecordIds() { return this.loadedData.newerIds(this.localData); }
    get allOlderLoadedRecordIds() { return this.loadedData.olderIds(this.localData); }
    get allNewerLocalRecordIds()  { return this.localData.newerIds(this.loadedData); }
    get allOlderLocalRecordIds()  { return this.localData.olderIds(this.loadedData); }
    get allDifferentRecordIds()   { return this.localData.differentIds(this.loadedData); }
    get allIdenticalRecordIds()   { return this.localData.identicalIds(this.loadedData); }
    get allHiddenRowIds()         { return this.allIds.filter(id => this.rowIsHidden(id)); }
    get allCollapsedRowIds()      { return this.allIds.filter(id => this.rowIsCollapsed(id)); }
    get allExpandedRowIds()       { return this.allIds.filter(id => this.rowIsExpanded(id)); }
    get allSelectedRowIds()       { return this.allIds.filter(id => this.rowIsSelected(id)); }
    get allUnselectedRowIds()     { return this.allIds.filter(id => !this.rowIsSelected(id)); }

    _doAdjustOption() {
        var parentIds;
        const adjust = this.adjust.data("value");
        const option = this.options.data(this.options.data("value")).substr(adjust.length + 1, this.options.data(this.options.data("value")).length - 1)
        console.log(adjust, this.options.data(this.options.data("value")), "'" + adjust + "'", "'" + option + "'");

        if (adjust == "sort") { 
            const method = (option.split(" ")[0] == "alphabetic") ? "name"
                         : (option.split(" ")[0] == "creation")   ? "creation"
                         : (option.split(" ")[0] == "edited")     ? "lastEdited"
                         : (option.split(" ")[0] == "opened")     ? "lastOpened" : null;
            const direction = option.split(" ")[1];
    
            this.sortChildren(this.scrollAreaDiv.children().eq(0).attr("id"), method, direction);
        }
        else if (["expand", "collapse", "hide"].includes(adjust)) {
            const ids = (option == "clients")    ? this.allClientRowIds
                      : (option == "issues")     ? this.allIssueRowIds
                      : (option == "sessions")   ? this.allSessionRowIds
                      : (option == "different")  ? this.allDifferentRowIds
                      : (option == "identical")  ? this.allIdenticalRowIds
                      : (option == "selected")   ? this.allSelectedRowIds
                      : (option == "unselected") ? this.allUnselectedRowIds : [];

            console.log(ids);
            switch (adjust) {
                case "expand":   this.expandRows(ids);   break;
                case "collapse": this.collapseRows(ids); break;
                case "hide":     this.hideRows(ids);     break;
            }
            this.updateChildrenRowsButtonStatuses(this.rowParentIds(ids));
        }
        else if (adjust == "select") {
            switch (option) {
                case "local":
                    this.localData.select(this.allLocalIds);
                    parentIds = this.localParentIds(this.allLocalIds);
                    break;
                case "loaded":
                    this.loadedData.select(this.allLoadedIds);
                    parentIds = this.loadedParentIds(this.allLoadedIds);
                    break;
                case "older":
                    this.allIds.forEach(id => {
                        if (!this.loadedData.has(id) || this.loadedRecordIsNewer(id)) { this.localData.select(id); }
                        else { this.loadedData.select(id); }
                    });
                    parentIds = this.allRowParentIds;
                    break;
                case "newer":
                    this.allIds.forEach(id => {
                        if (!this.loadedData.has(id) || this.loadedRecordIsOlder(id)) { this.localData.select(id); }
                        else { this.loadedData.select(id); }
                    });
                    parentIds = this.allRowParentIds;
                    break;
                case "different":
                    this.loadedData.select(this.allDifferentRecordIds);
                    parentIds = this.allRowParentIds;
                    break;
                case "identical":
                    this.loadedData.select(this.allIdenticalRecordIds);
                    parentIds = this.allRowParentIds;
                    break;
                case "unselected":
                    if (this.loadedRecordsExist) {
                        this.allIds.forEach(id => {
                            if (this.loadedData.has(id) &&
                               (!this.rowIsSelected(id) || !this.loadedData.isSelected(id))) { this.loadedData.select(id); }
                            else if (this.localData.has(id)) { this.localData.select(id); }
                        });
                    }
                    else {
                        const selectedRows = this.allSelectedRowIds;
                        const unselectedRows = this.allUnselectedRowIds;
                        this.unselectRows(selectedRows);
                        this.localData.select(unselectedRows);
                    }
                    parentIds = this.allRowParentIds;
                    break;
                case "none": this.unselectRows(this.allIds); break;
            }
            this.updateChildrenSelectStatuses(parentIds);
        }
        else if (adjust == "export") {
            const records = (option == "local")    ? this.localData
                          : (option == "loaded")   ? this.loadedData
                          : (option == "selected") ? this.allSelectedRowIds.map(id =>
                                                       (this.localData.isSelected(id)
                                                           ? this.localData.record(id) : this.loadedData.record(id)))
                          : (option == "newer")    ? this.allIds.map(id =>
                                                       (!this.loadedData.exists(id) || this.loadedData.isOlder(this.localData.record(id)))
                                                           ? this.localData.record(id)
                                                           : this.loadedData.record(id))
                          : (option == "older")    ? this.allIds.map(id =>
                                                       (!this.loadedData.exists(id) || this.loadedData.isNewer(this.localData.record(id)))
                                                           ? this.localData.record(id)
                                                           : this.loadedData.record(id))
                          : [];
            console.log(records);
            //this._exportJSON(records);
        }
        else if (adjust == "delete") {
            if (option == "undo") { this.undoDelete(); }
            else {
                const records = (option == "local")    ? this.allLocalRecords
                              : (option == "loaded")   ? this.allLoadedRecords
                              : (option == "selected") ? this.allSelectedRowIds.map(id =>
                                                          (this.localData.isSelected(id)
                                                              ? this.localRecord(id) : this.loadedRecord(id)))
                              : (option == "newer")    ? this.allIds.map(id =>
                                                          (!this.loadedData.has(id) || this.loadedRecordIsOlder(id))
                                                              ? this.localRecord(id)
                                                              : this.loadedRecord(id))
                              : (option == "older")    ? this.allIds.map(id =>
                                                          (!this.loadedData.has(id) || this.loadedRecordIsNewer(id))
                                                              ? this.localRecord(id)
                                                              : this.loadedRecord(id))
                              : [];
              this.delete
            }
        }
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

    _escapeHTML(html) { return html.map(line => (jQuery(line).text())); }

    _exportJSON(data) {
        const blob1 = new Blob([JSON.stringify(data, null, 2)], { type: "text/plain;charset=utf-8" });
        const name = this.current.username + ".json";
        console.log(blob1);
 
        //Check the Browser.
        const isIE = false || !!document.documentMode;
        if (isIE) { window.navigator.msSaveBlob(blob1, name); }
        else {
            const url = window.URL || window.webkitURL;
            const link = url.createObjectURL(blob1);
            var a = $("<a />");
            a.attr("download", name);
            a.attr("href", link);
            $("body").append(a);
            a.on("click", function(e) { e.stopPropagation(); });
            a[0].click();
            $("body").remove(a);
        }
    }

    _loadJSON() {
        const self = this;
        var a = $("<div id = 'loadDiv' class = 'hidden'></div>");
        a.append("<input id = 'loadFile' type = 'file'>");
        $("body").append(a);
        $("#loadFile").on("change", function() { 
            let file = this.files[0];
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function() {
                self.loadedData.import(JSON.parse(reader.result));
                self.setUpOptionsData();
                self._buildList();
            };
            reader.onerror = function() {
              console.log(reader.error);
            };
            $("body").remove("#loadDiv");
        });
        $("#loadFile").on("click", function(e) { e.stopPropagation(); });
        $("#loadFile").trigger("click");
    }

    getOptionValues() {
        const adjust = this.adjust.data("value");
        const index = this.options.data("index");
        const values = [];
        var i = 0, value;

        value = this.options.data(adjust + "_" + index);

        if (value) {
            return [value];
        }
        else {
            while (true) {
                value = this.options.data(adjust + "_" + index + "_" + i);
                if (value) {
                    values.push(value);
                    i++;
                }
                else {
                    break;
                }
            }
            return values;
        }
    }

    close(except) {
        if (except != this._buttonID)   {
            this.div.addClass("hidden");
            this.button.blur();
        }
    }
}