const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const jwtSecret = process.env.JWT_SECRET;
exports.decodeJWT = (token) => {
  try {
    const { data } = jwt.verify(token, jwtSecret);
    return data;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const data = {
        message: "TokenExpiredError",
      };
      return data;
      // return next(createError.Unauthorized("token expired"));
    }
  }
};
