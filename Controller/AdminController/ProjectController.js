const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const Company = require("../../Modals/CompanySchema");
const Project = require("../../Modals/ProjectSchema");
const User = require("../../Modals/userSchema");

// project controller
const projectController = {
  // create
  createproject: asyncHandler(async (req, res) => {
    try {
      const {
        ProjectId,
        Project_Code,
        Project_Name,
        Start_Date,
        End_Date,
        client,
        Project_Type,
        Project_Managers,
        Project_Status,
        RoleResource,
        Project_Manager,
      } = req.body;
      console.log(req.user);
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un authorized user Please Signup");
      }
      // console.log(user);
      // check company
      const checkcompany = await Company.findOne({ UserId: user?.user_id });

      if (!checkcompany) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("company does not exists please create your company");
      }
      console.log(checkcompany);
      const newProject = await Project({
        CompanyId: checkcompany?.Company_Id,
        ProjectId,
        Project_Code,
        Project_Name,
        Start_Date: Start_Date || moment().format("DD/MM/YYYY"),
        End_Date: End_Date || moment().format("DD/MM/YYYY"),
        client,
        Project_Type,
        Project_Managers,
        Project_Status: Project_Status || "InActive",
        RoleResource,
        Project_Manager,
      });

      const saveproject = await newProject.save();

      if (saveproject) {
        return res
          .status(200)
          .json({ success: true, message: "projcect added successfully" });
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // get project
  fetchproject: asyncHandler(async (req, res) => {
    try {
      // user
      const user = await User.findById(req.uesr);
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

      const getallprojects = await Project.find({
        CompanyId: checkcompany?.Company_Id,
      });
      if (!getallprojects) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("project not found");
      }
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "fetch all projects",
        result: getallprojects,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // remove project

  removeproject: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  editproject: asyncHandler(async (req, res) => {
    try {
    } catch (error) {}
  }),

  sigleproject: asyncHandler(async (req, res) => {
    try {
    } catch (error) {}
  }),
};

module.exports = projectController;
