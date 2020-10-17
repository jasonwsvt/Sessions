var express = require("express"),
    app = express(),
    bodyParser = require('body-parser');

app.use(express.static("public"));  //use this directory for js libraries and css
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({ limit: '10kb' })); // Body limit is 10
app.set("view engine", "html"); //set the render variable extension

app.get("/", (req, res) => {
    res.sendFile("sessions.html", { root: __dirname });
    console.log("someone made a request to /");
});

app.post("/update/:session", (req, res) => {
    const creationTS = req.params.creationTS;
    const lastEditedTS = req.params.lastEditedTS;
    const lastOpenedTS = req.params.lastOpenedTS;
    const sessionLines = req.params.sessionLines;

    Session.findOneAndUpdate(
        {
            creation: creationTS,
            lastEdited: lastEditedTS,
            lastOpened: lastOpenedTS,
            lines: sessionLines
        }, function (err, item) {
        if (err) {
            console.log("${err}: Something went wrong.");
        }
        else {
            console.log(`Session ${item} saved to the database.`);
        }
    });
    console.log(req.params);
});

app.get("/update/sessions", (req, res) => {
    console.log(req.params);
});

app.post("/retrieve/", (req, res) => {
    const creation = req.params.creation;
/*
    Session.findOne({ creation: creationTS }, (err, session) => {
        if (err) { console.log("Error."); }
        else {
            console.log(session);
        }
    })
    console.log(req.params);
    res.send(session); */
});

app.get("/u/:user", (req, res) => {
    res.send("user profile for " + req.params.user);
    console.log(req.params);
});

app.post("/register", (req, res) => {
    res.send("signing up a user");
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
        }
        passport.aunthenticate("local")(req, res, () => {
            console.log("success - send success message");
        });
    });
});

app.get("*", (req, res) => {
    res.send("Default");
});

/*
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, () => {
    console.log("Server has started on http://localhost:3000.");
});
httpsServer.listen(8443, () => {
    console.log("Server has started on http://localhost:3000.");
});
*/

app.listen(3000, "0.0.0.0", () => {
    console.log("Server has started on http://localhost:3000.");
});