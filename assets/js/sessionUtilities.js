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

    constructor (utilities) {
        const self = this;
        this._utilities = utilities;

        $(document).ready(function() {
            $("#" + self._sessionPickerButtonID).on("click", function() {
                const caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
                const caretUpIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-up-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/></svg>";
                const pickerDiv = $("#" + self._sessionPickerDivID);
                const scrollDiv = $("#" + self._sessionPickerScrollDivID);
                const button = $("#" + self._sessionPickerButtonID);
                const buttons = scrollDiv.find("button");
                console.log(self._sessionPickerButtonID + " click (buttons: " + buttons.length + ")");
                if (buttons.length > 1) {
                    if (pickerDiv.hasClass("hidden")) {
                        button.html(self.dateString(self.sessions.sessionName) + " " + caretUpIcon);
                        pickerDiv.removeClass("hidden");
                        pickerDiv.css("left", String(button.position().left) + "px");
                        pickerDiv.css("top", String(button.position().top + button.outerHeight()) + "px");
                        pickerDiv.addClass("popUpMenu");
                        pickerDiv.focus();
                    }
                    else {
                        button.html(self.dateString(self.sessions.sessionName) + " " + caretDownIcon);
                        pickerDiv.addClass("hidden");
                        pickerDiv.removeClass("popUpMenu");
                        button.blur();
                    }
                }
            });

            $("#" + self._sessionPickerScrollDivID + " button").on("click", function() {
                const pickerDiv = $("#" + self._sessionPickerDivID);
                console.log("sessionPickerScrollDiv button click: loading " + this.value);
                self.sessions.loadSession(this.value);
                pickerDiv.addClass("hidden");
                pickerDiv.removeClass("popUpMenu");  
                self.manage();
                pickerDiv.blur();
            });

            $("#" + self._sessionPickerDivID).on("focusout", function() {
                const caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
                const button = $("#" + self._sessionPickerButtonID);
                console.log("sessionPickerDiv focusout " + $(this));
                button.html(self.dateString(self.sessions.sessionName) + " " + caretDownIcon);
                $(this).addClass("hidden");
                $(this).removeClass("popUpMenu");
            });

            $("#" + self._sessionAddButtonID).on("click", function() {
                self.sessions.newSession();
                self.update();
                $(this).blur();
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

        const sessionPickerButton = "<button id = '" + this._sessionPickerButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'></button>";
        const sessionPickerDiv = "<div id = '" + this._sessionPickerDivID + "' class = 'hidden'></div>";
        const sessionPickerScrollDiv = "<div id = '" + this._sessionPickerScrollDivID + "'></div>";

        const sessionAddButton = "<button id = '" + this._sessionAddButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + plusIcon + "</button>";
        
        element.append(sessionPickerButton + sessionPickerDiv + sessionAddButton);
        $("#" + this._sessionPickerDivID).append(sessionPickerScrollDiv);
        $("#" + this._sessionPickerScrollDivID).css("height", "175px");
    }

    manage() {
        const caretDownIcon = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-caret-down-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>";
        const numIssues = $("#" + this._issuePickerScrollDivID).children().length;
        const pickerButton = $("#" + this._sessionPickerButtonID);
        const addButton = $("#" + this._sessionAddButtonID);
        const selectedSession = this.sessions.sessionName;
        const selectedIssue = this.sessions.issueName;
        const sessions = this.data.issueSessions(selectedIssue);
        const div = $("#" + this._sessionPickerScrollDivID);
        const self = this;
        var code, sessionPickerText;
        div.empty();
        if (sessions.length) {
            sessionPickerText = this.dateString(selectedSession);
            if (sessions.length > 1) { sessionPickerText += " " + caretDownIcon; }
            pickerButton.html(sessionPickerText);

            sessions.forEach(function(entry) {
                code = "<button type='button' class='btn ";
                console.log(entry + " " + selectedSession + " " + (String(entry) == String(selectedSession)));
                if (String(entry) == String(selectedSession)) { code += "btn-info"; }
                else { code += "btn-outline-info"; }
                code += " btn-sm' value = '" + entry + "'>" + self.dateString(entry) + "</button>";
                div.append(code);
            });
        }
//        if (sessions.length > 1)  { pickerButton.attr("disabled", false); }
//        else if (sessions.length) { pickerButton.attr("disabled", true); }
//        else                      { pickerButton.text("No sessions.  Create an issue!"); }

        if (numIssues == 1 && selectedIssue == "Unspecified") { addButton.attr("disabled", true); }
        else                                                  { addButton.attr("disabled", false); }
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