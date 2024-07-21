const AsyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../Modals/userSchema");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const generateToken = require("../Auth/GenerateToken");
const jwt = require("jsonwebtoken");
require("../Config/dbconfig");

// Register Ctr

const RegisterCtr = AsyncHandler(async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password, Term, user_id } = req.body;

    const genhash = await bcrypt.genSalt(12);
    const hashpassword = await bcrypt.hash(Password, genhash);
    // Check if user email already exists
    const userExists = await User.findOne({ Email });
    if (userExists) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("Email has already been registered");
    } else {
      // const hashgen = crypto.randomBytes(32).toString("hex")+;
      // const hash = crypto.createHash("sha256").update(hashgen).digest("hex");
      // const saveToken = await Token({
      //   userId: userregister._id,
      //   token: hash,
      //   createdAt: Date.now(),
      //   expireAt: Date.now() + 30 * 60 * 1000, // 30 min expire
      // });
      // await saveToken.save();
      // const send_to = userregister.email;
      // const subject = "verify your mail ";
      // const message = `  here is your verify link  <a href="http://localhost:3000/verify/${hash}">http://localhost:3000/verify</a>`;
      // const mailsend = await mail(send_to, subject, message);
      // if (mailsend) {
      //   console.log("mail send");
      // }
    }

    const resp = await User({
      FirstName,
      LastName,
      Email,
      Password: hashpassword,
      Term,
      user_id,
    });

    if (resp) {
      await resp.save();
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "registion complete",
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json("not saved");
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error?.message);
  }
});

// login Ctr
const LoginCtr = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({
      Email: req.body.Email,
    })
      .select("+Password")
      .exec();

    // check if user data exists,
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("User and Password Invalid !");
    }

    // User exists, check if password is correct
    const passwordIsCorrect = await bcrypt.compare(
      req.body.Password,
      user.Password
    );
    if (!passwordIsCorrect) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("User and Password Invalid");
    }

    const token = await generateToken({ id: user._id });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "login successfully",
      data: token,
    });
  } catch (error) {
    throw new Error(error?.message);
  }
});

// Logout Ctr

const logoutCtr = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new Error(error?.message);
  }
});

// login status

const LoginStatus = AsyncHandler(async (req, res) => {
  try {
    const token = await req.headers.authorization.replace(/^Bearer\s/, "");
    if (!token) {
      return res.json(false);
    }
    console.log(token);
    // Verify Token
    const verified = jwt.verify(token, process.env.SECRET);
    if (verified) {
      return res.json({
        success: true,
        message: true,
      });
    }
  } catch (error) {
    throw new Error(error?.message);
  }
});

// Get Verify User

const GetUser = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (user) {
      res.status(200).json({
        success: true,
        message: user,
      });
    } else {
      res.status(400);
      throw new Error("User Not Found");
    }
  } catch (error) {
    throw new Error(error?.message);
  }
});

// Verify Otp

// const VerifyOtpCtr = AsyncHandler(async (req, res) => {
//   try {
//     const { token } = req.params;
//     console.log(token);

//     if (!token) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ message: "Token Not Found" });
//     }

//     const checktoken = await Token.findOne({
//       token: token,
//       expireAt: { $gte: Date.now() },
//     });
//     if (!checktoken) {
//       return res.status(400).json("token has been exprired");
//     }

//     const user = await User.findById({ _id: checktoken.userId });
//     if (user) {
//       await User.updateOne({ isVerify: true });
//     }

//     return res.status(StatusCodes.OK).json("user Verified");
//   } catch (error) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
//   }
// });

// ChangePassword
const ChangePassword = AsyncHandler(async (req, res) => {
  try {
    const { oldPassword, Password } = req.body;
    const user = await User.findById(req.user);

    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED);
      throw new Error("User not found, please signup");
    }
    if (!oldPassword || !Password) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("Please add old and new password");
    }

    // check if old password matches password in DB
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.Password);
    // Save new password
    if (user && passwordIsCorrect) {
      user.Password = Password;
      await user.save();
      res.status(StatusCodes.OK).send("Password change successful");
    }
  } catch (error) {
    throw new Error(error?.message);
  }
});

// ForgetPassword Ctr

// const ForgetPasswordCtr = AsyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     res.status(404);
//     throw new Error("User does not exist");
//   }

//   // Delete token if it exists in DB
//   let token = await Token.findOne({ userId: user._id });
//   if (token) {
//     await token.deleteOne();
//   }

//   // Create Reste Token
//   let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
//   console.log(resetToken);

