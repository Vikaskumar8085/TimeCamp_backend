const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ProjectSchema = mongoose.Schema({
  ProjectId: {
    type: Number,
    unique: true,
    trim: true,
  },
  client: {
    clientId: {
      type: Number,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
  },
  ProjectName: {
    type: String,
    required: true,
  },
  RoleResource: [
    {
      Employee_Id: {
        type: Number,
        required: true,
      },
    },
    {
      Employee_Name: {
        type: String,
        required: true,
      },
    },
  ],
});

ProjectSchema.plugin(AutoIncrement, {
  inc_field: "ProjectId",
  start_seq: 1,
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
