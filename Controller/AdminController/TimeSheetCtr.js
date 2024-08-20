const AsyncHandler = require("express-async-handler");
const TimeSheet = require("../../Modals/TimeSheetModel");

// get all timesheet ctr

const GetAllTimesheetCtr = AsyncHandler(async (req, res) => {
  try {
    const timesheets = await TimeSheet.find();
    res.status(200).json({
      success: true,
      message: timesheets,
    });
  } catch (error) {
    throw new Error(error?.message);
  }
});

// add time sheet ctr

const AddTimeSheetCtr = AsyncHandler(async (req, res) => {
  try {
    const timesheet = new TimeSheet(req.body);
    const savedTimesheet = await timesheet.save();
    return res.status(200).json(savedTimesheet);
  } catch (error) {
    throw new Error(error?.message);
  }
});

// Delete Time Sheet

const RemoveTimeSheetCtr = AsyncHandler(async (req, res) => {
  try {
    const removesheet = await TimeSheet.findByIdAndDelete(req.params.id);
    if (!removesheet) {
      return res.status(404).json({ message: "Timesheet not found" });
    }
    res.status(200).json({ message: "Timesheet deleted" });
  } catch (error) {
    throw new Error(error?.message);
  }
});
const UpdateTimesheetCtr = AsyncHandler(async (req, res) => {
  try {
    const timesheet = await TimeSheet.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!timesheet) {
      return res.status(404).json("timesheet not found");
    }
    return res.status(200).json("updated timeSheet");
  } catch (error) {
    throw new Error(error?.message);
  }
});

module.exports = {
  GetAllTimesheetCtr,
  AddTimeSheetCtr,
  RemoveTimeSheetCtr,
  UpdateTimesheetCtr,
};
