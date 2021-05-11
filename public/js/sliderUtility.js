/* utilities class links to sessions class
*/

class SliderUtility {
    constructor (utilities) {
        const self = this;
        this._utilities = utilities;
        this._utilityID = "sliderUtility";
    
        this._scrollUpIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-arrow-bar-up' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z'/></svg>";
        this._scrollDownIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-arrow-bar-down' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z'/></svg>";
    
        this._slideUpButtonID = "slideUpButton";
        this._slideDownButtonID = "slideDownButton";
    
        this._build();

        $(document).ready(function() {
            self._slideUpButton.on("click", function() {
                self.editor.reduceVisibleLines();
                this.blur();
                return false;
            });

            Mousetrap.bind(['ctrl+up'], function(e) {
                self.editor.reduceVisibleLines();
                e.stopPropagation();
                return false;
            });

            self._slideDownButton.on("click", function() {
                self.editor.increaseVisibleLines();
                this.blur();
                return false;
            });

            Mousetrap.bind(['ctrl+down'], function(e) {
                self.editor.increaseVisibleLines();
                e.stopPropagation();
                return false;
            });
        }); 
    }

    get div()                     { return $("#" + this._utilityID); }
    get app()                     { return this._utilities.app; }
    get editor()                  { return this.app.editor; }
    get buttons()                 { return this.app.buttons; }
    get lines()                   { return this.editor.lines; }
    get _slideUpButton()          { return $("#" + this._slideUpButtonID); }
    get _slideDownButton()        { return $("#" + this._slideDownButtonID); }

    _build() {
        const scrollUpIcon = this._scrollUpIcon;
        const scrollDownIcon = this._scrollDownIcon;

        const slideUpButton = "<button id = '" + this._slideUpButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + scrollUpIcon + "</button>";
        const slideDownButton = "<button id = '" + this._slideDownButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + scrollDownIcon + "</button>";

        this.div.addClass("btn-group");
        this.div.attr("role", "group");
        this.div.append(slideUpButton + slideDownButton);
    }
}