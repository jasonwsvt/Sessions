const express = require("express");
const mongoose = require("mongoose");
var app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/sessions");

var sessionSchema = new mongoose.Schema({
    creation: Number,
    lastEdited: Number,
    lastOpened: Number,
    lines: [String]
});

var issueSchema = new mongoose.Schema({
    issue: String,
    sessions: [sessionSchema]
});

var userSchema = new mongoose.Schema({
    user: String,
    password: String,
    issues: [issueSchema]
});

var Session = mongoose.model("Session", sessionSchema); 
var Issue = mongoose.model("Issue", issueSchema);
var User = mongoose.model("User", userSchema);

app.use(express.static("public"));  //use this directory for js libraries and css
app.set("view engine", "html"); //set the render variable extension

// "/" => "Hi there!"
app.get("/", (req, res) => {
    res.sendFile("sessions.html", { root: __dirname });
    console.log("someone made a request to /");
});

app.get("/update/:session", (req, res) => {
    const creationTS = req.params.creationTS;
    const lastEditedTS = req.params.lastEditedTS;
    const lastOpenedTS = req.params.lastOpenedTS;
    const sessionLines = req.params.sessionLines;

    Session.findOneAndReplace({
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

app.get("/retrieve/:session", (req, res) => {
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

app.get("*", (req, res) => {
    res.send("Default");
});

app.listen(3000, () => {
    console.log("Server has started on http://localhost:3000.");
});