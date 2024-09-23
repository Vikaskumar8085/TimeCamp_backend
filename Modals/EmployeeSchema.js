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
    Phone: {
      type: String,
      trim: true,
      default: "",
    },
    Address: {
      type: String,
      trim: true,
      default: "",
    },
    Employee_Joining_Date: {
      type: String,
      required: true,
      trim: true,
      required: true,
    },

    Designation: {
      type: String,
      required: true,
      trim: true,
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

// {
//   "CompanyId": 1,
//   "UserId": 1,
//   "FirstName": "John",
//   "LastName": "Doe",
//   "Email": "john.doe@example.com",
//   "Phone": "1234567890",
//   "Address": "123 Main St",
//   "Employee_Joining_Date": "2023-10-01",
//   "Designation": "Software Engineer",
//   "Password": "securepassword",
//   "Role": ["Employee"],
//   "Photos": ["photo1.jpg", "photo2.jpg"]
// }
