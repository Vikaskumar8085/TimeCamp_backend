const express = require("express");
const UserRouter = require("./User");
const CompanyRouter = require("./Company");

const router = express.Router();

router.use("/user", UserRouter);
router.use("/company", CompanyRouter);

module.exports = router;
