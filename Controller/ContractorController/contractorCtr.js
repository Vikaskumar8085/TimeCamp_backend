const asyncHandler = require("express-async-handler");
const User = require("../../Modals/userSchema");
const { StatusCodes } = require("http-status-codes");
const Contractor = require("../../Modals/ContractorSchema");
const TimeSheet = require("../../Modals/TimeSheetModel");

const contractorCtr = {
  // fetch contractor project
  fetchcontractorprojects: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // fetch single projects
  fetchsingleContractorProjects: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error.message);
    }
  }),
  //   fetch active projects

  fetchactiveprojects: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error.message);
    }
  }),
  //fetch inactive projects
  fetchinactiveprojects: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error.message);
    }
  }),

  //   fill contractor timesheets
  fillcontractortimesheets: asyncHandler(async (req, res) => {
    try {
      // check user exists or not
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User please sign up");
      }
      // check contractor  status
      const checkcontractor = await Contractor.findOne({ UserId: user_id });
      if (!checkcontractor) {
        res.status(StatusCodes.OK);
        throw new Error("contractor does not exists");
      }

      // fill time sheets
      const filltimesheet = await TimeSheet(
        { ContractorId: checkcontractor.Contractor_Id },
        req.body
      );
      if (!filltimesheet) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Bad request");
      }
      await filltimesheet.save();

      return res
        .status(StatusCodes.OK)
        .json({ success: true, result: filltimesheet });
    } catch (error) {
      throw new Error(error.message);
    }
  }),

  //
};

module.exports = contractorCtr;
