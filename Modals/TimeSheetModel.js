const mongoose = require("mongoose");
const { Schema } = mongoose;




// Define the Billing Status constants
const BILLING_STATUS = ["NOT_BILLED", "BILLED", "PARTIALLY_BILLED"]; // Adjust as needed

const TimesheetSchema = new Schema({
  task_id: {
    type: Schema.Types.UUID, // Use UUID if you have a UUID package; otherwise, you can use String
    default: () => new mongoose.Types.UUID(),
    required: true,
    unique: true,
  },
  ts_code: {
    type: String,
    maxlength: 10,
    unique: true,
    sparse: true, // Allows blank entries but maintains uniqueness
  },
  resource: {
    type: Number,
    ref: "Employee",
    required: true,
  },
  company: {
    type: Number,
    ref: "Company",
    default: null,
  },
  hours: {
    type: Number,
    default: 0,
  },
  project: {
    type: Number,
    ref: "Project",
    required: true,
  },
  task_description: {
    type: String,
    required: true,
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
    required: true,
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
const TimeSheet = mongoose.model("TimeSheet", TimesheetSchema);

module.exports = TimeSheet;
