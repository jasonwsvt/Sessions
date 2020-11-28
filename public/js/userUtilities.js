/* utilities class links to sessions class
*/

class UserUtility {
    _utilities = null;
    _divID = null;
    _type = null;

    constructor (utilities, group, type) {
        this._utilities = utilities;
        this._group = group;
        this._type = type;
        this._divID = "userUtilities";

        this._settings = new UserSettingsUtility(this);
        this._dataManager = new DataManagerUtility(this);
        this._login = new LogInUtility(this);
        this._new = new NewUserUtility(this);

        this._build();
    }

    get div()       { return $("#" + this._divID); }
    get utilities() { return this._utilities; }

    _build() {
        this.div.addClass("btn-group");
        this.div.attr("role", "group");
        this._settings.build();
        this._dataManager.build();
        this._login.build();
        this._new.build();

        this._reset();
    }

    manage() {
        this._settings.manage();
        this._dataManager.manage();
        this._login.manage();
        this._new.manage();
    }

    reset() {
        this._settings.reset();
        this._dataManager.reset();
        this._login.reset();
        this._new.reset();
    }

    closeMenus(except) {
        this._settings.closeMenu(except);
        this._dataManager.closeMenu(except);
        this._login.closeMenu(except);
        this._new.closeMenu(except);
    }
}