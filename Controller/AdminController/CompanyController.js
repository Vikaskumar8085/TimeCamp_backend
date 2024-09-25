const Company = require("../../Modals/CompanySchema");
const {StatusCodes} = require("http-status-codes");
const User = require("../../Modals/userSchema");
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
      const verifycompany = await Company.find({UserId: user?.user_id});
      if (verifycompany.length >= 1) {
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
        success: true,
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

      const verifycompany = await Company.findOne({UserId: user?.user_id});
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

      const verifycompany = await Company.findOne({UserId: user?.user_id});
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
      return res.status(StatusCodes.OK).json({message: "get verify company"});
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

      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(
          "Your Company has still not registred please register now"
        );
      }

      return res
        .status(StatusCodes.OK)
        .json({success: true, companydata: checkcompany});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = companyCtr;
