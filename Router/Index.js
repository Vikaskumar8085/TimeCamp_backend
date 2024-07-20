const express = require("express");
const { RegisterCtr, LoginCtr } = require("../Controller/UserController");
const UserRouter = require("./User");

const router = express.Router();

router.use("/user",UserRouter)

module.exports = router;
