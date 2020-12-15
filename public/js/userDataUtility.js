/* utilities class links to sessions class
*/

class UserDataUtility {
    _userUtilities = null;
    _group = null;

    _buttonIcon = '<svg width="1.25em" height="1.25em" viewBox="0 0 16 16" class="bi bi-person-lines-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/></svg>';
    _fullIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/></svg>';
    _partIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-square-half" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 1h6a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H8V1zm6-1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/></svg>';
    _emptyIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/></svg>';
    _plusIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>';
    _minusIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-dash-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>';
    _hiddenIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye-slash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/><path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z"/><path fill-rule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"/></svg>';
    _expandedIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-fullscreen" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/></svg>';
    _collapsedIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-fullscreen-exit" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/></svg>';
    _importIcon = '<svg width="1.25em" height="1.25em" viewBox="0 0 16 16" class="bi bi-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg>';
    _exportIcon = '<svg width="1.25em" height="1.25em" viewBox="0 0 16 16" class="bi bi-upload" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path fill-rule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/></svg>';
    _downArrowIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/></svg>';
    _upArrowIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/></svg>';
    _squareIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/></svg>';
    _checkedIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>';

    _divID = "userDataDiv";
    _buttonID = "userDataButton";
    _importDivID = "userDataImportDiv";
    _importButtonID = "userDataImportButton";
    _exportButtonID = "userDataExportButton";
    _adjustID = "userDataUtilityAdjust";
    _optionsID = "userDataUtilityOptions";
    _actionsID = "userDataUtilityActions";
    _acknowledgeID = "userDataUtilityAcknowledge";
    _executeID = "userDataUtilityexecute";
    _scrollAreaDivID = "userDataUtilityScrollAreaDiv";
    _messagesDivID = "userDataUtilityMessagesDiv";
    _actionDivID = "userDataUtilityActionDiv";
    _rowButtonClass = "rowButton";
    _recordSelectClass = "selectRecord";
    _childrenButtonClass = "childrenButton";
    _childrenSelectClass = "selectChildren";


