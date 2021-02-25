class UserUtilities {
    lastLocalBackup = null;
    localBackupId   = null;
    utilities       = null;
    settings        = null;
    data            = null;
    login           = null;
    new             = null;
    _divID          = "userUtilities";

    constructor (utilities) {
        this.utilities = utilities;
        this.settings  = new UserSettingsUtility(this);
        this.data      = new UserDataUtility(this);
        this.login     = new UserLoginUtility(this);
        this.new       = new NewUserUtility(this);

        this.div.addClass("btn-group");
        this.div.attr("role", "group");

        const self = this;
        $(document).ready(function() {
            $(document).on("keyup", function(e) {
                if (!self.localBackupId && self.value("localBackupFrequency")) {
                    self.scheduleLocalBackup();
                }
            });
        });
    }

    get app()     { return this.utilities.app; }
    get div()     { return $("#" + this._divID); }
    value(key)    { return this.app.data.value(this.app.data.tierIds(0)[0], key); }

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

    localUsernameExists() {
        //console.log(!![localStorage, sessionStorage].find(storage => Object.keys(storage).includes(this.app.data.username)));
        return !![localStorage, sessionStorage].find(storage => Object.keys(storage).includes(this.app.data.username));
    }

    localBackup() {
        //console.log(this.app.data.record(this.app.data.tierIds(0)[0]));
        //console.trace();
        console.log("running local backup", this.value("localBackupLocation"))
        if (this.value("localBackupLocation") == "localStorage") {
            this.app.data.exportToLocalStorage(this.value("username"));
        }
        if (this.value("localBackupLocation") == "sessionStorage") {
            this.app.data.exportToSessionStorage(this.value("username"));
        }
        this.lastLocalBackup = this._now();
        this.localBackupId = null;
    }

    scheduleLocalBackup(newTimeout) {
        console.log("scheduling local backup")
        if (!this.localBackupId) {
            const freq = this.value("localBackupFrequency");
            const last = this.lastLocalBackup;
            const timeout = (newTimeout && last) ? newTimeout - this._now() + last : freq;
            if (!last || timeout <= 0) { this.localBackup(); }
            else {
                this.localBackupId = setTimeout(this.localBackup.bind(this), timeout * 1000);
            }
        }
    }

    cancelLocalBackup() {
        clearTimeout(this.localBackupId);
        this.localBackupId = null;
    }

    _now() { return Math.round(Date.now() / 1000); }
}