const asyncHandler = require("express-async-handler");
const Project = require("../../Modals/ProjectSchema");
const Company = require("../../Modals/CompanySchema");
const User = require("../../Modals/userSchema");
const TimeSheet = require("../../Modals/TimeSheetModel");

const {StatusCodes} = require("http-status-codes");
const Employee = require("../../Modals/EmployeeSchema");

const chartscontroller = {
  ProjectCharts: asyncHandler(async (req, res) => {
    try {
      console.log("userdd", req.user);
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }
      console.log(user?.user_id, "userid");
      const company = await Company.findOne({UserId: user?.user_id});
      console.log(company, "company");
      if (!company) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }
      //
      const recentProjects = await Project.find({ CompanyId: company?.Company_Id })
        .sort({ createdAt: -1 }) // Sort by creation date descending
        .limit(10);


      //we need only names of project and it's start date and end date
      const projectNames = recentProjects?.map((project) => {
        return {
          id: project?.ProjectId,
          Project_Name: project?.Project_Name,
          Start_Date: project?.Start_Date,
          End_Date: project?.End_Date,
        };
      });
      return res.status(StatusCodes.OK).json({success: true, projectNames});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  EmployeeTimeHours: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }
      //   console.log(user?.user_id, "userid");
      const company = await Company.findOne({UserId: user?.user_id});
      //   console.log(company, "company");
      if (!company) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }
      const timesheet = await TimeSheet.find({ CompanId: company?.Company_Id});
      const empName = async (EmployeeId) => {
        if (!EmployeeId) return null; // Handle case where id is not provided
        const emp = await Employee.findOne({ EmployeeId }); // Query by the custom `id` field
        return emp ? `${emp.FirstName} ${emp.LastName}` : null; // Return the name if employee is found
      };

      const timesheetData = await Promise.all(
        timesheet?.map(async (sheet) => {
          const resourceName = await empName(sheet?.EmployeeId); // Ensure `sheet.resource` corresponds to your custom `id`
          return {
            id: sheet?.EmployeeId,
            resource: resourceName,
            hours: sheet?.hours,
            day: sheet?.day,
          };
        })
      );

      return res.status(StatusCodes.OK).json({success: true, timesheetData});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};
module.exports = chartscontroller;
