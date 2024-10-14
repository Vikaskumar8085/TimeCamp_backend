const asyncHandler = require("express-async-handler");
const fs = require("fs");
const {StatusCodes} = require("http-status-codes");
const Company = require("../../../Modals/CompanySchema");
const Task = require("../../../Modals/TaskSchema/TaskSchema");
const User = require("../../../Modals/userSchema");
const TaskCtr = {
  // task upload csv ctr
  taskuploadcsvctr: asyncHandler(async (req, res) => {
    try {
      //   check user
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized user please signup");
      }
      //check company
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Company does not exists");
      }

      const results = [];
      fs.createReadStream(req.file.buffer)
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          try {
            await Task.insertMany(results);
            res.status(201).send({message: "CSV data uploaded successfully!"});
          } catch (error) {
            res.status(500).send({error: "Error uploading CSV data"});
          }
        });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // task upload excel ctr
  taskuploadexcelCtr: asyncHandler(async (req, res) => {
    try {
      //   check user
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized user please signup");
      }
      //check company
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Company does not exists");
      }

      const workbook = xlsx.read(req.file.buffer, {type: "buffer"});
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const results = xlsx.utils.sheet_to_json(worksheet);

      Task.insertMany(results)
        .then(() => {
          res.status(201).send({message: "Excel data uploaded successfully!"});
        })
        .catch((error) => {
          res.status(500).send({error: "Error uploading Excel data"});
        });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // create task
  createTaskctr: asyncHandler(async (req, res) => {
    try {
      //   check user
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized user please signup");
      }
      //check company
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Company does not exists");
      }

      // create task
      const addtasks = await Task({
        Task_Name: req.body.Task_Name,
        Project_Code: req.body.Project_Code,
        Milestone_Name: req.body.Milestone_Name,
        Priority: req.body.Priority,
        Start: req.body.Start,
        End: req.body.End,
        Status: req.body.Status,
        Estimated_time: req.body.Estimated_time,
        Due_date: req.body.Due_date,
        Completed_time: req.body.Completed_time,
        Resource_Email: req.body.Resource_Email,
        Task_description: req.body.Task_description,
        Attachment: req.file.filename, // Changed to null for file upload
        Description: req.body.Description,
      });
      const validationError = addtasks.validateSync();
      if (!validationError) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(validationError.message);
      }
      await addtasks.save();
      return res
        .status(StatusCodes.CREATED)
        .json({message: "Task created successfully!", success: true});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  //  fetch tasks
  fetchalltaskctr: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized user please signup");
      }
      //check company
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Company does not exists");
      }
      const tasks = await Task.find().lean();

      if (tasks.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({message: "No tasks found."});
      }

      return res
        .status(StatusCodes.OK)
        .json({message: "fetch successfully task", success: true});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = TaskCtr;
