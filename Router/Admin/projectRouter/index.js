const express = require("express");
const verifyToken = require("../../../Auth/VerifyAuth");
const projectController = require("../../../Controller/AdminController/ProjectController");

const projectRouter = express.Router();

projectRouter.post("/add-project",verifyToken,  projectController.createproject);
projectRouter.get(  "/fetch-all-projects",verifyToken,  projectController.fetchproject
);
projectRouter.get(  "/fetch-active-projects",verifyToken,  projectController.fetchactiveprojectctr);
projectRouter.get(  "/fetch-inactive-projects",  verifyToken,  projectController.fetchinactiveprojectctr);

module.exports = projectRouter;
