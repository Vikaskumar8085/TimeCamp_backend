const Joi = require("joi");

const projectvalidations = {
  // add projects
  addprojectsvalidation: Joi.object({
    CompanyId: Joi.number().required().messages({
      "any.required": "CompanyId is required",
      "number.base": "CompanyId must be a number",
    }),
    Project_Code: Joi.string()
      .pattern(/^PRJ\d{3}$/)
      .required()
      .messages({
        "any.required": "Project_Code is required",
        "string.base": "Project_Code must be a string",
        "string.pattern.base": "Project_Code must be in the format PRJxxx",
      }),
    Project_Name: Joi.string().min(3).required().messages({
      "any.required": "Project_Name is required",
      "string.base": "Project_Name must be a string",
      "string.min": "Project_Name must be at least 3 characters long",
    }),
    Start_Date: Joi.date().required().messages({
      "any.required": "Start_Date is required",
      "date.base": "Start_Date must be a valid date",
    }),
    End_Date: Joi.date().required().messages({
      "any.required": "End_Date is required",
      "date.base": "End_Date must be a valid date",
    }),
    Project_Type: Joi.string().optional(),
    Project_Hours: Joi.string().optional(),
    Project_Status: Joi.string()
      .valid("Active", "InActive")
      .default("InActive"),
    RoleResource: Joi.array().items(
      Joi.object({
        RRId: Joi.number().required(),
        RRName: Joi.string().required(),
      })
    ),
    Project_Managers: Joi.object({
      PId: Joi.number().required(),
      Project_Manager_Name: Joi.string().required(),
    }).required(),
  }),
};

module.exports = projectvalidations;
