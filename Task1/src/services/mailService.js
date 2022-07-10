require("dotenv").config();
import nodemailer from "nodemailer";

let sendMail = async (to, subject, body) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "ChatBot <bot@mail.com>",
    to: to,
    subject: subject,
    html: body,
  });

  console.log("Message sent: ", info.messageId);
};

module.exports = {
  sendMail: sendMail,
};
