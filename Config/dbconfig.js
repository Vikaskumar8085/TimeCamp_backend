const mongoose = require("mongoose");
require("dotenv").config();
(async function () {
  try {
    const dbconnect = await mongoose.connect(
      "mongodb://127.0.0.1:27017/testdb"
    );
    if (dbconnect) {
      console.log("db connected");
    } else {
      console.log("db not connected");
    }
  } catch (error) {
    console.log(error.message);
  }
})();
