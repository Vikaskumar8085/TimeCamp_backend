const Joi = require("joi");

const adminvalidation = {
  createadminvalidation: Joi.object({
    FirstName: Joi.string().trim().required().messages({
      "string.empty": '"FirstName" cannot be empty',
      "any.required": '"FirstName" is required',
    }),

    LastName: Joi.string().trim().required().messages({
      "string.empty": '"LastName" cannot be empty',
      "any.required": '"LastName" is required',
    }),

    Email: Joi.string().trim().email().required().messages({
      "string.empty": '"Email" cannot be empty',
      "string.email": '"Email" must be a valid email',
      "any.required": '"Email" is required',
    }),

    Password: Joi.string().default("").messages({
      "string.base": '"Password" must be a string',
    }),

    Photo: Joi.string()
      .required()
      .uri() // Validate as a URI if needed
      .default("https://i.ibb.co/4pDNDk1/avatar.png")
      .messages({
        "string.empty": '"Photo" cannot be empty',
        "any.required": '"Photo" is required',
      }),
  }),
};

module.exports = adminvalidation;
