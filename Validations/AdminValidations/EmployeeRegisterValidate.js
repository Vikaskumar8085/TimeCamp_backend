const Joi = require("joi");

const EmployeeValidation = Joi.object({
  EmployeeId: Joi.number().required().integer().positive(),
  CompanyId: Joi.number().required().integer().positive(),
  UserId: Joi.number().required().integer().positive().unique(), // Ensure unique validation is handled in the database
  FirstName: Joi.string().min(1).max(50).required().trim(),
  LastName: Joi.string().min(1).max(50).required().trim(),
  Email: Joi.string().email().required().trim().max(100()), // Set a reasonable max length for emails
  Phone: Joi.string()
    .pattern(/^[0-9]{10}$/) // Validates a 10-digit phone number
    .optional()
    .trim(),
  Address: Joi.string()
    .max(200) // Reasonable max length for addresses
    .optional()
    .trim(),
  Employee_Joining_Date: Joi.string()
    .pattern(/^\d{2}\/\d{2}\/\d{4}$/) // Validates date format DD/MM/YYYY
    .required(),
  Designation: Joi.string().min(1).max(50).required().trim(),
  Password: Joi.string()
    .min(6) // Minimum length for passwords
    .max(100)
    .required()
    .trim(),
  Role: Joi.array()
    .items(
      Joi.string().valid(
        "Admin",
        "Manager",
        "Employee",
        "Contractor",
        "SuperAdmin"
      )
    ) // Specify valid roles
    .default(["Employee"]),

  Photos: Joi.array()
    .items(Joi.string().uri()) // Validates that each entry in the array is a valid URL
    .optional(),
});

module.exports = EmployeeValidation;
