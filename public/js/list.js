//Keys can either be false (default)) automatically generated, or
//                   true) any integer or alphanumeric string starting with an alphabetic character
//_keyItems is the number of values in the key.
//_validate(keys, values, input) returns whether or not the input is valid
//_key(keys, values, input) returns the value of the key
//_value(keys, values, input) returns the value of the value
//_has(keys, values, input) returns whether or not the List has the input in the keys
//_find(keys, values, input) returns whether or not the List has the input in the values
//By default, List is set up with automatically generated keys
class List {
    _keyItems;
    _items = [];
    _count = -1;
    _autoKeys = true;
    
    constructor(auto = true, validate = false) {
        if (validate != false) {
            this._validate = validate;
            if (auto == true) {
                this.set = (value) => {
                    if (this._validate(value, this._items)) {
                        this._items.push(value);
                        return this._items.length - 1;
                    }
                }
            }
            else {
                this.set = (key, value) => {
                    if (isString(key) && !Object.keys(this._items).includes(key) && this._validate(value, this._items)) {
                        this._items[key] = value;
                        return key;
                    }
                }
            }
        }
        else {
            if (auto == true) {
                this.set = (value) => {
                    this._items.push(value);
                    return this._items.length - 1;
                }
            }
            else {
                this.set = (key, value) => {
                    if (isString(key) && !Object.keys(this._items).includes(key)) {
                        this._items[key] = value;
                        return key;
                    }
                }
            }
        }
        if (auto == true) {
            if (validate != false) {
                //Set all functions to not require key and use validation function.
                this.set = (value) => {
                    if (this._validate(value, this._items)) {
                        this._items.push(value);
                        return this._items.length - 1;
                    }
                }
                this._validate = validate;
            }
            else {
                //Set all functions to not require key and to not validate.
                this.set = (value) => {
                    this._items.push(value);
                    return this._items.length - 1;
                }
            }
        }
        else {
            if (validate != false) {
                //Set all functions to require key and use validation function.
                this.set = (key, value) => {
                    if (isString(key) && this._validate(value, this._items)) {
                        this._items[key] = value;
                        return key;
                    }
                }
                this._validate = validate;
            }
            else {
                //Set all functions to require key.
            }
        }
    }

    //Returns whether or not value is valid
    _validate = (count, keys, values, input) => { return true; }
    _key      = (count, keys, values, input) => {
        return (this._keyItems == 0) ? ++count : (this._keyItems == 1) ? input[0] : input.slice(0, this._keyItems);
    }
    _value    = (count, keys, values, input) => {
        return input.slice(this._keyItems, 1);
    }

    _find     = (count, keys, values, input) => { return values.indexOf(input); }

    set(...args) {
        const keys = this._keys(), values = this._values();
        if (this._validate(this._count, keys, values, args)) {
            this[this._key(this._count, keys, values, args)] = this._value(this._count, keys, values, args);
        }
    }

    delete(input) {
        if (this._autoKeys && this.find(input)) {
            delete this.find(input)
        }
    }

    has(...args) {
        return (this._keyItems == 0 || this._keyItems == 1) ? Object.keys(this).includes(args[0])
             : this._has(this._count, this._keys(), this._values(), args); }
    find(...args) { return this._find(this._count, this._keys(), this._values(), args); }

    keys() { return Object.keys(this).filter(key => !Object.keys(this.prototype).includes(key)); }
    values() { return this.keys().map(key => this[key]); }
}