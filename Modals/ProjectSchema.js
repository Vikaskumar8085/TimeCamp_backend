const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const moment = require("moment");

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

const ProjectSchema = mongoose.Schema({
  CompanyId: {
    type: Number,
    ref: "Company",
    required: true,
  },
  ProjectId: {
    type: Number,
    unique: true,
    trim: true,
  },
  Project_Code: {
    type: String,
    required: true,
    trim: true,
  },
  Project_Name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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
  RoleResource: [roleRoesourceschema],
  Project_Manager: {
    PId: {
      type: Number,
      required: true,
    },
    Project_Manager_Name: {
      type: String,
      required: true,
    },
  },
});

ProjectSchema.plugin(AutoIncrement, {
  inc_field: "ProjectId",
  start_seq: 1,
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;

// {
//   "CompanyId": 1,
//   "Project_Code": "PRJ001",
//   "Project_Name": "Project Alpha",
//   "Start_Date": "01/09/2024",
//   "End_Date": "01/12/2024",
//   "client": {
//     "clientId": 101,
//     "clientName": "Client XYZ"
//   },
//   "Project_Type": "Development",
//   "Project_Managers": "Manager One",
//   "Project_Status": "Active",
//   "RoleResource": [
//     {
//       "RRId": 1,
//       "RRName": "Admin",
//       "RRemployee": "Employee A"
//     }
//   ],
//   "Project_Manager": {
//     "PId": 201,
//     "Project_Manager_Name": "John Doe"
//   }
// }
