const express = require("express");
const cors = require("cors");
const cluster = require("cluster");
const os = require("os").cpus();
const http = require("http");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const router = require("./Router/Index");
const {
  NotFoundHandler,
  globalErrorHanadler,
} = require("./Middleware/ErrorHandlers");
const morgan = require("morgan");
require("./Config/dbconfig");

const Port = process.env.PORT || 8000;
const app = express();

// middleware
// app.use(passport.initialize());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
// middleware

app.use("/api", router);
app.use(globalErrorHanadler);
app.use(NotFoundHandler);

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
