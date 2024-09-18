const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);


// Define role choices as constants
const ROLES = ['Employee', 'Manager', 'Contractor'];

const EmployeeSchema = new Schema({
  id: {
    type: Number,
    required: false,
    unique: true
  },
  first_name: {
    type: String,
    required: true,
    maxlength: 40
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true // If unique constraint is desired
  },
  phone_number: {
    type: String,
    required: true,
    maxlength: 20
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 40
  },
  start_date: {
    type: Date,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true,
    required: true
  },
  designation: {
    type: String,
    default: null,
    maxlength: 255
  },
  employee_img: {
    type: String, // Store path to image, adjust as per your storage solution
    default: 'blank-profile-picture.png'
  },
  company_name: {
    type: Number,
    ref: 'Company',
    required: true
  },
  role: {
    type: String,
    enum: ROLES,
    default: 'Employee'
  },
  created_by: {
    type: String,
    default: null,
    maxlength: 255
  },
  manager: {
    type: Number,
    ref: 'Employee',
    default: null,
    required: false
  },
  address: {
    type: String,
    default: null
  },
  last_password_reset: {
    type: Date,
    default: null
  },
  project_creation: {
    type: Boolean,
    default: false
  },
  skype_id: {
    type: String,
    default: null,
    maxlength: 255
  },
  user_for: {
    type: Schema.Types.ObjectId,
    ref: 'UserFor',
    default: null
  },
  backlog_entry_days: {
    type: Number,
    default: 1,
    min: 0 // Optional: to ensure non-negative values
  },
  contractor_company: {
    type: String,
    default: null,
    maxlength: 255
  },
  hourly_rate: {
    type: Number,
    default: null
  },
  supervisor: {
    type: String,
    default: null,
    maxlength: 255
  }
});

EmployeeSchema.plugin(AutoIncrement, {
  inc_field: "id",
  start_seq: 1,
})
// Create the model from the schema
const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;