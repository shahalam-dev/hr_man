const register = require("./register");
const login = require("./login");
const verifyEmail = require("./verify-email");
const forgotPassword = require("./forgot-password");
const resetPassword = require("./reset-password");
const logout = require("./logout");

exports.authServices = {
  Register: register.register,
  Login: login.login,
  VerifyEmail: verifyEmail.verifyEmail,
  ForgotPassword: forgotPassword.forgotPassword,
  ResetPassword: resetPassword.resetPassword,
  Logout: logout.logout,
};
