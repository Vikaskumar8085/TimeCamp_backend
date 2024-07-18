const http = require("http");
const os = require("os");
const express = require("express");
const cluster = require("cluster");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
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

const server = http.createServer({ app });
if (cluster.isMaster) {
  for (var i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
  cluster.on("exit", () => {
    console.log("server disconneted");
  });
} else {
  server.listen(() => {
    console.log("server started");
  });
}
