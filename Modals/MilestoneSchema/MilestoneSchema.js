const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const MilestoneSchema = new mongoose.Schema({
  Milestone_id: {
    type: Number,
    trim: true,
    required: false,
    unique: true,
  },
  Name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  Description: {
    type: String,
    maxlength: 1000,
    default: null,
  },
  Project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  Start_date: {
    type: Date,
    default: null,
  },
  End_date: {
    type: Date,
    default: null,
  },
  Is_completed: {
    type: Boolean,
    default: false,
  },
});

MilestoneSchema.plugin(AutoIncrement, {
  inc_field: "Milestone_id",
  start_seq: 1,
});
const Milestone = mongoose.model("Milestone", MilestoneSchema);
module.exports = Milestone;
