const fromRegister = require("./register");
const fromLogin = require("./login");
const fromVerifyEmail = require("./verify-email");
const fromGetVerifyLink = require("./get-verify-link");
const fromForgotPass = require("./forgot-pass");
const fromResetPass = require("./reset-pass");

exports.authServices = {
  Register: fromRegister.register,
  Login: fromLogin.login,
  VerifyEmail: fromVerifyEmail.verifyEmail,
  GetVerifyLink: fromGetVerifyLink.getVerifyLink,
  ForgotPass: fromForgotPass.forgotPass,
};
