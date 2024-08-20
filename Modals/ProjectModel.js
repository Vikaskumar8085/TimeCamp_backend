const moment = require("moment");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ProjectSchema = new mongoose.Schema({
  Project_Id: {
    type: Number,
    trim: true,
  },
  Project_Name: {
    type: String,
    required: true,
  },
  Project_Code: {
    type: String,
    required: true,
  },
  Client_Name: {
    type: String,
    required: true,
  },
  Start_Date: {
    type: String,
    default: moment().format("DD/MM/YYYY"),
  },
  End_Date: {
    type: String,
    default: function () {
      return moment().format("DD/MM/YYYY");
    },
  },
  Project_Type: {
    type: String,
    required: true,
  },
  Project_Managers: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  Employee: {
    type: String,
    required: true,
  },
});

ProjectSchema.plugin(AutoIncrement, {
  inc_field: "Project_Id",
  start_seq: 1,
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
