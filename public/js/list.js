//Keys can either be false (default)) automatically generated, or
//                   true) any integer or alphanumeric string starting with an alphabetic character
//_keyItems is the number of values in the key.
//_validate(keys, values, input) returns whether or not the input is valid
//_key(keys, values, input) returns the value of the key
//_value(keys, values, input) returns the key of the value
//_has(keys, values, input) returns whether or not the List has the input in the keys
//_find(keys, values, input) returns whether or not the List has the input in the values
//By default, List is set up with automatically generated keys
class List {
    _keyItems;
    _items = [];
    _count = -1;
    set = null;
    validate = null;
    index = null;

    
    constructor(auto = true, validate, index) {
        if (validate != undefined) {
            this._validate = validate;
            if (auto == true) {
                //Automatic keys and value validation
                this.set = (value) => {
                    if (this._validate(value, this._items)) {
                        this._items.push(value);
                        return this._items.length - 1;
                    }
                }
            }
            else {
                //Manual keys and value validation
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
                //Automatic keys and no value validation
                this.set = (value) => {
                    this._items[this._items.length] = value;
                    return this._items.length - 1;
                }
            }
            else {
                //Manual keys and no value validation
                this.set = (key, value) => {
                    if (isString(key) && !Object.keys(this._items).includes(key)) {
                        this._items[key] = value;
                        return key;
                    }
                }
            }
        }
        if (index == undefined) {
            this.index = (value) => {
                return this.values().findIndex(key => this._items[key] == value);
            }
        }
    }

    keys   = ()      => { return Object.keys(this._items); }
    values = ()      => { return Object.values(this._items); }
    remove = (key)   => { delete this._items[key]; }
    value  = (key)   => { return this.values[this._items.indexOf(key)]; }
    has    = (key)   => { return this.keys.includes(key); }
    key    = (value) => { return this.keys[this.index(value)]; }
    find   = (value) => { return this.index(value) != -1; }
}