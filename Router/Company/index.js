const express = require("express");
const {
  GetAllCompany,
  RegisterCompany,
  EditCompany,
  CreateAdminCtr,
} = require("../../Controller/CompanyController");
const verifyToken = require("../../Auth/VerifyAuth");
const validator = require("express-joi-validation").createValidator({});
const compRouter = express.Router();

compRouter.get("/get-all-company", verifyToken, GetAllCompany);
compRouter.post("/add-company", verifyToken, RegisterCompany);
compRouter.post("/edit-company", verifyToken, EditCompany);
compRouter.post("/add-admin", verifyToken, CreateAdminCtr);

module.exports = compRouter;
