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
                        const key = parseInt(this._items.length);
                        this._items.push({ "key": key, "value": value });
                        return key;
                    }
                }
            }
            else {
                //Manual keys and value validation
                this.add = (key, value) => {
                    console.log(key, "is string:", isString(key));
                    console.log(key, "is number:", isNumber(key));
                    console.log(key, "is unique:", !this._items.find(item => item.key == key));
                    console.log(value, "is valid:", this._validate(value, this._items));
                    if ((isString(key) || isNumber(key)) && !this._items.find(item => item.key == key) && this._validate(value, this._items)) {
                        this._items.push({ "key": key, "value": value });
                        return key;
                    }
                }
            }
        }
        else {
            if (auto == true) {
                //Automatic keys and no value validation
                this.add = (value) => {
                    const key = this._items.length;
                    this._items.push({ "key": key, "value": value });
                    return key;
                }
            }
            else {
                //Manual keys and no value validation
                this.add = (key, value) => {
                    if ((isString(key) || isNumber(key)) && !this._items.find(item => item.key == key)) {
                        this._items.push({ "key": key, "value": value });
                        return key;
                    }
                }
            }
        }
        if (index == undefined) {
            this._index = (value, items) => {
                return items.findIndex(item => item.value == value);
            }
        }
    }


    keys     = ()      => { return this._items.map(item => item.key); }
    hasKey   = (key)   => { return !!this._items.find(item => item.key == key); }
    value    = (key)   => { return this._items.find(item => item.key == key).value; }
    dropKey  = (key)   => {
//        console.log("dropKey", key, this.hasKey(key), this._items.findIndex(item => item.key == key));
        if (this.hasKey(key)) {
//            console.log("before", this.keys(), this.values());
            this._items.splice(this._items.findIndex(item => item.key == key), 1);
//            console.log("after", this.keys(), this.values());
            return true; }
        else {
            return false;
        }
    }
    
    values    = ()      => { return this._items.map(item => item.value); }
    hasValue  = (value) => { return this._index(value, this._items) != -1; }
    key       = (value) => { return this._items[this._index(value, this._items)].key; }
    dropValue = (value) => {
        const len = this._items.length;
        var i = 0;
        while (this.hasValue(value) && i++ < 10) {
//            console.log("dropValue", value, this.hasValue(value), this._index(value, this._items));
            this._items.splice(this._index(value, this._items), 1);
        }
        return (len != this._items.length);
    }
    dropValues = (values) => { values.forEach(value => this.dropValue(value)); } 
}
    