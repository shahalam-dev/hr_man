const { v4: uuidv4 } = require("uuid");
const models = require("../../database/models").models;
const createError = require("http-errors");
const { otpLink } = require("../../utils/otp-link");
const { sendMail } = require("../../utils/send-mail");
const { logger } = require("../../utils/logger");

exports.getVerifyLink = async (req, res, next) => {
  return Object.freeze({
    execute: async () => {
      try {
        const { email } = req.params;
        const resultData = {
          message: "",
          statusCode: null,
        };
        const user = await models.Auth.findOne({ where: { email } });

        if (user) {
          if (user.email === email) {
            // generate verification token and send to the mail id of that account
            const { token, generateLink } = await otpLink(
              email,
              `${process.env.SERVER_URL}/verify_email/`
            );

            user.token = token;
            await user.save();
            await sendMail({ email, generateLink });
            resultData.message = "email verification link has been sent";
            resultData.statusCode = 200;
          }
        } else {
          resultData.message = "user not found";
          resultData.statusCode = 404;
        }

        return {
          message: resultData.message,
          data: {},
          statusCode: resultData.statusCode,
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
