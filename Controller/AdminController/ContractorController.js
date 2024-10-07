const asyncHandler = require("express-async-handler");
const User = require("../../Modals/userSchema");
const {StatusCodes} = require("http-status-codes");
const Employee = require("../../Modals/EmployeeSchema");
const Company = require("../../Modals/CompanySchema");
const bcrypt = require("bcryptjs");

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
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company does not exists");
      }

      // hash password

      const genhash = await bcrypt.genSalt(12);
      const hashpassword = await bcrypt.hash(req.body.Password, genhash);

      // create contractor
      const addItem = await Employee({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Address: req.body.Address,
        Phone: req.body.Phone,
        Designation: req.body.Designation,
        Password: hashpassword,
        CompanyId: checkcompany?.Company_Id,
        UserId: user?.user_id,
        Role: "Contractor",
      });
      if (!addItem) {
        res.status(StatusCodes?.NOT_FOUND);
        throw new Error("contractor not found");
      }

      await addItem.save();
      return res
        .status(StatusCodes?.CREATED)
        .json({success: true, message: "contractor created successfully"});
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

      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company does not exists");
      }
      // get all contractor
      const fetchcontractor = await Employee.find({
        CompanyId: checkcompany.Company_Id,
        Role: "Contractor",
      });
      if (!fetchcontractor) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Not found contractor");
      }

      return res
        .status(StatusCodes.OK)
        .json({result: fetchcontractor, success: true});
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
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un authorized user Please Signup");
      }
      // check company
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("company does not exists please create your company");
      }
      const contractorprofile = await Employee.findOne({
        EmployeeId: req.params.id,
      });
      if (!contractorprofile) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Not found Employee");
      }
      return res
        .status(StatusCodes.OK)
        .json({result: contractorprofile, success: true});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // fetch ative contractor

  fetchactiveContractor: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User");
      }
      //  check company

      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company does not exists");
      }

      // fetch active contractor
      const result = await Employee.find({
        CompanyId: checkcompany.Company_Id,
        Role: "Contractor",
        IsActive: "Active",
      });

      if (!result) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Not found Active contractor");
      }

      return res.status(StatusCodes.OK).json({success: true, result: result});
    } catch (error) {
      throw new Error(error.message);
    }
  }),

  // fetch in active contractor

  fetchinactiveContractor: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un Authorized User");
      }
      //  check company

      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company does not exists");
      }

      // fetch active contractor
      const result = await Employee.find({
        CompanyId: checkcompany.Company_Id,
        Role: "Contractor",
        IsActive: "InActive",
      });

      if (!result) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Not found InActive contractor");
      }

      return res.status(StatusCodes.OK).json({success: true, result: result});
    } catch (error) {
      throw new Error(error.message);
    }
  }),
};
module.exports = contractorController;
