const express = require("express");
const { RegisterCtr } = require("../../Controller/UserController");
const { registerValidation } = require("../../Validations/userValidation");
const validator = require("express-joi-validation").createValidator({});
const UserRouter = express.Router();

UserRouter.post("/register", validator.body(registerValidation), RegisterCtr);

module.exports = UserRouter;
