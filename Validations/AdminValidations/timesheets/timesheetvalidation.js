const Joi = require("Joi");

const timesheetvalidation = {
  createtimesheet: Joi.object({
    FirstName: Joi.string().min(2).required().messages({
      "any.required": "FirstName is required",
      "string.base": "FirstName must be a string",
      "string.min": "FirstName must be at least 2 characters long",
    }),
    LastName: Joi.string().min(2).required().messages({
      "any.required": "LastName is required",
      "string.base": "LastName must be a string",
      "string.min": "LastName must be at least 2 characters long",
    }),
    Email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.email": "Email must be a valid email address",
    }),
    Phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .messages({
        "string.pattern.base": "Phone must be a valid 10-digit number",
      }),
    Joining_Date: Joi.date().required().messages({
      "any.required": "Joining_Date is required",
      "date.base": "Joining_Date must be a valid date",
    }),
    Password: Joi.string().min(6).required().messages({
      "any.required": "Password is required",
      "string.base": "Password must be a string",
      "string.min": "Password must be at least 6 characters long",
    }),
    IsActive: Joi.string().valid("Active", "InActive").default("InActive"),
    Role: Joi.array()
      .items(
        Joi.string().valid(
          "Employee",
          "Manager",
          "Contractor",
          "ContractorManager"
        )
      )
      .min(1)
      .required(),
    Manager: Joi.object({
      ManagerId: Joi.number().optional(),
      Manager_Name: Joi.string().optional(),
    }).optional(),
    Photos: Joi.array().items(Joi.string().uri()).optional(),
  }),
};

module.exports = timesheetvalidation;
