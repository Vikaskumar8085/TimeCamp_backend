const AsyncHandler = require("express-async-handler");
const {StatusCodes} = require("http-status-codes");
const User = require("../Modals/userSchema");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Token = require("../Modals/TokenSchema");
const generateToken = require("../Auth/GenerateToken");
const jwt = require("jsonwebtoken");
const SendEmail = require("../Utils/SendEmail");
const {v4: uuidv4} = require("uuid");
const axios = require("axios");
const Company = require("../Modals/CompanySchema");
require("../Config/dbconfig");
require("dotenv").config();

// Register Ctr

const RegisterCtr = AsyncHandler(async (req, res) => {
  try {
    const {FirstName, LastName, Email, Password, Term} = req.body;
    const genhash = await bcrypt.genSalt(12);
    const hashpassword = await bcrypt.hash(Password, genhash);
    const userExists = await User.findOne({Email: req.body.Email});
    if (userExists) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("Email has already been registered");
    }
    const resp = await User({
      FirstName,
      LastName,
      Email,
      Password: hashpassword,
      Term,
    });

    if (resp) {
      await resp.save();

      const hashgen = crypto.randomBytes(32).toString("hex") + resp._id;
      const hash = crypto.createHash("sha256").update(hashgen).digest("hex");
      const saveToken = await Token({
        userId: resp._id,
        token: hash,
        createdAt: Date.now(),
        expireAt: Date.now() + 30 * 60 * 1000, // 30 min expire
      });
      await saveToken.save();
      const send_to = resp.Email;
      const subject = "verification mail from Timecamp team";
      const message = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header img {
            max-width: 100px;
            height: auto;
        }
        .content {
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 14px;
            color: #666666;
        }
        .footer a {
            color: #0066cc;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://example.com/logo.png" alt="Company Logo">
        </div>
        <div class="content">
            <h1>Hello [Recipient's Name],</h1>
            <p>We hope this email finds you well. here is your verify link  <a href="http://localhost:3000/verify/${hash}">http://localhost:3000/verify</a></p>
            <p>Thank you for your attention!</p>
            <p>Best regards,<br>Time Camp</p>
        </div>
        <div class="footer">
            <p>If you no longer wish to receive these emails, you can .</p>
            <p>1234 Street Address, City, State, ZIP</p>
        </div>
    </div>
</body>
</htm>`;
      // const message = `here is your verify link  <a href="http://localhost:3000/verify/${hash}">http://localhost:3000/verify</a>`;
      const mailsend = await SendEmail(send_to, subject, message);
      if (mailsend) {
        console.log("mail send");
      }

      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "registration completed ! please check your mail",
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "registration failed",
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// login Ctr
const LoginCtr = AsyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({
      Email: req.body.Email,
    }).select("+Password");

    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED);
      throw new Error("User and Password Invalid !");
    }
    if (user.isVerify === false) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("your email is not verified please verify your mail");
    }

    if (user.BlockStatus === "Block") {
      res.status(503);
      throw new Error("Please Connect with Your Admin And super Admin");
    }

    // check if user data exists,

    // User exists, check if password is correct
    const passwordIsCorrect = await bcrypt.compare(
      req.body.Password,
      user.Password
    );
    if (!passwordIsCorrect) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("User and Password Invalid");
    }

    const token = await generateToken({id: user._id});
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

// google Auth

const GoogleAuthCtr = AsyncHandler(async (req, res) => {
  try {
    console.log(req.body.access_token, "access_token");
    if (req.body.access_token) {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.body.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${req.body.access_token}`,
          },
        }
      );

      if (response) {
        const checkUser = await User.findOne({Email: response.data?.email});
        if (!checkUser) {
          await User({
            FirstName: response?.data?.given_name,
            LastName: response?.data?.family_name,
            Email: response?.data?.email,
            isVerify: response?.data?.verified_email,
            Photo: response?.data?.picture,
            Role: "Admin",
            user_id: response?.data?.id,
            Term: true,
          }).save();
        }
      }

      const user = await User.findOne({Email: response.data?.email});
      if (user) {
        const TOKEN = await generateToken({id: user._id});
        return res.status(200).json({success: true, message: TOKEN});
      }
    }
  } catch (error) {
    throw new Error(error.message);
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

const VerifyCtr = AsyncHandler(async (req, res) => {
  try {
    const {token} = req.params;

    if (!token) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({message: "Token Not Found"});
    }

    const checktoken = await Token.findOne({
      token: token,
      expireAt: {$gte: Date.now()},
    });
    if (!checktoken) {
      return res.status(400).json("token has been exprired");
    }

    const user = await User.findById({_id: checktoken.userId});
    if (user) {
      await User.updateOne({isVerify: true});
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
});

// ChangePassword
const ChangePassword = AsyncHandler(async (req, res) => {
  try {
    const {oldPassword, Password} = req.body;
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

const ForgetPasswordCtr = AsyncHandler(async (req, res) => {
  const resp = await User.findOne({Email: req.body.Email});

  if (!resp) {
    res.status(404);
    throw new Error("User does not exist");
  }

  // Delete token if it exists in DB
  let token = await Token.findOne({userId: resp._id});
  if (token) {
    await token.deleteOne();
    await new Token({
      userId: resp._id,
      token: hashedToken,
      createdAt: Date.now(),
      expireAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
    }).save();
  }

  // Create Reste Token
  let resetToken = crypto.randomBytes(32).toString("hex") + resp._id;
  console.log(resetToken);

  // Hash token before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Save Token to DB

  // Construct Reset Url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Reset Email
  const message = `
      <h2>Hello ${resp.FirstName}</h2>
      <p>Please use the url below to reset your password</p>
      <p>This reset link is valid for only 30minutes.</p>

      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

      <p>Regards...</p>
      <p>Ignitive Team</p>
    `;
  const subject = "Password Reset Request";
  const send_to = resp.Email;

  const mailsend = await SendEmail(subject, message, send_to);
  if (mailsend) {
    console.log("mailsend");
  }
  try {
    res.status(200).json({success: true, message: "Reset Email Sent"});
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

// Reset Token Ctr

const ResetPassword = AsyncHandler(async (req, res) => {
  const {password} = req.body;
  const {resetToken} = req.params;

  // Hash token, then compare to Token in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // fIND tOKEN in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: {$gt: Date.now()},
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }
  // Find user
  const user = await User.findOne({_id: userToken.userId});
  user.password = password;
  await user.save();
  res.status(200).json({
    message: "Password Reset Successful, Please Login",
  });
});
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
      const {FirstName, LastName, Email, Password} = user;
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

// block user

const getuserall = AsyncHandler(async (req, res) => {
  try {
    // const checkuser = await User.findById(req.user);
    // if (!checkuser) {
    //   res.status(StatusCodes.UNAUTHORIZED);
    //   throw new Error("Invalid User Please Login");
    // }
    User.aggregate([
      {
        $lookup: {
          from: "users", // The collection to join with
          localField: "UserId", // Field from the Company collection
          foreignField: "user_id", // Field from the User collection
          as: "userDetails", // Output array field for joined data
        },
      },
    ])
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.error(err);
      });

    // const user = await User.findByIdAndUpdate(req.user, req.body, {
    //   new: true,
    //   runValidatre: true,
    // });

    // if (user) {
    //   return res.status(200).status({ message: "blocked user" });
    // }
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = {
  RegisterCtr,
  LoginCtr,
  logoutCtr,
  LoginStatus,
  GetUser,
  ForgetPasswordCtr,
  VerifyCtr,
  ChangePassword,
  GoogleAuthCtr,
  ResetPassword,
  EditUsers,
  getuserall,
};

// //    if (sort) {
//   var sortfix = sort.replace(",", " ");
//   console.log(sortfix);
// }
// if (stud_name) {
//   queryObj.stud_name = stud_name;
// }

// if (search) {
//   queryObj.stud_name = { $regex: search, $options: "i" };
// }
