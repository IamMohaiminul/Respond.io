require("dotenv").config();
import mailService from "../services/mailService";
import productService from "../services/productService";

let replyGreeting = (received_message) => {
  // list of greetings
  const req = [
    "Hi".toLowerCase(),
    "Hello".toLowerCase(),
    "Good morning".toLowerCase(),
    "Hey there".toLowerCase(),
    "Good afternoon".toLowerCase(),
    "Good evening".toLowerCase(),
  ];

  // find the match of message from greetings
  const match = req.find((element) => {
    if (
      element.includes(
        received_message
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // remove punctuations from message
          .toLowerCase()
      )
    ) {
      return true;
    }
  });

  // Create the response for matched
  if (match) {
    // list of replies
    const resp = [
      "How are you?",
      "I hope you're doing well.",
      "I hope you're having a great day.",
      "It's a pleasure to meet you.",
      "It's good to see you.",
      "At your service!",
    ];

    // choose a random index
    const index = Math.floor(Math.random() * resp.length);

    // message with quick replies only for 1st index
    return index > 0
      ? { text: resp[index] }
      : {
          text: "How are you?",
          quick_replies: [
            {
              content_type: "text",
              title: `I'm fine`,
              payload: `I'm fine`,
            },
            {
              content_type: "text",
              title: `I'm good`,
              payload: `I'm good`,
            },
          ],
        };
  }

  // for unmatched message
  return { text: "Sorry, I'm still learning!" };
};

let replyDescription = async (product_sku) => {
  const { status, value } = await productService.findBySku(product_sku);

  if (status) {
    return {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: value.name,
              image_url: value.image,
              subtitle: value.description,
              default_action: {
                type: "web_url",
                url: value.url,
                webview_height_ratio: "tall",
              },
              buttons: [
                {
                  type: "web_url",
                  url: value.url,
                  title: "View Website",
                },
              ],
            },
          ],
        },
      },
    };
  } else {
    return {
      text: value,
    };
  }
};

let replyPrice = async (product_sku) => {
  const { status, value } = await productService.findBySku(product_sku);

  if (status) {
    return { text: `${value.name} Price: $${value.price}` };
  } else {
    return {
      text: value,
    };
  }
};

let replyShippingFee = async (product_sku) => {
  const { status, value } = await productService.findBySku(product_sku);

  if (status) {
    return { text: `${value.name} Shipping Fee: $${value.shipping}` };
  } else {
    return {
      text: value,
    };
  }
};

let replyBuy = async (product_sku) => {
  const { status, value } = await productService.findBySku(product_sku);

  if (status) {
    mailService.sendMail(
      process.env.MAIL_TO,
      `Purchase Order of ${value.sku}`,
      `<p>
      <b>SKU:</b> ${value.sku}<br />
      <b>Name:</b> ${value.name}<br />
      <b>Type:</b> ${value.type}<br />
      <b>Description:</b> ${value.description}<br />
      <b>Price:</b> $${value.price}<br />
      <b>Shipping Fee:</b> $${value.shipping}<br />
      <b>Manufacturer:</b> ${value.manufacturer}<br />
      <b>Model:</b> ${value.model}
    </p>`
    );
    return { text: `Thanks for purchasing ${value.name}!` };
  } else {
    return {
      text: value,
    };
  }
};

module.exports = {
  replyGreeting: replyGreeting,
  replyDescription: replyDescription,
  replyPrice: replyPrice,
  replyShippingFee: replyShippingFee,
  replyBuy: replyBuy,
};
