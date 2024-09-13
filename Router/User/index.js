const express = require("express");
const {
  RegisterCtr,
  LoginCtr,
  GetUser,
  LoginStatus,
  ChangePassword,
  EditUsers,
  VerifyCtr,
  forgetPassword,
  ForgetPasswordCtr,
  GoogleAuthCtr,
  ResetPassword,
  getuserall,
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
UserRouter.post("/change-password", verifyToken, ChangePassword);
UserRouter.get("/get-user", verifyToken, GetUser);
UserRouter.get("/loginStatus", verifyToken, LoginStatus);
UserRouter.post("/edit-user", verifyToken, EditUsers);
UserRouter.post("/google-auth", GoogleAuthCtr);
UserRouter.post("/forget", ForgetPasswordCtr);
UserRouter.get("/verify/:token", VerifyCtr);
UserRouter.put("/reset-password/:resetToken", ResetPassword);
UserRouter.get("/get-all-user", getuserall);

module.exports = UserRouter;
