const asyncHandler = require("express-async-handler");
const Project = require("../../Modals/ProjectSchema");
const User = require("../../Modals/userSchema");
const Company = require("../../Modals/CompanySchema");
const Employee = require("../../Modals/EmployeeRegistrationModel");

const Projectctr = {
  createproject: asyncHandler(async (req, res) => {
    console.log("project");
    try {
      const response = await Project(req.body);
      if (response) {
        await response.save();
      }
      return res.status(200).json(response);
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
        "RoleResource.Employee_Id": 1,
      });

      return res.status(200).json({ data: projects });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = Projectctr;
