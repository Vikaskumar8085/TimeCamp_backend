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
const dashboardController = require("../../Controller/AdminController/Dashboardctr");
const DepartmentController = require("../../Controller/AdminController/flexibleController/DepartmentController");
const DesignationController = require("../../Controller/AdminController/flexibleController/DesignationController");
const Rolecontroller = require("../../Controller/AdminController/flexibleController/RoleController");
const { upload } = require("../../Utils/FilteUploader");
const adminRouter = express.Router();

// admin ctr
adminRouter.get("/get-all-admin", verifyToken, adminCtr?.getalladmin);
adminRouter.post("/create-admin", verifyToken, adminCtr?.createadmin);
// admin ctr
// company router
adminRouter.get("/fetch-company", verifyToken, companyCtr.getcompany);
adminRouter.get("/get-company", verifyToken, companyCtr.fetchCompany);
adminRouter.post("/add-company", verifyToken, upload.single("image"), companyCtr.createCompany);
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
adminRouter.get(
  "/fetch-client-projects/:id",
  verifyToken,
  clientController?.fetchclientprojects
);
adminRouter.get(
  "/fetch-single-client/:id",
  verifyToken,
  clientController?.singleclients
);
// client ctr
// project ctr
adminRouter.post("/add-project", verifyToken, projectController.createproject);
adminRouter.get(
  "/fetch-all-projects",
  verifyToken,
  projectController.fetchproject
);
adminRouter.get(
  "/fetch-active-projects",
  verifyToken,
  projectController.fetchactiveprojectctr
);
adminRouter.get(
  "/fetch-inactive-projects",
  verifyToken,
  projectController.fetchinactiveprojectctr
);
// timesheets
adminRouter.post("/add-timesheet", timesheetController.createtimesheet);
// contractor
adminRouter.post(
  "/add-contractor",
  verifyToken,
  contractorController?.createcontractor
);
adminRouter.get(
  "/fetch-contractor",
  verifyToken,
  contractorController?.fetchcontractor
);
adminRouter.get(
  "/fetch-single-contractor/:id",
  verifyToken,
  contractorController?.siglecontractor
);
adminRouter.get(
  "/fetch-active-contractor",
  verifyToken,
  contractorController.fetchactiveContractor
);
adminRouter.get(
  "/fetch-inactive-contractor",
  verifyToken,
  contractorController.fetchinactiveContractor
);
// contractor

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
adminRouter.get(
  "/fetch-single-employee/:id",
  verifyToken,
  employeeController.sigleemployee
);
adminRouter.get(
  "/fetch-employee-projects/:id",
  verifyToken,
  employeeController.fetchemplolyeeProjects
);
adminRouter.get(
  "/fetch-all-resources",
  verifyToken,
  employeeController.fetchallemployee
);
adminRouter.get(
  "/fetch-active-employee",
  verifyToken,
  employeeController.fetchactiveemployeectr
);
adminRouter.get(
  "/fetch-inactive-employee",
  verifyToken,
  employeeController.fetchinactiveemployeectr
);
// employee ctr

// dashboard ctr
adminRouter.get(
  "/dasboard-counter",
  verifyToken,
  dashboardController.dashboardconterCtr
);
//

// department ctr

adminRouter.get(
  "/fetch-department",
  verifyToken,
  DepartmentController.fetchdepartmentctr
);
adminRouter.post(
  "/add-department",
  verifyToken,
  DepartmentController.createdepartmentctr
);

// desingnation ctr

adminRouter.get(
  "/fetch-designation",
  verifyToken,
  DesignationController.fetchdesignationctr
);
adminRouter.post(
  "/add-designation",
  verifyToken,
  DesignationController.createdesignationctr
);

// role ctr

adminRouter.get("/fetch-role", verifyToken, Rolecontroller.fetchrolectr);
adminRouter.post("/add-role", verifyToken, Rolecontroller.createrolectr);

module.exports = adminRouter;
