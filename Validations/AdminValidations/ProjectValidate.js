const Joi = require("joi");

// Define the Joi schema for Project validation
const projectSchema = Joi.object({
  CompanyId: Joi.number().required(),
  ProjectId: Joi.number().integer().optional(),
  Project_Code: Joi.string().required().max(50),
  Project_Name: Joi.string().required().max(100).trim(),
  Start_Date: Joi.string()
    .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
    .default(moment().format("DD/MM/YYYY")),
  End_Date: Joi.string()
    .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
    .default(moment().format("DD/MM/YYYY")),
  client: Joi.object({
    clientId: Joi.number().required(),
    clientName: Joi.string().required(),
  }).required(),
  Project_Type: Joi.string().required(),
  Project_Managers: Joi.string().required(),
  Project_Status: Joi.string().valid("Active", "InActive").default("InActive"),
  RoleResource: Joi.array()
    .items(
      Joi.object({
        RRId: Joi.number().required(),
        RRName: Joi.string().required(),
        RRemployee: Joi.string().required(),
      })
    )
    .optional(),
  Project_Manager: Joi.object({
    PId: Joi.number().required(),
    Project_Manager_Name: Joi.string().required(),
  }).required(),
});

module.exports = projectSchema;
