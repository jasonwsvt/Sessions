class UserUtilities {
    login     = null;
    new       = null;
    //settings  = null;
    //data      = null;
    _divID    = "userUtilities";
    utilities = null;

    constructor (utilities) {
        this.utilities = utilities;
        this.login     = new UserLoginUtility(this);
        this.new       = new NewUserUtility(this);
        //this.settings  = new UserSettingsUtility(this);
        //this.data      = new UserDataUtility(this);

        this.div.addClass("btn-group");
        this.div.attr("role", "group");
    }

    get app()       { return this.utilities.app; }
    get div()       { return $("#" + this._divID); }
    get group() {
        console.log(this.app)
        return this.app.data.record(this.app.data.idPath(this.current.id)[0]).children;
    }

    get current() {
        const data = this.app.data;
        if (!data.isEmpty()) {
            const mostRecentlyOpened = data.sortByLastOpened(data.tierIds(3))[0];
            const mostRecentlyCreated = data.sortByCreation(data.tierIds(3))[0];
            const path = data.idPath((mostRecentlyOpened) ? mostRecentlyOpened : mostRecentlyCreated);
            return data.record(path[0]);
        }
    }

    init() {
        this.new.init();
        this.login.init();
        //this.settings.init();
        //this.data.init();
        this.reset();
    }

    reset() {
        this.new.reset();
        this.login.reset();
        //this.settings.reset();
        //this.data.reset();
    }

    manage() {
        //this.settings.manage();
        //this.data.manage();
        this.login.manage();
        this.new.manage();
    }

    close(except) {
        //this.settings.close(except);
        //this.data.close(except);
        this.login.close(except);
        this.new.close(except);
    }
}