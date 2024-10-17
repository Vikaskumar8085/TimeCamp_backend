const Joi = require("joi");

const rolevalidations = {
  createRolevalidation: Joi.object({
    RoleName: Joi.string().min(3).max(50).required().messages({
      "any.required": "RoleName is required",
      "string.base": "RoleName must be a string",
      "string.min": "RoleName must be at least 3 characters long",
      "string.max": "RoleName must be less than or equal to 50 characters long",
    }),
  }),
};

module.exports = rolevalidations;
