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
        const div = "<div id = '" + this._divID + "' class = 'infoUtility hidden'></div>";
        const pathDiv = "<div id = '" + this._pathDivID + "'></div>";
        const contentsDiv = "<div id = '" + this._contentsDivID + "'></div>";
        const mediaDiv = "<div id = '" + this._mediaDivID + "'></div>";

        this.utilityDiv.append(button + div);
        this.div.css("left", "0px");
        this.div.css("top", String(this.utilityDiv.position().top + 32) + "px");
        this.div.css("height", String($(window).height() - 32));
        this.div.append(pathDiv + contentsDiv + mediaDiv);

        this.init();
        
        this.manage(this._data.tierIds(0)[0]);
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

        const path = data.idPath(picked).filter((item, index) => index != 0);

        //Create all sibling divs for ids in the path.
        this.pathDiv.empty();
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
            this.contentsDiv.append("<button id = '" + this.itemButtonId(id, item) + "' type = 'button' class = 'btn bth-primary btn-sm'>" + item + "</button>");
            switch (item) {
                case "video":
                    code += "<iframe width = 100% src='https://www.youtube.com/embed/" + value + "'></iframe>";
                    break;
                case "slide":
                    code += "<object data = 'assets/slides/" + value + " '>";
                    break;
            }
            console.log("id:", id);
            console.log("item:", item);
            console.log("value:", value);
            this.mediaDiv.append("<div id = '" + this.itemDivId(id, item) + "' class = 'hidden'></div>");
            this.itemDiv(id, item).append(code);
            
            //If no item selected, default to first.  Otherwise, hide all unselected items and show selected one.
            this.itemButton(id).on("click", (e) => {
                const index = $(this).parent().index();
                this.mediaDiv.children().addClass("hidden");
                this.itemDiv(id, item).show();
                e.stopPropagation();
            });
        });

        if (media.length == 1) {
            this.contentsDiv.addClass("hidden");
        }
        else {
            this.contentsDiv.removeClass("hidden");
        }

        if (this.mediaDiv.children().not(".hidden").length == 0) {
            console.log(this.mediaDiv, this.mediaDiv.children(), this.mediaDiv.children().eq(1));
            this.mediaDiv.children().eq(0).removeClass("hidden");
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

        const slides = [
            {
                name: "Introduction",
                children: [
                    { slide: "introduction/invitation.html" },
                    { slide: "introduction/because_reasons_example_1.html" },
                    { slide: "introduction/because_reasons_example_2.html" },
                    { slide: "introduction/because_reasons_example_3.html" },
                    { slide: "introduction/david_hawkins_quote.html" },
                    { slide: "introduction/dawson_church_quote.html" },
                    { slide: "introduction/eckhart_tolle_quote.html" },
                    { slide: "introduction/emiliana_simon-thomas_quote.html" },
                    { slide: "introduction/energy_healing_techniques_1.html" },
                    { slide: "introduction/energy_healing_techniques_2.html" },
                    { slide: "introduction/mind_body_connection_article.html" },
                    { slide: "introduction/natalie_marchant_quote.html" },
                    { slide: "introduction/sadhguru_quote.html" },
                    { slide: "introduction/what_are_unhealthy_emotions_1.html" },
                    { slide: "introduction/what_are_unhealthy_emotions_2.html" },
                    { slide: "introduction/what_is_because_reasons.html" },
                    { slide: "introduction/william_buhlman_quote.html" }
                ]
            },
            {
                name: "Issues",
                children: [
                    { slide: "issues/affirmations.html" },
                    { slide: "issues/aspirations.html" },
                    { slide: "issues/examples.html" },
                    { slide: "issues/identification.html" },
                    { slide: "issues/negative_thoughts.html" },
                    { slide: "issues/negative_thoughts_example.html" },
                    { slide: "issues/overview.html" },
                    { slide: "issues/secondary_gain.html" },
                    { slide: "issues/symptoms.html" },
                    { slide: "issues/tail_enders.html" },
                    { slide: "issues/what_is_because_reasons.html" }
                ]
            },
            {
                name: "Energy Testing",
                children: [
                    { slide: "energy_testing/adjusting_statements.html" },
                    { slide: "energy_testing/advanced_responses.html" },
                    { slide: "energy_testing/avoiding_influence.html" },
                    { slide: "energy_testing/basic_steps.html" },
                    { slide: "energy_testing/basic_steps_example.html" },
                    { slide: "energy_testing/basic_steps_example_2.html" },
                    { slide: "energy_testing/binary_search_method.html" },
                    { slide: "energy_testing/binary_search_method_2.html" },
                    { slide: "energy_testing/energy_testing_in_because_reasons.html" },
                    { slide: "energy_testing/example_statements.html" },
                    { slide: "energy_testing/history.html" },
                    { slide: "energy_testing/improving_responses.html" },
                    { slide: "energy_testing/methods_and_practitioners.html" },
                    { slide: "energy_testing/number_comparison.html" },
                    { slide: "energy_testing/number_comparison_2.html" },
                    { slide: "energy_testing/overview.html" },
                    { slide: "energy_testing/overview_2.html" },
                    { slide: "energy_testing/scientific_basis.html" },
                    { slide: "energy_testing/statement_semantics.html" },
                    { slide: "energy_testing/statement_semantics_2.html" },
                    { slide: "energy_testing/the_eye_method_2.html" },
                    { slide: "energy_testing/the_eye_method_3.html" },
                    { slide: "energy_testing/the_eye_testing_method.html" },
                    { slide: "energy_testing/truth_and_falsity.html" },
                    { slide: "energy_testing/truth_and_falsity_2.html" },
                    { slide: "energy_testing/what_is_because_reasons.html" }
                ]
            },
            {
                name: "Resolution",
                children: [
                    { slide: "resolution/a_yawn_or_deep_breath.html" },
                    { slide: "resolution/energy_test_response.html" },
                    { slide: "resolution/overview.html" },
                    { slide: "resolution/resolution_command.html" },
                    { slide: "resolution/somatic_or_cognitive_response.html" },
                    { slide: "resolution/subconscious_work.html" },
                    { slide: "resolution/sufficient_determination.html" },
                    { slide: "resolution/what_is_because_reasons.html" }
                ]
            },
            {
                name: "Determination",
                children: [
                    { slide: "determination/what_is_because_reasons.html" },
                    { slide: "determination/overview_1.html" },
                    { slide: "determination/overview_2.html" },
                    { slide: "determination/overview_3.html" },
                    { slide: "determination/overview_4.html" },
                    { slide: "determination/ascended_masters.html" },
                    { slide: "determination/characteristics.html" },
                    { slide: "determination/low_level_energies.html" },
                    { slide: "determination/numbers.html" },
                    { slide: "determination/parts.html" },
                    { slide: "determination/physical_body.html" },
                    { slide: "determination/physical_body_2.html" },
                    { slide: "determination/senses.html" },
                    { slide: "determination/states.html" },
                    {
                        name: "Conjunctions",
                        children: [
                            { slide: "determination/conjunctions/overview.html" },
                            { slide: "determination/conjunctions/overview_2.html" },
                            { slide: "determination/conjunctions/overview_3.html" }
                        ]
                    },
                    {
                        name: "Consciousness Levels",
                        children: [
                            { slide: "determination/consciousness_levels/david_hawkins_quote_1.html" },
                            { slide: "determination/consciousness_levels/david_hawkins_quote_2.html" },
                            { slide: "determination/consciousness_levels/level_connections.html" },
                            { slide: "determination/consciousness_levels/level_connections_2.html" },
                            { slide: "determination/consciousness_levels/level_of_consciousness.html" },
                            { slide: "determination/consciousness_levels/overview.html" },
                            { slide: "determination/consciousness_levels/richard_rudd_quote.html" }
                        ]
                    },
                    {
                        name: "Emotions",
                        children: [
                            { slide: "determination/emotions/emotions_1.html" },
                            { slide: "determination/emotions/emotions_2.html" },
                            { slide: "determination/emotions/emotions_3.html" }
                        ]
                    },
                    {
                        name: "Energy System",
                        children: [
                            { slide: "determination/energy_system/aura.html" },
                            { slide: "determination/energy_system/chakras.html" },
                            { slide: "determination/energy_system/chakras_2.html" },
                            { slide: "determination/energy_system/hara_line.html" },
                            { slide: "determination/energy_system/meridians.html" },
                            { slide: "determination/energy_system/overview.html" },
                            { slide: "determination/energy_system/subtle_energy_bodies.html" }
                        ]
                    },
                    {
                        name: "Events",
                        children: [
                            { slide: "determination/events/actions.html" },
                            { slide: "determination/events/characteristics.html" },
                            { slide: "determination/events/individuals.html" },
                            { slide: "determination/events/items.html" },
                            { slide: "determination/events/location_types.html" },
                            { slide: "determination/events/overview.html" },
                            { slide: "determination/events/time.html" },
                            { slide: "determination/events/time_life_instance.html" }

                        ]
                    },
                    {
                        name: "Patterns",
                        children: [
                            { slide: "determination/patterns/attachment.html" },
                            { slide: "determination/patterns/identification.html" },
                            { slide: "determination/patterns/overview.html" },
                            { slide: "determination/patterns/resistance.html" }
                        ]
                    },
                    {
                        name: "Psychological Reversals",
                        children: [
                            { slide: "determination/psychological_reversals/psychological_reversals_1.html" },
                            { slide: "determination/psychological_reversals/psychological_reversals_2.html" },
                            { slide: "determination/psychological_reversals/psychological_reversals_3.html" },
                            { slide: "determination/psychological_reversals/psychological_reversals_4.html" }
                        ]
                    },
                    {
                        name: "Source Creator System",
                        children: [
                            { slide: "determination/source_creator_system/child_selves.html" },
                            { slide: "determination/source_creator_system/overview.html" },
                            { slide: "determination/source_creator_system/overview_2.html" }
                        ]
                    }
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
                    { slide: "process/albert_einstein_quote.html" },
                    { slide: "process/changes_in_symptoms.html" },
                    { slide: "process/divination.html" },
                    { slide: "process/divination_examples.html" },
                    { slide: "process/gameplay.html" },
                    { slide: "process/ongoing_issues.html" },
                    { slide: "process/overview.html" },
                    { slide: "process/what_is_because_reasons.html" },
                    { slide: "process/working_with_others.html" },
                    { slide: "process/working_with_others_2.html" }
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
                    { slide: "final_thoughts/basic_principals_for_letting_go.html" },
                    { slide: "final_thoughts/closing_remarks_1.html" },
                    { slide: "final_thoughts/closing_remarks_2.html" },
                    { slide: "final_thoughts/closing_remarks_3.html" },
                    { slide: "final_thoughts/closing_remarks_4.html" },
                    { slide: "final_thoughts/closing_remarks_5.html" },
                    { slide: "final_thoughts/martin_luther_king_jr_quote.html" },
                    { slide: "final_thoughts/overview.html" }
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