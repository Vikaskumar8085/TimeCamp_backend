const express = require("express");
const contractorController = require("../../../Controller/AdminController/ContractorController");
const validator = require("express-joi-validation").createValidator({});
const contractorRouter = express.Router();

contractorRouter.post("/add-contractor", contractorController.createcontractor);
contractorRouter.get("/fetch-contractor",contractorController.fetchcontractor);
contractorRouter.get("/fetch-single-contractor/:id",contractorController.siglecontractor);
contractorRouter.get("/fetch-active-contractor",contractorController.fetchactiveContractor);
contractorRouter.get("/fetch-inactive-contractor",contractorController.fetchinactiveContractor);
module.exports = contractorRouter;
