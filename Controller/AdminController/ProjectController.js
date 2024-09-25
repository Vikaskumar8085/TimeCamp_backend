const asyncHandler = require("express-async-handler");
const {StatusCodes} = require("http-status-codes");
const Company = require("../../Modals/CompanySchema");
const Project = require("../../Modals/ProjectSchema");
const User = require("../../Modals/userSchema");

// project controller
const projectController = {
  // create
  createproject: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.uesr);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un authorized user Please Signup");
      }
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("company does not exists please create your company");
      }
      const addProject = await Project(req.body);
      if (addProject) {
        await addProject.save();
        return res.status(200).json(addProject);
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
      const checkcompany = await Company.findOne({UserId: user?.user_id});
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
