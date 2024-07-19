const mongoose = require("mongoose");

(async function () {
  try {
    const dbconnect = await mongoose.connect(
      "mongodb://localhost:27017/TimeCamp",
      {
        useNewUrlParser: true,
      }
    );
    if (dbconnect) {
      console.log("db connected");
    } else {
      console.log("db not connected");
    }
  } catch (error) {
    throw new Error(error.message);
  }
})();
