const express = require("express");
const UserRouter = require("./User");
const compRouter = require("./Company");
const adminRouter = require("./Admin");
const { getuserall } = require("../Controller/UserController");

const router = express.Router();
router.use("/v1", adminRouter);
router.use("/user", UserRouter);


module.exports = router;
