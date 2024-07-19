const http = require("http");
const os = require("os").cpus();
const express = require("express");
const cluster = require("cluster");
const cors = require("cors");
const router = require("./Router/Index");
const morgan = require("morgan");
const {
  globalErrorHanadler,
  NotFoundHandler,
} = require("./Middleware/ErrorHandlers");
require("./Config/dbconfig");

const app = express();
const server = http.createServer(app);

// middlewares
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
// middlewares

// api
app.use("/api", router);
// api

// Not Found Handler
app.use(NotFoundHandler);
app.use(globalErrorHanadler);

if (cluster.isMaster) {
  for (var i = 0; i < os.length; i++) {
    cluster.fork();
  }
  cluster.on("exit", () => {
    console.log("exit server");
  });
} else {
  server.listen(8000, () => {
    console.log("server started on Port", 8000);
  });
}
