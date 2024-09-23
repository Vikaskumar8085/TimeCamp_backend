const asyncHandler = require("express-async-handler");
const Project = require("../../Modals/ProjectSchema");
const User = require("../../Modals/userSchema");
const Company = require("../../Modals/CompanySchema");
const Employee = require("../../Modals/EmployeeSchema");
const { StatusCodes } = require("http-status-codes");

const Projectctr = {
  createproject: asyncHandler(async (req, res) => {
    console.log("project");
    try {
      console.log(req.user);
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un authorized user Please Signup");
      }
      // check company
      const checkcompany = await Company.findOne({ UserId: user?.user_id });
      if (!checkcompany) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("company does not exists please create your company");
      }
      const addprojects = await Project(req.body);

      if (!addprojects) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Bad Request");
      }
      await addprojects.save();
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "add item successfully",
        result: addprojects,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  fetchProject: asyncHandler(async (req, res) => {
    try {
      //   // user
      //   const user = await User.findById(req.user);
      //   if (!user) {
      //     res.status(StatusCodes.UNAUTHORIZED);
      //     throw new Error("Un Authorized User");
      //   }
      //   //  check company

      //   const checkcompany = await Company.findOne({ UserId: user?.user_id });
      //   if (!checkcompany) {
      //     res.status(StatusCodes?.BAD_REQUEST);
      //     throw new Error("company does not exists");
      //   }

      //   const checkemployee = await Employee.findOne({
      //     CompanyId: checkcompany.Common_Id,
      //   });

      //   if (!checkemployee) {
      //     res.status(StatusCodes?.BAD_REQUEST);
      //     throw new Error("employee not exists");
      //   }

      const projects = await Project.find({
        "RoleResource.Employee_Id": 5,
      });

      return res.status(200).json({ data: projects });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  fetchallProjects: asyncHandler(async (req, res) => {
    try {
      // user
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User");
      }
      //  check company

      const checkcompany = await Company.findOne({ UserId: user?.user_id });
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company does not exists");
      }

      // get all Projects

      const fetchallprojects = await Project.find({
        CompanyId: checkcompany?.CompanyId,
      });
      if (!fetchallprojects) {
        res.status(StatusCodes?.NOT_FOUND);
        throw new Error("project not found");
      }

      return res.status(StatusCodes.OK).json({
        message: "fetch all projects successfully",
        projectdata: fetchallprojects,
        success: true,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  fetchsingleproject: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = Projectctr;
