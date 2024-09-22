const asyncHandler = require("express-async-handler");

const contractorchartsCtr = {
  // contractor time hours
  contractorTimeHoursCharts: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error.message);
    }
  }),

  //   contractor total projects
  contractorTotalprojectsCharts: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = contractorchartsCtr;
