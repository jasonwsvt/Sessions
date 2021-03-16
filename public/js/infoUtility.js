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

        const slides = [
            {
                name: "Introduction",
                children: [
                    { html: "public/assets/slides/introduction/because_reasons_example_1.html" },
                    { html: "public/assets/slides/introduction/because_reasons_example_2.html" },
                    { html: "public/assets/slides/introduction/because_reasons_example_3.html" },
                    { html: "public/assets/slides/introduction/david_hawkins_quote.html" },
                    { html: "public/assets/slides/introduction/dawson_church_quote.html" },
                    { html: "public/assets/slides/introduction/eckhart_tolle_quote.html" },
                    { html: "public/assets/slides/introduction/emiliana_simon-thomas_quote.html" },
                    { html: "public/assets/slides/introduction/energy_healing_techniques_1.html" },
                    { html: "public/assets/slides/introduction/energy_healing_techniques_2.html" },
                    { html: "public/assets/slides/introduction/invitation.html" },
                    { html: "public/assets/slides/introduction/mind_body_connection_article.html" },
                    { html: "public/assets/slides/introduction/natalie_marchant_quote.html" },
                    { html: "public/assets/slides/introduction/sadhguru_quote.html" },
                    { html: "public/assets/slides/introduction/what_are_unhealthy_emotions_1.html" },
                    { html: "public/assets/slides/introduction/what_are_unhealthy_emotions_2.html" },
                    { html: "public/assets/slides/introduction/what_is_because_reasons.html" },
                    { html: "public/assets/slides/introduction/william_buhlman_quote.html" }
                ]
            },
            {
                name: "Issues",
                children: [
                    { html: "public/assets/slides/issues/affirmations.html" },
                    { html: "public/assets/slides/issues/aspirations.html" },
                    { html: "public/assets/slides/issues/examples.html" },
                    { html: "public/assets/slides/issues/identification.html" },
                    { html: "public/assets/slides/issues/negative_thoughts.html" },
                    { html: "public/assets/slides/issues/negative_thoughts_example.html" },
                    { html: "public/assets/slides/issues/overview.html" },
                    { html: "public/assets/slides/issues/secondary_gain.html" },
                    { html: "public/assets/slides/issues/symptoms.html" },
                    { html: "public/assets/slides/issues/tail_enders.html" },
                    { html: "public/assets/slides/issues/what_is_because_reasons.html" }
                ]
            },
            {
                name: "Energy Testing",
                children: [
                    { html: "public/assets/slides/energy_testing/adjusting_statements.html" },
                    { html: "public/assets/slides/energy_testing/advanced_responses.html" },
                    { html: "public/assets/slides/energy_testing/avoiding_influence.html" },
                    { html: "public/assets/slides/energy_testing/basic_steps.html" },
                    { html: "public/assets/slides/energy_testing/basic_steps_example.html" },
                    { html: "public/assets/slides/energy_testing/basic_steps_example_2.html" },
                    { html: "public/assets/slides/energy_testing/binary_search_method.html" },
                    { html: "public/assets/slides/energy_testing/binary_search_method_2.html" },
                    { html: "public/assets/slides/energy_testing/energy_testing_in_because_reasons.html" },
                    { html: "public/assets/slides/energy_testing/example_statements.html" },
                    { html: "public/assets/slides/energy_testing/history.html" },
                    { html: "public/assets/slides/energy_testing/improving_responses.html" },
                    { html: "public/assets/slides/energy_testing/methods_and_practitioners.html" },
                    { html: "public/assets/slides/energy_testing/number_comparison.html" },
                    { html: "public/assets/slides/energy_testing/number_comparison_2.html" },
                    { html: "public/assets/slides/energy_testing/overview.html" },
                    { html: "public/assets/slides/energy_testing/overview_2.html" },
                    { html: "public/assets/slides/energy_testing/scientific_basis.html" },
                    { html: "public/assets/slides/energy_testing/statement_semantics.html" },
                    { html: "public/assets/slides/energy_testing/statement_semantics_2.html" },
                    { html: "public/assets/slides/energy_testing/the_eye_method_2.html" },
                    { html: "public/assets/slides/energy_testing/the_eye_method_3.html" },
                    { html: "public/assets/slides/energy_testing/the_eye_testing_method.html" },
                    { html: "public/assets/slides/energy_testing/truth_and_falsity.html" },
                    { html: "public/assets/slides/energy_testing/truth_and_falsity_2.html" },
                    { html: "public/assets/slides/energy_testing/what_is_because_reasons.html" }
                ]
            },
            {
                name: "Resolution",
                children: [
                    { html: "public/assets/slides/resolution/a_yawn_or_deep_breath.html" },
                    { html: "public/assets/slides/resolution/energy_test_response.html" },
                    { html: "public/assets/slides/resolution/overview.html" },
                    { html: "public/assets/slides/resolution/resolution_command.html" },
                    { html: "public/assets/slides/resolution/somatic_or_cognitive_response.html" },
                    { html: "public/assets/slides/resolution/subconscious_work.html" },
                    { html: "public/assets/slides/resolution/sufficient_determination.html" },
                    { html: "public/assets/slides/resolution/what_is_because_reasons.html" }
                ]
            },
            {
                name: "Determination",
                children: [
                    { html: "public/assets/slides/determination/what_is_because_reasons.html" },
                    { html: "public/assets/slides/determination/overview_1.html" },
                    { html: "public/assets/slides/determination/overview_2.html" },
                    { html: "public/assets/slides/determination/overview_3.html" },
                    { html: "public/assets/slides/determination/overview_4.html" },
                    { html: "public/assets/slides/determination/ascended_masters.html" },
                    { html: "public/assets/slides/determination/characteristics.html" },
                    { html: "public/assets/slides/determination/low_level_energies.html" },
                    { html: "public/assets/slides/determination/numbers.html" },
                    { html: "public/assets/slides/determination/parts.html" },
                    { html: "public/assets/slides/determination/physical_body.html" },
                    { html: "public/assets/slides/determination/physical_body_2.html" },
                    { html: "public/assets/slides/determination/senses.html" },
                    { html: "public/assets/slides/determination/states.html" },
                    {
                        name: "Conjunctions",
                        children: [
                            { html: "public/assets/slides/determination/conjunctions/overview.html" },
                            { html: "public/assets/slides/determination/conjunctions/overview_2.html" },
                            { html: "public/assets/slides/determination/conjunctions/overview_3.html" }
                        ]
                    },
                    {
                        name: "Consciousness Levels",
                        children: [
                            { html: "public/assets/slides/determination/consciousness_levels/david_hawkins_quote_1.html" },
                            { html: "public/assets/slides/determination/consciousness_levels/david_hawkins_quote_2.html" },
                            { html: "public/assets/slides/determination/consciousness_levels/level_connections.html" },
                            { html: "public/assets/slides/determination/consciousness_levels/level_connections_2.html" },
                            { html: "public/assets/slides/determination/consciousness_levels/level_of_consciousness.html" },
                            { html: "public/assets/slides/determination/consciousness_levels/overview.html" },
                            { html: "public/assets/slides/determination/consciousness_levels/richard_rudd_quote.html" }
                        ]
                    },
                    {
                        name: "Emotions",
                        children: [
                            { html: "public/assets/slides/determination/emotions/emotions_1.html" },
                            { html: "public/assets/slides/determination/emotions/emotions_2.html" },
                            { html: "public/assets/slides/determination/emotions/emotions_3.html" }
                        ]
                    },
                    {
                        name: "Energy System",
                        children: [
                            { html: "public/assets/slides/determination/energy_system/aura.html" },
                            { html: "public/assets/slides/determination/energy_system/chakras.html" },
                            { html: "public/assets/slides/determination/energy_system/chakras_2.html" },
                            { html: "public/assets/slides/determination/energy_system/hara_line.html" },
                            { html: "public/assets/slides/determination/energy_system/meridians.html" },
                            { html: "public/assets/slides/determination/energy_system/overview.html" },
                            { html: "public/assets/slides/determination/energy_system/subtle_energy_bodies.html" }
                        ]
                    },
                    {
                        name: "Events",
                        children: [
                            { html: "public/assets/slides/determination/events/actions.html" },
                            { html: "public/assets/slides/determination/events/characteristics.html" },
                            { html: "public/assets/slides/determination/events/individuals.html" },
                            { html: "public/assets/slides/determination/events/items.html" },
                            { html: "public/assets/slides/determination/events/location_types.html" },
                            { html: "public/assets/slides/determination/events/overview.html" },
                            { html: "public/assets/slides/determination/events/time.html" },
                            { html: "public/assets/slides/determination/events/time_life_instance.html" }

                        ]
                    },
                    {
                        name: "Patterns",
                        children: [
                            { html: "public/assets/slides/determination/patterns/attachment.html" },
                            { html: "public/assets/slides/determination/patterns/identification.html" },
                            { html: "public/assets/slides/determination/patterns/overview.html" },
                            { html: "public/assets/slides/determination/patterns/resistance.html" }
                        ]
                    },
                    {
                        name: "Psychological Reversals",
                        children: [
                            { html: "public/assets/slides/determination/psychological_reversals/psychological_reversals_1.html" },
                            { html: "public/assets/slides/determination/psychological_reversals/psychological_reversals_2.html" },
                            { html: "public/assets/slides/determination/psychological_reversals/psychological_reversals_3.html" },
                            { html: "public/assets/slides/determination/psychological_reversals/psychological_reversals_4.html" }
                        ]
                    },
                    {
                        name: "Source Creator System",
                        children: [
                            { html: "public/assets/slides/determination/source_creator_system/child_selves.html" },
                            { html: "public/assets/slides/determination/source_creator_system/overview.html" },
                            { html: "public/assets/slides/determination/source_creator_system/overview_2.html" }
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
                    { html: "public/assets/slides/process/albert_einstein_quote.html" },
                    { html: "public/assets/slides/process/changes_in_symptoms.html" },
                    { html: "public/assets/slides/process/divination.html" },
                    { html: "public/assets/slides/process/divination_examples.html" },
                    { html: "public/assets/slides/process/gameplay.html" },
                    { html: "public/assets/slides/process/ongoing_issues.html" },
                    { html: "public/assets/slides/process/overview.html" },
                    { html: "public/assets/slides/process/what_is_because_reasons.html" },
                    { html: "public/assets/slides/process/working_with_others.html" },
                    { html: "public/assets/slides/process/working_with_others_2.html" }
                ]
            },
            {
                name: "Example Session",
                children: [
                    { html: "public/assets/slides/example_session/what_is_because_reasons.html" }
                ]
            },
            {
                name: "Final Thoughts",
                children: [
                    { html: "public/assets/slides/final_thoughts/basic_principals_for_letting_go.html" },
                    { html: "public/assets/slides/final_thoughts/closing_remarks_1.html" },
                    { html: "public/assets/slides/final_thoughts/closing_remarks_2.html" },
                    { html: "public/assets/slides/final_thoughts/closing_remarks_3.html" },
                    { html: "public/assets/slides/final_thoughts/closing_remarks_4.html" },
                    { html: "public/assets/slides/final_thoughts/closing_remarks_5.html" },
                    { html: "public/assets/slides/final_thoughts/martin_luther_king_jr_quote.html" },
                    { html: "public/assets/slides/final_thoughts/overview.html" }
                ]
            }
            
        ];

        const root = data.import({});
        slides.forEach(slide => {
            if (slide.name) { }
        })
//        public/assets/slides/about_me.html
//        public/assets/slides/disclaimer.html
    }
}