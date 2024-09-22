const express = require("express");
const verifyToken = require("../../Auth/VerifyAuth");
const employeeProjectCtr = require("../../Controller/EmployeeController/employeeProjectCtr");
const employeechartscontroller = require("../../Controller/EmployeeController/employeechartsCtr");

const employeeRouter = express.Router();

employeeRouter.get("get-total-employee-hours",verifyToken,employeechartscontroller.totalemployeehourcharts);
employeeRouter.get("get-employee-projects",verifyToken,employeechartscontroller.totalprojectsCharts);

module.exports = employeeRouter;