const mongoose = require("mongoose");
const {Schema} = mongoose;
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
    Joining_Date: {
      type: String,
      required: true,
      trim: true,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Designation: {
      type: String,
      required: true,
      trim: true,
    },
    Role: [
      {
        type: String,
        enum: ["Employee", "Manager", "Contractor"],
        default: "Employee",
      },
    ],
    Manager: {
      type: String,
      default: "",
    },
    Permission: {
      type: Boolean,
      required: true,
    },
    Backlog_Entries: {
      type: Number,
      required: true,
      default: 1,
    },
    Socail_Links: {
      type: String,
      required: false,
    },
    Contractor_Company: {
      type: String,
    },
    Hourly_Rate: {
      type: Number,
    },
    Supervisor: {
      type: String,
    },
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
  {timestamps: true}
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
