const asyncHandler = require("express-async-handler");
const User = require("../../Modals/userSchema");
const { StatusCodes } = require("http-status-codes");
const Project = require("../../Modals/ProjectSchema");
const Employee = require("../../Modals/EmployeeSchema");

const employeeProjectCtr = {
  // fetch all employee Projects
  fetchemployeeproject: asyncHandler(async (req, res) => {
    try {
      // const user = await User.findById(req.user);
      // if (!user) {
      //   res.status(StatusCodes.UNAUTHORIZED);
      //   throw new Error("Un Authorized User Please sign up");
      // }

      const checkemployee = await Employee.findOne({EmployeeId:10});
      if (!checkemployee) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Not found Employee");
      }


      const projects = await Project.find({
        "RoleResource.RRId": checkemployee?.EmployeeId,
      })
        .lean()
        .exec();
      if (!projects) {
        res.status(StatusCodes.OK);
        throw new Error("projects Not found");
      }
      return res.status(StatusCodes.OK).json({ success: true, data: projects });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // get all employee projects by employee id
  fetchsingleemployeeprojects: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User Please sign up");
      }

      const checkemployee = await Employee.findOne({ UserId: user?.user_id });
      if (!checkemployee) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Not found Employee");
      }

      const fetchsingleprojects = await Project.findById({
        ProjectId: id,
      })
        .lean()
        .exec();
      if (!fetchsingleprojects) {
        res.status(StatusCodes.OK);
        throw new Error("projects Not found");
      }
      return res
        .status(StatusCodes.OK)
        .json({ success: true, result: fetchsingleprojects });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // get active employee projects

  employeeactiveprojects: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User Please sign up");
      }

      const checkemployee = await Employee.findOne({ UserId: user?.user_id });
      if (!checkemployee) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Not found Employee");
      }

      const projects = await Project.find({
        "RoleResource.RRId": checkemployee?.EmployeeId,
        Project_Status: "Active",
      })
        .lean()
        .exec();
      if (!projects) {
        res.status(StatusCodes.OK);
        throw new Error("projects Not found");
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // employee fill timesheets projects
  employeefilltimesheets: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User Please sign up");
      }

      const checkemployee = await Employee.findOne({ UserId: user?.user_id });
      if (!checkemployee) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Not found Employee");
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // get single timesheets

  employeesingletimesheetsdetails: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User Please sign up");
      }

      const checkemployee = await Employee.findOne({ UserId: user?.user_id });
      if (!checkemployee) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Not found Employee");
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // approved multiple status
  approvedmultiplestatus: asyncHandler(async (req, res) => {
    const { ids, status } = req.body;

    // Validate input
    if (!Array.isArray(ids) || !status) {
      return res.status(400).json({ message: "Invalid input" });
    }

    try {
      // Update the approval status for multiple timesheets
      const result = await TimeSheet.updateMany(
        { _id: { $in: ids } },
        { $set: { approval_status: status } }
      );

      // Check if any documents were modified
      if (result.nModified === 0) {
        return res
          .status(404)
          .json({ message: "No timesheets found with the given IDs." });
      }

      res
        .status(200)
        .json({ message: "Approval status updated successfully", result });
    } catch (error) {
      console.error("Error updating approval status:", error);
      throw new Error(error?.message);
    }
  }),

  // disapprovedmultiplestatus

  disapprovedmultiplestatus: asyncHandler(async (req, res) => {
    const { ids, status } = req.body;

    // Validate input
    if (!Array.isArray(ids) || !status) {
      return res.status(400).json({ message: "Invalid input" });
    }

    try {
      // Update the approval status for multiple timesheets
      const result = await TimeSheet.updateMany(
        { _id: { $in: ids } },
        { $set: { approval_status: status } }
      );

      // Check if any documents were modified
      if (result.nModified === 0) {
        return res
          .status(404)
          .json({ message: "No timesheets found with the given IDs." });
      }

      res
        .status(200)
        .json({ message: "Approval status updated successfully", result });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = employeeProjectCtr;
// // API to get employee or manager projects
// app.get("/api/employee/:employeeId/projects", async (req, res) => {
//   try {
//     const employeeId = parseInt(req.params.employeeId);

//     // Check if the employee exists
//     const employee = await Employee.findOne({ EmployeeId: employeeId });

//     if (!employee) {
//       return res.status(404).json({ error: "Employee not found" });
//     }

//     // Check if the employee is an employee or a manager
//     const isEmployee = employee.Role.includes("Employee");
//     const isManager = employee.Role.includes("Manager");

//     if (!isEmployee && !isManager) {
//       return res.status(403).json({ error: "Access denied: Not an employee or manager" });
//     }

//     const projects = [];

//     // If the employee is a manager, fetch projects managed by them
//     if (isManager) {
//       const managedProjects = await Project.aggregate([
//         {
//           $match: { "Project_Manager.PId": employeeId },
//         },
//         {
//           $lookup: {
//             from: "employees",
//             localField: "Project_Manager.PId",
//             foreignField: "EmployeeId",
//             as: "ProjectManagerDetails",
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//             ProjectId: 1,
//             Project_Name: 1,
//             Project_Code: 1,
//             Project_Status: 1,
//             ProjectManager: {
//               $arrayElemAt: ["$ProjectManagerDetails", 0],
//             },
//           },
//         },
//       ]);
//       projects.push(...managedProjects);
//     }

//     // If the employee is an employee (not manager), fetch projects they are involved in
//     if (isEmployee) {
//       const involvedProjects = await Project.aggregate([
//         {
//           $match: { "RoleResource.RRemployee": employeeId },
//         },
//         {
//           $lookup: {
//             from: "employees",
//             localField: "Project_Manager.PId",
//             foreignField: "EmployeeId",
//             as: "ProjectManagerDetails",
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//             ProjectId: 1,
//             Project_Name: 1,
//             Project_Code: 1,
//             Project_Status: 1,
//             ProjectManager: {
//               $arrayElemAt: ["$ProjectManagerDetails", 0],
//             },
//           },
//         },
//       ]);
//       projects.push(...involvedProjects);
//     }

//     return res.json({ projects });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
