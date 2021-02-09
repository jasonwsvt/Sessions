class Flag extends List {
    constructor() {
        super(false, (value, items) => (isInteger(value)) && !items.find(item => item.value == value));
    }
}