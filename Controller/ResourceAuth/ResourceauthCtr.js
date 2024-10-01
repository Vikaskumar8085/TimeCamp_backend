const asyncHandler = require("express-async-handler");
const Employee = require("../../Modals/EmployeeSchema");
const {StatusCodes} = require("http-status-codes");
const bcrypt = require("bcryptjs");
const generateToken = require("../../Auth/GenerateToken");

const ResourceauthCtr = {
  // resource login
  resourcelogin: asyncHandler(async (req, res) => {
    try {
      const authlogin = await Employee.findOne({
        Email: req.body.Email,
      }).select("+Password");

      const passwordIsCorrect = await bcrypt.compare(
        req.body.Password,
        authlogin.Password
      );
      if (!passwordIsCorrect) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("User and Password Invalid");
      }
      const token = await generateToken({id: authlogin._id});
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "login successfully",
        data: token,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  //   get users
  fetchresource: asyncHandler(async (req, res) => {
    try {
      const response = await Employee.findById(req.user);
      if (!response) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Resource not found");
      }
      return res
        .status(StatusCodes.OK)
        .json({success: true, resource: response});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = ResourceauthCtr;
