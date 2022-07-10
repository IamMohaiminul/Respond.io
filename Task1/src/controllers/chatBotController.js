require("dotenv").config();
import request from "request";
import replyService from "../services/replyService";

// Creates the endpoint for our webhook
let postWebhook = (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === "page") {
    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Return a '200 OK' response to all events
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

// Adds support for GET requests to our webhook
let getWebhook = (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

// Handles messages events
let handleMessage = async (sender_psid, received_message) => {
  let response;

  // Check if the message contains text
  if (received_message.text) {
    // Create the payload for Query Resolving
    if (received_message.text.startsWith("/")) {
      let [cmd, sku] = received_message.text.split(" ");
      switch (cmd) {
        case "/desc":
          response = await replyService.replyDescription(sku);
          break;
        case "/price":
          response = await replyService.replyPrice(sku);
          break;
        case "/shipping":
          response = await replyService.replyShippingFee(sku);
          break;
        case "/buy":
          response = await replyService.replyBuy(sku);
          break;
        default:
          response = {
            text: `Sorry, Unknown Command! Try again.`,
          };
      }
    } else {
      if (
        received_message["quick_reply"] &&
        received_message["quick_reply"]["payload"]
      )
        response = { text: "Sounds great!" };
      else response = replyService.replyGreeting(received_message.text);
    }
  }

  // Sends the response message
  callSendAPI(sender_psid, response);
};

// Handles messaging_postbacks events
let handlePostback = (sender_psid, received_postback) => {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // TODO: Set the response based on the postback payload

  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
};

// Sends response messages via the Send API
let callSendAPI = (sender_psid, response) => {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v14.0/me/messages",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};

module.exports = {
  postWebhook: postWebhook,
  getWebhook: getWebhook,
};
