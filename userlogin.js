const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/Harmonicheaven', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connection Done");
}).catch((err) => {
    console.log("Something went wrong", err);
});

const User = require("./model/userlogin");
//const Discussion = require("./model/userlogin");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("userlogin");
});

app.get("/usersignup", (req, res) => {
  res.render("usersignup");
});

app.post("/", async (req, res) => {
    try {
        // check if the user exists
        const user = await User.findOne({ emailid: req.body.emailid });
        if (user) {
          //check if password matches
          const result = req.body.password === user.password;
          if (result) {
            res.render("home");
          } else {
            res.status(400).json({ error: "password doesn't match" });
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      } catch (error) {
        res.status(400).json({ error });
      }
});

app.post("/usersignup", (req, res) => {
  const user = new User(req.body);
  user.save()
      .then(() => {
          console.log("User saved successfully");
          res.render("home"); // Redirect to the home page or wherever appropriate
      })
      .catch((err) => {
          console.log("Error saving user", err);
          res.status(500).send("Internal Server Error");
      });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
