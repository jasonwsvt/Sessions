class Flag {
    _values = []; 

    constructor() { }

    //Arguments can be 1, 2, 3 or [1, 2, 3]
    add() {
        arrayFromArguments(...arguments)
            .filter(value => !this.includes(value))
            .forEach(value => this._values.push(value));
    }

    //Arguments can be 1, 2, 3 or [1, 2, 3]
    remove() {
        arrayFromArguments(...arguments)
            .filter(value => this.includes(value))
            .forEach(value => this._values.splice(this._values.indexOf(value), 1));
    }

    //Arguments can be 1, 2, 3 or [1, 2, 3]
    toggle() {
        arrayFromArguments(...arguments)
            .forEach(value => this.includes(value)
            ? this.remove(value) : this.add(value));
    }

    includes() {
        return arrayFromArguments(...arguments).every(value => this._values.includes(value));
    }

    list() {
        return this._values;
    }

    clear() {
        this._values = [];
    }

    isEmpty() {
        return this._values.length == 0;
    }
}