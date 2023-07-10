const { v4: uuidv4 } = require("uuid");
const models = require("../../database/models").models;
const createError = require("http-errors");
const { decodeJWT } = require("../../utils/decode-jwt");
const bcrypt = require("bcrypt");

exports.resetPass = async (req, res, next) => {
  return Object.freeze({
    execute: async () => {
      try {
        const { password: reqPassword, token: reqToken } = req.body;

        const resultData = {
          message: "",
          statusCode: null,
        };

        const { email: userEmail, sixDigitOTP } = decodeJWT(reqToken);
        if (userEmail) {
          const user = await models.Auth.findOne({
            where: { email: userEmail },
          });
          if (!user) {
            resultData.message = "user not found";
            resultData.statusCode = 404;
          } else {
            const { token } = user;
            const { sixDigitOTP: savedOTP } = decodeJWT(token);
            if (sixDigitOTP === savedOTP) {
              const pass = await bcrypt.hash(reqPassword, 10);

              user.password = pass;
              await user.save();
              resultData.message = "password reset successfully";
              resultData.statusCode = 200;
            }
          }
        } else {
          resultData.message = "token expired";
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
