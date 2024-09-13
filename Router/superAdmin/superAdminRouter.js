const express = require("express");
const contactctr = require("../../Controller/ContactController/ContactCtr");
const { contactvalid } = require("../../Validations/contactValidation/ContactValid");
const validator = require("express-joi-validation").createValidator({});

const superadminRouter = express.Router();

// contact us
superadminRouter.post(
  "/add-contact",
  validator.body(contactvalid),
  contactctr?.createContact
);
superadminRouter.get("/get-all-contact", contactctr?.fetchContact);
// contact us

module.exports = superadminRouter;
