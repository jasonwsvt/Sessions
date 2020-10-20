class UserManager {
    _app = null;
    _current = null;
    _editor = null;
    _user = null;

    constructor(app) {
        this._app = app;
        if (this.numSessions) {
            this.lines.load(this.sortByLastOpened(this.sessions()).slice(-1)[0].creation);
        }
        else { this.newSession("Unspecified"); }
    }

    get app() { return this._app; }
    get currentUser() { return this._current; }

    new(userName) { }

    _userInit() {
        //find the "remember me" user in localStorage, if any
    }

    _sessionInit() {
        //pull all session data from sessionStorage, minus lines
        //put information into sessions object
        const keys = Object.keys(sessionStorage);
        var self = this;
        keys.forEach((creation) => {
            if (Number(creation) > 1600000000 && !this.session(creation)) {
                self._sessions.push(new Session(Number(creation)));
//                console.log(self.session(creation));
                self.session(creation).pullSessionData();
            }
        });
    }

    _localInit() {
        //pull all session data from localStorage, minus lines
        //put information into sessions object
        const keys = Object.keys(localStorage);
        var self = this;
        keys.forEach((creation) => {
            if (Number(creation) > 1600000000 && !this.session(creation)) {
                self._sessions.push(new Session(creation));
                console.log(self.session(creation));
                self.session(creation).pullLocalData();
            }
        });
    }

    _serverInit() {
        //pull all session data from server storage, minus lines
        //put information into sessions object
    }

    pullLocalDataForUser() {
        //see if there's a user record (remember me checked), and if so,
        //  get the values for using local and server storage
        //  if (localStorage == true) { this.activateLocalStorage; }
        //  if (serverStorage == true) { this.activateServerStorage; }
        //  pull issues and sessions for user
    }

    //gets a stringified JSON of all the Because Reasons components from the server
//    getButtons() {
//        return becauseReasonsButtonsData;
//        //check if buttons are stored in localstorage, if so, check the version
//        //pull the version of the most recent buttons from server
//        //if the local version is older than the server version, or there is no local version,
//        //pull buttons json data with ajax from the Node server
//    }

    createServerAccount() {
        //
    }

    authenticate(username, password) {
        //if it's a new location, ensure through email that it's okay
    }

    successfulLoginProcedure() {
        //find out which storage types are okay on this computer
        //if there's any data in local or session storage that isn't on the server,
        //or has a newer lastUpdated timestamp than on the server, update it.
        //synchronizeData()
        //get issue names and names of all sessions for each issue
        //get most recent issue name
        //get most recently accessed session for the most recent issue
    }

    synchronizeData() {

    }
}