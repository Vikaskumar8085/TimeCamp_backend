const Joi = require("joi");

const employeevalidation = {
  createemployeevalidation: Joi.object({
    FirstName: Joi.string().min(2).max(50).required().messages({
      "string.base": "FirstName should be a type of string",
      "string.empty": "FirstName cannot be empty",
      "string.min": "FirstName should be at least 2 characters long",
      "string.max": "FirstName should be less than 50 characters",
      "any.required": "FirstName is required",
    }),

    LastName: Joi.string().min(2).max(50).required().messages({
      "string.base": "LastName should be a type of string",
      "string.empty": "LastName cannot be empty",
      "string.min": "LastName should be at least 2 characters long",
      "string.max": "LastName should be less than 50 characters",
      "any.required": "LastName is required",
    }),

    Email: Joi.string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) // Email regex
      .required()
      .messages({
        "string.base": "Email should be a type of string",
        "string.empty": "Email cannot be empty",
        "string.pattern.base": "Email must be a valid email address",
        "any.required": "Email is required",
      }),

    Address: Joi.string().min(5).required().messages({
      "string.base": "Address should be a type of string",
      "string.empty": "Address cannot be empty",
      "string.min": "Address should be at least 5 characters long",
      "any.required": "Address is required",
    }),

    Phone: Joi.string()
      .regex(/^[0-9]{10,15}$/) // Phone number regex (digits only, 10-15 characters)
      .required()
      .messages({
        "string.base": "Phone should be a type of string",
        "string.empty": "Phone cannot be empty",
        "string.pattern.base":
          "Phone must be a valid phone number (digits only, 10-15 digits)",
        "any.required": "Phone is required",
      }),

    Designation: Joi.string().min(3).max(100).required().messages({
      "string.base": "Designation should be a type of string",
      "string.empty": "Designation cannot be empty",
      "string.min": "Designation should be at least 3 characters long",
      "string.max": "Designation should be less than 100 characters",
      "any.required": "Designation is required",
    }),

    Password: Joi.string()
      .min(8)
      .required()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ) // Password regex for complexity
      .messages({
        "string.base": "Password should be a type of string",
        "string.empty": "Password cannot be empty",
        "string.min": "Password should be at least 8 characters long",
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "any.required": "Password is required",
      }),

    CompanyId: Joi.number().integer().required().messages({
      "number.base": "CompanyId should be a type of number",
      "any.required": "CompanyId is required",
    }),
  }),
};

module.exports = employeevalidation;
