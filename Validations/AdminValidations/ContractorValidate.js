const Joi = require("joi");

const ContractorValidation = Joi.object({
  Contractor_FirstName: Joi.string().min(1).max(50).required().trim(),

  Contaractor_LastName: Joi.string().min(1).max(50).required().trim(),

  Contractor_Phone: Joi.string()
    .pattern(/^[0-9]{10}$/) // Validates a 10-digit phone number
    .required()
    .trim(),

  Person_Name: Joi.string().min(1).max(50).required().trim(),

  Designation: Joi.string().min(1).max(100).required().trim(),

  Password: Joi.string()
    .min(6) // Minimum length for passwords
    .max(100)
    .optional()
    .trim(),

  Remark: Joi.string()
    .max(500) // Max length for remarks
    .required()
    .trim(),

  Contractor_Hourly_Rate: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/) // Validates a decimal number
    .required()
    .trim(),

  Company_Id: Joi.number().required(),

  Contractor_Type: Joi.string()
    .valid("Contractor", "Subcontractor") // Assuming these are the valid types
    .default("Contractor")
    .optional(),

  Created_Date: Joi.string()
    .pattern(/^\d{2}\/\d{2}\/\d{4}$/) // Validates date format DD/MM/YYYY
    .optional(),

  Created_Time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) // Validates time format HH:mm
    .optional(),
});

module.exports = ContractorValidation;
