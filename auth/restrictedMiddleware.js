const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = function restricted(req, res, next) {
  try {
    req.headers.authorization
      ? jwt.verify(
          req.headers.authorization,
          secrets.jwtSecret,
          (err, decodedToken) => {
            err ? res.status(401).json({ message: "Invalid token" }) : next();
          }
        )
      : res.status(400).json({
          message: "A token is required to view this data."
        });
  } catch (err) {
    res.status(500).json(err);
  }
};
