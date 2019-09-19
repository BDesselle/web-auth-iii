const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = function generateToken(response) {
  const payload = {
    username: response.username
  };
  const options = {
    expiresIn: "8h"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
};
