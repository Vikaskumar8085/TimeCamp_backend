// const AsyncHandler = require("express-async-handler");
// const EmployeeRegistration = require("../../Modals/EmployeeRegistrationModel");
// const User = require("../../Modals/userSchema");
// const { StatusCodes } = require("http-status-codes");
// const moment = require("moment");
// const paginate = require("../../Utils/pagination");
// // Get All Employee
// const GetAllEmployee = AsyncHandler(async (req, res) => {
//   try {
//     // const { page } = req.query;
//     // const { query, pagination } = paginate(EmployeeRegistration, page, 10);
//     const GetEmployee = await EmployeeRegistration.find().lean().exec();

//     if (!GetEmployee) {
//       res.status(StatusCodes.BAD_REQUEST);
//       throw new Error("Employee Not Found");
//     }
//     return res.status(StatusCodes.OK).json(GetEmployee);
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// // Get single Employee
// const GetSingleEmployee = AsyncHandler(async (req, res) => {
//   try {
//     const SingleEmployee = await EmployeeRegistration.findById(req.params.id);
//     if (!SingleEmployee) {
//       res.status(StatusCodes.BAD_REQUEST);
//       throw new Error("Employee Not Found");
//     }
//     return res.status(StatusCodes.OK).json(SingleEmployee);
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// // Add Employee
// const AddEmployee = AsyncHandler(async (req, res) => {
//   try {
//     const addItem = await EmployeeRegistration({
//       Employee_FirstName: req.body.Employee_FirstName,
//       Employee_LastName: req?.body?.Employee_LastName,
//       Employee_Email: req?.body?.Employee_Email,
//       Employee_Phone: req?.body?.Employee_Phone,
//       Employee_JoiningDate: moment(req?.body?.Employee_JoiningDate).format(
//         "DD/MM/YYYY"
//       ),
//       Employee_Designation: req?.body?.Employee_Designation,
//       Employee_Address: req?.body?.Employee_Address,
//     });
//     const addUser = await User({
//       user_id: "EMP100",
//       FirstName: req.body.Employee_FirstName,
//       LastName: req?.body?.Employee_LastName,
//       Email: req?.body?.Employee_Email,
//       Role: req.body.Role,
//       Activity: false,
//       BlockStatus: "Unblock",
//       Term: true,
//       isVerify: false,
//     });

//     if (addItem && addUser) {
//       await addUser.save();
//       await addItem.save();

//       console.log(addItem, "addItem");
//       return res.status(StatusCodes.CREATED).json(addItem);
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// // Edit Employee

// const EditEmployee = AsyncHandler(async (req, res) => {
//   try {
//     const EditItems = await EmployeeRegistration.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidatore: true }
//     );

//     if (EditItems) {
//       return res.status(StatusCodes.OK).json(EditItems);
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// // Remove Employee

// const ReomveEmployee = AsyncHandler(async (req, res) => {
//   try {
//     const RemoveItem = await EmployeeRegistration.findByIdAndDelete(
//       req.params.id
//     );
//     if (RemoveItem) {
//       return res.status(StatusCodes.OK).json(RemoveItem);
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// // Get All Active Employee

// const GetAllActiveEmployeeCtr = AsyncHandler(async (req, res) => {
//   try {
//     const { search, filterByDepartment, filterByStatus, sortBy, sortOrder } =
//       req.query;

//     // Build query object
//     const query = {};
//     if (search) {
//       query.name = { $regex: search, $options: "i" }; // Case-insensitive search
//     }
//     if (filterByDepartment) {
//       query.department = filterByDepartment;
//     }
//     if (filterByStatus) {
//       query.status = filterByStatus;
//     }

//     const response = await EmployeeRegistration.find(query).lean().exec();
//     if (!response) {
//       res.status(400);
//       throw new Error("Bad Request");
//     }
//     return res.status(200).json({ message: response, success: true });
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// });

// // Get All In Active Employee Ctr

// const GetAllInActiveEmployeeCtr = AsyncHandler(async (req, res) => {
//   try {
//     const response = await EmployeeRegistration.find().lean().exec();
//     if (!response) {
//       res.status(400);

//       throw new Error("Bad Request");
//     }
//     return res.status(200).json({ message: response, success: true });
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// });

// // update Employee status

// const updateEmployeeStatusCtr = AsyncHandler(async (req, res) => {
//   try {
//     const response = await EmployeeRegistration.findByIdAndUpdate();
//     if (!response) {
//       res.status(400);
//       throw new Error("Bad Request");
//     }
//     return res.status(200).json({ message: response, success: true });
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// });
// module.exports = {
//   AddEmployee,
//   GetAllEmployee,
//   GetSingleEmployee,
//   EditEmployee,
//   ReomveEmployee,
//   GetAllActiveEmployeeCtr,
//   GetAllInActiveEmployeeCtr,
//   updateEmployeeStatusCtr,
// };
const asyncHandler = require("express-async-handler");
const Employee = require("../../Modals/EmployeeRegistrationModel");
const User = require("../../Modals/userSchema");

const employeeController = {
  // create
  createemployee: asyncHandler(async (req, res) => {
    try {
      const newEmployee = new Employee(req.body);
      await newEmployee.save();
      res
        .status(201)
        .json({
          message: "Employee created successfully",
          employee: newEmployee,
        });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error creating employee", error: error.message });
    }
  }),
  // get employee
  fetchemployee: asyncHandler(async (req, res) => {
    try {
      const user = await User?.findById(req.user).lean().exec();
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // remove employee

  removeemployee: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  editemployee: asyncHandler(async (req, res) => {
    try {
    } catch (error) { }
  }),

  sigleemployee: asyncHandler(async (req, res) => {
    try {
    } catch (error) { }
  }),
};

module.exports = employeeController;
