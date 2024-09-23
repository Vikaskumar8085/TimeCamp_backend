const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const moment = require("moment");
const now = new Date();
const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false, // Use 24-hour time
});
const ContractorSchema = mongoose.Schema(
  {
    Contractor_Id: {
      type: Number,
      unique: true,
      trim: true,
    },

    UserId: {
      type: Number,
      ref: "User",
      unique: true,
      trim: true,
    },
    Contractor_FirstName: {
      type: String,
      required: true,
    },
    Contaractor_LastName: {
      type: String,
      required: true,
    },
    Contractor_Phone: {
      type: Number,
      required: true,
    },
    Person_Name: {
      type: String,
      required: true,
    },
    Designation: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: false,
      default: "",
    },
    Remark: {
      type: String,
      required: true,
    },
    Contractor_Hourly_Rate: {
      type: String,
      required: true,
    },
    Created_Date: {
      type: String,
      default: moment().format("DD/MM/YYYY"),
    },
    Company_Id: {
      type: Number,
      ref: "Company",
      required: true,
    },

    Contractor_Type: {
      type: String,
      default: "Contractor",
    },

    Created_Time: {
      type: String,
      default: function () {
        return moment().format("HH:mm");
      },
    },
    Company_Id: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ContractorSchema.plugin(AutoIncrement, {
  inc_field: "Contractor_Id",
  start_seq: 1,
});
const Contractor = mongoose.model("Contractor", ContractorSchema);

module.exports = Contractor;


// {
//   "UserId": 1,
//   "Contractor_FirstName": "John",
//   "Contaractor_LastName": "Doe",
//   "Contractor_Phone": 9876543210,
//   "Person_Name": "Jane Smith",
//   "Designation": "Software Developer",
//   "Password": "securepassword",
//   "Remark": "Experienced contractor",
//   "Contractor_Hourly_Rate": "50",
//   "Company_Id": 1
// }
