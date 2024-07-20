const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    const authtoken = await req.headers.authorization.replace(/^Bearer\s/, "");
    const decode = await jwt.verify(authtoken, process.env.SECRET);
    req.user = decode.id;
    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = verifyToken;
