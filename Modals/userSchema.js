const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  FirstName: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your FirstName"],
  },
  LastName: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your LastName"],
  },
  Email: {
    type: String,
    // unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid emaial",
    ],
    required: [true, "Please enter your  email"],
  },
  Password: {
    type: String,
    maxLength: 100,
    minLength: 6,
    required: [true, "Please enter your Password"],
  },
  Photo: {
    type: String,
    required: [true, "Please add a photo"],
    default: "https://i.ibb.co/4pDNDk1/avatar.png",
  },
  Role: {
    type: String,
    enum: ["Admin", "Manager", "Employee", "Contractor"],
    default: "Admin",
  },
  Activity: {
    type: Boolean,
    required: true,
    default: false,
  },
  BlockStatus: {
    type: String,
    enum: ["Block", "Unblock"],
    default: "Unblock",
  },
  Term: {
    type: Boolean,
    required: true,
    default: false,
  },
  otp: {
    type: String,
    required: true,
    default: false,
  },
  user_id: {
    type: String,
    // required: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
