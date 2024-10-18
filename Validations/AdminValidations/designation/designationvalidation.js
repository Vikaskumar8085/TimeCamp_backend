const Joi = require("joi");
const designationvalidation = {
  createdesignationvalidation: Joi.object({
    Designation_Name: Joi.string()
      .min(3)
      .max(50)
      .regex(/^[A-Za-z\s\-]+$/) // Regex pattern for letters, spaces, and hyphens
      .required()
      .messages({
        "any.required": "Designation_Name is required",
        "string.base": "Designation_Name must be a string",
        "string.min": "Designation_Name must be at least 3 characters long",
        "string.max":
          "Designation_Name must be less than or equal to 50 characters long",
        "string.pattern.base":
          "Designation_Name must only contain letters, spaces, or hyphens",
      }),
  }),
};

module.exports = designationvalidation;
