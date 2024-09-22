const asyncHandler = require("express-async-handler");

const contractorCtr = {
  // fetch contractor project
  fetchcontractorprojects: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // fetch single projects

  fetchsingleContractorProjects: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error.message);
    }
  }),
  //   fetch active projects

  fetchactiveprojects: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error.message);
    }
  }),

  //fetch inactive projects
  fetchinactiveprojects: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error.message);
    }
  }),

  //   fill contractor timesheets

  fillcontractortimesheets: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error.message);
    }
  }),

  //
};

module.exports = contractorCtr;
