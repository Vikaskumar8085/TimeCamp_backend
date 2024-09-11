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
    // const notification = await Notification({});
  } catch (error) {
    throw new Error(error.message);
  }
});

const GetallContactCtr = AsyncHandler(async (req, res) => {
  try {
    const { stud_name, sort, search } = req.query;
    var page = req.query.page * 1 || 1;
    var limit = req.query.limit * 1 || 5;
    var skip = (page - 1) * limit;

    var totalcount = await Curd.estimatedDocumentCount();
    var queryObj = {};
    if (sort) {
      var sortfix = sort.replace(",", " ");
      console.log(sortfix);
    }
    if (stud_name) {
      queryObj.stud_name = stud_name;
    }

    if (search) {
      queryObj.stud_name = { $regex: search, $options: "i" };
    }
    const contact = await Contact.find(queryObj).skip(skip).limit(limit);

    if (!contact) {
      res.status(400);
      throw new Error("Bad Request");
    }

    const contactobj = { contact, totalcount };

    return res.status(200).json({ message: contactobj, success: true });
  } catch (error) {
    throw new Error(error?.message);
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
