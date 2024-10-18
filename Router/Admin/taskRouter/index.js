const express = require("express");
const Taskcontroller = require("../../../Controller/TaskController/Taskcontroller");

const taskRouter = express.Router();

taskRouter.get("/download-excel-task", Taskcontroller.downloadCsvtaskctr);
taskRouter.get("/download-excel-task", Taskcontroller.downloadCsvtaskctr);

module.exports = taskRouter;
