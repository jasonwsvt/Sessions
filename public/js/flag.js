class Flag {
    _values; 

    constructor() { this._values = new Set(); }
    add()         { smoothArray(arguments).forEach(v => this._values.add(v)); }
    remove()      { smoothArray(arguments).forEach(v => this._values.delete(v)); }
    toggle()      { smoothArray(arguments).forEach(v => this._values.has(v) ? this._values.delete(v) : this._values.add(v)); }
    has()         { return smoothArray(arguments).every(v => this._values(v)); }
    list()        { return Array.from(this._values); }
    clear()       { this._values.clear(); }
    isEmpty()     { return this._values.size == 0; }
}