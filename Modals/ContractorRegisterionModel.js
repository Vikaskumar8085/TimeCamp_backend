const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const moment = require("moment");
const now = new Date();
const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false, // Use 24-hour time
});
const ContractorRegisterationSchema = mongoose.Schema(
  {
    Contractor_Id: {
      type: Number,
      unique: true,
      trim: true,
    },

    Contractor_Name: {
      type: String,
      required: true,
    },
    Contractor_Number: {
      type: Number,
      required: true,
    },
    Person_Name: {
      type: String,
      required: true,
    },
    Remark: {
      type: String,
      required: true,
    },
    Created_Date: {
      type: String,
      default: moment().format("DD/MM/YYYY"),
    },
    Company_Id: {
      type: Number,
      required: true,
    },
    Contractor_Type:{
      type:String,
      enum:["Contractor","Manager"],
      default:"Contractor"
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

ContractorRegisterationSchema.plugin(AutoIncrement, {
  inc_field: "Contractor_Id",
  start_seq: 1,
});
const ContractorRegistration = mongoose.model(
  "ContractorRegistration",
  ContractorRegisterationSchema
);

module.exports = ContractorRegistration;
