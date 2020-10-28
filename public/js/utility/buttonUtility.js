//ButtonUtility class has what's shown on the face,
//what's done when it's clicked, and
//what's needed to disable it (both deactivate and 
//an expression for whether or not it should be deactivated, called in the manage method).

class ButtonUtility {
    _type = null;

    _pickerButtonID = null;
    _renameButtonID = null;
    _addButtonID = null;

    constructor (utilities, group, type, naming = true) {
        const self = this;
        this._utilities = utilities;
        this._type = type;

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
                        self.closeMenus();
                    }
                }
                e.stopPropagation();
            });

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
                    self.utilities.closeMenus();
                }
                e.stopPropagation();
            });

            self.addButton.on("click", function(e) {
                self.group.new();
                self.editor.load();
                self.utilities.manage(self._type);
                self.utilities.closeAllUtilityMenus();
                e.stopPropagation();
            });
        }); 
    }

}