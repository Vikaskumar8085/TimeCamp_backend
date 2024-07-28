const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const SendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  // Create Email Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vikas.infosense@gmail.com",
      pass: "lvvllkbwfysdmkzk",
    },
  });

  // Option for sending email
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  // send email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = SendEmail;
