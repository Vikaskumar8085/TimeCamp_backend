const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const RoleResourceSchema = mongoose.Schema(
  {
    RoleType: {
      type: String,
      required: true,
    },
    Role_Id: {
      type: Number,
      trim: true,
      unique: true,
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

RoleResourceSchema.plugin(AutoIncrement, {
  inc_field: "Role_Id",
  start_seq: 1,
});
const RoleResource = mongoose.model("RoleResource", RoleResourceSchema);

module.exports = RoleResource;
