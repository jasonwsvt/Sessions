class App {
    constructor() {
        this.data = new DataTree();
        this.utilities = new Utilities(this);
        this.editor = new Editor(this);
        this.buttons = new Buttons(this);

        this.utilities.init();
        this.editor.init();
        this.utilities.user.reset();
        this.utilities.manage(0);
    }
}

var app = new App();