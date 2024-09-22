// const AsyncHandler = require("express-async-handler");
// const Project = require("../../Modals/ProjectModel");
// const moment = require("moment");
// const paginate = require("../../Utils/pagination");
// // Add Project Controller

// const CreateProjectCtr = AsyncHandler(async (req, res) => {
//   try {
//     // Validate incoming data
//     const {
//       Project_Name,
//       Project_Code,
//       Client_Name,
//       Start_Date,
//       End_Date,
//       Project_Type,
//       Project_Managers,
//       Role,
//       Employee,
//     } = req.body;

//     if (
//       !Project_Name ||
//       !Project_Code ||
//       !Client_Name ||
//       !Start_Date ||
//       !End_Date ||
//       !Project_Type ||
//       !Project_Managers ||
//       !Role ||
//       !Employee
//     ) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     // Create and save the new project
//     const newProject = new Project({
//       Project_Name,
//       Project_Code,
//       Client_Name,
//       Start_Date: moment(Start_Date, "DD/MM/YYYY").format("YYYY-MM-DD"),
//       End_Date: moment(End_Date, "DD/MM/YYYY").format("YYYY-MM-DD"),
//       Project_Type,
//       Project_Managers,
//       Role,
//       Employee,
//     });
//     await RoleResource({
//       RoleType: req.body.RoleType,
//       Employee_Id: req.body.EmployeeId,
//     }).save();

//     const savedProject = await newProject.save();
//     const roleProject = new RoleResource({});
//     if (!savedProject) {
//     }
//     res.status(201).json({ message: "Project Added successfully" });
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// });

// const UpdateProjectCtr = AsyncHandler(async (req, res) => {
//   try {
//     const projectId = req.params.id;
//     const updateData = req.body;

//     // Validate incoming data
//     if (
//       !updateData.Project_Name ||
//       !updateData.Project_Code ||
//       !updateData.Client_Name ||
//       !updateData.Start_Date ||
//       !updateData.End_Date ||
//       !updateData.Project_Type ||
//       !updateData.Project_Managers ||
//       !updateData.Role ||
//       !updateData.Employee
//     ) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     // Find and update the project
//     const updatedProject = await Project.findOneAndUpdate(
//       { Project_Id: projectId },
//       {
//         $set: {
//           ...updateData,
//           Start_Date: moment(updateData.Start_Date, "DD/MM/YYYY").format(
//             "YYYY-MM-DD"
//           ),
//           End_Date: moment(updateData.End_Date, "DD/MM/YYYY").format(
//             "YYYY-MM-DD"
//           ),
//         },
//       },
//       { new: true } // Return the updated document
//     );

//     if (!updatedProject) {
//       return res.status(404).json({ error: "Project not found." });
//     }

//     res.status(200).json(updatedProject);
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// });

// // Get All Projects

// const GetallProjectCtr = AsyncHandler(async (req, res) => {
//   try {
//     const { page } = req.query;
//     const { query, pagination } = paginate(Project, page, 10);
//     const projects = await query.lean().exec();
//     res.status(200).json(projects);
//   } catch (error) {
//     console.error("Error retrieving projects:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while retrieving projects." });
//   }
// });

// // Remove Projects

// const RemoveProjectsCtr = AsyncHandler(async (req, res) => {
//   try {
//     const projectId = req.params.id;
//     const result = await Project.deleteOne({ Project_Id: projectId });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ error: "Project not found." });
//     }

//     res.status(200).json({ message: "Project deleted successfully." });
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// });

// // Active Project

// const ActiveProjectsCtr = AsyncHandler(async (req, res) => {
//   try {
//     const GetActiveProject = await Project.findOne({ Project_Status: "Active" })
//       .lean()
//       .exec();

//     if (!GetActiveProject) {
//       res.status(400);
//       throw new Error("Bad request");
//     }
//     return res.status(200).json({ message: GetActiveProject, success: true });
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// });

// const InActiveProjectsCtr = AsyncHandler(async (req, res) => {
//   try {
//     const getInActiveProject = await Project.findOne({
//       Project_Status: "InActive",
//     })
//       .lean()
//       .exec();

//     if (!getInActiveProject) {
//       res.status(400);
//       throw new Error("Bad request");
//     }
//     return res.status(200).json({ message: getInActiveProject, success: true });
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// });

// // change Project status

// const updateProjectStatusCtr = AsyncHandler(async (req, res) => {
//   try {
//     const updateprojectstatus = await Project.findByIdAndUpdate(
//       { _id: req.parmas.id },
//       req.body,
//       {
//         new: true,
//         runValidator: true,
//       }
//     );
//     if (!updateprojectstatus) {
//       res.status(400);
//       throw new Error("Bad request");
//     }
//     return res
//       .status(200)
//       .json({ message: "project status updated succesfully", success: true });
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// });

// module.exports = {
//   CreateProjectCtr,
//   UpdateProjectCtr,
//   GetallProjectCtr,
//   RemoveProjectsCtr,
//   InActiveProjectsCtr,
//   ActiveProjectsCtr,
//   updateProjectStatusCtr,
// };
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const Company = require("../../Modals/CompanySchema");
const Project = require("../../Modals/ProjectSchema");
const User = require("../../Modals/userSchema");
const projectController = {
  // create
  createproject: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.uesr);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un authorized user Please Signup");
      }

      const checkcompany = await Company.findOne({ UserId: user?.user_id });
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
    } catch (error) {}
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
