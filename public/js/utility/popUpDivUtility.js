//PopUpDivUtility extends button utility
//has a div that pops up when it's clicked
//and closed when it's clicked again.
//there is a div build function that defines what's inside the div.

class popUpDivUtility extends buttonUtility {
    _buttonUtility = null;

    constructor(data) {
        this._buttonUtility = new ButtonUtility();
        //data is either undefined, an array with method values in a specific order, or an object
    }

    _initEvents() {
        const self = this;
        $(document).ready(function() {
            self.button.on("click", function(e) {
                self.beforeOnClick();
                if (self.div.hasClass("hidden")) {
                    self.div.removeClass("hidden");
                    self.div.css("left", String(self.button.position().left) + "px");
                    self.div.css("top", String(self.button.position().top + self.button.outerHeight()) + "px");
                    self.div.addClass("popUpMenu");

                    self.input.focus();
                }
                else {
                    self.close();
                }
                e.stopPropagation();
            });

            self.input.on("keypress", function(e) {
                if (e.key == "Enter") {
                    self.group.new();
                    self.current.name = this.value;
                    self.close();
                    self.editor.load();
                    self.utilities.manage(self._type);
                }
                e.stopPropagation();
            });
        });
    }

    close() {}
}