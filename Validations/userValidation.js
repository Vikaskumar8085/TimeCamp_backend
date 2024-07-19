const Joi = require("joi");

const registerValidation = Joi.object({
  FirstName: Joi.string().min(3).max(30).required(),
  LastName: Joi.string().alphanum().min(3).max(30),
  Email: Joi.string().min(4).max(30).required(),
  Password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

module.exports = {
  registerValidation,
};
