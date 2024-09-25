const AsyncHandler = require("express-async-handler");
const Company = require("../../Modals/CompanySchema");
const User = require("../../Modals/userSchema");
const mongoose = require("mongoose");
const {StatusCodes} = require("http-status-codes");

// {
//   "FirstName": "Jane",
//   "LastName": "Smith",
//   "Email": "jane.smith@example.com",
//   "Role": "Admin",
//   "Password": "securePassword123"
// }

const adminCtr = {
  getalladmin: AsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }
      const getAdminuser = await Company.findOne({UserId: user?.user_id});
      if (!getAdminuser) {
      }
      const result = await User.aggregate([
        // Stage 2: Lookup to join with the Company collection
        {
          $lookup: {
            from: "companies", // The collection to join with
            localField: "user_id", // The field from the User collection
            foreignField: "UserId", // The field from the Company collection
            as: "companyDetails", // The output array field
          },
        },

        // Stage 3: Optionally, unwind the array if it contains a single document
        {
          $unwind: {
            path: "$companyDetails",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $project: {
            FirstName: 1,
            LastName: 1,
            Email: 1,
            Photo: 1,
            Role: 1,
          },
        },
      ]);

      return res.status(200).json({
        success: true,
        message: "successfully fetch adimn data",
        result: result,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  createadmin: AsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }

      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }
      const createuser = await User(req.body);
      if (!createuser) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("User not found");
      } else {
        await createuser.save();
        await Company.updateOne(
          {Company_Id: checkcompany?.Company_Id},
          {$push: {UserId: createuser.user_id}}
        );
      }

      return res
        .status(StatusCodes.CREATED)
        .json({success: true, message: "admin created successfully"});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = adminCtr;

// create admin
// const createAdmin = AsyncHandler(async (req, res) => {
//   try {
//     const user = await User.findById(req.user);
//     if (!user) {
//       res.status(StatusCodes.BAD_REQUEST);
//       throw new Error("User Not found please sign in");
//     }
//     // console.log(user.user_id, "userId");

//     const response = await User({
//       FirstName: req.body.FirstName,
//       LastName: req.body.LastName,
//       Phone: req.body.Phone,
//       Password: req.body.Password,
//       Email: req.body.Email,
//       Role: "Admin",
//       // user_id: uuidv4(),
//       // userRef_id: user.user_id,
//     });

//     if (response) {
//       await response.save();
//       return res.status(201).json({
//         success: true,
//         message: "Admin created successfully",
//       });
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// // getall admins

// const Getalladmin = AsyncHandler(async (req, res) => {
//   try {
//     // const { stud_name, sort, search } = req.query;
//     // var page = req.query.page * 1 || 1;
//     // var limit = req.query.limit * 1 || 5;
//     // var skip = (page - 1) * limit;

//     // var totalcount = await Curd.estimatedDocumentCount();
//     // var queryObj = {};
//     // if (sort) {
//     //   var sortfix = sort.replace(",", " ");
//     //   console.log(sortfix);
//     // }
//     // if (stud_name) {
//     //   queryObj.stud_name = stud_name;
//     // }

//     // if (search) {
//     //   queryObj.stud_name = { $regex: search, $options: "i" };
//     // }
//     const user = await User.findById(req.user);
//     if (!user) {
//       res.status(StatusCodes.BAD_REQUEST);
//       throw new Error("User Not found please sign in");
//     }
//     const { Role } = user;
//     const response = await User.find({ Role: "Admin" });

//     if (response) {
//       return res.status(201).json({
//         success: true,
//         message: response,
//       });
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// // remove admin
// const RemoveAdmin = AsyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(req.body);
//     if (!user) {
//       res.status(StatusCodes.BAD_REQUEST);
//       throw new Error("User Not found ! Please sign in");
//     }

//     const response = await User.findByIdAndDelete({ _id: id });
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
// const EditAdmin = AsyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(req.body);
//     if (!user) {
//       res.status(StatusCodes.BAD_REQUEST);
//       throw new Error("User Not found ! Please sign in");
//     }

//     const response = await User.findByIdAndUpdate({ _id: id }, req.body, {
//       new: true,
//       runValidator: true,
//     });
//     if (response) {
//       return res
//         .status(200)
//         .json({ success: true, message: "delete admin successfully" });
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// // Get single Admin
// const GetSingleAdmin = AsyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(req.body);
//     if (!user) {
//       res.status(StatusCodes.BAD_REQUEST);
//       throw new Error("User Not found ! Please sign in");
//     }

//     const response = await User.findById({ _id: id });
//     if (response) {
//       return res.status(200).json({ success: true, message: response });
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });
// module.exports = {
//   createAdmin,
//   Getalladmin,
//   RemoveAdmin,
//   EditAdmin,
//   GetSingleAdmin,
// };
