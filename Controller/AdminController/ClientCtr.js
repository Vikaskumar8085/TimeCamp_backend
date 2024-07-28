const AsyncHandler = require("express-async-handler");
const User = require("../../Modals/userSchema");
const { StatusCodes } = require("http-status-codes");
const Client = require("../../Modals/ClientRegistrationModel");

// createClient

const createClientCtr = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED);
      throw new Error("UnAuthrized User Please Signup ");
    }
    const addItem = await Client(req.body);
    if (addItem) {
      await addItem.save();
      return res.status(200).json({ success: true, message: addItem });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// getallclient

const GetAllClientCtr = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED);
      throw new Error("UnAuthrized User Please Signup ");
    }
    const getItem = await Client.find().lean().execc();

    if (getItem) {
      return res.status(200).json({ success: true, message: getItem });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// get single CLient ctr
const GetSingleClientCtr = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED);
      throw new Error("UnAuthrized User Please Signup ");
    }
    const getItem = await Client.findById({ _id: req.params.id })
      .lean()
      .execc();

    if (getItem) {
      return res.status(200).json({ success: true, message: getItem });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

const EditClientCtr = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED);
      throw new Error("UnAuthrized User Please Signup ");
    }
    const getItem = await Client.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidator: true }
    );

    if (getItem) {
      return res.status(200).json({ success: true, message: getItem });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = {
  createClientCtr,
  GetSingleClientCtr,
  EditClientCtr,
  GetAllClientCtr,
};
