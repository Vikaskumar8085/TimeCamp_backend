const express = require("express");
const Rolecontroller = require("../../../Controller/AdminController/flexibleController/RoleController");
const rolevalidations = require("../../../Validations/AdminValidations/role/rolevalidation");
const validator = require("express-joi-validation").createValidator({});

const roleRouter = express.Router();

roleRouter.post(
  "/create-Role",
  validator.body(rolevalidations.createRolevalidation),
  Rolecontroller.createrolectr
);
roleRouter.get("/fetch-role", Rolecontroller.fetchrolectr);

module.exports = roleRouter;
