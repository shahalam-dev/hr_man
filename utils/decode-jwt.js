const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
exports.decodeJWT = async (token) => {
  const { data } = jwt.verify(token, jwtSecret);
  return data;
};
