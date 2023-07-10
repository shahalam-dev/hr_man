const express = require("express");
const router = express.Router();
const validator = require("../../validator/validator");

const {
  signUp,
  logIn,
  verify,
  verifyOTP,
  forgotPassword,
  resetPassword,
  verifyEmail,
  logOut,
  resendVerifyEmail,
} = require("../../controllers/auth.controllers");
const { auth } = require("../../middlewares/auth.middleware");

router.post("/register", validator.validate("register"), signUp);
router.post("/login", validator.validate("login"), logIn);
router.get(
  "/verify_email/:token",
  validator.validate("verify-email"),
  verifyEmail
);
router.get(
  "/forgot_password/:email",
  // validator.validate("forgot-pass"),
  forgotPassword
);

router.get(
  "/resend_verification_email/:email",
  // validator.validate("forgot-pass"),
  resendVerifyEmail
);
router.post(
  "/reset_password",
  // validator.validate("register"),
  resetPassword
);
router.get(
  "/logout",
  // validator.validate("logout"),
  logOut
);

module.exports = router;
