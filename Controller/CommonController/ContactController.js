const asyncHandler = require("express-async-handler");
const Contact = require("../../Modals/CommonModels/ContactModel");
const User = require("../../Modals/userSchema");
const { StatusCodes } = require("http-status-codes");

const contactcontroller = {
  createcontact: asyncHandler(async (req, res) => {
    try {
      const addItem = await Contact(req.body);
      if (!addItem) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("bad request");
      }
      await addItem.save();
      return res
        .status(StatusCodes.CREATED)
        .json({ message: "message sent successfully", success: true });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  fetchcontact: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized user please sign in");
      }
      const fetchcontact = await Contact.find().lean().exec();

      if (!fetchcontact) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Contact does not exists");
      }
      return res.status(StatusCodes.BAD_REQUEST).json({
        result: fetchcontact,
        message: "contact fetch data successfully",
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  fetchsinglecontact: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized user please sign in");
      }
      const fetchcontact = await Contact.findById({ Contact_Id: req.params.id })
        .lean()
        .exec();

      if (!fetchcontact) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Contact does not exists");
      }
      return res.status(StatusCodes.BAD_REQUEST).json({
        result: fetchcontact,
        message: "contact fetch data successfully",
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = contactcontroller;
