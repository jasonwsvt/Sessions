//ButtonUtility class has what's shown on the face,
//what's done when it's clicked, and
//what's needed to disable it (both deactivate and 
//an expression for whether or not it should be deactivated, called in the manage method).

class ButtonUtility {
    _containerId = null;
    _face = null;
    _onClickFunc = null;
    _deactivateFunc = null;

    constructor(data) {
        const self = this;
        //data is either undefined, an array with method values in a specific order, or an object
    }

    _initEvents() {
        const self = this;
        $(document).ready(function() {
            self._button.on("click", function(e) {
                self._onClickFunction();
                e.stopPropagation;
            });
        });
    }

    container(id) { this._containerId = id; }
    face(shown) { this._face = shown; }
    onClick(func) { this._onClickFunction = func; }
    triggerClick() { this._button.trigger("click"); }
    deactivation(func) {this._deactivationFunc = func; }
    deactivate() { }

    set buttonPreBuild(func) { this._buttonPreBuildFunc = func; }
    get buttonPreBuild() { return this._buttonPreBuildFunc; }
    buttonPreBuild() { this._buttonPreBuildFunc(); }

    set build(func) { this._buttonBuildFunc = func; }
    get build() { return this._buttonBuildFunc; }
    build() { this._buttonBuildFunc(); }

    set buttonPostBuild(func) { this._buttonPostBuildFunc = func; }
    get buttonPostBuild() { return this._buttonPostBuildFunc; }
    buttonPostBuild() { this._buttonPostBuildFunc(); }

    set buttonClose(func) { this._buttonCloseFunc = func; }
    get buttonClose() { return this._buttonCloseFunc; }
    buttonClose() { this._buttonCloseFunc(); }

    set buttonInit(func) { this._buttonInitFunc = func; }
    get buttonInit() { return this._buttonInitFunc; }
    buttonInit() { this._buttonInitFunc(); }

    set buttonManage(func) { this._buttonManageFunc = func; }
    get buttonManage() { return this._buttonManageFunc; }
    buttonManage() { this._buttonManage(); }
}