class UserUtilities {
    lastLocalBackup = null;
    nextLocalBackup = null;
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

        $(document).ready(function() {

        });
    }

    get app()     { return this.utilities.app; }
    get div()     { return $("#" + this._divID); }

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

    usernameExists() {
        return [localStorage, sessionStorage].every(storage => !Object.keys(storage).includes(this.app.data.username));
    }

    localBackup() {
        const data = this.app.data;
        if (data.localBackupLocation == "localStorage") {
            data.exportToLocalStorage(data.username);
        }
        else if (data.localBackupLocation == "sessionStorage") {
            data.exportToSessionStorage(data.username);
        }
        this.lastLocalBackup = this._now();
        this.nextLocalBackup = undefined;
    }

    scheduleLocalBackup() {
        if (this.nextLocalBackup == undefined || this.nextLocalBackup < this._now()) {
            this.localBackupId = setTimeout(this.localBackup, data.localBackupFrequency * 1000);
            this.nextLocalBackup = this._now() + data.localBackupFrequency;
        }
    }

    cancelLocalBackup() {
        clearTimeout(this.localBackupId);
        this.nextLocalBackup = undefined;
    }

    _now() { return Math.round(Date.now() / 1000); }
}