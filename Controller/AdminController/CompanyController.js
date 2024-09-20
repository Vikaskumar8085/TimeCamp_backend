const Company = require("../../Modals/CompanySchema");
const { StatusCodes } = require("http-status-codes");
const User = require("../../Modals/userSchema");
// const paginate = require("../../Utils/pagination");
// GetAllCompany
// const GetAllCompany = AsyncHandler(async (req, res) => {
//   try {
//     // user
//     const user = await User.findById(req.user);
//     if (!user) {
//       res.status(StatusCodes.UNAUTHORIZED);
//       throw new Error("Un Authorized User");
//     }
//     const { page } = req.query;
//     const { query, pagination } = paginate(Company, page, 10);
//     // verified
//     const verifycompany = await Company.findOne({ UserId: user?.user_id });
//     if (!verifycompany) {
//       res.status(StatusCodes.BAD_REQUEST);
//       throw new Error("Your Company has still not registred ");
//     }
//     const response = await query.lean().exec();
//     if (!response) {
//       res.status(StatusCodes.NO_CONTENT);
//       throw new Error("No data Available");
//     } else {
//       return res
//         .status(StatusCodes.OK)
//         .json({ status: StatusCodes.OK, message: response, pagination });
//     }
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// });

// RegisterCompany

// const RegisterCompany = AsyncHandler(async (req, res) => {
//   try {
//     // user verification
//     const user = await User.findById(req.user);
//     if (!user) {
//       res.status(StatusCodes.UNAUTHORIZED);
//       throw new Error("Un Authorized User");
//     }
//     const response = await Company({
//       Company_Name: req.body.Company_Name,
//       Company_Email: req.body.Company_Email,
//       Address: req.body.Address,
//       Postal_Code: req.body.Postal_Code,
//       Phone: req.body.Phone,
//       Company_Logo: req.body.Company_Logo,
//       Employee_No: req.body.Employee_No,
//       Established_date: req.body.Established_date,
//       CompanyWesite: req.body.CompanyWesite,
//       Tex_Number: req.body.Tex_Number,
//       UserId: user.user_id,
//     });

//     if (!response) {
//       res.status(StatusCodes.BAD_REQUEST);
//       throw new Error("forebbidden");
//     }
//     await response.save();
//     return res.status(StatusCodes.CREATED).json({
//       status: StatusCodes.CREATED,
//       message: "Company Added Successfully",
//     });
//   } catch (error) {
//     return res.status(500).json(error?.message);
//   }
// });

// const EditCompany = AsyncHandler(async (req, res) => {
//   try {
//     const user = await User.findById();
//     if (!user) {
//       res.status(StatusCodes.UNAUTHORIZED);
//       throw new Error("Un Authorized User");
//     }

//     const verifycompany = await Company.findOne({ UserId: user?.user_id });
//     if (!verifycompany) {
//       res.status(StatusCodes.BAD_REQUEST);
//       throw new Error("Your Company has still not registred ");
//     }

//     const FindCompany = await Company.findById({ _id: req.params.id });

//     if (!FindCompany) {
//       res.status(StatusCodes.BAD_REQUEST);
//       throw new Error("there is some issue");
//     } else {
//       const { find } = FindCompany;

//       FindCompany.user = req.body.User || User;
//     }

//     await FindCompany.save();

//     return res
//       .status(StatusCodes.OK)
//       .json({ status: Success, message: "Company Updated Successfully" });
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// });

// create co admins
// const CreateCompany = AsyncHandler(async (req, res) => {
//   try {
//     const user = await User.findById(req.user);
//     if (!user) {
//       res.status(StatusCodes.UNAUTHORIZED);
//       throw new Error("Un Authorized User");
//     }
//     // verify Company

//     // const verifycompany = await Company.findOne({ UserId: user?.user_id });
//     // if (!verifycompany) {
//     //   res.status(StatusCodes.BAD_REQUEST);
//     //   throw new Error("Your Company has still not registred ");
//     // }

//     const createAdmin = await User({
//       FirstName: req.body.FirstName,
//       LastName: req.body.LastName,
//       Email: req.body.Email,
//       Password: req.body.Password,
//       Role: "Admin",
//       user_id: "1",
//     });

//     if (!createAdmin) {
//       res.status(StatusCodes.BAD_REQUEST);
//       throw new Error("there is Some Error");
//     } else {
//       await createAdmin.save();
//       // Save Id to Company
//       console.log(createAdmin._id, createAdmin.user_id);

//       const addid = await Company({
//         UserId: createAdmin._id,
//         UserObjectId: createAdmin.user_id,
//       });

//       if (addid) {
//         await addid.save();

//         console.log("create company");
//       }
//     }

//     return res
//       .status(StatusCodes.OK)
//       .json({ success: true, message: "successfully admin created" });
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// });

// module.exports = {
//   // GetAllCompany,
//   // EditCompany,
//   // RegisterCompany,
// };
const asyncHandler = require("express-async-handler");

const companyCtr = {
  createCompany: asyncHandler(async (req, res) => {
    try {
      // verify user
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User");
      }
      // create company
      const verifycompany = await Company.findOne({ UserId: user?.user_id });
      if (!verifycompany) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(
          "Your Company has still not registred please register now"
        );
      }
      if (verifycompany.length >= 2) {
        res.status(400);
        throw new Error("you can not registered 2 company");
      }

      const response = await Company({
        Company_Name: req.body.Company_Name,
        Company_Email: req.body.Company_Email,
        Address: req.body.Address,
        Postal_Code: req.body.Postal_Code,
        Phone: req.body.Phone,
        Company_Logo: req.body.Company_Logo,
        Employee_No: req.body.Employee_No,
        Established_date: req.body.Established_date,
        CompanyWesite: req.body.CompanyWesite,
        Tex_Number: req.body.Tex_Number,
        UserId: user.user_id,
      });

      if (!response) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("forebbidden");
      }
      await response.save();
      return res.status(StatusCodes.CREATED).json({
        status: StatusCodes.CREATED,
        message: "Company Added Successfully",
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  fetchCompany: asyncHandler(async (req, res) => {
    try {
      // user
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User");
      }
      // verify company

      const verifycompany = await Company.findOne({ UserId: user?.user_id });
      if (!verifycompany) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(
          "Your Company has still not registred please register now"
        );
      }

      const getcompany = await Company.find().lean().exec();
      if (!getcompany) {
        res.status(400);
        throw new Error("bad request");
      }

      const total = getcompany.length;
      return res.status(200).json({
        message: "fetch data successfully",
        companydata: total,
        success: true,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  GetVerifyCompany: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user).lean().exec();
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un authorized User please signup  ");
      }

      const verifycompany = await Company.findOne({ UserId: user?.user_id });
      if (!verifycompany) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(
          "Your Company has still not registred please register now"
        );
      }

      const getcompany = await Company.find().lean().exec();
      if (!getcompany) {
        res.status(400);
        throw new Error("bad request");
      }

      const totalcompany = getcompany?.countDocuments();
      console.log(totalcompany);
      return res.status(StatusCodes.OK).json({ message: "get verify company" });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  getcompany: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User");
      }
      // verify company

      const checkcompany = await Company.findOne({ UserId: user?.user_id });
      if (!checkcompany) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(
          "Your Company has still not registred please register now"
        );
      }

      return res
        .status(StatusCodes.OK)
        .json({ success: true, companydata: checkcompany });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = companyCtr;
