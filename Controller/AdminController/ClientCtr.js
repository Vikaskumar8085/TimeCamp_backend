// const AsyncHandler = require("express-async-handler");
// const User = require("../../Modals/userSchema");
// const { StatusCodes } = require("http-status-codes");
// const Client = require("../../Modals/ClientRegistrationModel");
// const paginate = require("../../Utils/pagination");
// const Company = require("../../Modals/CompanySchema");

// // createClient
// const createClientCtr = AsyncHandler(async (req, res) => {
//   try {
//     const user = await User.findById(req.user);
//     if (!user) {
//       res.status(StatusCodes.UNAUTHORIZED);
//       throw new Error("UnAuthrized User Please Signup ");
//     }

//     // const company = await Company.findOne({ UserId: user?.user_id });
//     // if (!company) {
//     //   res.status(400);
//     //   throw new Error("Compnay does not exists");
//     // }
//     const addItem = await Client({
//       Company_Name: req.body.Company_Name,
//       Client_Name: req.body.Client_Name,
//       Client_Email: req.body.Client_Email,
//       Client_Phone: req.body.Client_Phone,
//       Client_Postal_Code: req.body.Client_Postal_Code,
//       Client_Address: req.body.Client_Address,
//       GstNumber: req.body.GstNumber,
//       Common_Id: user._id,
//       Company_Id: "1",
//     });
//     if (addItem) {
//       await addItem.save();
//       return res
//         .status(200)
//         .json({ success: true, message: "successfully client added" });
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// // getallclient

// const GetAllClientCtr = AsyncHandler(async (req, res) => {
//   try {
//     // const { search, sort } = req.query;

//     // var queryObj = {};

//     // if(search){
//     // queryObj?.FirstName ={$regex:search,option:i};
//     // }

//     const user = await User.findById(req.user);
//     if (!user) {
//       res.status(StatusCodes.UNAUTHORIZED);
//       throw new Error("Unauthorized User. Please Signup.");
//     }

//     // const { page } = req.query; // Get pagination params from query string

//     // // Use the pagination module to get the query and pagination details
//     // const { query, pagination } = paginate(Client, page, 10);

//     const getItem = await Client.find().lean().exec();

//     if (getItem) {
//       return res.status(200).json({
//         success: true,
//         message: getItem,
//         // Include pagination details in the response
//       });
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// // get single CLient ctr
// const GetSingleClientCtr = AsyncHandler(async (req, res) => {
//   try {
//     const user = await User.findById(req.user);
//     if (!user) {
//       res.status(StatusCodes.UNAUTHORIZED);
//       throw new Error("UnAuthorized User Please Signup ");
//     }

//     const getItem = await Client.findById({ _id: req.params.id }).lean().exec();

//     if (getItem) {
//       return res.status(200).json({ success: true, message: getItem });
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// // EditClient Ctr

// const EditClientCtr = AsyncHandler(async (req, res) => {
//   try {
//     const user = await User.findById(req.user);
//     if (!user) {
//       res.status(StatusCodes.UNAUTHORIZED);
//       throw new Error("UnAuthrized User Please Signup ");
//     }
//     const EditItem = await Client.findByIdAndUpdate(
//       { _id: req.params.id },
//       req.body,
//       { new: true, runValidator: true }
//     );

//     if (EditItem) {
//       return res.status(200).json({ success: true, message: EditItem });
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// const RemoveClient = AsyncHandler(async (req, res) => {
//   try {
//     const user = await User.findById(req.user);
//     if (!user) {
//       res.status(StatusCodes.UNAUTHORIZED);
//       throw new Error("UnAuthrized User Please Signup ");
//     }

//     const RemoveItems = await Client.findByIdAndDelete({ _id: req.params.id });
//     if (RemoveItems) {
//       return res
//         .status(200)
//         .json({ success: true, message: "data deleted Successfully" });
//     }
//   } catch (error) {}
// });
// // get all active client ctr

