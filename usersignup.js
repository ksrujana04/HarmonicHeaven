const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/Harmonicheaven', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connection Done");
}).catch((err) => {
    console.log("Something went wrong", err);
});

//const User = require("./model/discussions");
const Discussion = require("./model/discussions");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("discussions");
});

app.post("/", (req, res) => {
    const user = new Discussion(req.body);
    user.save()
        .then(() => {
            console.log("User saved successfully");
            res.redirect("/"); // Redirect to the home page or wherever appropriate
        })
        .catch((err) => {
            console.log("Error saving user", err);
            res.status(500).send("Internal Server Error");
        });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
