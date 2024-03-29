var isFunction              = (v) => v && {}.toString.call(v) === '[object Function]';
var isString                = (v) => typeof v == "string";
var isArray                 = (v) => Array.isArray(v);
var isArrayOfObjects        = (v) => isArray(v) && v.every(x => isObject(x));
var isArrayOfStrings        = (v) => isArray(v) && v.every(x => isString(x));
var isArrayOfIntegers       = (v) => isArray(v) && v.every(x => isInteger(x));
var isArrayOfAlphabetics    = (v) => isArray(v) && v.every(x => isAlphabetic(x));
var isArrayOfAlphanumerics  = (v) => isArray(v) && v.every(x => isAlphanumeric(x));
var isArrayOfDataTrees      = (v) => isArray(v) && v.every(x => isDataTree(x));
var isSingleLevelArray      = (v) => isArray(v) && v.every(x => !isArray(x));
var isUndefined             = (v) => v == undefined;
var isNull                  = (v) => v == null;
var isNumber                = (v) => typeof v === 'number' && isFinite(v);
var isLowercase             = (v) => /^[a-z]+$/.test(v);
var isUppercase             = (v) => /^[A-Z]+$/.test(v);
var isAlphabetic            = (v) => /^[a-zA-Z]+$/.test(v);
var isAlphanumeric          = (v) => /^[a-zA-Z0-9]+$/.test(v);
var isInteger               = (v) => !isNaN(v) && parseInt(Number(v)) == v && !isNaN(parseInt(v, 10));
var isBoolean               = (v) => v === true || v === false;
var isSecondsFromEpoch      = (v) => isInteger(v) && v > 1600000000000;

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

function makeArray(values) {
    while (isArray(values) && values.length == 1 && isArray(values[0])) { values = values[0]; }
    if (!isArray(values)) { values = [values]; }
    return values;
}

//returns one single-level array of arguments, regardless of whether the arguments were given in an array
function smoothArray() {
    var args = arguments[0], num = 0, index;
    if (isArray(args)) {
        args = [...arguments[0]];
        while(true) {
            index = args.findIndex(arg => isArray(arg));
            if (index < 0 || num++ > 10) { break; }
            args = [].concat.apply([], args);
        }
    }
    else { args = [args]; }
    return args;
}