class DataManager {
    _sessions = [];

    constructor() {
        //pull local data for user
        this._sessionInit();
        this._localInit();
        this._serverInit();
    }

    _sessionInit() {
        //pull all session data from sessionStorage, minus lines
        //put information into sessions object
    }

    _localInit() {
        //pull all session data from localStorage, minus lines
        //put information into sessions object
    }

    _serverInit() {
        //pull all session data from server storage, minus lines
        //put information into sessions object
    }

    authenticate(username, password) {
        
    }

    mostRecentSession() {

    }

    mostRecentIssue() {

    }

    mostRecentIssueSesion(issue) {

    }

    issues() {  //return array of issues sorted by lastOpened

    }

    issueSessions(issue) { //return array of creations

    }

    sessionLastEdited(session) {

    }

    sessionLastOpened(session) {

    }

    sessionIssue(session) {

    }

    sessionLines(session) {

    }

    renameIssue(oldIssue, newIssue) {

    }

    storeSession(session) {

    }

    getButtons() {
        return becauseReasonsButtonsData;
        //check if buttons are stored in localstorage, if so, check the version
        //pull the version of the most recent buttons from server
        //if the local version is older than the server version, or there is no local version,
        //pull buttons json data with ajax from the Node server
    }
}

class Session {
    _useLocalStorage = false;
    _useServerStorage = false;
    _flaggedForSendingToServer = false;
    _sessionLastEdited = null;
    _sessionLstOpened = null;
    _sessionIssue = null;
    _localLastEdited = null;
    _localLastOpened = null;
    _localIssue = null;
    _serverLastEdited = null;
    _serverLastOpened = null;
    _serverIssue = null;
    _creation = null;
    _lines = null;

    constructor(creation, useLocalStorage, useServerStorage) {
        this._creation = creation;
        this._useLocalStorage = useLocalStorage;
        this._useServerStorage = useServerStorage;
    }

    pullFromSessionStorage() {

    }

    pullFromLocalStorage() {

    }

    pullFromServerDB() {

    }

    saveToLocalStorage() {

    }

    saveToSessionStorage() {

    }

    dataForServer() {

    }

    flaggedForSendingToServer() {
        return _flaggedForSendingToServer;
    }

    setSessionData(issue, lastEdited, lastOpened) {
        this._sessionIssue = issue;
        this._sessionLastEdited = lastEdited;
        this._sessionOpenEdited = lastOpened;
    }

    setLocalData(issue, lastEdited, lastOpened) {
        this._localIssue = issue;
        this._localLastEdited = lastEdited;
        this._localOpenEdited = lastOpened;
    }

    setServerData(issue, lastEdited, lastOpened) {
        this._serverIssue = issue;
        this._serverLastEdited = lastEdited;
        this._serverOpenEdited = lastOpened;
    }

    get lastEdited() {
        if (!this._lastEdited) { this.pull(); }
        return this._lastEdited;
    }
    
    get lastOpened() {
        if (!this._lastOpened) { this.pull(); }
        return this._lastOpened;
    }

    get issue() {
        if (!this._issue) { this.pull(); }
        return this._issue;
    }

    get creation() {
        return this._creation;
    }

    get lines() {
        if (!this._lines) { this.pullMostRecent(); }
        return this._lines;
    }

    get clear() {
        this._issue = null;
        this._lastEdited = null;
        this._lastOpened = null;
        this._lines = null;
    }
}