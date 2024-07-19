const AsyncHandler = require("express-async-handler");
// const User = require("../Modals/userSchema");

// Register Ctr

const RegisterCtr = AsyncHandler(async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password } = req.body;
    console.log(FirstName, LastName, Email, Password);

    const isEmail = Email.split(" ").join("");
    if (isEmail) {
      console.log(isEmail,"<<<<isEmail");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// login Ctr
const LoginCtr = AsyncHandler(async (req, res) => {
  try {
    const { Email, Password } = req.body;
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Logout Ctr

const logoutCtr = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

// Verify Otp

const VerifyOtpCtr = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

// Get Verify User

const GetVerifyUserCtr = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

// ChangePassword

const ChangePassword = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

// Reset Token Ctr

const ResetPassword = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

// ForgetPassword Ctr

const ForgetPasswordCtr = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

// Edit Users

const EditUsers = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

const ActiveUser = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

const DeActiveUser = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = {
  RegisterCtr,
  LoginCtr,
  logoutCtr,
  GetVerifyUserCtr,
  VerifyOtpCtr,
  ChangePassword,
  ResetPassword,
  EditUsers,
  ActiveUser,
  DeActiveUser,
};
