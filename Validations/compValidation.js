const Joi = require("Joi");

const registercompanyvalidation = Joi.Object({
  Company_Name: Joi.string().min(3).max(30).required(),
  Company_Email: Joi.string().min(3).max(30).required(),
  Address: Joi.string().min(3).max(30).required(),
  Postal_Code: Joi.string().min(3).max(30).required(),
  Phone: Joi.string().min(3).max(30).required(),
  Company_Logo: Joi.string().min(3).max(30).required(),
  Employee_No: Joi.Number().min(3).max(30).required(),
  Established_date: Joi.string().min(3).max(30).required(),
  CompanyWesite: Joi.string().min(3).max(30).required(),
  TextNumber: Joi.string().min(3).max(30).required(),
  UserId: Joi.string().min(3).max(30).required(),
  UserObjectId: Joi.string().min(3).max(30).required(),
});


module.exports = {
  registercompanyvalidation,
};
