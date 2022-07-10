import express from "express";
import chatBotController from "../controllers/chatBotController";
import indexController from "../controllers/indexController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", indexController.getHomepage);
  router.get("/webhook", chatBotController.getWebhook);
  router.post("/webhook", chatBotController.postWebhook);

  return app.use("/", router);
};

module.exports = initWebRoutes;
