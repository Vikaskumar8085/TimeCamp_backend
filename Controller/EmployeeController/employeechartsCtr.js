const asyncHandler = require("express-async-handler");
const User = require("../../Modals/userSchema");
const {StatusCodes} = require("http-status-codes");
const Project = require("../../Modals/ProjectSchema");
const Employee = require("../../Modals/EmployeeSchema");

const employeechartscontroller = {
  // total project charts
  totalprojectsCharts: asyncHandler(async (req, res) => {
    try {
      // check user exists
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized user please sign up");
      }
      // check employee exists
      const checkemployee = await Employee.findOne({UserId: user?.user_id});
      if (!checkemployee) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Not found Employee");
      }
      // check total projects charts
      const projects = await Project.find({
        "RoleResource.RRId": checkemployee?.EmployeeId,
      })
        .lean()
        .exec();
      if (!projects) {
        res.status(StatusCodes.OK);
        throw new Error("projects Not found");
      }

      const {ProjectId, Project_Name, Start_Date, End_Date} = projects;
      const Projectdata = {ProjectId, Project_Name, Start_Date, End_Date};
      return res
        .status(StatusCodes.OK)
        .json({success: true, result: Projectdata});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  //   total employe hours chart

  totalemployeehourcharts: asyncHandler(async (req, res) => {
    try {
      // check user exists
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized user please sign up");
      }
      // check employee exists
      const checkemployee = await Employee.findOne({UserId: user?.user_id});
      if (!checkemployee) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Not found Employee");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }),
};

module.exports = employeechartscontroller;
