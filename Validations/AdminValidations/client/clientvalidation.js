const Joi = require("joi");

const clientvalidation = {
  addclientvalidation: Joi.object({
    Company_Name: Joi.string().min(2).required().messages({
      "any.required": "Company_Name is required",
      "string.base": "Company_Name must be a string",
      "string.min": "Company_Name must be at least 2 characters long",
    }),

    Client_Name: Joi.string().min(2).required().messages({
      "any.required": "Client_Name is required",
      "string.base": "Client_Name must be a string",
      "string.min": "Client_Name must be at least 2 characters long",
    }),

    Client_Email: Joi.string().email().required().messages({
      "any.required": "Client_Email is required",
      "string.base": "Client_Email must be a string",
      "string.email": "Client_Email must be a valid email address",
    }),

    Client_Phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "any.required": "Client_Phone is required",
        "string.base": "Client_Phone must be a string",
        "string.pattern.base": "Client_Phone must be a 10-digit phone number",
      }),

    Client_Address: Joi.string().min(5).required().messages({
      "any.required": "Client_Address is required",
      "string.base": "Client_Address must be a string",
      "string.min": "Client_Address must be at least 5 characters long",
    }),

    Client_Postal_Code: Joi.number().required().integer().positive().messages({
      "any.required": "Client_Postal_Code is required",
      "number.base": "Client_Postal_Code must be a number",
      "number.integer": "Client_Postal_Code must be an integer",
      "number.positive": "Client_Postal_Code must be a positive number",
    }),

    GstNumber: Joi.string().min(5).required().messages({
      "any.required": "GstNumber is required",
      "string.base": "GstNumber must be a string",
      "string.min": "GstNumber must be at least 5 characters long",
    }),

    Common_Id: Joi.number().required().integer().positive().messages({
      "any.required": "Common_Id is required",
      "number.base": "Common_Id must be a number",
      "number.integer": "Common_Id must be an integer",
      "number.positive": "Common_Id must be a positive number",
    }),

    Client_Status: Joi.string()
      .valid("Active", "InActive", "Dead")
      .default("InActive")
      .messages({
        "any.required": "Client_Status is required",
        "string.base": "Client_Status must be a string",
        "string.valid":
          'Client_Status must be one of "Active", "InActive", or "Dead"',
      }),
  }),

  
};

module.exports = clientvalidation;
