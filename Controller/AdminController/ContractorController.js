const AsyncHandler = require("express-async-handler");
const User = require("../../Modals/userSchema");
const { StatusCodes } = require("http-status-codes");

// create admin
const createContratorCtr = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("User Not found please sign in");
    }

    const response = await User(req.body);

    if (response) {
      await response.save();
      return res.status(201).json(response);
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// getall admins

const GetallContractor = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("User Not found please sign in");
    }
    const response = await User.find().lean().exec();
    if (response) {
      return res.status(201).json(response);
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// remove admin
const RemoveContractor = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.body);
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("User Not found ! Please sign in");
    }

    const response = await User.findByIdAndDelete({ _id: id });
    if (response) {
      return res
        .status(200)
        .json({ success: true, message: "delete admin successfully" });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// Edit Admin
const EditContractor = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.body);
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("User Not found ! Please sign in");
    }

    const response = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidator: true,
    });
    if (response) {
      return res
        .status(200)
        .json({ success: true, message: "delete admin successfully" });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// Get single Admin
const GetSingleContractor = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.body);
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("User Not found ! Please sign in");
    }

    const response = await User.findById({ _id: id });
    if (response) {
      return res.status(200).json({ success: true, message: response });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
module.exports = {
  createContratorCtr,
  GetallContractor,
  RemoveContractor,
  EditContractor,
  GetSingleContractor,
};
