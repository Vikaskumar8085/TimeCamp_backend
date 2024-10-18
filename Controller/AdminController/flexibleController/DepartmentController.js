const asyncHandler = require("express-async-handler");
const User = require("../../../Modals/userSchema");
const Company = require("../../../Modals/CompanySchema");
const {StatusCodes} = require("http-status-codes");
const Department = require("../../../Modals/flexibleSchemas/Department");

const DepartmentController = {
  createdepartmentctr: asyncHandler(async (req, res) => {
    try {
      // check users
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
      // create department

      const addDepartment = await Department({
        CompanyId: checkcompany.Company_Id,
        Department_Name: req.body.Department_Name,
      });

      if (!addDepartment) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Department Not found ");
      }

      await addDepartment?.save();

      return res
        .status(StatusCodes.CREATED)
        .json({message: "department created successfully", success: true});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  fetchdepartmentctr: asyncHandler(async (req, res) => {
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
      const {search, filter, skip = 0, limit = 10} = req.query; // Default skip=0, limit=10

      // Parse and sanitize the input for filtering
      const parsedSkip = parseInt(skip);
      const parsedLimit = parseInt(limit);

      // pagination

      let query = {CompanyId: req.checkcompany.Company_Id}; // Ensure the CompanyId is correct

      // Search functionality - case-insensitive regex for department name and description
      if (search) {
        query.$or = [
          {departmentName: {$regex: search, $options: "i"}}, // Case-insensitive search in departmentName
          {description: {$regex: search, $options: "i"}}, // Case-insensitive search in description
        ];
      }
      // pagination

      const fetchdepartment = await Department.find(query)
        .skip(parsedSkip)
        .limit(parsedLimit);

      if (!fetchdepartment) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("department Not found");
      }

      res.status(StatusCodes.OK).json({result: fetchdepartment, success: true});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  editdepartmentctr: asyncHandler(async (req, res) => {
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

      const editdepartment = await Department.findByIdAndUpdate(
        {Department_Id: req.params.id},
        req.body,
        {runValidator: true, new: true}
      );

      if (!editdepartment) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Department Not Found for updation");
      }

      return res
        .status(StatusCodes.OK)
        .json({message: "department updated successfully", success: true});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  removedepartmentctr: asyncHandler(async (req, res) => {
    try {
      // user
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

      // deleted

      const removedepartment = await Department.findById({
        Department_Id: req.params.id,
      });

      if (!removedepartment) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Department Not Found for deletion");
      } else {
        await removedepartment.deleteOne();
        return res
          .status(StatusCodes.OK)
          .json({message: "department deleted successfully", success: true});
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = DepartmentController;
