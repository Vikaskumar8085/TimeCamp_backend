const mongoose = require("mongoose");
require("dotenv").config();
(async function () {
  try {
    const dbconnect = await mongoose.connect(process.env.DB);
    if (dbconnect) {
      console.log("db connected");
    } else {
      console.log("db not connected");
    }
  } catch (error) {
    console.log(error.message);
  }
})();