//   // Hash token before saving to DB
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // Save Token to DB
//   await new Token({
//     userId: user._id,
//     token: hashedToken,
//     createdAt: Date.now(),
//     expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
//   }).save();

//   // Construct Reset Url
//   const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

//   // Reset Email
//   const message = `
//       <h2>Hello ${user.name}</h2>
//       <p>Please use the url below to reset your password</p>
//       <p>This reset link is valid for only 30minutes.</p>

//       <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

//       <p>Regards...</p>
//       <p>Pinvent Team</p>
//     `;
//   const subject = "Password Reset Request";
//   const send_to = user.email;
//   const sent_from = process.env.EMAIL_USER;

//   try {
//     await sendEmail(subject, message, send_to, sent_from);
//     res.status(200).json({ success: true, message: "Reset Email Sent" });
//   } catch (error) {
//     res.status(500);
//     throw new Error("Email not sent, please try again");
//   }
// });

// Reset Token Ctr

// const ResetPassword = AsyncHandler(async (req, res) => {
//   const { password } = req.body;
//   const { resetToken } = req.params;

//   // Hash token, then compare to Token in DB
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // fIND tOKEN in DB
//   const userToken = await Token.findOne({
//     token: hashedToken,
//     expiresAt: { $gt: Date.now() },
//   });

//   if (!userToken) {
//     res.status(404);
//     throw new Error("Invalid or Expired Token");
//   }

//   // Find user
//   const user = await User.findOne({ _id: userToken.userId });
//   user.password = password;
//   await user.save();
//   res.status(200).json({
//     message: "Password Reset Successful, Please Login",
//   });
// });
// Edit Users

const EditUsers = AsyncHandler(async (req, res) => {
  try {
    const existsuser = await User.findById(req.user);
    if (!existsuser) {
      res.status(StatusCodes.UNAUTHORIZED);
      throw new Error("Invalid User Please Login");
    }

    const user = await User.findById(req.user);

    if (user) {
      const { FirstName, LastName, Email, Password } = user;
      user.Email = Email;
      user.FirstName = req.body.FirstName || FirstName;
      user.LastName = req.body.LastName || LastName;
      user.Password = req.body.Password || Password;

      await user.save();
      res.status(StatusCodes.OK).json({
        success: true,
        message: "update successfully",
      });
    } else {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error(error?.message);
  }
});

// const ActiveUser = AsyncHandler(async (req, res) => {
//   try {
//   } catch (error) {}
// });

// const DeActiveUser = AsyncHandler(async (req, res) => {
//   try {
//   } catch (error) {}
// });

// const PassLogin =  AsyncHandler(async (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) return next(err);
//     //check if user not found
//     if (!user) {
//       return res.status(401).json({ message: info.message });
//     }
//     //generate token
//     const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET);
//     //set the token into cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000, //1 day
//     });

//     //send the response
//     res.json({
//       status: "success",
//       message: "Login Success",
//       username: user?.username,
//       email: user?.email,
//       _id: user?._id,
//     });
//   })(req, res, next);
// }),

// const googleAuth= passport.authenticate("google", { scope: ["profile"] }),
// ! GoogleAuthCallback
// const googleAuthCallback= AsyncHandler(async (req, res, next) => {
//   passport.authenticate(
//     "google",
//     {
//       failureRedirect: "/login",
//       session: false,
//     },
//     (err, user, info) => {
//       if (err) return next(err);
//       if (!user) {
//         return res.redirect("http://localhost:5173/google-login-error");
//       }
//       //generate the token

//       const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
//         expiresIn: "3d",
//       });
//       //set the token into the cooke
//       res.cookie("token", token, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "strict",
//         maxAge: 24 * 60 * 60 * 1000, //1 day:
//       });
//       //redirect the user dashboard
//       res.redirect("http://localhost:5173/dashboard");
//     }
//   )(req, res, next);
// }),
// ! check user authentication status
// const checkAuthenticated=AsyncHandler(async (req, res) => {
//   const token = req.cookies["token"];
//   if (!token) {
//     return res.status(401).json({ isAuthenticated: false });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     //find the user
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(401).json({ isAuthenticated: false });
//     } else {
//       return res.status(200).json({
//         isAuthenticated: true,
//         _id: user?._id,
//         username: user?.username,
//         profilePicture: user?.profilePicture,
//       });
//     }
//   } catch (error) {}
//   return res.status(401).json({ isAuthenticated: false, error });
// }),

module.exports = {
  RegisterCtr,
  LoginCtr,
  logoutCtr,
  LoginStatus,
  GetUser,
  // VerifyOtpCtr,
  ChangePassword,
  // ResetPassword,
  EditUsers,
};
