const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config;
const Mailgen = require("mailgen");
exports.sendMail = (data) => {
  const config = {
    service: "gmail",
    auth: {
      user: "shahalamsharif2015@gmail.com",
      pass: "gljdnvygtwdnaudg",
    },
  };

  const transporter = nodemailer.createTransport(config);

  const MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  const response = {
    body: {
      name: "OTP verification",
      intro: "Your OTP verification mail",
      table: {
        data: [
          {
            msg: `Your OTP is ${data.generateLink}`,
          },
        ],
      },
      outrow: "Thanks for being with us",
    },
  };

  const mail = MailGenerator.generate(response);

  const message = {
    from: "shahalamsharif2015@gmail.com",
    to: data.email,
    subject: "testing",
    html: mail,
  };

  transporter.sendMail(message);
};

// user: "ameliapatel854@gmail.com",
// pass: "@Ameliapatel854",
