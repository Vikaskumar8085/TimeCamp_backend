const AsyncHandler = require("express-async-handler");
const Project = require("../../Modals/ProjectModel");
const moment = require("moment");

// Add Project Controller

const CreateProjectCtr = AsyncHandler(async (req, res) => {
  try {
    // Validate incoming data
    const {
      Project_Name,
      Project_Code,
      Client_Name,
      Start_Date,
      End_Date,
      Project_Type,
      Project_Managers,
      Role,
      Employee,
    } = req.body;

    if (
      !Project_Name ||
      !Project_Code ||
      !Client_Name ||
      !Start_Date ||
      !End_Date ||
      !Project_Type ||
      !Project_Managers ||
      !Role ||
      !Employee
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create and save the new project
    const newProject = new Project({
      Project_Name,
      Project_Code,
      Client_Name,
      Start_Date: moment(Start_Date, "DD/MM/YYYY").format("YYYY-MM-DD"),
      End_Date: moment(End_Date, "DD/MM/YYYY").format("YYYY-MM-DD"),
      Project_Type,
      Project_Managers,
      Role,
      Employee,
    });

    const savedProject = await newProject.save();
    res.status(201).json({ message: "Project Added successfully" });
  } catch (error) {
    throw new Error(error?.message);
  }
});

const UpdateProjectCtr = AsyncHandler(async (req, res) => {
  try {
    const projectId = req.params.id;
    const updateData = req.body;

    // Validate incoming data
    if (
      !updateData.Project_Name ||
      !updateData.Project_Code ||
      !updateData.Client_Name ||
      !updateData.Start_Date ||
      !updateData.End_Date ||
      !updateData.Project_Type ||
      !updateData.Project_Managers ||
      !updateData.Role ||
      !updateData.Employee
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Find and update the project
    const updatedProject = await Project.findOneAndUpdate(
      { Project_Id: projectId },
      {
        $set: {
          ...updateData,
          Start_Date: moment(updateData.Start_Date, "DD/MM/YYYY").format(
            "YYYY-MM-DD"
          ),
          End_Date: moment(updateData.End_Date, "DD/MM/YYYY").format(
            "YYYY-MM-DD"
          ),
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found." });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    throw new Error(error?.message);
  }
});

// Get All Projects

const GetallProjectCtr = AsyncHandler(async (req, res) => {
  try {
    const projects = await Project.find().lean();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error retrieving projects:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving projects." });
  }
});

// Remove Projects

const RemoveProjectsCtr = AsyncHandler(async (req, res) => {
  try {
    const projectId = req.params.id;
    const result = await Project.deleteOne({ Project_Id: projectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Project not found." });
    }

    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    throw new Error(error?.message);
  }
});

module.exports = {
  CreateProjectCtr,
  UpdateProjectCtr,
  GetallProjectCtr,
  RemoveProjectsCtr,
};
