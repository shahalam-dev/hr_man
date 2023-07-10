const { decodeJWT } = require("../utils/decode-jwt");
const createError = require("http-errors");

exports.auth = (req, res, next) => {
  try {
    const token = req.cookies?.auth;
    if (token) {
      const { id } = decodeJWT(token);
      if (id) {
        req.userId = id;
        next();
      }
    } else {
      next(createError.Unauthorized());
    }
  } catch (error) {
    next(createError.Unauthorized());
  }
};
