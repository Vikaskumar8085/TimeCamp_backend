const asyncHandler = require("express-async-handler");
const Project = require("../../../Modals/ProjectSchema");
const Company = require("../../../Modals/CompanySchema");
const User = require("../../../Modals/userSchema");
const TimeSheet = require("../../../Modals/TimeSheetModel");
const { StatusCodes } = require("http-status-codes");
const Employee = require("../../../Modals/EmployeeSchema");

const ProductivityLeaderBoard = {
  ProductivityChart: asyncHandler(async (req, res) => {
    try {
      // console.log("userdd", req.user);
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unauthorized User. Please Sign up.");
      }
      //company
      const company = await Company.findOne({ UserId: user?.user_id });

      if (!company) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(
          "Company does not exist. Please create a company first."
        );
      }

      const employees = await Employee.find({
        CompanyId: company?.Company_Id,
      });
      const timesheetData = await TimeSheet.find({
        CompanId: company?.Company_Id,
      });
      console.log(timesheetData, "timesheetData");
      // Construct the productivity data
      const result = await Promise.all(
        employees.map(async (employee) => {
          if (!employee.EmployeeId) {
            return null;
          }

          // Convert employee.id to a number for comparison with resource in timesheets
          const employeeId = Number(employee.EmployeeId);

          // Filter timesheets where the resource matches the employee ID
          const employeeTimesheets = timesheetData.filter(
            (sheet) => Number(sheet.EmployeeId) === employeeId
          );
          console.log(employeeTimesheets, "employeeTimesheets");
          const total_working_days = 262;
          const total_employee_working_days = 0;
          const billed_hours = employeeTimesheets.reduce(
            (acc, sheet) => acc + (sheet.billed_hours || 0),
            0
          );
          const total_hours = employeeTimesheets.reduce(
            (acc, sheet) => acc + (sheet.hours || 0),
            0
          );
          const timesheet_entries = employeeTimesheets.length;
          const ok_hours = employeeTimesheets.reduce(
            (acc, sheet) => acc + (sheet.ok_hours || 0),
            0
          );
          const blank_hours = employeeTimesheets.reduce(
            (acc, sheet) => acc + (sheet.blank_hours || 0),
            0
          );

          const productivity = total_hours > 0
            ? +(billed_hours / total_hours * 100).toFixed(2)
            : 0;


          return {
            resource: {
              id: employee.EmployeeId.toString(),
              name: `${employee.FirstName} ${employee.LastName}`,
              resource_type: employee.Role,
            },
            total_working_days,
            total_employee_working_days,
            billed_hours,
            total_hours,
            timesheet_entries,
            ok_hours,
            blank_hours,
            productivity,
          };
        })
      );

      // Filter out null results (in case some employees were skipped)
      const filteredResult = result.filter((item) => item !== null);

      return res.status(StatusCodes.OK).json(filteredResult);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      throw new Error(error?.message);
    }
  }),
};

module.exports = ProductivityLeaderBoard;
