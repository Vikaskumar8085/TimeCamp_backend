const mongoose = require("mongoose");

const RoleResourceSchema = mongoose.Schema(
  {
    RoleType: {
      type: String,
      required: true,
    },
    Project_Id: {
      type: String,
      required: true,
    },
    Employee_Id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RoleResource = mongoose.model("RoleResource", RoleResourceSchema);

module.exports = RoleResource;
