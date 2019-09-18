const bcrypt = require("bcryptjs");
const db = require("../routes/users/usersModel");

module.exports = function restricted(req, res, next) {
  try {
    req.session && req.session.user
      ? next()
      : res.status(401).json({ message: "If you give a mouse a cookie" });
  } catch (err) {
    res.status(500).json(err);
  }
};
