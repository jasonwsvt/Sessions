/* utilities class links to sessions class
*/

class UserDataUtility {
    _userUtilities = null;
    _group = null;

    _buttonIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-person-lines-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z'/></svg>";
    _fullIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-square-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z'/></svg>";
    _partIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-square-half' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 1h6a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H8V1zm6-1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z'/></svg>";
    _emptyIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/></svg>";
    _plusIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
    _minusIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-dash-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z'/></svg>";
    _hideIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-eye-slash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z'/><path d='M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z'/><path d='M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z'/><path fill-rule='evenodd' d='M13.646 14.354l-12-12 .708-.708 12 12-.708.708z'/></svg>";
    _showIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-eye' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z'/><path fill-rule='evenodd' d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z'/></svg>";
    _expandIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-arrows-expand' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zM7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10z'/></svg>";
    _collapseIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-arrows-collapse' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zm-.5 11.707l-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793z'/></svg>";
    _trashIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg>";
    _exportIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-download' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/><path fill-rule='evenodd' d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z'/></svg>";
    _importIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-upload' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/><path fill-rule='evenodd' d='M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z'/></svg>";
    _downArrow = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-arrow-down' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z'/></svg>";
    _upArrow = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-arrow-up' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z'/></svg>";

    _divID = "userDataDiv";
    _buttonID = "userDataButton";
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
                    //self.manage();
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
        this.options.data("sort_0_0_selected", this._downArrow + "A-Z");
        this.options.data("sort_0_0_unselected", "A-Z");
        this.options.data("sort_0_0_value", "sort alphabetic descending");
        this.options.data("sort_0_1_selected", this._upArrow + "A-Z");
        this.options.data("sort_0_1_unselected", "A-Z");
        this.options.data("sort_0_1_value", "sort alphabetic ascending");
        this.options.data("sort_1_0_selected", this._downArrow + "Creation");
        this.options.data("sort_1_0_unselected", "Creation");
        this.options.data("sort_1_0_value", "sort creation descending");
        this.options.data("sort_1_1_selected", this._upArrow + "Creation");
        this.options.data("sort_1_1_unselected", "Creation");
        this.options.data("sort_1_1_value", "sort creation ascending");
        this.options.data("sort_1_state", 0);
        this.options.data("sort_1_states", 2);
        this.options.data("sort_2_0_selected", this._downArrow + "Edited");
        this.options.data("sort_2_0_unselected", "Edited");
        this.options.data("sort_2_0_value", "sort edited descending");
        this.options.data("sort_2_1_selected", this._upArrow + "Edited");
        this.options.data("sort_2_1_unselected", "Edited");
        this.options.data("sort_2_1_value", "sort edited ascending");
        this.options.data("sort_2_state", 0);
        this.options.data("sort_2_states", 2);
        this.options.data("sort_3_0_selected", this._downArrow + "Opened");
        this.options.data("sort_3_0_unselected", "Opened");
        this.options.data("sort_3_0_value", "sort opened descending");
        this.options.data("sort_3_1_selected", this._upArrow + "Opened");
        this.options.data("sort_3_1_unselected", "Opened");
        this.options.data("sort_3_1_value", "sort opened ascending");
        this.options.data("sort_3_state", 0);
        this.options.data("sort_3_states", 2);
        
        this.options.data("maximize_indices", 3);
        this.options.data("maximize_0_html", "All");
        this.options.data("maximize_0_value", "maximize all");
        this.options.data("maximize_1_html", "Selected");
        this.options.data("maximize_1_value", "maximize selected");
        this.options.data("maximize_2_html", "Unselected");
        this.options.data("maximize_2_value", "maximize unselected");

        this.options.data("minimize_indices", 3);
        this.options.data("minimize_0_html", "All");
        this.options.data("minimize_0_value", "minimize all");
        this.options.data("minimize_1_html", "Selected");
        this.options.data("minimize_1_value", "minimize selected");
        this.options.data("minimize_2_html", "Unselected");
        this.options.data("minimize_2_value", "minimize unselected");

        this.options.data("hide_indices", 3);
        this.options.data("hide_0_html", "Sessions");
        this.options.data("hide_0_value", "hide sessions");
        this.options.data("hide_1_html", "Selected");
        this.options.data("hide_1_value", "hide selected");
        this.options.data("hide_2_html", "Unselected");
        this.options.data("hide_2_value", "hide unselected");

        this.options.data("select_indices", 3);
        this.options.data("select_0_html", "All");
        this.options.data("select_0_value", "select all");
        this.options.data("select_1_html", "None");
        this.options.data("select_1_value", "select none");
        this.options.data("select_2_html", "Newest");
        this.options.data("select_2_value", "select newest");

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
console.log(this.scrollAreaDiv.position().left, this.div.width(), this.importButton.width())
        this.importDiv.css("left", String(this.scrollAreaDiv.position().left + this.div.width() - this.importDiv.width()) + "px");
        this.importDiv.css("top", String(this.scrollAreaDiv.position().top) + "px");

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
        console.log(adjust, indices, this.options.data("value"));
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
        var value, params, adjust, index, indices, state, states, name, i, button, lastIndex;
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
        console.log(this.options.data(), value, adjust, index, state, lastIndex, indices);
        for (i = 0; i < indices; i++) {
            value = adjust + "_" + i + "_";
            states = this.options.data(value + "states");
            if (states > 1) {
                state = this.options.data(value + "state");
                if (i == lastIndex && index == lastIndex) {
                    state++;
                    if (state == states) { state = 0; }
                    this.options.data(value + "state", state);
                }
                value += state + "_";
            }
            if (i == index) {
                if (states > 1) { value += "selected"; }
                else { value += "html"; }
            }
            else {
                if (states > 1) { value += "unselected"; }
                else { value += "html"; }
            }

            button = this.options.find("button").eq(i);
            name = this.options.data(value);
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
            //console.log(button.html(), button.val());
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
        console.log(this.adjust.data("value"), this.options.data("value"));
    }

    _pullUserData() {
        this.currentUser.pushToStorage();
        const data = this.currentUser.createJSON();
    }

    _exportJSON() {
        const blob1 = new Blob(this.dataToExport(), { type: "text/plain;charset=utf-8" });
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