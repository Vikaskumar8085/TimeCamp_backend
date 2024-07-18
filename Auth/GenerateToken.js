const jwt = require("jsonwebtoken");

const generateToken = async ({ id }) => {
  return await jwt.sign({ id: id }, "secret", { expiresIn: "1hr" });
};

module.exports = generateToken;
