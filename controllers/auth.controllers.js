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
const { tryCatch } = require("../utils/tryCatch");
const { validate } = require("../utils/validate");

exports.signUp = async (req, res, next) => {
  await tryCatch(async () => {
    validate(req, next);

    const result = await (
      await fromServices.Register(req, res, next)
    ).execute();

    res.status(result?.statusCode || 500).json({
      message: result.message,
      data: result.data,
    });
  }, next);
};

exports.logIn = async (req, res, next) => {
  await tryCatch(async () => {
    validate(req, next);

    const result = await (await fromServices.Login(req, res, next)).execute();

    const { data, statusCode, token } = result;

    if (token) {
      res.cookie("auth", token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      });
    }
    res.status(statusCode).json({
      message: result.message,
      data: data,
    });
  }, next);
};

exports.verifyEmail = async (req, res, next) => {
  await tryCatch(async () => {
    validate(req, next);

    const result = await (
      await fromServices.VerifyEmail(req, res, next)
    ).execute();

    const { redirectUrl } = result;

    res.redirect(redirectUrl);
    // res.status(status).json({
    //   message: result.message,
    //   data: data,
    // });
  }, next);
};

exports.resendVerifyEmail = async (req, res, next) => {
  await tryCatch(async () => {
    validate(req, next);

    const result = await (
      await fromServices.GetVerifyLink(req, res, next)
    ).execute();
    const { statusCode, message, data } = result;
    res.status(statusCode).json({
      message: message,
      data: data || {},
    });
  }, next);
};

exports.forgotPassword = async (req, res, next) => {
  await tryCatch(async () => {
    validate(req, next);

    const result = await (
      await fromServices.ForgotPass(req, res, next)
    ).execute();

    const { data, statusCode, token } = result;

    res.status(statusCode).json({
      message: result.message,
      data: data,
    });
  }, next);
};

exports.resetPassword = async (req, res, next) => {
  await tryCatch(async () => {
    validate(req, next);

    const result = await (
      await fromServices.ResetPass(req, res, next)
    ).execute();

    const { data, statusCode } = result;

    res.status(statusCode).json({
      message: result.message,
      data: data || {},
    });
  }, next);
};

exports.logOut = async (req, res, next) => {
  await tryCatch(async () => {
    validate(req, next);

    res.cookie("auth", "");
    res.status(200).json({
      statusText: "logout successful",
    });
  }, next);
};
