class List {
    _list = [];
    _count = -1;
    
    constructor(validate = false, has = false) {
        if (validation != false) { this._validate = validate; }
        if (has != false) { this.has = has; }
    }

    //sets the single parameter function to call with the value to verify validity
    _validate(value) { return true; }
    //sets the two parameter function to call for sorting

    //whether or not the key exists
    _has = (value, item) => { return value == item; }
    has(value) { return this.values().find(item => this._has(value, item));  }

    // returns an array of all values
    values()    { return this._keys().map(key => this[key]); }
    _keys()      { return Object.keys(this).filter(isInteger); }
    _key(value) { return this._keys().find(key => this[key] == value); }
    _index(key) { return this._keys().indexOf(key); }

    // returns the number of keys
    size() { return this.values().length; }

    push(value) {
        if (this._validate(value)) {
            this[++count] = value;
            this._list.push(count); 
            return count;
        } else { console.log("Failed to add", value, "."); return; }
    }
    unshift(value) {
        if (this._validate(value)) {
            this[++count] = value;
            this._list.unshift(value); 
            return count;
        } else { console.log("Failed to add", value, "."); return; }
    }
    pop() {
        const key = this._list.pop(); 
        const value = this[key]; 
        delete this[key];
        return value;
    }
    shift() {
        const key = this._list.shift();
        const value = this[key]; 
        delete this[key];
        return value;
    }

    //remove the key
    delete(value) { key = this._key(value); this._list.splice(this._index(key), 1); delete this[key]; }
}