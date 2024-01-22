const nodemailer = require("nodemailer");
require("dotenv").config();
const { META_PASSWORD, META_USER } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_USER,
    pass: META_PASSWORD,
  },
});

module.exports = transporter;
