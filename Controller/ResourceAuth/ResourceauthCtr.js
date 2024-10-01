const asyncHandler = require("express-async-handler");
const Employee = require("../../Modals/EmployeeSchema");
const {StatusCodes} = require("http-status-codes");

const ResourceauthCtr = {
  resourcelogin: asyncHandler(async (req, res) => {
    try {
      console.log(req.body, "req.body");
      const authlogin = await Employee.findOne({
        Email: req.body.Email,
        Password: req.body.Password,
      });
      return res.status(StatusCodes.OK).json(authlogin);
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = ResourceauthCtr;
