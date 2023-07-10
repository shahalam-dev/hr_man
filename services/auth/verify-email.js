const { v4: uuidv4 } = require("uuid");
const models = require("../../database/models").models;
const createError = require("http-errors");
const { logger } = require("../../utils/logger");
const { decodeJWT } = require("../../utils/decode-jwt");

exports.verifyEmail = async (req, res, next) => {
  return Object.freeze({
    execute: async () => {
      try {
        const { token } = req.params;

        const { email: userEmail, sixDigitOTP } = decodeJWT(token);
        // const { email: userEmail, sixDigitOTP } = decodeJWT(token);

        const resultData = {
          message: "",
          statusCode: null,
          redirectUrl: "",
        };

        if (userEmail) {
          const user = await models.Auth.findOne({
            where: { email: userEmail },
          });
          if (!user) {
            resultData.message = "user not found";
            resultData.status = 404;
            resultData.redirectUrl = `${process.env.CLIENT_URL}/auth/login`;
          } else {
            const { token } = user;
            const { sixDigitOTP: savedOTP } = decodeJWT(token);
            if (savedOTP === sixDigitOTP) {
              user.verified = "true";
              await user.save();
              resultData.redirectUrl = `${process.env.CLIENT_URL}/auth/email_verify_confirm/${user.email}`;
            }
          }
        } else {
          resultData.message = "invalid token";
          resultData.status = 404;
          resultData.redirectUrl = `${process.env.CLIENT_URL}/auth/resend_verify_link/`;
        }

        return {
          message: resultData.message,
          data: {},
          redirectUrl: resultData.redirectUrl
            ? resultData.redirectUrl
            : `${process.env.CLIENT_URL}/auth/login`,
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
