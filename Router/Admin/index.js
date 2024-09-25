const express = require("express");
const companyCtr = require("../../Controller/AdminController/CompanyController");
const clientController = require("../../Controller/AdminController/ClientCtr");
const verifyToken = require("../../Auth/VerifyAuth");
const projectController = require("../../Controller/AdminController/ProjectController");
const adminCtr = require("../../Controller/AdminController/Admincontroller");
const timesheetController = require("../../Controller/AdminController/TimeSheetCtr");
const chartscontroller = require("../../Controller/AdminController/ChartsController");
const employeeController = require("../../Controller/AdminController/EmployeeCotroller");
const ProductivityChart = require("../../Controller/AdminController/Productivity_LeaderBoard/Productivity_Leaderboard");
const TimeSummary = require("../../Controller/AdminController/TimeSummary/TimeSummary");
const contractorController = require("../../Controller/AdminController/ContractorController");
const adminRouter = express.Router();

// admin ctr
adminRouter.get("/get-all-admin", verifyToken, adminCtr?.getalladmin);
adminRouter.post("/create-admin", verifyToken, adminCtr?.createadmin);
// admin ctr
// company router
adminRouter.get("/fetch-company", verifyToken, companyCtr.getcompany);
adminRouter.get("/get-company", verifyToken, companyCtr.fetchCompany);
adminRouter.post("/add-company", verifyToken, companyCtr.createCompany);
// company router
// client router
adminRouter.get("/get-client", verifyToken, clientController?.fetchallclient);
adminRouter.post("/add-client", verifyToken, clientController?.createClient);
adminRouter.get("/remove-client", verifyToken, clientController?.removeclient);
adminRouter.get(
  "/get-inactive-client",
  verifyToken,
  clientController?.getinactiveclient
);
adminRouter.get(
  "/get-active-client",
  verifyToken,
  clientController?.getactiveClient
);
adminRouter.get(
  "/get-dead-client",
  verifyToken,
  clientController?.getdeadclient
);
// client ctr
// project ctr
adminRouter.post("/add-project", verifyToken, projectController.createproject);
// timesheets

adminRouter.post("/add-timesheet", timesheetController.createtimesheet);

adminRouter.post(
  "/add-contractor",
  verifyToken,
  contractorController?.createcontractor
);
adminRouter.get(
  "/get-contractor",
  verifyToken,
  contractorController?.fetchcontractor
);

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
// employee ctr
adminRouter.post(
  "/add-employee",
  verifyToken,
  employeeController?.createemployee
);
adminRouter.get(
  "/get-employee",
  verifyToken,
  employeeController?.fetchemployee
);
// employee ctr

module.exports = adminRouter;
