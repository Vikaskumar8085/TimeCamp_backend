const mongoose = require("mongoose");

(async function () {
  try {
    const dbconnect = await mongoose.connect("");
    if (dbconnect) {
      console.log("db connected");
    } else {
      console.log("db not connected");
    }
  } catch (error) {
    throw new Error(error.message);
  }
})();
