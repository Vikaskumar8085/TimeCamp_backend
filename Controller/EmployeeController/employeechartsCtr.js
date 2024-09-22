const asyncHandler = require("express-async-handler");

const employeechartscontroller = {
  // total project charts
  totalprojectsCharts: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  //   total employe hours chart

  totalemployeehourcharts: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error.message);
    }
  }),
};

module.exports = employeechartscontroller;
