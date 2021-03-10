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
        var id;

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
        data.siblings(picked).filter(id => selected.includes(id)).forEach(id => data.unSelect(id));
        data.select(picked);

        const path = data.idPath(picked);

        //For each div with an id of infoUtility followed by a number,
        for (var i = 0; i < this.div.children().length; i++) {
            var id = this.div.children().eq(i).attr("id");
            //if the path doesn't include the number, delete the div.
            if (!path.includes(parseInt(id.substring(11)))) {
                $("#" + id).remove();
            }
        }

        path.forEach(id => {
            const divId = "#infoUtility" + id;
            //Skip any divs with ids that are in the path.
            if ($(divId).length == 0) {
                this.div.append("<div id = '" + divId + "'></div>");
                $(divId).append("<div id = '" + divId + "Siblings'></div>");
                data.siblings(id).forEach(sibling => {
                    var button = "<button class = 'btn ";
                    button += (sibling == id) ? "btn-primary" : "btn-secondary";
                    button += "'";
                    if (sibling == id) { button += " disabled"; }
                    button +=">" + data.value(sibling, "name") + "</button>";
                    $(divId + "Siblings").append(button);
                });
                const record = data.record(id);
                const keys = data.keys(id).filter(key => ["children", "name"].includes(key));
                keys.forEach(key => {
                    html = "<div id = '" + divId + key + "'>";
                    switch (key) {
                        case "video":
                            html += "<iframe width = 100% src='https://www.youtube.com/embed/" + record[key] + "'></iframe>";
                            break;
                        case "html":
                            html += "<object data='public/slides/" + record[key] + " '>";
                            break;
                    }
                    html += "</div>";
                    $(divId).append(html);
                });
            }
        });
    }

    close(except) {
        if (except != this._buttonID)   {
            this.div.addClass("hidden");
            this.div.focusout();
        }
    }
}