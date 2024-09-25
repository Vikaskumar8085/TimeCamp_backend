const asyncHandler = require("express-async-handler");
const User = require("../../Modals/userSchema");
const {StatusCodes} = require("http-status-codes");
const Employee = require("../../Modals/EmployeeSchema");

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
      // create contractor
      const addItem = await Employee({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Address: req.body.Address,
        Phone: req.body.Phone,
        Designation: req.body.Designation,
        Password: req.body.Password,
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
        Company_Id: checkcompany.Company_Id,
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
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};
module.exports = contractorController;
