const express = require("express");
const DesignationController = require("../../../Controller/AdminController/flexibleController/DesignationController");
const designationvalidation = require("../../../Validations/AdminValidations/designation/designationvalidation");
const validator = require("express-joi-validation").createValidator({});

const designationRouter = express.Router();
// add designation
designationRouter.post(
  "/add-designation",
  validator.body(designationvalidation.createdesignationvalidation),
  DesignationController.createdesignationctr
);

module.exports = designationRouter;
