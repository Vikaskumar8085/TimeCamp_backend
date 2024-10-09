const mongoose = require("mongoose");
const { Schema } = mongoose;

const AutoIncrement = require("mongoose-sequence")(mongoose);

// Define the Billing Status constants
const BILLING_STATUS = ["NOT_BILLED", "BILLED", "PARTIALLY_BILLED"]; // Adjust as needed

const TimesheetSchema = new Schema({
  TaskId: {
    type: Number, // Use UUID if you have a UUID package; otherwise, you can use String
    required: false,
    unique: true,
  },
  ts_code: {
    type: String,
    maxlength: 10,
    unique: true,
    sparse: true, // Allows blank entries but maintains uniqueness
  },
  ContractorId: {
    type: Number,
    ref: "Contractor",
    required: false,
  },
  EmployeeId: {
    type: Number,
    ref: "Employee",
    required: false,
  },
  CompanId: {
    type: Number,
    ref: "Company",
    default: null,
    required: false,
  },
  hours: {
    type: String,
    default: 0,
  },
  project: {
    type: Number,
    ref: "Project",
    required: true,
  },
  task_description: {
    type: String,
    required: false,
  },
  Description: {
    type: String,
    default: null,
    maxlength: 5000, // Optional: limit the description length
  },
  start_time: {
    type: Date, // Mongoose doesn't have a TimeField; use Date with only time
    default: null,
  },
  end_time: {
    type: Date, // Same as above
    default: null,
  },
  day: {
    type: Date, // Use Date type for storing the day
    required: false,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  remarks: {
    type: String,
    default: null,
    maxlength: 5000, // Optional
  },
  approval_status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING",
  },
  billing_status: {
    type: String,
    enum: BILLING_STATUS,
    default: "NOT_BILLED",
  },
  approved_date: {
    type: Date,
    default: null,
  },
  approved_by: {
    type: Number,
    ref: "User",
    default: null,
  },
  billed_hours: {
    type: Number,
    default: 0,
  },
  ok_hours: {
    type: Number,
    default: 0,
  },
  blank_hours: {
    type: Number,
    default: 0,
  },
});

// Create the model from the schema
TimesheetSchema.plugin(AutoIncrement, {
  inc_field: "TaskId",
  start_seq: 1,
});
const TimeSheet = mongoose.model("TimeSheet", TimesheetSchema);

module.exports = TimeSheet;


// {
//   "ts_code": "TS12345",
//   "ContractorId": 1,
//   "EmployeeId": 1,
//   "CompanId": 1,
//   "hours": 8,
//   "project": 1,
//   "task_description": "Develop new feature",
//   "Description": "Detailed description of the task.",
//   "start_time": "2023-10-01T09:00:00Z",
//   "end_time": "2023-10-01T17:00:00Z",
//   "day": "2023-10-01",
//   "approved": false,
//   "remarks": "First entry for the project",
//   "approval_status": "PENDING",
//   "billing_status": "NOT_BILLED",
//   "billed_hours": 0,
//   "ok_hours": 0,
//   "blank_hours": 0
// }
