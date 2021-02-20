class UserUtilities {
    utilities       = null;
    settings        = null;
    data            = null;
    login           = null;
    new             = null;
    _divID          = "userUtilities";
    defaultUserName = "newuser"

    constructor (utilities) {
        this.utilities = utilities;
        this.settings  = new UserSettingsUtility(this);
        this.data      = new UserDataUtility(this);
        this.login     = new UserLoginUtility(this);
        this.new       = new NewUserUtility(this);

        this.div.addClass("btn-group");
        this.div.attr("role", "group");
    }

    get app()     { return this.utilities.app; }
    get div()     { return $("#" + this._divID); }
    //get current() { return this.app.data.record(this.app.data.tierIds(0)[0]); }

    init() {
        this.login.init();
        this.new.init();
//        this.reset();
    }

    reset() {
        this.new.reset();
        this.login.reset();
        this.settings.reset();
        this.data.reset();
    }

    manage() {
        this.settings.manage();
        this.data.manage();
        this.login.manage();
        this.new.manage();
    }

    close(except) {
        this.settings.close(except);
        this.data.close(except);
        this.login.close(except);
        this.new.close(except);
    }
}