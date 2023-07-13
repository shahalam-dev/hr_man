const { v4: uuidv4 } = require("uuid");
const models = require("../../database/models").models;
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const { logger } = require("../../utils/logger");
const { otpLink } = require("../../utils/otp-link");
const { sendMail } = require("../../utils/send-mail");

exports.register = async (req, res, next) => {
  return Object.freeze({
    execute: async () => {
      try {
        const {
          legal_name,
          trading_name,
          abn,
          acn,
          arbn,
          other_license_number,
          shareholding_structure,
          incorporation_number,
        } = req.body;
        const { full_name, email, password: pass } = req.body;
        const password = await bcrypt.hash(pass, 10);

        const userData = {
          id: uuidv4(),
          full_name,
          email,
          password,
          verified: "false",
          // role: 1001,
          account_status: "active",
        };
        const resultData = {
          message: "",
          statusCode: null,
          data: {},
        };

        const isExist = await models.Auth.findOne({ where: { email: email } });
        if (!isExist) {
          const user = await models.Auth.create(userData);
          const { token, generateLink } = await otpLink(
            email,
            `${process.env.SERVER_URL}/verify_email/`
          );

          user.token = token;
          await user.save();
          await sendMail({ email, generateLink });

          resultData.message = "user has been created";
          resultData.statusCode = 200;
        } else {
          resultData.message = "this email already registered";
          resultData.statusCode = 409;
        }

        return {
          message: resultData.message,
          statusCode: resultData.statusCode,
          data: {},
        };
      } catch (error) {
        logger.log("error", {
          message: error.message,
          errorStack: error.stack,
        });
        return next(createError.InternalServerError());
      }
    },
  });
};
