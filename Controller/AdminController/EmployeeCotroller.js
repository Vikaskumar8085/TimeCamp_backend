const AsyncHandler = require("express-async-handler");
const EmployeeRegistration = require("../../Modals/EmployeeRegistrationModel");
const { StatusCodes } = require("http-status-codes");

// Get All Employee
const GetAllEmployee = AsyncHandler(async (req, res) => {
  try {
    const GetEmployee = await EmployeeRegistration.find().lean().exec();

    if (!GetEmployee) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("Employee Not Found");
    }
    return res.status(StatusCodes.OK).json(GetEmployee);
  } catch (error) {
    throw new Error(error.message);
  }
});

// Get single Employee
const GetSingleEmployee = AsyncHandler(async (req, res) => {
  try {
    const SingleEmployee = await EmployeeRegistration.findById(req.params.id);
    if (!SingleEmployee) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("Employee Not Found");
    }
    return res.status(StatusCodes.OK).json(SingleEmployee);
  } catch (error) {
    throw new Error(error.message);
  }
});

// Add Employee
const AddEmployee = AsyncHandler(async (req, res) => {
  try {
    const addItem = await EmployeeRegistration(req.body);
    if (addItem) {
      await addItem.save();

      return res.status(StatusCodes.CREATED).json(addItem);
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// Edit Employee

const EditEmployee = AsyncHandler(async (req, res) => {
  try {
    const EditItems = await EmployeeRegistration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (EditItems) {
      return res.status(StatusCodes.OK).json(EditItems);
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// Remove Employee

const ReomveEmployee = AsyncHandler(async (req, res) => {
  try {
    const RemoveItem = await EmployeeRegistration.findByIdAndDelete(
      req.params.id
    );
    if (RemoveItem) {
      return res.status(StatusCodes.OK).json(RemoveItem);
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
module.exports = {
  AddEmployee,
  GetAllEmployee,
  GetSingleEmployee,
  EditEmployee,
  ReomveEmployee,
};
