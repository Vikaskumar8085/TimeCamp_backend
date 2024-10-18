const express = require("express");
const clientController = require("../../../Controller/AdminController/ClientCtr");

const clientRouter = express.Router();

clientRouter.post("/");
clientRouter.get("/fetch-client", clientController.fetchallclient);
clientRouter.get("/get-inactive-client", clientController.getinactiveclient);
clientRouter.get("/get-active-client", clientController.getactiveClient);
clientRouter.get(
  "/fetch-client-projects/:id",
  clientController.fetchclientprojects
);
clientRouter.get("/get-dead-client", clientController.getdeadclient);
clientRouter.get("/fetch-single-client/:id", clientController.singleclients);
clientRouter.get("/get-client", clientController.fetchallclient);
clientRouter.post("/add-client", clientController.createClient);
clientRouter.delete("/remove-client", clientController.removeclient);

module.exports = clientRouter;
