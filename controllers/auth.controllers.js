// const authControllers = require("../controllers/auth.controllers");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../lib/database/models").models;
const { v4: uuidv4 } = require("uuid");
const { where } = require("sequelize");
const jwtSecret = process.env.JWT_SECRET;
const sequelize = require("sequelize");

const signUp = (req, res, next) => {
  const run = async () => {
    try {
      const { full_name, email, password: pass } = req.body;
      const password = await bcrypt.hash(pass, 10);
      const generatedId = await uuidv4();
      const userData = {
        id: generatedId,
        full_name,
        email,
        password,
        verified: "false",
        role: 1001,
        account_status: "active",
      };

      const isExist = await models.Auth.findOne({ where: { email: email } });
      if (!isExist) {
        const user = await models.Auth.create(userData);
        // console.log("\nUser:", user.toJSON());

        const { token, generateLink } = await generateOtpLink(
          email,
          `${process.env.SERVER_URL}/verify_email/`
        );

        user.token = token;
        await user.save();
        await sendMail({ email, generateLink });

        res.status(201).json({
          message: "User successfully created",
        });
      } else {
        res.status(406).json({
          message: "Email already exist",
        });
      }
    } catch (error) {
      // res.status(400).json({
      //   message: error.message,
      // });
      // console.log(error);
      return next(error);
    }
  };
  run();
};

const logIn = (req, res, next) => {
  const { email, password: pass } = req.body;
  const run = async () => {
    try {
      const user = await models.Auth.findOne({ where: { email } });
      const isValidPassword = await bcrypt.compare(pass, user.password);
      const { id, role, verified } = user;
      if (user) {
        if (verified === "true") {
          if (isValidPassword) {
            const token = jwt.sign(
              {
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data: {
                  id,
                  role,
                },
              },
              jwtSecret
            );
            res.cookie("auth", token, {
              maxAge: 1000 * 60 * 60,
              httpOnly: true,
            });
            return res.status(200).json({
              message: "success",
              user_id: user.id,
            });
          } else {
            return res.status(400).json({
              message: "Incorrect password",
            });
          }
        } else {
          return res.status(403).json({
            message: "Email is not verified",
          });
        }
      } else {
        return res.status(404).json({
          message: "User not found",
        });
      }
      const isValidPass = await bcrypt.compare(pass, user.password);
    } catch (error) {
      // res.status(400).json({
      //   message: "Incorrect email or password",
      // });
      return next(error);
    }
  };
  run();
};

const forgotPassword = (req, res, next) => {
  // const { email: reqEmail } = req.body;
  const { email } = req.params;

  const run = async () => {
    try {
      const user = await models.Auth.findOne({
        where: { email: email },
      });

      if (!user) {
        return res.status(404).json({
          message: "user not found",
        });
      } else {
        const { token, generateLink } = await generateOtpLink(
          email,
          `${process.env.CLIENT_URL}/auth/resetPassword/`
        );
        const userMail = user.email;
        user.token = token;
        await user.save();
        await sendMail({ email: userMail, generateLink });
        return res.status(200).json({
          message: "success",
        });
      }
    } catch (error) {
      return next(error);
    }
  };
  run();
};

const resetPassword = (req, res, next) => {
  const { password: reqPassword, token: reqToken } = req.body;

  const run = async () => {
    try {
      const { email: userEmail, sixDigitOTP } = await decodeJWT(reqToken);
      const user = await models.User.findOne({
        where: { email: userEmail },
      });
      if (!user) {
        return res.status(404).json({
          message: "user not found",
        });
      } else {
        const { token } = user;
        const { sixDigitOTP: savedOTP } = await decodeJWT(token);
        if (sixDigitOTP === savedOTP) {
          const pass = await bcrypt.hash(reqPassword, 10);
          user.password = pass;
          await user.save();
          return res.status(200).json({
            message: "success",
          });
        }
      }
    } catch (error) {
      return next(error);
    }
  };
  run();
};

const verifyEmail = (req, res, next) => {
  const { token } = req.params;

  const run = async () => {
    try {
      const { email: userEmail, sixDigitOTP } = await decodeJWT(token);

      const user = await models.Auth.findOne({
        where: { email: userEmail },
      });

      if (!user) {
        return res.status(404).json({
          message: "user not found",
        });
      } else {
        const { token } = user;
        const { sixDigitOTP: savedOTP } = jwt.verify(token, jwtSecret).data;
        if (savedOTP === sixDigitOTP) {
          user.verified = "true";
          await user.save();
          return res.redirect(`${process.env.CLIENT_URL}`);
        } else {
          return res.status(401).json({
            message: "invalid token",
          });
        }
      }
    } catch (error) {
      return next(error);
    }
  };
  run();
};

exports.signUp = signUp;
exports.logIn = logIn;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.verifyEmail = verifyEmail;

async function sendMail(data) {
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
}

// async function updateUserData(data) {

//   const res = await models.User.update(
//     ,
//     { where: { email: { userEmail } } }
//   );
// }

async function generateOtpLink(email, directory) {
  const sixDigitOTP = Math.floor(100000 + Math.random() * 900000);
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 10,
      data: {
        email,
        sixDigitOTP,
      },
    },
    jwtSecret
  );
  const generateLink = `${directory}${token}`;

  return {
    token,
    generateLink,
  };
}

async function decodeJWT(token) {
  const { data } = jwt.verify(token, jwtSecret);
  return data;
}
