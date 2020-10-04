/* utilities class links to session class and dataManager classes
*/

class SessionUtilities {
    _utilities = null;

    _pickerButtonID = "sessionPickerButton";
    _pickerDivID = "sessionPickerDiv";
    _pickerInputID = "sessionPickerInput";
    _pickerDivInputID = "sessionPickerDivInput";
    _pickerScrollDivID = "sessionPickerScrollDiv";
    _addButtonID = "sessionAddButton";
    _addInputID = "sessionAddInput";

    _plusIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-plus-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/></svg>";
    _caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
    _caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";

    constructor (utilities) {
        const self = this;
        this._utilities = utilities;
        console.log("session utilities constructor");

        $(document).ready(function() {
            $("html").on("click", function(e) {
                if(!self._pickerDiv.hasClass("hidden")) {
                    self._pickerDiv.trigger("focusout");
                }
            });

            self._pickerButton.on("click", function(e) {
                console.log(self._pickerButtonID + " click (buttons: " + self._numButtons + ")");
                if (self._numButtons > 1) {
                    if (self._pickerDiv.hasClass("hidden")) {
                        self._pickerButton.html(self.dateString(self.sessions.sessionName) + " " + self._caretUpIcon);
                        self._pickerDiv.removeClass("hidden");
                        self._pickerDiv.css("left", String(self._pickerButton.position().left) + "px");
                        self._pickerDiv.css("top", String(self._pickerButton.position().top + self._pickerButton.outerHeight()) + "px");
                        self._pickerDiv.addClass("popUpMenu");
                        self._pickerDiv.focus();
                    }
                    else {
                        self._pickerButton.html(self.dateString(self.sessions.sessionName) + " " + self._caretDownIcon);
                        self._pickerDiv.addClass("hidden");
                        self._pickerDiv.removeClass("popUpMenu");
                        self._pickerButton.blur();
                    }
                }
                e.stopPropagation();
            });

            self._pickerDiv.on("focusout", function() {
                self._pickerButton.html(self.dateString(self.sessions.sessionName) + " " + self._caretDownIcon);
                $(this).addClass("hidden");
                $(this).removeClass("popUpMenu");
            });

            self._addButton.on("click", function(e) {
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
    get _pickerButton()    { return $("#" + this._pickerButtonID); }
    get _pickerDiv()       { return $("#" + this._pickerDivID); }
    get _addButton()       { return $("#" + this._addButtonID); }
    get _pickerScrollDiv() { return $("#" + this._pickerScrollDivID); }
    get _numButtons()      { return this._pickerScrollDiv.find("button").length; }

    build(element) {
        const pickerButton = "<button id = '" + this._pickerButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'></button>";
        const pickerDiv = "<div id = '" + this._pickerDivID + "' class = 'hidden'></div>";
        const scrollDiv = "<div id = '" + this._pickerScrollDivID + "'></div>";

        const addButton = "<button id = '" + this._addButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + this._plusIcon + "</button>";
        
        element.append(pickerButton + pickerDiv + addButton);
        this._pickerDiv.append(scrollDiv);
        this._pickerScrollDiv.css("height", "175px");
    }

    manage() {
        const selectedSession = this.sessions.sessionName;
        const selectedIssue = this.sessions.issueName;
        const sessions = this.data.issueSessions(selectedIssue);
        const self = this;
        var code, pickerText;
        this._pickerScrollDiv.empty();
//        console.log("Manage Sessions Picker - " + sessions.length);
        if (sessions.length) {
            pickerText = this.dateString(selectedSession);
            if (sessions.length > 1) { pickerText += " " + this._caretDownIcon; }
            this._pickerButton.html(pickerText);

            sessions.forEach(function(entry) {
                code = "<button type='button' class='btn ";
//                console.log(entry + " " + selectedSession + " " + (String(entry) == String(selectedSession)));
                if (String(entry) == String(selectedSession)) { code += "btn-info"; }
                else { code += "btn-outline-info"; }
                code += " btn-sm' value = '" + entry + "'>" + self.dateString(entry) + "</button>";
                self._pickerScrollDiv.append(code);
            });
        }

        self._pickerScrollDiv.find("button").on("click", function(e) {
            console.log("pickerScrollDiv button click: loading " + this.value);
            self.sessions.loadSession(this.value);
            self._pickerDiv.addClass("hidden");
            self._pickerDiv.removeClass("popUpMenu");  
            self.manage();
            self._pickerDiv.blur();
            e.stopPropagation();
        });

        if (this._numIssues == 1 && selectedIssue == "Unspecified") { this._addButton.attr("disabled", true); }
        else                                                        { this._addButton.attr("disabled", false); }
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