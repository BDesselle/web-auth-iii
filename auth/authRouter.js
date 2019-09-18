const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../routes/users/usersModel");
const restricted = require("./restrictedMiddleware");
const app = express.Router();

//* Register a new user
app.post("/register", (req, res) => {
  try {
    let { username, password } = req.body;
    let hash = bcrypt.hashSync(password, 10);
    db.add({ username, password: hash }).then(response => {
      res.status(201).json(response);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//* Login with user credentials
app.post("/login", (req, res) => {
  try {
    let { username, password } = req.body;
    db.findBy({ username })
      .first()
      .then(response => {
        bcrypt.compareSync(password, response.password)
          ? ((req.session.user = response),
            res.status(200).json({ message: `Welcome ${response.username}!` }))
          : res.status(401).json({ message: "Invalid Credentials" });
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

//* Logout of account
app.get("/logout", (req, res) => {
  req.session
    ? req.session.destroy(err => {
        err
          ? res.json({ message: "You can check out, but you can never leave." })
          : res.status(200).json({
              message: "You have successfully left Hotel California."
            });
      })
    : res.status(200).json({ message: "You were never really here." });
});

//* Get all users
app.get("/users", restricted, (req, res) => {
  try {
    db.find().then(response => {
      res.status(200).json(response);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = app;
