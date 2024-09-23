const express = require("express");
const contactcontroller = require("../../Controller/CommonController/ContactController");
const superadminRouter = express.Router();

// contact us
superadminRouter.post("/add-contact", contactcontroller.createcontact);
// superadminRouter.get("/get-all-contact", contactctr?.fetchContact);
// contact us

module.exports = superadminRouter;
