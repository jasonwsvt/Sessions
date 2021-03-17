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
        const pathDiv = "<div id = '" + this._pathDivID + "'></div>";
        const contentsDiv = "<div id = '" + this._contentsDivID + "'></div>";
        const mediaDiv = "<div id = '" + this._mediaDivID + "'></div>";

        this.utilityDiv.append(button + div);
        this.div.css("left", "0px");
        this.div.css("top", String(this.utilityDiv.position().top + 32) + "px");
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

        const path = data.idPath(picked);

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
        var code;
        media.forEach((ary, index) => {
            const id = ary[0];
            const item = ary[1];
            const value = ary[2];
            this.contentsDiv.append("<button id = '" + this.itemButtonId(id, item) + "'>" + item + "</button>");
            switch (value) {
                case "video":
                    code += "<iframe width = 100% src='https://www.youtube.com/embed/" + value + "'></iframe>";
                    break;
                case "slide":
                    code += "<object data = 'public/slides/" + value + " '>";
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

        const slides = [
            {
                name: "Introduction",
                children: [
                    { html: "introduction/because_reasons_example_1.html" },
                    { html: "introduction/because_reasons_example_2.html" },
                    { html: "introduction/because_reasons_example_3.html" },
                    { html: "introduction/david_hawkins_quote.html" },
                    { html: "introduction/dawson_church_quote.html" },
                    { html: "introduction/eckhart_tolle_quote.html" },
                    { html: "introduction/emiliana_simon-thomas_quote.html" },
                    { html: "introduction/energy_healing_techniques_1.html" },
                    { html: "introduction/energy_healing_techniques_2.html" },
                    { html: "introduction/invitation.html" },
                    { html: "introduction/mind_body_connection_article.html" },
                    { html: "introduction/natalie_marchant_quote.html" },
                    { html: "introduction/sadhguru_quote.html" },
                    { html: "introduction/what_are_unhealthy_emotions_1.html" },
                    { html: "introduction/what_are_unhealthy_emotions_2.html" },
                    { html: "introduction/what_is_because_reasons.html" },
                    { html: "introduction/william_buhlman_quote.html" }
                ]
            },
            {
                name: "Issues",
                children: [
                    { html: "issues/affirmations.html" },
                    { html: "issues/aspirations.html" },
                    { html: "issues/examples.html" },
                    { html: "issues/identification.html" },
                    { html: "issues/negative_thoughts.html" },
                    { html: "issues/negative_thoughts_example.html" },
                    { html: "issues/overview.html" },
                    { html: "issues/secondary_gain.html" },
                    { html: "issues/symptoms.html" },
                    { html: "issues/tail_enders.html" },
                    { html: "issues/what_is_because_reasons.html" }
                ]
            },
            {
                name: "Energy Testing",
                children: [
                    { html: "energy_testing/adjusting_statements.html" },
                    { html: "energy_testing/advanced_responses.html" },
                    { html: "energy_testing/avoiding_influence.html" },
                    { html: "energy_testing/basic_steps.html" },
                    { html: "energy_testing/basic_steps_example.html" },
                    { html: "energy_testing/basic_steps_example_2.html" },
                    { html: "energy_testing/binary_search_method.html" },
                    { html: "energy_testing/binary_search_method_2.html" },
                    { html: "energy_testing/energy_testing_in_because_reasons.html" },
                    { html: "energy_testing/example_statements.html" },
                    { html: "energy_testing/history.html" },
                    { html: "energy_testing/improving_responses.html" },
                    { html: "energy_testing/methods_and_practitioners.html" },
                    { html: "energy_testing/number_comparison.html" },
                    { html: "energy_testing/number_comparison_2.html" },
                    { html: "energy_testing/overview.html" },
                    { html: "energy_testing/overview_2.html" },
                    { html: "energy_testing/scientific_basis.html" },
                    { html: "energy_testing/statement_semantics.html" },
                    { html: "energy_testing/statement_semantics_2.html" },
                    { html: "energy_testing/the_eye_method_2.html" },
                    { html: "energy_testing/the_eye_method_3.html" },
                    { html: "energy_testing/the_eye_testing_method.html" },
                    { html: "energy_testing/truth_and_falsity.html" },
                    { html: "energy_testing/truth_and_falsity_2.html" },
                    { html: "energy_testing/what_is_because_reasons.html" }
                ]
            },
            {
                name: "Resolution",
                children: [
                    { html: "resolution/a_yawn_or_deep_breath.html" },
                    { html: "resolution/energy_test_response.html" },
                    { html: "resolution/overview.html" },
                    { html: "resolution/resolution_command.html" },
                    { html: "resolution/somatic_or_cognitive_response.html" },
                    { html: "resolution/subconscious_work.html" },
                    { html: "resolution/sufficient_determination.html" },
                    { html: "resolution/what_is_because_reasons.html" }
                ]
            },
            {
                name: "Determination",
                children: [
                    { html: "determination/what_is_because_reasons.html" },
                    { html: "determination/overview_1.html" },
                    { html: "determination/overview_2.html" },
                    { html: "determination/overview_3.html" },
                    { html: "determination/overview_4.html" },
                    { html: "determination/ascended_masters.html" },
                    { html: "determination/characteristics.html" },
                    { html: "determination/low_level_energies.html" },
                    { html: "determination/numbers.html" },
                    { html: "determination/parts.html" },
                    { html: "determination/physical_body.html" },
                    { html: "determination/physical_body_2.html" },
                    { html: "determination/senses.html" },
                    { html: "determination/states.html" },
                    {
                        name: "Conjunctions",
                        children: [
                            { html: "determination/conjunctions/overview.html" },
                            { html: "determination/conjunctions/overview_2.html" },
                            { html: "determination/conjunctions/overview_3.html" }
                        ]
                    },
                    {
                        name: "Consciousness Levels",
                        children: [
                            { html: "determination/consciousness_levels/david_hawkins_quote_1.html" },
                            { html: "determination/consciousness_levels/david_hawkins_quote_2.html" },
                            { html: "determination/consciousness_levels/level_connections.html" },
                            { html: "determination/consciousness_levels/level_connections_2.html" },
                            { html: "determination/consciousness_levels/level_of_consciousness.html" },
                            { html: "determination/consciousness_levels/overview.html" },
                            { html: "determination/consciousness_levels/richard_rudd_quote.html" }
                        ]
                    },
                    {
                        name: "Emotions",
                        children: [
                            { html: "determination/emotions/emotions_1.html" },
                            { html: "determination/emotions/emotions_2.html" },
                            { html: "determination/emotions/emotions_3.html" }
                        ]
                    },
                    {
                        name: "Energy System",
                        children: [
                            { html: "determination/energy_system/aura.html" },
                            { html: "determination/energy_system/chakras.html" },
                            { html: "determination/energy_system/chakras_2.html" },
                            { html: "determination/energy_system/hara_line.html" },
                            { html: "determination/energy_system/meridians.html" },
                            { html: "determination/energy_system/overview.html" },
                            { html: "determination/energy_system/subtle_energy_bodies.html" }
                        ]
                    },
                    {
                        name: "Events",
                        children: [
                            { html: "determination/events/actions.html" },
                            { html: "determination/events/characteristics.html" },
                            { html: "determination/events/individuals.html" },
                            { html: "determination/events/items.html" },
                            { html: "determination/events/location_types.html" },
                            { html: "determination/events/overview.html" },
                            { html: "determination/events/time.html" },
                            { html: "determination/events/time_life_instance.html" }

                        ]
                    },
                    {
                        name: "Patterns",
                        children: [
                            { html: "determination/patterns/attachment.html" },
                            { html: "determination/patterns/identification.html" },
                            { html: "determination/patterns/overview.html" },
                            { html: "determination/patterns/resistance.html" }
                        ]
                    },
                    {
                        name: "Psychological Reversals",
                        children: [
                            { html: "determination/psychological_reversals/psychological_reversals_1.html" },
                            { html: "determination/psychological_reversals/psychological_reversals_2.html" },
                            { html: "determination/psychological_reversals/psychological_reversals_3.html" },
                            { html: "determination/psychological_reversals/psychological_reversals_4.html" }
                        ]
                    },
                    {
                        name: "Source Creator System",
                        children: [
                            { html: "determination/source_creator_system/child_selves.html" },
                            { html: "determination/source_creator_system/overview.html" },
                            { html: "determination/source_creator_system/overview_2.html" }
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
                    { html: "process/albert_einstein_quote.html" },
                    { html: "process/changes_in_symptoms.html" },
                    { html: "process/divination.html" },
                    { html: "process/divination_examples.html" },
                    { html: "process/gameplay.html" },
                    { html: "process/ongoing_issues.html" },
                    { html: "process/overview.html" },
                    { html: "process/what_is_because_reasons.html" },
                    { html: "process/working_with_others.html" },
                    { html: "process/working_with_others_2.html" }
                ]
            },
            {
                name: "Example Session",
                children: [
                    { html: "example_session/what_is_because_reasons.html" }
                ]
            },
            {
                name: "Final Thoughts",
                children: [
                    { html: "final_thoughts/basic_principals_for_letting_go.html" },
                    { html: "final_thoughts/closing_remarks_1.html" },
                    { html: "final_thoughts/closing_remarks_2.html" },
                    { html: "final_thoughts/closing_remarks_3.html" },
                    { html: "final_thoughts/closing_remarks_4.html" },
                    { html: "final_thoughts/closing_remarks_5.html" },
                    { html: "final_thoughts/martin_luther_king_jr_quote.html" },
                    { html: "final_thoughts/overview.html" }
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