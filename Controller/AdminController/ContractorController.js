// const AsyncHandler = require("express-async-handler");
// const User = require("../../Modals/userSchema");
// const EmployeeRegistration = require("../../Modals/EmployeeRegistrationModel");
// const { StatusCodes } = require("http-status-codes");
// const Contractor = require("../../Modals/ContractorRegisterionModel");
// const paginate = require("../../Utils/pagination");
// const moment = require("moment");

// // create admin
// const CreateContratorCtr = AsyncHandler(async (req, res) => {
//
// });

// // getall admins

// const GetallContractor = AsyncHandler(async (req, res) => {
//   try {
//     console.log("contractor");
//     // const user = await User.findById(req.user);
//     // if (!user) {
//     //   res.status(StatusCodes.BAD_REQUEST);
//     //   throw new Error("User Not found, please sign in");
//     // }

//     // Get pagination parameters from the query string
//     const { page } = req.query;

//     // Use the pagination module to get the query and pagination details
//     const { query, pagination } = await paginate(Contractor, page, 10);

//     // Execute the paginated query
//     const response = await query.lean().exec();

//     // Return the response with pagination details
//     return res.status(StatusCodes.OK).json({
//       success: true,
//       data: response,
//       pagination,
//     });
//   } catch (error) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       message: error?.message,
//     });
//   }
// });

// // remove admin
// const RemoveContractor = AsyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;
//     // const user = await User.findById(req.user);
//     // if (!user) {
//     //   res.status(StatusCodes.BAD_REQUEST);
//     //   throw new Error("User Not found ! Please sign in");
//     // }

//     const response = await Contractor.findByIdAndDelete({ _id: id });
//     if (response) {
//       return res
//         .status(200)
//         .json({ success: true, message: "delete admin successfully" });
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// // Edit Admin
// const EditContractor = AsyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;
//     // const user = await User.findById(req.body);
//     // if (!user) {
//     //   res.status(StatusCodes.BAD_REQUEST);
//     //   throw new Error("User Not found ! Please sign in");
//     // }

//     const response = await Contractor.findByIdAndUpdate({ _id: id }, req.body, {
//       new: true,
//       runValidator: true,
//     });
//     if (response) {
//       return res
//         .status(200)
//         .json({ success: true, message: "Edit Contractor successfully" });
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// // Get single Admin
// const GetSingleContractor = AsyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;
//     // const user = await User.findById(req.body);
//     // if (!user) {
//     //   res.status(StatusCodes.BAD_REQUEST);
//     //   throw new Error("User Not found ! Please sign in");
//     // }

//     const response = await Contractor.findById({ _id: id });
//     if (response) {
//       return res.status(200).json({ success: true, message: response });
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });
// module.exports = {
//   CreateContratorCtr,
//   GetallContractor,
//   RemoveContractor,
//   EditContractor,
//   GetSingleContractor,
// };

const asyncHandler = require("express-async-handler");
const User = require("../../Modals/userSchema");
const { StatusCodes } = require("http-status-codes");
const Company = require("../../Modals/CompanySchema");
const Contractor = require("../../Modals/ContractorSchema");

const contractorController = {
  // create
  createcontractor: asyncHandler(async (req, res) => {
    try {
      // user verify

      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User");
      }
      //  check company

      const checkcompany = await Company.findOne({ UserId: user?.user_id });
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company does not exists");
      }

      // create contractor

      const addItem = await Contractor({
        Contractor_FirstName: req.body.Contractor_FirstName,
        Contaractor_LastName: req.body.Contaractor_LastName,
        Contractor_Number: req.body.Contractor_Number,
        Person_Name: req.body.Person_Name,
        Remark: req.body.Remark,
        Company_Id: checkcompany?.Company_Id,
      });
      if (!addItem) {
        res.status(StatusCodes?.NOT_FOUND);
        throw new Error("contractor not found");
      }

      await addItem.save();

      return res
        .status(StatusCodes?.CREATED)
        .json({ success: true, message: "contractor created successfully" });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // get contractor
  fetchcontractor: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User");
      }
      //  check company

      const checkcompany = await Company.findOne({ UserId: user?.user_id });
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company does not exists");
      }

      // get all contractor

      const fetchcontractor = await Contractor.find({
        Company_Id: checkcompany.Company_Id,
      });
      if (!fetchcontractor) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Not found contractor");
      }

      return res
        .status(StatusCodes.OK)
        .json({ result: fetchcontractor, success: true });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // remove contractor

  removecontractor: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  editcontractor: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  siglecontractor: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};
module.exports = contractorController;
