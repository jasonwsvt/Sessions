class Backup {
    _localBackup = null;
    _serverBackup = null;

    constructor() {
        const keys = Object.keys(sessionStorage);
        const id = (keys.includes("currentUser")) ? sessionStorage.getItem("currentUser") : false;
        if (id) {
            user = (keys.includes("users")) ?
                JSON.parse(sessionStorage.getItem("users")).find(entry => (entry.id == id)) : false;
            if (user) {
                if (user.nextLocalBackup) { this.backupToLocal(); }
                if (user.nextServerBackup) { this.backupToServer(); }
            }
        }       
    }

    scheduleBackups(localBackupSeconds, serverBackupSeconds) {
        console.log(localBackupSeconds, serverBackupSeconds);
        if (localBackupSeconds) { this.scheduleLocalBackup(localBackupSeconds); }
        if (serverBackupSeconds) { this.scheduleServerBackup(serverBackupSeconds); }
    }

    scheduleLocalBackup(seconds) {
        const nextBackup = (Object.keys(sessionStorage).includes("nextLocalBackup")) ? true : false;
        if (seconds && !nextBackup) {
            var nextLocalBackup = this.now + seconds;
            const nextServerBackup = (Object.keys(sessionStorage).includes("nextServerBackup")) ? sessionStorage.getItem("nextServerBackup") : false;
            if (nextServerBackup) {
                const difference = nextServerBackup - nextLocalBackup;
                if (difference < 5 && difference > 5) { nextLocalBackup = nextServerBackup - 5; }
            }
            console.log("scheduling a local backup at", this.now + seconds);
            sessionStorage.setItem("nextLocalBackup", (this.now + seconds));
            this._localBackup = setTimeout(this.backupToLocal, seconds * 1000);
        }
    }

    scheduleServerBackup(seconds) {
        const nextBackup = (Object.keys(sessionStorage).includes("nextServerBackup")) ? true : false;
        if (seconds && !nextBackup) {
            var nextServerBackup = this.now + seconds;
            const nextLocalBackup = (Object.keys(sessionStorage).includes("nextLocalBackup")) ? sessionStorage.getItem("nextLocalBackup") : false;
            if (nextLocalBackup) {
                const difference = nextLocalBackup - nextServerBackup;
                if (difference < 5 && difference > 5) { nextServerBackup = nextLocalBackup + 5; }
            }
            sessionStorage.setItem("nextServerBackup", (this.now + seconds));
            this._serverBackup = setTimeout(this.backupToServer, seconds * 1000);
        }
    }

    stopLocalBackup() {
        console.log("Cancelling local backup");
        clearInterval(this._localBackup);
        if (Object.keys(sessionStorage).includes("nextLocalBackup")) {
            sessionStorage.removeItem("nextLocalBackup");
        }
    }

    stopServerBackup() {
        clearInterval(this._serverBackup);
        if (Object.keys(sessionStorage).includes("nextLocalBackup")) {
            sessionStorage.removeItem("nextLocalBackup");
        }
    }


    backupToLocal() {
        var localRecords, localKeys, sessionRecords, sessionKeys, repeats = 0;
        console.log("backing up to localStorage");
        sessionStorage.removeItem("nextLocalBackup");
        while (true && repeats <=3) {
            repeats += 1;
            sessionKeys = Object.keys(sessionStorage);
            console.log("sessionKeys before cull:", sessionKeys);
            ["lastLocalBackup", "lastServerBackup", "nextServerBackup", "currentUser"].forEach(item => {
                if (sessionKeys.includes(item)) {
                    sessionKeys.splice(sessionKeys.indexOf(item), 1);
                }
            });
            console.log("sessionKeys after cull:", sessionKeys);
            if (!sessionKeys.length) { break; }
            sessionKeys.forEach(type => {
                localKeys = Object.keys(localStorage);
                if (!localKeys.includes(type)) {
                    localStorage.setItem(type, sessionStorage.getItem(type));
                }
                else {
                    console.log("localKeys:", localKeys);
                    console.log("type:", type);
                    localRecords = JSON.parse(localStorage.getItem(type));
                    sessionRecords = JSON.parse(sessionStorage.getItem(type));
                    sessionRecords.forEach(s => {
                        localRecords = localRecords.filter(l => (l.id != s.id));
                        localRecords.push(s);
                    });
                    localStorage.setItem(type, JSON.stringify(localRecords));
                }
                sessionStorage.removeItem(type);
            });
        }
        sessionStorage.setItem("lastLocalBackup", Math.floor(Date.now() / 1000));
    }

    backupToServer() {
        //nextServerBackup contains username and backup time
        //find everything from the last server backup time in both session Storage and localStorage
        //If the user uses localStorage, don't delete from session Storage.
        //
    }

    synchronizeWithServer() {
        //send most recent time for each user with serverStorage
        //server sends back everything afterward, or a most recent time if it's before / same
        //if the server's most recent time is beforehand, set lastServerBackup and run backupToServer().
    }

    moveUserFromLocalToSession() {
    }

    get now() {
        return Math.floor(Date.now() / 1000);
    }
}