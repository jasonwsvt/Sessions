class Flags {
    _flags = [];
    _methods = [];

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
    _addNewFlag(flag, flagged = true, unflag = true, isFlagged = true, areFlagged = true, toggleFlagged = true, flagMultiple = true, unflagMultiple = true) {
        var values = {
            "flag": flag,
            "flagged": flagged,
            "unflag": unflag,
            "isFlagged": isFlagged,
            "areFlagged": areFlagged,
            "toggleFlagged": toggleFlagged,
            "flagMultiple": flagMultiple,
            "unflagMultiple": unflagMultiple};


        if (!isString(flag) ||
            !Object.values(values).every(value => isString(value) || isBoolean(value)) ||
            [...new Set(Object.values(values))].length == Object.values(values).length) { return; }

        if (flagMultiple   == true)  { flagMultiple = flag + "Multiple";     }
        if (flagged        == true)  { flagged = flag + "ed";                }
        const Flagged = flagged.charAt(0).toUpperCase() + flagged.slice(1);
        if (unflag         == true)  { unflag = "un" + flag;                 }
        if (unflagMultiple == true)  { unflagMultiple = unflag + "Multiple"; }
        if (isFlagged      == true)  { isFlagged = "is" + Flagged;           }
        if (areFlagged     == true)  { areFlagged = "are" + Flagged;         }
        if (toggleFlagged  == true)  { toggleFlagged = "toggle" + Flagged;   }

        values = {
            "flag": flag,
            "flagged": flagged,
            "unflag": unflag,
            "isFlagged": isFlagged,
            "areFlagged": areFlagged,
            "toggleFlagged": toggleFlagged,
            "flagMultiple": flagMultiple,
            "unflagMultiple": unflagMultiple};

        Object.keys(values).forEach(value => { if (values[value] == false) { delete values[value]; }});


                                       this[flag]             = (value)     => this._flagOne(flag, value);
        if (unflag         != false) { this[unflag]           = (value)     => this._unflag(flag, value);          }
        if (toggleFlagged  != false) { this[toggleFlagged]    = (...values) => this._toggleFlagged(flag, values);  }
        if (flagMultiple   != false) { this[flagMultiple]     = (...values) => this._flagMultiple(flag, values);   }
        if (unflagMultiple != false) { this[unflagMultiple]   = (...values) => this._unflagMultiple(flag, values); }
        if (isFlagged      != false) { this[isFlagged]        = (value)     => this._isFlagged(flag, value);       }
        if (areFlagged     != false) { this[areFlagged]       = (...values) => this._areFlagged(flag, values);     }
        if (flagged        != false) { this[flagged]          = ()          => this._flaggedArray(flag);           }

        this._methods[flag] = values;
                                       this[flag + "Methods"] = ()          => this._flagMethods(flag);
                                       this[flag + "Method"]  = (key)       => this._flagMethod(flag, key);
        this._flags[flag] = [];
    }

    flags() { return Object.keys(this._flags); }

    _flagExists(flag) { return this.flags().includes(flag); }

    _flagMethods(flag) { return this._methods[flag]; }

    _flagMethod(flag, key) {
        if (!Object.keys(this._flagMethods(flag)).includes(key)) { return false; }
        return this._methods[flag][key]; }


    _deleteExistingFlag(flag) {
        this._throwErrorOnDNE(flag);
        delete this._flags[flag];
    }

    _flagOne(flag, value) {
        this._throwErrorOnDNE(flag);
        if (!this._isFlagged(flag, value)) {
            this._flags[flag].push(value);
        }
    }

    _flagMultiple(flag, values) {
        this._throwErrorOnDNE(flag);
        if (values.length == 1 && isArray(values[0])) { values = values[0]; }
        values.forEach(value => this._flagOne(flag, value));
    }

    _unflag(flag, value) {
        this._throwErrorOnDNE(flag);
        if (this._isFlagged(flag, value)) {
            this._flags[flag].splice(this._flags.indexOf(value), 1);
        }
    }

    _unflagMultiple(flag, values) {
        this._throwErrorOnDNE(flag);
        if (values.length == 1 && isArray(values[0])) { values = values[0]; }
        values.forEach(value => this._unflag(flag, value));
    }

    _flaggedArray(flag) {
        this._throwErrorOnDNE(flag);
        return this._flags[flag];
    }

    _isFlagged(flag, value) {
        this._throwErrorOnDNE(flag);
        return this._flags[flag].includes(value);
    }

    _areFlagged(flag, values) {
        this._throwErrorOnDNE(flag);
        if (values.length == 1 && isArray(values[0])) { values = values[0]; }
        return values.every(value => this._isFlagged(flag, value));
    }

    _toggleFlagged(flag, values) {
        this._throwErrorOnDNE(flag);
        if (values.length == 1 && isArray(values[0])) { values = values[0]; }
        values.forEach(value => {
            if (this._isFlagged(flag, value)) { this._unflag(flag, value); }
            else                              { this._flag(flag, value); }
        });
    }

    //Highlight selected, mark selected for deletion, mark
    _flagFlagged(flag1, flag2) {
        //Find all values for flag2.
        //Add them to the list for flag1.
    }

    _unflagFlagged(flag1, flag2) {
        //Remove all values in flag2 from flag1

    }

    _throwErrorOnDNE(flag) {
        if (!this._flagExists(flag)) { throw new Error("Flag", flag, "doesn't exist."); }
    }
}