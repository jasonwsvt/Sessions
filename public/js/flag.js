class Flag {
    _values; 

    constructor() { this._values = new Set(); }
    add()         { argsList(arguments).forEach(v => this._values.add(v)); }
    remove()      { argsList(arguments).forEach(v => this._values.delete(v)); }
    toggle()      { argsList(arguments).forEach(v => this._values.has(v) ? this.delete(v) : this.add(v)); }
    has()         { return argsList(arguments).every(v => this._values(v)); }
    list()        { return Array.from(this._values); }
    clear()       { this._values.clear(); }
    isEmpty()     { return this._values.size == 0; }
}