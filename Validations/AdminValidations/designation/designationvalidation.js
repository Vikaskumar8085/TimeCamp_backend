const Joi = require("joi");
const designationvalidation = {
  createdesignationvalidation: Joi.object({
    Designation_Name: Joi.string().min(3).max(50).required().messages({
      "any.required": "Department_Name is required",
      "string.base": "Department_Name must be a string",
      "string.min": "Department_Name must be at least 3 characters long",
      "string.max":
        "Department_Name must be less than or equal to 50 characters long",
    }),
  }),
};

module.exports = designationvalidation;
