const asyncHandler = require("express-async-handler");
const TimeSheet = require("../../Modals/TimeSheetModel");
const timesheetController = {
  // create
  createtimesheet: asyncHandler(async (req, res) => {
    try {
      const newTask = await TimeSheet(req.body);
      await newTask.save();
      res
        .status(201)
        .json({message: "Task created successfully", task: newTask});
    } catch (error) {
      res
        .status(400)
        .json({message: "Error creating task", error: error.message});
    }
  }),
  // get timesheet
  fetchtimesheet: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User");
      }
      // verify company

      const verifycompany = await Company.findOne({UserId: user?.user_id});
      if (!verifycompany) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(
          "Your Company has still not registred please register now"
        );
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // remove timesheet

  removetimesheet: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  edittimesheet: asyncHandler(async (req, res) => {
    try {
    } catch (error) {}
  }),

  sigletimesheet: asyncHandler(async (req, res) => {
    try {
    } catch (error) {}
  }),
};

module.exports = timesheetController;
