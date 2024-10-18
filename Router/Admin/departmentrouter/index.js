const express = require("express");
const DepartmentController = require("../../../Controller/AdminController/flexibleController/DepartmentController");
const departmentvalidation = require("../../../Validations/AdminValidations/department/departmentvalidation");
const validator = require("express-joi-validation").createValidator({});

const departmentRouter = express.Router();
// create department
departmentRouter.post(
  "/add-department",
  validator.body(departmentvalidation.createdepartmentvalidation),
  DepartmentController.createdepartmentctr
);
// fetch department
departmentRouter.get(
  "/fetch-department",
  DepartmentController.fetchdepartmentctr
);

module.exports = departmentRouter;
