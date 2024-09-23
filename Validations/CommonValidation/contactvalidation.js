const Joi = require("joi");

// Define the Joi schema for Contact validation
const contactSchema = Joi.object({
  Name: Joi.string()
    .required()
    .max(50) // Optional: adjust the max length as needed
    .trim(),

  LastName: Joi.string()
    .required()
    .max(50) // Optional: adjust the max length as needed
    .trim(),

  Email: Joi.string()
    .required()
    .email() // Validates email format
    .max(100), // Optional: adjust the max length as needed

  Dispcription: Joi.string()
    .max(500) // Optional: adjust the max length as needed
    .allow(""), // Allow empty string
});

// Export the schema
module.exports = contactSchema;
