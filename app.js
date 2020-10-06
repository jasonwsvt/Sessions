const express = require("express");
var app = express();

app.use(express.static("public"));  //use this directory for js libraries and css
app.set("view engine", "html"); //set the render variable extension

// "/" => "Hi there!"
app.get("/", (req, res) => {
    res.sendFile("sessions.html", { root: __dirname });
    console.log("someone made a request to /");
});

app.get("/update/:session", (req, res) => {
    console.log(req.params);
});

app.get("/update/sessions", (req, res) => {
    console.log(req.params);
});

app.get("/retrieve/:session", (req, res) => {
    console.log(req.params);
});

app.get("/retrieve/sessions", (req, res) => {
    console.log(req.params);
});

app.get("/r/:forum/comments/:id/:title", (req, res) => {
    res.send("Welcome to the " + req.params.forum + " forum comments section for " + req.params.title);
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