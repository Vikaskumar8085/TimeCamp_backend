const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./Router/Index");
const {
  NotFoundHandler,
  globalErrorHanadler,
} = require("./Middleware/ErrorHandlers");
require("./Config/dbconfig");

const Port = process.env.PORT || 8000;
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
// middleware

app.use("/api", router);
app.use(globalErrorHanadler);
app.use(NotFoundHandler);

app.listen(Port, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("server started ", Port);
  }
});
