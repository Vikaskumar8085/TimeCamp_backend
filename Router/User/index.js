const express = require("express");
const { RegisterCtr, LoginCtr } = require("../../Controller/UserController");
const { registerValidation, loginValidation } = require("../../Validations/userValidation");
const validator = require("express-joi-validation").createValidator({});
const UserRouter = express.Router();

UserRouter.post("/register", validator.body(registerValidation), RegisterCtr);
UserRouter.post("/login", validator.body(loginValidation), LoginCtr);

module.exports = UserRouter;
