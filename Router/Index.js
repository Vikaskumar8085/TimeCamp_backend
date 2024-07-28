const express = require("express");
const UserRouter = require("./User");
const compRouter = require("./Company");
const adminRouter = require("./Admin");

const router = express.Router();
router.use("/v1", adminRouter);
router.use("/v2", compRouter);
router.use("/user", UserRouter);

module.exports = router;
