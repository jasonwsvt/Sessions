class Flags {
    _flags = [];

    //e.g. If add = "addFlag", for example, this.addFlag will be the method to add a flag.
    constructor(add = "add", del = "delete") {
        if (!isString(add) || !isString(del)) { throw new Error("Parameters must be strings."); }
        this[add] = this._addNewFlag;
        this[del] = this._deleteExistingFlag;
    }

    //flag must be a string.
    //All others default to true.  They can be specified to a unique string value, or set to false.
    //If any stay set to true, they will be formatted in a standard way, based on the value of flag.
    //If any are set to false, that method will not be offered.
    //If any are set to a string, another For all others that are set to true, they will be formatted in a standard way, based on the value of flag.
    _addNewFlag(name, list = true, unflag = true, includes = true, toggle = true, clear = true, isEmpty = true) {
        var methods = {
            "flag":     name,     //flag          (select)
            "list":     list,     //flagged       (selected)
            "unflag":   unflag,   //unflag        (unselect)
            "includes": includes, //isFlagged     (isSelected)
            "toggle":   toggle,   //toggleFlagged (toggleSelected)
            "clear":    clear,    //empty         (emptySelect)
            "isEmpty":  isEmpty}; //isEmpty       (selectIsEmpty)

        if (!isString(name) ||
            !Object.values(methods).every(value => isString(value) || isBoolean(value)) ||
            [...new Set(Object.values(methods))].length == Object.values(methods).length) { return; }

        if (list     == true)  { list     = name + "ed";        }
        const Flagged = list.charAt(0).toUpperCase() + list.slice(1);
        if (unflag   == true)  { unflag   = "un" + name;        }
        if (includes == true)  { includes = "is" + Flagged;     }
        if (toggle   == true)  { toggle   = "toggle" + Flagged; }
        if (clear    == true)  { clear    = "clear" + Flagged; }
        if (isEmpty  == true)  { isEmpty  = name + "IsEmpty"; }

        const flagMethods = name + "Methods";
        const flagMethod  = name + "Method";

        var methods = { "flag"       : name,
                        "list"       : list,
                        "unflag"     : unflag,
                        "includes"   : includes,
                        "toggle"     : toggle,
                        "clear"      : clear,
                        "isEmpty"    : isEmpty,
                        "flagMethods": flagMethods,
                        "flagMethod" : flagMethod};

        Object.keys(methods).forEach(method => { if (methods[method] == false) { delete methods[method]; }});

        this._flags.push({"name": name, "flag": new Flag(), "methods": methods});

                                 this[name]     = (values) => this._flag(name).add(values);
        if (unflag   != false) { this[unflag]   = (values) => this._flag(name).remove(values);   }
        if (toggle   != false) { this[toggle]   = (values) => this._flag(name).toggle(values);   }
        if (includes != false) { this[includes] = (values) => this._flag(name).includes(values); }
        if (list     != false) { this[list]     = ()       => this._flag(name).list();           }
        if (clear    != false) { this[clear]    = ()       => this._flag(name).clear();          }
        if (isEmpty  != false) { this[isEmpty]  = ()       => this._flag(name).isEmpty();        }

                                 this[flagMethods] = ()    => this._methods(name);
                                 this[flagMethod]  = (key) => this._method(name, key);
    }

    _deleteExistingFlag(name) { delete this._flags[this._flags.findIndex(flag => flag.name = name)]; }

    _obj(name)     { return (this.exists(name)) ? this._flags.find(flag => flag.name == name) : undefined; }
    _flag(name)    { return (this.exists(name)) ? this._obj(name).flag : undefined; }
    _methods(name) { return (this.exists(name)) ? Object.values(this._obj(name).methods) : undefined; }
    list()         { return this._flags.map(o => o.name); }
    exists(name)   { return this.list().includes(name); }
    empty()        { this._flags = []; }

    _method(name, key) {
        return (this.exists(name) && Object.keys(this._obj(name).methods).includes(key))
            ? this._obj(name).methods[key] : false;
    }


    //Highlight selected, mark selected for deletion, mark
    _flagFlagged(flag1, flag2) {
        //Find all values for flag2.
        //Add them to the list for flag1.
    }

    _unflagFlagged(flag1, flag2) {
        //Remove all values in flag2 from flag1

    }

    _throwErrorOnDNE(name) {
        if (!this.exists(name)) { throw new Error("Flag", name, "doesn't exist."); }
    }

}