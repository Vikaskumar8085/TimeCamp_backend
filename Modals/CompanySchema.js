const mongoose = require("mongoose");
const CompanySchema = mongoose.Schema({
  Company_Id: {
    type: Number,
    required: true,
  },
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
    type: Number,
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
  Tex_Number: {
    type: Number,
    required: true,
  },
  UserId: {
    type: String,
    required: true,
  },
  UserObjectId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
