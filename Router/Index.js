const express = require("express");
const UserRouter = require("./User");
const adminRouter = require("./Admin");
const superadminRouter = require("./superAdmin/superAdminRouter");
const employeeRouter = require("./employee");
const corporateRouter = require("./contractor");

const router = express.Router();
router.use("/v1", adminRouter);
router.use("/user", UserRouter);
router.use("/v2", superadminRouter);
router.use("/v3", employeeRouter);
router.use("/v4", corporateRouter);

module.exports = router;
