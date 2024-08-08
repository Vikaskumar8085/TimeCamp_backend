const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const EmployeeRegistrationSchema = mongoose.Schema(
  {
    Employee_Id: {
      type: Number,
      unique: true,
    },
    Employee_FirstName: {
      type: String,
      required: true,
    },
    Employee_LastName: {
      type: String,
      required: true,
    },
    Employee_Email: {
      type: String,
      required: true,
    },
    Employee_Phone: {
      type: String,
      required: true,
    },
    Employee_JoiningDate: {
      type: String,
      required: true,
    },
    Employee_IsActive: {
      type: String,
      required: true,
    },
    Employee_Designation: {
      type: Number,
      required: true,
    },
    Employee_Role: {
      type: String,
      enum: [""],
      required: true,
    },
    Employee_Address: {
      type: String,
      required: true,
    },
    Employee_Project: {
      type: Number,
      required: true,
    },
    Employee_Permission: {
      type: Number,
      required: true,
    },
    Employee_Entry_days: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// EmployeeRegistrationSchema.plugin(AutoIncrement, { inc_field: "Employee_Id" });

EmployeeRegistrationSchema.plugin(AutoIncrement, {
  inc_field: "Employee_Id",
  start_seq: 1,
});
const EmployeeRegistration = mongoose.model(
  "EmployeeRegistration",
  EmployeeRegistrationSchema
);
module.exports = EmployeeRegistration;
