/* utilities class links to sessions class
*/

class InfoUtility {
    _utilities = null;
    _utilityID = "infoUtility";

    _data = null;

    _infoIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-info-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path d='M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z'/><circle cx='8' cy='4.5' r='1'/></svg>";

    _buttonID = "infoUtilityButton";
    _divID = "infoUtilityWindow";
    _contentsDivID = "infoUtility_contents";
    _pathDivID = this._utilityID + "_path";
    _contentsDivID = this._utilityID + "_contents";
    _mediaDivID = this._utilityID + "_media";

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
    get contentsDiv()        { return $("#" + this._contentsDivID); }
    get pathDiv()            { return $("#" + this._pathDivID); }
    get contentsDiv()        { return $("#" + this._contentsDivID); } 
    get mediaDiv()           { return $("#" + this._mediaDivID); }
    siblingsDivId(id)        { return this._utilityID + "_" + id + "_siblings"; }
    siblingsDiv(id)          { return $("#" + this.siblingsDivId(id)); }
    siblingButtonId(id)      { return this._utilityID + "_" + id + "_button"; }
    siblingButton(id)        { return $("#" + this.siblingsButtonId(id)); }
    itemDivId(id, item)      { return this._utilityID + "_"  + id + "_" + item; }
    itemDiv(id, item)        { return $("#" + this.itemDivId(id, item)); }
    itemButtonId(id, item)   { return this._utilityID + "_"  + id + "_" + item + "_button"; }
    itemButton(id, item)     { return $("#" + this.itemButtonId(id, item)); }


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

        //If picked has children, figure out which descendant is picked.
        if (data.hasChildren(picked)) {
            const descendants = data.descendants(picked).filter(id => selected.includes(id));
            if (descendants.length > 0) {
                //If there's a descendant that's selected, change to most recently opened.
                picked = data.lastOpened(descendants);
            }
            else {
                while (data.hasChildren(picked)) {
                    //If no picked descendants, while picked has children, pick first child.
                    picked = data.children(picked)[0];
                }
            }
        }
        
        //If any sibling of picked is selected, unselect it.  Then select picked.
        data.siblings(picked).filter(id => selected.includes(id)).forEach(id => data.unSelect(id));
        data.select(picked);

        const path = data.idPath(picked);

        //Create all sibling divs for ids in the path.
        this.siblingsDiv.clear();
        var media = [];
        path.forEach(id => {
            this.pathDiv.append("<div id = '" + this.siblingsDivId(id) + "'></div>");
            data.siblings(id).forEach((sId, index) => {
                var button = "<button id = '" + this.siblingButtonId(sId) + "' class = 'btn ";
                button += (sId == id) ? "btn-primary" : "btn-secondary";
                button += "'";
                if (sId == id) { button += " disabled"; }
                button += ">";
                button += data.hasKey(sId, "name") ? data.value(sId, "name") : index + 1;
                button += "</button>";
                this.siblingsDiv(id).append(button);
            });
            const record = data.record(id);
            media = media.concat(data.keys(id).filter(item => !["children", "name"].includes(item)).map(item => [id, item, record[item]]));
        });

        //Delete all media divs whose id isn't in the path.
        this.mediaDiv.children().each(function() {
            const id = parseInt(this.id.split("_")[1]);
            if (!path.includes(id)) { $(this).remove(); }
        });

        //Add content to contentsDiv media divs
        this.contentsDiv.clear();
        media.forEach((id, item, value) => {
            this.contentsDiv.append("<div id = '" + this.itemDivId(id, item) + "'></div>");
            contentsDiv.append("<button id = '" + this.itemButtonId(id, item) + "'>" + item + "</button>");

            switch (key) {
                case "video":
                    html += "<iframe width = 100% src='https://www.youtube.com/embed/" + value + "'></iframe>";
                    break;
                case "slide":
                    html += "<object data='public/slides/" + value + " '>";
                    break;
            }
            this.mediaDiv.append("<div id = '" + this.itemDivId(id, item) + "' class = 'hidden'></div>");
            this.itemDiv(id, item).append(html);
            
            //If no item selected, default to first.  Otherwise, hide all unselected items and show selected one.
            this.itemButton(id).on("click", (e) => {
                const index = $(this).parent().index();
                this.mediaDiv.children().addClass("hidden");
                this.itemDiv(id, item).show();
                e.stopPropagation();
            });
        });
        if (this.mediaDiv.children().not(".hidden").length == 0) {
            this.mediaDiv.children().eq(1).removeClass("hidden");
        }
    }

    close(except) {
        if (except != this._buttonID)   {
            this.div.addClass("hidden");
            this.div.focusout();
        }
    }

    init() {
        const data = this._data;
        const root = data.import({});

        const slides = [
            {
                name: "Introduction",
                children: [
                    { slide: "" },
                    { slide: "" }
                ]
            },
            {
                name: "Issues",
                children: [
                    
                ]
            },
            {
                name: "Energy Testing",
                children: [
                    
                ]
            },
            {
                name: "Resolution",
                children: [
                    
                ]
            },
            {
                name: "Determination",
                children: [
                    
                ]
            },
            {
                name: "Web App",
                children: [
                    
                ]
            },
            {
                name: "Putting It All Together",
                children: [
                    
                ]
            },
            {
                name: "Final Thoughts",
                children: [
                    
                ]
            }
            
        ];

    }
}