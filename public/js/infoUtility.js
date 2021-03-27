class InfoUtility {
    _utilities = null;
    _utilityID = "infoUtility";

    _data = null;

    _infoIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-info-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path d='M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z'/><circle cx='8' cy='4.5' r='1'/></svg>";
    _leftArrow = "<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' fill='currentColor' class='bi bi-arrow-left' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'/></svg>";
    _rightArrow = "<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' fill='currentColor' class='bi bi-arrow-right' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'/></svg>";

    _buttonID = this._utilityID + "Button";
    _divID = this._utilityID + "Window";
    _contentsDivID = this._utilityID + "_contents";
    _pathDivID = this._utilityID + "_path";
    _contentsDivID = this._utilityID + "_contents";
    _mediaDivID = this._utilityID + "_media";
    _leftArrowDivID = this._utilityID + "_prev";
    _rightArrowDivID = this._utilityID + "_next";

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

            $(window).resize(function()                        { self.resize(); });
            self.div.on("click", function(e)                   { e.stopPropagation(); });

            self.mediaDiv.parent().on('mousemove', function(e) { self.mouseMove(e.pageX, e.pageY); });

            self.mediaDiv.parent().on('mouseout', function(e)  { self.mouseOut(); });

            self.mediaDiv.parent().on("click", function(e)     { self.mouseClick(e.pageX, e.pageY);

            });
        }); 
    }

    get app()                { return this._utilities.app; }
    get utilities()          { return this._utilities; }
    get utilityDiv()         { return $("#" + this._utilityID); }
    get button()             { return $("#" + this._buttonID); }
    get div()                { return $("#" + this._divID); }
    get contentsDiv()        { return $("#" + this._contentsDivID); }
    get pathDiv()            { return $("#" + this._pathDivID); }
    get contentsDiv()        { return $("#" + this._contentsDivID); } 
    get mediaDiv()           { return $("#" + this._mediaDivID); }
    siblingsDivId(id)        { return this._utilityID + "_" + id + "_siblings"; }
    siblingsDiv(id)          { return $("#" + this.siblingsDivId(id)); }
    siblingButtonId(id)      { return this._utilityID + "_" + id + "_button"; }
    siblingButton(id)        { return $("#" + this.siblingButtonId(id)); }
    itemDivId(id, item)      { return this._utilityID + "_"  + id + "_" + item; }
    itemDiv(id, item)        { return $("#" + this.itemDivId(id, item)); }
    itemButtonId(id, item)   { return this._utilityID + "_"  + id + "_" + item + "_button"; }
    itemButton(id, item)     { return $("#" + this.itemButtonId(id, item)); }
    get leftArrowDiv()       { return $("#" + this._leftArrowDivID); }
    get rightArrowDiv()      { return $("#" + this._rightArrowDivID); }

    _build() {
        const infoIcon = this._infoIcon;

        const button = "<button id = '" + this._buttonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + infoIcon + "</button>";
        const div = "<div id = '" + this._divID + "' class = 'hidden'></div>";
        const pathDiv = "<div id = '" + this._pathDivID + "' class = 'btn-group-sm' role = 'group'></div>";
        const contentsDiv = "<div id = '" + this._contentsDivID + "' class = 'btn-group-sm' role = 'group'></div>";
        const mediaDiv = "<div id = '" + this._mediaDivID + "'></div>";
        const leftArrowDiv = "<div id = '" + this._leftArrowDivID + "'>" + this._leftArrow + "</div>";
        const rightArrowDiv = "<div id = '" + this._rightArrowDivID + "'>" + this._rightArrow + "</div>";


        this.utilityDiv.append(button + div);

        this.div.css("left", "0px");
        this.div.css("top", String(this.utilityDiv.position().top + 31) + "px");
        this.resize();

        this.div.append(pathDiv + contentsDiv + "<div>" + leftArrowDiv + mediaDiv + rightArrowDiv + "</div>");
        this.leftArrowDiv.css("left", "0px");
        console.log(this.rightArrowDiv);

        this.init();
        this.mouseOut();
        
        this.manage(this._data.tierIds(0)[0]);
    }

    resize() {
        this.div.css("height", String($(window).height() - 32));
        this.div.css("width", String($(window).width()));
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
        var media = [];
        //var title = [];
        path.forEach(id => {
            this.pathDiv.append("<div id = '" + this.siblingsDivId(id) + "'></div>");
            data.siblings(id).forEach((sId, index) => {
                var button = "<button id = '" + this.siblingButtonId(sId) + "' class = 'btn btn-sm ";
                button += (sId == id) ? "btn-primary" : "btn-secondary";
                button += "' value = " + sId;
                if (sId == id) { button += " disabled"; }
                button += ">";
                button += data.hasKey(sId, "name") ? data.value(sId, "name") : index + 1;
                button += "</button>";
                this.siblingsDiv(id).append(button);
                this.siblingButton(sId).on("click", function(e) {
                    console.log("clicked", this.value);
                    self.manage(parseInt(this.value));
                });
                //if (sId == id) { title.push(data.hasKey(sId, "name") ? data.value(sId, "name") : index + 1); }
            });

            const record = data.record(id);
            media = media.concat(data.keys(id).filter(item => !["id", "children", "name", "creation", "lastOpened", "lastEdited"].includes(item)).map(item => [id, item, record[item]]));
        });
        console.log(media);

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
            console.log("id:", id);
            console.log("item:", item);
            console.log("value:", value);
            
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
    }

    mouseMove(pageX, pageY) {
        switch (this.mouseInThird(pageX, pageY)) {
            case -1:
                if (this.leftArrowDiv.find("svg").hasClass("invisible")) {
                    this.leftArrowDiv.find("svg").removeClass("invisible");
                }
                break;
            case 0:
                this.mouseOut();
                break;
            case 1: 
            if (this.rightArrowDiv.find("svg").hasClass("invisible")) {
                this.rightArrowDiv.find("svg").removeClass("invisible");
                }
                break;
        }
    }

    mouseClick(pageX, pageY) {
        switch (this.mouseInThird(pageX, pageY)) {
            case -1:
                this.manage(this.previous());
                break;
            case 0:
                break;
            case 1: 
                this.manage(this.next());
                break;
        }
    }

    mouseInThird(pageX, pageY) {
        const div = this.mediaDiv.parent();
        const xPos = pageX - div.position().left;
        const yPos = pageY - div.position().top;
        const width = div.outerWidth();
        const third = width / 3;
        const height = div.outerHeight();
        const betweenTopAndBottom = yPos >= 0 && yPos <= height;
        const inLeftThird = (xPos >= 0 && xPos <= third && betweenTopAndBottom);
        const inRightThird = (xPos <= width && xPos >= (width - third) && betweenTopAndBottom);
        return inLeftThird ? -1 : inRightThird ? 1 : 0;
    }

    mouseOut() {
//        if (!this.leftArrowDiv.find("svg").hasClass("invisible"))  {
            this.leftArrowDiv.find("svg").addClass("invisible");
//        }
//        else if (!this.rightArrowDiv.find("svg").hasClass("invisible")) {
            this.rightArrowDiv.find("svg").addClass("invisible");
//        }
    }

    previous() {
        const data = this._data;
        const current = parseInt(this.mediaDiv.children().not(".hidden").attr("id").split("_")[1]);
        const ids = data.sortByCreation(data.descendants(data.tierIds(0)[0]));
        const index = ids.findIndex(id => id == current);
        return index == 0 ? ids[ids.length - 1] : ids[index - 1];
    }

    next() {
        const data = this._data;
        const current = parseInt(this.mediaDiv.children().not(".hidden").attr("id").split("_")[1]);
        const ids = data.sortByCreation(data.descendants(data.tierIds(0)[0]));
        console.log(current, ids);
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
                    { name: "Mind-Body Connection", slide: "introduction/mind_body_connection_article.html" },
                    {
                        name: "Quotes",
                        children: [
                            { name: "William Buhlman", slide: "introduction/william_buhlman_quote.html" },
                            { name: "Sadhguru", slide: "introduction/sadhguru_quote.html" },
                            { name: "Eckhart Tolle", slide: "introduction/eckhart_tolle_quote.html" },
                            { name: "Dawson Church", slide: "introduction/dawson_church_quote.html" },
                            { name: "Natalie Marchant", slide: "introduction/natalie_marchant_quote.html" },
                            { name: "Emiliana Simon-Thomas", slide: "introduction/emiliana_simon-thomas_quote.html" },
                            { name: "David Hawkins", slide: "introduction/david_hawkins_quote.html" },
                        ]
                    },
                    {
                        name: "What Are Unhealthy Emotions?",
                        children: [
                            { slide: "introduction/what_are_unhealthy_emotions_1.html" },
                            { slide: "introduction/what_are_unhealthy_emotions_2.html" }
                        ]
                    },
                    { name: "Energy Healing Techniques", slide: "introduction/energy_healing_techniques.html" },
                    { name: "Why Another Healing Technique",  slide: "introduction/why_another_healing_technique.html" },
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
                    { name: "Review", slide: "overview/review.html" },
                ]
            },
            {
                name: "Beginner",
                children: [
                    { name: "Overview", slide: "beginner/overview.html" },
                    {
                        name: "Issues",
                        children: [
                            { name: "Becoming the Witness", slide: "beginner/issues/buddha_quote.html" },
                            { name: "Overview", slide: "beginner/issues/overview.html" },
                            { name: "Internal Conflict", slide: "beginner/issues/internal_conflict.html" },
                            { name: "Sensations, Emotions, and Thoughts", slide: "beginner/issues/components.html" },
                            { name: "Identification", slide: "beginner/issues/identification.html" },
                            { name: "Secondary Gain", slide: "beginner/issues/secondary_gain.html" },
                            { name: "Review", slide: "beginner/issues/review.html" }
                        ]
                    },
                    {
                        name: "Energy Testing",
                        children: [
                            { name: "Overview", slide: "beginner/energy_testing/overview.html" },
                            { name: "Scientific Basis", slide: "beginner/energy_testing/scientific_basis.html" },
                            { name: "History", slide: "beginner/energy_testing/history.html" },
                            { name: "Methods and Practitioners", slide: "beginner/energy_testing/methods_and_practitioners.html" },
                            { name: "Truth and Falsity", slide: "beginner/energy_testing/truth_and_falsity.html" },
                            {
                                name: "Basic Steps",
                                children: [
                                    { slide: "beginner/energy_testing/basic_steps.html" },
                                    { slide: "beginner/energy_testing/basic_steps_example.html" },
                                    { slide: "beginner/energy_testing/basic_steps_example_2.html" }
                                ]
                            },
                            { name: "Example Statements", slide: "beginner/energy_testing/example_statements.html" },
                            {
                                name: "The Eye Method",
                                children: [
                                    { name: "Benefits", slide: "beginner/energy_testing/the_eye_testing_method.html" },
                                    { name: "Preparation", slide: "beginner/energy_testing/the_eye_method_2.html" },
                                    { name: "Steps", slide: "beginner/energy_testing/the_eye_method_3.html" }
                                ]
                            },
                            { name: "Energy Testing in Because Reasons", slide: "beginner/energy_testing/energy_testing_in_because_reasons.html" },
                            { name: "Review", slide: "beginner/determination/psychological_reversals/review.html" }
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
                                    { name: "List", slide: "beginner/determination/emotions/emotions_2.html" },
                                ]
                            },
                            {
                                name: "Psychological Reversals",
                                children: [
                                    { name: "Overview", slide: "beginner/determination/psychological_reversals/psychological_reversals_1.html" },
                                    { name: "Characteristics", slide: "beginner/determination/psychological_reversals/psychological_reversals_2.html" },
                                    { name: "Example", slide: "beginner/determination/psychological_reversals/psychological_reversals_3.html" },
                                    { name: "Example", slide: "beginner/determination/psychological_reversals/psychological_reversals_4.html" }
                                ]
                            },
                            {
                                name: "Patterns",
                                children: [
                                    { name: "Overview", slide: "beginner/determination/patterns/overview.html" },
                                    { name: "Attachment", slide: "beginner/determination/patterns/attachment.html" },
                                    { name: "Identification", slide: "beginner/determination/patterns/identification.html" },
                                    { name: "Resistance", slide: "beginner/determination/patterns/resistance.html" }
                                ]
                            },
                            { name: "Review", slide: "beginner/determination/psychological_reversals/review.html" }
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
                            { name: "Observed Response", slide: "beginner/resolution/somatic_or_cognitive_response.html" },
                            { name: "Review", slide: "beginner/resolution/review.html" },
                        ]
                    },
                    { name: "Review", slide: "beginner/review.html"}
                ]
            },
            {
                name: "Intermediate",
                children: [
                    { name: "Overview", slide: "intermediate/overview.html" },
                    {
                        name: "Issues",
                        children: [
                            { name: "Overview", slide: "intermediate/issues/overview.html" },
                            { name: "Aspirations", slide: "intermediate/issues/aspirations.html" },
                            { name: "Affirmations", slide: "intermediate/issues/affirmations.html" },
                            { name: "Tail-Enders", slide: "intermediate/issues/tail_enders.html" },
                            { name: "Triggers", slide: "intermediate/issues/triggers.html" },
                            { name: "Review", slide: "intermediate/issues/review.html" }
                        ]
                    },
                    {
                        name: "Energy Testing",
                        children: [
                            { name: "Overview", slide: "intermediate/energy_testing/overview.html" },
                            { name: "Statement Semantics", slide: "intermediate/energy_testing/statement_semantics.html" },
                            { name: "Avoiding Influence", slide: "intermediate/energy_testing/avoiding_influence.html" },
                            { name: "Improving Responses", slide: "intermediate/energy_testing/improving_responses.html" },
                            { name: "Adjusting Statements", slide: "intermediate/energy_testing/adjusting_statements.html" },
                            {
                                name: "Binary Search Method",
                                children: [
                                    { slide: "intermediate/energy_testing/binary_search_method.html" },
                                    { slide: "intermediate/energy_testing/binary_search_method_2.html" }
                                ]
                            },
                            { name: "Review", slide: "intermediate/determination/psychological_reversals/review.html" }
                        ]
                    },
                    {
                        name: "Determination",
                        children: [
                            { name: "Overview", slide: "intermediate/determination/overview.html" },
                            {
                                name: "Consciousness Levels",
                                children: [
                                    { name: "Overview", slide: "intermediate/determination/consciousness_levels/overview.html" },
                                    { name: "Dr. Hawkins Quote 1", slide: "intermediate/determination/consciousness_levels/david_hawkins_quote_1.html" },
                                    { name: "Dr. Hawkins Quote 2", slide: "intermediate/determination/consciousness_levels/david_hawkins_quote_2.html" },
                                    { name: "Implicit Lower Groups", slide: "intermediate/determination/consciousness_levels/implicit_lower_groups.html" },
                                    { name: "Richard Rudd Quote", slide: "intermediate/determination/consciousness_levels/richard_rudd_quote.html" },
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
                                    { name: "Chakras", slide: "intermediate/determination/energy_system/chakras.html" },
                                    { name: "Typical Chakra Components", slide: "intermediate/determination/energy_system/chakras_2.html" },
                                    { name: "Hara Line", slide: "intermediate/determination/energy_system/hara_line.html" },
                                    { name: "Meridians", slide: "intermediate/determination/energy_system/meridians.html" },
                                ]
                            },
                            { name: "Numbers", slide: "intermediate/determination/numbers.html" },
                            { name: "Characteristics", slide: "intermediate/determination/characteristics.html" },
                            { name: "Review", slide: "intermediate/determination/review.html" }
                        ]
                    },
                    { name: "Review", slide: "intermediate/review.html"}
                ]
            },
            {
                name: "Advanced",
                children: [
                    { name: "Overview", slide: "advanced/overview.html" },
                    {
                        name: "Energy Testing",
                        children: [
                            { name: "Overview", slide: "advanced/energy_testing/overview.html" },
                            { name: "Complex Responses", slide: "advanced/energy_testing/complex_responses.html" },
                            { name: "Statement Semantics", slide: "intermediate/energy_testing/statement_semantics_2.html" },
                            { name: "Number Comparison", slide: "advanced/energy_testing/number_comparison.html" },
                            { name: "Ranges and Limits", slide: "advanced/energy_testing/ranges_and_limits.html" },
                            { name: "Review", slide: "advanced/energy_testing/review.html" }
                        ]
                    },
                    {
                        name: "Determination",
                        children: [
                            { name: "Overview", slide: "advanced/determination/overview.html" },
                            { name: "Low-Level Energies", slide: "advanced/determination/low_level_energies.html" },
                            { name: "Ascended Masters", slide: "advanced/determination/ascended_masters.html" },
                            { name: "Source Creator System", slide: "advanced/determination/source_creator_system.html" },
                            {
                                name: "Conjunctions",
                                children: [
                                    { name: "Overview", slide: "advanced/determination/conjunctions/overview.html" },
                                    { name: "Chart", slide: "advanced/determination/conjunctions/overview_2.html" },
                                    { name: "Discussion", slide: "advanced/determination/conjunctions/overview_3.html" }
                                ]
                            },
                            { name: "States", slide: "advanced/determination/states.html" },
                            { name: "Review", slide: "advanced/determination/review.html" }
                        ]
                    },
                    { name: "Review", slide: "advanced/review.html"}
                ]
            },
            {
                name: "Web App",
                children: [
                    
                ]
            },
            {
                name: "Process",
                children: [
                    { name: "What is Because Reasons?", slide: "process/what_is_because_reasons.html" },
                    { name: "Overview", slide: "process/overview.html" },
                    { name: "Gameplay", slide: "process/gameplay.html" },
                    { name: "Changes in Symptoms", slide: "process/changes_in_symptoms.html" },
                    { name: "Ongoing Issues", slide: "process/ongoing_issues.html" },
                    { name: "Follow Your Intuition", slide: "process/albert_einstein_quote.html" },
                    { name: "Divination", slide: "process/divination.html" },
                    { name: "Working With Others", slide: "process/working_with_others.html" }
                ]
            },
            {
                name: "Example Session",
                children: [
                    { slide: "example_session/what_is_because_reasons.html" }
                ]
            },
            {
                name: "Final Thoughts",
                children: [
                    { name: "Continual Use", slide: "final_thoughts/overview.html" },
                    { name: "Letting Go", slide: "final_thoughts/basic_principals_for_letting_go.html" },
                    {
                        name: "The Consciousness Level of Health",
                        children: [
                            { slide: "final_thoughts/closing_remarks_1.html" },
                            { slide: "final_thoughts/closing_remarks_2.html" },
                            { slide: "final_thoughts/closing_remarks_3.html" },
                            { slide: "final_thoughts/closing_remarks_4.html" },
                            { slide: "final_thoughts/closing_remarks_5.html" }
                        ]
                    },
                    { name: "MLK Quote", slide: "final_thoughts/martin_luther_king_jr_quote.html" }
                ]
            }
        ];

        const parentId = data.import({});
        slides.forEach(slide => { this.importSlide(parentId, slide); });

//        about_me.html
//        disclaimer.html
    }

    importSlide(parentId, slide) {
        const record = jQuery.extend({}, slide);
        const hasChildren = slide.hasOwnProperty("children");
        if (hasChildren) { delete record.children; }
        const id = this._data.addChild(parentId, record);
        if (hasChildren) { slide.children.forEach(child => this.importSlide(id, child)); }
    }
}