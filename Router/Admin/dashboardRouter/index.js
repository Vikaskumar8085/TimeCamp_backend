const express = require("express");
const verifyToken = require("../../../Auth/VerifyAuth");
const dashboardController = require("../../../Controller/AdminController/Dashboardctr");

const dashboardRouter = express.Router();

dashboardRouter.get(
  "/dasboard-counter",
  verifyToken,
  dashboardController.dashboardconterCtr
);

module.exports = dashboardRouter;
