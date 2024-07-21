const mongoose = require("mongoose");

const TimesheetSchema = mongoose.Schema(
  {
    ProjectName: {
      type: String,
      trim: true,
      required: [true, "Please enter your ProjectName"],
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
    Employee: {
      type: Number,
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

const TimeSheet = mongoose.model("TimeSheet", TimesheetSchema);

module.exports = TimeSheet;
