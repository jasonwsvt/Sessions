//Key can be:
//     1) false (default): automatically generated,
//     2) true:            any integer or alphanumeric string, or
//     3) function:        use another function to validate keys
//_validateValue(value, items) returns whether or not the input is valid
//By default, List is set up with automatically generated keys
class List {
    _items = [];
    add = null;
    _validateValue = null;
    index = null;
    
    constructor(validateValue, validateKey = false, index) {
        if (validateValue != undefined) {
            this._validateValue = validateValue;
            if (validateKey == false) {
                //Automatic keys and value validation
                this.add = (value) => {
                    //console.log(value);
                    if (this._validateValue(value, this._items)) {
                        const key = parseInt(this._items.length);
                        this._items.push({ "key": key, "value": value });
                        return key;
                    }
                }
                this.toggle = (value) => {
                    if (this.hasValue(value)) { this.dropValue(value); } else { this.add(value); }
                }
            }
            else {
                this._validateKey = (validateKey != true) ? validateKey
                    : (key, items) => (isAlphanumeric(key)) && !items.find(item => item.key == key);
                //Manual keys and value validation
                this.add = (key, value) => {
                    //console.log(key, "is string:", isString(key));
                    //console.log(key, "is number:", isNumber(key));
                    //console.log(key, "is unique:", !this._items.find(item => item.key == key));
                    //console.log(value, "is valid:", this._validateValue(value, this._items));
                    if (this._validateKey(key, this._items) && this._validateValue(value, this._items)) {
                        console.log(key, "is valid")
                        this._items.push({ "key": key, "value": value });
                        return key;
                    }
                    else { console.log("is not valid")}
                }
            }
        }
        else {
            if (validateKey == false) {
                //Automatic keys and no value validation
                this.add = (value) => {
                    const key = this._items.length;
                    this._items.push({ "key": key, "value": value });
                    return key;
                }
            }
            else {
                this._validateKey = (validateKey != true) ? validateKey
                    : (key, items) => (isAlphanumeric(key)) && !items.find(item => item.key == key);
                //Manual keys and no value validation
                this.add = (key, value) => {
                    if (this._validateKey(key, this._items)) {
                        this._items.push({ "key": key, "value": value });
                        return key;
                    }
                }
            }
        }
        if (index == undefined) {
            this._index = (value, items) => items.findIndex(item => item.value == value);
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
            return true;
        }
        else {
            return false;
        }
    }
    
    values    = ()       => { return this._items.map(item => item.value); }
    hasValue  = (value)  => { return this._index(value, this._items) != -1; }
    key       = (value)  => { return this._items[this._index(value, this._items)].key; }
    dropValue = (value)  => {
        const len = this._items.length;
        var i = 0;
        while (this.hasValue(value) && i++ < 10) {
//            console.log("dropValue", value, this.hasValue(value), this._index(value, this._items));
            this._items.splice(this._index(value, this._items), 1);
        }
        return (len != this._items.length);
    }
    dropValues = (values) => { values.forEach(value => this.dropValue(value)); } 

    clear     = ()       => { this._items = []; }
    size      = ()       => { return this._items.length; }
    isEmpty   = ()       => { return !this._items.length; }
}
    