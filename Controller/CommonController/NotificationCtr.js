const AsyncHandler = require("express-async-handler");
const User = require("../../Modals/userSchema");
const { StatusCodes } = require("http-status-codes");

const notificationctr = {
  fetchnotification: AsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized user Please sign up");
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // get single notification
  fetchsinglenotification: AsyncHandler(async (req, res) => {
    try {
      // user
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized user Please sign up");
      }
      //fetch
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // add notification
  addnotification: AsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized user Please sign up");
      }
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
