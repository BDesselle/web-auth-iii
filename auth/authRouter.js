const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../routes/users/usersModel");
const generateToken = require("./generateToken");
const restricted = require("./restrictedMiddleware");
const app = express.Router();

//* Register a new user
app.post("/register", (req, res) => {
  try {
    let { username, password } = req.body;
    db.add({ username, password: bcrypt.hashSync(password, 12) }).then(
      response => {
        res.status(201).json(response);
      }
    );
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
        response && bcrypt.compareSync(password, response.password)
          ? ((token = generateToken(response)),
            res
              .status(200)
              .json({ message: `Welcome ${response.username}!`, token }))
          : res.status(401).json({ message: "Invalid Credentials" });
      });
  } catch (err) {
    res.status(500).json(err);
  }
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
