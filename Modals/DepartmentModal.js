const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const DepartmentSchema = mongoose.Schema(
  {
    Dep_Id: {
      type: Number,
      unique: true,
      trim: true,
    },
    Dep_Name: {
      type: String,
      required: true,
      unquie: true,
      trim: true,
    },
    Remark: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

DepartmentSchema.plugin(AutoIncrement, {
  inc_field: "Dep_Id",
  start_seq: 1,
});
const Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;
