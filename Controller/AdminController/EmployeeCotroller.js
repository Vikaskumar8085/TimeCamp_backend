const AsyncHandler = require("express-async-handler");
const EmployeeRegistration = require("../../Modals/EmployeeRegistrationModel");
const { StatusCodes } = require("http-status-codes");
const moment = require("moment");
const paginate = require("../../Utils/pagination");
// Get All Employee
const GetAllEmployee = AsyncHandler(async (req, res) => {
  try {
    const { page } = req.query;
    const { query, pagination } = paginate(EmployeeRegistration, page, 10);
    const GetEmployee = await query.lean().exec();

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
