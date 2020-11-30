/* utilities class links to sessions class
*/

class UserUtilities {
    _utilities = null;
    _divID = null;
    _type = null;

    constructor (utilities, group) {
        this._utilities = utilities;
        this._group = group;
        this._divID = "userUtilities";

        this._settings = new UserSettingsUtility(this, group);
        this._data = new UserDataUtility(this, group);
        this._login = new UserLoginUtility(this, group);
        this._new = new NewUserUtility(this, group);

        this._build();
    }

    get div()       { return $("#" + this._divID); }
    get utilities() { return this._utilities; }

    _build() {
        this.div.addClass("btn-group");
        this.div.attr("role", "group");
        this._settings.build();
        this._data.build();
        this._login.build();
        this._new.build();

    }    

    manage() {
        this._settings.manage();
//        this._data.manage();
        this._login.manage();
//        this._new.manage();
    }

    reset() {
        this._settings.reset();
        this._data.reset();
        this._login.reset();
        this._new.reset();
    }

    closeMenus(except) {
        this._settings.close(except);
        this._data.close(except);
        this._login.close(except);
        this._new.close(except);
    }
}