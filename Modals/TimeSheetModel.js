const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const TimesheetSchema = mongoose.Schema(
  {
    Task_id: {
      type: Number,
      trim: true,
    },
    TS_code: {
      type: String,
      required: true,
    },
    ProjectName: {
      type: String,
      trim: true,
      required: [true, "Please enter your ProjectName"],
    },
    Company: {
      type: String,
      required: true,
    },
    Task_Description: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true
    }, 
    Hours: {
      type: String,
      trim: true,
      required: [true, "Please enter your hours"],
    },
    StartTime: {
      type: String,
      required: [true, "Please enter your start Time"],
    },
    Endtime: {
      type: String,
      required: [true, "Please enter your Endtime"],
    },
    CreateDate: {
      type: Date,
      required: true,
    },
    Resource: {
      type: String,
      required: true,
    },
    Approvel: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      required: true,
    },
    Bill_Status: {
      type: String,
      required: true,
    },
    Approved_By: {
      type: String,
      required: true,
    },
    Approvel_Date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TimesheetSchema.plugin(AutoIncrement, { inc_field: 'Task_id' });

const TimeSheet = mongoose.model("TimeSheet", TimesheetSchema);

module.exports = TimeSheet;
