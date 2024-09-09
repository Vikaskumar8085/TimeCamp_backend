const AsyncHandler = require("express-async-handler");
const User = require("../../Modals/userSchema");
const EmployeeRegistration = require("../../Modals/EmployeeRegistrationModel");
const { StatusCodes } = require("http-status-codes");
const Contractor = require("../../Modals/ContractorRegisterionModel");
const paginate = require("../../Utils/pagination");
const moment = require("moment");

// create admin
const CreateContratorCtr = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("User Not found please sign in");
    }

    const company = await Company.findOne({ UserId: user?.user_id });
    if (!company) {
      res.status(400);
      throw new Error("Compnay does not exists");
    }

    const addItem = await EmployeeRegistration({
      Employee_FirstName: req.body.Employee_FirstName,
      Employee_LastName: req?.body?.Employee_LastName,
      Employee_Email: req?.body?.Employee_Email,
      Employee_Phone: req?.body?.Employee_Phone,
      Employee_JoiningDate: moment(req?.body?.Employee_JoiningDate).format(
        "DD/MM/YYYY"
      ),
      Employee_Designation: req?.body?.Employee_Designation,
      Employee_Address: req?.body?.Employee_Address,
    });
    const addUser = await User({
      user_id: "EMP100",
      FirstName: req.body.Employee_FirstName,
      LastName: req?.body?.Employee_LastName,
      Email: req?.body?.Employee_Email,
      Role: req.body.Role,
      Activity: false,
      BlockStatus: "Unblock",
      Term: true,
      isVerify: false,
    })

    if (addItem && addUser) {
      await addItem.save();
      await addUser.save();
      return res.status(201).json({
        success: true,
        message: "Contractor added successfully",
        data: addItem,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// getall admins

const GetallContractor = AsyncHandler(async (req, res) => {
  try {
    console.log("contractor");
    // const user = await User.findById(req.user);
    // if (!user) {
    //   res.status(StatusCodes.BAD_REQUEST);
    //   throw new Error("User Not found, please sign in");
    // }

    // Get pagination parameters from the query string
    const { page } = req.query;

    // Use the pagination module to get the query and pagination details
    const { query, pagination } = await paginate(Contractor, page, 10);

    // Execute the paginated query
    const response = await query.lean().exec();

    // Return the response with pagination details
    return res.status(StatusCodes.OK).json({
      success: true,
      data: response,
      pagination,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error?.message,
    });
  }
});

// remove admin
const RemoveContractor = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // const user = await User.findById(req.user);
    // if (!user) {
    //   res.status(StatusCodes.BAD_REQUEST);
    //   throw new Error("User Not found ! Please sign in");
    // }

    const response = await Contractor.findByIdAndDelete({ _id: id });
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
    // const user = await User.findById(req.body);
    // if (!user) {
    //   res.status(StatusCodes.BAD_REQUEST);
    //   throw new Error("User Not found ! Please sign in");
    // }

    const response = await Contractor.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidator: true,
    });
    if (response) {
      return res
        .status(200)
        .json({ success: true, message: "Edit Contractor successfully" });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// Get single Admin
const GetSingleContractor = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // const user = await User.findById(req.body);
    // if (!user) {
    //   res.status(StatusCodes.BAD_REQUEST);
    //   throw new Error("User Not found ! Please sign in");
    // }

    const response = await Contractor.findById({ _id: id });
    if (response) {
      return res.status(200).json({ success: true, message: response });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
module.exports = {
  CreateContratorCtr,
  GetallContractor,
  RemoveContractor,
  EditContractor,
  GetSingleContractor,
};
