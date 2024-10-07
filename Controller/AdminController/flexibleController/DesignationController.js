const asyncHandler = require("express-async-handler");
const User = require("../../../Modals/userSchema");
const Company = require("../../../Modals/CompanySchema");
const {StatusCodes} = require("http-status-codes");
const Designation = require("../../../Modals/flexibleSchemas/Designation");

const DesignationController = {
  createdesignationctr: asyncHandler(async (req, res) => {
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

      //   add designation

      const addDesignation = await Designation({
        CompanyId: checkcompany?.Company_Id,
        Designation_Name: req.body.Designation_Name,
      });
      if (!addDesignation) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Designation does Not Found");
      }

      await addDesignation.save();

      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Designatin has been added successfully",
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  fetchdesignationctr: asyncHandler(async (req, res) => {
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

      // find designation
      const fetchdesignation = await Designation.find({
        CompanyId: checkcompany?.Company_Id,
      })
        .lean()
        .exec();
      if (!fetchdesignation) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Designation does Not Found");
      }

      return res
        .status(StatusCodes.OK)
        .json({result: fetchdesignation, success: true});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  editdesignationctr: asyncHandler(async (req, res) => {
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

      const desingationedit = await Designation.findByIdAndUpdate(
        {Designation_Id: req.params.id},
        req.body,
        {runValidator: true, new: true}
      );

      if (!desingationedit) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("desingation Not Found for updation");
      }

      return res
        .status(StatusCodes.OK)
        .json({success: true, message: "desingation successfully updated"});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  removedesignationctr: asyncHandler(async (req, res) => {
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

      const removedesignation = await Designation.findById({
        Designation_Id: req.params.id,
      })
        .lean()
        .exec();
      if (!removedesignation) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Designation does Not Found for deletion");
      } else {
        await removedesignation.deleteOne();
        return res.status(StatusCodes.OK).json({
          message: "designation deleted successfully",
          success: true,
        });
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = DesignationController;
