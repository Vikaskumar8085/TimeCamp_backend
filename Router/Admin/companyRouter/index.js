const express = require("express");
const companyCtr = require("../../../Controller/AdminController/CompanyController");
// const upload = require("../../../Utils/FilteUploader");

const companyRouter = express.Router();

companyRouter.get("/fetch-company", companyCtr.getcompany);
companyRouter.get("/get-company", companyCtr.fetchCompany);
// companyRouter.post("/add-company",upload.single("image"),companyCtr.createCompany)

module.exports = companyRouter;
