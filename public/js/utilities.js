class Utilities {
    _app = null;
    _userUtilities = null;
    _clientUtility = null;
    _issueUtility = null;
    _sessionUtility = null;
    _sliderUtility = null;
    _infoUtility = null;

    constructor(app) {
        var self = this;
        this._app = app;

        this._userUtilities = new UserUtilities(this);
        //this._clientUtility = new Utility(this, 1);
        //this._issueUtility = new Utility(this, 2);
        //this._sessionUtility = new Utility(this, 3, false);
        //this._sliderUtility = new SliderUtility(this);
        //this._infoUtility = new InfoUtility(this);

        //this._userUtilities.reset();
        //this.manage(0);

        $(document).ready(function() {
            $("html").on("click", function(e) {
                self.closeAllUtilityMenus();
            });
        });
    }

    get utilities()        { return this; }
    get app()              { return this._app; }

    manage(tier) {
        switch (tier) {
            case 0: this._userUtilities.manage();
            //case 1: this._clientUtility.manage();
            //case 2: this._issueUtility.manage();
            //case 3: this._sessionUtility.manage();
        }
    }
      
    closeAllUtilityMenus(except) {
        this._userUtilities.closeMenus(except);
        //this._clientUtility.closeMenus(except);
        //this._issueUtility.closeMenus(except);
        //this._sessionUtility.closeMenus(except);
    }
}