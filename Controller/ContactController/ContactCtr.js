const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const Contact = require("../../Modals/CommonModels/ContactModel");
const User = require("../../Modals/userSchema");

// create contact us

const contactctr = {
  createContact: asyncHandler(async (req, res) => {
    try {
      const contactresponse = await Contact(req.body);

      if (!contactresponse) {
        res.status(400);
        throw new Error("bad Request");
      }
      await contactresponse.save();
      return res.status(200).json("message has been sent ");
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  fetchContact: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User");
      }

      // const { sort, search } = req.query;
      // const queryObj = {};

      // if (sort) {
      //   var sortfix = sort.replace(",", " ");
      //   console.log(sortfix);
      // }
      //   filter
      //   if (stud_name) {
      //     queryObj.stud_name = stud_name;
      //   }
      //   filter

      //   if (search) {
      //     queryObj.stud_name = { $regex: search, $options: "i" };
      //   }

      const getlistcontact = await Contact.find();

      if (getlistcontact) {
        return res.status(StatusCodes.OK).json({
          message: getlistcontact,
          success: true,
          statusCode: StatusCodes.OK,
        });
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = contactctr;

// {
//   "name": "John Doe",
//   "email": "johndoe@example.com",
//   "phone": "+1234567890",
//   "message": "Hello, this is a test message."
// }
