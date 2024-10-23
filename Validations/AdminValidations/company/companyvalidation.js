const Joi = require("Joi");

const companyvalidation = {
  createcompanyvalidation: Joi.object({
    Company_Name: Joi.string().required().messages({
      "string.empty": '"Company_Name" cannot be empty',
      "any.required": '"Company_Name" is required',
    }),

    Company_Email: Joi.string().email().required().messages({
      "string.empty": '"Company_Email" cannot be empty',
      "string.email": '"Company_Email" must be a valid email',
      "any.required": '"Company_Email" is required',
    }),

    Address: Joi.string().required().messages({
      "string.empty": '"Address" cannot be empty',
      "any.required": '"Address" is required',
    }),

    Postal_Code: Joi.string().required().messages({
      "string.empty": '"Postal_Code" cannot be empty',
      "any.required": '"Postal_Code" is required',
    }),

    Phone: Joi.number().integer().required().messages({
      "number.base": '"Phone" must be a number',
      "number.integer": '"Phone" must be an integer',
      "any.required": '"Phone" is required',
    }),

    Company_Logo: Joi.string().required().messages({
      "string.empty": '"Company_Logo" cannot be empty',
      "any.required": '"Company_Logo" is required',
    }),

    Employee_No: Joi.number()
      .integer()
      .default(0) // You can set default here instead of in your model
      .messages({
        "number.base": '"Employee_No" must be a number',
        "number.integer": '"Employee_No" must be an integer',
      }),

    Established_date: Joi.string().optional().messages({
      "string.empty": '"Established_date" cannot be empty',
    }),

    CompanyWebsite: Joi.string().uri().required().messages({
      "string.empty": '"CompanyWebsite" cannot be empty',
      "string.uri": '"CompanyWebsite" must be a valid URL',
      "any.required": '"CompanyWebsite" is required',
    }),

    Tex_Number: Joi.string().required().messages({
      "string.empty": '"Tex_Number" cannot be empty',
      "any.required": '"Tex_Number" is required',
    }),
  }),
};
module.exports = companyvalidation;
