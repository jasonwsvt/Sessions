class Backup {
    _localBackup = null;
    _serverBackup = null;

    constructor() {
        const keys = Object.keys(sessionStorage);
        const userName = (keys.includes("userName")) ? sessionStorage.getItem("userName") : false;
        if (userName) {
            if (keys.includes("nextLocalBackup")) { this.backupToLocal(); }
            if (keys.includes("nextServerBackup")) { this.backupToServer(); }
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
            console.log("scheduling a local backup at", this.now + seconds);
            sessionStorage.setItem("nextLocalBackup", (this.now + seconds) * 1000);
            this._localBackup = setTimeout(this.backupToLocal, seconds * 1000);
        }
    }

    scheduleServerBackup(seconds) {
        const nextBackup = (Object.keys(sessionStorage).includes("nextServerBackup")) ? true : false;
        if (seconds && !nextBackup) {
            sessionStorage.setItem("nextServerBackup", (this.now + seconds) * 1000);
            this._serverBackup = setTimeout(this.backupToServer, seconds * 1000);
        }
    }

    stopLocalBackup() {
        clearInterval(this._localBackup);
        if (Object.keys(localStorage).includes("nextLocalBackup")) {
            localStorage.removeItem("nextLocalBackup");
        }
    }

    stopServerBackup() {
        clearInterval(this._serverBackup);
        if (Object.keys(serverStorage).includes("nextLocalBackup")) {
            serverStorage.removeItem("nextLocalBackup");
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
                    localRecords = (localKeys.includes(type)) ? JSON.parse(localStorage.getItem(type)) : [];
                    sessionRecords = JSON.parse(sessionStorage.getItem(type));
                    sessionRecords.forEach(s => {
                        localRecords.filter(l => (l.id != s.id));
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
        //find everything from the last server backup time in both sessionStorage and localStorage
        //If the user uses localStorage, don't delete from sessionStorage.
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