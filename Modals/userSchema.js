const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({});

const User = mongoose.modal("User", UserSchema);
module.exports = User;
