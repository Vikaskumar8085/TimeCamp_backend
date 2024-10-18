const express = require("express");
const employeeController = require("../../../Controller/AdminController/EmployeeCotroller");

const employeeRouter = express.Router();

employeeRouter.post("/create-employee",employeeController.createemployee);
employeeRouter.get("/fetch-employee",employeeController.fetchemployee);
employeeRouter.get("/fetch-single-employee/:id",employeeController.sigleemployee);
employeeRouter.get("/fetch-employee-projects/:id",employeeController.fetchemployeeProjects);
employeeRouter.get("/fetch-employee-projects/:id",employeeController.fetchemplolyeeProjects)
employeeRouter.get("fetch-active-employee",employeeController.fetchactiveemployeectr);
employeeRouter.get("fetch-all-resources",employeeController.fetchallemployee);
employeeRouter.get("fetch-inactive-employee",employeeController.fetchinactiveemployeectr);
module.exports = employeeRouter;


