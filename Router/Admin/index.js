const express = require("express");
const verifyToken = require("../../Auth/VerifyAuth");
const adminCtr = require("../../Controller/AdminController/Admincontroller");
const timesheetController = require("../../Controller/AdminController/TimeSheetCtr");
const chartscontroller = require("../../Controller/AdminController/ChartsController");
const ProductivityChart = require("../../Controller/AdminController/Productivity_LeaderBoard/Productivity_Leaderboard");
const TimeSummary = require("../../Controller/AdminController/TimeSummary/TimeSummary");
const departmentRouter = require("./departmentrouter");
const designationRouter = require("./designationRouter");
const roleRouter = require("./roleRouter");
const contractorRouter = require("./ContractorRouter");
const employeeRouter = require("../employee");
const companyRouter = require("./companyRouter");
const clientRouter = require("./clientRouter");
const projectRouter = require("./projectRouter");
const taskRouter = require("./taskRouter");
const timesheetRouter = require("./timesheetRouter");
const dashboardRouter = require("./dashboardRouter");

const adminRouter = express.Router();

// admin ctr
adminRouter.get("/get-all-admin", verifyToken, adminCtr?.getalladmin);
adminRouter.post("/create-admin", verifyToken, adminCtr?.createadmin);
// admin ctr
// timesheets
adminRouter.post("/add-timesheet", timesheetController.createtimesheet);
// charts
adminRouter.get(
  "/get-project-charts",
  verifyToken,
  chartscontroller?.ProjectCharts
);
adminRouter.get(
  "/get-employee-time-hours",
  verifyToken,
  chartscontroller?.EmployeeTimeHours
);
adminRouter.get(
  "/get-productivity-chart",
  verifyToken,
  ProductivityChart?.ProductivityChart
);
adminRouter.get(
  "/get-total-hours-by-resource",
  verifyToken,
  TimeSummary?.TotalHoursByResource
);
adminRouter.get(
  "/get-hours-by-project",
  verifyToken,
  TimeSummary?.HoursByProject
);
adminRouter.get(
  "/get-hours-by-company",
  verifyToken,
  TimeSummary?.HoursByCompany
);
adminRouter.get(
  "/get-project-time-utilization",
  verifyToken,
  TimeSummary?.ProjectTimeUtilization
);
// charts
adminRouter.use(dashboardRouter);
adminRouter.use(companyRouter);
adminRouter.use(projectRouter);
adminRouter.use(clientRouter);
adminRouter.use(employeeRouter);
adminRouter.use(contractorRouter);
adminRouter.use(departmentRouter);
adminRouter.use(roleRouter);
adminRouter.use(designationRouter);
adminRouter.use(taskRouter);
adminRouter.use(timesheetRouter);

module.exports = adminRouter;