    constructor (userUtilities, group) {
        const self = this;
        this._userUtilities = userUtilities;
        this._group = group;

        $(document).ready(function() {
            self.button.on("click", function(e) {
                self.utilities.closeAllUtilityMenus(self._buttonID);
                if (self.div.hasClass("hidden")) {
                    self.div.removeClass("hidden");
                    this.blur();
                    self._buildRecords();
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

            self.adjust.find("button").on("click", function (e) {
                self.adjust.data("value", $(this).val());
                $(this).blur();
                self._manageAdjustButtons();
            });

            self.exportButton.on("click", function() {
                self._exportJSON();
                $(this).blur();
            });

            self.importButton.on("click", function() {
                self._importJSON();
                $(this).blur();
            });
        }); 
    }

    get userUtilities()    { return this._userUtilities; }
    get utilities()        { return this.userUtilities.utilities; }
    get app()              { return this.utilities.app; }
    get currentUser()      { return this.app.users.currentUser; }
    get lines()            { return this.app.editor.lines; }
    get buttons()          { return this.app.buttons; }

    get button()           { return $("#" + this._buttonID); }
    get div()              { return $("#" + this._divID); }
    get exportButton()     { return $("#" + this._exportButtonID); }
    get importButton()     { return $("#" + this._importButtonID); }
    get importDiv()        { return $("#" + this._importDivID); }
    get adjust()           { return $("#" + this._adjustID); }
    get actions()          { return $("#" + this._actionsID); }
    get options()          { return $("#" + this._optionsID); }
    get acknowledge()      { return $("#" + this._acknowledgeID); }
    get execute()          { return $("#" + this._executeID); }
    get scrollAreaDiv()    { return $("#" + this._scrollAreaDivID); }
    get messagesDiv()      { return $("#" + this._messagesDivID); }
    get actionDiv()        { return $("#" + this._actionDivID); }
    get rowButtons()       { return $("." + this._rowButtonClass); }
    get recordSelects()    { return $("." + this._recordSelectClass); }
    get childrenButtons()  { return $("." + this._childrenButtonClass); }
    get childrenSelects()  { return $("." + this._childrenSelectClass); }
    row(id)                { return $("#row_" + id); }
    rowButton(id)          { return this.row(id).find("." + this._rowButtonClass); }
    recordSelect(id)       { return this.row(id).find("." + this._recordSelectClass); }
    childrenButton(id)     { return this.row(id).find("." + this._childrenButtonClass); }
    childrenSelect(id)     { return this.row(id).find("." + this._childrenSelectClass); }

    build() {
        const importDiv = "<div id = '" + this._importDivID + "'></div>";
        const importButton = "<button id = '" + this._importButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + this._importIcon + "</button>";
        const exportButton = "<button id = '" + this._exportButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + this._exportIcon + "</button>";

        const button = "<button id = '" + this._buttonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + this._buttonIcon + "</button>";
        const div = "<div id = '" + this._divID + "' class = 'container userMenu hidden'></div>";

        const adjust = "<div id = '" + this._adjustID + "' class='btn-group btn-group-sm' role='group'></div>";

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
        this.div.append(top + scrollDiv + messagesDiv + actionDiv + importDiv);
        this.actions.append(action1 + action2 + action3);

        const adjust1 = "<button type = 'button' class = 'btn btn-secondary' value = 'sort'>Sort</button>";
        const adjust2 = "<button type = 'button' class = 'btn btn-secondary' value = 'maximize'>Maximize</button>";
        const adjust3 = "<button type = 'button' class = 'btn btn-secondary' value = 'minimize'>Minimize</button>";
        const adjust4 = "<button type = 'button' class = 'btn btn-secondary' value = 'hide'>Hide</button>";
        const adjust5 = "<button type = 'button' class = 'btn btn-secondary' value = 'select'>Select</button>";
        this.adjust.append(adjust1 + adjust2 + adjust3 + adjust4 + adjust5);

        this.adjust.data("unselectedClass", "btn-secondary");
        this.adjust.data("selectedClass", "btn-primary");
        this.adjust.data("default", "sort");

        this.options.data("default_unselectedClass", "btn-info");
        this.options.data("default_selectedClass", "btn-info");

        this.options.data("sort_default", "sort_1_0_selected");
        this.options.data("sort_indices", 4);
        this.options.data("sort_default", "sort_0_0_selected");
        this.options.data("sort_unselectedClass", "btn-dark");
        this.options.data("sort_selectedClass", "btn-info");
        this.options.data("sort_0_state", 0);
        this.options.data("sort_0_states", 2);
        this.options.data("sort_0_0_selected", this._downArrowIcon + "A-Z");
        this.options.data("sort_0_0_unselected", "A-Z");
        this.options.data("sort_0_0_value", "sort alphabetic descending");
        this.options.data("sort_0_1_selected", this._upArrowIcon + "A-Z");
        this.options.data("sort_0_1_unselected", "A-Z");
        this.options.data("sort_0_1_value", "sort alphabetic ascending");
        this.options.data("sort_1_state", 0);
        this.options.data("sort_1_states", 2);
        this.options.data("sort_1_0_selected", this._downArrowIcon + "Creation");
        this.options.data("sort_1_0_unselected", "Creation");
        this.options.data("sort_1_0_value", "sort creation descending");
        this.options.data("sort_1_1_selected", this._upArrowIcon + "Creation");
        this.options.data("sort_1_1_unselected", "Creation");
        this.options.data("sort_1_1_value", "sort creation ascending");
        this.options.data("sort_2_state", 0);
        this.options.data("sort_2_states", 2);
        this.options.data("sort_2_0_selected", this._downArrowIcon + "Edited");
        this.options.data("sort_2_0_unselected", "Edited");
        this.options.data("sort_2_0_value", "sort edited descending");
        this.options.data("sort_2_1_selected", this._upArrowIcon + "Edited");
        this.options.data("sort_2_1_unselected", "Edited");
        this.options.data("sort_2_1_value", "sort edited ascending");
        this.options.data("sort_3_state", 0);
        this.options.data("sort_3_states", 2);
        this.options.data("sort_3_0_selected", this._downArrowIcon + "Opened");
        this.options.data("sort_3_0_unselected", "Opened");
        this.options.data("sort_3_0_value", "sort opened descending");
        this.options.data("sort_3_1_selected", this._upArrowIcon + "Opened");
        this.options.data("sort_3_1_unselected", "Opened");
        this.options.data("sort_3_1_value", "sort opened ascending");
        
        this.options.data("maximize_indices", 3);
        this.options.data("maximize_0_state", 0);
        this.options.data("maximize_0_states", 3);
        this.options.data("maximize_0_0_html", "Sessions");
        this.options.data("maximize_0_0_value", "minimize sessions");
        this.options.data("maximize_0_1_html", "Issues");
        this.options.data("maximize_0_1_value", "minimize issues");
        this.options.data("maximize_0_2_html", "Clients");
        this.options.data("maximize_0_2_value", "minimize clients");
        this.options.data("maximize_1_state", 0);
        this.options.data("maximize_1_states", 2);
        this.options.data("maximize_1_0_html", "Selected");
        this.options.data("maximize_1_0_value", "maximize selected");
        this.options.data("maximize_1_1_html", "Unselected");
        this.options.data("maximize_1_1_value", "maximize unselected");
        this.options.data("maximize_2_state", 0);
        this.options.data("maximize_2_states", 2);
        this.options.data("maximize_2_0_html", "Identical");
        this.options.data("maximize_2_0_value", "maximize identical");
        this.options.data("maximize_2_1_html", "Different");
        this.options.data("maximize_2_1_value", "maximize different");

        this.options.data("minimize_indices", 3);
        this.options.data("minimize_0_state", 0);
        this.options.data("minimize_0_states", 3);
        this.options.data("minimize_0_0_html", "Sessions");
        this.options.data("minimize_0_0_value", "minimize sessions");
        this.options.data("minimize_0_1_html", "Issues");
        this.options.data("minimize_0_1_value", "minimize issues");
        this.options.data("minimize_0_2_html", "Clients");
        this.options.data("minimize_0_2_value", "minimize clients");
        this.options.data("minimize_1_state", 0);
        this.options.data("minimize_1_states", 2);
        this.options.data("minimize_1_0_html", "Selected");
        this.options.data("minimize_1_0_value", "minimize selected");
        this.options.data("minimize_1_1_html", "Unselected");
        this.options.data("minimize_1_1_value", "minimize unselected");
        this.options.data("minimize_2_state", 0);
        this.options.data("minimize_2_states", 2);
        this.options.data("minimize_2_0_html", "Identical");
        this.options.data("minimize_2_0_value", "minimize identical");
        this.options.data("minimize_2_1_html", "Different");
        this.options.data("minimize_2_1_value", "minimize different");

        this.options.data("hide_indices", 3);
        this.options.data("hide_0_states", 3);
        this.options.data("hide_0_state", 0);
        this.options.data("hide_0_0_html", "Sessions");
        this.options.data("hide_0_0_value", "minimize sessions");
        this.options.data("hide_0_1_html", "Issues");
        this.options.data("hide_0_1_value", "minimize issues");
        this.options.data("hide_0_2_html", "Clients");
        this.options.data("hide_0_2_value", "minimize clients");
        this.options.data("hide_1_state", 0);
        this.options.data("hide_1_states", 2);
        this.options.data("hide_1_0_html", "Selected");
        this.options.data("hide_1_0_value", "hide selected");
        this.options.data("hide_1_1_html", "Unselected");
        this.options.data("hide_1_1_value", "hide unselected");
        this.options.data("hide_2_state", 0);
        this.options.data("hide_2_states", 2);
        this.options.data("hide_2_0_html", "Identical");
        this.options.data("hide_2_0_value", "hide identical");
        this.options.data("hide_2_1_html", "Different");
        this.options.data("hide_2_1_value", "hide different");

        this.options.data("select_indices", 4);
        this.options.data("select_0_state", 0);
        this.options.data("select_0_states", 2);
        this.options.data("select_0_0_html", "All");
        this.options.data("select_0_0_value", "select all");
        this.options.data("select_0_1_html", "None");
        this.options.data("select_0_1_value", "select none");
        this.options.data("select_1_state", 0);
        this.options.data("select_1_states", 2);
        this.options.data("select_1_0_html", "Different");
        this.options.data("select_1_0_value", "select different");
        this.options.data("select_1_1_html", "Identical");
        this.options.data("select_1_1_value", "select identical");
        this.options.data("select_2_state", 0);
        this.options.data("select_2_states", 2);
        this.options.data("select_2_0_html", "Newer");
        this.options.data("select_2_0_value", "select newer");
        this.options.data("select_2_1_html", "Older");
        this.options.data("select_2_1_value", "select older");
        this.options.data("select_3_state", 0);
        this.options.data("select_3_states", 2);
        this.options.data("select_3_0_html", "Local");
        this.options.data("select_3_0_value", "select local");
        this.options.data("select_3_1_html", "Imported");
        this.options.data("select_3_1_value", "select imported");

        this.actions.data("unselectedClass", "btn-secondary");
        this.actions.data("selectedClass", "btn-primary");

        this.importDiv.append(importButton);
        this.importButton.prop("data-toggle", "popover");
        if (!window.FileReader) {
            this.importButton.prop("data-content", "The FileReader API is not supported by your browser.");
            this.importButton.prop("disabled", true);
        }
        else {
            this.importButton.prop("data-content", "Import data.");
        }

//        this.div.append(exportButton);
//        this.exportButton.prop("data-toggle", "popover");
//        this.exportButton.prop("data-content", "Export data.");

        this.div.css("left", String(this.userUtilities.div.position().left) + "px");
        this.div.css("top", String(this.userUtilities.div.position().top + 32) + "px");

    }

    reset() {
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

        this._manageAdjustButtons();

        this.messagesDiv.text("Please select one or more records to perform an action.");

        this._propagateScrollDiv();

        if (!this.actionDiv.hasClass("hidden")) { this.actionDiv.addClass("hidden"); }
        this.actions.data("value", "");
    }

    _propagateScrollDiv() {

    }

    manage() {
        this._manageAdjustButtons();
        this._manageActionButtons();
    }

    _manageAdjustButtons() {
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

    _manageActionButtons() {
        
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

    _doAdjustOption() {
        console.log(this.options.data("value"), this.options.data(this.options.data("value")));
    }

    _buildRecords() {
        const self = this;
        //clear scrollAreaDiv
        this.currentUser.pushToStorage();
        this.scrollAreaDiv.empty();
        //call buildRecord with data
        this._buildRecord(0, this.currentUser.pullRecords(), false);  //change false to imported

        //click event for rowButtons (id + "_row")
        this.rowButtons.on("click", function (e) {
            //add shift-click to back-step
            const row = $(this).parent().parent().parent().parent(); 
            const id = row.attr("id");
            if (e.shiftKey) {
                if (row.hasClass("collapsed")) {
                    row.removeClass("collapsed");
                    row.addClass("expanded");
                    $(this).html(self._expandedIcon);
                }
                else if (row.hasClass("hidden")) {
                    row.removeClass("hidden");
                    row.addClass("collapsed");
                    $(this).html(self._collapsedIcon);
                }
                else {
                    row.removeClass("expanded");
                    row.addClass("hidden");
                    $(this).html(self._hiddenIcon);
                }
            }
            else {
                if (row.hasClass("collapsed")) {
                    row.removeClass("collapsed");
                    row.addClass("hidden");
                    $(this).html(self._hiddenIcon);
                }
                else if (row.hasClass("hidden")) {
                    row.removeClass("hidden");
                    row.addClass("expanded");
                    $(this).html(self._expandedIcon);
                }
                else {
                    row.removeClass("expanded");
                    row.addClass("collapsed");
                    $(this).html(self._collapsedIcon);
                }
            }
        });

        //click event for childrenButton buttons (id + "_children")
        this.childrenButtons.on("click", function (e) {
            //Add shift-click to back-step
            const row = $(this).parent().parent().parent().parent(); 
            const id = row.attr("id");

            // If Control+Click, only affect children
            if (e.ctrlKey) {
                if (row.hasClass("collapsed")) {
                    row.removeClass("collapsed");
                    row.addClass("expanded");
                    $(this).html(self._expandedIcon);
                    self.expand(self.childrenOf(id));
                }
                else if (row.hasClass("hidden")) {
                    row.removeClass("hidden");
                    row.addClass("collapsed");
                    $(this).html(self._collapsedIcon);
                    self.collapse(self.childrenOf(id));
                }
                else {
                    row.removeClass("expanded");
                    row.addClass("hidden");
                    $(this).html(self._hiddenIcon);
                    self.hide(childrenOf(id));
                }
            }
            //If Click, affect all offspring
            else {
                if (row.hasClass("collapsed")) {
                    row.removeClass("collapsed");
                    row.addClass("hidden");
                    $(this).html(self._hiddenIcon);
                    self.hide(descendantsOf(id));
                }
                else if (row.hasClass("hidden")) {
                    row.removeClass("hidden");
                    row.addClass("expanded");
                    $(this).html(self._expandedIcon);
                    self.expand(self.descendantsOf(id));
                }
                else {
                    row.removeClass("expanded");
                    row.addClass("collapsed");
                    $(this).html(self._collapsedIcon);
                    self.collapse(self.descendantsOf(id));
                }
            }
        });
        
        //click event for selectRecord buttons ("select_" + id)
        this.recordSelects.on("click", function (e) {
            const row = $(this).parent().parent().parent().parent(); 
            const id = row.attr("id"); //.split("_")[1] if needed
            const value = $(this).html();
            if (row.hasClass("selected")) {
                row.removeClass("selected");
                $(this).html(self._squareIcon);
            }
            else {
                row.addClass("selected");
                $(this).html(self._checkedIcon);
            }
        });

        //click event for selectChildren buttons ("select_" + id + "_children")
        this.childrenSelects.on("click", function (e) {
            const row = $(this).parent().parent().parent().parent(); 
            const id = row.attr("id");
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
                $(this).html(self._squareIcon);
            }
            else {
                $(this).addClass("selected");
                $(this).html(self._checkedIcon);
            }
        });

        if (true) {                                                     //change true to !imported
            this.importDiv.css("left", String(this.scrollAreaDiv.position().left + this.scrollAreaDiv.prop("scrollWidth") - this.importDiv.width() - 5) + "px");
            this.importDiv.css("top", String(this.scrollAreaDiv.position().top + 5) + "px");
        }
        else {
            this.importDiv.addClass("hidden");
        }
    }

    _buildRecord(tier, local, imported = []) {
        var id = local.id, keys = [], localRecord, importedRecord;
        var unsortedKeys = Object.keys(local);
        if (imported.length) {
            unsortedKeys = unsortedKeys.concat(Object.keys(imported));
            unsortedKeys = unsortedKeys.filter(key, index => (unsortedKeys.indexOf(key) === index));
        }
        //console.log(unsortedKeys, keys);

        if (unsortedKeys.find(key => (key == "id"))) {
            keys.push(unsortedKeys.find(key => (key == "id")));
            unsortedKeys.splice(unsortedKeys.indexOf(keys[keys.length - 1]), 1);
        }
        //console.log("After id", unsortedKeys, keys);

        if (unsortedKeys.find(key => (key.toLowerCase().includes("name")))) {
            keys.push(unsortedKeys.find(key => (key.toLowerCase().includes("name"))));
            unsortedKeys.splice(unsortedKeys.indexOf(keys[keys.length - 1]), 1);
        }
        //console.log("After name", unsortedKeys, keys);

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
            unsortedKeys.splice(unsortedKeys.indexOf(keys[keys.length - 1]), 1);
        }
        //console.log("After id", unsortedKeys, keys);

        if (unsortedKeys.includes("lines")) {
            keys.push("lines");
            unsortedKeys.splice(unsortedKeys.indexOf("lines"), 1);
        }
        //console.log("After creation, lastEdited, lastOpened, lines", unsortedKeys, keys);

        if (unsortedKeys.find(key => (isArray(local[key])))) {
            var children = unsortedKeys.find(key => (isArray(local[key])));
            unsortedKeys.splice(unsortedKeys.indexOf(children), 1);
        }
        //console.log("after children", unsortedKeys, keys);

        keys = keys.concat(unsortedKeys);
        
        const rowButton = "<span class = 'rowButton'>" + this._expandedIcon + "</span>";
        const selectRecord = "<span class = 'selectRecord'>" + this._squareIcon + "</span>";
        const childrenButton = "<span class = 'childrenButton'>" + this._expandedIcon + "</span>";
        const selectChildren = "<span class = 'selectChildren'>" + this._squareIcon + "</span>";

        var record = "", line;
        //console.log(local, imported, children, keys);

        keys.forEach((key, index) => {
            line = (index == 0) ? "<td class = 'outside" + tier + "'>" + rowButton + "</td>" : "<td></td>";
            line += "<td class = 'inside" + tier + "'>" + key + ":</td>";
            [local, imported].forEach(record => {
                if (record) {
                    line += "<td>";
                    line += (isArray(record[key])) ? this._escapeHTML(record[key]).join("<br>")
                          : (parseInt(record[key]) < 3155760000 && parseInt(record[key]) > 1577880000)
                          ? this.parseDate(record[key]) : record[key];
                    line += "</td>";
                    line += (index == 0) ? "<td>" + selectRecord + "</td>" : "<td></td>";
                }
                else { line += "<td></td><td></td>"; }
            });
            record+= "<tr>" + line + "</tr>";
        });
        if (children) {
            line = "<td class = 'outside" + tier + "'>" + childrenButton + "</td>";
            line += "<td class = 'inside" + tier + "'>" + children + ":</td>";
            [local, imported].forEach(record => {
                if (isArray(record[children]) && record[children].length) {
                    line += "<td>(" + record[children].length + ")</td>";
                    line += "<td>" + selectChildren + "</td>";
                }
                else { line += "<td></td><td></td>"; }
            });
            record += "<tr>" + line + "</tr>";
        }
        this.scrollAreaDiv.append("<table id = 'row_" + id + "' class = 'flex-container'>" + record + "</table>");
//console.log(local[children]);
        if (children) {
            keys = Object.keys(local[children]);
//            console.log(keys);
            if (imported && Object.keys(imported).includes(children)) {
                keys = keys.concat(imported[children]).filter(key, index => (keys.indexOf(key) === index));
            }
            keys.forEach(key => {
                localRecord = (local[children][key]) ? local[children][key] : false;
                importedRecord = (imported && imported[children] && imported[children][key]) ? imported[children][key] : false;
                //console.log(key, tier + 1, localRecord, importedRecord);
                this._buildRecord(tier + 1, localRecord, importedRecord);
            });
        }
    }

    get all() {
        return this.rows.map(row => (row.attr("id").split("_")[1]));
    }
    get none() {
        return [];
    }
    get identical() {}
    get different() {}
    get newer() {}
    get older() {}
    get local() {}
    get imported() {}

    isSelected(ids) {
        if (isInteger(ids)) { ids = [ids]; }
        return ids.every(id => (this.row(id).hasClass("selected")));
    }
    get selected() {
        return this.rows.find(".selected");
    }
    get unselected() {
        return this.rows.not(".selected");
    }
    get idsOfSelected() {
        return this.selected.map(row => (row.attr("id")));
    }
    get idsOfUnselected() {
        return this.unselected.map(row => (row.attr("id")));
    }
    select(ids) {
        if (isInteger(ids)) { ids = [ids]; }
        this.rows.forEach(row => {
            if (ids.contains(row.attr("id"))) {
                row.addClass("selected");
            }
            else { row.removeClass("selected"); }
        });
    }

    isHidden(ids) {
        if (isInteger(ids)) { ids = [ids]; }
        return ids.every(id => (this.row(id).hasClass("hidden")));
    }
    get hidden() {
        return this.rows.find(".hidden");
    }
    get idsOfHidden() {
        return this.hidden.map(row => (row.attr("id")));
    }
    hide(ids) {
        if (isInteger(ids)) { ids = [ids]; }
        this.rows.forEach(row => {
            if (ids.contains(row.attr("id"))) {
                row.addClass("hidden");
                row.removeClass("collapsed");
            }
            else { row.removeClass("hidden"); }
        });
    }

    isCollapsed(ids) {
        if (isInteger(ids)) { ids = [ids]; }
        return ids.every(id => (this.row(id).hasClass("collapsed")));
    }
    get collapsed() {
        return this.rows.find(".collapsed");
    }
    get idsOfCollapsed() {
        return this.collapsed.map(row => (row.attr("id")));
    }
    collapse(ids) {
        if (isInteger(ids)) { ids = [ids]; }
        this.rows.forEach(row => {
            if (ids.contains(row.attr("id"))) {
                row.addClass("collapsed");
                row.removeClass("hidden");
            }
            else { row.removeClass("collapsed"); }
        });
    }

    isExpanded(ids) {
        if (isInteger(ids)) { ids = [ids]; }
        return ids.every(id => (!this.row(id).hasClass("collapsed") && !this.row(id).hasClass("hidden")));
    }
    get expanded() {
        return this.rows.not(".collapsed", ".hidden");
    }
    get idsOfExpanded() {
        return this.expanded.map(row => (row.attr("id")));
    }
    expand(ids) {
        if (isInteger(ids)) { ids = [ids]; }
        this.rows.forEach(row => {
            if (ids.contains(row.attr("id"))) {
                row.removeClass("collapsed");
                row.removeClass("hidden");
            }
        });
    }

    childrenOf(parentId) {
        return this.row(parentId).nextAll().filter(row => (row.find(parentId.split("_")[1])));
    }

    childrenIdsOf(parentId) {
        return this.childrenOf(parentId).map(row => (row.attr("id").split("_")[1]));
    }

    descendantsOf(parentId) {
        var rows = [];
        this.childrenOf(parentId).forEach(row => {
            rows.push(row);
            if (row.hasChildren()) { rows.concat(this.descendantsOf(row.attr("id"))); }
        });
        return rows;
    }

    descendantIdsOf(parentId) {
        return this.descendantsOf(parentId).map(row => (row.attr("id").split("_")[1]));
    }
    
    parseDate(ts) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const d = new Date(ts * 1000);
        const year = String(d.getFullYear()).slice(2);
        const month = String((d.getMonth() > 12) ? d.getMonth() - 12 : d.getMonth()).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hour = String((d.getHours() > 12) ? d.getHours() - 12 : d.getHours()).padStart(2, '0');
        const minute = String(d.getMinutes()).padStart(2, '0');
        const second = String(d.getSeconds()).padStart(2, '0');
        const ampm = String((d.getHours() > 12) ? "PM" : "AM");
        return `${month}/${day}/${year} ${hour}:${minute}:${second}${ampm}`;
    }

    _escapeHTML(html) {
//        return html.map(line => (line.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')));
        return html.map(line => (jQuery(line).text()));
}

    _exportJSON(data) {
        const blob1 = new Blob(data, { type: "text/plain;charset=utf-8" });
        const name = this.currentUser.username + ".json";
 
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
            a[0].click();
            $("body").remove(a);
        }
    }

    _importJSON() {
        const hiddenDiv = "<div id = 'hiddenDiv' class = 'hidden'></div>";
        const fileInput = "<input id = 'upload' type = 'file'>";
        var fi = $();
        $("body").append(hiddenDiv);
        $("hiddenDiv").append(fileInput);
        $("upload").click( function () {
            var $i = $('#upload'), // Put file input ID here
                input = $i[0]; // Getting the element from jQuery
            if (input.files && input.files[0]) {
                file = input.files[0]; // The file
                fr = new FileReader(); // FileReader instance
                fr.onload = () => {
                    // Do stuff on onload, use fr.result for contents of file
                    this.currentUser.synchronize(fr.result);
                };
                fr.readAsText(file);
                //fr.readAsDataURL(file);
            } else {
                // Handle errors here
                alert( "Either a file was not selected, or the browser is incompatible." )
            }
        });

        $("upload").click();
        $("hiddenDiv").remove();
    }

    delete() {

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