const Joi = require("joi");

const bucketvalidation = {
  bucketvalid: Joi.object({
    bucket_id: Joi.number().required().integer().messages({
      "any.required": "bucket_id is required",
      "number.base": "bucket_id must be a number",
      "number.integer": "bucket_id must be an integer",
    }),

    bucket_Date: Joi.date().required().messages({
      "any.required": "bucket_Date is required",
      "date.base": "bucket_Date must be a valid date",
    }),

    transaction: Joi.string().required().messages({
      "any.required": "transaction is required",
      "string.base": "transaction must be a string",
    }),

    Projects: Joi.string().required().messages({
      "any.required": "Projects is required",
      "string.base": "Projects must be a string",
    }),

    bucketHourly: Joi.number().required().positive().messages({
      "any.required": "bucketHourly is required",
      "number.base": "bucketHourly must be a number",
      "number.positive": "bucketHourly must be a positive number",
    }),
  }),
};

module.exports = bucketvalidation;
