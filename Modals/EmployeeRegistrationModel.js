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
      lowercase: true,
      trim: true,
    },
    Employee_Phone: {
      type: String,
      required: true,
    },
    Employee_JoiningDate: {
      type: String,
      required: true,
    },
    Employee_Designation: {
      type: String,
      required: true,
    },

    Employee_Address: {
      type: String,
      required: true,
    },
    Employee_Status: {
      type: String,
      enum: ["Active", "inActive"],
      default: "",
    },
    Employee_Permission: {
      type: Boolean,
      required: true,
      default: false,
    },
    Employee_Type: {
      type: String,
      enum: ["Employee", "Manager"],
      default: "Employee",
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

EmployeeRegistrationSchema.plugin(AutoIncrement, {
  inc_field: "Employee_Id",
  start_seq: 1,
});
const EmployeeRegistration = mongoose.model(
  "EmployeeRegistration",
  EmployeeRegistrationSchema
);
module.exports = EmployeeRegistration;
