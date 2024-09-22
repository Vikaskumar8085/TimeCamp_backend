const asyncHandler = require("express-async-handler");
const User = require("../../Modals/userSchema");
const { StatusCodes } = require("http-status-codes");
const Project = require("../../Modals/ProjectSchema");

const employeeProjectCtr = {
  // fetch all employee Projects
  fetchemployeeproject: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User Please sign up");
      }

      const checkemployee = await Employee.findOne({ UserId: user?.user_id });
      if (!checkemployee) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Not found Employee");
      }

      const projects = await Project.find({
        "RoleResource.Employee_Id": checkemployee?.EmployeeId,
      });
      return res.status(StatusCodes.OK).json({ success: true, data: projects });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // get all employee projects by employee id
  fetchsingleemployeeprojects: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User Please sign up");
      }

      const checkemployee = await Employee.findOne({ UserId: user?.user_id });
      if (!checkemployee) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Not found Employee");
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // get active employee projects

  employeeactiveprojects: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User Please sign up");
      }

      const checkemployee = await Employee.findOne({ UserId: user?.user_id });
      if (!checkemployee) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Not found Employee");
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // employee fill timesheets projects
  employeefilltimesheets: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User Please sign up");
      }

      const checkemployee = await Employee.findOne({ UserId: user?.user_id });
      if (!checkemployee) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Not found Employee");
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // get single timesheets

  employeesingletimesheetsdetails: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User Please sign up");
      }

      const checkemployee = await Employee.findOne({ UserId: user?.user_id });
      if (!checkemployee) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Not found Employee");
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = employeeProjectCtr;
