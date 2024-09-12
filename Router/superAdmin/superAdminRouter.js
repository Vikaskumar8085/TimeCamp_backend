const express = require("express");
const contactctr = require("../../Controller/ContactController/ContactCtr");

const superadminRouter = express.Router();

// contact us
superadminRouter.post("/add-contact", contactctr?.createContact);
superadminRouter.get("/get-all-contact", contactctr?.fetchContact);
// contact us

module.exports = superadminRouter;
