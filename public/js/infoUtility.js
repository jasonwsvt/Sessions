class InfoUtility {
    _utilities = null;
    _utilityID = "infoUtility";

    _data = null;

    _infoIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-info-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path d='M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z'/><circle cx='8' cy='4.5' r='1'/></svg>";
    _leftArrow = "<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' fill='currentColor' class='bi bi-arrow-left' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'/></svg>";
    _rightArrow = "<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' fill='currentColor' class='bi bi-arrow-right' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'/></svg>";

    _buttonID = "infoUtilityButton";
    _divID = "infoUtilityWindow";
    _contentsDivID = "infoUtility_contents";
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
                    //self.adjustArrowPositions();
                    this.blur();
                }
                else {
                    self.close();
                }
                e.stopPropagation();
            });

            $(window).resize(function(e) {
                self.resize();
            });

            self.div.on("click", function(e) {
                e.stopPropagation();
            });

            self.mediaDiv.on('mousemove', function(e) {
                self.mouseMove(e.pageX, e.pageY);
            });

            self.mediaDiv.on('mouseout', function(e) {
                self.mouseOut();
            });

            self.mediaDiv.on('resize', function(e) {
                self.adjustArrowPositions();
            });
            
            self.leftArrowDiv.on("click", function(e) {

            });
 
            self.rightArrowDiv.on("click", function(e) {

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
        const leftArrowDiv = "<div id = '" + this._leftArrowDivID + "' class = 'hidden'>" + this._leftArrow + "</div>";
        const rightArrowDiv = "<div id = '" + this._rightArrowDivID + "' class = 'hidden'>" + this._rightArrow + "</div>";


        this.utilityDiv.append(button + div);

        this.div.css("left", "0px");
        this.div.css("top", String(this.utilityDiv.position().top + 31) + "px");
        this.resize();

        this.div.append(pathDiv + contentsDiv + "<div>" + leftArrowDiv + mediaDiv + rightArrowDiv + "</div>");
        this.leftArrowDiv.css("left", "0px");
        console.log(this.rightArrowDiv);

        this.init();
        
        this.manage(this._data.tierIds(0)[0]);
    }

    resize() {
        this.div.css("height", String($(window).height() - 32));
        this.div.css("width", String($(window).width()));

        this.adjustArrowPositions();
    }

    mouseMove(pageX, pageY) {
        const leftHidden = this.leftArrowDiv.hasClass("hidden");
        const rightHidden = this.rightArrowDiv.hasClass("hidden");
        switch (this.mouseInThird(pageX, pageY)) {
            case -1: this.leftArrowDiv.removeClass("hidden");  break;
            case 0:  this.mouseOut();                          break;
            case 1:  this.rightArrowDiv.removeClass("hidden"); break;
        }
    }

    mouseInThird(pageX, pageY) {
        const xPos = pageX - this.mediaDiv.position().left;
        const yPos = pageY - this.mediaDiv.position().top;
        const width = this.mediaDiv.outerWidth();
        const third = width / 3;
        const height = this.mediaDiv.outerHeight();
        const betweenTopAndBottom = yPos >= 0 && yPos <= height;
        const inLeftThird = (xPos >= 0 && xPos <= third && betweenTopAndBottom);
        const inRightThird = (xPos <= width && xPos >= (width - third) && betweenTopAndBottom)
        return inLeftThird ? -1 : inRightThird ? 1 : 0;
    }

    mouseOut() {
        if (!this.leftArrowDiv.hasClass("hidden"))  { this.leftArrowDiv.addClass("hidden"); }
        else if (!this.rightArrowDiv.hasClass("hidden")) { this.rightArrowDiv.addClass("hidden"); }
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
            if (media.length > 1) {
                this.contentsDiv.append("<button id = '" + this.itemButtonId(id, item) + "' type = 'button' class = 'btn bth-primary btn-sm'>" + item + "</button>");
            }
            this.mediaDiv.append("<div id = '" + this.itemDivId(id, item) + "' class = 'hidden'></div>");
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
        //this.adjustArrowPositions();
    }

    adjustArrowPositions() {
        if (this.mediaDiv.length == 0 || this.mediaDiv.hasClass("hidden")) { return; }
        console.log(this.mediaDiv.height());
        while (this.mediaDiv.height() == 2) {
            console.log(this.mediaDiv.height());
        }
        const height = this.mediaDiv.outerHeight();
        const top = this.mediaDiv.position().top;
        const width = this.mediaDiv.outerWidth();
        const posY = Math.round(top + (height / 2) - 25);
        //console.trace();
        console.log(this.mediaDiv.outerHeight(), this.mediaDiv.height(), this.mediaDiv[0].clientHeight);
        console.log(height, this.mediaDiv.not(".hidden").length, this.mediaDiv.length);
        this.leftArrowDiv.css("top", String(posY) + "px");
        this.rightArrowDiv.css("top", String(posY) + "px");
        this.rightArrowDiv.css("left", String(width - 50) + "px");
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
                    { name: "Example",
                      children: [
                        { slide: "introduction/because_reasons_example_1.html" },
                        { slide: "introduction/because_reasons_example_2.html" },
                        { slide: "introduction/because_reasons_example_3.html" }
                      ]
                    },
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
                    { name: "Mind-Body Connection", slide: "introduction/mind_body_connection_article.html" },
                    {
                        name: "What Are Unhealthy Emotions?",
                        children: [
                            { slide: "introduction/what_are_unhealthy_emotions_1.html" },
                            { slide: "introduction/what_are_unhealthy_emotions_2.html" }
                        ]
                    },
                    { name: "Energy Healing Techniques", slide: "introduction/energy_healing_techniques.html" },
                    { name: "Why Another Healing Technique",  slide: "introduction/why_another_healing_technique.html" },
                    { name: "What Is Because Reasons?", slide: "introduction/what_is_because_reasons.html" },
                ]
            },
            {
                name: "Issues",
                children: [
                    { name: "Introduction", slide: "issues/what_is_because_reasons.html" },
                    { name: "Overview", slide: "issues/overview.html" },
                    { name: "Symptoms", slide: "issues/symptoms.html" },
                    { name: "Aspirations", slide: "issues/aspirations.html" },
                    { name: "Affirmations", slide: "issues/affirmations.html" },
                    { name: "Negative Sensations", slide: "issues/negative_sensations.html" },
                    { name: "Identification", slide: "issues/identification.html" },
                    { name: "Negative Thoughts", slide: "issues/negative_thoughts.html" },
                    { name: "Tail-Enders", slide: "issues/tail_enders.html" },
                    { name: "Secondary Gain", slide: "issues/secondary_gain.html" },
                    { name: "Examples", slide: "issues/examples.html" }
                ]
            },
            {
                name: "Energy Testing",
                children: [
                    { name: "What is Because Reasons", slide: "energy_testing/what_is_because_reasons.html" },
                    { name: "Introduction", slide: "energy_testing/overview.html" },
                    { name: "Overview", slide: "energy_testing/overview_2.html" },
                    { name: "Scientific Basis", slide: "energy_testing/scientific_basis.html" },
                    { name: "History", slide: "energy_testing/history.html" },
                    { name: "Methods and Practitioners", slide: "energy_testing/methods_and_practitioners.html" },
                    { name: "Truth and Falsity", slide: "energy_testing/truth_and_falsity.html" },
                    {
                        name: "Basic Steps",
                        children: [
                            { slide: "energy_testing/basic_steps.html" },
                            { slide: "energy_testing/basic_steps_example.html" },
                            { slide: "energy_testing/basic_steps_example_2.html" }
                        ]
                    },
                    {
                        name: "The Eye Method",
                        children: [
                            { slide: "energy_testing/the_eye_testing_method.html" },
                            { slide: "energy_testing/the_eye_method_2.html" },
                            { slide: "energy_testing/the_eye_method_3.html" }
                        ]
                    },
                    { name: "Avoiding Influence", slide: "energy_testing/avoiding_influence.html" },
                    { name: "Example Statements", slide: "energy_testing/example_statements.html" },
                    { name: "Improving Responses", slide: "energy_testing/improving_responses.html" },
                    { name: "Advanced Responses", slide: "energy_testing/advanced_responses.html" },
                    {
                        name: "Statement Semantics",
                        children: [
                            { slide: "energy_testing/statement_semantics.html" },
                            { slide: "energy_testing/statement_semantics_2.html" },
                        ]
                    },
                    {
                        name: "Number Comparison",
                        children: [
                            { slide: "energy_testing/number_comparison.html" },
                            { slide: "energy_testing/number_comparison_2.html" },
                        ]
                    },
                    {
                        name: "Binary Search Method",
                        children: [
                            { slide: "energy_testing/binary_search_method.html" },
                            { slide: "energy_testing/binary_search_method_2.html" }
                        ]
                    },
                    { name: "Adjusting Statements", slide: "energy_testing/adjusting_statements.html" },
                    { name: "Energy Testing in Because Reasons", slide: "energy_testing/energy_testing_in_because_reasons.html" }
                ]
            },
            {
                name: "Resolution",
                children: [
                    { name: "What is Because Reasons?", slide: "resolution/what_is_because_reasons.html" },
                    { name: "Overview", slide: "resolution/overview.html" },
                    { name: "Sufficient Determination", slide: "resolution/sufficient_determination.html" },
                    { name: "Resolution Command", slide: "resolution/resolution_command.html" },
                    { name: "Subconscious Work", slide: "resolution/subconscious_work.html" },
                    { name: "Energy Test Response", slide: "resolution/energy_test_response.html" },
                    { name: "Inhalation", slide: "resolution/a_yawn_or_deep_breath.html" },
                    { name: "Observed Response", slide: "resolution/somatic_or_cognitive_response.html" },
                ]
            },
            {
                name: "Determination",
                children: [
                    { name: "What is Because Reasons?", slide: "determination/what_is_because_reasons.html" },
                    { name: "Overview", slide: "determination/overview.html" },
                    { name: "Sections", slide: "determination/sections.html" },
                    { name: "Physical Body", slide: "determination/physical_body.html" },
                    { name: "Senses", slide: "determination/senses.html" },
                    {
                        name: "Consciousness Levels",
                        children: [
                            { name: "Overview", slide: "determination/consciousness_levels/overview.html" },
                            { name: "Dr. Hawkins Quote 1", slide: "determination/consciousness_levels/david_hawkins_quote_1.html" },
                            { name: "Dr. Hawkins Quote 2", slide: "determination/consciousness_levels/david_hawkins_quote_2.html" },
                            { name: "A Definition", slide: "determination/consciousness_levels/level_of_consciousness.html" },
                            { name: "", slide: "determination/consciousness_levels/level_connections.html" },
                            { name: "Implicit Lower Groups", slide: "determination/consciousness_levels/level_connections_2.html" },
                            { name: "Richard Rudd Quote", slide: "determination/consciousness_levels/richard_rudd_quote.html" }
                        ]
                    },
                    {
                        name: "Emotions",
                        children: [
                            { name: "Overview", slide: "determination/emotions/emotions_1.html" },
                            { name: "List", slide: "determination/emotions/emotions_2.html" },
                            { name: "Characteristics", slide: "determination/emotions/emotions_3.html" }
                        ]
                    },
                    {
                        name: "Psychological Reversals",
                        children: [
                            { name: "Overview", slide: "determination/psychological_reversals/psychological_reversals_1.html" },
                            { name: "Characteristics", slide: "determination/psychological_reversals/psychological_reversals_2.html" },
                            { name: "Example", slide: "determination/psychological_reversals/psychological_reversals_3.html" },
                            { name: "Example", slide: "determination/psychological_reversals/psychological_reversals_4.html" }
                        ]
                    },
                    {
                        name: "Patterns",
                        children: [
                            { name: "Overview", slide: "determination/patterns/overview.html" },
                            { name: "Attachment", slide: "determination/patterns/attachment.html" },
                            { name: "Identification", slide: "determination/patterns/identification.html" },
                            { name: "Resistance", slide: "determination/patterns/resistance.html" }
                        ]
                    },
                    { name: "Parts", slide: "determination/parts.html" },
                    {
                        name: "Events",
                        children: [
                            { name: "Overview", slide: "determination/events/overview.html" },
                            { name: "Time", slide: "determination/events/time.html" },
                            { name: "Time Life Instance", slide: "determination/events/time_life_instance.html" },
                            { name: "Actions", slide: "determination/events/actions.html" },
                            { name: "Location Types", slide: "determination/events/location_types.html" },
                            { name: "Individual Types", slide: "determination/events/individuals.html" },
                            { name: "Item Types", slide: "determination/events/items.html" },
                            { name: "Characteristics", slide: "determination/events/characteristics.html" }
                        ]
                    },
                    {
                        name: "Energy System",
                        children: [
                            { name: "Overview", slide: "determination/energy_system/overview.html" },
                            { name: "Aura", slide: "determination/energy_system/aura.html" },
                            { name: "Subtle Energy Bodies", slide: "determination/energy_system/subtle_energy_bodies.html" },
                            { name: "Chakras", slide: "determination/energy_system/chakras.html" },
                            { name: "Typical Chakra Components", slide: "determination/energy_system/chakras_2.html" },
                            { name: "Hara Line", slide: "determination/energy_system/hara_line.html" },
                            { name: "Meridians", slide: "determination/energy_system/meridians.html" },
                        ]
                    },
                    { name: "Low-Level Energies", slide: "determination/low_level_energies.html" },
                    { name: "Ascended Masters", slide: "determination/ascended_masters.html" },
                    {
                        name: "Source Creator System",
                        children: [
                            { slide: "determination/source_creator_system/overview.html" },
                            { slide: "determination/source_creator_system/overview_2.html" },
                            { slide: "determination/source_creator_system/child_selves.html" }
                        ]
                    },
                    { name: "Numbers", slide: "determination/numbers.html" },
                    { name: "Characteristics", slide: "determination/characteristics.html" },
                    {
                        name: "Conjunctions",
                        children: [
                            { slide: "determination/conjunctions/overview.html" },
                            { slide: "determination/conjunctions/overview_2.html" },
                            { slide: "determination/conjunctions/overview_3.html" }
                        ]
                    },
                    { name: "States", slide: "determination/states.html" }
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