const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: [true, "Please add a FirstName"],
  },
  LastName: {
    type: String,
    required: [true, "Please add a LastName"],
  },
  Email: {
    type: String,
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid emaial",
    ],
    required: [true, "Please add a email"],
  },
  Password: {
    type: String,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    return next();
  }
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});
const User = mongoose.modal("User", UserSchema);
module.exports = User;
