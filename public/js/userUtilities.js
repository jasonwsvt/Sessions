/* utilities class links to sessions class
*/

class UserUtility {
    _utilities = null;
    _utilityID = null;
    _type = null;

    constructor (utilities, group, type) {
        this._utilities = utilities;
        this._group = group;
        this._type = type;

        this._settings = new UserSettingsUtility(this);
        this._dataManager = new DataManagerUtility(this);
        this._login = new LogInUtility(this);
        this._new = new NewUserUtility(this);

        this._build();
    }

    get utilities()                     { return this._utilities; }

    _build() {
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
        this._settings.closeMenu();
        this._dataManager.closeMenu();
        this._new.closeMenu();
    }
}