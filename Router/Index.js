const express = require("express");
const { RegisterCtr, LoginCtr } = require("../Controller/UserController");
const UserRouter = require("./User");
const compRouter = require("./Company");

const router = express.Router();
router.use("/company", compRouter);
router.use("/user", UserRouter);

module.exports = router;