// const GetAllActiveClientCtr = AsyncHandler(async (req, res) => {
//   try {
//     const response = await Client.find({ Client_Status: "Active" })
//       .lean()
//       .exec();
//     if (!response) {
//       res.status(400);
//       throw new Error("Bad request");
//     }
//     return res.status(200).json({ message: response, success: true });
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// });

// // get all In Active client ctr

// const getallInActiveClientCtr = AsyncHandler(async (req, res) => {
//   try {
//     const response = await Client.find({ Client_Status: "InActive" })
//       .lean()
//       .exec();
//     if (!response) {
//       res.status(400);
//       throw new Error("Bad request");
//     }
//     return res.status(200).json({ message: response, success: true });
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// });

// // get all dead Clients ctr

// const getallDeadClientCtr = AsyncHandler(async (req, res) => {
//   try {
//     const response = await Client.find({ Client_Status: "Dead" }).lean().exec();
//     if (!response) {
//       res.status(400);
//       throw new Error("Bad request");
//     }
//     return res.status(200).json({ message: response, success: true });
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// });

// module.exports = {
//   createClientCtr,
//   GetSingleClientCtr,
//   EditClientCtr,
//   GetAllClientCtr,
//   RemoveClient,
//   GetAllActiveClientCtr,
//   getallInActiveClientCtr,
//   getallDeadClientCtr,
// };

const asyncHandler = require("express-async-handler");
const User = require("../../Modals/userSchema");
const Client = require("../../Modals/ClientRegistrationModel");
const { StatusCodes } = require("http-status-codes");
const Company = require("../../Modals/CompanySchema");
const clientController = {
  //  create client
  createClient: asyncHandler(async (req, res) => {
    try {
      const user = await User?.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }
      const company = await Company.findOne({ UserId: user?.user_id });
      if (!company) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }

      const addItem = await Client({
        Company_Name: req.body.Company_Name,
        Client_Name: req.body.Client_Name,
        Client_Email: req.body.Client_Email,
        Client_Phone: req.body.Client_Phone,
        Client_Postal_Code: req.body.Client_Postal_Code,
        Client_Address: req.body.Client_Address,
        GstNumber: req.body.GstNumber,
        Common_Id: company?.Company_Id,
      });
      if (addItem) {
        await addItem.save();
        return res
          .status(200)
          .json({ success: true, message: "successfully client added" });
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // fetch clients
  fetchallclient: asyncHandler(async (req, res) => {
    try {
      const user = await User?.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }

      const checkcompany = await Company.findOne({ UserId: user?.user_id });
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }
      const clientlist = await Client.find({
        Common_Id: checkcompany?.Company_Id,
      });

      return res.status(200).json({
        message: "fetch data successfully",
        success: true,
        clientdata: clientlist,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // remove clients
  removeclient: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // edit clients
  editclients: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // get single clients
  singleclients: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  //get active client
  getactiveClient: asyncHandler(async (req, res) => {
    try {
      const user = await User?.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }
      const checkcompany = await Company.findOne({ UserId: user?.user_id });
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }
      const clientlist = await Client.find({
        Common_Id: checkcompany?.Company_Id,
        Client_Status: "Active",
      }).lean();

      return res.status(200).json({
        success: true,
        message: "successfully fetch active client",
        result: clientlist,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // get inactive client
  getinactiveclient: asyncHandler(async (req, res) => {
    try {
      const user = await User?.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }
      const checkcompany = await Company.findOne({ UserId: user?.user_id });
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }

      const result = await Client.find({
        Common_Id: checkcompany?.Company_Id,
        Client_Status: "InActive",
      });

      return res.status(200).json({
        success: true,
        message: " successfully fetch Inactive client",
        result: result,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  getdeadclient: asyncHandler(async (req, res) => {
    try {
      const user = await User?.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }
      const checkcompany = await Company.findOne({ UserId: user?.user_id });
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }

      const result = await Client.find({
        Common_Id: checkcompany?.Company_Id,
        Client_Status: "Dead",
      });

      return res.status(200).json({
        success: true,
        message: "successfully fetch dead client",
        result: result,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = clientController;
