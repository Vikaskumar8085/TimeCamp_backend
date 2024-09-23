const Joi = require("joi");

const ClientRegistrationValidation = Joi.object({
  Company_Name: Joi.string().min(3).max(30).required().trim(),

  Client_Name: Joi.string().min(3).max(30).required().trim(),

  Client_Email: Joi.string()
    .email()
    .required()
    .max(100) // Adjust max length as needed
    .trim(),

  Client_Phone: Joi.string()
    .pattern(/^[0-9]{10}$/) // Validates a 10-digit phone number
    .required()
    .trim(),

  Client_Address: Joi.string()
    .min(3)
    .max(100) // Adjust max length as needed
    .required()
    .trim(),

  Client_Postal_Code: Joi.string() // Assuming postal codes can be alphanumeric
    .pattern(/^[A-Za-z0-9]{3,10}$/) // Adjust regex as needed for postal codes
    .required()
    .trim(),

  GstNumber: Joi.string()
    .pattern(/^([0-9]{2})[A-Z]{5}([0-9]{4})([A-Z]{1})([0-9]{1})?$/) // Example GST format
    .required()
    .trim(),
});

module.exports = ClientRegistrationValidation;
