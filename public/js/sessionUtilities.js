/* utilities class links to session class and dataManager classes
*/

class SessionUtilities {
    _utilities = null;

    _sessionPickerButtonID = "sessionPickerButton";
    _sessionPickerDivID = "sessionPickerDiv";
    _sessionPickerInputID = "sessionPickerInput";
    _sessionPickerDivInputID = "sessionPickerDivInput";
    _sessionPickerScrollDivID = "sessionPickerScrollDiv";
    _sessionAddButtonID = "sessionAddButton";
    _sessionAddInputID = "sessionAddInput";

    _plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
    _caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
    _caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";

    constructor (utilities) {
        const self = this;
        this._utilities = utilities;

        $(document).ready(function() {
            $("html").on("click", function(e) {
                if(!self._sessionPickerDiv.hasClass("hidden")) {
                    self._sessionPickerDiv.trigger("focusout");
                }
            });

            self._sessionPickerButton.on("click", function(e) {
                console.log(self._sessionPickerButtonID + " click (buttons: " + self._numButtons + ")");
                if (self._numButtons > 1) {
                    if (self._sessionPickerDiv.hasClass("hidden")) {
                        self._sessionPickerButton.html(self.dateString(self.sessions.sessionName) + " " + self._caretUpIcon);
                        self._sessionPickerDiv.removeClass("hidden");
                        self._sessionPickerDiv.css("left", String(self._sessionPickerButton.position().left) + "px");
                        self._sessionPickerDiv.css("top", String(self._sessionPickerButton.position().top + self._sessionPickerButton.outerHeight()) + "px");
                        self._sessionPickerDiv.addClass("popUpMenu");
                        self._sessionPickerDiv.focus();
                    }
                    else {
                        self._sessionPickerButton.html(self.dateString(self.sessions.sessionName) + " " + self._caretDownIcon);
                        self._sessionPickerDiv.addClass("hidden");
                        self._sessionPickerDiv.removeClass("popUpMenu");
                        self._sessionPickerButton.blur();
                    }
                }
                e.stopPropagation();
            });

            self._sessionPickerDiv.on("focusout", function() {
                self._sessionPickerButton.html(self.dateString(self.sessions.sessionName) + " " + self._caretDownIcon);
                $(this).addClass("hidden");
                $(this).removeClass("popUpMenu");
            });

            self._sessionAddButton.on("click", function(e) {
                self.sessions.newSession();
                self.manage();
                $(this).blur();
                e.stopPropagation();
            });
        });
    }

    get utilities()        { return this._utilities; }
    get div()              { return this.utilities.div; }
    get lines()            { return this.utilities.lines; }
    get sessions()         { return this.utilities.sessions; }
    get data()             { return this.utilities.data; }
    get buttons()          { return this.utilities.buttons; }
    get _numIssues()       { return this.utilities.issueUtilities.numIssues; }
    get _sessionPickerButton()    { return $("#" + this._sessionPickerButtonID); }
    get _sessionPickerDiv()       { return $("#" + this._sessionPickerDivID); }
    get _sessionAddButton()       { return $("#" + this._sessionAddButtonID); }
    get _sessionPickerScrollDiv() { return $("#" + this._sessionPickerScrollDivID); }
    get _numSessionButtons()      { return this._sessionPickerScrollDiv.find("button").length; }

    build(element) {
        const pickerButton = "<button id = '" + this._sessionPickerButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'></button>";
        const pickerDiv = "<div id = '" + this._sessionPickerDivID + "' class = 'hidden'></div>";
        const scrollDiv = "<div id = '" + this._sessionPickerScrollDivID + "'></div>";

        const addButton = "<button id = '" + this._sessionAddButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + this._plusIcon + "</button>";
        
        element.append(pickerButton + pickerDiv + addButton);
        this._sessionPickerDiv.append(scrollDiv);
        this._sessionPickerScrollDiv.css("height", "175px");
    }

    manage() {
        const selectedSession = this.sessions.sessionName;
        const selectedIssue = this.sessions.issueName;
        const sessions = this.data.issueSessions(selectedIssue);
        const self = this;
        var code, pickerText;
        this._sessionPickerScrollDiv.empty();
        console.log("manage(): " + selectedIssue + " - " + sessions.length);
        if (sessions.length) {
            pickerText = this.dateString(selectedSession);
            if (sessions.length > 1) { pickerText += " " + this._caretDownIcon; }
            this._sessionPickerButton.html(pickerText);

            sessions.forEach(function(entry) {
                code = "<button type='button' class='btn ";
//                console.log(entry + " " + selectedSession + " " + (String(entry) == String(selectedSession)));
                if (String(entry) == String(selectedSession)) { code += "btn-info"; }
                else { code += "btn-outline-info"; }
                code += " btn-sm' value = '" + entry + "'>" + entry + " " + self.dateString(entry) + "</button>";
                self._sessionPickerScrollDiv.append(code);
            });
        }

        self._sessionPickerScrollDiv.find("button").on("click", function(e) {
            console.log("pickerScrollDiv button click: loading " + this.value);
            self.sessions.loadSession(this.value);
            self._sessionPickerDiv.addClass("hidden");
            self._sessionPickerDiv.removeClass("popUpMenu");  
            self.manage();
            self._sessionPickerDiv.blur();
            e.stopPropagation();
        });

        if (this._numIssues == 1 && selectedIssue == "Unspecified") { this._sessionAddButton.attr("disabled", true); }
        else                                                        { this._sessionAddButton.attr("disabled", false); }
    }

    dateString(entry) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const d = new Date(entry * 1000);
        const year = String(d.getFullYear());
        const month = months[d.getMonth()];
        const day = String(d.getDate());
        const hour = String((d.getHours() > 12) ? d.getHours() - 12 : d.getHours()).padStart(2, '0');
        const minute = String(d.getMinutes()).padStart(2, '0');
        const second = String(d.getSeconds()).padStart(2, '0');
        const ampm = String((d.getHours() > 12) ? "PM" : "AM");
        return month + " " + day + ", " + year + " " + hour + ":" + minute + ":" + second + ampm;
    }
}