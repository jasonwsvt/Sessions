class Flag extends List {
    constructor() {
        super((value, items) => (isInteger(value)) && !items.find(item => item.value == value), false);
    }
}