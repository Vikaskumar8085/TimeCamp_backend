const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const CompanySchema = mongoose.Schema({
  Company_Id: {
    type: Number,
    trim: true,
    unique: true,
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
    default: "",
  },
  Established_date: {
    type: String,
    // required: true,
  },
  CompanyWesite: {
    type: String,
    required: true,
  },
  Tex_Number: {
    type: String,
    required: true,
  },
  UserId: [
    {
      type: Number,
      required: true,
    },
  ],
});

CompanySchema.plugin(AutoIncrement, {
  inc_field: "Company_Id",
  start_seq: 1,
});

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
