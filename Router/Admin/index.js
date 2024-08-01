const express = require("express");
const verifyToken = require("../../Auth/VerifyAuth");
const {
  Getalladmin,
  createAdmin,
  EditAdmin,
  RemoveAdmin,
} = require("../../Controller/AdminController/admincontroller");
const {
  createClientCtr,
  GetAllClientCtr,
  EditClientCtr,
  GetSingleClientCtr,
} = require("../../Controller/AdminController/ClientCtr");
const {
  CreateContratorCtr,
  EditContractor,
  RemoveContractor,
} = require("../../Controller/AdminController/ContractorController");
const {
  GetallContactCtr,
  GetSingleContactCtr,
} = require("../../Controller/ContactController");

const {
  GetAllCompany,
  RegisterCompany,
  EditCompany,
  CreateAdminCtr,
} = require("../../Controller/AdminController/CompanyController");

const adminRouter = express.Router();

// Admin
adminRouter.post("/create-admin", verifyToken, createAdmin);
adminRouter.get("/get-all-admin", verifyToken, Getalladmin);
adminRouter.put("/update-admin", EditAdmin);
adminRouter.delete("/remove-admin", RemoveAdmin);
// client
adminRouter.post("/create-client", verifyToken, createClientCtr);
adminRouter.get("/get-all-client", verifyToken, GetAllClientCtr);
adminRouter.put("/edit-client/:id", verifyToken, EditClientCtr);
adminRouter.get("/get-single-client/:id", verifyToken, GetSingleClientCtr);
// employee
adminRouter.post("/create-contractor", CreateContratorCtr);
adminRouter.get("/get-all-contractor", GetallContactCtr);
adminRouter.put("/edit-contractor/:id", EditContractor);
adminRouter.delete("/remove-contractor/:id", RemoveContractor);
adminRouter.get("/get-single-contractor/:id", GetSingleContactCtr);

//company
adminRouter.get("/get-all-company", verifyToken, GetAllCompany);
adminRouter.post("/add-company", verifyToken, RegisterCompany);
adminRouter.post("/edit-company", verifyToken, EditCompany);
//company
module.exports = adminRouter;
