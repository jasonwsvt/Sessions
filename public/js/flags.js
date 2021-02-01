class Flags {
    _flags = [];
    _flagMethods

    //e.g. If add = "addFlag", this.addFlag will be the method to add a flag.
    constructor(add = "add", del = "delete") {
        this[add] = this._addNewFlag;
        this[del] = this._deleteExistingFlag;
        
    }

    //flag must be a string.
    //All others default to true.  They can be specified, or set to false.
    //If any of the others are set to false, that method will not be offered.
    //For all others that are set to true, they will be formatted in a standard way, based on the value of flag.
    _addNewFlag(flag, flagged = true, unflag = true, isFlagged = true, areFlagged = true, toggleFlagged = true, flagMultiple = true, unflagMultiple = true) {
        var values = [flag, flagged, unflag, isFlagged, areFlagged, toggleFlagged, flagMultiple, unflagMultiple];
        if (!isString(flag) || !values.every(value => isString(value) || isBoolean(value))) { return; }

        if (flagMultiple   == true)  { flagMultiple = flag + "Multiple";     }
        if (flagged        == true)  { flagged = flag + "ed";                }
        const Flagged = flagged.charAt(0).toUpperCase() + flagged.slice(1);
        if (unflag         == true)  { unflag = "un" + flag;                 }
        if (unflagMultiple == true)  { unflagMultiple = unflag + "Multiple"; }
        if (isFlagged      == true)  { isFlagged = "is" + Flagged;           }
        if (areFlagged     == true)  { areFlagged = "are" + Flagged;         }
        if (toggleFlagged  == true)  { toggleFlagged = "toggle" + Flagged;   }

        values = [flag, flagged, unflag, isFlagged, areFlagged, toggleFlagged, flagMultiple, unflagMultiple];

        if (flag           != false) { this[flag]           = (value)  => { this._flag(flag, value);            } }
        if (unflag         != false) { this[unflag]         = (value)  => { this._unflag(flag, value);          } }
        if (flagged        != false) { this[flagged]        = ()       => { this._flagged(flag);                } }
        if (isFlagged      != false) { this[isFlagged]      = (value)  => { this._isFlagged(flag, value);       } }
        if (areFlagged     != false) { this[areFlagged]     = (values) => { this._areFlagged(flag, values);     } }
        if (toggleFlagged  != false) { this[toggleFlagged]  = (value)  => { this._toggleFlagged(flag, value);   } }
        if (flagMultiple   != false) { this[flagMultiple]   = (values) => { this._flagMultiple(flag, values);   } }
        if (unflagMultiple != false) { this[unflagMultiple] = (values) => { this._unflagMultiple(flag, values); } }

        this._methods[flag] = values.filter(m => m != false);
        this[flag + "Methods"] = () => this._flagMethods(flag);
        this._flags[flag] = [];
    }

    flags() { return Object.keys(this._flags); }

    _flagMethods(flag) { return this._methods[flag]; }

    _flagExists(flag) { return this.flags.contains(flag); }

    _deleteExistingFlag(flag) {
        this._throwErrorOnNotFlagExists(flag);
        delete this._flags[flag];
    }

    _flag(flag, value) {
        this._throwErrorOnNotFlagExists(flag);
        if (!this._isFlagged(flag, value)) {
            this._flags[flag].push(value);
        }
    }

    _flagMultiple(flag, values) {
        this._throwErrorOnNotFlagExists(flag);
        values.forEach(value => this._flag(flag, value));
    }

    _unflag(flag, value) {
        this._throwErrorOnNotFlagExists(flag);
        if (this._isFlagged(flag, value)) {
            this._flags[flag].splice(this._flags.indexOf(value), 1);
        }
    }

    _unflagMultiple(flag, values) {
        this._throwErrorOnNotFlagExists(flag);
        values.forEach(value => this._unflag(flag, value));
    }

    _flagged(flag) {
        this._throwErrorOnNotFlagExists(flag);
        return this._flags[flag];
    }

    _isFlagged(flag, value) {
        this._throwErrorOnNotFlagExists(flag);
        return this._flags[flag].contains(value);

    }

    _areFlagged(flag, values) {
        this._throwErrorOnNotFlagExists(flag);
        return values.forEach(value => this._isFlagged(flag, value));
    }

    _toggleFlagged(flag, value) {
        this._throwErrorOnNotFlagExists(flag);
        if (this._isFlagged(flag, value)) {
            this._unflag(flag, value);
        }
        else {
            this._flag(flag, value);
        }
    }

    _throwErrorOnNotFlagExists(flag) {
        if (!this._flagExists(flag)) { throw new Error("Flag", flag, "doesn't exist."); }
    }

}