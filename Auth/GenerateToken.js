const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = async ({ id }) => {
  return await jwt.sign({ id: id }, process.env.SECRET, { expiresIn: "720hr" });
};

module.exports = generateToken;
