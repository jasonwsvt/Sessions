class App {
    _users = null;
    _buttons = null;
    _editor = null;
    _utilities = null;

    constructor() {
        this._users = new Users(this);
        this._editor = new Editor(this);
        this._utilities = new Utilities(this);
        this._buttons = new Buttons(this);
        this.editor.load();
    }

    get app()       { return this; }
    get users()     { return this._users; }
    get editor()    { return this._editor; }
    get utilities() { return this._utilities; }
    get buttons()   { return this._buttons; }
}

var isFunction         = (v) => { return v && {}.toString.call(v) === '[object Function]'; }
var isString           = (v) => { return (typeof v == "string"); }
var isArray            = (v) => { return Array.isArray(v); }
var isArrayOfObjects   = (v) => { return (isArray(v) && v.forEach(x => isObject(x))); }
var isArrayOfStrings   = (v) => { return (isArray(v) && v.forEach(x => isString(x))); }
var isUndefined        = (v) => { return v == undefined; }
var isNull             = (v) => { return v == null; }
var isNumber           = (v) => { return (typeof v === 'number' && isFinite(v)); }
var isInteger          = (v) => { return !isNaN(v) && parseInt(Number(v)) == v && !isNaN(parseInt(v, 10)); }
var isBoolean          = (v) => { return Boolean(v); }
var isSecondsFromEpoch = (v) => { return (isInteger(v) && v > 1600000000000); }

function isObject(v) {
    try { var j = JSON.stringify(v); }
    catch (error) { return false; }
    if (j.startsWith("{")) { return true; }
    return false;
}

//*******************************************************************
// params: v - any variable
// returns: a string representing the type of the variable
function varType(v) {
    if (isFunction(v))         { return "function"; }
    if (isString(v))           { return "string"; }
    if (isArrayOfObjects(v))   { return "arrayOfObjects"; }
    if (isArrayOfStrings(v))   { return "arrayOfStrings"; }
    if (isArray(v))            { return "array"; }
    if (isUndefined(v))        { return "undefined"; }
    if (isNull(v))             { return "null"; }
    if (isInteger(v))          { return "integer"; }
    if (isNumber(v))           { return "number"; }
    if (isBoolean(v))          { return "boolean"; }
    if (isSecondsFromEpoch(v)) { return "secondsFromEpoch"; }
    console.log("Unsure what it is.  Typeof says it's of type " + typeof v + ".", v);
    return "Unknown";
}

//*******************************************************************
// params: v - any variable
//         f - a function with one parameter that returns whether or not the parameter is of a certain type
//   desc: If f(v) returns false, throw an informational message to console.log.
function varErr(v, f, vName) {
    if (!f(v)) { console.log(f.name,"returned false. " + vName + " Is of type " + varType(v) + "."); }
}

var app = new App();