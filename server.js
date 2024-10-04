const express = require("express");
const cors = require("cors");
const path = require("path");
const cluster = require("cluster");
const os = require("os").cpus();
const http = require("http");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const router = require("./Router/Index");
const NodeCache = require("node-cache");
const nodecache = new NodeCache({});
const {
  NotFoundHandler,
  globalErrorHanadler,
} = require("./Middleware/ErrorHandlers");
const morgan = require("morgan");
require("./Config/dbconfig");

const Port = process.env.PORT || 8000;
const app = express();

// middleware

app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
// middleware

app.use("/api", router);
app.use(globalErrorHanadler);
app.use(NotFoundHandler);
app.use(express.static(path.join(__dirname, "uploads")));

// server started
const server = http.createServer(app);
if (cluster.isMaster) {
  for (var i = 0; i < os.length; i++) {
    cluster.fork();
  }
  cluster.on("exit", () => {
    console.log("exit server");
  });
} else {
  server.listen(Port, () => {
    console.log("server started on Port", Port);
  });
}

// const now = new Date();
// const formatter = new Intl.DateTimeFormat("en-US", {
//   hour: "2-digit",
//   minute: "2-digit",
//   hour12: false, // Use 24-hour time
// });
// const time = formatter.format(now);

// console.log(time); // e.g., "14:05" for 2:05 PM or "08:30" for 8:30 AM

// const moment = require("moment");

// // Get current time

// // Format time as HH:mm (24-hour format)
// const formattedTime = moment().format("HH:mm");

// console.log(formattedTime);
