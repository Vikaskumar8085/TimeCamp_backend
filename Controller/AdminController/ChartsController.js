const asyncHandler = require("express-async-handler");
const Project = require("../../Modals/ProjectSchema");
const Company = require("../../Modals/CompanySchema");
const User = require("../../Modals/userSchema");
const TimeSheet = require("../../Modals/TimeSheetModel");

const { StatusCodes } = require("http-status-codes");
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
      const company = await Company.findOne({ UserId: user?.user_id });
      console.log(company, "company");
      if (!company) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }
      //
      const project = await Project.find({ Company_Id: company?.Company_Id });

      const recentProjects = project?.slice(0, 10);

      //we need only names of project and it's start date and end date
      const projectNames = recentProjects?.map((project) => {
        return {
          id: project?.Project_Id,
          Project_Name: project?.Project_Name,
          Start_Date: project?.Start_Date,
          End_Date: project?.End_Date,
        };
      });
      return res.status(StatusCodes.OK).json({ success: true, projectNames });
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
      const company = await Company.findOne({ UserId: user?.user_id });
      //   console.log(company, "company");
      if (!company) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }
      const timesheet = await TimeSheet.find({ company: company?.Company_Id });
      const empName = async (id) => {
        if (!id) return null; // Handle case where id is not provided
        const emp = await Employee.findOne({ id }); // Query by the custom `id` field
        return emp ? `${emp.first_name} ${emp.last_name}` : null; // Return the name if employee is found
      };

      const timesheetData = await Promise.all(
        timesheet?.map(async (sheet) => {
          const resourceName = await empName(sheet?.resource); // Ensure `sheet.resource` corresponds to your custom `id`
          return {
            id: sheet?.id,
            resource: resourceName,
            hours: sheet?.hours,
            day: sheet?.day,
          };
        })
      );

      return res.status(StatusCodes.OK).json({ success: true, timesheetData });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};
module.exports = chartscontroller;
