class Flags extends List {

    //e.g. If add = "addFlag", for example, this.addFlag will be the method to add a flag.
    //All parameters can be a unique string value, or set to true or false.
    //If any stay set to true, they will be formatted in a standard way.
    //If any are set to a string, they will be offered with that name.
    //If any are set to false, that method will not be offered.
    constructor(add = true, del = true, values = true, has = true, empty = true, clear = true) {
        super((value, items) => isInteger(value) && !items.find(item => item.hasValue(value)), //validateValue
                (key, items) => (isLowercase(key) && !items.find(item => item.key == key)),    //validateKey
              (value, items) => items.findIndex(item => item.hasValue(value)));                //index
        var methods = [add, del, values, has, empty, clear];

        if (!methods.every(value => isString(value) || isBoolean(value)) ||
            new Set(methods).size == methods.length) { return false; }

        if (add    == true) { add    = "add";    }
        if (del    == true) { del    = "delete"; }
        if (values == true) { values = "values"; }
        if (has    == true) { has    = "has";    }
        if (empty  == true) { empty  = "empty";  }
        if (clear  == true) { clear  = "clear";  }

        if (add    != false) { this[add]    = this._addNewFlag; }
        if (del    != false) { this[del]    = this._deleteExistingFlag; }
        if (values != false) { this[values] = this._values; }
        if (has    != false) { this[has]    = this._has; }
        if (empty  != false) { this[empty]  = this._empty; }
        if (clear  != false) { this[clear]  = this._clear; }
    }

    //name must be a string.
    //All others default to true.  They can be specified to a unique string value, or set to false.
    //If any stay set to true, they will be formatted in a standard way, based on the value of flag or Flagged.
    //If any are set to a string, they will be offered with that name.
    //If any are set to false, that method will not be offered.
    _addNewFlag(name, values = true, remove = true, has = true, toggle = true, clear = true, isEmpty = true) {
        if (!isString(name)) { return; }

        var methods = new Map();
        methods.set("add",     name);    //flag          (select)
        methods.set("values",  values);    //flagged       (selected)
        methods.set("remove",  remove);  //unflag        (unselect)
        methods.set("has",     has);     //isFlagged     (isSelected)
        methods.set("toggle",  toggle);  //toggleFlagged (toggleSelected)
        methods.set("clear",   clear);   //empty         (emptySelect)
        methods.set("isEmpty", isEmpty); //isEmpty       (selectIsEmpty)

        const afmv = Array.from(methods.values());
        if (afmv.find(value => !isString(value) && !isBoolean(value)))
            { throw new Error("A value is not valid.");}
        if (this._values().find(flag => afmv.find(method => this._valueExists(flag, method))))
            { throw new Error("A method exists already."); }
        if (afmv.find((v1, i1) => find((v2, i2) => i1 != i2 && isString(v1) && v1 == v2)))
            { throw new Error("Not all method names are unique."); }

        if (values   == true)  { values   = name + "ed";        }
        const Flagged = values.charAt(0).toUpperCase() + values.slice(1);
        if (remove   == true)  { remove   = "un" + name;        }
        if (has      == true)  { has      = "is" + Flagged;     }
        if (toggle   == true)  { toggle   = "toggle" + Flagged; }
        if (clear    == true)  { clear    = "clear" + Flagged;  }
        if (isEmpty  == true)  { isEmpty  = name + "IsEmpty";   }
        const flagMethods = name + "Methods";
        const flagMethod  = name + "Method";

        methods.clear();
        methods.set("add",     name);
        methods.set("values",  values);
        methods.set("remove",  remove);
        methods.set("has",     has);
        methods.set("toggle",  toggle);
        methods.set("clear",   clear);
        methods.set("isEmpty", isEmpty);
        methods.set("methods", flagMethods);
        methods.set("method",  flagMethod);

        Object.keys(methods).forEach(method => { if (methods[method] == false) { delete methods[method]; }});

        this.add(name, new Flag());
        this._methods.set(name, methods);
//        this._flags.push({"name": name, "flag": new Flag(), "methods": methods});

                                this[name]        = (...args) => this.value(name).add(args);
        if (values  != false) { this[values]      = ()        => this.value(name).values();     }
        if (remove  != false) { this[remove]      = (...args) => this.value(name).remove(args); }
        if (has     != false) { this[has]         = (...args) => this.value(name).has(args);    }
        if (toggle  != false) { this[toggle]      = (...args) => this.value(name).toggle(args); }
        if (clear   != false) { this[clear]       = ()        => this.value(name).clear();      }
        if (isEmpty != false) { this[isEmpty]     = ()        => this.value(name).isEmpty();    }
                                this[flagMethods] = ()        => this._values(name);
                                this[flagMethod]  = (key)     => this._method(name, key);
    }

    //Flags methods
    _deleteExistingFlag(name) { this.delete(name); this._methods.delete(name); }
    _values()                 { return [...this.values()]; }
    _empty()                  { this._flags.clear(); this._methods.clear(); }
    _clear(...args)           { this._values().forEach(name => this._flag(name).remove(smoothArray(args))); }
    _exists(name)             { return this._flags.has(name); }

    //Flag methods
    _flag(name)               { return this._flags.get(name); }
    _values(name)             { return (this._has(name)) ? [...this._methods.get(name).values()] : undefined; }
    _keyExists(name, key)     { return (this._has(name) && this._methods.get(name).has(key)); }
    _valueExists(name, value) { return (this._has(name) && this._values(name).includes(value)); }
    _method(name, key)        { return (this._has(name)) ? this._methods.get(name).get(key)      : undefined; }
    
}