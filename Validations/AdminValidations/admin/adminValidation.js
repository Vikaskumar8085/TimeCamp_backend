const Joi = require("joi");

const adminvalidation = {
  createadminvalidation: Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    lastName: Joi.string().required(),
    userName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    age: Joi.number().required().min(0).max(100),
    DOB: Joi.date().greater(new Date("1940-01-01")).required(),
  }),
};


module.exports = adminvalidation;
