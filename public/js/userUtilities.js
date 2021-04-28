class UserUtilities {
    constructor (utilities) {
        this.utilities = utilities;
        this.defaultUsername = "newuser";
        this.backupRequested = false;
        this.lastLocalBackup = null;
        this.localBackupId   = null;
        this.settings        = null;
        this._divID          = "userUtilities";
        this.settings        = new UserSettingsUtility(this);
        this.data            = new UserDataUtility(this);
        this.login           = new UserLoginUtility(this);
        this.new             = new NewUserUtility(this);

        this.div.addClass("btn-group");
        this.div.attr("role", "group");

        const self = this;
        $(document).ready(function() {
            $(document).on("keyup", function(e) {
                self.requestBackup();
                e.stopPropagation();
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

    localBackup() {
        //console.log(this.app.data.record(this.app.data.tierIds(0)[0]));
        //console.trace();
        console.log("running local backup", this.value("localBackupLocation"))
        this.app.data.exportToLocalStorage(this.value("username"));
        this.lastLocalBackup = this._now();
        this.backupRequested = false;
        this.localBackupId = null;
        this.manage(0);
    }

    requestBackup() {
        console.trace();
        this.backupRequested = true;
        this.login.manage();
        this.new.manage();
        if (this.value("localBackupFrequency") != false && !this.localBackupId) {
            this.scheduleLocalBackup();
        }
        //add similar code for server backup
    }

    scheduleLocalBackup(newTimeout) {
        const freq = this.value("localBackupFrequency");
        if (!this.localBackupId && (freq || newTimeout)) {
            console.log("scheduling local backup", freq, newTimeout);
            const last = this.lastLocalBackup;
            const timeout = (newTimeout && last) ? newTimeout - this._now() + last : freq;
            if (!last || timeout <= 0) { this.localBackup(); }
            else {
                this.localBackupId = setTimeout(this.localBackup.bind(this), timeout * 1000);
                this.login.manage();
                this.new.manage();
            }
        }
    }

    cancelLocalBackup() {
        clearTimeout(this.localBackupId);
        this.localBackupId = null;
        this.login.manage();
        this.new.manage();
    }

    _now() { return Math.round(Date.now() / 1000); }
}