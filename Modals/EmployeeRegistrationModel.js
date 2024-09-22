const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const EmployeeSchema = new mongoose.Schema(
  {
    EmployeeId: {
      type: Number,
      trim: true,
      unique: true,
    },
    CompanyId: {
      type: Number,
      required: true,
    },
    UserId: {
      type: Number,
      required: true,
      unique: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    Password: {
      type: String,
      required: true,
    },
    Role: [{ type: String, default: "Employee" }],
    Phone: {
      type: String,
      // required: true,
    },
    Photos: [
      {
        type: String, // You could also use a more complex structure to handle image uploads
      },
    ],
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

EmployeeSchema.plugin(AutoIncrement, {
  inc_field: "EmployeeId",
  start_seq: 1,
});
const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
