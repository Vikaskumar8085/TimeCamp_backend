const Joi = require("joi");

const contactvalid = Joi.object({
  Name: Joi.string().min(3).max(100).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 1 character long",
    "string.max": "Name cannot exceed 100 characters",
    "any.required": "Name is required",
  }),

  LastName: Joi.string().min(3).max(100).required().messages({
    "string.base": "LastName must be a string",
    "string.empty": "LastName cannot be empty",
    "string.min": "LastName must be at least 1 character long",
    "string.max": "LastName cannot exceed 100 characters",
    "any.required": "LastName is required",
  }),

  Email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),

    Dispcription: Joi.string().min(6).max(200).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description cannot be empty",
    "string.min": "Description must be at least 6 characters long",
    "string.max": "Description cannot exceed 200 characters",
    "any.required": "Description is required",
  }),
});

module.exports = { contactvalid };
