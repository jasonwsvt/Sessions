class List {
    _count;
    _requireUnique;
    _validationFunc;
    _sortFunc;
    constructor(unique = false, validation = false, sort = false, has = false) {
        this._requireUnique = unique;
        if (validation != false) { this._validationFunc = validation; }
        if (sort != false) { this._sortFunc = sort; }
        this._count = -1;
    }

    //sets whether to allow duplicates
    unique(bool) { if (isBoolean(bool)) {this._requireUnique = bool; }}

    //sets the single parameter function to call with the value to verify validity
    validation(func) { this._validationFunc = validation; }

    //sets the two parameter function to call for sorting
    sort(func) { }

    // returns an array of all values
    values() { return Object.keys(this).filter(isInteger).map(key => this[key]); }

    // returns the number of keys
    size() { return this.values().length; }

    push(value) { this[++count] = value; return count; }
    pop() {
        const key = Object.keys(this).pop()
        const value = this[key];
        delete this[key];
        return value;
    }
    shift(value) {
        const key = Object.keys(this).shift()
        const value = this[key];
        delete this[key];
        return value;
    }
    unshift() { this[++count] = value; return count; }

    //remove the key
    delete(value)

    //whether or not the key exists
    has(value) { return this.values().find(this._hasFunc); }

    //returns the value for the given key
    get(value)

}