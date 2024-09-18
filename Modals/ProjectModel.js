const moment = require("moment");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// sub document of role resource
const roleRoesourceschema = new mongoose.Schema({
  RRId: {
    type: Number,
    unique: true,
    required: true,
  },
  RRName: {
    type: String,
    required: true,
  },
  RRemployee: {
    type: String,
    required: true,
  },
});

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
  Client: {
    clientId: {
      type: Number,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
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

  Project_Status: {
    type: String,
    enum: ["Active", "InActive"],
    default: "InActive",
  },

  Project_Manager: {
    PId: {
      type: Number,
      required: true,
    },
    ProjectManagerName: {
      type: String,
      required: true,
    },
    types: {
      type: String,
      required: true,
      default: "ProjectManager",
    },
  },
  roleRoesource: [roleRoesourceschema],

  Company_Id: {
    type: Number,
    required: true,
  },
});

ProjectSchema.plugin(AutoIncrement, {
  inc_field: "Project_Id",
  start_seq: 1,
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
