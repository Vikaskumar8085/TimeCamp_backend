const AsyncHandler = require("express-async-handler");

const notificationctr = {
  fetchnotification: AsyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // get single notification
  fetchsinglenotification: AsyncHandler(async (req, res) => {
    try {
    } catch (error) {}
  }),
  // add notification
  addnotification: AsyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  removenotification: AsyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = notificationctr;
