class InfoUtility {
    constructor (utilities) {
        const self = this;
        this._utilities = utilities;
        this._data = new DataTree;
    
        this._infoIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-info-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path d='M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z'/><circle cx='8' cy='4.5' r='1'/></svg>";
        this._leftArrow = "<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' fill='currentColor' class='bi bi-arrow-left' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'/></svg>";
        this._rightArrow = "<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' fill='currentColor' class='bi bi-arrow-right' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'/></svg>";
        this._plus = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>';
        this._minus = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>';
        this._vert_dots = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>';
        
        this._utilityID = "infoUtility";
        this._buttonID        = this._utilityID + "Button";
        this._divID           = this._utilityID + "Window";
        this._pathDivID       = this._utilityID + "_path";
        this._mediaDivID      = this._utilityID + "_media";
        this._leftArrowDivID  = this._utilityID + "_prev";
        this._rightArrowDivID = this._utilityID + "_next";

        this._build();

        $(document).ready(function() {
            self.button.on("click", function(e) {
                self.utilities.close(self._buttonID);
                if (self.div.hasClass("hidden")) {
                    self.div.removeClass("hidden");
                    self.resize();
                }
                else {
                    self.close();
                }
                this.blur();
                e.stopPropagation();
            });

            $(window).resize(function()                    { self.resize(); });
            self.div.on("click", function(e)               { e.stopPropagation(); });
            self.leftArrowDiv.on("click", function(e)      { self.manage(self.previous()); });
            self.leftArrowDiv.on("mousedown", function(e)  { e.preventDefault(); });
            self.rightArrowDiv.on("click", function(e)     { self.manage(self.next()); });
            self.rightArrowDiv.on("mousedown", function(e) { e.preventDefault(); });
        });
    }

    get app()                { return this._utilities.app; }
    get utilities()          { return this._utilities; }
    get utilityDiv()         { return $("#" + this._utilityID); }
    get button()             { return $("#" + this._buttonID); }
    get div()                { return $("#" + this._divID); }
    get contentsDiv()        { return $("#" + this._contentsDivID); }
    get pathDiv()            { return $("#" + this._pathDivID); }
    get mediaDiv()           { return $("#" + this._mediaDivID); }
//    siblingsDivId(id)        { return this._utilityID + "_" + id + "_siblings"; }
//    siblingsDiv(id)          { return $("#" + this.siblingsDivId(id)); }
    siblingButtonId(id)      { return this._utilityID + "_" + id + "_button"; }
    siblingButton(id)        { return $("#" + this.siblingButtonId(id)); }
    itemDivId(id, item)      { return this._utilityID + "_"  + id + "_" + item; }
    itemDiv(id, item)        { return $("#" + this.itemDivId(id, item)); }
    itemButtonId(id, item)   { return this._utilityID + "_"  + id + "_" + item + "_button"; }
    itemButton(id, item)     { return $("#" + this.itemButtonId(id, item)); }
    get leftArrowDiv()       { return $("#" + this._leftArrowDivID); }
    get rightArrowDiv()      { return $("#" + this._rightArrowDivID); }
    get arrowsArea()         { return $("#" + this._leftArrowDivID + ", #" + this._mediaDivID + ", #" + this._rightArrowDivID); }

    _build() {
        const infoIcon = this._infoIcon;

        const button = "<button id = '" + this._buttonID + "' type = 'button' class = 'btn btn-warning btn-sm'>" + infoIcon + "</button>";
        const div = "<div id = '" + this._divID + "' class = 'hidden'></div>";
        const pathDiv = "<div id = '" + this._pathDivID + "'></div>";
        const mediaDiv = "<div id = '" + this._mediaDivID + "'></div>";
        const leftArrowDiv = "<div id = '" + this._leftArrowDivID + "'>" + this._leftArrow + "</div>";
        const rightArrowDiv = "<div id = '" + this._rightArrowDivID + "'>" + this._rightArrow + "</div>";

        this.utilityDiv.append(button + div);

        this.div.css("left", "0px");
        this.div.css("top", String(this.utilityDiv.position().top + 31) + "px");
        this.div.append(pathDiv + leftArrowDiv + mediaDiv + rightArrowDiv);

        this.resize();
        this.init();
        
        this.manage(this._data.tierIds(0)[0]);
    }

