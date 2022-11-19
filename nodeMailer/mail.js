"use strict";
const nodemailer=require("nodemailer");
var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "hase271002@gmail.com",
      pass: "eshfzdgfepgrxaio",
    },
  });

  module.exports=transporter;