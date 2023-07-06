const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

exports.otpLink = async (email, directory) => {
  const sixDigitOTP = Math.floor(100000 + Math.random() * 900000);
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 10,
      data: {
        email,
        sixDigitOTP,
      },
    },
    jwtSecret
  );
  const generateLink = `${directory}${token}`;

  return {
    token,
    generateLink,
  };
};
