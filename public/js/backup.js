class Backup {
    _app = null;

    constructor(app) {
        this._app = app;
    }

    run() {
        if (Object.keys(sessionStorage).includes("users")) {
            users = sessionStorage.getItem("users");
            if (users.find(user => (user.userName == app.)))
        }
    }

    backupToLocalStorage() {

    }

    backupToServerStorage() {

    }
}