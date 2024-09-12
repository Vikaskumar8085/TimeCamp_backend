const express = require("express");
const UserRouter = require("./User");
const compRouter = require("./Company");
const adminRouter = require("./Admin");
const superadminRouter = require("./superAdmin/superAdminRouter");

const router = express.Router();
router.use("/v1", adminRouter);
router.use("/user", UserRouter);
router.use("/v2", superadminRouter);

module.exports = router;
