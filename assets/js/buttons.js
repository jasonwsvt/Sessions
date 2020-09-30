/* buttons class: constructor receives on click function code,
   buttons container ID, name of variable with all buttons,
   button wrapper code
*/

class Buttons {
    _buttonCode = null;
    _buttonsNavID = null;
    _buttonsNav = null;
    _buttonsID = null;
    _buttons = null;

    constructor(buttonsNavID, buttonsID, buttonsJSON) {
        self = this;
        this._buttonsNavID = buttonsNavID;
        this._buttonsNav = $("#" + this._buttonsNavID);
        this._buttonsID = buttonsID;
        this._buttons = $("#" + this._buttonsID);
        this._buttonsNav.append("<div style = 'display: grid'>" + this.createButtonsNav(buttonsJSON) + "</div>");
        this._buttons.append("<div class = 'container-fluid'>" + this.createButtons(buttonsJSON) + "</div>");
        this.adjustDivHeights();

        $(document).ready(function() {
            $('[data-toggle="popover"]').popover({
                placement : 'top',
                trigger : 'hover',
                delay: { 
                    show: "500", 
                    hide: "100"
                },
            });

            $("#" + buttonsNavID + " button").on("click", function(e) {
                const navButtons = $("#" + buttonsNavID + " button");
                const buttonIndex = $(this).parent().index();
                const buttonRow = $("#" + buttonsID + " > .container-fluid > .row").eq(buttonIndex);

                //if ctrl+click, show this and hide all others
                if (e.ctrlKey) {
                    navButtons.each(function(index) {
                        if (index == buttonIndex) {
                            if (navButtons.eq(index).hasClass("btn-secondary")) {
                                $(this).toggleClass("btn-secondary");
                                $(this).toggleClass("btn-info");
                                $("#" + buttonsID + " > .container-fluid > .row").eq(index).toggleClass("hidden");
                            }
                        }
                        else {
                            if (navButtons.eq(index).hasClass("btn-info")) {
                                $(this).toggleClass("btn-secondary");
                                $(this).toggleClass("btn-info");
                                $("#" + buttonsID + " > .container-fluid > .row").eq(index).toggleClass("hidden");
                            }
                        }
                    });
                }

                //if shift+click, toggle disabled for nav button / hidden for button group
                else if (e.shiftKey) {
                    $(this).toggleClass("btn-secondary");
                    $(this).toggleClass("btn-info");
                    buttonRow.toggleClass("hidden");
                }

                //if click, enable if it isn't, and scroll into view
                else {
                    if ($(this).hasClass("btn-secondary")) {
                        $(this).toggleClass("btn-secondary");
                        $(this).toggleClass("btn-info");
                        buttonRow.toggleClass("hidden");
                    }
                    buttonRow[0].scrollIntoView();
                }
                $("#" + buttonsID).trigger("scroll");
                $(document).focus();
            });

            $(self._buttons).scroll(function(e) {
                self = $(this);
                self.find(".btn-block").each(function (index) {
                    const div = $(this).parent().parent();
                    if ($(this).outerHeight() < div.height()) {
                        const scrollTop = self.scrollTop();
                        const scrollBottom = scrollTop + self.height();
                        const divTop = div.offset().top - self.position().top + scrollTop;
                        const divBottom = divTop + div.height();

                        if ((scrollTop <= divBottom &&    divBottom <= scrollBottom) ||
                            (scrollTop <= divTop    &&       divTop <= scrollBottom) ||
                            (   divTop <= scrollTop && scrollBottom <= divBottom)) {
                            const maxButtonTopMargin = div.height() - $(this).outerHeight();
                            const divTopToScrollTop = scrollTop - divTop;
                            if (divBottom - scrollTop <= $(this).outerHeight()) {
                                $(this).parent().css("paddingTop", String(maxButtonTopMargin) + "px");
                            }
                            else if (divTopToScrollTop >= 0) {
                                $(this).parent().css("paddingTop", String(divTopToScrollTop) + "px");
                            }
                            else {
                                $(this).parent().css("paddingTop", "0px");
                            }
                        }
                    }
                });
            });
        });
    }

    adjustDivHeights() {
        //set div height to window height minus div top
        this._buttons.height($(window).height() - this._buttons.position().top);
        this._buttonsNav.height($(window).height() - this._buttons.position().top);
    }

    createButtonsNav(data) {
        var code, name;
        var self = this;
        data.forEach(function(item, index) {
            name = item["name"];
            code += "<div class='row'><button type='button' class='btn btn-info btn-sm btn-block'>" + name + "</button></div>"
        });
        if (code.startsWith("undefined")) { code = code.substring(9); }
        return code;
    }

    createButtons(data) {
        var code;
        if (typeof data === 'string' || data instanceof String) {
            code = "<button type='button' class='btn btn-outline-primary'>" + data + "</button>";
        }
        else if (Array.isArray(data)) {
            var self = this;
            code = "";
            data.forEach(function(item, index) {
                code += self.createButtons(item);
            });
        }
        else if (data instanceof Object) {
            var name = "", description = "", tier = 0, wrap = "", group = "", opening, middle, closing;
            if (data.hasOwnProperty("name")) { name = data["name"]; }
            if (data.hasOwnProperty("description")) { description = data["description"]; }
            if (data.hasOwnProperty("tier")) { tier = data["tier"]; }
            if (data.hasOwnProperty("wrap")) { wrap = data["wrap"]; } else { wrap = true; }
            if (data.hasOwnProperty("group")) { group = data["group"]; wrap = false; }

            if (name && !wrap) {
                switch (tier) {
                    case 1: opening = "<div class = 'row'><div class = 'col col-xl-2 col-lg-2 col-md-3 col-sm-4 col-5'>";
                            middle = "</div><div class = 'col col-xl-10 col-lg-10 col-md-9 col-sm-8 col-7'>";
                            closing = "</div></div>";
                            break;
                    case 2: opening = "<div class = 'row'><div class = 'col col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6'>";
                            middle = "</div><div class = 'col col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6'>";
                            closing = "</div></div>";
                            break;
                    default: opening = "<div class = 'row'><div class = 'col col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6'>";
                            middle = "</div><div class = 'col col-xl-9 col-lg-8 col-md-7 col-sm-6 col-6'>";
                            closing = "</div></div>";
                            break;
                }
            }

            if (opening) { code = opening; }
            code += "<button type='button' class='btn btn-outline-primary";
            if (!wrap) { code += " btn-block"; }
            code += "'";
            if (description) { code += " data-toggle='popover' data-content='" + description + "'"; }
            code += ">" + name + "</button>";
            if (middle) { code += middle; }
            if (group) { code += "<div class='container-fluid'>" + this.createButtons(group) + "</div>"; }
            if (closing) { code += closing; }
        }
        if (code.startsWith("undefined")) { code = code.substring(9); }
        return code;
    }
}