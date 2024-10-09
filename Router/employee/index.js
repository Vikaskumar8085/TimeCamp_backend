const express = require("express");
const verifyToken = require("../../Auth/VerifyAuth");
const employeeProjectCtr = require("../../Controller/EmployeeController/employeeProjectCtr");
const employeechartscontroller = require("../../Controller/EmployeeController/employeechartsCtr");

const employeeRouter = express.Router();

// employee charts
employeeRouter.get(
  "/get-total-employee-hours",
  verifyToken,
  employeechartscontroller.totalemployeehourcharts
);
// 

employeeRouter.get(
  "/get-employee-projects",
  verifyToken,
  employeechartscontroller.totalprojectsCharts
);
// employee rotuer

// fetch employee projects
employeeRouter.get(
  "/fetch-employee-projects",
  employeeProjectCtr.fetchemployeeproject
);


//  fetch employee active projects
employeeRouter.get(
  "/fetch-employee-active-projects",
  employeeProjectCtr.employeeactiveprojects
);

// fetch employee inactive projects
employeeRouter.get(
  "/fetch-employee-inactive-projects",
  employeeProjectCtr?.employeeInactiveprojects
);


// fill time sheet by employee
employeeRouter.post("/add-employee-timesheet",employeeProjectCtr?.employeefilltimesheets);
// fetch employee timesheet 
employeeRouter.get("/fetch-employee-timesheet", employeeProjectCtr?.fetchemployeetimesheetsctr)

module.exports = employeeRouter;
