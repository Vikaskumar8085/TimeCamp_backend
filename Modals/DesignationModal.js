const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const DesignationSchema = mongoose.Schema(
  {
    Desig_Id: {
      type: Number,
      unique: true,
      trim: true,
    },
    Desig_Name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
DesignationSchema.plugin(AutoIncrement, { inc_field: "Desig_Id" });
const Designation = mongoose.model("Designation", DesignationSchema);
module.exports = Designation;
