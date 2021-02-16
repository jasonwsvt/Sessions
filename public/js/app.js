class App {
    data = null;
    utilities = null;
    editor = null;
    buttons = null;

    constructor() {
        this.data = new DataTree();
        this.utilities = new Utilities(this);
        this.editor = new Editor(this);
        this.buttons = new Buttons(this);

        this.utilities.init();
        this.editor.load();
    }
}

var app = new App();
