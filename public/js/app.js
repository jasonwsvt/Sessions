const { isValidObjectId } = require("mongoose");

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

var app = new App();

function isFunction(v)         { return v && {}.toString.call(v) === '[object Function]'; }
function isString(v)           { return (typeof v == "string"); }
function isArrayOfObjects(v)   { return (isArray(v) && v.forEach(x => isObject(x))); }
function isArrayOfStrings(v)   { return (isArray(v) && v.forEach(x => isString(x))); }
function isUndefined(v)        { return v == undefined; }
function isNull(v)             { return v == null; }
function isNumber(v)           { return (typeof v === 'number' && isFinite(v)); }
function isInteger(v)          { return !isNaN(v) && parseInt(Number(v)) == v && !isNaN(parseInt(v, 10)); }
function isBoolean(v)          { return Boolean(v); }
function isSecondsFromEpoch(v) { return (isInteger(v) && v > 1600000000000); }

function isArray(v) {
    try { var j = JSON.stringify(v); }
    catch (error) { return false; }
    if (j.startsWith("[")) { return true; }
    return false;
}

function isObject(v) {
    try { var j = JSON.stringify(v); }
    catch (error) { return false; }
    if (j.startsWith("{")) { return true; }
    return false;
}

function varType(v) {
    if (isFunction(v))         { return "function"; }
    if (isString(v))           { return "string"; }
    if (isArrayOfObjects(v))   { return "arrayOfObjects"; }
    if (isArrayOfStrings(v))   { return "arrayOfStrings"; }
    if (isUndefined(v))        { return "undefined"; }
    if (isNull(v))             { return "null"; }
    if (isNumber(v))           { return "number"; }
    if (isInteger(v))          { return "integer"; }
    if (isBoolean(v))          { return "boolean"; }
    if (isSecondsFromEpoch(v)) { return "secondsFromEpoch"; }
    if (is(v)) { return ""; }
    if (is(v)) { return ""; }
}

function varErr(v, func) {
    var varType = varType(v);
    var funcName = func.name;
    var varName = Object.keys(v);
    if (!func(v)) { console.log(funcName,"(",varName,") returned false. Is", varType,"\n", v);}
}

