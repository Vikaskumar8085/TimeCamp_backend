const express = require("express");
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
const adminRouter = express.Router();

// Admin
adminRouter.post("/create-admin", createAdmin);
adminRouter.get("/get-all-admin", Getalladmin);
adminRouter.put("/update-admin", EditAdmin);
adminRouter.delete("/remove-admin", RemoveAdmin);
// client
adminRouter.post("/create-client", createClientCtr);
adminRouter.get("/get-all-client", GetAllClientCtr);
adminRouter.put("/edit-client/:id", EditClientCtr);
adminRouter.get("/get-single-admin/:id", GetSingleClientCtr);
// employee
adminRouter.post("/create-contractor", CreateContratorCtr);
adminRouter.get("/get-all-contractor", GetallContactCtr);
adminRouter.put("/edit-contractor/:id", EditContractor);
adminRouter.delete("/remove-contractor/:id", RemoveContractor);
adminRouter.get("/get-single-contractor/:id", GetSingleContactCtr);

// 
module.exports = adminRouter;
