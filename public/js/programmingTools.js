var isFunction         = (v) => { return v && {}.toString.call(v) === '[object Function]'; }
var isString           = (v) => { return (typeof v == "string"); }
var isArray            = (v) => { return Array.isArray(v); }
var isArrayOfObjects   = (v) => { return (isArray(v) && v.every(x => isObject(x))); }
var isArrayOfStrings   = (v) => { return (isArray(v) && v.every(x => isString(x))); }
var isArrayOfIntegers  = (v) => { return (isArray(v) && v.every(x => isInteger(x))); }
var isArrayOfDataTrees = (v) => { return (isArray(v) && v.every(x => isDataTree(x))); }
var isUndefined        = (v) => { return v == undefined; }
var isNull             = (v) => { return v == null; }
var isNumber           = (v) => { return (typeof v === 'number' && isFinite(v)); }
var isInteger          = (v) => { return !isNaN(v) && parseInt(Number(v)) == v && !isNaN(parseInt(v, 10)); }
var isBoolean          = (v) => { return (v === true || v === false); }
var isSecondsFromEpoch = (v) => { return (isInteger(v) && v > 1600000000000); }

var isDataTree = (v) => {
    const keys = Object.keys(v);
    return (isObject(v) &&
        keys.includes("id") &&
        (keys.find(key => key.endsWith("Id")) || keys.find(key => key.endsWith("s"))));
}

function isObject(v) {
    if (isNull(v) || isUndefined(v) || isBoolean(v)) { return false; }
    try { var j = JSON.stringify(v); }
    catch (error) { return false; }
    if (j.startsWith("{")) { return true; }
    return false;
}

function isNumeric(v) {
    if (typeof v != "string") return false; // we only process strings!  
    return !isNaN(v) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(v)); // ...and ensure strings of whitespace fail
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
    if (!f(v)) {
        console.log(vName + ": " + f.name + " false, " + varType(v) + " true.");
        console.log(v);
    }
}

function throwWarning(f,v) { if (!f(v)) { console.log("Warning: failed test", f.name, v); }}

function throwError(f, v) { if (!f(v)) { throw new Error("Failed test", f.name, v); }}