const AsyncHandler = require("express-async-handler");
const User = require("../Modals/userSchema");

// Register Ctr

const RegisterCtr = AsyncHandler(async (req, res) => {
  console.log(req.body);
  const response = await User(req.body);
  console.log(response);
  if (response) {
    await response.save();
    return res.status(201).json("Data Succesfully Created");
  } else {
    return res.status(400).json("data not  registered");
  }
});

// login Ctr
const LoginCtr = AsyncHandler(async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const response = await User.findOne({ Email: Email, Password: Password });
    if (response) {
      console.log(response);
      return res.status(200).json("login successfully");
    }
  } catch (error) {
    return res.status(500).json(error?.message);
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
  } catch (error) {
    throw new Error(error?.message);
  }
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
