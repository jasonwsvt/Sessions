class Backup {
    _localBackup = null;
    _serverBackup = null;

    constructor() {
        
    }

    scheduleBackups(localBackupSeconds, serverBackupSeconds) {
        if (localBackupSeconds) { this._scheduleLocalBackup(localBackupSeconds); }
        if (serverBackupSeconds) { this._scheduleServerBackup(serverBackupSeconds); }
    }

    _scheduleLocalBackup(seconds) {
        const keys = Object.keys(sessionStorage);
        const nextBackup = (keys.includes("nextLocalBackup")) ? sessionStorage.getItem("nextLocalBackup") : null;
        if (seconds && (nextBackup == null || nextBackup <= this.now)) {
            sessionStorage.setItem("nextLocalBackup", (this.now + seconds) * 1000);
            this._localBackup = setTimeout(this.backupToLocal, seconds * 1000);
        }
    }

    _scheduleServerBackup(seconds) {
        const keys = Object.keys(sessionStorage);
        const nextBackup = (keys.includes("nextServerBackup")) ? sessionStorage.getItem("nextServerBackup") : null;
        if (seconds && (nextBackup == null || nextBackup <= this.now)) {
            sessionStorage.setItem("nextServerBackup", (this.now + seconds) * 1000);
            this._serverBackup = setTimeout(this.backupToServer, seconds * 1000);
        }
    }

    stopLocalBackup() { clearInterval(this._localBackup); }

    stopServerBackup() { clearInterval(this._serverBackup); }

    backupToLocal() {
        var localRecords, sessionRecords;
        sessionStorage.removeItem("nextLocalBackup");
        while (true) {
            const keys = Object.keys(sessionStorage);
            if (!keys.length) { break; }
            keys.forEach(type => {
                if (!Object.keys(localStorage).includes(type)) {
                    localStorage.setItem(type, sessionStorage.getItem(type));
                }
                else {
                    localRecords = JSON.parse(localStorage.getItem(type));
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
        sessionStorage.setItem("lastLocalBackup", this.now);
    }

    backupToServer() {
        //find everything from the last server backup time in both sessionStorage and localStorage
        //If the user uses localStorage, don't delete from sessionStorage.
        //
    }

    synchronizeWithServer() {
        //send most recent time for each user with serverStorage
        //server sends back everything afterward, or a most recent time if it's before / same
        //if the server's most recent time is beforehand, set lastServerBackup and run backupToServer().
    }
}