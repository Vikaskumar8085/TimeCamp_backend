const express = require("express");
const {
  GetAllCompany,
  RegisterCompany,
} = require("../../Controller/CompanyController");
const validator = require("express-joi-validation").createValidator({});
const compRouter = express.Router();

compRouter.get("/get-all-company", GetAllCompany);
compRouter.post("/add-company", RegisterCompany);

module.exports = compRouter;
