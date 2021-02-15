class UserUtilities {
    _login     = new UserLoginUtility(this);
    _new       = new NewUserUtility(this);
    //_settings  = new UserSettingsUtility(this);
    //_data      = new UserDataUtility(this);
    _utilities = null;
    _divID     = null;

    constructor (utilities) {
        this._utilities = utilities;
        this._divID = "userUtilities";

        this._build();
    }

    get div()       { return $("#" + this._divID); }
    get utilities() { return this._utilities; }
    get login()     { return this._login; }
    get new()       { return this._new; }
    //get settings()  { return this._settings; }
    //get data()      { return this._data; }

    _build() {
        this.div.addClass("btn-group");
        this.div.attr("role", "group");
        this._login.build();
        this._new.build();
        //this._settings.build();
        //this._data.build();
    }    

    reset() {
        this._login.reset();
        //this._settings.reset();
        //this._data.reset();
    }

    manage() {
        this._login.manage();
        this._new.manage();
        //this._settings.manage();
        //this._data.manage();
    }

    closeMenus(except) {
        this._login.close(except);
        //this._new.close(except);
        //this._settings.close(except);
        //this._data.close(except);
    }
}