const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function SendEmail(send_to, subject, message) {
  console.log(send_to, subject);

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: send_to, // list of receivers
    subject: subject, // Subject line
    html: message, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = SendEmail;
