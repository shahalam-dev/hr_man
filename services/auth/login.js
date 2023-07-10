const { v4: uuidv4 } = require("uuid");
const models = require("../../database/models").models;
const createError = require("http-errors");
const { logger } = require("../../utils/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

exports.login = async (req, res, next) => {
  return Object.freeze({
    execute: async () => {
      try {
        const { email, password: pass } = req.body;
        const user = await models.Auth.findOne({ where: { email } });

        const resultData = {
          token: null,
          userInfo: null,
          message: "",
          statusCode: null,
        };

        if (user) {
          const { id, role, verified, full_name, password } = user;
          const isValidPassword = await bcrypt.compare(pass, password);

          if (verified === "true") {
            if (isValidPassword) {
              resultData.token = jwt.sign(
                {
                  exp: Math.floor(Date.now() / 1000) + 60 * 60,
                  data: {
                    id,
                    // role,
                  },
                },
                jwtSecret
              );

              resultData.userInfo = {
                user_id: id,
                name: full_name,
              };

              resultData.message = "user logged in successfully";
              resultData.statusCode = 200;
            } else {
              resultData.userInfo = null;
              resultData.message = "password is incorrect";
              resultData.statusCode = 403;
            }
          } else {
            resultData.userInfo = null;
            resultData.message = "email is not verified";
            resultData.statusCode = 403;
          }
        } else {
          resultData.userInfo = null;
          resultData.message = "user not found";
          resultData.statusCode = 404;
        }

        return {
          message: resultData.message,
          data:
            resultData.userInfo && resultData.token
              ? { token: resultData.token, userInfo: resultData.userInfo }
              : {},
          statusCode: resultData.statusCode,
          token: resultData.token ? resultData.token : null,
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
