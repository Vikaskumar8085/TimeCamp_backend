const AsyncHandler = require("express-async-handler");
const Contact = require("../../Modals/CommonModels/ContactModel");
const User = require("../../Modals/userSchema");
const { StatusCodes } = require("http-status-codes");

const AddContactCtr = AsyncHandler(async (req, res) => {
  try {
    const addItem = await Contact(req.body);
    if (!addItem) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error(" ");
    }
    await addItem.save();
    const notification = await Notification({});
  } catch (error) {
    throw new Error(error.message);
  }
});

const GetallContactCtr = AsyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById({ _id: req.body.Id });
    console.log(contact);
  } catch (error) {
    throw new error.message();
  }
});

const GetSingleContactCtr = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("Please Login first");
    }
    const getsinglecontact = await Contact.findById({ _id: req.params.id })
      .lean()
      .exec();
    if (getsinglecontact) {
      return res.status(200).json({ success: true, message: getsinglecontact });
    }
  } catch (error) {
    throw new error.message();
  }
});

module.exports = {
  GetSingleContactCtr,
  GetallContactCtr,
  AddContactCtr,
};
