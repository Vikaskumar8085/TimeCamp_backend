const Joi = require('joi');

const timesheetSchema = Joi.object({
  TS_code: Joi.string().required(),
  ProjectName: Joi.string().trim().required(),
  Company: Joi.string().required(),
  Task_Description: Joi.string().required(),
  Description: Joi.string().required(),
  Hours: Joi.string().trim().required(),
  StartTime: Joi.string().required(),
  Endtime: Joi.string().required(),
  CreateDate: Joi.date().iso().required(),
  Resource: Joi.string().required(),
  Approvel: Joi.string().required(),
  Status: Joi.string().required(),
  Bill_Status: Joi.string().required(),
  Approved_By: Joi.string().required(),
  Approvel_Date: Joi.string().required(),
});

module.exports = { timesheetSchema };
