const AsyncHandler = require("express-async-handler");
const Company = require("../../Modals/CompanySchema");
const User = require("../../Modals/userSchema");
const {StatusCodes} = require("http-status-codes");

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
  blockadminctr: AsyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  unblockadminctr: AsyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = adminCtr;
