class List {
    _count;
    _sortFunc;
    constructor(validate = false, has = false) {
        if (validation != false) { this._validate = validate; }
        if (has != false) { this.has = has; }
        this._count = -1;
    }

    //sets the single parameter function to call with the value to verify validity
    _validate(value) { return true; }
    //sets the two parameter function to call for sorting
    _sort(func) { }



    has(value) { return this.values.find(v => v == value);  }

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