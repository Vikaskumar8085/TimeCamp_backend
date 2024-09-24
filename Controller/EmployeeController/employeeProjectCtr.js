const asyncHandler = require("express-async-handler");
const User = require("../../Modals/userSchema");
const {StatusCodes} = require("http-status-codes");
const Project = require("../../Modals/ProjectSchema");
const Employee = require("../../Modals/EmployeeSchema");

const employeeProjectCtr = {
  // fetch all employee Projects
  fetchemployeeproject: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User Please sign up");
      }

      const checkemployee = await Employee.findOne({UserId: user?.user_id});
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
      return res.status(StatusCodes.OK).json({success: true, data: projects});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // get all employee projects by employee id
  fetchsingleemployeeprojects: asyncHandler(async (req, res) => {
    try {
      const {id} = req.params;
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User Please sign up");
      }

      const checkemployee = await Employee.findOne({UserId: user?.user_id});
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
        .json({success: true, result: fetchsingleprojects});
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

      const checkemployee = await Employee.findOne({UserId: user?.user_id});
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

      const checkemployee = await Employee.findOne({UserId: user?.user_id});
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

      const checkemployee = await Employee.findOne({UserId: user?.user_id});
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
    const {ids, status} = req.body;

    // Validate input
    if (!Array.isArray(ids) || !status) {
      return res.status(400).json({message: "Invalid input"});
    }

    try {
      // Update the approval status for multiple timesheets
      const result = await TimeSheet.updateMany(
        {_id: {$in: ids}},
        {$set: {approval_status: status}}
      );

      // Check if any documents were modified
      if (result.nModified === 0) {
        return res
          .status(404)
          .json({message: "No timesheets found with the given IDs."});
      }

      res
        .status(200)
        .json({message: "Approval status updated successfully", result});
    } catch (error) {
      console.error("Error updating approval status:", error);
      throw new Error(error?.message);
    }
  }),

  // disapprovedmultiplestatus

  disapprovedmultiplestatus: asyncHandler(async (req, res) => {
    const {ids, status} = req.body;

    // Validate input
    if (!Array.isArray(ids) || !status) {
      return res.status(400).json({message: "Invalid input"});
    }

    try {
      // Update the approval status for multiple timesheets
      const result = await TimeSheet.updateMany(
        {_id: {$in: ids}},
        {$set: {approval_status: status}}
      );

      // Check if any documents were modified
      if (result.nModified === 0) {
        return res
          .status(404)
          .json({message: "No timesheets found with the given IDs."});
      }

      res
        .status(200)
        .json({message: "Approval status updated successfully", result});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = employeeProjectCtr;

// // Function to get active projects by specific EmployeeId and RRId
// async function getActiveProjectsByEmployeeAndRR(employeeId, rrId) {
//   try {
//     const activeProjects = await Project.aggregate([
//       {
//         $match: { Project_Status: "Active" } // Match active projects
//       },
//       {
//         $lookup: {
//           from: "employees", // Name of the employees collection
//           localField: "CompanyId", // Field from the projects collection
//           foreignField: "CompanyId", // Field from the employees collection
//           as: "employees" // Resulting array
//         }
//       },
//       {
//         $unwind: {
//           path: "$employees",
//           preserveNullAndEmptyArrays: true // Keep projects without employees
//         }
//       },
//       {
//         $match: {
//           "employees.Status": "Active", // Match active employees
//           "employees.EmployeeId": employeeId // Filter by EmployeeId
//         }
//       },
//       {
//         $unwind: {
//           path: "$RoleResource",
//           preserveNullAndEmptyArrays: true // Keep projects without role resources
//         }
//       },
//       {
//         $match: {
//           "RoleResource.RRId": rrId // Filter by RRId
//         }
//       },
//       {
//         $group: {
//           _id: "$_id",
//           ProjectId: { $first: "$ProjectId" },
//           Project_Name: { $first: "$Project_Name" },
//           Project_Code: { $first: "$Project_Code" },
//           RoleResource: { $push: "$RoleResource" }, // Aggregate RoleResources
//           employees: { $push: "$employees" } // Include employees info
//         }
//       }
//     ]).exec();

//     return activeProjects;
//   } catch (error) {
//     console.error("Error fetching active projects by employee and RR:", error);
//     throw error;
//   }
// }

// module.exports = { Employee, Project, getActiveProjectsByEmployeeAndRR, getActiveEmployees };
