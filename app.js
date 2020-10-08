/*
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
*/

var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'); /*
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"), 
    passportLocalMongoose = require("passport-local-mongoose");  

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27107/sessions");
*/
app.use(express.static("public"));  //use this directory for js libraries and css
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({ limit: '10kb' })); // Body limit is 10
/*
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

var IssueSchema = new mongoose.Schema({
    userID: String,
    issue: String
});

var SessionSchema = new mongoose.Schema({
    issueID: String,
    creation: Number,
    lastEdited: Number,
    lastOpened: Number,
    lines: [String]
});

module.exports = mongoose.model("User", UserSchema);

var Session = mongoose.model("Session", SessionSchema); 
var Issue = mongoose.model("Issue", IssueSchema);
var User = mongoose.model("User", UserSchema);
*/
app.set("view engine", "html"); //set the render variable extension
/*
//PASSPORT CONFIGURATION
app.use(require("express-session") ({
    secret: "Secret goes here",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
*/
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

app.post("/retrieve/:session", (req, res) => {
    const creationTS = req.params.creationTS;

    Session.findOne({ creation: creationTS }, (err, session) => {
        if (err) { console.log("Error."); }
        else {
            console.log(session);
        }
    })
    console.log(req.params);
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