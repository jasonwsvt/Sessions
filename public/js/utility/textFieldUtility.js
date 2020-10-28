//TextFieldUtility extends PopUpDivUtility.
//Has methods for placeholder, default, validation, execution.

class TextFieldUtility {
    _popUpDivUtility = null;

    constructor(data) {
        this._popUpDivUtility = new PopUpDivUtility();
        //data is either undefined, an array with method values in a specific order, or an object
    }

    _initEvents() {
        const self = this;
        $(document).ready(function() {
        });
    }

    get id() { return this._id; }
    set id(id) { this._id = id; }
    get value() { return; }
    set value(text) { }
    keyup(func) { this._keyupFunc = func; }
    keypress(func) { this._keypressFunc = func; }
    keydown(func) { this._keydownFunc = func; }
    placeholder(text) { this._placeholderText = text; }
    default(text) { this._defaultText = text; }
    validation(func) { this._validationFunc = func; }
    execution(func) { this._executionFunc = func; }
    init() { this._init(); }
    build() { this._build(); }
    manage() { this._manage(); }
    execute() { this._execute(); }
    close() {}
}