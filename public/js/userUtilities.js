/* utilities class links to sessions class
*/

class UserUtilities {
    _utilities = null;
    _divID = null;
    _type = null;

    constructor (utilities, group, type) {
        this._utilities = utilities;
        this._group = group;
        this._type = type;
        this._divID = "userUtilities";

        this._settings = new UserSettingsUtility(this, group, type);
        this._dataManager = new UserDataUtility(this, group, type);
        this._login = new UserLoginUtility(this, group, type);
        this._new = new NewUserUtility(this, group, type);
    }

    get div()       { return $("#" + this._divID); }
    get utilities() { return this._utilities; }

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