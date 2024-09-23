const express = require("express");
const contractorchartsCtr = require("../../Controller/ContractorController/contactorChartsCtr");
const verifyToken = require("../../Auth/VerifyAuth");
const contractorCtr = require("../../Controller/ContractorController/contractorCtr");

const corporateRouter = express.Router();

// charts
corporateRouter.get(
  "/contractor-time-hour-chart",
  verifyToken,
  contractorchartsCtr.contractorTimeHoursCharts
);
corporateRouter.get(
  "/contractor-total-projects-chart",
  verifyToken,
  contractorchartsCtr.contractorTotalprojectsCharts
);

//
corporateRouter.post(
  "/fill-time-sheets",
  verifyToken,
  contractorCtr.fillcontractortimesheets
);
corporateRouter.get(
  "/contractor-active-projects",
  verifyToken,
  contractorCtr.fetchactiveprojects
);
corporateRouter.get(
  "/contractor-inactive-projects",
  verifyToken,
  contractorCtr.fetchinactiveprojects
);
corporateRouter.get(
  "/contractor-all-projects",
  verifyToken,
  contractorCtr.fetchcontractorprojects
);
corporateRouter.get(
  "/fetch-single-contrator-projects/:id",
  verifyToken,
  contractorCtr.fetchsingleContractorProjects
);
corporateRouter.post(
  "fetch-contractor-timesheets",
  verifyToken,
  contractorCtr.fillcontractortimesheets
);

//

module.exports = corporateRouter;
