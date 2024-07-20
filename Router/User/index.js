const express = require("express");
const {
  RegisterCtr,
  LoginCtr,
  GetUser,
  LoginStatus,
  ChangePassword,
  EditUsers,
} = require("../../Controller/UserController");
const {
  registerValidation,
  loginValidation,
} = require("../../Validations/userValidation");
const verifyToken = require("../../Auth/VerifyAuth");
const validator = require("express-joi-validation").createValidator({});
const UserRouter = express.Router();

UserRouter.post("/register", validator.body(registerValidation), RegisterCtr);
UserRouter.post("/login", validator.body(loginValidation), LoginCtr);
UserRouter.post("/change-password", ChangePassword);
UserRouter.get("/get-user", verifyToken, GetUser);
UserRouter.get("/loginStatus", verifyToken, LoginStatus);
UserRouter.post("/edit-user", verifyToken, EditUsers);

module.exports = UserRouter;
