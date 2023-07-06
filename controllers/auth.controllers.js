// const authControllers = require("../controllers/auth.controllers");
const fromServices = require("../services/auth").authServices;

const models = require("../database/models").models;
const { v4: uuidv4 } = require("uuid");
const { where } = require("sequelize");
const jwtSecret = process.env.JWT_SECRET;
const sequelize = require("sequelize");
const createError = require("http-errors");
const generateOtpLink = require("../utils/otp-link").otpLink;
const decodeJWT = require("../utils/decode-jwt").decodeJWT;
const sendMail = require("../utils/send-mail").sendMail;
const { validationResult } = require("express-validator");
const { logger } = require("../utils/logger");

const signUp = (req, res, next) => {
  const run = async () => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = errors.mapped();
        return next(createError.NotAcceptable(err));
      } else {
        const result = (await fromServices.Register(req, res, next)).execute();
        res.status(201).json({
          message: result.message,
          data: result.data,
        });
      }
    } catch (error) {
      logger.log("error", {
        message: error.message,
        errorStack: error.stack,
      });
      next(error);
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
      const { id, role, verified, full_name } = user;
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
            const userInfo = {
              user_id: user.id,
              name: user.full_name || "",
            };

            return res.status(200).json({
              message: "success",
              user: userInfo,
            });
          } else {
            return res.status(403).json({
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
      logger.log("error", {
        message: error.message,
        errorStack: error.stack,
      });
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
      logger.log("error", {
        message: error.message,
        errorStack: error.stack,
      });
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
      const user = await models.Auth.findOne({
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
      if (error.name === "TokenExpiredError") {
        return res.status(503).send("Your session has expired");
      } else {
        logger.log("error", {
          message: error.message,
          errorStack: error.stack,
        });
        return next(error);
      }
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
          // res.status(200).json({
          //   statusText: "email verification successful",
          // });
          res.redirect(
            `${process.env.CLIENT_URL}/auth/email_verify_confirm/${user.email}`
          );
        } else {
          return res.status(401).json({
            message: "invalid token",
          });
        }
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(503).send("Your session has expired");
      } else {
        logger.log("error", {
          message: error.message,
          errorStack: error.stack,
        });
        return next(error);
      }
    }
  };
  run();
};

const logOut = (req, res, next) => {
  const run = async () => {
    try {
      res.clearCookie("auth");
      res.status(200).json({
        statusText: "logout successful",
      });
      res.redirect(`${process.env.CLIENT_URL}/auth/login`);
    } catch (error) {
      logger.log("error", {
        message: error.message,
        errorStack: error.stack,
      });
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
exports.logOut = logOut;