    resize() {
        const windowHeight = $(window).height();
        const utilitiesHeight = this.utilityDiv.outerHeight(true);
        const windowWidth = $(window).width();
        const pathWidth = this.pathDiv.outerWidth(true);

        this.div.css("height", String(windowHeight - utilitiesHeight) + "px");
        this.mediaDiv.css("width", String(windowWidth - pathWidth) + "px");
        this.mediaDiv.css("height", String(windowHeight - utilitiesHeight) + "px");
    }

    manage(picked) {
        const self = this;
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
        data.siblings(picked).filter(id => selected.includes(id)).forEach(id => data.unselect(id));
        data.select(picked);

        const path = data.idPath(picked).filter((item, index) => index != 0);

        //Create all sibling divs for ids in the path.
        this.pathDiv.empty();
        //console.log(path);
        var media = [];
        this.buildPath(path);
        path.forEach(id => {
            const record = data.record(id);
            media = media.concat(data.keys(id).filter(item => !["id", "children", "name", "creation", "lastOpened", "lastEdited"].includes(item)).map(item => [id, item, record[item]]));
        });
        //console.log(media);

        //Delete all media divs whose id isn't in the path.
        this.mediaDiv.children().each(function() {
            const id = parseInt(this.id.split("_")[1]);
            if (!path.includes(id)) { $(this).remove(); }
        });

        //Add content to contentsDiv media divs
        this.contentsDiv.empty();
        var code = "";
        media.forEach(ary => {
            const id = ary[0];
            const item = ary[1];
            const value = ary[2];
            //const name = title.join(" ― ");
            if (media.length > 1) {
                this.contentsDiv.append("<button id = '" + this.itemButtonId(id, item) + "' type = 'button' class = 'btn bth-primary btn-sm'>" + item + "</button>");
            }
            this.mediaDiv.append("<div id = '" + this.itemDivId(id, item) + "' class = 'hidden'></div>");
            //this.itemDiv(id, item).append("<h1>" + name + "</h1>");
            switch (item) {
                case "video":
                    this.itemDiv(id, item).append("<iframe width = 100% src='https://www.youtube.com/embed/" + value + "'></iframe>");
                    break;
                case "slide":
                    $.get("assets/slides/" + value, (code) => this.itemDiv(id, item).append(code));
                    //code = "<object data = 'assets/slides/" + value + " '>";
                    break;
            }
            //console.log("id:", id);
            //console.log("item:", item);
            //console.log("value:", value);
            
            //If no item selected, default to first.  Otherwise, hide all unselected items and show selected one.
            this.itemButton(id).on("click", (e) => {
                console.log("clicked", id, item, value);
                const index = $(this).parent().index();
                this.mediaDiv.children().addClass("hidden");
                this.itemDiv(id, item).show();
                e.stopPropagation();
            });

        });

        if (this.mediaDiv.children().not(".hidden").length == 0) {
            this.mediaDiv.children().eq(0).removeClass("hidden");
        }

        this.mediaDiv.parent().trigger("mousemove");
        this.resize();
    }

    buildPath(path) {
        const self = this;
        const data = this._data;       
        const id = path[0];
        data.siblings(id).forEach((sId, index) => {
            var button = "<div>";
            if (data.hasChildren(sId)) {
                if (sId == id) { button += this._minus; }
                else { button += this._plus; }
            }
            else { button += this._vert_dots; }
            button += "<button id = '" + this.siblingButtonId(sId) + "'";
            button += " class = 'btn btn-sm ";
            button += (sId == id && path.length == 1) ? "btn-primary" : "btn-link";
            button += "' value = " + sId;
            if (sId == id) { button += " disabled"; }
            button += ">";
            button += data.hasKey(sId, "name") ? data.value(sId, "name") : index + 1;
            button += "</button></div>";
            this.pathDiv.append(button);
            this.siblingButton(sId).parent().css("padding-left", (25 * (data.tier(sId) - 1)) + 5);
            if (sId == id && path.length > 1) { this.buildPath(path.slice(1)); }
            this.siblingButton(sId).on("click", function(e) {
                //console.log("clicked", this.value);
                self.manage(parseInt(this.value));
                e.stopPropagation();
            });
        });
    }

