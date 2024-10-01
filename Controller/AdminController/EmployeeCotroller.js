const asyncHandler = require("express-async-handler");
const Employee = require("../../Modals/EmployeeSchema");
const bcrypt = require("bcryptjs");
const User = require("../../Modals/userSchema");
const Company = require("../../Modals/CompanySchema");
const {StatusCodes} = require("http-status-codes");
const Project = require("../../Modals/ProjectSchema");

const employeeController = {
  // create
  createemployee: asyncHandler(async (req, res) => {
    // // check user
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
      const genhash = await bcrypt.genSalt(12);
      const hashpassword = await bcrypt.hash(req.body.Password, genhash);
      const newEmployee = await Employee({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Address: req.body.Address,
        Phone: req.body.Phone,
        Designation: req.body.Designation,
        Password: hashpassword,
        CompanyId: checkcompany?.Company_Id,
        Role: "Employee",
        UserId: user?.user_id,
      });

      if (!newEmployee) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("bad Requests");
      }
      await newEmployee.save();

      res.status(201).json({
        message: "Employee created successfully",
        success: true,
      });
    } catch (error) {
      res
        .status(400)
        .json({message: "Error creating employee", error: error.message});
    }
  }),
  // get employee
  fetchemployee: asyncHandler(async (req, res) => {
    try {
      console.log(req.user);
      const user = await User.findById(req.user);

      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un authorized user Please Signup");
      }
      // console.log(user);
      // check company
      const checkcompany = await Company.findOne({UserId: user?.user_id});

      if (!checkcompany) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("company does not exists please create your company");
      }

      const fetchallemployee = await Employee.find({
        CompanyId: checkcompany.Company_Id,
        Role: "Employee",
      });

      if (!fetchallemployee) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Employe Not found");
      }
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "fetch employee data successfully",
        result: fetchallemployee,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // remove employee

  removeemployee: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  editemployee: asyncHandler(async (req, res) => {
    try {
    } catch (error) {}
  }),

  sigleemployee: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Un authorized user Please Signup");
      }
      // console.log(user);
      // check company
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("company does not exists please create your company");
      }

      const employeeProfile = await Employee.findOne({
        EmployeeId: req.params.id,
      });
      if (!employeeProfile) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Not found Employee");
      }

      return res
        .status(StatusCodes.OK)
        .json({result: employeeProfile, success: true});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  fetchemplolyeeProjects: asyncHandler(async (req, res) => {
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

      const employeeprojects = await Project.find({
        "RoleResource.RRId": req.params.id,
      });
      if (!employeeprojects) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Employee projects Not Found");
      }
      return res
        .status(StatusCodes.OK)
        .json({result: employeeprojects, success: true});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = employeeController;
