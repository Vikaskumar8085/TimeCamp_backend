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
    const addItem = await Client({
      Company_Name: req.body.Company_Name,
      Client_Name: req.body.Client_Name,
      Client_Email: req.body.Client_Email,
      Client_Phone: req.body.Client_Phone,
      Client_Postal_Code: req.body.Client_Postal_Code,
      Client_Address: req.body.Client_Address,
      GstNumber: req.body.GstNumber,
      Common_Id: user._id,
    });
    if (addItem) {
      await addItem.save();
      return res
        .status(200)
        .json({ success: true, message: "successfully client added" });
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
    const getItem = await Client.find().lean().exec();

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
      throw new Error("UnAuthorized User Please Signup ");
    }
    const getItem = await Client.findById({ _id: req.params.id }).lean().exec();

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
    const EditItem = await Client.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidator: true }
    );

    if (EditItem) {
      return res.status(200).json({ success: true, message: EditItem });
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