    previous() {
        const data = this._data;
        const current = parseInt(this.mediaDiv.children().not(".hidden").attr("id").split("_")[1]);
        const ids = data.sortByCreation(data.descendants(data.tierIds(0)[0]).filter(id => !data.hasChildren(id)));
        const index = ids.findIndex(id => id == current);
        return index == 0 ? ids[ids.length - 1] : ids[index - 1];
    }

    next() {
        const data = this._data;
        const current = parseInt(this.mediaDiv.children().not(".hidden").attr("id").split("_")[1]);
        const ids = data.sortByCreation(data.descendants(data.tierIds(0)[0]));
        const index = ids.findIndex(id => id == current);
        return index == ids.length - 1 ? ids[0] : ids[index + 1];
    }

    close(except) {
        if (except != this._buttonID)   {
            this.div.addClass("hidden");
            this.div.focusout();
        }
    }

    init() {
        const data = this._data;

        const slides = [
            {
                name: "Introduction",
                children: [
                    { name: "Invitation", slide: "introduction/invitation.html" },
                    {
                        name: "Quotes",
                        children: [
                            { name: "Sadhguru", slide: "introduction/sadhguru_quote.html" },
                            { name: "Eckhart Tolle", slide: "introduction/eckhart_tolle_quote.html" },
                            { name: "Dawson Church", slide: "introduction/dawson_church_quote.html" },
                            { name: "Natalie Marchant", slide: "introduction/natalie_marchant_quote.html" },
                            { name: "Emiliana Simon-Thomas", slide: "introduction/emiliana_simon-thomas_quote.html" },
                            { name: "David Hawkins", slide: "introduction/david_hawkins_quote.html" },
                        ]
                    },
                    { name: "Mind-Body Connection", slide: "introduction/mind_body_connection_article.html" },
                    { name: "What Are Unhealthy Emotions?", slide: "introduction/what_are_unhealthy_emotions.html" },
                    { name: "Energy Healing Techniques", slide: "introduction/energy_healing_techniques.html" },
                    { name: "Why Another Healing Technique?",  slide: "introduction/why_another_healing_technique.html" },
                ]
            },
            {
                name: "Overview",
                children: [
                    { name: "What Is Because Reasons?", slide: "overview/what_is_because_reasons.html" },
                    { name: "Issues", slide: "overview/issues.html" },
                    { name: "Energy Testing", slide: "overview/energy_testing.html" },
                    { name: "Determination and Resolution", slide: "overview/determination_and_resolution.html" },
                    { name: "Example",
                      children: [
                        { slide: "overview/because_reasons_example_1.html" },
                        { slide: "overview/because_reasons_example_2.html" },
                        { slide: "overview/because_reasons_example_3.html" }
                      ]
                    },
                    { name: "Web App", slide: "overview/web_app.html" },
                    { name: "Review", slide: "overview/review.html" },
                ]
            },
            {
                name: "Beginner",
                children: [
                    { name: "Becoming the Witness", slide: "beginner/buddha_quote.html" },
                    { name: "Observing your Thoughts", slide: "beginner/eckhart_tolle_quote.html" },
                    { name: "Overview", slide: "beginner/overview.html" },
                    {
                        name: "Issues",
                        children: [
                            { name: "Overview", slide: "beginner/issues/overview.html" },
                            { name: "Internal Conflict", slide: "beginner/issues/internal_conflict.html" },
                            { name: "Symptoms and Aspirations", slide: "beginner/issues/symptoms_and_aspirations.html" },
                            { name: "Resistance", slide: "beginner/issues/resistance.html" },
                            { name: "Components", slide: "beginner/issues/components.html" }
                        ]
                    },
                    {
                        name: "Energy Testing",
                        children: [
                            { name: "Overview", slide: "beginner/energy_testing/overview.html" },
                            {
                                name: "History",
                                children: [
                                    { name: "Scientific Basis", slide: "beginner/energy_testing/scientific_basis.html" },
                                    { name: "Foundations", slide: "beginner/energy_testing/history.html" },
                                    { name: "Methods and Practitioners", slide: "beginner/energy_testing/methods_and_practitioners.html" },
                                ]
                            },
                            { name: "Truth and Falsity", slide: "beginner/energy_testing/truth_and_falsity.html" },
                            { name: "Energy Testing in Because Reasons", slide: "beginner/energy_testing/energy_testing_in_because_reasons.html" },
                            {
                                name: "The Eye Method",
                                children: [
                                    { name: "Benefits", slide: "beginner/energy_testing/the_eye_testing_method.html" },
                                    { name: "Preparation", slide: "beginner/energy_testing/the_eye_method_2.html" },
                                    { name: "Steps", slide: "beginner/energy_testing/the_eye_method_3.html" }
                                ]
                            },
                            {
                                name: "Basic Steps",
                                children: [
                                    { slide: "beginner/energy_testing/basic_steps.html" },
                                    { slide: "beginner/energy_testing/basic_steps_example.html" },
                                    { slide: "beginner/energy_testing/basic_steps_example_2.html" }
                                ]
                            },
                            { name: "Example Statements", slide: "beginner/energy_testing/example_statements.html" },
                            { name: "Avoiding Influence", slide: "beginner/energy_testing/avoiding_influence.html" }
                        ]
                    },
                    {
                        name: "Determination",
                        children: [
                            { name: "Overview", slide: "beginner/determination/overview.html" },
                            { name: "Physical Body", slide: "beginner/determination/physical_body.html" },
                            { name: "Senses", slide: "beginner/determination/senses.html" },
                            {
                                name: "Emotions",
                                children: [
                                    { name: "Overview", slide: "beginner/determination/emotions/emotions_1.html" },
                                    { name: "List", slide: "beginner/determination/emotions/emotions_list.html" },
                                ]
                            },
                            {
                                name: "Psychological Reversals",
                                children: [
                                    { name: "Overview", slide: "beginner/determination/psychological_reversals/overview.html" },
                                    { name: "Characteristics", slide: "beginner/determination/psychological_reversals/characteristics.html" },
                                    { name: "Example", slide: "beginner/determination/psychological_reversals/example_1.html" },
                                    { name: "Example", slide: "beginner/determination/psychological_reversals/example_2.html" }
                                ]
                            },
                            {
                                name: "Binary Search Method",
                                children: [
                                    { name: "Process", slide: "beginner/determination/binary_search_method.html" },
                                    { name: "Example", slide: "beginner/determination/binary_search_method_2.html" }
                                ]
                            }
                        ]
                    },
                    {
                        name: "Resolution",
                        children: [
                            { name: "Overview", slide: "beginner/resolution/overview.html" },
                            { name: "Sufficient Determination", slide: "beginner/resolution/sufficient_determination.html" },
                            { name: "Resolution Command", slide: "beginner/resolution/resolution_command.html" },
                            { name: "Subconscious Work", slide: "beginner/resolution/subconscious_work.html" },
                            { name: "Energy Test Response", slide: "beginner/resolution/energy_test_response.html" },
                            { name: "Inhalation", slide: "beginner/resolution/a_yawn_or_deep_breath.html" },
                            { name: "Observed Response", slide: "beginner/resolution/somatic_or_cognitive_response.html" }
                        ]
                    },
                    {
                        name: "Web App",
                        children: [
                            { name: "Overview", slide: "beginner/web_app/overview.html" },
                            { name: "User Settings", slide: "beginner/web_app/user_settings.html" },
                            { name: "Data Manager", slide: "beginner/web_app/data_manager.html" },
                            { name: "Account Switching / Creation", slide: "beginner/web_app/user_other.html" },
                            { name: "Clients / Issues / Sessions", slide: "beginner/web_app/client_issue_session.html" },
                            { name: "Session Editor", slide: "beginner/web_app/current_session_editor.html" },
                            { name: "Component Buttons", slide: "beginner/web_app/component_buttons.html" },
                            { name: "Current Bugs", slide: "beginner/web_app/bugs.html" }
                        ]
                    },
                    { name: "Tips", slide: "beginner/tips.html" },
                    { name: "Gameplay", slide: "beginner/review.html" }
                ]
            },
            {
                name: "Intermediate",
                children: [
                    { name: "Letting Go", slide: "intermediate/basic_principals_for_letting_go.html" },
                    { name: "Follow Your Intuition", slide: "intermediate/albert_einstein_quote.html" },
                    {
                        name: "Energy Testing",
                        children: [
                            { name: "Statement Semantics", slide: "intermediate/energy_testing/statement_semantics.html" },
                            { name: "Multiple Component Responses", slide: "intermediate/energy_testing/multiple_component_responses.html" },
                            { name: "Improving Responses", slide: "intermediate/energy_testing/improving_responses.html" },
                            { name: "Adjusting Statements", slide: "intermediate/energy_testing/adjusting_statements.html" },
                        ]
                    },
                    {
                        name: "Determination",
                        children: [
                            {
                                name: "Consciousness Levels",
                                children: [
                                    { name: "Overview", slide: "intermediate/determination/consciousness_levels/overview.html" },
                                    { name: "Dr. Hawkins Quote 1", slide: "intermediate/determination/consciousness_levels/david_hawkins_quote_1.html" },
                                    { name: "Dr. Hawkins Quote 2", slide: "intermediate/determination/consciousness_levels/david_hawkins_quote_2.html" },
                                    { name: "A Definition", slide: "intermediate/determination/consciousness_levels/level_of_consciousness.html" }
                                ]
                            },
                            {
                                name: "Emotions",
                                children: [
                                    { name: "Overview", slide: "intermediate/determination/emotions/emotions_1.html" },
                                    { name: "List", slide: "intermediate/determination/emotions/emotions_2.html" },
                                    { name: "Observations", slide: "intermediate/determination/emotions/emotions_3.html" },
                                    { name: "Characteristics", slide: "intermediate/determination/emotions/emotions_4.html" }
                                ]
                            },
                            { name: "Parts", slide: "intermediate/determination/parts.html" },
                            {
                                name: "Components of Events",
                                children: [
                                    { name: "Overview", slide: "intermediate/determination/events/overview.html" },
                                    { name: "Time", slide: "intermediate/determination/events/time.html" },
                                    { name: "Time Life Instance", slide: "intermediate/determination/events/time_life_instance.html" },
                                    { name: "Actions", slide: "intermediate/determination/events/actions.html" },
                                    { name: "Location Types", slide: "intermediate/determination/events/location_types.html" },
                                    { name: "Individual Types", slide: "intermediate/determination/events/individuals.html" },
                                    { name: "Item Types", slide: "intermediate/determination/events/items.html" },
                                    { name: "Characteristics", slide: "intermediate/determination/events/characteristics.html" }
                                ]
                            },
                            {
                                name: "Energy System",
                                children: [
                                    { name: "Overview", slide: "intermediate/determination/energy_system/overview.html" },
                                    { name: "Aura", slide: "intermediate/determination/energy_system/aura.html" },
                                    { name: "Subtle Energy Bodies", slide: "intermediate/determination/energy_system/subtle_energy_bodies.html" },
                                    { name: "Hara Line", slide: "intermediate/determination/energy_system/hara_line.html" },
                                    { name: "Meridians", slide: "intermediate/determination/energy_system/meridians.html" },
                                ]
                            },
                            {
                                name: "Numbers",
                                children: [
                                    {
                                        name: "Binary Search Method",
                                        children: [
                                            { name: "Process", slide: "intermediate/determination/binary_search_method.html" },
                                            { name: "Example", slide: "intermediate/determination/binary_search_method_2.html" }
                                        ]
                                    },
                                    { name: "Precision", slide: "intermediate/determination/numbers/precision.html" },
                                    { name: "Process", slide: "intermediate/determination/numbers/numbers.html" },
                                    { name: "Example", slide: "intermediate/determination/numbers/example_1.html" },
                                    { name: "Example", slide: "intermediate/determination/numbers/example_2.html" },
                                    { name: "Example", slide: "intermediate/determination/numbers/example_3.html" }
                                ]
                            },
                            { name: "Stacks", slide: "intermediate/determination/stacks.html" },
                            { name: "Characteristics", slide: "intermediate/determination/characteristics.html" }
                        ]
                    },
                    {
                        name: "Issues",
                        children: [
                            { name: "Affirmations", slide: "intermediate/issues/affirmations.html" },
                            { name: "Tail-Enders", slide: "intermediate/issues/tail_enders.html" },
                            { name: "Triggers", slide: "intermediate/issues/triggers.html" },
                            {
                                name: "Example",
                                children: [
                                    { slide: "intermediate/issues/example_1.html" },
                                    { slide: "intermediate/issues/example_2.html" },
                                    { slide: "intermediate/issues/example_3.html" }
                                ]
                            }
                        ]
                    },
                    { name: "Tips", slide: "intermediate/tips.html" },
                ]
            },
            {
                name: "Advanced",
                children: [
                    { name: "William Buhlman Quote", slide: "advanced/william_buhlman_quote.html" },
                    { name: "Issues", slide: "advanced/issues.html" },
                    {
                        name: "Energy Testing",
                        children: [
                            { name: "Statement Semantics", slide: "advanced/energy_testing/statement_semantics_2.html" },
                            { name: "Number Comparison", slide: "advanced/energy_testing/number_comparison.html" },
                            { name: "Ranges and Limits", slide: "advanced/energy_testing/ranges_and_limits.html" },
                        ]
                    },
                    {
                        name: "Determination",
                        children: [
                            {
                                name: "Numbers",
                                children: [
                                    { name: "Scientific Notation", slide: "advanced/determination/numbers/scientific_notation.html" },
                                    { name: "Process", slide: "advanced/determination/numbers/numbers.html" },
                                    { name: "Example", slide: "advanced/determination/numbers/example_1.html" },
                                    { name: "Example", slide: "advanced/determination/numbers/example_2.html" },
                                    { name: "Example", slide: "advanced/determination/numbers/example_3.html" },
                                    { name: "Nonstandard Powers", slide: "advanced/determination/numbers/powers.html" }
                                ]
                            },
                            {
                                name: "Consciousness Levels",
                                children: [
                                    { name: "Richard Rudd Quote", slide: "advanced/determination/consciousness_levels/richard_rudd_quote.html" },
                                    { name: "Implicit Lower Groups", slide: "advanced/determination/consciousness_levels/implicit_lower_groups.html" }
                                ]
                            },
                            { name: "Low-Level Energies", slide: "advanced/determination/low_level_energies.html" },
                            { name: "Ascended Masters", slide: "advanced/determination/ascended_masters.html" },
//                            { name: "Source Creator System", slide: "advanced/determination/source_creator_system.html" },
//                            {
//                                name: "Planar Witness System",
//                                children: [
//                                    { name: "Chakras", slide: "advanced/determination/energy_system/chakras.html" },
//                                    { name: "Discussion", slide: "advanced/determination/energy_system/chart_notes.html" },
//                                    { name: "Chart", slide: "advanced/determination/energy_system/planar_witness_system.html" },
//                                ]
//                            },
                            { name: "States", slide: "advanced/determination/states.html" },
                            { name: "Conjunctions", slide: "advanced/determination/conjunctions.html" },
                        ]
                    },
                    { name: "Divination", slide: "advanced/divination.html" },
                    { name: "Working With Others", slide: "advanced/working_with_others.html" },
                    { name: "Tips", slide: "advanced/tips.html" },
                    {
                        name: "Real Health",
                        children: [
                            { slide: "final_thoughts/closing_remarks_1.html" },
                            { slide: "final_thoughts/closing_remarks_2.html" },
                            { slide: "final_thoughts/closing_remarks_3.html" },
                            { slide: "final_thoughts/closing_remarks_4.html" },
                            { slide: "final_thoughts/closing_remarks_5.html" }
                        ]
                    },
                    { name: "MLK Quote", slide: "final_thoughts/martin_luther_king_jr_quote.html" },
                ]
            },
            { name: "Legal Stuff", slide: "legal_stuff.html" },
            { name: "About Me", slide: "about_me.html" },
        ];

        const parentId = data.import({});
        slides.forEach(slide => { this.importSlide(parentId, slide); });
    }

    importSlide(parentId, slide) {
        const record = jQuery.extend({}, slide);
        const hasChildren = slide.hasOwnProperty("children");
        if (hasChildren) { delete record.children; }
        const id = this._data.addChild(parentId, record);
        if (hasChildren) { slide.children.forEach(child => this.importSlide(id, child)); }
    }
}