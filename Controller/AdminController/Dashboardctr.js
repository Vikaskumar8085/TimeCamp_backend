const asyncHandler = require("express-async-handler");
const {StatusCodes} = require("http-status-codes");
const Client = require("../../Modals/ClientRegistrationModel");
const Company = require("../../Modals/CompanySchema");
const User = require("../../Modals/userSchema");
const Project = require("../../Modals/ProjectSchema");
const Employee = require("../../Modals/EmployeeSchema");

const dashboardController = {
  dashboardconterCtr: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);

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

      //   total clients lists
      const clientlist = await Client.find({
        Common_Id: checkcompany?.Company_Id,
      }).countDocuments();

      // total project lists
      const projectlist = await Project.find({
        CompanyId: checkcompany?.Company_Id,
      }).countDocuments();
      // total employees list
      const employeelists = await Employee.find({
        CompanyId: checkcompany?.Company_Id,
      }).countDocuments();

      const result = {
        totalclient: clientlist,
        totalproject: projectlist,
        totalemployee: employeelists,
      };

      return res.status(StatusCodes.OK).json({success: true, result: result});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = dashboardController;
