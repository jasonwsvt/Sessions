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
    add = null;
    validate = null;
    index = null;
    
    constructor(auto = true, validate, index) {
        if (validate != undefined) {
            this._validate = validate;
            if (auto == true) {
                //Automatic keys and value validation
                this.add = (value) => {
                    if (this._validate(value, this._items)) {
                        const key = this._items.length;
                        this._items[key] = value;
                        return key;
                    }
                }
                this.remove = (value) => {
                    const i = this.key(value);
                    if (i != -1) {
                        delete this._items[i];
                        return true; }
                    else {
                        return false;
                    }
                }
            }
            else {
                //Manual keys and value validation
                this.add = (key, value) => {
                    if (isString(key) && !Object.keys(this._items).includes(key) && this._validate(value, this._items)) {
                        this._items[key] = value;
                        return key;
                    }
                }
                this.remove = (key) => {
                    if (this.has(key)) {
                        delete this._items[key];
                        return true; }
                    else {
                        return false;
                    }
                }
            }
        }
        else {
            if (auto == true) {
                //Automatic keys and no value validation
                this.add = (value) => {
                    const key = this._items.length;
                    this._items[key] = value;
                    return key;
            }
                this.remove = (value) => {
                    const i = this.key(value);
                    if (i != -1) {
                        delete this._items[i];
                        return true; }
                    else {
                        return false;
                    }
                }
            }
            else {
                //Manual keys and no value validation
                this.add = (key, value) => {
                    if (isString(key) && !Object.keys(this._items).includes(key)) {
                        this._items[key] = value;
                        return key;
                    }
                }
                this.remove = (key) => {
                    if (this.has(key)) {
                        delete this._items[key];
                        return true; }
                    else {
                        return false;
                    }
                }
            }
        }
        if (index == undefined) {
            this._index = (value, values) => {
                return values.findIndex(key => this._items[key] == value);
            }
        }
    }


    keys   = ()      => { return Object.keys(this._items); }
    has    = (key)   => { return this.keys().includes(key); }
    value  = (key)   => { return (this.has(key)) ? this.values()[this._items.indexOf(key)] : undefined; }
    
    values = ()      => { return Object.values(this._items); }
    find   = (value) => { return this._index(value, this.values()) != -1; }
    key    = (value) => { const i = this._index(value, this.values()); return (i != -1) ? this.keys()[i] : undefined; }
    

}
    