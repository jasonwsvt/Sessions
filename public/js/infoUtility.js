/* utilities class links to sessions class
*/

class InfoUtility {
    _utilities = null;
    _utilityID = "infoUtility";

    _data = null;

    _infoIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-info-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path d='M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z'/><circle cx='8' cy='4.5' r='1'/></svg>";

    _buttonID = "infoUtilityButton";
    _divID = "infoUtilityWindow";

    constructor (utilities) {
        const self = this;
        this._utilities = utilities;
        this._data = new DataTree;

        this._build();

        $(document).ready(function() {
            self.button.on("click", function(e) {
                self.utilities.close(self._buttonID);
                if (self.div.hasClass("hidden")) {
                    self.div.removeClass("hidden");
                    this.blur();
                }
                else {
                    self.close();
                }
                e.stopPropagation();
            });
        }); 
    }

    get utilityDiv()         { return $("#" + this._utilityID); }
    get utilities()          { return this._utilities; }
    get app()                { return this._utilities.app; }
    get button()             { return $("#" + this._buttonID); }
    get div()                { return $("#" + this._divID); }

    _build() {
        const infoIcon = this._infoIcon;

        const button = "<button id = '" + this._buttonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + infoIcon + "</button>";
        const div = "<div id = '" + this._divID + "' class = 'popUpMenu hidden'></div>";

        this.utilityDiv.append(button + div);
        this.div.css("left", "0px");
        this.div.css("top", String(this.utilityDiv.position().top + 32) + "px");

        const data = this._data;

        data.import({});
        const sections = ["Introduction", "Overview", "Issues", "Energy Testing", "Determination", "Resolution", "Web App", "Final Thoughts"]
        sections.forEach((section, index) => {
            section[index] = { "name": section, "id": data.addChild({ "name": section }) }
        });

        this.manage(data.tierIds(0)[0]);
    }

    manage(picked) {
        const data = this._data;
        const selected = data.selected();
        if (selected == picked) { return; }

        //If picked has children, figure out which child is picked.
        if (data.hasChildren(picked)) {
            const descendants = data.descendants(picked).filter(id => selected.includes(id));
            //If there's no selected descendant, get first child of first child etc.
            if (descendants.length == 0) {
                while (data.hasChildren(picked)) {
                    picked = data.children(picked)[0];
                }
            }
            //If there's a descendant that's selected, change to most recently opened.
            else {
                picked = data.lastOpened(descendants);
            }
        }

        //If any sibling of picked is selected, unselect it.  Then select picked.
        data.siblings(picked).filter(id => selected.includes(id)).forEach(id => data.unSelect(id));
        data.select(picked);

        const path = data.idPath(picked);

        //Delete every div that doesn't contain an id that's in the path, or contains "siblings" in the id.
        $("#infoUtility").children()
            .filter(function() { return !["infoUtility_contents"].includes(this.id); })
            .forEach(function() {
                const parsed = this.id.split("_");
                const id = parseInt(parsed[1]);
                if (!path.includes(id) || parsed[2] == "siblings") { $(this).remove(); }
            });

        //Create all sibling divs for ids in the path that aren't yet created.
        var media = [];
        path.forEach(id => {
            const siblingsDivId = "#infoUtility_" + id + "_siblings";
            const siblingsDiv = $(siblingsDivId);
            //If the siblings is new, create it.  If not, adjust it so the 
            if (siblingsDiv.length == 0) {
                this.div.append("<div id = '" + siblingsDivId + "'></div>");
                data.siblings(id).forEach(sId => {
                    var button = "<button id = 'infoUtility_" + sId + "_button' class = 'btn ";
                    button += (sId == id) ? "btn-primary" : "btn-secondary";
                    button += "'";
                    if (sId == id) { button += " disabled"; }
                    button += ">" + data.value(sId, "name") + "</button>";
                    siblingsDiv.append(button);
                });
                const record = data.record(id);
                media = media.concat(data.keys(id).filter(key => ["children", "name"].includes(key)).map(key => [id, key, record[key]]));
            }
        });

        const contentsId = "infoUtility_contents";
        const contentsDiv = $("#" + contentsId);
        if (contentsDiv.length) {

        }
        else { this.div.append("<div id = '" + contentsId + "'></div>"); }

        media.forEach((id, key, value) => {
            const divId = "#infoUtility_" + id;
            this.div.append("<div id = '" + divId + "_" + key + "'></div>");
            const keyButton = divId + "_" + key + "_" + "Button";
            contentsDiv.append("<button id = '" + keyButton + "'>" + key + "</button>");

            switch (key) {
                case "video":
                    html += "<iframe width = 100% src='https://www.youtube.com/embed/" + value + "'></iframe>";
                    break;
                case "slide":
                    html += "<object data='public/slides/" + value + " '>";
                    break;
            }
            html += "</div>";
            $(divId + key).append(html);
            
            $(keyButton).on("click", (e) => {
                $("div [id^=" + divId + "]")              //select elements with an id that starts with divId
                    .filter(function() {                  //filter out all ids without 3 segments
                        const parts = this.id.split("_");                    //and 3rd segment == key)
                        return !(parts.length != 3 || parts[3] == key);
                    })
                    .hide(); //Hide all elements that start with divId but don't end with key
                $(divId + key).show();
                e.stopPropagation();
            });
        });
    }

    close(except) {
        if (except != this._buttonID)   {
            this.div.addClass("hidden");
            this.div.focusout();
        }
    }
}