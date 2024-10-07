const asyncHandler = require("express-async-handler");
const User = require("../../../Modals/userSchema");
const Company = require("../../../Modals/CompanySchema");
const {StatusCodes} = require("http-status-codes");
const Role = require("../../../Modals/flexibleSchemas/Role");

const Rolecontroller = {
  createrolectr: asyncHandler(async (req, res) => {
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

      const addrole = await Role({
        CompanyId: checkcompany.company_id,
        RoleName: req.body.RoleName,
      });
      if (!addrole) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Role Not Found");
      }

      await addrole.save();

      return res
        .status(StatusCodes.CREATED)
        .json({success: true, message: "role has been added successfully"});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  fetchrolectr: asyncHandler(async (req, res) => {
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

      const fetchrole = await Role.find({
        CompanyId: checkcompany.Company_Id,
      }).lean();

      if (!fetchrole) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Bad Request");
      }

      return res
        .status(StatusCodes.OK)
        .json({success: true, result: fetchrole});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  removerolectr: asyncHandler(async (req, res) => {
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

      const removerole = await Role.findById({Role_Id: req.params.id});
      if (!removerole) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Role does not found for deletion");
      } else {
        await removerole.deleteOne();

        return res
          .status(StatusCodes.OK)
          .json({success: true, message: "role successfully deleted"});
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  editrolectr: asyncHandler(async (req, res) => {
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

      const editRole = await Role.findByIdAndUpdate(
        {Role_Id: req.params.id},
        req.body,
        {runValidator: true, new: true}
      );

      if (!editRole) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Role Not Found for updation");
      }

      return res
        .status(StatusCodes.OK)
        .json({success: true, message: "role successfully updated"});
    } catch (error) {
      throw new Error(error.message);
    }
  }),
};

module.exports = Rolecontroller;
