const asyncHandler = require("express-async-handler");
const User = require("../../../Modals/userSchema");
const User = require("../../../Modals/CompanySchema");
const Milestone = require("../../../Modals/MilestoneSchema/MilestoneSchema");
const {StatusCodes} = require("http-status-codes");
const milestonecontroller = {
  // create mile stone
  createmilestoneCtr: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un authorized user Please Signup");
      }
      // check company
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("company does not exists please create your company");
      }

      const addmilestone = await Milestone(req.body);
      if (!addmilestone) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Milestone doest not exists");
      }

      await addmilestone.save();
      return res.status(StatusCodes.CREATED).json({
        message: "milestone has been created successfully",
        success: true,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // fetch milestone

  fetchmilestonectr: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un authorized user Please Signup");
      }
      // check company
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("company does not exists please create your company");
      }

      const fetchmilestone = await Milestone.find().lean().exec();
      if (!fetchmilestone) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("mile stone not  found");
      }

      return res
        .status(StatusCodes.OK)
        .json({success: true, result: fetchmilestone});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = milestonecontroller;
