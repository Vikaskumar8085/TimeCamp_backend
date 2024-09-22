const asyncHandler = require("express-async-handler");
const Project = require("../../../Modals/ProjectSchema");
const Company = require("../../../Modals/CompanySchema");
const User = require("../../../Modals/userSchema");
const TimeSheet = require("../../../Modals/TimeSheetModel");
const { StatusCodes } = require("http-status-codes");
const Employee = require("../../../Modals/EmployeeSchema");

const TimeSummary = {
    TotalHoursByResource: asyncHandler(async (req, res) => {
        try {
            console.log("userdd", req.user);
            const user = await User.findById(req.user);
            if (!user) {
                res.status(StatusCodes.UNAUTHORIZED);
                throw new Error("Unauthorized User. Please Sign up.");
            }


            const company = await Company.findOne({ UserId: user?.user_id });

            if (!company) {
                res.status(StatusCodes.BAD_REQUEST);
                throw new Error("Company does not exist. Please create a company first.");
            }
            Employees = await Employee.find({ company_name: company?.Company_Id });
            TimeSheetData = await TimeSheet.find({ company: company?.Company_Id });

            const result = await Promise.all(Employees.map(async (employee) => {
                if (!employee.id) {
                    return null;
                }

                const employeeId = Number(employee.id);

                const employeeTimesheets = TimeSheetData.filter(sheet => Number(sheet.resource) === employeeId);
                const total_hours = employeeTimesheets.reduce((acc, sheet) => acc + (sheet.hours || 0), 0);
                const billed_hours = employeeTimesheets.reduce((acc, sheet) => acc + (sheet.billed_hours || 0), 0);
                return {
                    resource: {
                        id: employee.id.toString(),
                        name: `${employee.first_name} ${employee.last_name}`,
                        resource_type: employee.role,
                    },
                    total_hours,
                    billed_hours,
                };
            }
            ));
            return res.status(StatusCodes.OK).json({ success: true, result });

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            throw new Error(error?.message);
        }
    }),
    HoursByProject: asyncHandler(async (req, res) => {
        try {
            console.log("userdd", req.user);
            const user = await User.findById(req.user);
            if (!user) {
                res.status(StatusCodes.UNAUTHORIZED);
                throw new Error("Unauthorized User. Please Sign up.");
            }


            const company = await Company.findOne({ UserId: user?.user_id });

            if (!company) {
                res.status(StatusCodes.BAD_REQUEST);
                throw new Error("Company does not exist. Please create a company first.");
            }
            const projects = await Project.find({ Company_Id: company?.Company_Id });
            const timesheets = await TimeSheet.find({ company: company?.Company_Id });
            console.log(projects, "projects");
            
            const projectNames = await Promise.all(projects.map(async (project) => {
                const projectTimesheets = timesheets.filter(sheet => sheet.project === project?.Project_Id);
                const totalHours = projectTimesheets.reduce((acc, sheet) => acc + (sheet.hours || 0), 0);
                const billedHours = projectTimesheets.reduce((acc, sheet) => acc + (sheet.billed_hours || 0), 0);
                return {
                    id: project?.Project_Id,
                    Project_Name: project?.Project_Name,
                    Start_Date: project?.Start_Date,
                    End_Date: project?.End_Date,
                    totalHours,
                    billedHours,
                };
            }
            ));
            return res.status(StatusCodes.OK).json({ success: true, projectNames });

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            throw new Error(error?.message);
        }
    }),
    HoursByCompany: asyncHandler(async (req, res) => {
        try {
            console.log("userdd", req.user);
            const user = await User.findById(req.user);
            if (!user) {
                res.status(StatusCodes.UNAUTHORIZED);
                throw new Error("Unauthorized User. Please Sign up.");
            }


            const company = await Company.findOne({ UserId: user?.user_id });

            if (!company) {
                res.status(StatusCodes.BAD_REQUEST);
                throw new Error("Company does not exist. Please create a company first.");
            }
            const timesheets = await TimeSheet.find({ company: company?.Company_Id });
            const totalHours = timesheets.reduce((acc, sheet) => acc + (sheet.hours || 0), 0);
            const billedHours = timesheets.reduce((acc, sheet) => acc + (sheet.billed_hours || 0), 0);
            const ok_hours = timesheets.reduce((acc, sheet) => acc + (sheet.ok_hours || 0), 0);
            const blank_hours = timesheets.reduce((acc, sheet) => acc + (sheet.blank_hours || 0), 0);  

            return res.status(StatusCodes.OK).json({ success: true, company: company?.Company_Name, totalHours, billedHours, ok_hours, blank_hours });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            throw new Error(error?.message);
        }
    }),
   
    ProjectTimeUtilization: asyncHandler(async (req, res) => {  
        try {
            console.log("userdd", req.user);
            const user = await User.findById(req.user);
            if (!user) {
                res.status(StatusCodes.UNAUTHORIZED);
                throw new Error("Unauthorized User. Please Sign up.");
            }


            const company = await Company.findOne({ UserId: user?.user_id });

            if (!company) {
                res.status(StatusCodes.BAD_REQUEST);
                throw new Error("Company does not exist. Please create a company first.");
            }
            const projects = await Project.find({ Company_Id: company?.Company_Id });
            const timesheets = await TimeSheet.find({ company: company?.Company_Id });
            console.log(projects, "projects");
            const projectNames = await Promise.all(projects.map(async (project) => {
                const projectTimesheets = timesheets.filter(sheet => sheet.project === project?.Project_Id);
                const totalHours = projectTimesheets.reduce((acc, sheet) => acc + (sheet.hours || 0), 0);
                const billedHours = projectTimesheets.reduce((acc, sheet) => acc + (sheet.billed_hours || 0), 0);
                const ok_hours = projectTimesheets.reduce((acc, sheet) => acc + (sheet.ok_hours || 0), 0);
                const blank_hours = projectTimesheets.reduce((acc, sheet) => acc + (sheet.blank_hours || 0), 0);
                const productivity = totalHours > 0 ? Math.round((billedHours / totalHours) * 100 * 100) / 100 : 0;
                return {
                    id: project?.Project_Id,
                    Project_Name: project?.Project_Name,
                    Start_Date: project?.Start_Date,
                    End_Date: project?.End_Date,
                    totalHours,
                    billedHours,
                    ok_hours,
                    blank_hours,
                    productivity,
                };
            }
            ));
            return res.status(StatusCodes.OK).json({ success: true, projectNames });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            throw new Error(error?.message);
        }
    })
};

module.exports = TimeSummary;
