const asyncHandler = require("express-async-handler");
const {StatusCodes} = require("http-status-codes");
const xlsx = require("xlsx");
const fs = require("fs");
const csv = require("csv-parser");
const Task = require("../../Modals/TaskSchema/TaskSchema");

const Taskcontroller = {
  // create task

  createtaskctr: asyncHandler(async (req, res) => {
    try {
      const task = await Task(req.body);
      if (!task) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Task Not found");
      }
      await task.save();

      return res.status(StatusCodes.CREATED).json({mssage: "Task Createted"});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // get all tasks

  fetchtaskctr: asyncHandler(async (req, res) => {
    try {
      const tasks = await Task.find()
        .populate("Project")
        .populate("Milestone_Name");
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({message: "Error fetching tasks"});
    }
  }),

  // upload excel file

  uploadexceltaskctr: asyncHandler(async (req, res) => {
    try {
      const file = req.file;
      const workbook = xlsx.readFile(file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const tasks = xlsx.utils.sheet_to_json(worksheet);
      Task.insertMany(tasks, (error) => {
        if (error) {
          return res.status(500).json({message: "Error uploading Excel file"});
        }
        res.status(201).json({message: "Excel file uploaded successfully"});
      });
    } catch (error) {
      res.status(500).json({message: "Error uploading Excel file"});
    }
  }),

  // upload csv file

  uploadCsvtaskctr: asyncHandler(async (req, res) => {
    try {
      const file = req.file;
      const csvData = [];
      fs.createReadStream(file.path)
        .pipe(csv())
        .on("data", (data) => csvData.push(data))
        .on("end", () => {
          const tasks = csvData.map((data) => {
            return {
              Task_Name: data.Task_Name,
              Project: data.Project,
              Project_Code: data.Project_Code,
              Milestone_Name: data.Milestone_Name,
              Priority: data.Priority,
              StartDate: data.StartDate,
              EndDate: data.EndDate,
              Status: data.Status,
              Estimated_Time: data.Estimated_Time,
              Due_date: data.Due_date,
              Completed_time: data.Completed_time,
              Resource_Email: data.Resource_Email,
              Task_description: data.Task_description,
            };
          });
          Task.insertMany(tasks, (error) => {
            if (error) {
              return res
                .status(500)
                .json({message: "Error uploading CSV file"});
            }
            res.status(201).json({message: "CSV file uploaded successfully"});
          });
        });
    } catch (error) {
      res.status(500).json({message: "Error uploading CSV file"});
    }
  }),

  // download csv file

  downloadCsvtaskctr: asyncHandler(async (req, res) => {
    try {
      const tasks = await Task.find();
      const csvData = tasks.map((task) => {
        return {
          Task_Name: task.Task_Name,
          Project: task.Project,
          Project_Code: task.Project_Code,
          Milestone_Name: task.Milestone_Name,
          Priority: task.Priority,
          StartDate: task.StartDate,
          EndDate: task.EndDate,
          Status: task.Status,
          Estimated_Time: task.Estimated_Time,
          Due_date: task.Due_date,
          Completed_time: task.Completed_time,
          Resource_Email: task.Resource_Email,
          Task_description: task.Task_description,
        };
      });
      const csv = csvData
        .map((data) => Object.values(data).join(","))
        .join("\n");
      res.header("Content-Type", "text/csv");
      res.attachment("tasks.csv");
      res.send(csv);
    } catch (error) {
      res.status(500).json({message: "Error downloading CSV file"});
    }
  }),

  // download Excel file

  downloadExceltaskCtr: asyncHandler(async (req, res) => {
    try {
      const tasks = await Task.find();
      const excelData = tasks.map((task) => {
        return {
          Task_Name: task.Task_Name,
          Project: task.Project,
          Project_Code: task.Project_Code,
          Milestone_Name: task.Milestone_Name,
          Priority: task.Priority,
          StartDate: task.StartDate,
          EndDate: task.EndDate,
          Status: task.Status,
          Estimated_Time: task.Estimated_Time,
          Due_date: task.Due_date,
          Completed_time: task.Completed_time,
          Resource_Email: task.Resource_Email,
          Task_description: task.Task_description,
        };
      });
      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(excelData);
      xlsx.utils.book_append_sheet(workbook, worksheet, "Tasks");
      const excelBuffer = xlsx.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
      });
      res.header(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.attachment("tasks.xlsx");
      res.send(excelBuffer);
    } catch (error) {
      res.status(500).json({message: "Error downloading Excel file"});
    }
  }),
};

module.exports = Taskcontroller;

//
// Download CSV file
// router.get('/download/csv', async (req, res) => {
//   try {
//     const tasks = await Task.find().populate('Project').populate('Milestone_Name');
//     const csvData = tasks.map((task) => {
//       return {
//         Task_Name: task.Task_Name,
//         Project: task.Project.Project_Name,
//         Project_Code: task.Project_Code,
//         Milestone_Name: task.Milestone_Name.Milestone_Name,
//         Priority: task.Priority,
//         StartDate: task.StartDate,
//         EndDate: task.EndDate,
//         Status: task.Status,
//         Estimated_Time: task.Estimated_Time,
//         Due_date: task.Due_date,
//         Completed_time: task.Completed_time,
//         Resource_Email: task.Resource_Email,
//         Task_description: task.Task_description,
//       };
//     });
//     const csv = csvData.map((data) => Object.values(data).join(',')).join('\n');
//     res.header('Content-Type', 'text/csv');
//     res.attachment('tasks.csv');
//     res.send(csv);
//   } catch (error) {
//     res.status(500).json({ message: 'Error downloading CSV file' });
//   }
// });

// // Download Excel file
// router.get('/download/excel', async (req, res) => {
//   try {
//     const tasks = await Task.find().populate('Project').populate('Milestone_Name');
//     const excelData = tasks.map((task) => {
//       return {
//         Task_Name: task.Task_Name,
//         Project: task.Project.Project_Name,
//         Project_Code: task.Project_Code,
//         Milestone_Name: task.Milestone_Name.Milestone_Name,
//         Priority: task.Priority,
//         StartDate: task.StartDate,
//         EndDate: task.EndDate,
//         Status: task.Status,
//         Estimated_Time: task.Estimated_Time,
//         Due_date: task.Due_date,
//         Completed_time: task.Completed_time,
//         Resource_Email: task.Resource_Email,
//         Task_description: task.Task_description,
//       };
//     });
//     const workbook = xlsx.utils.book_new();
//     const worksheet = xlsx.utils.json_to_sheet(excelData);
//     xlsx.utils.book_append_sheet(workbook, worksheet, 'Tasks');
//     const excelBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
//     res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.attachment('tasks.xlsx');
//     res.send(excelBuffer);
//   } catch (error) {
//     res.status(500).json({ message: 'Error downloading Excel file' });
//   }
// });

//
