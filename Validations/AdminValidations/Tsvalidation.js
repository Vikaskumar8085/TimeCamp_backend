const Joi = require("joi");

// Define regex patterns
const phoneRegex = /^[0-9]{10}$/; // Example: 10-digit phone number
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
const descriptionRegex = /^[a-zA-Z0-9 .,?!'"\-]{1,500}$/; // Allow letters, numbers, and some punctuation

// Define the Joi schema for Timesheet validation
const timesheetSchema = Joi.object({
  ContractorId: Joi.number().integer().optional(),
  EmployeeId: Joi.number().integer().optional(),
  CompanId: Joi.number().integer().optional(),
  hours: Joi.number().integer().min(0).default(0),
  project: Joi.number().integer().required(),
  task_description: Joi.string().pattern(descriptionRegex).required().max(500),
  Description: Joi.string().pattern(descriptionRegex).optional().max(5000),
  start_time: Joi.date().optional(),
  end_time: Joi.date().optional().greater(Joi.ref("start_time")), // Ensure end_time is after start_time
  day: Joi.date().required(),
  approved: Joi.boolean().default(false),
  remarks: Joi.string().optional().max(5000),
  approval_status: Joi.string()
    .valid("PENDING", "APPROVED", "REJECTED")
    .default("PENDING"),
  billing_status: Joi.string()
    .valid("NOT_BILLED", "BILLED", "PARTIALLY_BILLED")
    .default("NOT_BILLED"),
  approved_date: Joi.date().optional(),
  approved_by: Joi.number().integer().optional(),
  billed_hours: Joi.number().integer().min(0).default(0),
  ok_hours: Joi.number().integer().min(0).default(0),
  blank_hours: Joi.number().integer().min(0).default(0),
});

module.exports = timesheetSchema;
