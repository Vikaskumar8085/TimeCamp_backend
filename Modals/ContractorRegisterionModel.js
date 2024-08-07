const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
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
      type: Date,
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
