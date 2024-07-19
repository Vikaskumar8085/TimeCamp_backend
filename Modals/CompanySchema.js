const mongoose = require("mongoose");
const CompanySchema = mongoose.Schema({
  Company_Name: {
    type: String,
    required: true,
  },
  Company_Email: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Postal_Code: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Company_Logo: {
    type: String,
    required: true,
  },
  Employee_No: {
    type: Number,
    required: true,
  },
  Established_date: {
    type: Date,
    required: true,
  },
  CompanyWesite: {
    type: String,
    required: true,
  },
  TextNumber: {
    type: Number,
    required: true,
  },
  UserId: {
    type: Number,
    required: true,
  },
  UserObjectId: {
    type: String,
    required: true,
  },
});

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
