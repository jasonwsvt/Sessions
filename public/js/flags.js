class Flags {
//    _flags = [];
    _flags = new Map();
    _methods = new Map();

    //e.g. If add = "addFlag", for example, this.addFlag will be the method to add a flag.
    //All parameters can be a unique string value, or set to true or false.
    //If any stay set to true, they will be formatted in a standard way.
    //If any are set to a string, they will be offered with that name.
    //If any are set to false, that method will not be offered.
    constructor(add = true, del = true, list = true, exists = true, empty = true, clear = true) {
        var methods = [add, del, list, exists, empty, clear];

        if (!methods.every(value => isString(value) || isBoolean(value)) ||
            new Set(methods).size == methods.length) { return false; }

        if (add    == true) { add    = "add";    }
        if (del    == true) { del    = "delete"; }
        if (list   == true) { list   = "list";   }
        if (exists == true) { exists = "exists";  }
        if (empty  == true) { empty  = "empty";  }
        if (clear  == true) { clear  = "clear";  }

        if (add    != false) { this[add]    = this._addNewFlag; }
        if (del    != false) { this[del]    = this._deleteExistingFlag; }
        if (list   != false) { this[list]   = this._list; }
        if (exists != false) { this[exists] = this._exists; }
        if (empty  != false) { this[empty]  = this._empty; }
        if (clear  != false) { this[clear]  = this._clear; }
    }

    //name must be a string.
    //All others default to true.  They can be specified to a unique string value, or set to false.
    //If any stay set to true, they will be formatted in a standard way, based on the value of flag or Flagged.
    //If any are set to a string, they will be offered with that name.
    //If any are set to false, that method will not be offered.
    _addNewFlag(name, list = true, remove = true, has = true, toggle = true, clear = true, isEmpty = true) {
        if (!isString(name)) { return; }

        var methods = new Map();
        methods.set("add",     name);    //flag          (select)
        methods.set("list",    list);    //flagged       (selected)
        methods.set("remove",  remove);  //unflag        (unselect)
        methods.set("has",     has);     //isFlagged     (isSelected)
        methods.set("toggle",  toggle);  //toggleFlagged (toggleSelected)
        methods.set("clear",   clear);   //empty         (emptySelect)
        methods.set("isEmpty", isEmpty); //isEmpty       (selectIsEmpty)

        const afmv = Array.from(methods.values());
        if (afmv.find(value => !isString(value) && !isBoolean(value)))
            { throw new Error("A value is not valid.");}
        if (this._list().find(flag => afmv.find(method => this._valueExists(flag, method))))
            { throw new Error("A method exists already."); }
        if (afmv.find((v1, i1) => find((v2, i2) => i1 != i2 && isString(v1) && v1 == v2)))
            { throw new Error("Not all method names are unique."); }

        if (list     == true)  { list     = name + "ed";        }
        const Flagged = list.charAt(0).toUpperCase() + list.slice(1);
        if (remove   == true)  { remove   = "un" + name;        }
        if (has      == true)  { has      = "is" + Flagged;     }
        if (toggle   == true)  { toggle   = "toggle" + Flagged; }
        if (clear    == true)  { clear    = "clear" + Flagged;  }
        if (isEmpty  == true)  { isEmpty  = name + "IsEmpty";   }
        const flagMethods = name + "Methods";
        const flagMethod  = name + "Method";

        methods.clear();
        methods.set("add",     name);
        methods.set("list",    list);
        methods.set("remove",  remove);
        methods.set("has",     has);
        methods.set("toggle",  toggle);
        methods.set("clear",   clear);
        methods.set("isEmpty", isEmpty);
        methods.set("methods", flagMethods);
        methods.set("method",  flagMethod);

        Object.keys(methods).forEach(method => { if (methods[method] == false) { delete methods[method]; }});

        this._flags.set(name, new Flag());
        this._methods.set(name, methods);
//        this._flags.push({"name": name, "flag": new Flag(), "methods": methods});

                                this[name]        = (...args) => this._flag(name).add(args);
        if (list    != false) { this[list]        = ()        => this._flag(name).list();       }
        if (remove  != false) { this[remove]      = (...args) => this._flag(name).remove(args); }
        if (has     != false) { this[has]         = (...args) => this._flag(name).has(args);    }
        if (toggle  != false) { this[toggle]      = (...args) => this._flag(name).toggle(args); }
        if (clear   != false) { this[clear]       = ()        => this._flag(name).clear();      }
        if (isEmpty != false) { this[isEmpty]     = ()        => this._flag(name).isEmpty();    }
                                this[flagMethods] = ()        => this._values(name);
                                this[flagMethod]  = (key)     => this._method(name, key);
    }

    //Flags methods
    _deleteExistingFlag(name) { this._flags.delete(name); this._methods.delete(name); }
    _list()                   { return [...this._flags.keys()]; }
    _empty()                  { this._flags.clear(); this._methods.clear(); }
    _clear(...args)            { this._list().forEach(name => this._flag(name).remove(argsList(args))); }
    _exists(name)             { return this._flags.has(name); } //this._list().includes(name); }

    //Flag methods
    _flag(name)               { return this._flags.get(name); }
    _values(name)             { return (this._exists(name)) ? [...this._methods.get(name).values()] : undefined; }
    _keyExists(name, key)     { return (this._exists(name) && this._methods.get(name).has(key)); }
    _valueExists(name, value) { return (this._exists(name) && this._values(name).includes(value)); }
    _method(name, key)        { return (this._exists(name)) ? this._methods.get(name).get(key)      : undefined; }
    
}