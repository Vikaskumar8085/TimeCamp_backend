const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { StatusCodes } = require("http-status-codes");
dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    const authtoken = await req.headers.authorization.replace(/^Bearer\s/, "");
    // if (!authtoken) {
    //   res.status(StatusCodes.BAD_REQUEST);
    //   throw new Error("token not foound");
    // }
    const decode = await jwt.verify(authtoken, process.env.SECRET);
    req.user = decode.id;
    // console.log(req.user, "verify token");
    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = verifyToken;
