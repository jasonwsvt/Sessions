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
        this.reset();
    }

    get div()       { return $("#" + this._divID); }
    get utilities() { return this._utilities; }
    get settings()  { return this._settings; }
    get data()      { return this._data; }
    get login()     { return this._login; }
    get new()       { return this._new; }

    _build() {
        this.div.addClass("btn-group");
        this.div.attr("role", "group");
        this._settings.build();
        this._data.build();
        this._login.build();
        this._new.build();
    }    

    reset() {
        this._settings.reset();
        this._data.reset();
        this._login.reset();
    }

    manage() {
        this._settings.manage();
        this._data.manage();
        this._login.manage();
        this._new.manage();
    }

    closeMenus(except) {
        this._settings.close(except);
        this._data.close(except);
        this._login.close(except);
        this._new.close(except);
    }
}