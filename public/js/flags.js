class Flags {
    _flags = [];

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

        var methods = { "add"     : name,     //flag          (select)
                        "list"    : list,     //flagged       (selected)
                        "remove"  : remove,   //unflag        (unselect)
                        "has"     : has,      //isFlagged     (isSelected)
                        "toggle"  : toggle,   //toggleFlagged (toggleSelected)
                        "clear"   : clear,    //empty         (emptySelect)
                        "isEmpty" : isEmpty}; //isEmpty       (selectIsEmpty)

        if (Object.values(methods).find(value => !isString(value) && !isBoolean(value)) ||
            this._list().find(flag => Object.values(methods).find(method => this._methods(flag).includes(method))) ||
            [...new Set(Object.values(methods))].length == Object.values(methods).length) { return; }

        if (list     == true)  { list     = name + "ed";        }
        const Flagged = list.charAt(0).toUpperCase() + list.slice(1);
        if (remove   == true)  { remove   = "un" + name;        }
        if (has      == true)  { has      = "is" + Flagged;     }
        if (toggle   == true)  { toggle   = "toggle" + Flagged; }
        if (clear    == true)  { clear    = "clear" + Flagged;  }
        if (isEmpty  == true)  { isEmpty  = name + "IsEmpty";   }
        const flagMethods = name + "Methods";
        const flagMethod  = name + "Method";

        var methods = { "add"     : name,
                        "list"    : list,
                        "remove"  : remove,
                        "has"     : has,
                        "toggle"  : toggle,
                        "clear"   : clear,
                        "isEmpty" : isEmpty,
                        "methods" : flagMethods,
                        "method"  : flagMethod};

        Object.keys(methods).forEach(method => { if (methods[method] == false) { delete methods[method]; }});

        this._flags.push({"name": name, "flag": new Flag(), "methods": methods});

                                this[name]        = (...args) => this._flag(name).add(args);
        if (list    != false) { this[list]        = ()        => this._flag(name).list();       }
        if (remove  != false) { this[remove]      = (...args) => this._flag(name).remove(args); }
        if (has     != false) { this[has]         = (...args) => this._flag(name).has(args);    }
        if (toggle  != false) { this[toggle]      = (...args) => this._flag(name).toggle(args); }
        if (clear   != false) { this[clear]       = ()        => this._flag(name).clear();      }
        if (isEmpty != false) { this[isEmpty]     = ()        => this._flag(name).isEmpty();    }
                                this[flagMethods] = ()        => this._methods(name);
                                this[flagMethod]  = (key)     => this._method(name, key);
    }

    _deleteExistingFlag(name) { this._flags.splice(this._flags.findIndex(flag => flag.name = name), 1); }

    _obj(name)     { return (this._exists(name)) ? this._flags.find(flag => flag.name == name) : undefined; }
    _flag(name)    { return (this._exists(name)) ? this._obj(name).flag                        : undefined; }
    _methods(name) { return (this._exists(name)) ? Object.values(this._obj(name).methods)      : undefined; }
    _method(name, key) {
        return (this._exists(name) && Object.keys(this._obj(name).methods).includes(key))
            ? this._obj(name).methods[key] : false;
    }

    _list()         { return this._flags.map(o => o.name); }
    _exists(name)   { return this._list().includes(name); }
    _empty()        { this._flags = []; }
    _clear(...args) { this._list().forEach(name => this._flag(name).remove(argsList(args))); }

    //Highlight selected, mark selected for deletion
    _flagFlagged(flag1, flag2) {
        //Find all values for flag2.
        //Add them to the list for flag1.
    }

    _unflagFlagged(flag1, flag2) {
        //Remove all values in flag2 from flag1

    }
}