class Utilities {
    app = null;
    user = null;
    client = null;
    issue = null;
    session = null;
    slider = null;
    info = null;

    constructor(app) {
        var self = this;
        this.app = app;
        this.user = new UserUtilities(this);
        this.client = new Utility(this, 1);
        this.issue = new Utility(this, 2);
        this.session = new Utility(this, 3, false);
        this.slider = new SliderUtility(this);
        this.info = new InfoUtility(this);

        $(document).ready(function() {
            $("html").on("click", function(e) {
                self.close();
            });
        });
    }

    init() { this.user.init(); }

    manage(tier) {
        //console.log(tier);
        switch (tier) {
            case 0: this.user.manage();
            case 1: this.client.manage();
            case 2: this.issue.manage();
            case 3: this.session.manage();
        }
    }
      
    close(except) {
        this.user.close(except);
        this.client.close(except);
        this.issue.close(except);
        this.session.close(except);
        this.info.close(except);
    }
}